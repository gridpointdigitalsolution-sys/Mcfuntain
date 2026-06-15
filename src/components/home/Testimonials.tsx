'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: 'Margaret T.',
    location: 'Baltimore, MD',
    product: 'Divine Mitochondria Energy',
    rating: 5,
    text: 'After three weeks of consistent use, I noticed a genuine shift in my daily energy. No jitters, no crashes — just steady, clean vitality throughout the day. This is different from anything I\'ve tried before.',
  },
  {
    name: 'David O.',
    location: 'Houston, TX',
    product: 'Divine CogniBoost Restore',
    rating: 5,
    text: 'As someone who works 12-hour shifts, mental fog was my constant companion. CogniBoost changed that. My focus is sharper, my recall is better, and I feel more present in conversations.',
  },
  {
    name: 'Patricia K.',
    location: 'Atlanta, GA',
    product: 'Divine Joint & Bone',
    rating: 5,
    text: 'At 58, I had accepted that morning stiffness was just part of life. Two months with Joint & Bone, and I\'m moving with a freedom I haven\'t felt in years. My morning walks are a joy again.',
  },
  {
    name: 'Samuel A.',
    location: 'Chicago, IL',
    product: 'Divine Glucose Balance',
    rating: 5,
    text: 'My doctor was impressed with my latest blood work. Combined with diet changes and this supplement, my metabolic markers have improved significantly. I\'m grateful for this natural support.',
  },
  {
    name: 'Grace M.',
    location: 'Silver Spring, MD',
    product: 'Divine Longevity 50+',
    rating: 5,
    text: 'I bought this for my mother and she absolutely loves it. She says she feels more vibrant and her recovery after her walks has improved noticeably. We\'re now buying for the whole family.',
  },
  {
    name: 'James B.',
    location: 'Philadelphia, PA',
    product: 'Divine Vitality',
    rating: 5,
    text: 'I was skeptical at first, but the results speak for themselves. My stamina during workouts has improved, my energy is more consistent, and I genuinely feel more resilient. Quality product.',
  },
];

function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(testimonials[(current + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-gradient-to-b from-white to-cream/50 relative overflow-hidden mounds-both">
      {/* Floating Gold Decorative Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-gold/20 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-32 right-[15%] w-2 h-2 rounded-full bg-gold/15"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute bottom-40 left-[20%] w-4 h-4 rounded-full bg-gold/10 blur-[2px]"
      />
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="Real People, Real Results"
          subtitle="Hear from wellness-focused individuals who have made McFuntain supplements part of their daily health routine."
        />

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleTestimonials().map((t, i) => (
            <motion.div
              key={`${t.name}-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
              className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 pt-10 border border-white/60 shadow-sm hover:border-gold/30 hover:shadow-xl hover:shadow-gold/[0.06] hover:-translate-y-1.5 hover:bg-white active:translate-y-0 transition-all duration-500 cursor-default"
            >
              {/* Playfair quote mark */}
              <span className="absolute top-3 right-6 font-serif text-7xl leading-none text-gold/15 select-none pointer-events-none">
                &rdquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4.5 h-4.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="relative text-ink/80 leading-relaxed text-base">
                {t.text}
              </p>

              <div className="mt-6 pt-5 border-t border-beige-dark/30 flex items-center gap-3">
                {/* Avatar initials circle */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-ink font-heading text-base font-bold text-gold-light ring-1 ring-gold/20">
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold uppercase tracking-tight text-ink text-base leading-tight">{t.name}</p>
                  <p className="text-xs text-muted mt-0.5">{t.location}</p>
                  <p className="text-xs font-medium text-gold-deep mt-1 truncate">{t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="w-10 h-10 rounded-full border border-beige-dark hover:border-gold flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            <ChevronLeft className="w-4.5 h-4.5 text-muted" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'w-6 bg-gold' : 'bg-beige-dark hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="w-10 h-10 rounded-full border border-beige-dark hover:border-gold flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-gold/5 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            <ChevronRight className="w-4.5 h-4.5 text-muted" />
          </button>
        </div>
      </div>
    </section>
  );
}
