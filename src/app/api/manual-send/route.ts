import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { manualByProductId, manualFilename } from '@/data/manuals';
import { products } from '@/data/products';
import { signedManualUrl } from '@/lib/manual-links';
import { sendEmail, isValidEmail, type Attachment } from '@/lib/email';
import { prospectManualEmail } from '@/lib/email-templates';
import { VAULT_COOKIE, cookieValid } from '@/lib/owner-gate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ATTACH_LIMIT_BYTES = 5 * 1024 * 1024; // 5 MB

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin || 'https://www.mcfuntain.com';
}

function pitchFor(productId: string): { name: string; pitch: string; url: string } {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return { name: 'McFuntain product', pitch: '', url: '' };
  const firstSentence = prod.description.split(/(?<=\.)\s/)[0] || prod.description;
  const pitch = [prod.tagline, firstSentence].filter(Boolean).join(' ');
  return { name: prod.name, pitch, url: `/shop/${prod.id}` };
}

export async function POST(req: NextRequest) {
  // Owner gate — this endpoint is for the private vault only.
  const jar = await cookies();
  if (!cookieValid(jar.get(VAULT_COOKIE)?.value, Date.now())) {
    return NextResponse.json({ ok: false, error: 'Not authorised.' }, { status: 401 });
  }

  let body: { email?: unknown; productId?: unknown; attach?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const productId = typeof body.productId === 'string' ? body.productId : '';
  const wantAttach = body.attach !== false; // default ON

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }
  const manual = manualByProductId(productId);
  if (!manual) {
    return NextResponse.json({ ok: false, error: 'Unknown product.' }, { status: 404 });
  }

  const base = siteUrl(req);
  const downloadUrl = signedManualUrl(base, manual.slug, Date.now());
  const { name, pitch, url } = pitchFor(manual.productId);

  // Attach the PDF if requested and under the size limit; otherwise rely on the
  // signed link (recommended for large files to avoid attachment rejections).
  let attachments: Attachment[] | undefined;
  if (wantAttach) {
    const filename = manualFilename(manual.slug);
    const filePath = path.join(process.cwd(), 'public', 'pdfs', filename);
    try {
      const info = await stat(filePath);
      if (info.size <= ATTACH_LIMIT_BYTES) {
        const buf = await readFile(filePath);
        attachments = [{ filename, content: buf.toString('base64') }];
      }
    } catch {
      // fall through to link-only
    }
  }

  const { subject, html } = prospectManualEmail({
    productName: name,
    downloadUrl,
    pitch,
    productUrl: `${base}${url}`,
  });

  const result = await sendEmail({ to: email, subject, html, attachments });

  console.log(`[manual-send] ts=${new Date().toISOString()} to=${email} slug=${manual.slug} attached=${Boolean(attachments)}`);

  if (!result.ok && !result.configured) {
    return NextResponse.json(
      { ok: false, configured: false, message: 'Email delivery is not enabled yet (RESEND_API_KEY not set).' },
      { status: 503 },
    );
  }
  if (!result.ok) {
    return NextResponse.json({ ok: false, configured: true, error: 'Could not send the email. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, configured: true });
}
