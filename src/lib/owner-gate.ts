import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Owner gate for the private product vault.
 *
 * The expected passphrase is MCFUNTAIN_LIBRARY_KEY. On a correct passphrase the
 * vault-auth route sets a signed cookie (mcf_vault) valid for 30 days, so the
 * owner does not re-enter it each visit. The signature uses MCFUNTAIN_LIBRARY_KEY
 * itself as the HMAC secret (the secret never leaves the server).
 */

export const VAULT_COOKIE = 'mcf_vault';
export const VAULT_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days, seconds

const DEV_FALLBACK_KEY = 'mcfuntain-dev-vault-key-set-MCFUNTAIN_LIBRARY_KEY-in-env';

/** True only when a real passphrase env is set. */
export function vaultConfigured(): boolean {
  return Boolean(process.env.MCFUNTAIN_LIBRARY_KEY);
}

/**
 * In production we FAIL CLOSED: if MCFUNTAIN_LIBRARY_KEY is unset, the vault is
 * locked to everyone (the dev fallback must never grant access on the live
 * domain). Locally the dev fallback is allowed so the page is testable.
 */
function failClosed(): boolean {
  return process.env.NODE_ENV === 'production' && !vaultConfigured();
}

function key(): string {
  return process.env.MCFUNTAIN_LIBRARY_KEY || DEV_FALLBACK_KEY;
}

/** Constant-time passphrase check against MCFUNTAIN_LIBRARY_KEY. */
export function passphraseValid(input: unknown): boolean {
  if (failClosed()) return false;
  if (typeof input !== 'string' || input.length === 0) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(key());
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(expires: number): string {
  return createHmac('sha256', key()).update(`vault.${expires}`).digest('hex');
}

/** Build the signed cookie value: "<expiresUnix>.<hex>". */
export function issueCookieValue(nowMs: number): string {
  const expires = Math.floor(nowMs / 1000) + VAULT_COOKIE_MAX_AGE;
  return `${expires}.${sign(expires)}`;
}

/** Verify a cookie value is well-formed, unexpired, and correctly signed. */
export function cookieValid(value: string | undefined, nowMs: number): boolean {
  if (failClosed()) return false;
  if (!value) return false;
  const dot = value.indexOf('.');
  if (dot <= 0) return false;
  const expires = Number(value.slice(0, dot));
  const sig = value.slice(dot + 1);
  if (!Number.isInteger(expires) || expires <= 0) return false;
  if (Math.floor(nowMs / 1000) > expires) return false;
  const expected = sign(expires);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}
