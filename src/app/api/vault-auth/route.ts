import { NextRequest, NextResponse } from 'next/server';
import {
  passphraseValid,
  issueCookieValue,
  VAULT_COOKIE,
  VAULT_COOKIE_MAX_AGE,
} from '@/lib/owner-gate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- light brute-force guard: 10 attempts / 15 min / IP ---------------------
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60_000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooMany(ip: string, now: number): boolean {
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const now = Date.now();
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (tooMany(ip, now)) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  let body: { passphrase?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!passphraseValid(body.passphrase)) {
    return NextResponse.json({ ok: false, error: 'Incorrect passphrase.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(VAULT_COOKIE, issueCookieValue(now), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: VAULT_COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(VAULT_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
