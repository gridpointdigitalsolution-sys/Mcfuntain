'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Quote } from 'lucide-react';
import GoldButton from '../ui/GoldButton';

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Parallax: photo moves slower than the page scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-beige/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            style={{ y: photoY }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Gold Frame Effect */}
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 via-gold-light/10 to-gold-deep/20 rounded-3xl" />
              <div className="absolute -inset-1.5 bg-white rounded-2xl" />
              <div className="relative h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/founder/founder.jpeg"
                  alt="Rev. Dr. Gideon Afolabi - Founder of McFuntain Nutraceuticals"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              {/* Floating Credential Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-beige"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-lg">45+</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-ink">Years of</p>
                    <p className="text-sm text-muted">Herbal Expertise</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="inline-block mb-4 text-base font-semibold tracking-[0.2em] uppercase text-gold"
            >
              Meet Our Founder
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight"
            >
              Rev. Dr. Gideon Afolabi
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ transformOrigin: 'left' }}
              className="mt-2 h-0.5 w-16 bg-gradient-to-r from-gold to-gold-light"
            />

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-8 relative pl-6 border-l-2 border-gold/30"
            >
              <Quote className="absolute -left-3 -top-1 w-6 h-6 text-gold/40 bg-white" />
              <p className="text-xl text-ink/80 italic leading-relaxed font-heading">
                True healing begins where ancient wisdom meets modern understanding.
                Every formula we create honors the botanical traditions that have
                sustained communities for generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-8 space-y-4 text-muted leading-relaxed text-lg"
            >
              <p>
                With decades dedicated to studying traditional African herbal medicine and
                modern botanical science, Rev. Dr. Gideon Afolabi founded McFuntain Nutraceuticals
                with a singular vision: to bring the profound healing wisdom of nature to the
                world — refined, elevated, and accessible.
              </p>
              <p>
                Based in Gwynn Oak, Maryland, his formulations bridge the gap between
                centuries-old herbal knowledge and contemporary wellness needs, creating
                supplements that honor tradition while meeting the highest standards of
                modern quality and safety.
              </p>
            </motion.div>

            {/* Achievement Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { number: '26', label: 'Formulations' },
                { number: '7', label: 'Wellness Series' },
                { number: '50+', label: 'Botanicals Used' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="text-center"
                >
                  <span className="block text-3xl md:text-4xl font-heading font-bold text-gold">
                    {stat.number}
                  </span>
                  <span className="block mt-1 text-base text-muted tracking-wide uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <GoldButton href="/about" variant="outline">
                Read Full Story
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
