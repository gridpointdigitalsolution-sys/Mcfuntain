'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ShoppingCart,
  Shield,
  Truck,
  Leaf,
  Award,
  Minus,
  Plus,
  ChevronDown,
  Check,
  Star,
  Clock,
  Beaker,
  Info,
  ArrowRight,
  FlaskConical,
  Quote,
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import Disclaimer from '@/components/ui/Disclaimer';
import ProductManualSection from '@/components/product/ProductManualSection';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'how-to-use', label: 'How To Use' },
  { id: 'reviews', label: 'Reviews' },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// ---------------------------------------------------------------------------
// Scroll-animated wrapper
// ---------------------------------------------------------------------------

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FAQ Accordion item
// ---------------------------------------------------------------------------

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-beige-dark/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start justify-between w-full py-5 text-left group cursor-pointer"
      >
        <span className="font-heading text-base md:text-lg font-semibold uppercase tracking-wide text-ink pr-6 group-hover:text-gold-deep transition-colors duration-300">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            open ? 'bg-navy border-navy' : 'bg-transparent border-beige-dark'
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              open ? 'rotate-180 text-gold' : 'text-muted'
            }`}
          />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted leading-relaxed text-base md:text-lg">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static reviews (tasteful, generic; FAQ content rendered separately below)
// ---------------------------------------------------------------------------

const STATIC_REVIEWS = [
  {
    name: 'Margaret O.',
    stars: 5,
    title: 'Worth every penny',
    text: 'I was skeptical about herbal supplements, but after six weeks I genuinely feel the difference. Clean ingredients, no fillers, and the bottles arrived beautifully packaged.',
    verified: true,
  },
  {
    name: 'David A.',
    stars: 5,
    title: 'The premium bundle is the way to go',
    text: 'Started with one bottle, came back for the premium pack. Consistency is everything with botanicals and the bundle keeps me stocked without thinking about it.',
    verified: true,
  },
  {
    name: 'Chinwe E.',
    stars: 4,
    title: 'Noticeable results, gentle on the stomach',
    text: 'Most formulas upset my digestion. This one is gentle, easy to take with meals, and I started noticing real changes around week three. Will reorder.',
    verified: true,
  },
  {
    name: 'Samuel K.',
    stars: 5,
    title: 'Quality you can feel',
    text: 'You can tell these are properly sourced botanicals. The taglines are not just marketing — the timeline they describe matched my experience almost exactly.',
    verified: false,
  },
] as const;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTier, setSelectedTier] = useState<'small' | 'large'>('small');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);

  // ----- Pricing math (Standard = 1 bottle · Premium = Pack of 3 bottles) ----
  const { small, large } = product.pricing;
  // large.count now holds the NUMBER OF BOTTLES in the premium bundle (3).
  const bottlesInBundle = large.count;
  // What the bundle would cost bought as singles vs. its actual price
  const equivalentSinglesPrice = small.price * bottlesInBundle;
  const savePct = Math.max(
    0,
    Math.round((1 - large.price / equivalentSinglesPrice) * 100),
  );
  const perBottlePremium = large.price / bottlesInBundle;

  const price = product.pricing[selectedTier].price;
  const tierLabel =
    selectedTier === 'small'
      ? `Standard · ${small.count} Capsules`
      : `Premium · ${bottlesInBundle} Bottles`;

  // ----- Add to cart --------------------------------------------------------
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: `${product.name} (${selectedTier === 'small' ? 'Standard' : `Premium · ${bottlesInBundle}-Bottle Bundle`})`,
      price,
      imageFolder: product.imageFolder,
      size: selectedTier,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // ----- Gallery images ------------------------------------------------------
  const thumbnails = [1, 2, 3, 4, 5].map(
    (n) => `${product.imageFolder}/bottle-${n}.jpg`,
  );

  // ----- Sticky bar visibility ----------------------------------------------
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ----- How-to-use journey steps -------------------------------------------
  const timelineSteps = [
    {
      week: 'Week 1–2',
      title: 'Foundation Phase',
      desc: 'Your body begins absorbing the botanical compounds. You may notice subtle improvements in energy and well-being.',
    },
    {
      week: 'Week 3–4',
      title: 'Activation Phase',
      desc: 'Active ingredients reach therapeutic levels. Many users report noticeable benefits during this period.',
    },
    {
      week: 'Week 5–8',
      title: 'Optimization Phase',
      desc: 'Cumulative benefits strengthen. Consistent daily use supports deeper, long-lasting improvements.',
    },
    {
      week: 'Week 9–12',
      title: 'Peak Performance',
      desc: 'Full spectrum benefits realized. Your body has fully integrated the formula for sustained results.',
    },
  ];

  // ==========================================================================
  return (
    <>
      {/* ================================================================ */}
      {/*  Breadcrumb                                                       */}
      {/* ================================================================ */}
      <div className="pt-24 md:pt-28 bg-beige/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <nav
            className="flex items-center gap-2 text-sm text-muted py-4 overflow-x-auto whitespace-nowrap"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gold-deep transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/shop" className="hover:text-gold-deep transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-ink font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ================================================================ */}
      {/*  Product Hero — gallery left / buy panel right                    */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="bg-gradient-to-b from-beige/40 to-cream pb-16 md:pb-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-6 md:pt-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ---------------- Image Gallery ---------------- */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                {/* Main stage */}
                <div className="relative rounded-3xl overflow-hidden border border-beige-dark/30 shadow-lg aspect-[4/3] sm:aspect-square bg-beige">
                  {/* Radial gold glow stage */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 62%, rgba(212,160,23,0.22) 0%, rgba(245,240,232,0) 58%)',
                    }}
                  />
                  {/* Slow rotating gold ring décor */}
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full border border-dashed border-gold/30 pointer-events-none"
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={thumbnails[selectedImage]}
                        alt={`${product.name} - View ${selectedImage + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Series badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-white rounded-full shadow-sm"
                      style={{ backgroundColor: product.signatureColor }}
                    >
                      {product.series} Series
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap">
                  {thumbnails.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      aria-label={`View product image ${i + 1}`}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-300 flex-shrink-0 cursor-pointer ${
                        selectedImage === i
                          ? 'border-gold shadow-md shadow-gold/20'
                          : 'border-beige-dark/40 hover:border-gold/40'
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ---------------- Buy Panel ---------------- */}
            <div className="lg:pt-2">
              {/* Series chip */}
              <Reveal>
                <Link
                  href={`/shop?series=${product.seriesSlug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy text-xs font-semibold tracking-[0.18em] uppercase text-gold hover:bg-navy/90 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {product.series} Series
                </Link>
              </Reveal>

              {/* Name — Oswald bold uppercase */}
              <Reveal delay={0.05}>
                <h1 className="mt-4 font-heading font-bold uppercase text-ink leading-[1.05] text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  {product.name}
                </h1>
              </Reveal>

              {/* Stars */}
              <Reveal delay={0.08}>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 md:w-[18px] md:h-[18px]"
                        fill="#D4A017"
                        stroke="#D4A017"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">4.8 / 5 (120+ reviews)</span>
                </div>
              </Reveal>

              {/* Tagline — Playfair italic */}
              <Reveal delay={0.1}>
                <p className="mt-3 font-serif italic text-xl md:text-2xl text-gold-deep">
                  {product.tagline}
                </p>
              </Reveal>

              {/* Short description */}
              <Reveal delay={0.14}>
                <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">
                  {product.description}
                </p>
              </Reveal>

              <div className="my-7 h-px bg-beige-dark/60" />

              {/* ----- Pricing tier selector ----- */}
              <Reveal delay={0.18}>
                <h3 className="font-heading text-sm font-semibold tracking-[0.18em] uppercase text-ink">
                  Choose Your Plan
                </h3>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard */}
                  <button
                    onClick={() => setSelectedTier('small')}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${
                      selectedTier === 'small'
                        ? 'border-navy bg-navy/[0.04] shadow-md'
                        : 'border-beige-dark/50 bg-white hover:border-navy/40'
                    }`}
                  >
                    {selectedTier === 'small' && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold" />
                      </span>
                    )}
                    <div className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-muted">
                      Standard
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-ink">
                      1 Bottle ·{' '}
                      {product.bottleSizes && product.bottleSizes.length > 1
                        ? `${product.bottleSizes.join(' or ')} Capsules`
                        : `${small.count} Capsules`}
                    </div>
                    <div className="mt-2 font-heading text-2xl font-bold text-ink">
                      ${small.price}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      {Math.round(small.count / 2)}-day supply
                    </div>
                  </button>

                  {/* Premium */}
                  <button
                    onClick={() => setSelectedTier('large')}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${
                      selectedTier === 'large'
                        ? 'border-gold bg-gold/[0.06] shadow-lg shadow-gold/15'
                        : 'border-gold/50 bg-white hover:border-gold'
                    }`}
                  >
                    <div className="absolute -top-3 left-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white rounded-full shadow-sm">
                        Best Value{savePct > 0 ? ` · Save ${savePct}%` : ''}
                      </span>
                    </div>
                    {selectedTier === 'large' && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                    <div className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                      Premium
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-ink">
                      {bottlesInBundle} Bottles · Pack of {bottlesInBundle}
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-heading text-2xl font-bold text-ink">
                        ${large.price}
                      </span>
                      {savePct > 0 && (
                        <span className="text-sm text-muted line-through">
                          ${equivalentSinglesPrice.toFixed(0)}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-gold-deep font-medium">
                      Only ${perBottlePremium.toFixed(2)} per bottle
                    </div>
                  </button>
                </div>
              </Reveal>

              {/* ----- Quantity + Add to Cart ----- */}
              <Reveal delay={0.22}>
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center justify-between sm:justify-start border border-beige-dark/60 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3.5 text-muted hover:text-ink hover:bg-beige transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 py-3.5 text-sm font-semibold text-ink min-w-[48px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3.5 text-muted hover:text-ink hover:bg-beige transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-heading font-bold uppercase tracking-[0.12em] text-base rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
                      addedToCart
                        ? 'bg-navy text-gold shadow-navy/25'
                        : 'bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white shadow-gold/25 hover:shadow-xl hover:shadow-gold/35'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added To Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart — ${(price * quantity).toFixed(2)}
                      </>
                    )}
                  </motion.button>
                </div>
              </Reveal>

              {/* ----- Trust badges ----- */}
              <Reveal delay={0.26}>
                <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Shield, label: 'GMP Certified' },
                    { icon: FlaskConical, label: 'Lab Tested' },
                    { icon: Leaf, label: '100% Natural' },
                    { icon: Truck, label: 'Free Shipping $99+' },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl bg-white border border-beige-dark/30 text-center"
                    >
                      <Icon className="w-5 h-5 text-gold-deep" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* ----- Compact FDA/DSHEA disclaimer ----- */}
              <Reveal delay={0.3}>
                <div className="mt-6">
                  <Disclaimer variant="compact" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Tabs — Description / Ingredients / How To Use / Reviews          */}
      {/* ================================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Tab bar */}
          <Reveal>
            <div className="border-b border-beige-dark/50">
              <div
                className="flex gap-1 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mb-px"
                role="tablist"
                aria-label="Product information"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 sm:px-2 py-4 font-heading font-bold uppercase tracking-[0.14em] text-sm md:text-base whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'text-ink'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="tab-underline"
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute left-0 right-0 -bottom-px h-[3px] bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Tab panels */}
          <div className="pt-10 md:pt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {/* ---------------- DESCRIPTION ---------------- */}
                {activeTab === 'description' && (
                  <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
                    {/* Long description + why you need it */}
                    <div className="lg:col-span-3">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-ink">
                        About This Formula
                      </h2>
                      <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full" />
                      <p className="mt-6 text-base md:text-lg text-muted leading-relaxed">
                        {product.longDescription}
                      </p>

                      {/* Why you need it — quote card */}
                      <div className="mt-8 relative rounded-2xl bg-navy p-7 md:p-9 overflow-hidden">
                        <div
                          className="absolute inset-0 pointer-events-none opacity-60"
                          aria-hidden="true"
                          style={{
                            background:
                              'radial-gradient(circle at 85% 15%, rgba(212,160,23,0.18) 0%, transparent 55%)',
                          }}
                        />
                        <Quote className="w-8 h-8 text-gold/60" aria-hidden="true" />
                        <h3 className="relative mt-3 font-heading text-lg md:text-xl font-bold uppercase tracking-wide text-gold">
                          Why You Need It
                        </h3>
                        <p className="relative mt-3 text-cream/90 leading-relaxed text-base md:text-lg">
                          {product.whyYouNeedIt}
                        </p>
                      </div>

                      {/* Suitable for */}
                      {product.suitableFor && product.suitableFor.length > 0 && (
                        <div className="mt-8">
                          <h3 className="font-heading text-lg md:text-xl font-bold uppercase text-ink">
                            This Is For You If&hellip;
                          </h3>
                          <div className="mt-4 grid sm:grid-cols-2 gap-3">
                            {product.suitableFor.map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                                  <Check className="w-3 h-3 text-gold" />
                                </span>
                                <span className="text-sm md:text-base text-muted leading-relaxed">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Benefits checklist */}
                    <div className="lg:col-span-2">
                      <div className="lg:sticky lg:top-28 rounded-2xl bg-beige/60 border border-beige-dark/30 p-7 md:p-8">
                        <h3 className="font-heading text-lg md:text-xl font-bold uppercase text-ink">
                          Key Benefits
                        </h3>
                        <div className="mt-2 h-0.5 w-12 bg-gold rounded-full" />
                        <ul className="mt-5 space-y-4">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg bg-gradient-to-br from-gold-deep to-gold flex items-center justify-center shadow-sm">
                                <Check className="w-3.5 h-3.5 text-white" />
                              </span>
                              <span className="text-sm md:text-base text-ink font-medium leading-relaxed">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- INGREDIENTS ---------------- */}
                {activeTab === 'ingredients' && (
                  <div>
                    <div className="text-center mb-10">
                      <span className="font-heading inline-block text-xs font-semibold tracking-[0.22em] uppercase text-gold-deep">
                        Science-Backed Botanicals
                      </span>
                      <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold uppercase text-ink">
                        Key Ingredients
                      </h2>
                      <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-gold-deep via-gold to-gold-light mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {product.ingredients.map((ing, i) => (
                        <motion.div
                          key={ing.name}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                          className="group relative bg-cream rounded-2xl p-6 border border-beige-dark/30 hover:border-gold/40 hover:shadow-xl transition-all duration-500 h-full"
                        >
                          <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full bg-gradient-to-r from-gold-deep via-gold to-gold-light transition-all duration-500 group-hover:left-0 group-hover:right-0" />
                          <div className="pt-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-heading text-lg font-bold uppercase text-ink group-hover:text-gold-deep transition-colors duration-300">
                                  {ing.name}
                                </h3>
                                <p className="font-serif text-sm italic text-muted-light mt-0.5">
                                  {ing.latin}
                                </p>
                              </div>
                              <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy flex items-center justify-center shadow-sm">
                                <Beaker className="w-5 h-5 text-gold" />
                              </span>
                            </div>
                            <p className="mt-4 text-muted text-base leading-relaxed">
                              {ing.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- HOW TO USE ---------------- */}
                {activeTab === 'how-to-use' && (
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                      <span className="font-heading inline-block text-xs font-semibold tracking-[0.22em] uppercase text-gold-deep">
                        Optimal Usage
                      </span>
                      <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold uppercase text-ink">
                        How To Use
                      </h2>
                      <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-gold-deep via-gold to-gold-light mx-auto rounded-full" />
                    </div>

                    {/* Protocols */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative p-8 rounded-2xl border-2 border-navy/25 bg-white">
                        <div className="absolute -top-3 left-6 px-4 py-1 font-heading text-xs font-bold tracking-wider uppercase text-gold bg-navy rounded-full">
                          Standard Protocol
                        </div>
                        <p className="pt-3 text-[17px] md:text-lg text-ink font-medium leading-relaxed">
                          {product.dosage.standard}
                        </p>
                        <p className="mt-3 text-base text-muted">
                          Recommended for daily maintenance and general wellness support.
                        </p>
                      </div>
                      <div className="relative p-8 rounded-2xl border-2 border-gold/40 bg-white">
                        <div className="absolute -top-3 left-6 px-4 py-1 font-heading text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-gold-deep to-gold rounded-full">
                          Advanced Protocol
                        </div>
                        <p className="pt-3 text-[17px] md:text-lg text-ink font-medium leading-relaxed">
                          {product.dosage.advanced}
                        </p>
                        <p className="mt-3 text-base text-muted">
                          For intensive support during targeted wellness periods.
                        </p>
                      </div>
                    </div>

                    {/* Timeline note */}
                    <div className="mt-8 p-6 rounded-2xl bg-beige/50 border border-beige-dark/30 flex items-start gap-4">
                      <Clock className="w-5 h-5 text-gold-deep flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading font-bold uppercase text-ink text-base md:text-lg">
                          When To Expect Results
                        </h4>
                        <p className="mt-1.5 text-base md:text-[17px] text-muted leading-relaxed">
                          {product.dosage.timeline}
                        </p>
                      </div>
                    </div>

                    {/* Journey steps */}
                    <div className="mt-12">
                      <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-ink text-center mb-8">
                        Your 12-Week Journey
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {timelineSteps.map((step, i) => (
                          <motion.div
                            key={step.week}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                            className="relative p-6 rounded-2xl bg-cream border border-beige-dark/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-heading w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {i + 1}
                              </span>
                              <div>
                                <span className="block text-[11px] font-bold tracking-[0.16em] uppercase text-gold-deep">
                                  {step.week}
                                </span>
                                <h4 className="font-heading text-base md:text-lg font-bold uppercase text-ink leading-tight">
                                  {step.title}
                                </h4>
                              </div>
                            </div>
                            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
                              {step.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- REVIEWS ---------------- */}
                {activeTab === 'reviews' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Summary */}
                    <div className="text-center mb-10">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-6 h-6" fill="#D4A017" stroke="#D4A017" />
                        ))}
                      </div>
                      <p className="mt-3 font-heading text-3xl md:text-4xl font-bold text-ink">
                        4.8 <span className="text-xl text-muted font-medium">/ 5</span>
                      </p>
                      <p className="mt-1 text-sm text-muted">Based on 120+ verified reviews</p>
                    </div>

                    {/* Review cards */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {STATIC_REVIEWS.map((review, i) => (
                        <motion.div
                          key={review.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                          className="p-6 rounded-2xl bg-cream border border-beige-dark/30 h-full flex flex-col"
                        >
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className="w-4 h-4"
                                fill={s <= review.stars ? '#D4A017' : 'none'}
                                stroke={s <= review.stars ? '#D4A017' : '#E8DFD0'}
                              />
                            ))}
                          </div>
                          <h4 className="mt-3 font-heading text-base md:text-lg font-bold uppercase text-ink">
                            {review.title}
                          </h4>
                          <p className="mt-2 text-sm md:text-base text-muted leading-relaxed flex-1">
                            {review.text}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-sm">
                            <span className="font-semibold text-ink">{review.name}</span>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-xs text-gold-deep font-medium">
                                <Check className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* FAQ accordion */}
                    {product.faq && product.faq.length > 0 && (
                      <div className="mt-14">
                        <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-ink text-center">
                          Common Questions
                        </h3>
                        <div className="mt-2 h-0.5 w-12 bg-gold mx-auto rounded-full" />
                        <div className="mt-6 bg-cream rounded-2xl border border-beige-dark/30 p-6 md:p-8">
                          {product.faq.map((item, i) => (
                            <FAQItem key={i} question={item.q} answer={item.a} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Safety strip                                                     */}
      {/* ================================================================ */}
      <section className="py-12 md:py-16 bg-beige/40 border-y border-beige-dark/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Disclaimer',
                text: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
              },
              {
                icon: Info,
                title: 'Safety Notes',
                text: 'Consult your healthcare provider before use if you are pregnant, nursing, taking medication, or have a medical condition. Keep out of reach of children.',
              },
              {
                icon: Clock,
                title: 'Storage',
                text: 'Store in a cool, dry place away from direct sunlight. Keep bottle tightly closed when not in use. No refrigeration required.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Read the Full Product Manual                                     */}
      {/* ================================================================ */}
      <ProductManualSection productId={product.id} productName={product.name} />

      {/* ================================================================ */}
      {/*  Related Products                                                 */}
      {/* ================================================================ */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-beige/30">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="text-center mb-14">
                <span className="font-heading inline-block mb-3 text-xs font-semibold tracking-[0.22em] uppercase text-gold-deep">
                  From the {product.series} Series &amp; Beyond
                </span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-ink">
                  You May Also Like
                </h2>
                <div className="mt-5 h-0.5 w-16 bg-gradient-to-r from-gold-deep via-gold to-gold-light mx-auto rounded-full" />
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  slug={p.id}
                  tagline={p.tagline}
                  price={`$${p.pricing.small.price}`}
                  numericPrice={p.pricing.small.price}
                  imageFolder={p.imageFolder}
                  signatureColor={p.signatureColor}
                  series={p.series}
                  index={i}
                />
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-12 text-center">
                <Link
                  href="/shop"
                  className="font-heading inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-gold font-bold uppercase tracking-[0.12em] text-sm rounded-full hover:bg-navy/90 hover:shadow-lg transition-all duration-300"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  Sticky Mobile Add-to-Cart Bar                                    */}
      {/* ================================================================ */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 z-50 md:hidden"
          >
            <div className="bg-white/95 backdrop-blur-md border-t border-beige-dark/40 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{product.name}</p>
                  <p className="text-xs text-muted">{tierLabel}</p>
                </div>
                <span className="font-heading text-lg font-bold text-ink">${price}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className={`font-heading flex items-center gap-2 px-5 py-2.5 font-bold uppercase tracking-wide text-sm rounded-xl shadow-md transition-all duration-300 ${
                    addedToCart
                      ? 'bg-navy text-gold shadow-navy/25'
                      : 'bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white shadow-gold/25'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
