import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { manualBySlug } from '@/data/manuals';

/**
 * Signed, time-limited download links for product manuals.
 *
 * URL pattern: /api/manuals/<slug>?expires=<unix-ts>&sig=<hex>
 * The signature is HMAC-SHA256 over "<slug>.<expires>" with the server-only
 * secret MCFUNTAIN_PDF_SIGNING_KEY. Verified by the /api/manuals route.
 *
 * NOTE: set MCFUNTAIN_PDF_SIGNING_KEY in the environment (.env.local locally,
 * Vercel project env in production). A dev fallback is used only when unset so
 * local builds work; that fallback is NOT secure for production.
 */

const DEV_FALLBACK_KEY = 'mcfuntain-dev-signing-key-set-MCFUNTAIN_PDF_SIGNING_KEY-in-env';

function signingKey(): string {
  return process.env.MCFUNTAIN_PDF_SIGNING_KEY || DEV_FALLBACK_KEY;
}

/** Default link lifetime: 30 days, in seconds. */
export const MANUAL_LINK_TTL_SECONDS = 30 * 24 * 60 * 60;

function sign(slug: string, expires: number): string {
  return createHmac('sha256', signingKey())
    .update(`${slug}.${expires}`)
    .digest('hex');
}

/**
 * Build a signed, time-limited download path for a manual slug.
 * @param slug   marketing slug (e.g. "Mitochondria-Energy")
 * @param nowMs  current time in ms (pass Date.now() from the caller)
 * @param ttl    seconds until expiry (default 30 days)
 */
export function signedManualPath(
  slug: string,
  nowMs: number,
  ttl: number = MANUAL_LINK_TTL_SECONDS,
): string {
  const expires = Math.floor(nowMs / 1000) + ttl;
  const sig = sign(slug, expires);
  return `/api/manuals/${encodeURIComponent(slug)}?expires=${expires}&sig=${sig}`;
}

/** Absolute signed URL (for emails). siteUrl e.g. "https://mcfuntain.com". */
export function signedManualUrl(
  siteUrl: string,
  slug: string,
  nowMs: number,
  ttl: number = MANUAL_LINK_TTL_SECONDS,
): string {
  return `${siteUrl.replace(/\/$/, '')}${signedManualPath(slug, nowMs, ttl)}`;
}

export type VerifyResult =
  | { ok: true; slug: string }
  | { ok: false; reason: 'unknown' | 'malformed' | 'expired' | 'bad-signature' };

/**
 * Validate an incoming signed request.
 * @param slug      slug from the route
 * @param expiresRaw `expires` query param
 * @param sigRaw     `sig` query param
 * @param nowMs      current time in ms (pass Date.now() from the route)
 */
export function verifyManualRequest(
  slug: string,
  expiresRaw: string | null,
  sigRaw: string | null,
  nowMs: number,
): VerifyResult {
  if (!manualBySlug(slug)) return { ok: false, reason: 'unknown' };
  if (!expiresRaw || !sigRaw) return { ok: false, reason: 'malformed' };

  const expires = Number(expiresRaw);
  if (!Number.isInteger(expires) || expires <= 0) {
    return { ok: false, reason: 'malformed' };
  }
  if (Math.floor(nowMs / 1000) > expires) {
    return { ok: false, reason: 'expired' };
  }

  const expected = sign(slug, expires);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(sigRaw, 'utf8');
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: 'bad-signature' };
  }
  return { ok: true, slug };
}
