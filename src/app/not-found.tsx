'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy px-5 text-center">
      {/* layered navy depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(48,80,140,0.35) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(212,160,23,0.12) 0%, transparent 45%), linear-gradient(135deg, #1B2A4A 0%, #14213c 55%, #0e1730 100%)',
        }}
      />

      {/* gold rule top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* faded floating bottle behind */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[460px] lg:w-[560px] aspect-square"
        aria-hidden
      >
        <motion.div
          animate={{ y: [-14, 14, -14] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero/longevity-30.webp"
            alt=""
            fill
            sizes="560px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        {/* giant 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-heading font-bold uppercase leading-none text-[7rem] sm:text-[10rem] lg:text-[13rem] text-gradient-gold"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          className="mt-2 font-heading uppercase tracking-[0.22em] text-lg sm:text-2xl font-semibold text-white"
        >
          This Formula Doesn&apos;t Exist
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6, ease: EASE }}
          className="mt-4 max-w-md mx-auto text-base text-white/60 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-9 py-4 font-heading text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/40"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-gold/60 px-9 py-[14px] font-heading text-sm font-bold uppercase tracking-[0.12em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
          >
            <ShoppingBag className="w-4 h-4" />
            Visit Shop
          </Link>
        </motion.div>
      </div>

      {/* gold rule bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}
