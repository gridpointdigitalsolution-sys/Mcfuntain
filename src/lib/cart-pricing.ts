/**
 * Cart money rules — the numbers the browser renders and the server charges.
 *
 * Deliberately free of any catalogue import so client bundles stay small; the
 * catalogue lookup lives in the server-only companion, src/lib/price-cart.ts.
 * Both sides share these constants so a customer is never charged something
 * other than what the cart showed them.
 */

export const FREE_SHIPPING_THRESHOLD = 99;
export const SHIPPING_COST = 8.99;

/** Bulk discount by line quantity. */
export function getQuantityDiscount(quantity: number): number {
  if (quantity >= 3) return 0.3;
  if (quantity >= 2) return 0.2;
  return 0;
}

export type CartSize = 'small' | 'large';

/** What the browser sends us: identity and quantity only — never a price. */
export type RequestedLine = { productId: string; size: CartSize; quantity: number };

export type PricedLine = {
  productId: string;
  name: string;
  /** e.g. "1 Bottle - 120 Capsules" or "3 Bottles - Pack of 3" */
  description: string;
  size: CartSize;
  quantity: number;
  /** Catalogue unit price in dollars. */
  unitPrice: number;
  discount: number;
  /** unitPrice x quantity x (1 - discount), rounded to cents. */
  lineTotal: number;
};

export type PricedCart = {
  lines: PricedLine[];
  subtotal: number;
  shipping: number;
  total: number;
};

/** Dollars to integer cents, the only unit Stripe accepts. */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}
