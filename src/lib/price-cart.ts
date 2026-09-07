import 'server-only';
import { getProducts } from '@/lib/content';
import {
  FREE_SHIPPING_THRESHOLD,
  getQuantityDiscount,
  type CartSize,
  type PricedCart,
  type PricedLine,
  type RequestedLine,
  SHIPPING_COST,
} from './cart-pricing';

/**
 * Server-side cart pricing.
 *
 * Prices always come from the catalogue, never from the request body — a
 * browser can send any number it likes, so nothing it sends about money is
 * trusted. Shares its constants with the cart UI via ./cart-pricing.
 *
 * The catalogue is read through getProducts(), the SAME merged source the shop
 * and product pages render from, so a price edited in Sanity Studio changes what
 * the customer is charged and what they were shown together. Reading the raw
 * local file here instead would let the displayed price and the charged price
 * drift apart the moment anyone edited a price in the Studio.
 */

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function describe(size: CartSize, capsuleCount: number, bottles: number): string {
  return size === 'small'
    ? `1 Bottle - ${capsuleCount} Capsules`
    : `${bottles} Bottles - Pack of ${bottles}`;
}

/**
 * Re-price a requested cart from the catalogue.
 *
 * Unknown products and non-positive quantities are dropped rather than guessed
 * at. Quantity is capped so a malformed request cannot create an absurd order.
 */
export async function priceCart(requested: RequestedLine[]): Promise<PricedCart> {
  const products = await getProducts();
  const lines: PricedLine[] = [];

  for (const line of requested) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;

    const size: CartSize = line.size === 'large' ? 'large' : 'small';
    const quantity = Math.min(Math.max(Math.floor(Number(line.quantity) || 0), 0), 99);
    if (quantity < 1) continue;

    const tier = size === 'large' ? product.pricing.large : product.pricing.small;
    const unitPrice = Number(tier.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) continue;

    const discount = getQuantityDiscount(quantity);
    lines.push({
      productId: product.id,
      name: product.name,
      description: describe(size, product.pricing.small.count, product.pricing.large.count),
      size,
      quantity,
      unitPrice,
      discount,
      lineTotal: round2(unitPrice * quantity * (1 - discount)),
    });
  }

  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0));
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  return { lines, subtotal, shipping, total: round2(subtotal + shipping) };
}
