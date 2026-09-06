import { NextRequest, NextResponse } from 'next/server';
import { getStripe, stripeConfigured } from '@/lib/stripe';
import { toCents, type RequestedLine } from '@/lib/cart-pricing';
import { priceCart } from '@/lib/price-cart';
import { rateLimited, clientIp } from '@/lib/rate-limit';

/**
 * Creates a Stripe Checkout Session for the current cart.
 *
 * The browser sends product ids, sizes and quantities only. Every price is
 * looked up server-side from the catalogue, so a tampered request cannot buy a
 * $129 bottle for a dollar.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Countries checkout will accept a shipping address for.
 *
 * Deliberately United States only for launch: the cart quotes a flat $8.99
 * domestic rate with free shipping over $99, and charging that to ship
 * overseas would lose money on every international order. Add countries here
 * once international rates are agreed.
 */
const SHIPPING_COUNTRIES = ['US'] as const;

/** Stripe metadata values cap at 500 characters, so the manifest is chunked. */
function itemsMetadata(lines: { productId: string; quantity: number; unitPrice: number }[]) {
  const encoded = lines.map((l) => `${l.productId}:${l.quantity}:${l.unitPrice}`).join('|');
  const chunks: Record<string, string> = {};
  for (let i = 0; i * 450 < encoded.length; i += 1) {
    chunks[`items_${i}`] = encoded.slice(i * 450, (i + 1) * 450);
  }
  return chunks;
}

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

export async function POST(req: NextRequest) {
  if (rateLimited(`checkout:${clientIp(req)}`, { limit: 20, windowMs: 60_000, now: Date.now() })) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Please wait a moment.' }, { status: 429 });
  }

  const stripe = getStripe();
  if (!stripe || !stripeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: 'Online payment is not switched on yet. Please email info@mcfuntain.com to place an order and we will help you directly.',
      },
      { status: 503 },
    );
  }

  let body: { items?: unknown };
  try {
    body = (await req.json()) as { items?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: 'Your cart is empty.' }, { status: 400 });
  }
  if (body.items.length > 50) {
    return NextResponse.json({ ok: false, error: 'That is too many different items for one order.' }, { status: 400 });
  }

  const requested: RequestedLine[] = (body.items as Record<string, unknown>[]).map((raw) => ({
    productId: typeof raw?.productId === 'string' ? raw.productId : '',
    size: raw?.size === 'large' ? 'large' : 'small',
    quantity: Number(raw?.quantity) || 0,
  }));

  const cart = priceCart(requested);
  if (cart.lines.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'We could not match those items to our catalogue. Please refresh and try again.' },
      { status: 400 },
    );
  }

  const base = siteUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Stripe collects and verifies the email; we never handle card data.
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
      phone_number_collection: { enabled: true },
      line_items: cart.lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: 'usd',
          // Charge the discounted unit price so Stripe's own quantity x price
          // arithmetic matches the total the cart displayed.
          unit_amount: toCents(line.unitPrice * (1 - line.discount)),
          product_data: {
            name: line.name,
            description:
              line.discount > 0
                ? `${line.description} (${Math.round(line.discount * 100)}% bulk discount applied)`
                : line.description,
          },
        },
      })),
      shipping_options:
        cart.shipping > 0
          ? [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  display_name: 'Standard shipping',
                  fixed_amount: { amount: toCents(cart.shipping), currency: 'usd' },
                },
              },
            ]
          : [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  display_name: 'Free standard shipping',
                  fixed_amount: { amount: 0, currency: 'usd' },
                },
              },
            ],
      success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cart?checkout=cancelled`,
      metadata: itemsMetadata(cart.lines),
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    console.error('[checkout] session creation failed:', message);
    return NextResponse.json(
      { ok: false, configured: true, error: 'We could not start checkout. Please try again in a moment.' },
      { status: 502 },
    );
  }
}
