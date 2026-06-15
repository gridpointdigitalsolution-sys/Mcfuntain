'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  FlaskConical,
  Globe,
  Heart,
  Quote,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldButton from '@/components/ui/GoldButton';
import PageHero from '@/components/ui/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const coreValues = [
  {
    icon: BookOpen,
    title: 'Tradition',
    description:
      'Every formula begins with the botanical knowledge passed down through generations of African herbal practitioners.',
  },
  {
    icon: FlaskConical,
    title: 'Science',
    description:
      'We validate each ingredient through rigorous modern research, ensuring safety and efficacy in every capsule.',
  },
  {
    icon: Shield,
    title: 'Purity',
    description:
      'No synthetic fillers, no artificial additives. Only clean, plant-based ingredients that your body can trust.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'Transparent sourcing, honest labeling, and a commitment to doing right by every customer who trusts us.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description:
      'Premium botanical wellness should be within reach for everyone pursuing a healthier, more vibrant life.',
  },
  {
    icon: Sparkles,
    title: 'Excellence',
    description:
      'From ingredient sourcing to final packaging, we pursue the highest standard at every stage of production.',
  },
];

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: 'FDA-Compliant Facility',
    description:
      'Our manufacturing facility in Maryland meets all FDA requirements for current Good Manufacturing Practices (cGMP), ensuring every supplement is produced to pharmaceutical-grade standards.',
  },
  {
    icon: FlaskConical,
    title: 'Third-Party Testing',
    description:
      'Every batch undergoes independent laboratory testing for identity, potency, purity, and contaminants. We test raw materials upon arrival and finished products before release.',
  },
  {
    icon: Award,
    title: 'Full Traceability',
    description:
      'From raw botanical to finished product, every ingredient in every bottle can be traced back to its source. This transparency ensures accountability at every stage.',
  },
  {
    icon: Search,
    title: 'Premium Sourcing',
    description:
      'We identify and source the finest botanicals from trusted growers across Africa, Asia, and South America, prioritizing organic and sustainably harvested ingredients.',
  },
  {
    icon: Target,
    title: 'Synergistic Formulas',
    description:
      'Our team blends traditional herbal ratios with modern extraction science to create synergistic formulas with optimal bioavailability.',
  },
  {
    icon: Truck,
    title: 'Direct Delivery',
    description:
      'Products are carefully packaged in pharmaceutical-grade containers and shipped directly to your door with full traceability — free on orders $99+.',
  },
];

const milestones = [
  {
    year: '2008',
    title: 'Seeds of Knowledge',
    description:
      'Rev. Dr. Afolabi begins documenting traditional African herbal formulations after decades of study across West Africa.',
  },
  {
    year: '2012',
    title: 'Research Phase',
    description:
      'Formal research partnerships established to validate traditional botanical compounds with modern scientific methods.',
  },
  {
    year: '2016',
    title: 'McFuntain Founded',
    description:
      'McFuntain Nutraceuticals is officially incorporated in Maryland with a mission to bridge herbal tradition and modern wellness.',
  },
  {
    year: '2018',
    title: 'First Product Line',
    description:
      'The Cellular Series launches with Mitochondria Energy and Stem Cells, receiving overwhelming positive response.',
  },
  {
    year: '2020',
    title: 'Expansion to 7 Series',
    description:
      'The full product portfolio grows to 26 formulations across seven distinct wellness series.',
  },
  {
    year: '2023',
    title: 'Manufacturing Upgrade',
    description:
      'State-of-the-art FDA-compliant manufacturing facility secured, enhancing quality control and production capacity.',
  },
  {
    year: '2025',
    title: 'National Recognition',
    description:
      'McFuntain Nutraceuticals earns industry recognition for excellence in botanical supplement formulation.',
  },
];

/* ------------------------------------------------------------------ */
/*  Local section heading (Oswald bold uppercase)                      */
/* ------------------------------------------------------------------ */

function Heading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`mb-14 lg:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left'}`}>
      <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-3">
        {eyebrow}
      </p>
      <h2
        className={`font-heading font-bold uppercase leading-[1.05] text-3xl sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${light ? 'text-white/60' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-[3px] w-20 bg-gradient-to-r from-gold-deep via-gold to-gold-light ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const founderRef = useRef<HTMLDivElement>(null);
  const founderInView = useInView(founderRef, { once: true, margin: '-100px' });
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();

  return (
    <>
      {/* ============================================================ */}
      {/*  Page Hero                                                    */}
      {/* ============================================================ */}
      <PageHero
        title="About Us"
        eyebrow="Our Story"
        subtitle="Nature Refined for Better Living — rooted in African herbal wisdom, refined by modern science, and dedicated to your wellness."
        bottleSlug="longevity-30"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* ============================================================ */}
      {/*  Founder Spotlight — FIRST per founder request                */}
      {/* ============================================================ */}
      <section id="founder" ref={founderRef} className="scroll-mt-28 py-20 lg:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-beige/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: EASE }}
              className="relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                {/* slow-rotating dashed gold ring (on-brand, GPU-cheap) */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[122%] -translate-x-1/2 -translate-y-1/2 sm:block aspect-square"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 400 400" className="h-full w-full">
                    <circle cx="200" cy="200" r="197" fill="none" stroke="#D4A017" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="2 13" />
                  </svg>
                </motion.div>
                {/* soft pulsing gold glow */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-5 z-0 rounded-[2rem] bg-gradient-to-br from-gold/25 via-gold/10 to-gold-deep/20 blur-2xl"
                  animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.04, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute -inset-3 bg-gradient-to-br from-gold/25 via-gold-light/10 to-gold-deep/25 rounded-3xl" />
                <div className="absolute -inset-1.5 bg-white rounded-2xl" />
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/founder/founder.jpeg"
                    alt="Rev. Dr. Gideon Afolabi - Founder of McFuntain Nutraceuticals"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={founderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                  className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl shadow-xl p-5 border border-beige"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center">
                      <span className="text-white font-heading font-bold text-lg">45+</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">Years of</p>
                      <p className="text-xs text-muted">Herbal Expertise</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-3">
                Meet Our Founder
              </p>
              <h2 className="font-heading font-bold uppercase text-ink leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
                Rev. Dr. Gideon Afolabi
              </h2>
              <div className="mt-5 h-[3px] w-20 bg-gradient-to-r from-gold-deep via-gold to-gold-light" />

              {/* Playfair pull-quote card */}
              <div className="mt-8 relative bg-white rounded-2xl border border-beige-dark/30 p-7 sm:p-8 shadow-sm">
                <div className="absolute top-0 left-7 right-7 h-[3px] bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-b" />
                <Quote className="w-8 h-8 text-gold/40 mb-3" />
                <p className="font-serif italic text-xl sm:text-2xl text-navy leading-relaxed">
                  True healing begins where ancient wisdom meets modern understanding. Every formula we create honors the botanical traditions that have sustained communities for generations.
                </p>
              </div>

              <div className="mt-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Rev. Dr. Gideon Afolabi is a minister, humanitarian, and botanical researcher whose lifelong dedication to the healing power of plants inspired the creation of McFuntain Nutraceuticals. Born of a profound faith and a boundless passion for the natural world, his journey began in Ibadan, Nigeria — immersed in the African herbal traditions passed down through generations — before he carried that knowledge across the world.
                </p>
                <p>
                  A graduate of Cornell University&rsquo;s College of Agriculture and Life Sciences, where he specialized in medicinal plants, Dr. Afolabi is currently pursuing a PhD in Natural Medicine and Functional Health Management. This rare union of ancestral herbal wisdom and formal scientific training defines everything McFuntain creates — each formula cross-referencing traditional usage with published research to identify the most effective botanical compounds and synergistic combinations.
                </p>
                <p>
                  Working across his roots in Ibadan, Oyo State and his base in Gwynn Oak, Maryland, he continues to lead McFuntain Nutraceuticals with the conviction that drives all his work: to bridge the gap between ancient natural remedies and modern health needs, nurturing both the body and the soul of every person he serves.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { number: '26', label: 'Formulations' },
                  { number: '7', label: 'Wellness Series' },
                  { number: '50+', label: 'Botanicals Used' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={founderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.15, ease: EASE }}
                    className="text-center"
                  >
                    <span className="block text-2xl md:text-3xl font-heading font-bold text-gold">
                      {stat.number}
                    </span>
                    <span className="block mt-1 text-xs text-muted tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Brand Story                                                  */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-beige/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-3">
                Our Beginning
              </p>
              <h2 className="font-heading font-bold uppercase text-ink leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
                From Ancient Roots to Modern Wellness
              </h2>
              <div className="mt-5 h-[3px] w-20 bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
              <div className="mt-8 space-y-5 text-muted leading-relaxed">
                <p>
                  McFuntain Nutraceuticals was born from a deep conviction: that the botanical wisdom cultivated over centuries by African herbal practitioners deserves a place in modern wellness. Our founder, Rev. Dr. Gideon Afolabi, spent decades immersed in the study of traditional plant medicine across West Africa before bringing that knowledge to the United States.
                </p>
                <p>
                  What began as personal research into the healing properties of indigenous African botanicals evolved into a mission to make these powerful plant compounds available to everyone. By partnering traditional herbal ratios with modern extraction and formulation science, McFuntain creates supplements that honor ancestral knowledge while meeting the highest contemporary standards.
                </p>
                <p>
                  Today, from our base in Gwynn Oak, Maryland, we offer 26 premium botanical supplements across 7 targeted wellness series — each one a testament to the profound synergy between nature and science.
                </p>
              </div>
              <p className="mt-8 font-serif italic text-xl sm:text-2xl text-navy leading-snug">
                &ldquo;Nature Refined for Better Living.&rdquo;
              </p>
            </AnimatedSection>

            {/* Bottle stage with gold ring — bottle BURSTS out of circle */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative max-w-lg mx-auto">
                {/* circular stage */}
                <div className="relative aspect-square">
                  <div
                    className="absolute inset-[6%] rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 38%, #FFFDF8 0%, #E8DFD0 70%, #DCD0BA 100%)',
                      boxShadow: 'inset 0 -30px 60px rgba(168,128,18,0.10), 0 30px 70px -30px rgba(27,42,74,0.30)',
                    }}
                  />
                  {/* gold rings */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE }}
                    className="absolute inset-[3%] rounded-full border-2 border-gold/50"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
                  >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <circle cx="200" cy="200" r="197" fill="none" stroke="#D4A017" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 12" />
                    </svg>
                  </motion.div>
                  {/* BOTTLE — bigger than the circle, extrudes top + sides */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
                    className="absolute inset-[-14%] sm:inset-[-18%] z-10"
                  >
                    <motion.div
                      className="relative w-full h-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Image
                        src="/images/hero/longevity-30.webp"
                        alt="McFuntain premium botanical supplement bottle"
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-contain drop-shadow-[0_40px_70px_rgba(27,42,74,0.45)]"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* floating stat badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                  className="absolute -top-6 -left-4 sm:-top-8 sm:-left-10 z-30 bg-navy text-white rounded-2xl shadow-xl px-5 py-4"
                >
                  <span className="block font-heading font-bold text-2xl text-gold">26</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/70">Formulations</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                  className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-12 z-30 bg-white rounded-2xl shadow-xl border border-beige-dark/40 px-5 py-4"
                >
                  <div className="flex items-center gap-5">
                    <div>
                      <span className="block font-heading font-bold text-2xl text-gold">50+</span>
                      <span className="text-[11px] uppercase tracking-wider text-muted">Botanicals</span>
                    </div>
                    <div className="w-px self-stretch bg-beige-dark" />
                    <div>
                      <span className="block font-heading font-bold text-2xl text-gold">45+</span>
                      <span className="text-[11px] uppercase tracking-wider text-muted">Years Wisdom</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Mission & Vision                                             */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            eyebrow="Purpose-Driven"
            title="Mission & Vision"
            subtitle="Guided by purpose, driven by the belief that nature holds the key to better living."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative bg-white rounded-2xl p-8 sm:p-10 border border-beige-dark/30 h-full shadow-sm hover:shadow-xl hover:shadow-gold/5 transition-shadow duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-t-2xl" />
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading font-bold uppercase text-2xl text-ink mb-4">Our Mission</h3>
                <p className="text-muted leading-relaxed">
                  To bridge the gap between ancient natural remedies and modern health needs by creating premium, science-backed botanical supplements that empower individuals to take control of their wellness naturally — nurturing both the body and the soul. We are committed to purity, efficacy, and accessibility, ensuring every product we craft meets the highest standards of quality and delivers meaningful results.
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative bg-navy rounded-2xl p-8 sm:p-10 h-full shadow-sm hover:shadow-xl hover:shadow-navy/20 transition-shadow duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-deep rounded-t-2xl" />
                <div className="w-14 h-14 rounded-xl bg-gold/15 flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading font-bold uppercase text-2xl text-white mb-4">Our Vision</h3>
                <p className="text-white/65 leading-relaxed">
                  To become the most trusted name in botanical nutraceuticals — a brand synonymous with the harmonious union of tradition and science. We envision a world where the profound healing knowledge of African herbal medicine is globally recognized, valued, and accessible to all who seek a path to holistic health and lasting vitality.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Core values icon cards */}
          <div className="mt-16">
            <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-8 text-center">
              The Values Behind Every Bottle
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, i) => (
                <AnimatedSection key={value.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group bg-white rounded-2xl p-7 border border-beige-dark/30 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
                      <value.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h4 className="font-heading font-bold uppercase text-lg text-ink mb-2 tracking-wide">
                      {value.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Why Choose Us                                                */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#30508C]/20 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            eyebrow="The McFuntain Standard"
            title="Why Choose Us"
            subtitle="From sourcing to delivery, every step is guided by our commitment to quality and tradition."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-gold/25 transition-colors duration-500 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/15 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                    <item.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-xl text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed text-base">{item.description}</p>
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Timeline / Milestones                                        */}
      {/* ============================================================ */}
      <section ref={timelineRef} className="py-20 lg:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            eyebrow="Our Journey"
            title="Company Milestones"
            subtitle="Key moments that have shaped McFuntain Nutraceuticals into the brand it is today."
          />

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-white shadow-sm -translate-x-1/2 mt-2 z-10" />

                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <span className="inline-block px-3 py-1 text-xs font-bold font-heading tracking-widest text-gold bg-gold/10 rounded-full mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="font-heading font-bold uppercase text-lg text-ink mb-2 tracking-wide">
                      {milestone.title}
                    </h3>
                    <p className="text-muted text-base leading-relaxed">{milestone.description}</p>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Closing CTA Band                                             */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-navy">
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
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />

        <AnimatedSection>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-5">
              Experience the Difference
            </p>
            <h2 className="font-heading font-bold uppercase text-white leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
              Ready to Experience{' '}
              <span className="text-gradient-gold">Nature Refined?</span>
            </h2>
            <p className="mt-6 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Explore our complete collection of 26 premium botanical supplements and discover the wellness series that is right for you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <GoldButton href="/shop" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Shop the Collection
              </GoldButton>
              <GoldButton href="/science" variant="outline" size="lg">
                Explore the Science
              </GoldButton>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/35">
              <span>Free Shipping on Orders $99+</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>30-Day Satisfaction Promise</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Made in the USA</span>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
