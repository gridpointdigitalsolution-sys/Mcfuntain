'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, FlaskConical, Sprout, HeartHandshake } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const badges = [
  { icon: ShieldCheck, label: 'GMP Certified' },
  { icon: Leaf, label: '100% Natural Ingredients' },
  { icon: FlaskConical, label: 'Lab Tested' },
  { icon: Sprout, label: 'Non-GMO' },
  { icon: HeartHandshake, label: 'Made with Care' },
];

export default function TrustBadges() {
  return (
    <section className="relative py-24 sm:py-32 bg-navy overflow-hidden">
      {/* Gold hairlines top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gold/[0.05] rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 text-base font-extrabold tracking-[0.2em] uppercase text-gold">
            Our Promise
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            Quality You Can Trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="group flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-gold/20 transition-all duration-500 group-hover:bg-gold/10 group-hover:ring-gold/50 group-hover:-translate-y-1.5">
                  <Icon className="h-8 w-8 text-gold" strokeWidth={1.6} />
                </div>
                <span className="font-heading text-sm md:text-base font-bold uppercase tracking-wide text-white/85 leading-tight">
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
