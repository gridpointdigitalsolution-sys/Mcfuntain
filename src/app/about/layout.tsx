import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | McFuntain Nutraceuticals',
  description:
    'Discover the story behind McFuntain Nutraceuticals. Founded by Rev. Dr. Gideon Afolabi, we bridge African herbal wisdom with modern science to create 26 premium botanical supplements for better living.',
  openGraph: {
    title: 'About Us | McFuntain Nutraceuticals',
    description:
      'Discover the story behind McFuntain Nutraceuticals — rooted in African herbal wisdom, refined by modern science.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
