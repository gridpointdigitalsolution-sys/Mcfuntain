import { NextRequest, NextResponse } from 'next/server';
import { manualByProductId } from '@/data/manuals';
import { products } from '@/data/products';
import { signedManualUrl } from '@/lib/manual-links';
import { sendEmail, isValidEmail } from '@/lib/email';
import { leadMagnetEmail } from '@/lib/email-templates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

/** Build a 2–3 sentence pitch from catalogue data (no medical claims added). */
function pitchFor(productId: string): { name: string; pitch: string } {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return { name: 'McFuntain product', pitch: '' };
  const firstWhy =
    (prod.whyYouNeedIt || '').split(/(?<=\.)\s/)[0] ||
    prod.description.split(/(?<=\.)\s/)[0] ||
    prod.description;
  const pitch = [prod.tagline, firstWhy].filter(Boolean).join(' ');
  return { name: prod.name, pitch };
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; productId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const productId = typeof body.productId === 'string' ? body.productId : '';

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }
  const manual = manualByProductId(productId);
  if (!manual) {
    return NextResponse.json({ ok: false, error: 'Unknown product.' }, { status: 404 });
  }

  // Marketing opt-in capture. No CRM is wired yet — log so it can be exported /
  // replaced with a Mailchimp/ConvertKit call without touching the UI.
  console.log(`[manual-request] ts=${new Date().toISOString()} email=${email} tag=manual-requested:${manual.slug}`);

  const base = siteUrl(req);
  const downloadUrl = signedManualUrl(base, manual.slug, Date.now());
  const { name, pitch } = pitchFor(manual.productId);
  const { subject, html } = leadMagnetEmail({
    productName: name,
    downloadUrl,
    pitch,
    productUrl: `${base}/shop/${manual.productId}`,
    unsubscribeUrl: `${base}/contact`,
  });

  const result = await sendEmail({ to: email, subject, html });

  if (!result.ok && !result.configured) {
    // Email service not configured yet (founder wires RESEND_API_KEY later).
    return NextResponse.json(
      { ok: false, configured: false, message: 'Email delivery is not enabled yet. Your request was recorded; the manual is available to read on this page now.' },
      { status: 503 },
    );
  }
  if (!result.ok) {
    return NextResponse.json({ ok: false, configured: true, error: 'Could not send the email. Please try again later.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, configured: true });
}
