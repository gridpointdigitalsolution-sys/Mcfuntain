import type { Metadata } from 'next';
import JsonLdBreadcrumbs from '@/components/seo/JsonLdBreadcrumbs';

export const metadata: Metadata = {
  title: 'Our Research | McFuntain Nutraceuticals',
  description:
    'Explore the research behind McFuntain Nutraceuticals. Learn about our key botanicals, formulation process, 7 wellness series, and how we bridge African herbal tradition with modern science.',
  openGraph: {
    title: 'Our Research | McFuntain Nutraceuticals',
    description:
      'Where centuries of African herbal wisdom meet modern botanical research. Explore the science behind our premium supplements.',
    type: 'website',
      images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'McFuntain Nutraceuticals',
      },
    ],
},
};

export default function ScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Research', path: '/science' },
        ]}
      />
      {children}
    </>
  );
}
