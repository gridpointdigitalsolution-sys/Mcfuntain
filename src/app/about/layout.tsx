import type { Metadata } from 'next';
import JsonLdBreadcrumbs from '@/components/seo/JsonLdBreadcrumbs';

export const metadata: Metadata = {
  title: 'About Us | McFuntain Nutraceuticals',
  description:
    'Discover the story behind McFuntain Nutraceuticals. Founded by Rev. Dr. Gideon Afolabi, we bridge African herbal wisdom with modern science to create 26 premium botanical supplements for better living.',
  openGraph: {
    title: 'About Us | McFuntain Nutraceuticals',
    description:
      'Discover the story behind McFuntain Nutraceuticals — rooted in African herbal wisdom, refined by modern science.',
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      {children}
    </>
  );
}
