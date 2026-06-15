'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PremiumOfferBanner() {
  return (
    <section className="relative bg-cream py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Outer wrapper — NO overflow-hidden so bottle can lay over top + bottom */}
        <div className="relative rounded-[32px] lg:rounded-[40px] bg-[#0b1426] shadow-[0_30px_80px_-20px_rgba(11,20,38,0.6)] min-h-[360px] lg:min-h-[400px]">
          {/* Inner clipped wrapper — navy gradient + gold glow (navy+gold only, no green) */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] lg:rounded-[40px]">
            {/* navy gradient */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(110deg, #0b1426 0%, #14223d 55%, #1B2A4A 100%)' }}
            />
            {/* subtle gold dot texture */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 0)', backgroundSize: '46px 46px' }} />
            {/* gold glow behind bottle */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(212,160,23,0.20),transparent_60%)] pointer-events-none" />
          </div>

          {/* LEFT — copy + CTAs */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-center px-7 sm:px-10 lg:px-16 py-10 lg:py-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative z-10 text-white text-center lg:text-left"
            >
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[1.05]">
                Enjoy <span className="text-gold">20% Off</span>
                <br />
                Premium Package
              </h2>
              <p className="mt-5 text-white/75 text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Save 20% on every premium bundle. Stack your wellness with our highest-tier formulas — limited-time savings on every package.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 bg-gold text-ink font-bold rounded-full pl-6 pr-2 py-2.5 shadow-[0_10px_30px_-8px_rgba(212,160,23,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(212,160,23,0.85)] transition-all duration-300"
                >
                  <span className="font-heading uppercase tracking-wide text-sm">Get Offer</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-gold group-hover:rotate-[8deg] transition-transform">
                    <ShoppingCart className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </Link>

                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 border-2 border-white/40 hover:border-gold text-white hover:text-gold font-bold rounded-full px-6 py-3 transition-all duration-300"
                >
                  <span className="font-heading uppercase tracking-wide text-sm">Discover More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

            {/* spacer for bottle column on lg */}
            <div className="hidden lg:block" />
          </div>

          {/* BOTTLE — absolute, OVERFLOWS card top + bottom (Herba "laying over" effect). Desktop only. */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.85, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="absolute z-20 right-[-30px] sm:right-[-50px] lg:right-[-40px] top-[-90px] sm:top-[-120px] lg:top-[-140px] bottom-[-90px] sm:bottom-[-120px] lg:bottom-[-140px] w-[340px] sm:w-[460px] lg:w-[600px] xl:w-[680px] pointer-events-none hidden md:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/hero/belly-fat-balance.webp"
                alt="McFuntain Divine Belly Fat Balance — Premium Package"
                fill
                sizes="(max-width: 1024px) 70vw, 560px"
                className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>

          {/* MOBILE bottle — inside flow, no overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
            className="relative md:hidden h-[600px] -mt-6 -mb-2 left-1/2 -translate-x-1/2 w-screen max-w-none overflow-hidden z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/hero/belly-fat-balance.webp"
                alt="McFuntain Divine Belly Fat Balance — Premium Package"
                fill
                sizes="840px"
                className="object-cover object-[29%_50%] drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
