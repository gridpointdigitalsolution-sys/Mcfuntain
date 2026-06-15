import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import LegalSection from '@/components/legal/LegalSection';
import LegalToc from '@/components/legal/LegalToc';
import { RotateCcw, Mail, CheckCircle, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return Policy | McFuntain Nutraceuticals',
  description: 'Learn about our 30-day satisfaction guarantee and return policy at McFuntain Nutraceuticals.',
};

const steps = [
  { icon: Mail, title: 'Contact Us', description: 'Email support@mcfuntain.com with your order number and reason for return.' },
  { icon: CheckCircle, title: 'Get Approved', description: 'Receive return authorization and prepaid shipping label within 24 hours.' },
  { icon: RotateCcw, title: 'Ship It Back', description: 'Pack the product securely and ship using the provided label.' },
  { icon: CreditCard, title: 'Get Refunded', description: 'Refund processed within 5-7 business days of receiving the return.' },
];

const sections = [
  { id: 'how-returns-work', label: 'How Returns Work' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'non-returnable-items', label: 'Non-Returnable Items' },
  { id: 'damaged-or-defective', label: 'Damaged or Defective Products' },
  { id: 'refund-processing', label: 'Refund Processing' },
  { id: 'exchanges', label: 'Exchanges' },
  { id: 'contact-returns', label: 'Contact Returns Department' },
];

export default function Returns() {
  return (
    <main className="bg-cream">
      <PageHero
        title="Returns & Refunds"
        eyebrow="Legal"
        subtitle="Your satisfaction is our priority. We stand behind every product we create."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Returns & Refunds' }]}
        bottleSlug="womb-renewal"
      />

      {/* 30-Day Guarantee Banner */}
      <section className="bg-gradient-to-r from-gold-deep via-gold to-gold-light py-4">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-heading text-base md:text-lg font-bold uppercase tracking-wide text-white">
            30-Day Satisfaction Guarantee on All Products
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

                {/* Return Steps — numbered gold steps */}
                <section
                  id="how-returns-work"
                  className="mb-6 scroll-mt-36 rounded-2xl border border-beige-dark/30 bg-white p-7 md:p-10 shadow-[0_2px_16px_rgba(27,42,74,0.05)]"
                >
                  <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-navy">
                    How Returns Work
                  </h2>
                  <span className="mt-2.5 mb-7 block h-[3px] w-12 rounded-full bg-gold" aria-hidden />
                  <ol className="space-y-6">
                    {steps.map((step, i) => (
                      <li key={step.title} className="flex items-start gap-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-gold">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="flex items-center gap-2 font-heading text-base md:text-lg font-bold uppercase tracking-wide text-navy">
                            <step.icon className="h-4.5 w-4.5 text-gold" aria-hidden />
                            {step.title}
                          </h3>
                          <p className="mt-1.5 text-[15px] md:text-base leading-relaxed text-ink/75">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <div className="space-y-6">
                  <LegalSection id="eligibility" title="Eligibility">
                    <p>Unopened, unused products in their original sealed packaging may be returned within
                      30 days of delivery for a full refund under our 30-day satisfaction guarantee. Opened
                      products may be eligible for a partial refund or exchange at our discretion, depending
                      on usage and condition. To qualify, please contact us before sending any product back
                      so we can authorize the return and provide instructions.</p>
                  </LegalSection>

                  <LegalSection id="non-returnable-items" title="Non-Returnable Items">
                    <p>Bundle and program packages that have been partially consumed, promotional
                      or clearance items, and products purchased more than 30 days ago are not eligible for return.</p>
                  </LegalSection>

                  <LegalSection id="damaged-or-defective" title="Damaged or Defective Products">
                    <p>If your product arrives damaged or defective, contact us within 48 hours of delivery.
                      We will send a replacement at no additional cost. Please include photos of
                      the damaged product and packaging for our records.</p>
                  </LegalSection>

                  <LegalSection id="refund-processing" title="Refund Processing">
                    <p>Refunds are issued to the original payment method within 5-7 business days after
                      we receive and inspect the returned product. You will receive an email confirmation
                      when your refund has been processed.</p>
                  </LegalSection>

                  <LegalSection id="exchanges" title="Exchanges">
                    <p>Want to try a different supplement? We are happy to process exchanges. Contact our
                      team and we will help you find the right product for your wellness goals.</p>
                  </LegalSection>

                  <LegalSection id="contact-returns" title="Contact Returns Department">
                    <p>
                      McFuntain Nutraceuticals<br />
                      11 Brubar Court, Gwynn Oak, MD, USA<br />
                      Email: support@mcfuntain.com
                    </p>
                    <p>Include your order number for faster processing.</p>
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
