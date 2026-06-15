import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import LegalSection from '@/components/legal/LegalSection';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Terms of Service | McFuntain Nutraceuticals',
  description: 'Terms and conditions for using the McFuntain Nutraceuticals website and purchasing our products.',
};

const sections = [
  { id: 'agreement-to-terms', label: 'Agreement to Terms' },
  { id: 'use-of-the-site', label: 'Use of the Site' },
  { id: 'products-and-health-disclaimer', label: 'Products & Health Disclaimer' },
  { id: 'orders-and-pricing', label: 'Orders and Pricing' },
  { id: 'payment', label: 'Payment' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'returns-and-refunds', label: 'Returns and Refunds' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes-to-terms', label: 'Changes to These Terms' },
  { id: 'contact', label: 'Contact' },
];

export default function Terms() {
  return (
    <main className="bg-cream">
      <PageHero
        title="Terms of Service"
        eyebrow="Legal"
        subtitle="The terms and conditions that govern your use of our website and products."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
        bottleSlug="cogniboost"
      />

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

                <div className="space-y-6">
                  <LegalSection id="agreement-to-terms" title="Agreement to Terms">
                    <p>
                      By accessing or using the McFuntain Nutraceuticals website and purchasing our products,
                      you agree to be bound by these Terms of Service and our Privacy Policy. If you do not
                      agree to these terms, please do not use our services. We may update these terms from
                      time to time, and your continued use of the site constitutes acceptance of the current
                      version.
                    </p>
                  </LegalSection>

                  <LegalSection id="use-of-the-site" title="Use of the Site">
                    <p>
                      You agree to use our website only for lawful purposes and in a manner that does not
                      infringe the rights of, or restrict or inhibit the use of, this site by any third
                      party. You agree not to:
                    </p>
                    <ul>
                      <li>Use the site in any way that violates applicable law or regulation</li>
                      <li>Attempt to gain unauthorized access to our systems or networks</li>
                      <li>Interfere with or disrupt the security or operation of the site</li>
                      <li>Use automated means to scrape, copy, or harvest content without permission</li>
                      <li>Submit false, misleading, or fraudulent information</li>
                    </ul>
                    <p>
                      You are responsible for maintaining the confidentiality of any account information and
                      for all activity that occurs under your account.
                    </p>
                  </LegalSection>

                  <LegalSection id="products-and-health-disclaimer" title="Products and Health Disclaimer">
                    <p>
                      Our products are dietary supplements offered under the Dietary Supplement Health and
                      Education Act (DSHEA). They are not intended to diagnose, treat, cure, or prevent any
                      disease. These statements have not been evaluated by the Food and Drug Administration
                      (FDA).
                    </p>
                    <p>
                      The information provided on this website is for general educational purposes only and
                      is not medical advice. It is not a substitute for professional medical advice,
                      diagnosis, or treatment. Always consult your physician or a qualified healthcare
                      provider before beginning any new supplement regimen, especially if you are pregnant,
                      nursing, taking medication, or have a medical condition. Never disregard professional
                      medical advice or delay seeking it because of something you read on our website.
                      Individual results may vary.
                    </p>
                  </LegalSection>

                  <LegalSection id="orders-and-pricing" title="Orders and Pricing">
                    <p>All prices are listed in US dollars. We reserve the right to modify prices at any time.
                      Orders are subject to availability and confirmation. We may refuse or cancel orders at our discretion.</p>
                  </LegalSection>

                  <LegalSection id="payment" title="Payment">
                    <p>We accept major credit cards and other payment methods as displayed at checkout.
                      All payments are processed securely through our third-party payment processors.</p>
                  </LegalSection>

                  <LegalSection id="shipping" title="Shipping">
                    <p>We offer domestic shipping within the United States. Free shipping is available on orders
                      over $99. Shipping times and rates vary by location and method selected.</p>
                  </LegalSection>

                  <LegalSection id="returns-and-refunds" title="Returns and Refunds">
                    <p>We offer a 30-day satisfaction guarantee on unopened products. To initiate a return,
                      please contact our customer service team. Opened products may be eligible for a
                      partial refund at our discretion.</p>
                  </LegalSection>

                  <LegalSection id="intellectual-property" title="Intellectual Property">
                    <p>All content on this website, including text, images, logos, and product designs, is the
                      property of McFuntain Nutraceuticals and is protected by applicable intellectual property laws.</p>
                  </LegalSection>

                  <LegalSection id="limitation-of-liability" title="Limitation of Liability">
                    <p>
                      To the fullest extent permitted by law, McFuntain Nutraceuticals and its officers,
                      employees, and affiliates shall not be liable for any indirect, incidental, special,
                      or consequential damages arising from the use of our products or website. Our website
                      and products are provided on an &quot;as is&quot; and &quot;as available&quot; basis
                      without warranties of any kind, except as required by applicable law. Nothing in these
                      terms limits liability that cannot be limited under applicable law.
                    </p>
                  </LegalSection>

                  <LegalSection id="governing-law" title="Governing Law">
                    <p>
                      These Terms of Service are governed by and construed in accordance with the laws of
                      the State of Maryland, United States, without regard to its conflict-of-law
                      principles. You agree that any dispute arising out of or relating to these terms or
                      your use of our website or products shall be subject to the exclusive jurisdiction of
                      the state and federal courts located in Maryland.
                    </p>
                  </LegalSection>

                  <LegalSection id="changes-to-terms" title="Changes to These Terms">
                    <p>
                      We reserve the right to modify or replace these Terms of Service at any time. When we
                      make material changes, we will update the &quot;Last updated&quot; date at the top of
                      this page. Your continued use of the website after any changes become effective
                      constitutes your acceptance of the revised terms.
                    </p>
                  </LegalSection>

                  <LegalSection id="contact" title="Contact">
                    <p>
                      If you have questions about these Terms of Service, please contact us at:
                    </p>
                    <p>
                      McFuntain Nutraceuticals<br />
                      11 Brubar Court, Gwynn Oak, MD, USA<br />
                      Email: support@mcfuntain.com
                    </p>
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
