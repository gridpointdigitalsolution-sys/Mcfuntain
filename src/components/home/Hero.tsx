'use client';

/* ------------------------------------------------------------------ *
 *  McFuntain Hero v3 — "Regal Apothecary II"
 *  navy + gold · Oswald display · world-class cinematic slideshow
 *  mouse-parallax depth (Oxinex) · giant outline watermark word
 *  letter-stagger headline · bottle reflection · thumb rail nav
 *  heartbeat pan preserved · real bg photo · torn-paper edge
 * ------------------------------------------------------------------ */

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600', '700'] });

/* ---- Slides -------------------------------------------------------- */
type Slide = {
  slug: string;
  series: string;
  eyebrow: string;
  headPre: string;
  headAccent: string;
  sub: string;
  tags: [string, string, string];
  href: string;
  word: string; // giant outline watermark
  price: string; // "from" price shown in the gold badge
};

const slides: Slide[] = [
  { slug: 'libido-support', series: 'Wellness Series', eyebrow: 'Reignite the Fire', headPre: 'Reclaim Stamina', headAccent: '& Desire', sub: 'Vitality, stamina and circulation support engineered for peak performance — naturally.', tags: ['Vitality', 'Stamina', 'Circulation'], href: '/shop', word: 'DESIRE', price: '$80' },
  { slug: 'glucose-balance', series: 'Metabolic Series', eyebrow: 'Balance Your Sugar', headPre: 'Steady Glucose,', headAccent: 'Steady Energy', sub: 'Pancreatic and metabolic botanicals that keep blood sugar in harmony, all day long.', tags: ['Blood Sugar', 'Metabolic', 'Pancreatic'], href: '/shop', word: 'BALANCE', price: '$99' },
  { slug: 'cogniboost', series: 'Neuro Series', eyebrow: 'Sharpen Your Mind', headPre: 'Fuel Focus,', headAccent: 'Clarity & Memory', sub: 'Brain botanicals crafted for razor focus, mental clarity and lasting recall.', tags: ['Focus', 'Clarity', 'Memory'], href: '/shop', word: 'FOCUS', price: '$99' },
  { slug: 'belly-fat-balance', series: 'Metabolic Series', eyebrow: 'Trim & Balance', headPre: 'Burn Fat,', headAccent: 'Feel Lighter', sub: 'Metabolic botanicals for gentle cleansing, smooth digestion and a flatter belly.', tags: ['Metabolic', 'Cleansing', 'Digestion'], href: '/shop', word: 'LIGHTER', price: '$60.99' },
  { slug: 'longevity-30', series: 'Cellular Series', eyebrow: 'Age With Power', headPre: 'Live Longer,', headAccent: 'Live Stronger', sub: 'Youthful energy, immunity and metabolism for a body that thrives well past thirty.', tags: ['Youthful Energy', 'Immunity', 'Metabolism'], href: '/shop', word: 'LONGEVITY', price: '$110' },
  { slug: 'womb-renewal', series: 'Wellness Series', eyebrow: 'Feminine Vitality', headPre: 'Renew Her', headAccent: 'Balance Within', sub: 'Restorative botanicals for feminine vitality and gentle, natural hormonal harmony.', tags: ['Feminine Vitality', 'Restorative', 'Balance'], href: '/shop', word: 'RENEW', price: '$120' },
];

const SLIDE_MS = 6500;
const EASE = [0.16, 1, 0.3, 1] as const;

const socials = [
  { label: 'Facebook', short: 'Fb', href: '#' },
  { label: 'Twitter / X', short: 'X', href: '#' },
  { label: 'Instagram', short: 'Ig', href: '#' },
  { label: 'YouTube', short: 'Yt', href: '#' },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* cinematic stagger for the text block */
const textWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -24, filter: 'blur(6px)', transition: { duration: 0.35 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

/* letter-by-letter reveal for the gold accent line */
function GoldLetters({ text }: { text: string }) {
  const words = text.split(' ');
  let offset = 0;
  return (
    <span aria-label={text} className="inline">
      {words.map((word, w) => {
        const start = offset;
        offset += word.length + 1;
        return (
          <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
            {word.split('').map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 38, rotateX: -60, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.35 + (start + i) * 0.028, ease: EASE }}
                className="inline-block text-gradient-gold [transform-style:preserve-3d]"
              >
                {ch}
              </motion.span>
            ))}
            {w < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        );
      })}
    </span>
  );
}

/* ---- Component ----------------------------------------------------- */
export default function Hero() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  const go = useCallback((d: number) => setState(([i]) => [(i + d + slides.length) % slides.length, d]), []);
  const jump = useCallback((to: number) => setState(([i]) => [to, to > i ? 1 : -1]), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, go, index]);

  /* ---- mouse parallax (Oxinex-style depth) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 16, mass: 0.6 });
  const bottleX = useTransform(sx, (v) => v * 34);
  const bottleY = useTransform(sy, (v) => v * 22);
  const ringX = useTransform(sx, (v) => v * -18);
  const ringY = useTransform(sy, (v) => v * -12);
  const wordX = useTransform(sx, (v) => v * -46);
  const wordY = useTransform(sy, (v) => v * -16);
  const glowX = useTransform(sx, (v) => v * 24);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my]
  );

  return (
    <section
      className="relative overflow-hidden bg-[#070E1F]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0); }}
      onMouseMove={onMove}
    >
      {/* ================= BACKGROUND — Option-1 (Avvin) flat dark navy, NO photo ================= */}
      <div className="absolute inset-0">
        {/* exact option-1 background: flat dark-navy diagonal gradient, full width (left + right) */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(120deg,#000814 0%,#0a1428 55%,#1B2A4A 100%)' }} />
        {/* warm gold bloom behind bottle (parallax) */}
        <motion.div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[54vw] max-w-[820px] aspect-square rounded-full blur-[110px] mix-blend-screen pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.22), rgba(212,160,23,0) 66%)', x: glowX }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 160px 30px rgba(4,8,18,0.5)' }} />
      </div>

      {/* ================= AVVIN GEOMETRIC "SLICE" (now obvious on flat navy) ================= */}
      <AnimatePresence mode="wait">
        <motion.div key={`wedge-${slide.slug}`} className="hidden lg:block pointer-events-none absolute inset-0 z-[4]">
          <motion.div
            initial={{ x: '60%', opacity: 0 }} animate={{ x: '14%', opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute top-0 right-0 h-full w-[72%]"
            style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.22), rgba(212,160,23,0.05) 55%, transparent 72%)', clipPath: 'polygon(30% 0,100% 0,100% 100%,6% 100%)' }}
          />
          <motion.div
            initial={{ x: '72%', opacity: 0 }} animate={{ x: '28%', opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="absolute top-0 right-0 h-full w-[56%]"
            style={{ background: 'linear-gradient(135deg, rgba(229,184,56,0.16), transparent 58%)', clipPath: 'polygon(42% 0,100% 0,100% 100%,16% 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= GIANT OUTLINE WATERMARK WORD ================= */}
      <motion.div
        className="hidden lg:flex pointer-events-none select-none absolute inset-0 items-center justify-end pr-[2vw] z-[5]"
        style={{ x: wordX, y: wordY }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`word-${slide.slug}`}
            initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.9, ease: EASE }}
            className={`${oswald.className} font-bold uppercase leading-none text-transparent text-[16vw] tracking-[0.02em]`}
            style={{ WebkitTextStroke: '1.5px rgba(212,160,23,0.16)' }}
          >
            {slide.word}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* ================= FOLLOW RAIL ================= */}
      <div className="hidden lg:flex flex-col items-center gap-4 absolute left-12 xl:left-16 top-1/2 -translate-y-1/2 z-30">
        <span className="text-[11px] tracking-[0.32em] text-white/45 font-semibold [writing-mode:vertical-rl] rotate-180">FOLLOW</span>
        <span className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        {socials.map(({ label, short, href }) => (
          <Link key={label} href={href} aria-label={label}
            className="grid place-items-center w-8 h-8 rounded-full border border-white/15 text-[10px] font-bold text-white/50 hover:text-ink hover:bg-gold hover:border-gold transition-all duration-300">
            {short}
          </Link>
        ))}
      </div>

      {/* ================= BOTTLE THUMBNAIL RAIL (right edge, unique nav) ================= */}
      <div className="hidden xl:flex flex-col items-center gap-3 absolute right-7 top-1/2 -translate-y-1/2 z-30">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => jump(i)}
            aria-label={`Go to ${s.word}`}
            className={`relative grid place-items-center w-12 h-12 rounded-full border transition-all duration-300 overflow-hidden bg-ink/40 backdrop-blur-sm ${
              i === index ? 'border-gold scale-110 shadow-[0_0_18px_rgba(212,160,23,0.45)]' : 'border-white/15 opacity-55 hover:opacity-100 hover:border-gold/50'
            }`}
          >
            <Image src={`/images/hero/${s.slug}.webp`} alt="" width={40} height={40} className="object-contain w-9 h-9" />
            {i === index && (
              <motion.span layoutId="thumbRing" className="absolute inset-0 rounded-full border-2 border-gold" transition={{ duration: 0.4, ease: EASE }} />
            )}
          </button>
        ))}
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-20 xl:px-24">
        <div className="grid lg:grid-cols-[1.22fr_1fr] items-center gap-6 lg:gap-3 min-h-[94vh] lg:min-h-screen pt-36 sm:pt-40 lg:pt-28 pb-28 lg:pb-0">
          {/* ===== LEFT — copy ===== */}
          <div className="order-2 lg:order-1 text-center lg:text-left lg:pr-2 lg:self-center">
            <AnimatePresence mode="wait">
              <motion.div key={slide.slug} variants={textWrap} initial="hidden" animate="show" exit="exit">
                <motion.div variants={item} className="inline-flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-gold" />
                  <span className={`${oswald.className} text-xs sm:text-sm tracking-[0.28em] uppercase font-semibold text-gold`}>{slide.eyebrow}</span>
                </motion.div>

                <h1 className={`${oswald.className} font-bold uppercase leading-[0.98] text-white text-[3.2rem] sm:text-6xl lg:text-[4rem] xl:text-[4.8rem] tracking-tight [text-wrap:balance]`}>
                  <motion.span variants={item} className="block">{slide.headPre}</motion.span>
                  <span className="block [perspective:600px]">
                    <GoldLetters text={slide.headAccent} />
                  </span>
                </h1>

                <motion.p variants={item} className="mt-6 text-lg sm:text-xl text-white/75 max-w-lg mx-auto lg:mx-0 leading-relaxed">{slide.sub}</motion.p>

                <motion.div variants={item} className="mt-7 flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  {slide.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/85 bg-white/[0.04] border border-white/10 rounded-full pl-3 pr-4 py-1.5 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />{t}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                  <span className={`${oswald.className} px-3 py-1 bg-gold text-ink text-[11px] font-bold uppercase tracking-[0.12em]`}>Launch Offer</span>
                  <span className={`${oswald.className} font-bold text-gold leading-none text-[1.6rem] sm:text-4xl`}>30% OFF</span>
                </motion.div>

                <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 justify-center lg:justify-start">
                  <Link href={slide.href} className="group inline-flex items-center gap-3 bg-gold text-ink font-bold pl-8 pr-7 py-4 shadow-[0_10px_30px_-8px_rgba(212,160,23,0.6)] hover:bg-gold-light hover:shadow-[0_16px_40px_-8px_rgba(212,160,23,0.8)] transition-all duration-300">
                    <span className={`${oswald.className} tracking-wide`}>SHOP NOW</span>
                    <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform duration-300">+</span>
                  </Link>
                  <div className={`${oswald.className} hidden sm:flex items-baseline gap-1`}>
                    <span className="text-2xl text-white">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-white/35">/ {String(slides.length).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ===== RIGHT — circular bottle stage w/ parallax depth ===== */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[58vh] lg:min-h-screen">
            {/* circular stage */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[720px] aspect-square rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 36%, rgba(48,80,140,0.30) 0%, rgba(20,36,66,0.40) 56%, rgba(9,17,36,0.55) 100%)',
                boxShadow: 'inset 0 -50px 110px rgba(0,0,0,0.55), inset 0 40px 90px rgba(60,96,168,0.28), 0 50px 110px -30px rgba(0,0,0,0.65)',
              }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[720px] aspect-square rounded-full border border-gold/20" />

            {/* rotating gold rings (counter-parallax) */}
            <motion.div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[680px] aspect-square" style={{ x: ringX, y: ringY }}>
              <motion.div className="w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}>
                <svg viewBox="0 0 600 600" className="w-full h-full"><circle cx="300" cy="300" r="296" fill="none" stroke="#D4A017" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 12" /></svg>
              </motion.div>
            </motion.div>
            <motion.div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[540px] aspect-square" style={{ x: ringX, y: ringY }}>
              <motion.div className="w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}>
                <svg viewBox="0 0 600 600" className="w-full h-full"><circle cx="300" cy="300" r="298" fill="none" stroke="#E5B838" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="1 18" /></svg>
              </motion.div>
            </motion.div>

            {/* BOTTLE — giant, parallax, spring swing-in, reflection */}
            <motion.div className="relative z-10 w-[116%] max-w-[760px] sm:w-full sm:max-w-[800px] lg:max-w-[1320px] xl:max-w-[1520px] aspect-square" style={{ x: bottleX, y: bottleY }}>
              <AnimatePresence custom={dir}>
                <motion.div
                  key={slide.slug}
                  custom={dir}
                  initial={{ opacity: 0, scale: 0.78, rotate: dir > 0 ? -8 : 8, filter: 'blur(16px)', x: dir > 0 ? 90 : -90, y: 30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, filter: 'blur(12px)', x: dir > 0 ? -70 : 70, y: -20 }}
                  transition={{ duration: 1.0, ease: EASE }}
                  className="absolute inset-0"
                >
                  {/* heartbeat pan (founder-loved) */}
                  <motion.div className="relative w-full h-full" animate={{ scale: [1, 1.08, 1.02, 1.1, 1], y: [0, -4, 0, -3, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.18, 0.42, 0.6, 1] }}>
                    <Image src={`/images/hero/${slide.slug}.webp`} alt={`${slide.headPre} ${slide.headAccent}`} fill priority sizes="(max-width: 1024px) 92vw, 1100px" className="object-contain drop-shadow-[0_36px_60px_rgba(0,0,0,0.6)]" />
                    {/* reflection */}
                    <div className="absolute left-0 right-0 top-full h-[42%] -mt-[6%] pointer-events-none [transform:scaleY(-1)] opacity-[0.14]"
                      style={{ maskImage: 'linear-gradient(to top, transparent 30%, black 100%)', WebkitMaskImage: 'linear-gradient(to top, transparent 30%, black 100%)' }}>
                      <Image src={`/images/hero/${slide.slug}.webp`} alt="" fill sizes="(max-width: 1024px) 92vw, 1100px" className="object-contain" />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-9 rounded-[50%] bg-gold/20 blur-2xl" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[46%] h-4 rounded-[50%] bg-black/45 blur-xl" />
            </motion.div>

            {/* WHITE arrow — original LEFT position, curves up-right into bottle. Visible + bigger on mobile too */}
            <svg viewBox="0 0 200 200" className="absolute left-0 bottom-[18%] w-44 sm:w-48 lg:w-48 xl:w-60 z-30 pointer-events-none overflow-visible">
              <motion.path
                key={`arrow-${slide.slug}`}
                d="M16,170 C44,120 92,90 150,72 M150,72 L129,66 M150,72 L143,93"
                fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.15, delay: 0.45, ease: EASE }}
                style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
              />
            </svg>

            {/* series tag — top-RIGHT (founder wants it on the right, like the old hero) */}
            <AnimatePresence mode="wait">
              <motion.span key={`series-${slide.slug}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className={`${oswald.className} hidden lg:block absolute top-[6%] right-[2%] z-20 text-[11px] tracking-[0.3em] uppercase font-semibold text-gold border border-gold/30 rounded-full px-5 py-2 bg-ink/40 backdrop-blur-sm`}>
                {slide.series}
              </motion.span>
            </AnimatePresence>

            {/* Avvin big tilted gold price badge — RIGHT side, stacked under the series tag */}
            <AnimatePresence mode="wait">
              <motion.div key={`price-${slide.slug}`}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: -6 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                className="absolute z-30 top-[16%] right-[3%] grid place-items-center w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-gold text-ink shadow-[0_18px_45px_-10px_rgba(212,160,23,0.75)]">
                <div className="text-center leading-none">
                  <span className={`${oswald.className} block text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.22em] font-semibold`}>From</span>
                  <span className={`${oswald.className} block font-bold text-xl sm:text-2xl lg:text-[2rem] xl:text-[2.4rem] mt-1`}>{slide.price}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <button onClick={() => go(-1)} aria-label="Previous slide" className="hidden lg:grid place-items-center absolute right-[7.5rem] bottom-36 z-30 w-12 h-12 rounded-full bg-white text-ink shadow-lg hover:bg-gold hover:scale-105 transition-all duration-300"><ChevronLeft className="w-6 h-6 stroke-[3]" /></button>
      <button onClick={() => go(1)} aria-label="Next slide" className="hidden lg:grid place-items-center absolute right-12 bottom-36 z-30 w-12 h-12 rounded-full bg-white text-ink shadow-lg hover:bg-gold hover:scale-105 transition-all duration-300"><ChevronRight className="w-6 h-6 stroke-[3]" /></button>

      {/* dots (mobile + non-xl) */}
      <div className="xl:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((s, i) => (
          <button key={s.slug} onClick={() => jump(i)} aria-label={`Go to slide ${i + 1}`} className="p-1">
            <motion.span className="block rounded-full" animate={{ width: i === index ? 28 : 8, height: 8, backgroundColor: i === index ? '#D4A017' : 'rgba(255,255,255,0.22)' }} transition={{ duration: 0.3 }} />
          </button>
        ))}
      </div>

      {/* ================= SLIDE LOADER BAR ================= */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-30">
        <motion.div key={`${index}-${paused}`} className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
          initial={{ width: '0%' }} animate={{ width: paused ? '100%' : '100%' }}
          transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }} />
      </div>

      {/* ================= TORN-PAPER EDGE ================= */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[34px] sm:h-[50px]" fill="#F5F0E8">
          <path d="M0,60 L0,34 C60,28 110,46 180,40 C250,34 300,18 380,26 C460,34 520,52 610,44 C700,36 760,16 850,24 C940,32 1000,52 1090,46 C1180,40 1240,22 1330,30 C1390,35 1420,46 1440,40 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
