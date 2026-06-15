'use client';

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  Suspense,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  X,
  Eye,
  Star,
  ShoppingCart,
  Check,
  ArrowRight,
  LayoutGrid,
  Grid2x2,
  List,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import { useCart } from '@/context/CartContext';
import type { Product, Series } from '@/data/products';

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type SortOption =
  | 'popularity'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'name-asc';

interface ShopContentProps {
  products: Product[];
  seriesList: Series[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

type ViewMode = 'comfort' | 'large' | 'list';

const VIEWS: { key: ViewMode; label: string; icon: typeof List }[] = [
  { key: 'comfort', label: 'Grid', icon: LayoutGrid },
  { key: 'large', label: 'Large', icon: Grid2x2 },
  { key: 'list', label: 'List', icon: List },
];

const gridClassFor: Record<ViewMode, string> = {
  comfort: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  large: 'grid-cols-1 sm:grid-cols-2',
  list: 'grid-cols-1',
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'A – Z' },
];

// Deterministic pseudo-rating (4.5–5.0) derived from product id so it's stable.
function ratingFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Math.round((4.5 + (h % 6) / 10) * 10) / 10; // 4.5 .. 5.0
}

// ---------------------------------------------------------------------------
// Star rating row
// ---------------------------------------------------------------------------

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = value - i >= 0.75;
          const half = !filled && value - i >= 0.25;
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star className="absolute inset-0 h-3.5 w-3.5 text-beige-dark" fill="currentColor" />
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-muted tabular-nums">{value.toFixed(1)}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product card
// ---------------------------------------------------------------------------

function ShopCard({
  product,
  index,
  view,
  onQuickView,
}: {
  product: Product;
  index: number;
  view: ViewMode;
  onQuickView: (p: Product) => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const rating = ratingFor(product.id);

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
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  // ---- LIST view: horizontal row ----
  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: EASE }}
      >
        <Link href={`/shop/${product.id}`} className="group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-beige-dark/40 bg-white shadow-sm transition-all duration-400 hover:border-gold/50 hover:shadow-[0_18px_45px_-18px_rgba(212,160,23,0.28)] sm:gap-6">
          <div className="relative aspect-square w-28 shrink-0 overflow-hidden bg-beige sm:w-44">
            <Image
              src={`${product.imageFolder}/bottle-1.jpg`}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:640px) 112px, 176px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center py-3 pr-4 sm:py-5">
            <span
              className="mb-1.5 inline-block w-fit rounded-full px-2 py-0.5 font-heading text-[9px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: product.signatureColor }}
            >
              {product.series}
            </span>
            <StarRating value={rating} />
            <h3 className="mt-1 truncate font-heading text-lg font-bold uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-gold-deep sm:text-xl">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-muted sm:line-clamp-2">{product.tagline}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-center gap-2 py-3 pr-4 sm:py-5 sm:pr-6">
            <span className="leading-none text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-widest text-muted-light">From</span>
              <span className="font-heading text-xl font-bold text-gold-deep sm:text-2xl">${product.pricing.small.price}</span>
            </span>
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${added ? 'bg-gold-deep' : 'bg-navy hover:bg-gold-deep'}`}
            >
              {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            </button>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ---- GRID / LARGE view: vertical card ----
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: EASE }}
    >
      <Link href={`/shop/${product.id}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-beige-dark/40 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_24px_60px_-18px_rgba(212,160,23,0.28)]">
          {/* Image stage on beige */}
          <div className="relative aspect-square overflow-hidden bg-beige">
            <span
              className="absolute left-3.5 top-3.5 z-10 inline-block rounded-full px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: product.signatureColor }}
            >
              {product.series}
            </span>

            <Image
              src={`${product.imageFolder}/bottle-1.jpg`}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Hover action: quick view eye */}
            <div className="absolute inset-0 flex items-start justify-end p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                onClick={handleQuick}
                aria-label={`Quick view ${product.name}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold hover:text-white"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom view-details ribbon */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-4 transition-transform duration-400 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                View details <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5">
            <StarRating value={rating} />

            <h3 className="mt-2.5 font-heading text-[19px] font-bold uppercase leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-gold-deep">
              {product.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
              {product.tagline}
            </p>

            <div className="mt-auto flex items-center justify-between pt-5">
              <div className="leading-none">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-light">
                  From
                </span>
                <span className="font-heading text-2xl font-bold text-gold-deep">
                  ${product.pricing.small.price}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                aria-label={`Add ${product.name} to cart`}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${
                  added ? 'bg-gold-deep' : 'bg-navy hover:bg-gold-deep'
                }`}
              >
                {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Quick View modal
// ---------------------------------------------------------------------------

function QuickViewBody({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  // Fresh state per product because this body is keyed by product id below.
  const [size, setSize] = useState<'small' | 'large'>('small');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const tier = product.pricing[size];
    addItem({
      productId: product.id,
      name: product.name,
      price: tier.price,
      imageFolder: product.imageFolder,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-gold hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-square w-full shrink-0 bg-beige md:aspect-auto md:w-[44%]">
              <span
                className="absolute left-4 top-4 z-10 inline-block rounded-full px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-widest text-white"
                style={{ backgroundColor: product.signatureColor }}
              >
                {product.series}
              </span>
              <Image
                src={`${product.imageFolder}/bottle-1.jpg`}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>

            {/* Details */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <StarRating value={ratingFor(product.id)} />
              <h2 className="mt-2 font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-1.5 font-heading text-sm font-semibold uppercase tracking-wide text-gold-deep">
                {product.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {product.description}
              </p>

              {/* Pricing tiers */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {(['small', 'large'] as const).map((key) => {
                  const tier = product.pricing[key];
                  const isPremium = key === 'large';
                  const selected = size === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSize(key)}
                      className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                        selected
                          ? 'border-gold bg-gold/8'
                          : 'border-beige-dark/60 bg-white hover:border-gold/40'
                      }`}
                    >
                      {isPremium && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-2.5 py-0.5 font-heading text-[9px] font-bold uppercase tracking-widest text-gold-light">
                          Best Value · 20% Off
                        </span>
                      )}
                      <span className="block font-heading text-[11px] font-bold uppercase tracking-widest text-muted">
                        {isPremium ? 'Premium' : 'Standard'}
                      </span>
                      <span className="mt-1 block text-xs text-muted-light">
                        {isPremium
                          ? '3 bottles · Pack of 3'
                          : `1 bottle${product.bottleSizes && product.bottleSizes.length > 1 ? ` · ${product.bottleSizes.join(' or ')} caps` : ` · ${product.pricing.small.count} caps`}`}
                      </span>
                      <span className="mt-1.5 block font-heading text-xl font-bold text-ink">
                        ${tier.price}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 ${
                    added ? 'bg-gold-deep' : 'bg-navy hover:bg-gold-deep'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" /> Add to Cart
                    </>
                  )}
                </button>
                <Link
                  href={`/shop/${product.id}`}
                  className="flex items-center justify-center gap-1.5 rounded-full border-2 border-beige-dark/60 px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:border-gold/50 hover:text-gold-deep"
                >
                  Full details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
    </>
  );
}

function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="qv-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            key="qv-panel"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.32, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:max-h-[88vh] sm:rounded-3xl md:flex-row"
          >
            {/* Keyed by id so size/added reset cleanly per product */}
            <QuickViewBody key={product.id} product={product} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Inner content (uses useSearchParams — must sit under a Suspense boundary)
// ---------------------------------------------------------------------------

function ShopInner({ products, seriesList }: ShopContentProps) {
  const searchParams = useSearchParams();
  const [activeSeries, setActiveSeries] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<ViewMode>('comfort');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const scrollPills = () => pillsRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  // Honour ?series= query param — sync during render when it changes, so the
  // user can still pick other pills afterward. Uses the React-recommended
  // "store previous value in state, adjust during render" pattern.
  const seriesParam = searchParams.get('series');
  const [lastParam, setLastParam] = useState<string | null>(null);
  if (seriesParam !== lastParam) {
    setLastParam(seriesParam);
    if (seriesParam && seriesList.some((s) => s.slug === seriesParam)) {
      setActiveSeries(seriesParam);
    }
  }

  const seriesWithCounts = useMemo(
    () => seriesList.map((s) => ({ ...s, count: s.productIds.length })),
    [seriesList],
  );

  const filtered = useMemo(() => {
    const result =
      activeSeries === 'all'
        ? [...products]
        : products.filter((p) => p.seriesSlug === activeSeries);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricing.small.price - b.pricing.small.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricing.small.price - a.pricing.small.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.reverse(); // newest = later in the data array
        break;
      case 'popularity':
      default:
        break; // default catalogue order
    }
    return result;
  }, [products, activeSeries, sortBy]);

  const activeColor =
    activeSeries === 'all'
      ? '#D4A017'
      : seriesList.find((s) => s.slug === activeSeries)?.color ?? '#D4A017';

  return (
    <>
      <PageHero
        title="Shop"
        eyebrow={`${products.length} Formulas · ${seriesList.length} Series`}
        subtitle="Science-backed botanical formulas, crafted for every dimension of your wellbeing."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shop' }]}
        bottleSlug="glucose-balance"
      />

      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          {/* ============================================================ */}
          {/*  Filter bar                                                   */}
          {/* ============================================================ */}
          <div className="sticky top-[64px] z-30 -mx-5 mt-8 bg-cream/95 px-5 py-4 backdrop-blur-md lg:top-[80px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Series pills — horizontal scroll on mobile, with swipe affordance */}
              <div className="relative lg:flex-1">
                <p className="lg:hidden mb-1.5 flex items-center justify-end gap-1 pr-1 text-[11px] font-bold uppercase tracking-wider text-gold-deep">
                  Swipe<ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
                </p>
                <div ref={pillsRef} className="-mx-5 flex gap-2 overflow-x-auto scroll-smooth px-5 pb-1 pr-12 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 lg:pr-0 [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  onClick={() => setActiveSeries('all')}
                  className={`shrink-0 rounded-full border-2 px-4 py-2 font-heading text-[13px] font-bold uppercase tracking-wide transition-all duration-200 ${
                    activeSeries === 'all'
                      ? 'border-gold bg-gold text-white shadow-sm'
                      : 'border-beige-dark/60 bg-white text-ink hover:border-gold/50'
                  }`}
                >
                  All
                  <span className="ml-1.5 opacity-70">{products.length}</span>
                </button>

                {seriesWithCounts.map((s) => {
                  const selected = activeSeries === s.slug;
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setActiveSeries(s.slug)}
                      style={
                        selected
                          ? { backgroundColor: s.color, borderColor: s.color }
                          : { borderColor: `${s.color}55` }
                      }
                      className={`shrink-0 rounded-full border-2 px-4 py-2 font-heading text-[13px] font-bold uppercase tracking-wide transition-all duration-200 ${
                        selected
                          ? 'text-white shadow-sm'
                          : 'bg-white text-ink hover:bg-beige/60'
                      }`}
                    >
                      {s.name}
                      <span className="ml-1.5 opacity-70">{s.count}</span>
                    </button>
                  );
                })}
                </div>
                {/* mobile scroll affordance: right fade + tap-to-scroll chevron */}
                <div className="lg:hidden pointer-events-none absolute right-0 top-6 bottom-1 w-14 bg-gradient-to-l from-cream via-cream/85 to-transparent" />
                <button
                  type="button"
                  aria-label="Scroll series right for more"
                  onClick={scrollPills}
                  className="lg:hidden absolute right-0 top-[62%] -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-navy text-white shadow-[0_5px_14px_-4px_rgba(27,42,74,0.65)] active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Count + view toggle + sort */}
              <div className="flex items-center justify-between gap-3 lg:justify-end">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-muted">
                  <span style={{ color: activeColor }} className="font-heading text-base font-bold">
                    {filtered.length}
                  </span>
                  {filtered.length === 1 ? 'product' : 'products'}
                </span>

                {/* Interactive layout switcher */}
                <div className="flex items-center gap-0.5 rounded-full border-2 border-beige-dark/60 bg-white p-1">
                  {VIEWS.map((v) => {
                    const Icon = v.icon;
                    const active = view === v.key;
                    return (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setView(v.key)}
                        aria-label={`${v.label} view`}
                        aria-pressed={active}
                        title={`${v.label} view`}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                          active ? 'bg-navy text-white shadow-sm' : 'text-muted hover:bg-beige hover:text-navy'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((o) => !o)}
                    onBlur={() => setTimeout(() => setSortOpen(false), 150)}
                    className="flex items-center gap-2 rounded-full border-2 border-beige-dark/60 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-gold/50"
                  >
                    <span className="text-muted-light">Sort:</span>
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                    <ChevronDown
                      className={`h-4 w-4 text-muted-light transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-2xl border border-beige-dark/60 bg-white shadow-xl"
                      >
                        {sortOptions.map((o) => (
                          <button
                            key={o.value}
                            type="button"
                            onMouseDown={() => {
                              setSortBy(o.value);
                              setSortOpen(false);
                            }}
                            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                              sortBy === o.value
                                ? 'bg-beige font-semibold text-gold-deep'
                                : 'text-ink hover:bg-beige/50'
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/*  Product grid                                                 */}
          {/* ============================================================ */}
          <motion.div
            key={`${activeSeries}-${sortBy}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`mt-8 grid ${gridClassFor[view]} ${view === 'list' ? 'gap-4' : 'gap-6 lg:gap-7'}`}
          >
            {filtered.map((product, i) => (
              <ShopCard
                key={product.id}
                product={product}
                index={i}
                view={view}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Exported wrapper — Suspense boundary required for useSearchParams (Next 16)
// ---------------------------------------------------------------------------

export default function ShopContent(props: ShopContentProps) {
  return (
    <Suspense fallback={null}>
      <ShopInner {...props} />
    </Suspense>
  );
}
