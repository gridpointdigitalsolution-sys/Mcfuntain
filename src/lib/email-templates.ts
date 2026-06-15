/**
 * McFuntain transactional email templates (brand DNA locked).
 *
 * Palette: Navy #15233F · Gold #C9A24A · Cream #F8F1E5 · Ink #2D2D2D.
 * Display: Georgia (Playfair stand-in for email). Body: Arial.
 * Voice: restrained, clinical, apothecary. No exclamation marks, no emojis,
 * no medical claims. Every email carries the FDA structure-function disclaimer.
 */

const NAVY = '#15233F';
const GOLD = '#C9A24A';
const CREAM = '#F8F1E5';
const INK = '#2D2D2D';

const FDA =
  'These statements have not been evaluated by the Food and Drug Administration. ' +
  'This product is not intended to diagnose, treat, cure, or prevent any disease.';

const COMPANY_ADDRESS = 'McFuntain Nutraceuticals · Gwynn Oak, Maryland, USA';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${GOLD};color:${NAVY};font-family:Arial,sans-serif;font-weight:700;font-size:14px;text-decoration:none;padding:12px 24px;border-radius:6px;border:1px solid ${GOLD};">${escapeHtml(label)}</a>`;
}

/** Shared shell: navy wordmark header, gold diamond rule, FDA footer. */
function layout(inner: string, opts: { unsubscribeUrl?: string } = {}): string {
  const unsub = opts.unsubscribeUrl
    ? `<br><a href="${opts.unsubscribeUrl}" style="color:#9aa3b2;text-decoration:underline;">Unsubscribe</a>`
    : '';
  return `<!doctype html><html><body style="margin:0;padding:0;background:${CREAM};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e7ddc7;border-radius:12px;overflow:hidden;">
  <tr><td style="background:${NAVY};padding:24px 32px;text-align:center;">
    <div style="font-family:Georgia,serif;color:#ffffff;font-size:22px;letter-spacing:.5px;">McFuntain</div>
    <div style="font-family:Arial,sans-serif;color:${GOLD};font-size:10px;letter-spacing:.28em;text-transform:uppercase;margin-top:4px;">Nutraceuticals</div>
    <div style="color:${GOLD};font-size:14px;margin-top:10px;">&#9670;</div>
  </td></tr>
  <tr><td style="padding:34px 32px 12px;">${inner}</td></tr>
  <tr><td style="padding:22px 32px 30px;border-top:1px solid #eee5d2;">
    <p style="font-family:Arial,sans-serif;font-size:11px;line-height:1.6;color:#9aa3b2;margin:0;">
      ${COMPANY_ADDRESS}<br>
      <span style="color:#b6bdc9;">${FDA}</span>${unsub}
    </p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

function h1(text: string): string {
  return `<h1 style="font-family:Georgia,serif;color:${NAVY};font-size:24px;font-weight:normal;margin:0 0 16px;">${escapeHtml(text)}</h1>`;
}
function p(text: string): string {
  return `<p style="font-family:Arial,sans-serif;color:${INK};font-size:15px;line-height:1.65;margin:0 0 16px;">${text}</p>`;
}

export type ManualRow = { name: string; downloadUrl: string };

function manualsBlock(rows: ManualRow[], heading = 'Your Product Manuals'): string {
  const items = rows
    .map(
      (r) => `<tr>
      <td style="font-family:Arial,sans-serif;font-size:14px;color:${INK};padding:10px 0;border-bottom:1px solid #f0e9d8;">${escapeHtml(r.name)}</td>
      <td align="right" style="padding:10px 0;border-bottom:1px solid #f0e9d8;">${button(r.downloadUrl, 'Download Manual')}</td>
    </tr>`,
    )
    .join('');
  return `<p style="font-family:Arial,sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:11px;color:${GOLD};margin:24px 0 6px;">${escapeHtml(heading)}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>`;
}

/* ---------------------------------------------------------------- */
/* T1 — order confirmation + manuals                                */
/* ---------------------------------------------------------------- */
export type OrderItem = { name: string; qty: number; unitPrice: number; subtotal: number };

export function orderConfirmationEmail(args: {
  firstName: string;
  items: OrderItem[];
  manuals: ManualRow[];
  total: number;
  shippingLine?: string;
  expectLine?: string;
}): { subject: string; html: string } {
  const rows = args.items
    .map(
      (it) => `<tr>
        <td style="font-family:Arial,sans-serif;font-size:14px;color:${INK};padding:8px 0;border-bottom:1px solid #f0e9d8;">${escapeHtml(it.name)}</td>
        <td align="center" style="font-family:Arial,sans-serif;font-size:14px;color:${INK};padding:8px 0;border-bottom:1px solid #f0e9d8;">${it.qty}</td>
        <td align="right" style="font-family:Arial,sans-serif;font-size:14px;color:${INK};padding:8px 0;border-bottom:1px solid #f0e9d8;">$${it.subtotal.toFixed(2)}</td>
      </tr>`,
    )
    .join('');

  const inner =
    h1(`Thank you, ${escapeHtml(args.firstName || 'friend')}.`) +
    p('Your order is confirmed. Your product manual(s) are below — each is a complete guide covering ingredients, dosage, expected progression, safety, and lifestyle support.') +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
      <tr>
        <td style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#9aa3b2;padding-bottom:4px;">Item</td>
        <td align="center" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#9aa3b2;padding-bottom:4px;">Qty</td>
        <td align="right" style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#9aa3b2;padding-bottom:4px;">Subtotal</td>
      </tr>
      ${rows}
      <tr>
        <td colspan="2" style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:${NAVY};padding-top:12px;">Total</td>
        <td align="right" style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:${NAVY};padding-top:12px;">$${args.total.toFixed(2)}</td>
      </tr>
    </table>` +
    manualsBlock(args.manuals) +
    (args.shippingLine ? p(`<strong style="color:${NAVY};">Shipping.</strong> ${escapeHtml(args.shippingLine)}`) : '') +
    (args.expectLine
      ? `<p style="font-family:Georgia,serif;font-style:italic;color:${NAVY};font-size:14px;line-height:1.6;margin:18px 0 0;border-left:3px solid ${GOLD};padding-left:14px;">${escapeHtml(args.expectLine)}</p>`
      : '');

  return { subject: 'Your McFuntain order is confirmed — manuals inside', html: layout(inner) };
}

/* ---------------------------------------------------------------- */
/* Manuals-only (alternate / gift address)                          */
/* ---------------------------------------------------------------- */
export function manualsOnlyEmail(args: {
  fromName?: string;
  manuals: ManualRow[];
}): { subject: string; html: string } {
  const inner =
    h1('Your McFuntain product manual(s)') +
    p(args.fromName
      ? `${escapeHtml(args.fromName)} has shared the following McFuntain product manual(s) with you.`
      : 'The following McFuntain product manual(s) have been shared with you.') +
    manualsBlock(args.manuals);
  return {
    subject: args.fromName ? `Your McFuntain product manual(s) — gift from ${args.fromName}` : 'Your McFuntain product manual(s)',
    html: layout(inner),
  };
}

/* ---------------------------------------------------------------- */
/* T2 — lead-magnet "Email Me This Manual" (no purchase)            */
/* ---------------------------------------------------------------- */
export function leadMagnetEmail(args: {
  productName: string;
  downloadUrl: string;
  pitch: string;
  productUrl: string;
  unsubscribeUrl?: string;
}): { subject: string; html: string } {
  const inner =
    h1("Here's the manual you requested.") +
    `<p style="margin:0 0 22px;">${button(args.downloadUrl, 'Download Manual')}</p>` +
    p(escapeHtml(args.pitch)) +
    p(`When you're ready, ${escapeHtml(args.productName)} is available at <a href="${args.productUrl}" style="color:${NAVY};text-decoration:underline;">our shop</a>.`);
  return {
    subject: `A McFuntain product manual — ${args.productName}`,
    html: layout(inner, { unsubscribeUrl: args.unsubscribeUrl }),
  };
}

/* ---------------------------------------------------------------- */
/* Prospect send (owner vault "Email to a prospect")                */
/* ---------------------------------------------------------------- */
export function prospectManualEmail(args: {
  productName: string;
  downloadUrl: string;
  pitch: string;
  productUrl: string;
}): { subject: string; html: string } {
  const inner =
    h1(args.productName) +
    p(escapeHtml(args.pitch)) +
    `<p style="margin:4px 0 20px;">${button(args.downloadUrl, 'Download Manual')}</p>` +
    p(`Learn more at <a href="${args.productUrl}" style="color:${NAVY};text-decoration:underline;">mcfuntain.com</a>.`);
  return { subject: args.productName, html: layout(inner) };
}
