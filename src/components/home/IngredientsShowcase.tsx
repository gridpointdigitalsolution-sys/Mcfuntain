'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Sprout, Flower2, FlaskConical } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

type Ingredient = {
  name: string;
  common: string;
  origin: string;
  benefit: string;
};

const ingredients: Ingredient[] = [
  {
    name: 'Moringa oleifera',
    common: 'Moringa',
    origin: 'West Africa',
    benefit: 'Nutrient-dense superfood supporting vitality, antioxidant protection, and whole-body wellness.',
  },
  {
    name: 'Curcuma longa',
    common: 'Turmeric',
    origin: 'South Asia',
    benefit: 'Powerful antioxidant traditionally used for whole-body wellness, joint comfort, and cellular protection.',
  },
  {
    name: 'Centella asiatica',
    common: 'Gotu Kola',
    origin: 'Southeast Asia',
    benefit: 'Revered longevity herb supporting cognitive clarity, circulation, and healthy aging.',
  },
  {
    name: 'Bacopa monnieri',
    common: 'Brahmi',
    origin: 'India',
    benefit: 'Traditional memory herb supporting focus, learning, and long-term cognitive wellness.',
  },
  {
    name: 'Mucuna pruriens',
    common: 'Velvet Bean',
    origin: 'Tropical Africa',
    benefit: 'Natural source of L-DOPA supporting mood, vitality, nerve function, and hormonal balance.',
  },
  {
    name: 'Cissus quadrangularis',
    common: 'Veldt Grape',
    origin: 'Africa & Asia',
    benefit: 'Traditional bone and joint support herb known for structural wellness and recovery.',
  },
  {
    name: 'Withania somnifera',
    common: 'Ashwagandha',
    origin: 'India',
    benefit: 'Premier adaptogen supporting stress resilience, endurance, and balanced energy.',
  },
  {
    name: 'Zingiber officinale',
    common: 'Ginger',
    origin: 'Southeast Asia',
    benefit: 'Universal wellness root supporting digestion, circulation, vitality, and immune strength.',
  },
];

// Refined line-icon rotation for the gold medallions (no emoji, premium feel).
const MEDALLION_ICONS = [Leaf, Sprout, Flower2, FlaskConical] as const;

function IngredientCard({ ing, index }: { ing: Ingredient; index: number }) {
  const Icon = MEDALLION_ICONS[index % MEDALLION_ICONS.length];

  // Cursor-tracked 3D tilt + gold spotlight.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], [7, -7]);
  const rotateX = useTransform(sy, [0, 1], [-7, 7]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative rounded-2xl border border-beige-dark/60 bg-white/85 p-6 backdrop-blur-sm transition-colors duration-500 [transform-style:preserve-3d] hover:border-gold/50 hover:bg-white hover:shadow-[0_24px_55px_-18px_rgba(212,160,23,0.28)]"
    >
      {/* Pointer-following gold spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(220px circle at ${gx} ${gy}, rgba(212,160,23,0.16), transparent 70%)`,
          ),
        }}
      />

      <div className="relative" style={{ transform: 'translateZ(38px)' }}>
        {/* Gold-ringed icon medallion */}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-navy ring-1 ring-gold/40 shadow-[0_8px_22px_-10px_rgba(27,42,74,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:ring-gold">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/15 to-transparent" />
          <Icon className="relative h-6 w-6 text-gold" strokeWidth={1.75} />
        </span>

        {/* Names */}
        <h3 className="mt-4 font-heading text-xl font-bold uppercase tracking-tight text-ink">
          {ing.common}
        </h3>
        <p className="mt-0.5 text-sm italic text-gold-deep">{ing.name}</p>

        {/* Origin tag */}
        <span className="mt-3 inline-block rounded-full bg-navy/[0.06] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-navy/70">
          {ing.origin}
        </span>

        {/* Benefit */}
        <p className="mt-3 text-base leading-relaxed text-muted">{ing.benefit}</p>
      </div>

      {/* Hover underline */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold-deep to-gold-light transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

export default function IngredientsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-beige relative overflow-hidden mounds-both">
      {/* Botanical warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige to-cream" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/[0.07] rounded-full blur-[130px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-navy/[0.05] rounded-full blur-[110px]" />
      {/* Subtle leaf-vein grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(168,128,18,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,128,18,0.4) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Ingredients"
          title="Nature's Most Powerful Botanicals"
          subtitle="We source only the finest herbs from trusted growers worldwide, each selected for its proven traditional use and modern scientific validation."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ingredients.map((ing, i) => (
            <IngredientCard key={ing.name} ing={ing} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-16 text-center"
        >
          <p className="text-muted text-base mb-4">
            Our formulations include 50+ carefully selected botanicals across all product lines.
          </p>
          <a
            href="/science"
            className="inline-flex items-center gap-2 text-gold-deep font-semibold hover:text-gold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            Explore Our Science
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
