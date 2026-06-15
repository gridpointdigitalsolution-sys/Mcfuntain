'use client';

import { motion } from 'framer-motion';
import { Search, CalendarCheck, Sparkles, TrendingUp } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Choose Your Formula',
    description: 'Explore our seven series and select the botanical blend matched to your wellness goals.',
  },
  {
    num: '02',
    icon: CalendarCheck,
    title: 'Take Daily',
    description: 'Make it part of your morning ritual — a simple, consistent step toward lasting vitality.',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Feel The Difference',
    description: 'Nature-refined compounds go to work, supporting energy, clarity, and whole-body balance.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Stay Consistent',
    description: 'True wellness compounds over time. Keep going and let your body flourish, day after day.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-cream overflow-hidden mounds-both">
      {/* Soft glow accents */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold/[0.06] rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-1/4 w-[360px] h-[360px] bg-navy/[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Your Path to Better Living"
          subtitle="Premium botanical wellness made simple — four effortless steps from first dose to lasting transformation."
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-0.5 origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light/40"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="group relative text-center"
              >
                {/* Numbered medallion */}
                <div className="relative z-10 mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white ring-1 ring-beige-dark/60 shadow-[0_12px_30px_-12px_rgba(27,42,74,0.25)] transition-all duration-500 group-hover:ring-gold/50 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-12px_rgba(212,160,23,0.3)]">
                  <Icon className="h-9 w-9 text-gold" strokeWidth={1.6} />
                  {/* Giant Oswald numeral badge */}
                  <span className="absolute -top-3 -right-2 font-heading text-3xl font-bold leading-none text-navy/15 transition-colors duration-500 group-hover:text-gold/40">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-ink mb-2">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
