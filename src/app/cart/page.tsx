'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { useCart, type CartItem } from '@/context/CartContext';
import PageHero from '@/components/ui/PageHero';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FREE_SHIPPING_THRESHOLD = 99;
const SHIPPING_COST = 8.99;

const EASE = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const itemVariants = {
  initial: { opacity: 0, x: -24, height: 0 },
  animate: {
    opacity: 1,
    x: 0,
    height: 'auto' as const,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: 32,
    height: 0,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

// ---------------------------------------------------------------------------
// Cart Page
// ---------------------------------------------------------------------------

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + shippingCost;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  return (
    <div className="min-h-screen bg-cream">
      <PageHero
        title="Your Cart"
        eyebrow="Almost There"
        bottleSlug="libido-support"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]}
        subtitle={
          items.length > 0
            ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} ready for checkout`
            : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* ============================================================
                Cart Items
                ============================================================ */}
            <div className="flex-1 w-full min-w-0">
              {/* Free shipping progress */}
              {amountToFreeShipping > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 md:p-5 rounded-2xl bg-white border border-beige-dark/40 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy">
                      <Truck className="w-4 h-4 text-gold" />
                    </span>
                    <p className="text-sm text-ink font-medium">
                      Add{' '}
                      <span className="font-bold text-gold-deep">
                        ${amountToFreeShipping.toFixed(2)}
                      </span>{' '}
                      more for free shipping
                    </p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-beige overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 md:p-5 rounded-2xl bg-navy border border-navy shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15">
                      <Truck className="w-4 h-4 text-gold" />
                    </span>
                    <p className="text-sm text-white font-medium">
                      You qualify for{' '}
                      <span className="font-bold text-gold">free shipping</span>!
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Items list */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow
                      key={`${item.productId}-${item.size}`}
                      item={item}
                      onRemove={() => removeItem(item.productId, item.size)}
                      onUpdateQuantity={(qty) =>
                        updateQuantity(item.productId, item.size, qty)
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom actions */}
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 text-sm font-heading font-semibold uppercase tracking-[0.12em] text-navy hover:text-gold-deep transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-muted hover:text-navy underline-offset-4 hover:underline transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* ============================================================
                Order Summary Sidebar
                ============================================================ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              className="w-full lg:w-[380px] lg:sticky lg:top-28 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl border border-beige-dark/40 shadow-xl shadow-black/[0.05] overflow-hidden">
                {/* Header */}
                <div className="bg-navy px-6 py-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <h2 className="font-heading text-xl font-bold uppercase tracking-[0.08em] text-white">
                    Order Summary
                  </h2>
                </div>

                {/* Breakdown */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">
                      Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-semibold text-ink">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Estimated Shipping</span>
                    <span className="font-semibold text-ink">
                      {shippingCost === 0 ? (
                        <span className="font-bold text-gold-deep">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-beige-dark/50" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading font-bold uppercase tracking-[0.06em] text-ink">
                      Total
                    </span>
                    <span className="font-heading text-3xl font-bold text-navy">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <div className="px-6 pb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert('Checkout coming soon')}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white font-heading font-bold uppercase tracking-[0.1em] text-base rounded-xl shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/35 transition-shadow duration-300"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Proceed to Checkout
                  </motion.button>
                  <p className="mt-3 text-center text-xs text-muted">
                    Secure checkout powered by SSL encryption
                  </p>
                </div>

                {/* Trust badges */}
                <div className="border-t border-beige-dark/40 bg-beige/40 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Package, label: 'Quality Guaranteed' },
                      { icon: Truck, label: 'Fast Delivery' },
                      { icon: ShieldCheck, label: 'Secure Payment' },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-2 text-center"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy">
                          <Icon className="w-[18px] h-[18px] text-gold" />
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted leading-tight">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botanical assurance strip */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
                <Leaf className="w-3.5 h-3.5 text-gold-deep" />
                Premium botanical formulas — third-party tested
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyCart() {
  return (
    <div className="relative mx-auto max-w-2xl px-5 py-20 md:py-28 text-center overflow-hidden">
      {/* Faded bottle illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[440px] aspect-square"
        aria-hidden
      >
        <Image
          src="/images/hero/longevity-30.webp"
          alt=""
          fill
          sizes="440px"
          className="object-contain"
        />
      </motion.div>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold-deep"
        >
          Nothing Here Yet
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
          className="mt-3 font-heading text-4xl md:text-5xl font-bold uppercase text-ink"
        >
          Your Cart is Empty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
          className="mt-4 text-muted text-lg max-w-md mx-auto"
        >
          Discover our collection of premium botanical supplements crafted from
          nature&apos;s finest ingredients.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="mt-9"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white font-heading font-bold uppercase tracking-[0.1em] rounded-full shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart Item Row Component
// ---------------------------------------------------------------------------

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  const discount = item.quantity >= 3 ? 0.30 : item.quantity >= 2 ? 0.20 : 0;
  const lineTotal = item.price * item.quantity * (1 - discount);
  const originalTotal = item.price * item.quantity;
  const sizeLabel = item.size === 'small' ? 'Standard' : 'Value Size';

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="group bg-white rounded-2xl border border-beige-dark/40 p-4 md:p-5 shadow-sm hover:shadow-md hover:border-gold/40 transition-[box-shadow,border-color] duration-300"
    >
      <div className="flex gap-4 md:gap-6">
        {/* Product image */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl bg-gradient-to-br from-beige/70 to-cream overflow-hidden flex-shrink-0 border border-beige-dark/30">
          <Image
            src={`${item.imageFolder}/bottle-1.jpg`}
            alt={item.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>

        {/* Info + controls */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Top row: name + remove */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/shop/${item.productId}`}
                className="font-heading text-base md:text-lg font-bold uppercase tracking-[0.02em] text-ink hover:text-gold-deep transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="mt-1 inline-flex items-center rounded-full bg-beige px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-navy">
                {sizeLabel}
              </p>
            </div>
            <button
              onClick={onRemove}
              className="flex-shrink-0 p-2 rounded-lg text-muted hover:text-navy hover:bg-beige transition-colors"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom row: quantity + price */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity stepper */}
            <div className="flex items-center border border-beige-dark/60 rounded-full overflow-hidden bg-cream">
              <button
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                className="px-3 py-2 text-muted hover:text-navy hover:bg-beige transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 py-1.5 text-sm font-bold text-navy min-w-[32px] text-center tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="px-3 py-2 text-muted hover:text-navy hover:bg-beige transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pricing */}
            <div className="text-right">
              {discount > 0 && (
                <p className="text-xs text-muted line-through">
                  ${originalTotal.toFixed(2)}
                </p>
              )}
              <p className="font-heading text-lg md:text-xl font-bold text-navy">
                ${lineTotal.toFixed(2)}
              </p>
              {discount > 0 ? (
                <p className="text-xs font-bold uppercase tracking-[0.06em] text-gold-deep">
                  {Math.round(discount * 100)}% off
                </p>
              ) : item.quantity > 1 ? (
                <p className="text-xs text-muted">
                  ${item.price.toFixed(2)} each
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
