'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  title: string;
  /** Small gold eyebrow above the title */
  eyebrow?: string;
  /** One-line subtitle under the title */
  subtitle?: string;
  /** Breadcrumb trail, e.g. [{label:'Home',href:'/'},{label:'Shop'}] */
  crumbs?: { label: string; href?: string }[];
  /** Which hero bottle webp to fade in the background (slug only) */
  bottleSlug?: string;
  /** Color of the torn-paper bottom edge — match the next section so it blends. Default cream. */
  edgeColor?: string;
}

export default function PageHero({
  title,
  eyebrow,
  subtitle,
  crumbs,
  bottleSlug = 'longevity-30',
  edgeColor = '#FAFAFA',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* layered navy depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(48,80,140,0.35) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(212,160,23,0.12) 0%, transparent 45%), linear-gradient(135deg, #1B2A4A 0%, #14213c 55%, #0e1730 100%)',
        }}
      />

      {/* faded bottle — right side */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 0.22, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute right-[-60px] sm:right-[-20px] lg:right-[4%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] lg:w-[420px] aspect-square"
      >
        <Image
          src={`/images/hero/${bottleSlug}.webp`}
          alt=""
          fill
          sizes="(max-width: 1024px) 340px, 420px"
          className="object-contain"
        />
      </motion.div>

      {/* gold rule top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-36 md:pt-44 pb-14 md:pb-20">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px] text-white/55"
            aria-label="Breadcrumb"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mb-3 font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="font-heading uppercase font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="mt-4 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* torn-paper bottom edge (site signature) */}
      <svg
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        className="relative z-10 block w-full h-[28px] sm:h-[38px]"
        aria-hidden
      >
        <path
          d="M0,44 L0,20 C80,8 160,28 240,18 C320,8 400,26 480,16 C560,6 640,24 720,16 C800,8 880,26 960,18 C1040,10 1120,28 1200,16 C1280,4 1360,22 1440,14 L1440,44 Z"
          fill={edgeColor}
        />
      </svg>
    </section>
  );
}
