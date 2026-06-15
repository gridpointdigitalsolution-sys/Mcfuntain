'use client';

import { animate, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Eye,
  Flame,
  FlaskConical,
  Globe,
  HeartPulse,
  Leaf,
  Microscope,
  Shield,
  ShieldCheck,
  Bone,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeading from '@/components/ui/SectionHeading';
import GoldButton from '@/components/ui/GoldButton';
import PageHero from '@/components/ui/PageHero';
import Disclaimer from '@/components/ui/Disclaimer';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const botanicals = [
  {
    common: 'Moringa',
    latin: 'Moringa oleifera',
    origin: 'West Africa & South Asia',
    traditional: 'Used for centuries in African and Ayurvedic medicine as a nutritive tonic for energy, inflammation, and immune support.',
    modern: 'Rich in vitamins, minerals, and antioxidants. Research supports anti-inflammatory, antioxidant, and blood sugar-balancing properties.',
  },
  {
    common: 'Turmeric',
    latin: 'Curcuma longa',
    origin: 'South Asia',
    traditional: 'A cornerstone of Ayurvedic and traditional medicine for joint health, digestion, and inflammatory conditions.',
    modern: 'Curcumin, its active compound, is extensively studied for potent anti-inflammatory and antioxidant effects with broad therapeutic potential.',
  },
  {
    common: 'Ashwagandha',
    latin: 'Withania somnifera',
    origin: 'India & North Africa',
    traditional: 'Classified as a rasayana (rejuvenator) in Ayurveda; used for stress relief, vitality, and restorative strength.',
    modern: 'Clinical studies support its adaptogenic properties, showing benefits for stress reduction, cortisol management, and improved sleep quality.',
  },
  {
    common: 'Ginger',
    latin: 'Zingiber officinale',
    origin: 'Southeast Asia',
    traditional: 'A universal remedy across African, Asian, and Caribbean traditions for digestion, nausea, circulation, and respiratory health.',
    modern: 'Gingerols and shogaols demonstrate anti-nausea, anti-inflammatory, and digestive-supporting effects in numerous clinical trials.',
  },
  {
    common: 'Gotu Kola',
    latin: 'Centella asiatica',
    origin: 'Southeast Asia & Africa',
    traditional: 'Revered in Ayurvedic and Chinese medicine as a brain tonic for mental clarity, memory, and longevity.',
    modern: 'Triterpenoid compounds support cognitive function, wound healing, and venous circulation according to peer-reviewed research.',
  },
  {
    common: 'Bacopa',
    latin: 'Bacopa monnieri',
    origin: 'India & Southeast Asia',
    traditional: 'A sacred herb in Ayurveda used to sharpen intellect, improve memory, and calm the mind.',
    modern: 'Bacosides are shown to enhance memory consolidation, reduce anxiety, and support neuroprotection in clinical studies.',
  },
  {
    common: 'Mucuna',
    latin: 'Mucuna pruriens',
    origin: 'Tropical Africa & Asia',
    traditional: 'Used in African and Ayurvedic traditions for vitality, mood support, and reproductive health.',
    modern: 'A natural source of L-DOPA, research highlights its role in dopamine support, mood regulation, and reproductive wellness.',
  },
  {
    common: 'Cissus',
    latin: 'Cissus quadrangularis',
    origin: 'West Africa & South Asia',
    traditional: 'Known as the "bone setter" in African herbal traditions, used for fractures, joint health, and connective tissue repair.',
    modern: 'Studies support its benefits for bone density, joint comfort, weight management, and metabolic health markers.',
  },
  {
    common: 'Black Seed',
    latin: 'Nigella sativa',
    origin: 'North Africa & Middle East',
    traditional: 'Described as a remedy for everything except death across African, Arab, and South Asian healing traditions.',
    modern: 'Thymoquinone exhibits broad-spectrum anti-inflammatory, antioxidant, immunomodulatory, and metabolic-supportive properties.',
  },
  {
    common: 'Fenugreek',
    latin: 'Trigonella foenum-graecum',
    origin: 'Mediterranean & South Asia',
    traditional: 'Traditionally used for digestive support, blood sugar management, and galactagogue properties in women.',
    modern: 'Saponins and soluble fiber support healthy blood sugar levels and lipid profiles in published randomized trials.',
  },
  {
    common: 'Bilberry',
    latin: 'Vaccinium myrtillus',
    origin: 'Northern Europe',
    traditional: 'Used in European folk medicine for vision health, circulation, and blood sugar support for centuries.',
    modern: 'Anthocyanins provide potent antioxidant protection for retinal health and microvascular circulation.',
  },
  {
    common: 'Lion\'s Mane',
    latin: 'Hericium erinaceus',
    origin: 'Asia, Europe & North America',
    traditional: 'Prized in traditional Chinese medicine for cognitive health, digestive support, and nerve regeneration.',
    modern: 'Hericenones and erinacines stimulate Nerve Growth Factor (NGF) synthesis, supporting neuroplasticity and cognitive function.',
  },
];

const wellnessSeries = [
  {
    name: 'Cellular Series',
    slug: 'cellular',
    icon: FlaskConical,
    focus: 'Energy production, cellular renewal, and longevity support',
    description: 'Foundational formulas that target mitochondrial health, cellular regeneration, and age-related vitality to support your body at its most fundamental level.',
    products: 4,
  },
  {
    name: 'Neuro Series',
    slug: 'neuro',
    icon: Brain,
    focus: 'Cognitive clarity, memory, and nerve health',
    description: 'Advanced neurological support combining nootropic botanicals with neuroprotective compounds for sharper focus, better recall, and healthy nerve function.',
    products: 3,
  },
  {
    name: 'Metabolic Series',
    slug: 'metabolic',
    icon: Flame,
    focus: 'Blood sugar balance, thyroid health, and weight management',
    description: 'Targeted metabolic formulas that support glucose optimization, thyroid harmony, and healthy body composition through proven botanical pathways.',
    products: 4,
  },
  {
    name: 'Mobility Series',
    slug: 'mobility',
    icon: Bone,
    focus: 'Joint comfort, bone strength, and spinal wellness',
    description: 'Structural support formulas featuring botanicals traditionally used for musculoskeletal health, enhanced with modern joint and bone research.',
    products: 2,
  },
  {
    name: 'Vision Series',
    slug: 'vision',
    icon: Eye,
    focus: 'Eye health and visual acuity',
    description: 'Botanical compounds rich in lutein, zeaxanthin, and anthocyanins that support retinal health, reduce oxidative stress, and promote clear vision.',
    products: 1,
  },
  {
    name: 'Detox Series',
    slug: 'detox',
    icon: Leaf,
    focus: 'Gentle cleansing and organ support',
    description: 'Carefully balanced formulas that support the body\'s natural detoxification pathways, promoting kidney health, respiratory wellness, and whole-body cleansing without harsh effects.',
    products: 3,
  },
  {
    name: 'Wellness Series',
    slug: 'wellness',
    icon: HeartPulse,
    focus: 'Vitality, circulation, and whole-body health',
    description: 'Comprehensive wellness formulas addressing vitality, feminine health, masculine health, circulatory support, and daily freshness for holistic well-being.',
    products: 8,
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Premium Botanicals' },
  { value: 26, suffix: '', label: 'Botanical Supplements' },
  { value: 7, suffix: '', label: 'Wellness Series' },
  { value: 12, suffix: '', label: 'Key Botanicals Studied' },
];

/* ------------------------------------------------------------------ */
/*  Gold Counter                                                       */
/* ------------------------------------------------------------------ */

function GoldCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="text-center"
    >
      <p className="font-heading font-bold uppercase text-5xl sm:text-6xl lg:text-7xl text-gradient-gold leading-none tabular-nums">
        {display}
        {suffix}
      </p>
      <div className="mx-auto mt-4 h-px w-10 bg-gold/40" />
      <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SciencePage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const seriesRef = useRef<HTMLDivElement>(null);
  const seriesInView = useInView(seriesRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* ============================================================ */}
      {/*  Page Hero — faded bottle + bold page name                    */}
      {/* ============================================================ */}
      <PageHero
        title="Our Research"
        eyebrow="Science-Backed"
        subtitle="Where centuries of African herbal wisdom converge with modern botanical research to create supplements that truly make a difference."
        bottleSlug="cogniboost"
        edgeColor="#1B2A4A"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Research' }]}
      />

      {/* ============================================================ */}
      {/*  Gold Counters                                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 15% 0%, rgba(212,160,23,0.10) 0%, transparent 45%), radial-gradient(circle at 90% 100%, rgba(48,80,140,0.35) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((s, i) => (
              <GoldCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Our Approach                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-beige/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block mb-4 font-heading text-sm font-semibold tracking-[0.28em] uppercase text-gold">
                Our Approach
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-ink leading-[1.05]">
                Bridging Tradition &amp; Modern Science
              </h2>
              <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-gold to-gold-light" />
              <div className="mt-8 space-y-5 text-muted leading-relaxed">
                <p>
                  At McFuntain Nutraceuticals, our formulation process begins with deep respect for the botanical knowledge cultivated over centuries by African herbal practitioners. These traditions identified powerful plant compounds and synergistic combinations long before modern science had the tools to explain why they worked.
                </p>
                <p>
                  Our approach bridges this ancestral wisdom with contemporary research. For every traditional formulation, we review published clinical studies, phytochemical analyses, and bioavailability data. We validate each ingredient not only for its traditional efficacy but for its mechanisms of action at the molecular level.
                </p>
                <p>
                  The result is a portfolio of supplements that honor the past while meeting the rigorous standards of modern botanical science — each formula carefully calibrated for maximum effectiveness, safety, and bioavailability.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: BookOpen, title: 'Traditional Knowledge', desc: 'Centuries of documented herbal usage from African, Ayurvedic, and global traditions' },
                  { icon: Microscope, title: 'Scientific Validation', desc: 'Cross-referenced with peer-reviewed clinical studies and phytochemical research' },
                  { icon: FlaskConical, title: 'Precision Formulation', desc: 'Optimal ratios and extraction methods for maximum bioavailability' },
                  { icon: ShieldCheck, title: 'Rigorous Testing', desc: 'Third-party lab testing for identity, potency, purity, and contaminants' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
                    whileHover={{ y: -6 }}
                    className="group bg-cream rounded-2xl p-6 border border-beige-dark/30 hover:border-gold/30 hover:shadow-[0_18px_40px_-18px_rgba(27,42,74,0.25)] transition-all duration-500"
                  >
                    <div className="w-11 h-11 rounded-lg bg-navy flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-base font-bold uppercase tracking-wide text-ink mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Key Botanicals Showcase                                      */}
      {/* ============================================================ */}
      <section className="bg-beige/50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Ingredients"
            title="Key Botanicals"
            subtitle="A closer look at the premium plant compounds that power our formulations, each backed by both tradition and research."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {botanicals.map((botanical, i) => (
              <AnimatedSection key={botanical.common} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="group relative bg-white rounded-2xl border border-beige-dark/30 overflow-hidden hover:border-gold/30 hover:shadow-[0_24px_50px_-22px_rgba(27,42,74,0.3)] transition-all duration-500 cursor-pointer h-full"
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                >
                  {/* Top Gold Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-navy via-gold-deep to-gold" />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-ink group-hover:text-gold-deep transition-colors duration-300">
                          {botanical.common}
                        </h3>
                        <p className="font-serif italic text-sm text-gold mt-0.5">{botanical.latin}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-beige rounded-full flex-shrink-0">
                        <Globe className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted font-medium whitespace-nowrap">{botanical.origin}</span>
                      </div>
                    </div>

                    {/* Traditional Use */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold mb-1.5">Traditional Use</p>
                      <p className="text-[15px] text-muted leading-relaxed">{botanical.traditional}</p>
                    </div>

                    {/* Modern Research - Expandable */}
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold mb-1.5">Modern Research</p>
                      <p className={`text-[15px] text-muted leading-relaxed ${expandedCard === i ? '' : 'line-clamp-2'}`}>
                        {botanical.modern}
                      </p>
                      {botanical.modern.length > 100 && (
                        <button className="mt-1 text-xs text-gold font-semibold uppercase tracking-wider hover:text-gold-deep transition-colors cursor-pointer">
                          {expandedCard === i ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Quality & Sourcing — numbered process steps                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#30508C]/20 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Uncompromising Standards"
            title="Quality & Sourcing"
            subtitle="Every ingredient is traced from its origin to your bottle, ensuring the highest standards of purity and potency."
            light
          />

          <div className="relative">
            {/* connecting gold line — desktop */}
            <div className="hidden md:block absolute top-[34px] left-[12%] right-[12%] h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />

            <div className="grid md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  step: '01',
                  icon: Globe,
                  title: 'Globally Sourced',
                  description:
                    'We partner with trusted growers across Africa, Asia, South America, and Europe to source the most potent and pure botanical ingredients. Every supplier is vetted for sustainable harvesting practices and quality consistency.',
                },
                {
                  step: '02',
                  icon: Shield,
                  title: 'Purity Guaranteed',
                  description:
                    'Raw ingredients are tested upon arrival for identity and purity. We screen for heavy metals, pesticides, microbial contaminants, and adulterants before any material enters our formulation process.',
                },
                {
                  step: '03',
                  icon: FlaskConical,
                  title: 'Optimal Extraction',
                  description:
                    'We use precision extraction methods tailored to each botanical — preserving delicate phytocompounds while maximizing bioavailability. The result is a concentrated, effective supplement in every capsule.',
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.15}>
                  <div className="group relative text-center md:text-left h-full">
                    {/* numbered medallion */}
                    <div className="relative z-10 mx-auto md:mx-0 mb-7 w-[68px] h-[68px] rounded-full bg-navy border-2 border-gold/50 flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_30px_-6px_rgba(212,160,23,0.5)]">
                      <span className="font-heading font-bold text-2xl text-gradient-gold">{item.step}</span>
                    </div>
                    <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-gold/25 transition-all duration-500 h-[calc(100%-95px)]">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <item.icon className="w-6 h-6 text-gold transition-transform duration-500 group-hover:scale-110" />
                        <h3 className="text-2xl font-heading font-bold uppercase tracking-wide text-white">{item.title}</h3>
                      </div>
                      <p className="text-white/65 leading-relaxed text-base">{item.description}</p>
                      <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Our 7 Wellness Series                                        */}
      {/* ============================================================ */}
      <section ref={seriesRef} className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Complete Wellness Ecosystem"
            title="Our 7 Wellness Series"
            subtitle="Each series targets a specific dimension of health, creating a comprehensive botanical support system for whole-body wellness."
          />

          <div className="space-y-5">
            {wellnessSeries.map((series, i) => {
              const Icon = series.icon;
              return (
                <motion.div
                  key={series.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={seriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <Link href={`/shop?series=${series.slug}`} className="group block">
                    <div className="relative bg-cream rounded-2xl border border-beige-dark/30 overflow-hidden hover:border-gold/30 hover:shadow-[0_24px_50px_-22px_rgba(27,42,74,0.3)] hover:-translate-y-0.5 transition-all duration-500">
                      <div className="flex flex-col sm:flex-row items-stretch">
                        {/* Icon Block */}
                        <div className="flex items-center justify-center w-full sm:w-28 h-20 sm:h-auto flex-shrink-0 bg-navy transition-colors duration-500 group-hover:bg-[#22345a]">
                          <Icon className="w-10 h-10 text-gold transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-wide text-ink group-hover:text-gold-deep transition-colors duration-300">
                                  {series.name}
                                </h3>
                                <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-navy">
                                  {series.products} Product{series.products !== 1 ? 's' : ''}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">{series.focus}</p>
                              <p className="text-base text-muted leading-relaxed">{series.description}</p>
                            </div>
                            <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full border-2 border-beige-dark group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300 flex-shrink-0 mt-1">
                              <ArrowRight className="w-5 h-5 text-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="h-[3px] w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-navy via-gold-deep to-gold" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Research & Tradition                                         */}
      {/* ============================================================ */}
      <section className="bg-beige/50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Philosophy"
            title="Where Research Meets Tradition"
            subtitle="Understanding how we honor the past while building for the future of botanical wellness."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="group relative bg-white rounded-2xl p-10 border border-beige-dark/30 h-full hover:shadow-[0_24px_50px_-22px_rgba(27,42,74,0.3)] transition-shadow duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-[#30508C] to-navy rounded-t-2xl" />
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <BookOpen className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase tracking-wide text-ink mb-4">Rooted in Tradition</h3>
                <p className="text-muted leading-relaxed">
                  African herbal medicine represents one of the oldest and most comprehensive healing systems in human history. For thousands of years, practitioners identified plant compounds that support the body's innate healing processes. These traditions emphasized the whole person — not just isolated symptoms — and recognized the profound interconnection between plants and human physiology.
                </p>
                <p className="mt-4 text-muted leading-relaxed">
                  Our formulations draw directly from this deep well of knowledge, preserving traditional ratios and synergistic combinations that have been refined across generations of practice.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="group relative bg-white rounded-2xl p-10 border border-beige-dark/30 h-full hover:shadow-[0_24px_50px_-22px_rgba(27,42,74,0.3)] transition-shadow duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-t-2xl" />
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Microscope className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase tracking-wide text-ink mb-4">Refined by Science</h3>
                <p className="text-muted leading-relaxed">
                  Modern botanical science provides the tools to understand why traditional remedies work at the molecular level. Through phytochemical analysis, clinical trials, and bioavailability studies, we can validate traditional usage, optimize dosing, and ensure safety with a precision that was not possible in previous generations.
                </p>
                <p className="mt-4 text-muted leading-relaxed">
                  Every McFuntain formula undergoes this rigorous scientific lens — not to replace tradition, but to enhance it. The result is a product that carries the wisdom of the past and the confidence of modern evidence.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FDA / DSHEA Disclaimer                                       */}
      {/* ============================================================ */}
      <section className="bg-beige/50 pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA — navy band, gold button                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(48,80,140,0.35) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(212,160,23,0.12) 0%, transparent 45%), linear-gradient(135deg, #1B2A4A 0%, #14213c 55%, #0e1730 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        <AnimatedSection>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block mb-6 font-heading text-sm font-semibold tracking-[0.28em] uppercase text-gold/80">
              Experience Botanical Wellness
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase text-white leading-[1.05]">
              Ready to Experience the{' '}
              <span className="text-gradient-gold">Power of Plants?</span>
            </h2>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
              Explore our complete collection of 26 premium botanical supplements — each one a testament to the synergy between ancestral wisdom and modern science.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <GoldButton href="/shop" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Shop the Collection
              </GoldButton>
              <GoldButton href="/about" variant="outline" size="lg">
                Our Story
              </GoldButton>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/30">
              <span>50+ Premium Botanicals</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>FDA-Compliant Facility</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Third-Party Tested</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Made in the USA</span>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
