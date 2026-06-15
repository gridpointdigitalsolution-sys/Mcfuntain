import { NextRequest, NextResponse } from 'next/server';
import { deliverOrderManuals, type DeliveryLineItem } from '@/lib/order-delivery';
import { isValidEmail } from '@/lib/email';

/**
 * Manual auto-delivery endpoint.
 *
 * Protected by a shared secret (MCFUNTAIN_ORDER_HOOK_SECRET, sent in the
 * `x-mcfuntain-hook-secret` header). Wire this to the payment provider's
 * payment-success webhook (Stripe `checkout.session.completed`, Shopify
 * `orders/paid`, etc.): map the order's line items to { productId, qty,
 * unitPrice } and POST them here. Until that integration exists this endpoint
 * lets the delivery flow be exercised directly.
 *
 * Body: { firstName, email, altEmail?, shippingLine?, orderId?, items: [...] }
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

export async function POST(req: NextRequest) {
  const secret = process.env.MCFUNTAIN_ORDER_HOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'Auto-delivery is not configured (MCFUNTAIN_ORDER_HOOK_SECRET not set).' },
      { status: 503 },
    );
  }
  if (req.headers.get('x-mcfuntain-hook-secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let body: {
    firstName?: unknown;
    email?: unknown;
    altEmail?: unknown;
    shippingLine?: unknown;
    orderId?: unknown;
    items?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'A valid order email is required.' }, { status: 400 });
  }
  const altEmail =
    typeof body.altEmail === 'string' && isValidEmail(body.altEmail.trim())
      ? body.altEmail.trim()
      : undefined;

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: 'Order must contain at least one item.' }, { status: 400 });
  }
  const items: DeliveryLineItem[] = [];
  for (const raw of body.items) {
    if (!raw || typeof raw !== 'object') continue;
    const r = raw as Record<string, unknown>;
    const productId = typeof r.productId === 'string' ? r.productId : '';
    const qty = Number(r.qty);
    const unitPrice = Number(r.unitPrice);
    if (!productId || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(unitPrice)) continue;
    items.push({ productId, qty, unitPrice });
  }
  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: 'No valid line items.' }, { status: 400 });
  }

  const result = await deliverOrderManuals({
    firstName: typeof body.firstName === 'string' ? body.firstName : '',
    email,
    altEmail,
    items,
    shippingLine: typeof body.shippingLine === 'string' ? body.shippingLine : undefined,
    siteUrl: siteUrl(req),
    nowMs: Date.now(),
    orderId: typeof body.orderId === 'string' ? body.orderId : undefined,
  });

  if (!result.configured) {
    return NextResponse.json(
      { ok: false, configured: false, message: 'Email delivery is not enabled yet (RESEND_API_KEY not set).' },
      { status: 503 },
    );
  }
  const status = result.ok ? 200 : 502;
  return NextResponse.json(result, { status });
}
