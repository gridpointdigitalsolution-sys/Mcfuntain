import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { deliverOrderManuals, type DeliveryLineItem } from '@/lib/order-delivery';
import { SITE_URL } from '@/lib/site';

/**
 * Stripe webhook.
 *
 * On `checkout.session.completed` this hands the paid order to the existing
 * manual-delivery flow, which emails the buyer their order confirmation and a
 * signed download link for each product's PDF manual.
 *
 * The signature is verified against the RAW request body — `await req.text()`
 * before any parsing. Reading the body as JSON first would change the bytes and
 * every signature check would fail.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Events already handled, so a Stripe retry cannot email a customer twice.
 * Per-instance memory: good enough because a duplicate here costs one extra
 * email, never a double charge. Move to shared storage if that changes.
 */
const processed = new Set<string>();

function remember(eventId: string): boolean {
  if (processed.has(eventId)) return false;
  processed.add(eventId);
  if (processed.size > 1000) {
    // Trim oldest insertions; Set preserves insertion order.
    for (const id of processed) {
      processed.delete(id);
      if (processed.size <= 800) break;
    }
  }
  return true;
}

/** Rebuild the ordered items from the manifest written at session creation. */
function itemsFromMetadata(metadata: Stripe.Metadata | null): DeliveryLineItem[] {
  if (!metadata) return [];
  const encoded = Object.keys(metadata)
    .filter((k) => k.startsWith('items_'))
    .sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)))
    .map((k) => metadata[k])
    .join('');

  return encoded
    .split('|')
    .filter(Boolean)
    .map((entry) => {
      const [productId, qty, unitPrice] = entry.split(':');
      return { productId, qty: Number(qty) || 1, unitPrice: Number(unitPrice) || 0 };
    })
    .filter((i) => Boolean(i.productId));
}



export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return NextResponse.json(
      { ok: false, error: 'Stripe webhook is not configured (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET).' },
      { status: 503 },
    );
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ ok: false, error: 'Missing signature.' }, { status: 400 });
  }

  // RAW body — must be read as text before anything parses it.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.error('[stripe-webhook] signature verification failed:', message);
    return NextResponse.json({ ok: false, error: 'Invalid signature.' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    // Acknowledge everything else so Stripe stops retrying it.
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  if (!remember(event.id)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Only fulfil a session that is actually paid.
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ ok: true, skipped: `payment_status=${session.payment_status}` });
  }

  const email = session.customer_details?.email || '';
  if (!email) {
    console.error('[stripe-webhook] paid session has no customer email:', session.id);
    // 200 so Stripe does not retry something a retry cannot fix.
    return NextResponse.json({ ok: true, warning: 'no customer email' });
  }

  const shipping = session.collected_information?.shipping_details ?? null;
  const fullName = shipping?.name || session.customer_details?.name || '';
  const firstName = fullName.split(' ')[0] || 'friend';

  const address = shipping?.address;
  const shippingLine = address
    ? [address.line1, address.line2, address.city, address.state, address.postal_code, address.country]
        .filter(Boolean)
        .join(', ')
    : undefined;

  const items = itemsFromMetadata(session.metadata);
  if (items.length === 0) {
    console.error('[stripe-webhook] no item manifest on session:', session.id);
    return NextResponse.json({ ok: true, warning: 'no item manifest' });
  }

  try {
    const result = await deliverOrderManuals({
      firstName,
      email,
      items,
      shippingLine,
      siteUrl: SITE_URL,
      nowMs: Date.now(),
      orderId: session.id,
    });
    if (!result.ok) {
      console.error('[stripe-webhook] delivery incomplete for', session.id, result.error || '(email not configured)');
    }
  } catch (err) {
    // Never fail the webhook over a delivery problem — the payment is real and
    // Stripe must not retry the charge flow. Logged for manual follow-up.
    console.error('[stripe-webhook] delivery threw for', session.id, err);
  }

  return NextResponse.json({ ok: true });
}
