import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { verifyManualRequest } from '@/lib/manual-links';
import { manualBySlug, manualFilename } from '@/data/manuals';

export const runtime = 'nodejs';
// Never cache a signed, per-user download response.
export const dynamic = 'force-dynamic';

// --- simple in-memory rate limiter: 60 requests / minute / IP ---------------
const RATE_LIMIT = 60;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string, now: number): boolean {
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

const NAVY = '#15233F';
const GOLD = '#C9A24A';
const CREAM = '#F8F1E5';

function gonePage(message: string): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Link expired — McFuntain Nutraceuticals</title>
<style>
  body{margin:0;background:${CREAM};color:${NAVY};font-family:Georgia,serif;
       display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
  .card{max-width:520px;text-align:center;background:#fff;border:1px solid #e7ddc7;
        border-radius:14px;padding:40px 32px;box-shadow:0 24px 60px -28px rgba(21,35,63,.3)}
  .eyebrow{font-family:Arial,sans-serif;font-weight:700;letter-spacing:.18em;
           text-transform:uppercase;font-size:11px;color:${GOLD};margin:0 0 14px}
  h1{font-size:26px;margin:0 0 12px}
  p{font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#2D2D2D;margin:0 0 26px}
  a{display:inline-block;background:${GOLD};color:${NAVY};font-family:Arial,sans-serif;
    font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;font-size:14px}
</style></head><body><div class="card">
  <p class="eyebrow">McFuntain Nutraceuticals</p>
  <h1>This download link has expired</h1>
  <p>${message}</p>
  <a href="https://www.mcfuntain.com/account/orders">Open your account orders</a>
</div></body></html>`;
  return new Response(html, {
    status: 410,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const now = Date.now();
  const ip = clientIp(req);

  if (rateLimited(ip, now)) {
    return new Response('Too many requests', {
      status: 429,
      headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' },
    });
  }

  const { slug } = await params;
  const url = new URL(req.url);
  const verdict = verifyManualRequest(
    slug,
    url.searchParams.get('expires'),
    url.searchParams.get('sig'),
    now,
  );

  if (!verdict.ok) {
    if (verdict.reason === 'expired') {
      return gonePage('For your security, manual links expire after 30 days. Visit your order page to issue a fresh one.');
    }
    if (verdict.reason === 'unknown') {
      return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }
    // malformed / bad-signature
    return gonePage('This link is invalid or has been altered. Visit your order page to issue a fresh one.');
  }

  const manual = manualBySlug(verdict.slug)!;
  const filename = manualFilename(manual.slug);
  const filePath = path.join(process.cwd(), 'public', 'pdfs', filename);

  let data: Buffer;
  try {
    data = await readFile(filePath);
  } catch {
    return new Response('Manual file not found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  // Log the download event (order id is attached by the email link when present).
  const orderId = url.searchParams.get('order') || '-';
  console.log(`[manual-download] ts=${new Date(now).toISOString()} order=${orderId} slug=${manual.slug} ip=${ip}`);

  return new Response(new Uint8Array(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(data.length),
      'Cache-Control': 'private, max-age=0, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
