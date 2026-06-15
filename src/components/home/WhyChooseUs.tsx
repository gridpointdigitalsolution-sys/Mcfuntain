'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { Leaf, FlaskConical, ShieldCheck, Globe, Heart, Sparkles, type LucideIcon } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    icon: Leaf,
    title: 'African Herbal Wisdom',
    description: 'Every formula draws from centuries of traditional African botanical knowledge, honoring healing traditions passed down through generations.',
  },
  {
    icon: FlaskConical,
    title: 'Scientific Formulation',
    description: 'Each supplement is carefully crafted using modern botanical science to ensure optimal potency, bioavailability, and safety.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality Control',
    description: 'Manufactured in FDA-compliant facilities with rigorous testing at every stage from sourcing to bottling.',
  },
  {
    icon: Globe,
    title: 'Globally Sourced Botanicals',
    description: 'We source rare and powerful botanicals from trusted growers across Africa, Asia, and South America.',
  },
  {
    icon: Heart,
    title: '100% Plant-Based',
    description: 'Pure botanical ingredients with no synthetic fillers, artificial colors, or harmful additives. Clean wellness, always.',
  },
  {
    icon: Sparkles,
    title: 'Holistic Approach',
    description: 'Our supplements are designed to support whole-body wellness — not just symptoms — for lasting vitality and balance.',
  },
];

/* ----------------------------------------------------------------
   Interactive card: cursor-tracked 3D tilt + gold spotlight follow
------------------------------------------------------------------- */
function PillarCard({
  pillar,
  index,
  featured,
  inView,
  reduced,
}: {
  pillar: Pillar;
  index: number;
  featured: boolean;
  inView: boolean;
  reduced: boolean;
}) {
  const Icon = pillar.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // raw pointer position (0..1 within the card)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // smoothed for buttery motion
  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.4 });

  // tilt — featured card gets a gentler tilt because it's larger
  const tiltRange = featured ? 5 : 8;
  const rotateY: MotionValue<number> = useTransform(sx, [0, 1], [-tiltRange, tiltRange]);
  const rotateX: MotionValue<number> = useTransform(sy, [0, 1], [tiltRange, -tiltRange]);

  // spotlight position as percentages for the radial gradient
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }
      }
      className={[
        'group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm',
        'transition-colors duration-500 cursor-default overflow-hidden',
        'hover:border-gold/30',
        featured
          ? 'p-9 sm:p-10 flex flex-col'
          : 'p-8',
      ].join(' ')}
    >
      {/* Gold spotlight that follows the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY] as MotionValue<string>[],
            ([x, y]) =>
              `radial-gradient(${featured ? '420px' : '300px'} circle at ${x} ${y}, rgba(212,160,23,0.16), transparent 70%)`,
          ),
        }}
      />

      {/* Giant gold index number watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-2 right-4 font-heading font-bold leading-none text-gold/10 select-none transition-colors duration-500 group-hover:text-gold/20"
        style={{ fontSize: featured ? '6rem' : '4.25rem' }}
      >
        {number}
      </span>

      {/* Content (lifted on Z for depth) */}
      <div style={reduced ? undefined : { transform: 'translateZ(40px)' }} className="relative flex h-full flex-col">
        {/* Icon ring */}
        <div
          className={[
            'flex items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/15 mb-6',
            'transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/15 group-hover:ring-gold/40',
            featured ? 'h-16 w-16' : 'h-14 w-14',
          ].join(' ')}
        >
          <Icon className={featured ? 'h-8 w-8 text-gold' : 'h-7 w-7 text-gold'} strokeWidth={1.75} />
        </div>

        <h3
          className={[
            'font-heading font-bold uppercase tracking-tight text-white mb-3',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
          ].join(' ')}
        >
          {pillar.title}
        </h3>

        <p className={['leading-relaxed text-white/60', featured ? 'text-lg' : 'text-base'].join(' ')}>
          {pillar.description}
        </p>

      </div>

      {/* Gold inner border glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(212,160,23,0.18), 0 0 30px -5px rgba(212,160,23,0.10)' }}
      />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion() ?? false;

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-ink relative overflow-hidden mounds-both">
      {/* Diagonal Gradient Background (navy/ink only — no green) */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#111827] to-navy/40" />
      {/* Soft gold dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #D4A017 0.75px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Background glow elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-navy/30 rounded-full blur-[120px]" />
        {!reduced && (
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
            className="absolute top-1/3 right-1/6 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px]"
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why McFuntain"
          title="The Science Behind the Tradition"
          subtitle="Where ancient botanical wisdom meets modern wellness innovation, creating supplements that truly make a difference."
          light
        />

        {/* Asymmetric grid: first pillar is a tall featured card on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.title}
              pillar={pillar}
              index={i}
              featured={i === 0}
              inView={isInView}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
