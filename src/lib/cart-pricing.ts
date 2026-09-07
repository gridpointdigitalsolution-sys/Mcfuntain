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

/**
 * Per-line bulk discount.
 *
 * Deliberately zero. There used to be an undocumented ladder here (2 units =
 * 20% off, 3 = 30%) that was advertised nowhere and quietly undercut the
 * Premium 3-Pack the product pages call "Best Value": three single bottles at
 * 30% off beat the pack on most of the catalogue, and because it also applied
 * to pack lines, ordering three packs compounded on top of the pack discount.
 *
 * The Premium 3-Pack is the store's bulk offer. Keeping a second, larger,
 * secret one could only ever cannibalise it. The function stays so the UI and
 * the Stripe pricing path keep one shared place to add a future, advertised
 * promotion.
 */
export function getQuantityDiscount(_quantity: number): number {
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
