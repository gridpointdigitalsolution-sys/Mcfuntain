'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldButton from '@/components/ui/GoldButton';
import PageHero from '@/components/ui/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: '11 Brubar Court, Gwynn Oak, MD',
    detail: 'United States',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@mcfuntain.com',
    detail: 'We respond within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '(410) 555-0172',
    detail: 'Mon - Fri, 9am - 6pm EST',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday - Friday: 9am - 6pm EST',
    detail: 'Saturday: 10am - 2pm EST',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Product Information',
  'Order Support',
  'Wholesale & Distribution',
  'Press & Media',
  'Partnership Opportunities',
  'Other',
];

const trustBadges = [
  { icon: ShieldCheck, text: 'FDA-Compliant Facility' },
  { icon: Leaf, text: '100% Plant-Based' },
  { icon: Award, text: 'Premium Quality' },
  { icon: Truck, text: 'Free Shipping $99+' },
  { icon: Shield, text: 'Secure & Encrypted' },
];

/* FAQ content reused verbatim from /faq */
const contactFaqs = [
  {
    question: 'Is there a free shipping option?',
    answer:
      'Yes! We offer free standard shipping on all orders of $99 or more within the continental United States. Orders under $99 are subject to a flat-rate shipping fee calculated at checkout. Expedited shipping options are also available for an additional charge.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, you may return unopened, unused products within 30 days of delivery for a full refund. Products must be in their original, sealed packaging to qualify for a return. Please contact our support team to initiate a return.',
  },
  {
    question: 'What is the recommended dosage?',
    answer:
      'Each product label includes detailed dosage instructions specific to that formulation. Generally, our supplements are designed to be taken daily with food and water. Please follow the label directions and do not exceed the recommended dose unless directed by your healthcare provider.',
  },
  {
    question: 'Are your supplements plant-based and vegan-friendly?',
    answer:
      'Yes, all McFuntain supplements are 100% plant-based. We use only natural botanical ingredients sourced from trusted growers. Our capsules are made from plant-derived materials, and our formulations contain no animal products, synthetic fillers, artificial colors, or harmful additives.',
  },
  {
    question: 'Can I combine multiple McFuntain supplements?',
    answer:
      'Yes, many of our supplements are designed to work synergistically. For example, you might pair a Cellular Series product for energy with a Neuro Series product for cognitive support. Our formulations are crafted to be compatible with each other. However, we recommend introducing one new supplement at a time and consulting your healthcare provider if you have specific health conditions.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order has been shipped, you will receive an email with a tracking number and a link to track your package in real time. You can also check your order status by contacting our support team with your order number.',
  },
  {
    question: 'Do you offer wholesale or bulk pricing?',
    answer:
      'Yes, we offer competitive wholesale pricing for qualified retailers, health practitioners, and wellness clinics. If you are interested in carrying McFuntain Nutraceuticals products, please reach out to our wholesale team through our contact page or email wholesale@mcfuntain.com for more information about our partnership programs.',
  },
];

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-beige text-ink placeholder:text-muted/60 focus:outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300';

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FaqItem({
  question,
  answer,
  isOpen,
  toggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white border transition-colors duration-300 ${
        isOpen ? 'border-gold/40 shadow-lg shadow-gold/5' : 'border-beige-dark/30 hover:border-gold/25'
      }`}
    >
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
      >
        <span className="font-heading font-bold uppercase tracking-wide text-base sm:text-lg text-ink leading-snug pr-2">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-gold text-white' : 'bg-beige text-gold'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="h-px bg-beige-dark/40 mb-4" />
              <p className="text-muted leading-relaxed text-sm sm:text-base">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  Page Hero                                                    */}
      {/* ============================================================ */}
      <PageHero
        title="Contact Us"
        eyebrow="We're Here to Help"
        subtitle="Have a question about our products, need wellness guidance, or want to explore partnership opportunities? We are here to help."
        bottleSlug="womb-renewal"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {/* ============================================================ */}
      {/*  Contact Form + Support Info                                  */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-beige/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* LEFT — Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <div className="relative bg-white rounded-3xl p-7 sm:p-10 border border-beige-dark/30 shadow-xl shadow-navy/5 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
                <p className="font-heading uppercase tracking-[0.28em] text-xs font-semibold text-gold mb-2">
                  Send Us a Message
                </p>
                <h2 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-ink mb-2">
                  Let&apos;s Talk Wellness
                </h2>
                <p className="text-muted text-sm mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                        className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center mb-6 shadow-lg shadow-gold/25"
                      >
                        <CheckCircle2 className="w-9 h-9 text-white" />
                      </motion.div>
                      <h3 className="font-heading font-bold uppercase text-2xl text-ink mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-muted max-w-sm mx-auto">
                        Thank you for reaching out. Our team will review your message and respond within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                        }}
                        className="mt-6 text-gold font-medium hover:text-gold-deep transition-colors cursor-pointer"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2"
                          >
                            Full Name <span className="text-gold">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2"
                          >
                            Email Address <span className="text-gold">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2"
                          >
                            Subject <span className="text-gold">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A88012' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 16px center',
                            }}
                          >
                            <option value="" disabled>
                              Select a subject
                            </option>
                            {subjectOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-heading font-bold uppercase tracking-wider text-navy mb-2"
                        >
                          Message <span className="text-gold">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-4 rounded-full font-heading font-bold uppercase tracking-wider text-base bg-gradient-to-r from-gold-deep via-gold to-gold-light text-white shadow-lg shadow-gold/20 hover:shadow-[0_8px_30px_-5px_rgba(212,160,23,0.45)] transition-shadow duration-500 cursor-pointer"
                      >
                        Send Message
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>

            {/* RIGHT — Support info cards */}
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-2">
              <div className="space-y-5">
                <div>
                  <p className="font-heading uppercase tracking-[0.28em] text-xs font-semibold text-gold mb-2">
                    Support
                  </p>
                  <h2 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-ink mb-2">
                    Contact Information
                  </h2>
                  <p className="text-muted text-sm mb-6">
                    Reach out to us through any of the following channels.
                  </p>
                </div>

                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-beige-dark/30 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-heading text-xs font-bold tracking-[0.18em] uppercase text-gold mb-1">
                        {item.label}
                      </p>
                      <p className="text-ink font-medium">{item.value}</p>
                      <p className="text-sm text-muted mt-0.5">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Location card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
                  className="relative rounded-2xl overflow-hidden bg-navy p-7 text-center"
                >
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="relative">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gold/15 flex items-center justify-center mb-4">
                      <MapPin className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-heading font-bold uppercase text-lg text-white mb-1">
                      McFuntain Nutraceuticals
                    </h3>
                    <p className="text-white/65 text-sm">11 Brubar Court, Gwynn Oak, MD</p>
                    <p className="text-white/45 text-sm">United States</p>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ Accordion                                                */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-heading uppercase tracking-[0.28em] text-xs sm:text-sm font-semibold text-gold mb-3">
              Quick Answers
            </p>
            <h2 className="font-heading font-bold uppercase text-ink leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Quick answers about our products, ordering, shipping, and more.
            </p>
            <div className="mt-6 h-[3px] w-20 mx-auto bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq, i) => (
              <AnimatedSection key={faq.question} delay={i * 0.06}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === i}
                  toggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-muted mb-5">
                Can&apos;t find what you&apos;re looking for? Browse our full FAQ library.
              </p>
              <GoldButton href="/faq" variant="outline">
                View All FAQs
              </GoldButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Wholesale & Distribution                                     */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative bg-navy rounded-3xl p-8 sm:p-14 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />

              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                    <Building2 className="w-4 h-4 text-gold" />
                    <span className="text-sm text-white/70 font-medium">Business Partnerships</span>
                  </div>
                  <h2 className="font-heading font-bold uppercase text-white leading-[1.05] text-3xl sm:text-4xl mb-4">
                    Wholesale &{' '}
                    <span className="text-gradient-gold">Distribution</span>
                  </h2>
                  <p className="text-white/55 leading-relaxed">
                    Interested in carrying McFuntain Nutraceuticals in your retail store, clinic, or wellness practice? We offer competitive wholesale pricing and dedicated partner support for qualified retailers and health practitioners.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:items-end">
                  <GoldButton href="mailto:wholesale@mcfuntain.com" icon={<Mail className="w-4 h-4" />}>
                    Wholesale Inquiries
                  </GoldButton>
                  <GoldButton href="/contact" variant="outline">
                    Partner With Us
                  </GoldButton>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Trust Badges                                                 */}
      {/* ============================================================ */}
      <section className="py-14 bg-cream border-t border-beige-dark/30">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-beige flex items-center justify-center">
                    <badge.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm font-medium text-muted">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
