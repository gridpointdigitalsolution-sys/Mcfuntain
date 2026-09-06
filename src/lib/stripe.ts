import 'server-only';
import Stripe from 'stripe';

/**
 * Stripe client.
 *
 * Nothing here throws at import time — the whole checkout path stays dormant
 * and reports itself as unconfigured until STRIPE_SECRET_KEY exists, so the
 * site keeps building and running without payment keys.
 */

let client: Stripe | null = null;

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Returns null when no secret key is configured. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) {
    client = new Stripe(key, {
      // Pinned so a Stripe-side default change can never alter behaviour.
      apiVersion: '2026-08-26.dahlia',
      typescript: true,
      appInfo: { name: 'McFuntain Nutraceuticals', url: 'https://www.mcfuntain.com' },
    });
  }
  return client;
}

/** True while the configured key is a test-mode key. */
export function isTestMode(): boolean {
  return (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_test_');
}
