'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-ink to-[#111318] px-6 py-16 sm:px-12 sm:py-20 text-center shadow-[0_40px_90px_-30px_rgba(27,42,74,0.6)] ring-1 ring-gold/15"
        >
          {/* Gold accents */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: `repeating-linear-gradient(135deg, #D4A017 0, #D4A017 1px, transparent 0, transparent 50%)`,
            backgroundSize: '24px 24px',
          }} />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]"
          />

          <div className="relative">
            {/* Logo Mark */}
            <div className="flex justify-center mb-8">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/brand/logo-dark.png"
                  alt="McFuntain"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
            </div>

            <span className="inline-block mb-4 text-sm font-extrabold tracking-[0.2em] uppercase text-gold">
              Stay Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-white leading-tight">
              Join the{' '}
              <span className="text-gradient-gold">Wellness Movement</span>
            </h2>
            <p className="mt-5 text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
              Get exclusive access to wellness insights, new product launches,
              special offers, and expert botanical health guidance.
            </p>

            {/* Form */}
            <div className="mt-10 max-w-md mx-auto">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 bg-white/5 border border-gold/25 rounded-full px-8 py-4"
                >
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-white font-medium">Welcome to the McFuntain family!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pr-36 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(212,160,23,0.1)] transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white font-bold uppercase tracking-wide text-sm px-6 rounded-full flex items-center gap-2 hover:shadow-[0_4px_20px_-3px_rgba(212,160,23,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/30">
              <ShieldCheck className="w-4 h-4 text-gold/50" />
              No spam, ever. Unsubscribe anytime. Your privacy is sacred to us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
