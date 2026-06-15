import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import LegalSection from '@/components/legal/LegalSection';
import LegalToc from '@/components/legal/LegalToc';
import { Truck, Clock, Package, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy | McFuntain Nutraceuticals',
  description: 'Learn about our shipping methods, delivery times, and free shipping offers at McFuntain Nutraceuticals.',
};

const shippingOptions = [
  {
    icon: Package,
    name: 'Standard Shipping',
    time: '5-7 Business Days',
    price: '$5.99',
    description: 'Reliable USPS delivery with tracking for all domestic orders.',
  },
  {
    icon: Truck,
    name: 'Priority Shipping',
    time: '2-3 Business Days',
    price: '$12.99',
    description: 'Expedited delivery for orders that need to arrive quickly.',
  },
  {
    icon: Clock,
    name: 'Express Shipping',
    time: '1-2 Business Days',
    price: '$24.99',
    description: 'Fastest available option for urgent wellness needs.',
  },
];

const sections = [
  { id: 'shipping-options', label: 'Shipping Options' },
  { id: 'shipping-rates-free-shipping', label: 'Rates & Free Shipping' },
  { id: 'processing-time', label: 'Processing Time' },
  { id: 'order-tracking', label: 'Order Tracking' },
  { id: 'international-shipping', label: 'International Shipping' },
  { id: 'package-care', label: 'Package Care' },
  { id: 'questions', label: 'Questions?' },
];

export default function Shipping() {
  return (
    <main className="bg-cream">
      <PageHero
        title="Shipping Policy"
        eyebrow="Legal"
        subtitle="We ensure every order is carefully packaged and delivered to your door with care."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shipping Policy' }]}
        bottleSlug="glucose-balance"
      />

      {/* Free Shipping Banner */}
      <section className="bg-gradient-to-r from-gold-deep via-gold to-gold-light py-4">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="flex items-center justify-center gap-2 font-heading text-base md:text-lg font-bold uppercase tracking-wide text-white">
            <CheckCircle className="h-5 w-5" aria-hidden />
            Free Standard Shipping on All Orders Over $99
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              <LegalToc items={sections} />
            </aside>

            <div className="mx-auto w-full max-w-3xl lg:mx-0">
              <AnimatedSection>
                <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep">
                  Last updated: June 2026
                </span>

                {/* Shipping Options — info cards */}
                <section id="shipping-options" className="mb-6 scroll-mt-36">
                  <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-navy">
                    Shipping Options
                  </h2>
                  <span className="mt-2.5 mb-6 block h-[3px] w-12 rounded-full bg-gold" aria-hidden />
                  <div className="grid gap-5 sm:grid-cols-3">
                    {shippingOptions.map((opt) => (
                      <div
                        key={opt.name}
                        className="rounded-2xl border border-beige-dark/30 bg-white p-6 text-center shadow-[0_2px_16px_rgba(27,42,74,0.05)] transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
                      >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                          <opt.icon className="h-6 w-6 text-gold" aria-hidden />
                        </div>
                        <h3 className="font-heading text-base font-bold uppercase tracking-wide text-navy">
                          {opt.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-gold-deep">{opt.time}</p>
                        <p className="mt-1 font-heading text-2xl font-bold text-ink">{opt.price}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{opt.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="space-y-6">
                  <LegalSection id="shipping-rates-free-shipping" title="Shipping Rates & Free Shipping">
                    <p>We offer free standard shipping on all orders of $99 or more within the continental
                      United States. Orders under $99 are charged a flat-rate standard shipping fee, with
                      expedited options available at checkout for an additional charge. Final shipping
                      costs are calculated and displayed at checkout before you complete your purchase.</p>
                  </LegalSection>

                  <LegalSection id="processing-time" title="Processing Time">
                    <p>Orders are processed within 1-2 business days. Orders placed after 2 PM EST
                      or on weekends/holidays will be processed the next business day. Delivery estimates
                      begin once your order has shipped, not at the time the order is placed.</p>
                  </LegalSection>

                  <LegalSection id="order-tracking" title="Order Tracking">
                    <p>Once your order ships, you will receive an email with your tracking number.
                      You can track your package status at any time using the provided link.</p>
                  </LegalSection>

                  <LegalSection id="international-shipping" title="International Shipping">
                    <p>We currently ship within the United States. International shipping options
                      are being developed. For international inquiries, please contact us directly.</p>
                  </LegalSection>

                  <LegalSection id="package-care" title="Package Care">
                    <p>All supplements are carefully packaged to maintain product integrity during transit.
                      Each bottle is sealed and protected to ensure you receive your supplements in
                      perfect condition.</p>
                  </LegalSection>

                  <LegalSection id="questions" title="Questions?">
                    <p>Contact our support team at support@mcfuntain.com or visit our
                      Contact page for assistance with any shipping-related inquiries.</p>
                  </LegalSection>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
