import 'server-only';
import { manualByProductId } from '@/data/manuals';
import { products } from '@/data/products';
import { signedManualUrl } from '@/lib/manual-links';
import { sendEmail } from '@/lib/email';
import {
  orderConfirmationEmail,
  manualsOnlyEmail,
  type ManualRow,
  type OrderItem,
} from '@/lib/email-templates';

/**
 * Auto-delivery of product manuals on purchase.
 *
 * Call deliverOrderManuals() from the payment-success webhook once a real
 * checkout/payment stack (Stripe / Shopify / Woo) is wired. It composes ONE
 * order-confirmation email (T1) with a signed Download Manual link per line
 * item, and — when an alternate manuals address is supplied — a SECOND
 * manuals-only email to that address. Today it is invoked by
 * /api/order-delivery (shared-secret protected) so the flow is testable before
 * the payment integration exists.
 */

export type DeliveryLineItem = { productId: string; qty: number; unitPrice: number };

export type DeliverArgs = {
  firstName: string;
  /** Customer order email (gets full order summary + manuals). */
  email: string;
  /** Optional second address (gift / household) — gets manuals only. */
  altEmail?: string;
  items: DeliveryLineItem[];
  shippingLine?: string;
  /** Absolute site origin, e.g. "https://www.mcfuntain.com". */
  siteUrl: string;
  /** Current time in ms (pass Date.now() from the caller). */
  nowMs: number;
  /** Order id for logging / link attribution. */
  orderId?: string;
};

export type DeliverResult = {
  ok: boolean;
  configured: boolean;
  primarySent: boolean;
  altSent: boolean;
  manualsDelivered: number;
  error?: string;
};

function expectLineFor(productId: string): string | undefined {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return undefined;
  // First sentence of the catalogue "why" copy — no medical claim added.
  return (prod.whyYouNeedIt || prod.description || '').split(/(?<=\.)\s/)[0] || undefined;
}

export async function deliverOrderManuals(args: DeliverArgs): Promise<DeliverResult> {
  const { siteUrl, nowMs, orderId } = args;

  // Resolve each purchased product → manual row with a signed, 30-day link.
  const manualRows: ManualRow[] = [];
  const orderItems: OrderItem[] = [];
  for (const li of args.items) {
    const manual = manualByProductId(li.productId);
    const prod = products.find((p) => p.id === li.productId);
    const name = prod?.name ?? manual?.name ?? li.productId;
    orderItems.push({
      name,
      qty: li.qty,
      unitPrice: li.unitPrice,
      subtotal: li.unitPrice * li.qty,
    });
    if (manual) {
      const url = `${signedManualUrl(siteUrl, manual.slug, nowMs)}&order=${encodeURIComponent(orderId || '-')}`;
      manualRows.push({ name, downloadUrl: url });
    }
  }

  const total = orderItems.reduce((sum, it) => sum + it.subtotal, 0);

  const t1 = orderConfirmationEmail({
    firstName: args.firstName,
    items: orderItems,
    manuals: manualRows,
    total,
    shippingLine: args.shippingLine,
    expectLine: args.items[0] ? expectLineFor(args.items[0].productId) : undefined,
  });

  const primary = await sendEmail({ to: args.email, subject: t1.subject, html: t1.html });

  let altSent = false;
  if (args.altEmail) {
    const t = manualsOnlyEmail({ fromName: args.firstName, manuals: manualRows });
    const alt = await sendEmail({ to: args.altEmail, subject: t.subject, html: t.html });
    altSent = alt.ok;
  }

  console.log(
    `[order-delivery] ts=${new Date(nowMs).toISOString()} order=${orderId || '-'} ` +
      `email=${args.email} alt=${args.altEmail || '-'} manuals=${manualRows.length} ` +
      `primarySent=${primary.ok} altSent=${altSent}`,
  );

  if (!primary.ok && !primary.configured) {
    return { ok: false, configured: false, primarySent: false, altSent: false, manualsDelivered: manualRows.length };
  }
  return {
    ok: primary.ok,
    configured: true,
    primarySent: primary.ok,
    altSent,
    manualsDelivered: manualRows.length,
    error: primary.ok ? undefined : (primary as { error?: string }).error,
  };
}
