import 'server-only';
import type { NextRequest } from 'next/server';

/**
 * Small in-memory rate limiter, shared by the public API routes.
 *
 * Per serverless instance, so it is a speed bump against casual abuse rather
 * than a distributed guarantee. That is the right trade-off here: the routes it
 * protects only send email, and a stricter limit would need external state.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Returns true when this key has exceeded `limit` requests in `windowMs`. */
export function rateLimited(
  key: string,
  { limit, windowMs, now }: { limit: number; windowMs: number; now: number },
): boolean {
  const rec = buckets.get(key);
  if (!rec || now > rec.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
    }
    return false;
  }
  rec.count += 1;
  return rec.count > limit;
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}
