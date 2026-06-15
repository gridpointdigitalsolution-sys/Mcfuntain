'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ------------------------------------------------------------------ *
 *  McFuntain Preloader v3 — "Gold Ignition"
 *  navy curtains · gold light-streak flies in from the side and
 *  ignites the ring · logo medallion · % counter · shimmer sweep ·
 *  converging gold arcs · shockwave pulse at 100% · curtain split exit
 *  plays on every full page load (client-side nav does NOT retrigger)
 * ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = 'loading' | 'hiding' | 'hidden';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1700;
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / dur) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase('hiding'), 1850);
    const t2 = setTimeout(() => setPhase('hidden'), 2600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'hidden') return null;

  const hiding = phase === 'hiding';
  const curtain = { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: hiding ? 0.12 : 0 };
  const R = 88;
  const C = 2 * Math.PI * R;
  const lit = progress > 4; // ring "ignites" once the streak has crossed

  return (
    <div className="fixed inset-0 z-[9999] select-none overflow-hidden" aria-hidden>
      {/* TOP CURTAIN */}
      <motion.div
        animate={hiding ? { y: '-100%' } : { y: 0 }}
        transition={curtain}
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, rgba(48,80,140,0.25) 0%, transparent 55%), linear-gradient(180deg, #060D1A 0%, #15233f 100%)',
        }}
      />
      {/* BOTTOM CURTAIN */}
      <motion.div
        animate={hiding ? { y: '100%' } : { y: 0 }}
        transition={curtain}
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(48,80,140,0.25) 0%, transparent 55%), linear-gradient(0deg, #060D1A 0%, #15233f 100%)',
        }}
      />
      {/* GOLD SEAM */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={hiding ? { scaleX: 1, opacity: [1, 0] } : { scaleX: 1, opacity: 1 }}
        transition={{ delay: hiding ? 0 : 0.15, duration: hiding ? 0.6 : 0.9, ease: EASE }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #A88012 15%, #D4A017 50%, #A88012 85%, transparent 100%)',
          transformOrigin: 'center',
        }}
      />

      {/* CENTER STAGE — fades before curtains part */}
      <motion.div
        animate={hiding ? { opacity: 0, scale: 0.94, filter: 'blur(6px)' } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: 'easeIn' }}
        className="absolute inset-0 grid place-items-center"
      >
        <div className="relative grid place-items-center">
          {/* GOLD LIGHT-STREAK — flies in from the LEFT side, crosses, ignites the ring */}
          <motion.div
            className="absolute h-[3px] w-[60vw] max-w-[560px] pointer-events-none blur-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(229,184,56,0.0) 20%, #E5B838 50%, #D4A017 65%, transparent 100%)',
            }}
            initial={{ x: '-75vw', opacity: 0, scaleX: 1.4 }}
            animate={{ x: ['-75vw', '0vw', '75vw'], opacity: [0, 1, 0], scaleX: [1.4, 1, 0.6] }}
            transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1], times: [0, 0.45, 1] }}
          />
          {/* leading spark head of the streak */}
          <motion.div
            className="absolute h-3 w-3 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FFF3D0 0%, #E5B838 40%, transparent 70%)' }}
            initial={{ x: '-37vw', opacity: 0, scale: 0.5 }}
            animate={{ x: ['-37vw', '0vw', '6vw'], opacity: [0, 1, 0], scale: [0.5, 1.6, 0] }}
            transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1], times: [0, 0.5, 1] }}
          />

          {/* radial gold glow pulse behind logo */}
          <motion.div
            className="absolute w-[260px] h-[260px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 62%)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={lit ? { opacity: [0, 1, 0.55], scale: [0.7, 1.05, 1] } : { opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
          />

          {/* progress ring — ignites after the streak crosses */}
          <svg width="220" height="220" viewBox="0 0 220 220" className="absolute -rotate-90">
            <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="url(#mcfGoldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * progress) / 100}
              style={{ opacity: lit ? 1 : 0, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.5))', transition: 'opacity 0.3s' }}
            />
            <defs>
              <linearGradient id="mcfGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A88012" />
                <stop offset="50%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#E5B838" />
              </linearGradient>
            </defs>
          </svg>

          {/* SHOCKWAVE ring — expands outward when fully loaded */}
          {progress >= 99 && (
            <motion.div
              className="absolute rounded-full border border-gold pointer-events-none"
              style={{ width: 176, height: 176 }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.9 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )}

          {/* two converging gold arcs that draw in from the sides */}
          <motion.svg
            width="252" height="252" viewBox="0 0 252 252" className="absolute pointer-events-none"
            initial={{ opacity: 0, rotate: -12 }}
            animate={lit ? { opacity: 1, rotate: 0 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <motion.path
              d="M126,8 A118,118 0 0,1 244,126"
              fill="none" stroke="#D4A017" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={lit ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            />
            <motion.path
              d="M126,244 A118,118 0 0,1 8,126"
              fill="none" stroke="#D4A017" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={lit ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            />
          </motion.svg>

          {/* rotating dashed décor ring */}
          <motion.svg
            width="252"
            height="252"
            viewBox="0 0 252 252"
            className="absolute pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="126" cy="126" r="122" fill="none" stroke="#D4A017" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 10" />
          </motion.svg>

          {/* logo medallion — rise in + shimmer sweep */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
            className="relative w-[124px] h-[124px] overflow-hidden rounded-full grid place-items-center shadow-[0_10px_40px_-8px_rgba(212,160,23,0.45)]"
          >
            <Image
              src="/images/brand/logo-light.png"
              alt="McFuntain Nutraceuticals"
              width={116}
              height={116}
              priority
              className="object-contain"
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 38%, rgba(229,184,56,0.45) 50%, transparent 62%)',
              }}
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
            />
          </motion.div>

          {/* wordmark + % counter */}
          <div className="absolute top-full mt-7 flex flex-col items-center gap-2 whitespace-nowrap">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="font-heading uppercase tracking-[0.4em] text-[11px] text-white/60"
            >
              McFuntain&nbsp;Nutraceuticals
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-heading text-gold text-sm tabular-nums tracking-widest"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
