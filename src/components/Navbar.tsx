"use client";

/* ------------------------------------------------------------------ *
 *  McFuntain Navbar — "Floating Glass" (founder pick 2026-06-14)
 *  Detached blurred rounded pill · visible bold links · standout gold
 *  Shop button w/ product dropdown (hover + tap) · navy/white cart ·
 *  big logo · solid-on-scroll · full mobile drawer. Navy + gold only.
 * ------------------------------------------------------------------ */

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, ChevronDown, FlaskConical, Brain, Flame, Bone, Eye, Leaf, HeartPulse, ArrowRight, Menu, X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchModal from "@/components/SearchModal";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---- Data (gold-only — no per-series rainbow colors) ---- */
const productSeries = [
  { name: "Cellular", href: "/shop?series=cellular", icon: FlaskConical, products: [
    { name: "Mitochondria Energy", href: "/shop/mito-energy" },
    { name: "Stem Cells", href: "/shop/cell-renewal" },
    { name: "Longevity 30+", href: "/shop/longevity-30" },
    { name: "Longevity 50+", href: "/shop/longevity-50" },
  ] },
  { name: "Neuro", href: "/shop?series=neuro", icon: Brain, products: [
    { name: "CogniBoost Restore", href: "/shop/cogniboost-restore" },
    { name: "Nerve Renewal", href: "/shop/nerve-renewal" },
    { name: "Neuro Restore", href: "/shop/neuro-restore" },
  ] },
  { name: "Metabolic", href: "/shop?series=metabolic", icon: Flame, products: [
    { name: "Glucose Balance", href: "/shop/glucose-balance" },
    { name: "Thyroid Balance", href: "/shop/thyroid-balance" },
    { name: "Belly Fat Balance", href: "/shop/belly-fat-balance" },
    { name: "GLUT4 Activation", href: "/shop/glut4-metabolic-activation" },
  ] },
  { name: "Mobility", href: "/shop?series=mobility", icon: Bone, products: [
    { name: "Joint & Bone", href: "/shop/joint-bone" },
    { name: "Lumbar Restore", href: "/shop/lumbar-restore" },
  ] },
  { name: "Vision", href: "/shop?series=vision", icon: Eye, products: [
    { name: "Vision Support", href: "/shop/vision-support" },
  ] },
  { name: "Detox", href: "/shop?series=detox", icon: Leaf, products: [
    { name: "Kidney Restore", href: "/shop/kidney-restore" },
    { name: "Respiratory Shield", href: "/shop/respiratory-shield" },
    { name: "GERD Respiratory", href: "/shop/gerd-respiratory" },
  ] },
  { name: "Wellness", href: "/shop?series=wellness", icon: HeartPulse, products: [
    { name: "Vitality", href: "/shop/vitality" },
    { name: "Womb Renewal", href: "/shop/womb-renewal" },
    { name: "Libido Support", href: "/shop/libido-support" },
    { name: "Blood Booster Pro", href: "/shop/blood-booster-pro" },
    { name: "Female Fertility", href: "/shop/female-fertility" },
    { name: "Male Fertility", href: "/shop/male-fertility" },
  ] },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop", dropdown: true },
  { name: "Our Research", href: "/science" },
  { name: "Contact", href: "/contact" },
];

/* ---- shared dropdown panel ---- */
function SeriesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden border bg-white border-gold/15 shadow-[0_24px_70px_-10px_rgba(0,0,0,0.30)]">
      <div className="h-[3px] bg-gradient-to-r from-gold-deep via-gold to-gold-deep" />
      <div className="px-6 py-6">
        <div className="flex items-end justify-between mb-4 pb-3 border-b border-beige-dark/40">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.3em] uppercase text-gold mb-1">Browse by Series</p>
            <h4 className="font-heading text-[20px] font-bold uppercase tracking-tight text-ink">Seven Pillars of Wellness</h4>
          </div>
          <Link href="/shop" onClick={onNavigate} className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-[#0f1a30] text-white text-[12px] font-bold tracking-[0.14em] uppercase rounded-full transition-colors">View All <ArrowRight size={13} /></Link>
        </div>
        <div className="grid gap-x-5 gap-y-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {productSeries.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="group/col">
                <Link href={s.href} onClick={onNavigate} className="flex items-center gap-2 pb-2 mb-2 border-b-2 border-beige-dark/60 hover:border-navy transition-colors">
                  <span className="grid place-items-center h-8 w-8 rounded-md bg-gold/15 text-gold transition-colors group-hover/col:bg-navy group-hover/col:text-white"><Icon size={15} strokeWidth={2.4} /></span>
                  <span className="font-heading text-[15px] font-bold uppercase tracking-[0.06em] text-ink group-hover/col:text-navy transition-colors">{s.name}</span>
                </Link>
                <ul className="space-y-1">
                  {s.products.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} onClick={onNavigate} className="group/p flex items-center gap-1.5 text-[13px] font-semibold text-ink/70 hover:text-navy hover:translate-x-[3px] transition-all">
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/p:bg-navy transition-colors" />{p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);
  const [tap, setTap] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mShop, setMShop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { totalItems } = useCart();
  const cartCount = totalItems;
  const shopOpen = hover || tap;

  const pathname = usePathname();
  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  /* solid-on-scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  const onEnter = useCallback(() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setHover(true); }, []);
  const onLeave = useCallback(() => { hoverTimer.current = setTimeout(() => setHover(false), 180); }, []);
  const closeAll = useCallback(() => { setTap(false); setHover(false); setMobile(false); setMShop(false); }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-3 sm:px-4 pt-4 sm:pt-5">
        <nav className={`mx-auto max-w-6xl rounded-[28px] lg:rounded-full border backdrop-blur-2xl transition-all duration-300 ${scrolled ? "bg-white/90 border-gold/15 shadow-[0_14px_46px_-10px_rgba(0,0,0,0.30)]" : "bg-white/75 border-white/60 shadow-[0_14px_46px_-10px_rgba(0,0,0,0.22)]"}`}>
          <div className="px-5 sm:px-7 h-[88px] sm:h-[100px] flex items-center justify-between">
            {/* big logo */}
            <Link href="/" aria-label="Home" onClick={closeAll} className="flex-shrink-0">
              <Image src="/images/brand/logo-dark.png" alt="McFuntain Nutraceuticals" width={460} height={130} priority className="h-[72px] sm:h-[90px] w-auto" style={{ width: "auto" }} />
            </Link>

            {/* desktop links — active state (sliding underline) + hover lift */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return l.dropdown ? (
                  <li key={l.name} className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                    <button
                      onClick={() => setTap((v) => !v)}
                      aria-expanded={shopOpen}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-extrabold uppercase tracking-[0.12em] transition-all duration-300 ${
                        shopOpen || active
                          ? "bg-gold-deep text-white shadow-lg shadow-gold/45 scale-[1.04]"
                          : "bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/55 hover:-translate-y-[2px]"
                      }`}
                    >
                      Shop <motion.span animate={{ rotate: shopOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={17} strokeWidth={2.6} /></motion.span>
                    </button>
                    {active && <motion.span layoutId="nav-active" className="pointer-events-none absolute -bottom-2 left-3 right-3 h-[3px] rounded-full bg-navy" />}
                    <AnimatePresence>
                      {shopOpen && (
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: EASE }}
                          className="absolute left-1/2 -translate-x-1/2 top-[150%] w-[820px] max-w-[88vw] z-50">
                          <SeriesPanel onNavigate={closeAll} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={l.name} className="relative">
                    <Link href={l.href} className="group relative block py-1.5">
                      <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className={`inline-block text-[15px] font-extrabold uppercase tracking-[0.1em] transition-colors ${active ? "text-navy" : "text-ink/80 group-hover:text-navy"}`}>
                        {l.name}
                      </motion.span>
                      {!active && <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-0 rounded-full bg-navy transition-all duration-300 group-hover:w-3/4" />}
                    </Link>
                    {active && <motion.span layoutId="nav-active" className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-navy" />}
                  </li>
                );
              })}
            </ul>

            {/* desktop right actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button aria-label="Search" onClick={() => setSearchOpen(true)} className="grid place-items-center h-11 w-11 rounded-full text-ink hover:bg-navy/10 hover:text-navy transition"><Search size={21} /></button>
              <Link href="/cart" aria-label="Cart" className="relative grid place-items-center h-11 w-11 rounded-full bg-navy text-white hover:bg-[#0f1a30] transition shadow-md">
                <ShoppingBag size={21} />
                {cartCount > 0 && <span className="absolute -right-1 -top-1 grid place-items-center h-5 min-w-5 rounded-full bg-gold text-ink text-[11px] font-bold ring-2 ring-white px-1">{cartCount}</span>}
              </Link>
            </div>

            {/* mobile cluster */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/cart" aria-label="Cart" className="relative grid place-items-center h-10 w-10 rounded-full bg-navy text-white shadow-md">
                <ShoppingBag size={19} />
                {cartCount > 0 && <span className="absolute -right-1 -top-1 grid place-items-center h-5 min-w-5 rounded-full bg-gold text-ink text-[10px] font-bold ring-2 ring-white px-1">{cartCount}</span>}
              </Link>
              <button aria-label="Menu" onClick={() => setMobile((v) => !v)} className="grid place-items-center h-10 w-10 rounded-full bg-navy text-white">{mobile ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
          </div>
        </nav>

        {/* mobile drawer */}
        <AnimatePresence>
          {mobile && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: EASE }}
              className="lg:hidden mx-auto max-w-6xl mt-3 rounded-3xl bg-white/97 backdrop-blur-2xl border border-gold/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="p-4">
                {navLinks.map((l) =>
                  l.dropdown ? (
                    <div key={l.name}>
                      <button onClick={() => setMShop((v) => !v)} className={`w-full flex items-center justify-between px-4 py-3.5 text-[18px] font-extrabold uppercase tracking-wide rounded-xl border-l-[3px] transition ${isActive("/shop") ? "text-navy bg-navy/5 border-navy" : "text-ink border-transparent"}`}>
                        Shop <motion.span animate={{ rotate: mShop ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={20} /></motion.span>
                      </button>
                      <AnimatePresence>
                        {mShop && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden">
                            <div className="grid grid-cols-2 gap-2 px-3 pb-3">
                              {productSeries.map((s) => {
                                const Icon = s.icon;
                                return (
                                  <Link key={s.name} href={s.href} onClick={closeAll} className="flex items-center gap-2 p-3 rounded-xl bg-beige/70 text-ink font-bold text-[13px] uppercase tracking-wide hover:bg-navy/10 transition">
                                    <span className="grid place-items-center h-8 w-8 rounded-md bg-gold/15 text-gold"><Icon size={15} /></span>{s.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={l.name} href={l.href} onClick={closeAll} className={`block px-4 py-3.5 text-[18px] font-extrabold uppercase tracking-wide rounded-xl border-l-[3px] transition ${isActive(l.href) ? "text-navy bg-navy/5 border-navy" : "text-ink border-transparent hover:text-navy hover:bg-navy/[0.03]"}`}>{l.name}</Link>
                  )
                )}
                <div className="flex gap-2 px-4 pt-3">
                  <button onClick={() => { setMobile(false); setSearchOpen(true); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-gold/30 text-ink font-bold uppercase text-[13px]"><Search size={16} /> Search</button>
                  <Link href="/shop" onClick={closeAll} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gold text-ink font-bold uppercase text-[13px]"><ShoppingBag size={16} /> Shop</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
