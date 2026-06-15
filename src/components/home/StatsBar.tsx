'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 26, suffix: '', label: 'Premium Formulations' },
  { value: 50, suffix: '+', label: 'Botanical Ingredients' },
  { value: 7, suffix: '', label: 'Wellness Series' },
  { value: 24, suffix: 'mo', label: 'Shelf Life Guarantee' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut' as const,
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`text-5xl md:text-6xl font-heading font-bold text-gradient-gold transition-all duration-700 ${
        done ? 'drop-shadow-[0_0_12px_rgba(212,160,23,0.2)]' : ''
      }`}
    >
      {display}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-gradient-to-b from-beige via-cream to-beige relative overflow-hidden"
    >
      {/* Decorative bg accents — top gold line removed so it merges smoothly with the hero's torn edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,160,23,0.08),transparent_55%)] pointer-events-none" />

      {sectionInView && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.10), rgba(229,184,56,0.14), rgba(212,160,23,0.10), transparent)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-block font-heading uppercase tracking-[0.25em] text-xs text-gold-deep font-bold border border-gold/40 rounded-full px-4 py-1.5 bg-white/60 backdrop-blur-sm">
            By the Numbers
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -6 }}
              className="group relative text-center bg-white rounded-2xl px-4 py-8 lg:py-10 shadow-[0_18px_45px_-15px_rgba(27,42,74,0.18)] hover:shadow-[0_28px_60px_-15px_rgba(212,160,23,0.35)] border border-gold/15 transition-shadow duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,160,23,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="relative mt-3 text-xs sm:text-sm text-ink/70 font-bold tracking-[0.18em] uppercase font-heading">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
