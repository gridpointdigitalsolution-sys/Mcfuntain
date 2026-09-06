import type { Metadata } from 'next';
import JsonLdBreadcrumbs from '@/components/seo/JsonLdBreadcrumbs';

export const metadata: Metadata = {
  title: 'FAQ | McFuntain Nutraceuticals',
  description:
    'Frequently asked questions about McFuntain Nutraceuticals products, ordering, shipping, returns, and more. Find answers to your wellness supplement questions.',
  openGraph: {
    title: 'FAQ | McFuntain Nutraceuticals',
    description:
      'Find answers to common questions about McFuntain Nutraceuticals products, ordering, shipping, and returns.',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />
      {children}
    </>
  );
}
