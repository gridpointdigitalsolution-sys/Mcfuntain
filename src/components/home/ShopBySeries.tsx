'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dna, Brain, Gauge, Bone, Eye, Droplets, Heart,
  ShoppingBag, Star, ArrowRight, ChevronRight, type LucideIcon,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useCart } from '@/context/CartContext';
import { products as localProducts, series as localSeries } from '@/data/products';
import type { Product, Series } from '@/data/products';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  Dna, Brain, Gauge, Bone, Eye, Droplets, Heart,
};

function priceLabel(product: Product): string {
  const p = product.pricing.small.price;
  return `$${p % 1 === 0 ? p : p.toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Product card                                                       */
/* ------------------------------------------------------------------ */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.pricing.small.price,
      imageFolder: product.imageFolder,
      size: 'small',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      <Link href={`/shop/${product.id}`} className="block group h-full">
        <div className="relative flex h-full flex-col bg-white rounded-2xl overflow-hidden border border-beige-dark/40 hover:border-gold/40 hover:shadow-[0_24px_60px_-18px_rgba(212,160,23,0.22)] hover:-translate-y-1.5 transition-all duration-500">
          {/* gold accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-navy via-gold to-gold-light" />

          {/* image */}
          <div className="relative h-[250px] md:h-[290px] overflow-hidden bg-beige/40">
            <Image
              src={`${product.imageFolder}/bottle-1.jpg`}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute top-4 left-4 z-10 inline-block px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white rounded-full bg-navy shadow-sm">
              {product.series}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
              <span className="inline-flex items-center gap-2 bg-white text-ink px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                View Product <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <motion.button
              onClick={handleAdd}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-white shadow-lg shadow-gold/25 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <ShoppingBag size={18} />
              )}
            </motion.button>
          </div>

          {/* info */}
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
              <span className="ml-1.5 text-xs font-medium text-muted">5.0</span>
            </div>

            <h3 className="text-lg md:text-xl font-heading font-bold uppercase tracking-tight text-ink group-hover:text-gold-deep transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>

            <div className="mt-auto pt-5 flex items-center justify-between">
              <span className="text-xl font-bold text-ink">{priceLabel(product)}</span>
              <span className="text-sm font-semibold text-gold group-hover:text-gold-deep transition-colors duration-300 flex items-center gap-1">
                Details
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main — tabbed Shop by Series                                       */
/* ------------------------------------------------------------------ */
export default function ShopBySeries({
  products = localProducts,
  series = localSeries,
}: {
  products?: Product[];
  series?: Series[];
}) {
  const [active, setActive] = useState(series[0].slug);
  const reduce = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollTabs = () => tabsRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  const activeSeries = series.find((s) => s.slug === active) ?? series[0];
  const activeProducts = activeSeries.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden mounds-both">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream" />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(212,160,23,0.6) 0%, transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Collection"
          title="Shop by Series"
          subtitle="Seven pillars of wellness, each a complete system of botanical support. Pick a series to explore its formulas."
        />

        {/* TABS */}
        <div className="relative">
          {/* mobile-only "swipe for more" hint */}
          <p className="sm:hidden mb-2 flex items-center justify-end gap-1.5 pr-1 text-[11px] font-bold uppercase tracking-wider text-gold-deep">
            Swipe for more
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
          </p>
          <div ref={tabsRef} className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex gap-2.5 sm:flex-wrap sm:justify-center min-w-max sm:min-w-0 pb-2 pr-12 sm:pr-0">
              {series.map((s) => {
              const Icon = ICONS[s.icon] ?? Heart;
              const isActive = s.slug === active;
              return (
                <button
                  key={s.slug}
                  onClick={(e) => {
                    setActive(s.slug);
                    e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
                  }}
                  className={`relative flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-heading font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 cursor-pointer border ${
                    isActive
                      ? 'text-white border-navy'
                      : 'text-navy/70 border-beige-dark/60 bg-white hover:text-navy hover:border-navy/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="series-tab-pill"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-light' : 'text-gold'}`} strokeWidth={2} />
                    {s.name}
                    <span className={`text-[11px] font-bold ${isActive ? 'text-white/60' : 'text-muted/70'}`}>
                      {s.productIds.length}
                    </span>
                  </span>
                </button>
              );
              })}
            </div>
          </div>
          {/* mobile scroll affordance: right fade + tap-to-scroll chevron */}
          <div className="sm:hidden pointer-events-none absolute right-0 top-7 bottom-2 w-16 bg-gradient-to-l from-cream via-cream/85 to-transparent" />
          <motion.button
            type="button"
            aria-label="Scroll series right for more"
            onClick={scrollTabs}
            animate={reduce ? undefined : { x: [0, 5, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            className="sm:hidden absolute right-1 top-[60%] -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-navy text-white shadow-[0_6px_18px_-4px_rgba(27,42,74,0.65)] active:scale-95"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* active series description */}
        <motion.p
          key={`desc-${active}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-6 mb-10 text-center text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {activeSeries.description}
        </motion.p>

        {/* PRODUCTS — keyed swap (no AnimatePresence gap = no page jump) */}
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {activeProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/shop?series=${activeSeries.slug}`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy text-navy font-bold uppercase tracking-wider rounded-full hover:bg-navy hover:text-white transition-all duration-300"
          >
            All {activeSeries.name} Formulas
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white text-base font-bold uppercase tracking-wider rounded-full shadow-xl shadow-gold/20 hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-400"
          >
            <ShoppingBag size={20} />
            View All {products.length} Supplements
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
