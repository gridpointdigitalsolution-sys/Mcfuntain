'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Truck,
  RotateCcw,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldButton from '@/components/ui/GoldButton';
import PageHero from '@/components/ui/PageHero';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type FAQCategory = 'general' | 'products' | 'ordering' | 'shipping' | 'returns';

interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

const categories: { id: FAQCategory; label: string; icon: typeof HelpCircle }[] = [
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'ordering', label: 'Ordering', icon: ShoppingCart },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'returns', label: 'Returns', icon: RotateCcw },
];

const faqItems: FAQItem[] = [
  // General
  {
    category: 'general',
    question: 'What is McFuntain Nutraceuticals?',
    answer:
      'McFuntain Nutraceuticals is a premium botanical supplement company based in Gwynn Oak, Maryland. We specialize in creating science-backed herbal formulations rooted in traditional African herbal wisdom. Our collection includes 26 supplements across 7 targeted wellness series, covering cellular health, cognitive function, metabolic balance, mobility, vision, detoxification, and general wellness.',
  },
  {
    category: 'general',
    question: 'Who is the founder of McFuntain Nutraceuticals?',
    answer:
      'McFuntain Nutraceuticals was founded by Rev. Dr. Gideon Afolabi, a scholar, minister, and botanical researcher who has dedicated over 45 years to the study of traditional African herbal medicine and modern botanical science. His lifelong commitment to bridging ancestral healing wisdom with contemporary wellness innovation is at the heart of every product we create.',
  },
  {
    category: 'general',
    question: 'Are McFuntain products safe?',
    answer:
      'Yes, safety is our top priority. All McFuntain products are manufactured in an FDA-compliant facility under strict Good Manufacturing Practices (cGMP). Every batch undergoes third-party laboratory testing for potency, purity, and contaminants. Our formulations use only natural, plant-based ingredients with no synthetic fillers or artificial additives. As with any supplement, we recommend consulting with your healthcare provider before starting a new regimen, especially if you are pregnant, nursing, or taking medications.',
  },
  {
    category: 'general',
    question: 'Are your supplements plant-based and vegan-friendly?',
    answer:
      'Yes, all McFuntain supplements are 100% plant-based. We use only natural botanical ingredients sourced from trusted growers. Our capsules are made from plant-derived materials, and our formulations contain no animal products, synthetic fillers, artificial colors, or harmful additives.',
  },
  {
    category: 'general',
    question: 'Are McFuntain products approved by the FDA?',
    answer:
      'Dietary supplements in the United States are regulated by the FDA but are not subject to the same pre-market approval process as prescription drugs. However, McFuntain Nutraceuticals manufactures all products in an FDA-compliant facility that follows current Good Manufacturing Practices (cGMP). Every batch is third-party tested to ensure quality, potency, and purity.',
  },
  {
    category: 'general',
    question: 'Where are your products manufactured?',
    answer:
      'All McFuntain products are manufactured in the United States at our FDA-compliant facility in Maryland. We maintain strict quality controls at every stage of the production process, from raw ingredient verification through final product testing and packaging.',
  },

  // Products
  {
    category: 'products',
    question: 'How do I choose the right supplement for me?',
    answer:
      'Our 26 supplements are organized into 7 wellness series, each targeting a specific area of health: Cellular (energy and longevity), Neuro (brain and nerve support), Metabolic (blood sugar and weight management), Mobility (joint and bone health), Vision (eye wellness), Detox (cleansing), and Wellness (vitality and general health). Browse our series to find the category that matches your health goals. If you need personalized guidance, our team is happy to help — just reach out through our contact page.',
  },
  {
    category: 'products',
    question: 'Can I combine multiple McFuntain supplements?',
    answer:
      'Yes, many of our supplements are designed to work synergistically. For example, you might pair a Cellular Series product for energy with a Neuro Series product for cognitive support. Our formulations are crafted to be compatible with each other. However, we recommend introducing one new supplement at a time and consulting your healthcare provider if you have specific health conditions.',
  },
  {
    category: 'products',
    question: 'How long does it take to see results?',
    answer:
      'Results vary depending on the individual, the product, and your overall health. Many customers report noticing positive changes within 2 to 4 weeks of consistent daily use. Botanical supplements work best as part of a sustained wellness routine. We recommend taking your supplements consistently for at least 30 to 60 days to evaluate their full benefit.',
  },
  {
    category: 'products',
    question: 'What is the recommended dosage?',
    answer:
      'Each product label includes detailed dosage instructions specific to that formulation. Generally, our supplements are designed to be taken daily with food and water. Please follow the label directions and do not exceed the recommended dose unless directed by your healthcare provider.',
  },
  {
    category: 'products',
    question: 'Do your products contain allergens?',
    answer:
      'Our products are free from common allergens including gluten, dairy, soy, and nuts. They contain no artificial colors, flavors, or preservatives. Full ingredient lists are available on each product label and product page on our website. If you have specific allergy concerns, please review the ingredient list carefully or contact our support team.',
  },
  {
    category: 'products',
    question: 'What makes McFuntain supplements different from other brands?',
    answer:
      'McFuntain Nutraceuticals stands apart through our unique fusion of traditional African herbal wisdom with modern botanical science. Our founder has spent over 45 years studying traditional plant medicine, and every formula reflects that depth of knowledge. We use premium globally sourced botanicals, manufacture in an FDA-compliant facility, and conduct rigorous third-party testing on every batch. Our commitment to purity means no synthetic fillers, no artificial additives — just clean, effective botanical wellness.',
  },

  // Ordering
  {
    category: 'ordering',
    question: 'How do I place an order?',
    answer:
      'You can place an order directly through our website. Simply browse our shop, add your desired products to your cart, and proceed to checkout. Our secure checkout process accepts multiple payment methods and guides you through shipping and payment in a few simple steps.',
  },
  {
    category: 'ordering',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), as well as digital payment options including PayPal and Apple Pay. All transactions are securely encrypted to protect your payment information.',
  },
  {
    category: 'ordering',
    question: 'Do you offer international shipping?',
    answer:
      'At this time, we primarily ship within the United States. We are actively working to expand our shipping capabilities to international destinations. For international inquiries, please contact our support team directly and we will do our best to accommodate your request.',
  },
  {
    category: 'ordering',
    question: 'Do you offer wholesale or bulk pricing?',
    answer:
      'Yes, we offer competitive wholesale pricing for qualified retailers, health practitioners, and wellness clinics. If you are interested in carrying McFuntain Nutraceuticals products, please reach out to our wholesale team through our contact page or email wholesale@mcfuntain.com for more information about our partnership programs.',
  },
  {
    category: 'ordering',
    question: 'Can I modify or cancel my order after placing it?',
    answer:
      'We process orders quickly to ensure fast delivery. If you need to modify or cancel an order, please contact us as soon as possible. We can typically accommodate changes if the order has not yet been shipped. Once an order has been dispatched, it cannot be modified, but our return policy will apply.',
  },

  // Shipping
  {
    category: 'shipping',
    question: 'How long does order processing take?',
    answer:
      'Orders are typically processed within 1 to 2 business days. During peak periods or promotional events, processing may take up to 3 business days. You will receive a confirmation email with tracking information once your order has been shipped.',
  },
  {
    category: 'shipping',
    question: 'How can I track my order?',
    answer:
      'Once your order has been shipped, you will receive an email with a tracking number and a link to track your package in real time. You can also check your order status by contacting our support team with your order number.',
  },
  {
    category: 'shipping',
    question: 'Do you offer international shipping?',
    answer:
      'Currently, we ship primarily within the continental United States. International shipping options are being explored and may become available in the future. For international requests, please contact our support team to discuss potential arrangements.',
  },
  {
    category: 'shipping',
    question: 'Is there a free shipping option?',
    answer:
      'Yes! We offer free standard shipping on all orders of $99 or more within the continental United States. Orders under $99 are subject to a flat-rate shipping fee calculated at checkout. Expedited shipping options are also available for an additional charge.',
  },
  {
    category: 'shipping',
    question: 'What carriers do you use?',
    answer:
      'We ship via trusted carriers including USPS, UPS, and FedEx. The specific carrier for your order will depend on your location, the package size, and your selected shipping speed. Tracking information will be provided regardless of carrier.',
  },
  {
    category: 'shipping',
    question: 'What if my package is lost or delayed?',
    answer:
      'If your tracking shows no updates for more than 5 business days or if your package appears lost, please contact our support team immediately. We will work with the carrier to locate your package and, if necessary, arrange a replacement shipment at no additional cost.',
  },

  // Returns
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, you may return unopened, unused products within 30 days of delivery for a full refund. Products must be in their original, sealed packaging to qualify for a return. Please contact our support team to initiate a return.',
  },
  {
    category: 'returns',
    question: 'What if I receive a damaged or defective product?',
    answer:
      'We take great care in packaging, but if you receive a damaged or defective product, please contact us within 48 hours of delivery with photos of the damage. We will arrange a free replacement shipment or full refund — no need to return the damaged item.',
  },
  {
    category: 'returns',
    question: 'How long does it take to process a refund?',
    answer:
      'Once we receive and inspect your returned product, refunds are typically processed within 5 to 7 business days. The refund will be issued to your original payment method. Please note that it may take an additional 2 to 5 business days for the refund to appear on your statement, depending on your financial institution.',
  },
  {
    category: 'returns',
    question: 'Can I exchange a product instead of returning it?',
    answer:
      'Yes, we are happy to accommodate exchanges for unopened products within our 30-day return window. Contact our support team to arrange an exchange. If the replacement item is a different price, we will adjust the charge accordingly.',
  },
  {
    category: 'returns',
    question: 'Who pays for return shipping?',
    answer:
      'For standard returns, the customer is responsible for return shipping costs. However, if the return is due to a defective or damaged product, or if we made an error with your order, we will cover all return shipping costs and provide a prepaid shipping label.',
  },
];

/* ------------------------------------------------------------------ */
/*  Accordion Item — gold plus rotates to X when open                  */
/* ------------------------------------------------------------------ */

function AccordionItem({ item, isOpen, toggle }: { item: FAQItem; isOpen: boolean; toggle: () => void }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl overflow-hidden bg-white border transition-all duration-400 ${
        isOpen
          ? 'border-gold/40 shadow-[0_18px_40px_-22px_rgba(27,42,74,0.35)]'
          : 'border-beige-dark/30 hover:border-gold/25 hover:shadow-[0_12px_30px_-22px_rgba(27,42,74,0.3)]'
      }`}
    >
      <button
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
      >
        <span
          className={`text-base sm:text-lg font-semibold leading-snug pr-4 transition-colors duration-300 ${
            isOpen ? 'text-gold-deep' : 'text-ink group-hover:text-gold-deep'
          }`}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#1B2A4A' : '#F5F0E8' }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        >
          <Plus className="w-4.5 h-4.5 text-gold" strokeWidth={2.5} />
        </motion.div>
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
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <div className="h-px bg-gradient-to-r from-gold/40 via-beige-dark/40 to-transparent mb-4" />
              <p className="text-muted leading-relaxed text-[15px]">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let items = faqItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    } else {
      items = items.filter((item) => item.category === activeCategory);
    }

    return items;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat: FAQCategory) => {
    setActiveCategory(cat);
    setOpenIndex(null);
    setSearchQuery('');
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  Page Hero — faded bottle + bold page name                    */}
      {/* ============================================================ */}
      <PageHero
        title="FAQ"
        eyebrow="Help Center"
        subtitle="Everything you need to know about McFuntain Nutraceuticals, our products, and how we can support your wellness journey."
        bottleSlug="belly-fat-balance"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      {/* ============================================================ */}
      {/*  Search + Category Tabs + FAQ Accordion                       */}
      {/* ============================================================ */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <AnimatedSection>
            <div className="relative mb-12 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-300 group-focus-within:text-gold" />
              <input
                type="text"
                placeholder="Search for a question..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                className="w-full pl-13 pr-5 py-4.5 rounded-full border border-beige-dark bg-white text-ink placeholder:text-muted shadow-[0_10px_30px_-18px_rgba(27,42,74,0.25)] focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all duration-300 text-base"
              />
            </div>
          </AnimatedSection>

          {/* Category Tabs */}
          {!searchQuery.trim() && (
            <AnimatedSection delay={0.1}>
              <div className="flex flex-wrap gap-2.5 mb-12 justify-center">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-navy text-gold shadow-lg shadow-navy/25'
                          : 'bg-white border border-beige-dark text-muted hover:border-gold/40 hover:text-ink'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </motion.button>
                  );
                })}
              </div>
            </AnimatedSection>
          )}

          {/* Search Results Count */}
          {searchQuery.trim() && (
            <div className="mb-8 text-sm text-muted">
              Found <span className="font-semibold text-gold-deep">{filteredItems.length}</span> result{filteredItems.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
            </div>
          )}

          {/* FAQ Items */}
          <motion.div layout className="space-y-3.5">
            {filteredItems.map((item, i) => (
              <AnimatedSection key={`${item.category}-${item.question}`} delay={Math.min(i * 0.05, 0.3)}>
                <AccordionItem
                  item={item}
                  isOpen={openIndex === i}
                  toggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </AnimatedSection>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-beige flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-muted" />
                </div>
                <h3 className="text-2xl font-heading font-bold uppercase text-ink mb-2">No results found</h3>
                <p className="text-muted">
                  Try adjusting your search or browse a different category.
                </p>
              </div>
            </AnimatedSection>
          )}

          {/* Still need help? card */}
          <AnimatedSection delay={0.1}>
            <div className="mt-14 relative overflow-hidden rounded-2xl bg-navy p-8 sm:p-10">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 85% 20%, rgba(212,160,23,0.15) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(48,80,140,0.4) 0%, transparent 55%)',
                }}
              />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-gold" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-heading font-bold uppercase text-2xl text-white">Still need help?</h3>
                  <p className="mt-1.5 text-white/60 leading-relaxed">
                    Our team is ready to help. Reach out and we will get back to you within 24 hours with the answers you need.
                  </p>
                </div>
                <GoldButton href="/contact" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Contact Us
                </GoldButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA - Still Have Questions                                   */}
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
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-gold/25 flex items-center justify-center mb-8">
              <MessageCircle className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase text-white leading-[1.05]">
              Still Have{' '}
              <span className="text-gradient-gold">Questions?</span>
            </h2>
            <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Our team is ready to help. Reach out and we will get back to you within 24 hours with the answers you need.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <GoldButton href="/contact" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Contact Us
              </GoldButton>
              <GoldButton href="/shop" variant="outline" size="lg">
                Browse Products
              </GoldButton>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
