'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import GoldButton from '../ui/GoldButton';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, #1B2A4A 0%, #14223d 40%, #0b1426 100%)',
            'linear-gradient(135deg, #0b1426 0%, #1B2A4A 40%, #14223d 100%)',
            'linear-gradient(135deg, #14223d 0%, #0b1426 40%, #1B2A4A 100%)',
            'linear-gradient(135deg, #1B2A4A 0%, #14223d 40%, #0b1426 100%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />
      {/* Multiple glow orbs for depth */}
      <motion.div
        animate={{ x: [0, 30, 0], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/4 rounded-full blur-[120px]"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-6 text-base font-semibold tracking-[0.2em] uppercase text-gold/80">
            Begin Your Wellness Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            Your Body Deserves{' '}
            <span className="text-gradient-gold">Premium Care</span>
          </h2>
          <p className="mt-6 text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Every day you wait is a day without the botanical support your body craves.
            Start with any single product, or build a complete wellness program tailored to your needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/shop" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Shop the Collection
            </GoldButton>
            <GoldButton href="/contact" variant="outline" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
              Get Guidance
            </GoldButton>
          </div>

          {/* Trust Row */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base text-white/30">
            <span>Free Shipping on Orders $99+</span>
            <span className="hidden sm:inline">•</span>
            <span>30-Day Satisfaction Promise</span>
            <span className="hidden sm:inline">•</span>
            <span>Secure Checkout</span>
            <span className="hidden sm:inline">•</span>
            <span>Made in the USA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
