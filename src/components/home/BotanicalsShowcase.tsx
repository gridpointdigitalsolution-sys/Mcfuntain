'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Leaf, FlaskConical, ShieldCheck, Check } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Premium Botanical Extracts',
    desc: 'Carefully sourced plant extracts ensure purity, potency, and consistent daily wellness support.',
  },
  {
    icon: FlaskConical,
    title: 'Science-Backed Formula',
    desc: 'Advanced formulation enhances absorption, delivering effective results for optimal health performance daily.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean & Safe Ingredients',
    desc: 'Free from harmful additives, ensuring pure, natural, and reliable herbal health benefits for everyday use.',
  },
];

const standards = ['GMP Certified', 'Non-GMO', 'Gluten-Free', 'No Artificial Additives'];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BotanicalsShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige via-cream to-beige py-24 sm:py-32">
      {/* gold accents matching StatsBar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,160,23,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* MOBILE: clean centered stack — big bottle + aligned feature card */}
          <div className="lg:hidden flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE }}
              className="relative h-[600px] w-screen max-w-none -my-6 overflow-hidden"
            >
              <motion.div
                animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative h-full w-full"
              >
                <Image
                  src="/images/hero/libido-support.webp"
                  alt="McFuntain Divine Libido Support"
                  fill
                  sizes="840px"
                  className="object-cover object-[36%_50%] drop-shadow-[0_30px_55px_rgba(27,42,74,0.4)]"
                />
              </motion.div>
            </motion.div>

            <div className="-mt-4 w-full max-w-sm rounded-[28px] bg-gradient-to-br from-navy via-[#15223d] to-[#0f1830] p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.title} className="text-center">
                    <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 ring-1 ring-gold/30">
                      <f.icon className="h-5 w-5 text-gold" strokeWidth={2} />
                    </div>
                    <h3 className="font-heading text-white text-base font-bold uppercase tracking-normal mb-1.5 leading-tight">
                      {f.title}
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT (desktop): card + bottle composite */}
          <div className="relative hidden lg:block lg:h-[760px]">
            {/* decorative concentric rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute w-[460px] h-[460px] lg:w-[540px] lg:h-[540px] rounded-full border-2 border-gold/30" />
              <div className="absolute w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-gold/20 via-gold/5 to-transparent blur-2xl" />
              <div className="absolute w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] rounded-full border border-navy/15" />
            </motion.div>

            {/* Bottle — pans in from right with blur */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.85, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              className="absolute right-[-30px] sm:right-[-20px] lg:right-[-25px] top-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] lg:w-[500px] h-[470px] sm:h-[540px] lg:h-[660px] z-10"
            >
              {/* gentle continuous bob */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/hero/libido-support.webp"
                  alt="McFuntain Divine Libido Support"
                  fill
                  sizes="(min-width:1024px) 560px, 420px"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(27,42,74,0.4)]"
                />
              </motion.div>
            </motion.div>

            {/* Dark feature card — pans in from left, overlaps bottle */}
            <motion.div
              initial={{ opacity: 0, x: -80, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute left-[0px] sm:left-[-20px] lg:left-[-175px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] lg:w-[340px] rounded-[28px] lg:rounded-[36px] bg-gradient-to-br from-navy via-[#15223d] to-[#0f1830] p-4 sm:p-5 lg:p-7 z-20 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.55)] border border-white/5"
            >
              {/* gold corner accent */}
              <div className="absolute top-0 left-0 h-12 w-12 rounded-tl-[36px] border-t-2 border-l-2 border-gold/40" />

              <div className="space-y-7">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease: EASE }}
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 ring-1 ring-gold/30">
                      <f.icon className="h-5 w-5 text-gold" strokeWidth={2} />
                    </div>
                    <h3 className="font-heading text-white text-[15px] lg:text-base font-bold uppercase tracking-normal mb-1.5 leading-tight lg:whitespace-nowrap">
                      {f.title}
                    </h3>
                    <p className="text-white/65 text-[13px] leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-30 space-y-7"
          >
            <div className="flex items-center gap-2.5 text-navy">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 ring-1 ring-navy/25">
                <Check className="h-4 w-4 text-navy" strokeWidth={3} />
              </span>
              <span className="font-heading uppercase tracking-[0.18em] text-sm font-bold">
                Clean &amp; Trusted Formula
              </span>
            </div>

            <h2 className="font-heading text-navy text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[1.02]">
              Held to a Higher<br />
              <span className="text-gradient-gold">Standard</span>
            </h2>

            <p className="text-muted text-lg leading-relaxed max-w-lg">
              Every formula is crafted in an FDA-compliant facility, third-party tested, and made with clean, traceable ingredients — so what is on the label is exactly what is in the bottle.
            </p>

            <div className="pt-2">
              <h4 className="font-heading text-navy text-lg font-bold uppercase tracking-wide mb-4">
                Trusted Quality Standards
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                {standards.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: EASE }}
                    className="flex items-center gap-3 text-ink"
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-[0_4px_10px_rgba(212,160,23,0.4)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-semibold text-[15px]">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
