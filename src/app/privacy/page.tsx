import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHero from '@/components/ui/PageHero';
import LegalSection from '@/components/legal/LegalSection';
import LegalToc from '@/components/legal/LegalToc';

export const metadata: Metadata = {
  title: 'Privacy Policy | McFuntain Nutraceuticals',
  description: 'Learn how McFuntain Nutraceuticals protects your personal information and privacy.',
};

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-your-information', label: 'How We Use Your Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'advertising', label: 'Advertising & Google' },
  { id: 'information-sharing', label: 'Information Sharing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights (GDPR & CCPA)' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'third-party-links', label: 'Third-Party Links' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact-us', label: 'Contact Us' },
];

export default function PrivacyPolicy() {
  return (
    <main className="bg-cream">
      <PageHero
        title="Privacy Policy"
        eyebrow="Legal"
        subtitle="How we collect, use, and safeguard your personal information."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        bottleSlug="longevity-30"
      />

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            {/* Sticky TOC — lg+ */}
            <aside className="hidden lg:block">
              <LegalToc items={sections} />
            </aside>

            <div className="mx-auto w-full max-w-3xl lg:mx-0">
              <AnimatedSection>
                <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-deep">
                  Last updated: June 2026
                </span>

                <div className="space-y-6">
                  <LegalSection id="introduction" title="Introduction">
                    <p>
                      McFuntain Nutraceuticals (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                      personal information. This Privacy Policy explains how we collect, use, disclose,
                      and safeguard your information when you visit our website, contact us, or purchase
                      our products. It also explains the choices you have regarding your information and
                      how you can exercise your privacy rights.
                    </p>
                    <p>
                      By using our website, you consent to the practices described in this policy. If you
                      do not agree with this policy, please discontinue use of our website. This policy
                      applies to information collected through our website and does not apply to
                      third-party websites or services that we do not control.
                    </p>
                  </LegalSection>

                  <LegalSection id="information-we-collect" title="Information We Collect">
                    <h3>Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide, including:</p>
                    <ul>
                      <li>Name and contact information (email address, phone number, mailing address)</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely through third-party payment processors)</li>
                      <li>Order history and preferences</li>
                      <li>Communication preferences</li>
                    </ul>

                    <h3>Automatically Collected Information</h3>
                    <p>
                      When you visit our website, we and our service providers may automatically collect
                      certain information through cookies and similar technologies, including:
                    </p>
                    <ul>
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Pages viewed, links clicked, and time spent on our site</li>
                      <li>Referring website addresses and search terms</li>
                      <li>General location information derived from your IP address</li>
                    </ul>
                  </LegalSection>

                  <LegalSection id="how-we-use-your-information" title="How We Use Your Information">
                    <p>We use the information we collect to:</p>
                    <ul>
                      <li>Process and fulfill your orders</li>
                      <li>Send order confirmations and shipping updates</li>
                      <li>Respond to customer service requests</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Personalize your experience and improve our website and products</li>
                      <li>Measure website performance and the effectiveness of our advertising</li>
                      <li>Detect, prevent, and address fraud or security issues</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </LegalSection>

                  <LegalSection id="cookies" title="Cookies & Tracking Technologies">
                    <p>
                      Our website uses cookies, web beacons, pixels, and similar tracking technologies to
                      operate the site, remember your preferences, analyze traffic, and support our
                      advertising. A cookie is a small text file stored on your device when you visit a
                      website.
                    </p>
                    <p>We use the following general categories of cookies:</p>
                    <ul>
                      <li><strong>Essential cookies</strong> — required for the website and shopping cart to function.</li>
                      <li><strong>Preference cookies</strong> — remember your settings and choices.</li>
                      <li><strong>Analytics cookies</strong> — help us understand how visitors use our site.</li>
                      <li><strong>Advertising cookies</strong> — used by us and third parties to deliver and measure ads.</li>
                    </ul>
                    <p>
                      You can manage or disable cookies through your browser settings. Most browsers allow
                      you to refuse or delete cookies; however, disabling certain cookies may affect the
                      functionality of our website. For more information about advertising cookies and your
                      choices, see the &quot;Advertising &amp; Google&quot; section below.
                    </p>
                  </LegalSection>

                  <LegalSection id="analytics" title="Analytics">
                    <p>
                      We may use third-party analytics services, such as Google Analytics, to help us
                      understand how visitors interact with our website. These services use cookies and
                      similar technologies to collect information such as pages visited, time on site, and
                      general usage patterns. This information is aggregated and used to improve our site
                      and services.
                    </p>
                    <p>
                      You can opt out of Google Analytics by installing the{' '}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                        Google Analytics Opt-out Browser Add-on
                      </a>
                      . For more information on how Google uses data, please review Google&apos;s privacy
                      and terms page.
                    </p>
                  </LegalSection>

                  <LegalSection id="advertising" title="Advertising & Google">
                    <p>
                      We may use third-party advertising companies, including Google, to serve ads when you
                      visit our website or other sites across the internet.
                    </p>
                    <ul>
                      <li>
                        Third-party vendors, including Google, use cookies to serve ads based on a
                        user&apos;s prior visits to our website or other websites.
                      </li>
                      <li>
                        Google&apos;s use of advertising cookies enables it and its partners to serve ads
                        to you based on your visit to our site and/or other sites on the internet.
                      </li>
                      <li>
                        Third-party vendors and ad networks may also use cookies to serve ads based on
                        your browsing activity.
                      </li>
                    </ul>
                    <p>
                      You may opt out of personalized advertising by visiting{' '}
                      <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                        Google Ads Settings
                      </a>
                      . You can also learn about Google&apos;s advertising practices and the cookies it
                      uses through the{' '}
                      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                        Google Advertising / Technologies policy
                      </a>
                      . To opt out of personalized advertising from other participating vendors, visit{' '}
                      <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                        aboutads.info/choices
                      </a>{' '}
                      or{' '}
                      <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                        the Network Advertising Initiative opt-out page
                      </a>
                      .
                    </p>
                  </LegalSection>

                  <LegalSection id="information-sharing" title="Information Sharing">
                    <p>
                      We do not sell or rent your personal information to third parties. We may share
                      information in the following limited circumstances:
                    </p>
                    <ul>
                      <li>
                        <strong>Service providers</strong> — trusted partners who help us operate our
                        website, process payments, deliver orders, send email, provide analytics, and
                        serve advertising.
                      </li>
                      <li>
                        <strong>Legal compliance</strong> — when required by law, regulation, legal
                        process, or governmental request.
                      </li>
                      <li>
                        <strong>Business transfers</strong> — in connection with a merger, acquisition, or
                        sale of assets, in which case we will notify you of any change.
                      </li>
                      <li>
                        <strong>With your consent</strong> — when you have given us permission to do so.
                      </li>
                    </ul>
                  </LegalSection>

                  <LegalSection id="data-retention" title="Data Retention">
                    <p>
                      We retain personal information only for as long as necessary to fulfill the purposes
                      described in this policy, including to provide our services, comply with our legal
                      and tax obligations, resolve disputes, and enforce our agreements. When information
                      is no longer needed, we take reasonable steps to delete or anonymize it.
                    </p>
                  </LegalSection>

                  <LegalSection id="data-security" title="Data Security">
                    <p>
                      We implement appropriate technical and organizational measures to protect your
                      personal information against unauthorized access, alteration, disclosure, or
                      destruction. Payment information is handled by PCI-compliant third-party payment
                      processors and is not stored on our servers. However, no method of transmission over
                      the internet or electronic storage is completely secure, and we cannot guarantee
                      absolute security.
                    </p>
                  </LegalSection>

                  <LegalSection id="your-rights" title="Your Rights (GDPR & CCPA)">
                    <p>Depending on where you live, you may have the right to:</p>
                    <ul>
                      <li>Access the personal information we hold about you</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Object to or restrict certain processing</li>
                      <li>Request a portable copy of your data</li>
                      <li>Opt out of marketing communications at any time</li>
                      <li>Withdraw consent where processing is based on consent</li>
                    </ul>
                    <p>
                      If you are located in the European Economic Area or the United Kingdom, you have
                      these rights under the General Data Protection Regulation (GDPR). If you are a
                      California resident, you have rights under the California Consumer Privacy Act (CCPA),
                      including the right to know what personal information we collect and the right not to
                      be discriminated against for exercising your rights. We do not sell your personal
                      information. To exercise any of these rights, contact us using the details in the
                      &quot;Contact Us&quot; section below; we will respond within the time required by
                      applicable law.
                    </p>
                  </LegalSection>

                  <LegalSection id="childrens-privacy" title="Children's Privacy">
                    <p>
                      Our website and products are not directed to children, and we do not knowingly
                      collect personal information from anyone under the age of 16. If you believe a child
                      has provided us with personal information, please contact us and we will take steps
                      to delete that information. Our supplements are intended for adults; consult a
                      pediatrician before giving any supplement to a minor.
                    </p>
                  </LegalSection>

                  <LegalSection id="third-party-links" title="Third-Party Links">
                    <p>
                      Our website may contain links to third-party websites, products, or services that we
                      do not own or control. This Privacy Policy does not apply to those third parties, and
                      we are not responsible for their content or privacy practices. We encourage you to
                      review the privacy policies of any third-party sites you visit.
                    </p>
                  </LegalSection>

                  <LegalSection id="changes" title="Changes to This Policy">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our
                      practices, technologies, or legal requirements. When we make material changes, we
                      will revise the &quot;Last updated&quot; date at the top of this page. We encourage
                      you to review this policy periodically. Your continued use of our website after any
                      changes constitutes acceptance of the updated policy.
                    </p>
                  </LegalSection>

                  <LegalSection id="contact-us" title="Contact Us">
                    <p>
                      If you have questions about this Privacy Policy or wish to exercise your privacy
                      rights, please contact us at:
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
