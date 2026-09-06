import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, isValidEmail } from '@/lib/email';
import { contactNotificationEmail, contactAckEmail } from '@/lib/email-templates';
import { rateLimited, clientIp } from '@/lib/rate-limit';

/**
 * Contact form endpoint.
 *
 * Delivers the message to the McFuntain inbox with reply-to set to the sender,
 * then acknowledges the sender. When RESEND_API_KEY is absent nothing is faked:
 * the route answers 503 and the form tells the visitor to email us directly.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INBOX = process.env.MCFUNTAIN_CONTACT_INBOX || 'info@mcfuntain.com';
const MAX = { name: 120, phone: 40, subject: 160, message: 5000 };

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/** Strip CR/LF so nothing a visitor types can forge an email header. */
function oneLine(v: string): string {
  return v.replace(/[\r\n]+/g, ' ').trim();
}

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

export async function POST(req: NextRequest) {
  const now = Date.now();
  if (rateLimited(`contact:${clientIp(req)}`, { limit: 5, windowMs: 60_000, now })) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people never fill a field they cannot see.
  if (str(body.company)) return NextResponse.json({ ok: true, configured: true });

  const name = oneLine(str(body.name)).slice(0, MAX.name);
  const email = str(body.email).slice(0, 254);
  const phone = oneLine(str(body.phone)).slice(0, MAX.phone);
  const subject = oneLine(str(body.subject)).slice(0, MAX.subject) || 'Website enquiry';
  const message = str(body.message).slice(0, MAX.message);

  if (!name) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Please write a little more so we can help properly.' },
      { status: 400 },
    );
  }

  const sentAtIso = new Date(now).toISOString();
  const notification = contactNotificationEmail({
    name,
    email,
    phone: phone || undefined,
    subject,
    message,
    sentAtIso,
  });

  const result = await sendEmail({
    to: INBOX,
    subject: notification.subject,
    html: notification.html,
    replyTo: email,
  });

  if (!result.ok && !result.configured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: `Our contact form is not connected yet. Please email us directly at ${INBOX} and we will reply within one business day.`,
      },
      { status: 503 },
    );
  }
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, configured: true, error: `Your message could not be sent. Please email ${INBOX} directly.` },
      { status: 502 },
    );
  }

  // Acknowledgement to the sender. Best effort — the message is already safely
  // delivered, so a failure here must not report the submission as failed.
  const ack = contactAckEmail({
    firstName: name.split(' ')[0],
    subject,
    message,
    siteUrl: siteUrl(req),
  });
  const ackResult = await sendEmail({ to: email, subject: ack.subject, html: ack.html });
  if (!ackResult.ok) {
    console.warn('[contact] acknowledgement to sender failed; message itself was delivered');
  }

  return NextResponse.json({ ok: true, configured: true });
}
