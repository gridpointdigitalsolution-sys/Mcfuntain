import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, isValidEmail } from '@/lib/email';
import { newsletterSignupEmail, newsletterWelcomeEmail } from '@/lib/email-templates';
import { rateLimited, clientIp } from '@/lib/rate-limit';

/**
 * Journal (newsletter) signup.
 *
 * No third-party mailing platform is connected, so a signup is delivered to the
 * McFuntain inbox — the address is never silently dropped, and swapping in a
 * Mailchimp/ConvertKit call later needs no change to the UI. Honest 503 while
 * RESEND_API_KEY is unset.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INBOX = process.env.MCFUNTAIN_CONTACT_INBOX || 'info@mcfuntain.com';

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

export async function POST(req: NextRequest) {
  const now = Date.now();
  if (rateLimited(`newsletter:${clientIp(req)}`, { limit: 8, windowMs: 60_000, now })) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true, configured: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const source =
    typeof body.source === 'string' && body.source.trim()
      ? body.source.trim().replace(/[\r\n]+/g, ' ').slice(0, 60)
      : 'website';

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const notice = newsletterSignupEmail({ email, source, sentAtIso: new Date(now).toISOString() });
  const result = await sendEmail({ to: INBOX, subject: notice.subject, html: notice.html, replyTo: email });

  if (!result.ok && !result.configured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: 'Subscriptions are not switched on yet. Please check back shortly.',
      },
      { status: 503 },
    );
  }
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, configured: true, error: 'We could not complete your subscription. Please try again later.' },
      { status: 502 },
    );
  }

  const base = siteUrl(req);
  const welcome = newsletterWelcomeEmail({ siteUrl: base, unsubscribeUrl: `${base}/contact` });
  const welcomeResult = await sendEmail({ to: email, subject: welcome.subject, html: welcome.html });
  if (!welcomeResult.ok) {
    console.warn('[newsletter] welcome email failed; signup itself was recorded');
  }

  return NextResponse.json({ ok: true, configured: true });
}
