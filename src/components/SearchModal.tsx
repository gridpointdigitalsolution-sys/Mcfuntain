'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products, series } from '@/data/products';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

const panelVariants = {
  hidden: { opacity: 0, y: -32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -24,
    scale: 0.97,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const resultVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Unique series names for the quick-filter pills. */
const seriesNames = series.map((s) => s.name);

/** Price formatter. */
function formatPrice(price: number): string {
  return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  // -----------------------------------------------------------------------
  // Filter logic
  // -----------------------------------------------------------------------

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    let pool = products;

    // Narrow by series pill first
    if (activeSeries) {
      pool = pool.filter(
        (p) => p.series.toLowerCase() === activeSeries.toLowerCase(),
      );
    }

    if (!q) return pool;

    return pool.filter((p) => {
      const haystack = [
        p.name,
        p.series,
        p.tagline,
        p.description,
        p.longDescription,
        ...p.benefits,
        ...p.ingredients.map((ing) => `${ing.name} ${ing.description}`),
        ...p.faq.map((f) => `${f.q} ${f.a}`),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeSeries]);

  // -----------------------------------------------------------------------
  // Navigation helper
  // -----------------------------------------------------------------------

  const navigateTo = useCallback(
    (id: string) => {
      onClose();
      router.push(`/shop/${id}`);
    },
    [onClose, router],
  );

  // -----------------------------------------------------------------------
  // Reset on open / close
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(-1);
      setActiveSeries(null);
      // Small timeout so the input is in the DOM before we focus
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // -----------------------------------------------------------------------
  // Lock body scroll while open
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // -----------------------------------------------------------------------
  // Keyboard handling
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev + 1;
            return next >= filtered.length ? 0 : next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filtered.length - 1 : next;
          });
          break;

        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < filtered.length) {
            navigateTo(filtered[activeIndex].id);
          } else if (filtered.length === 1) {
            navigateTo(filtered[0].id);
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, activeIndex, filtered, navigateTo, onClose]);

  // -----------------------------------------------------------------------
  // Scroll active result into view
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (activeIndex < 0 || !resultsRef.current) return;
    const el = resultsRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query, activeSeries]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gold/15"
            style={{
              background: 'rgba(250, 250, 250, 0.88)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            {/* ─── Search Input ─────────────────────────────────── */}
            <div className="relative flex items-center border-b border-beige-dark/50">
              <Search className="absolute left-5 w-5 h-5 text-muted pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ailment, benefit, ingredient..."
                className="w-full bg-transparent py-5 pl-14 pr-28 text-lg text-ink placeholder:text-muted-light focus:outline-none font-body"
                autoComplete="off"
                spellCheck={false}
              />
              <div className="absolute right-4 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-muted bg-beige rounded-md border border-beige-dark/40 uppercase">
                  Esc
                </kbd>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-ink hover:bg-beige-dark/40 transition-colors duration-200"
                  aria-label="Close search"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
              {/* Gold focus accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                initial={{ width: 0 }}
                animate={{ width: query ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* ─── Quick-filter Series Pills ────────────────────── */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-beige-dark/30 overflow-x-auto scrollbar-none">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                Popular
              </span>
              {seriesNames.map((name) => (
                <button
                  key={name}
                  onClick={() =>
                    setActiveSeries((prev) =>
                      prev === name ? null : name,
                    )
                  }
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                    activeSeries === name
                      ? 'bg-gradient-to-r from-gold to-gold-deep text-white border-gold shadow-md shadow-gold/20'
                      : 'bg-beige/60 text-muted border-beige-dark/30 hover:border-gold/40 hover:text-gold-deep hover:bg-beige'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* ─── Results Area ──────────────────────────────────── */}
            <div
              ref={resultsRef}
              className="max-h-[56vh] overflow-y-auto overscroll-contain py-2 px-2"
            >
              {filtered.length > 0 ? (
                filtered.map((product, i) => (
                  <motion.button
                    key={product.id}
                    custom={i}
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => navigateTo(product.id)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl text-left transition-colors duration-200 group/result ${
                      activeIndex === i
                        ? 'bg-beige/80 shadow-sm'
                        : 'hover:bg-beige/50'
                    }`}
                  >
                    {/* Product Thumbnail */}
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-beige/80 to-white overflow-hidden border border-beige-dark/20 flex items-center justify-center">
                      <Image
                        src={`${product.imageFolder}/bottle-1.jpg`}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-ink truncate group-hover/result:text-gold-deep transition-colors duration-200">
                          {product.name}
                        </h4>
                        <span
                          className="flex-shrink-0 inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-white rounded-full"
                          style={{ backgroundColor: product.signatureColor }}
                        >
                          {product.series}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted truncate">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price & Arrow */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <span className="text-sm font-bold text-ink">
                        {formatPrice(product.pricing.small.price)}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          activeIndex === i
                            ? 'text-gold translate-x-0 opacity-100'
                            : 'text-muted -translate-x-1 opacity-0'
                        }`}
                      />
                    </div>
                  </motion.button>
                ))
              ) : (
                /* ─── Empty State ────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-16 px-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mb-4">
                    <Search className="w-7 h-7 text-muted-light" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-ink">
                    No products found
                  </h4>
                  <p className="mt-1.5 text-sm text-muted max-w-xs">
                    Try adjusting your search or browse by series using the
                    filters above.
                  </p>
                </motion.div>
              )}
            </div>

            {/* ─── Footer ──────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-beige-dark/30 bg-beige/30">
              <div className="flex items-center gap-1.5 text-[11px] text-muted">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>
                  <strong className="text-ink font-semibold">{filtered.length}</strong>{' '}
                  {filtered.length === 1 ? 'product' : 'products'}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-beige border border-beige-dark/40 font-semibold text-[10px]">
                    &uarr;&darr;
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-beige border border-beige-dark/40 font-semibold text-[10px]">
                    &crarr;
                  </kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-beige border border-beige-dark/40 font-semibold text-[10px]">
                    esc
                  </kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
