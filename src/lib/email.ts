import 'server-only';

/**
 * Transactional email helper.
 *
 * Uses Resend's HTTP API (no SDK dependency — plain fetch). Configure with:
 *   RESEND_API_KEY        — Resend API key (server-only)
 *   MCFUNTAIN_FROM_EMAIL  — verified sender, e.g. "McFuntain <support@mcfuntain.com>"
 *
 * When RESEND_API_KEY is absent the helper does NOT pretend to send. It returns
 * { ok: false, configured: false } so callers can show an honest message and so
 * the founder can wire the key later without touching app code.
 */

export type SendResult =
  | { ok: true; configured: true; id: string }
  | { ok: false; configured: false }
  | { ok: false; configured: true; error: string };

export type Attachment = { filename: string; content: string /* base64 */ };

export type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
  replyTo?: string;
};

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress(): string {
  return process.env.MCFUNTAIN_FROM_EMAIL || 'McFuntain Nutraceuticals <support@mcfuntain.com>';
}

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, configured: false };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: Array.isArray(args.to) ? args.to : [args.to],
        subject: args.subject,
        html: args.html,
        ...(args.replyTo ? { reply_to: args.replyTo } : {}),
        ...(args.attachments && args.attachments.length
          ? { attachments: args.attachments }
          : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, configured: true, error: `Resend ${res.status}: ${detail.slice(0, 200)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, configured: true, id: json.id || 'sent' };
  } catch (err) {
    return { ok: false, configured: true, error: err instanceof Error ? err.message : 'unknown error' };
  }
}

/** Basic, defensive email validation. */
export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.length <= 254;
}
