import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | McFuntain Nutraceuticals',
  description:
    'Get in touch with McFuntain Nutraceuticals. Reach out for product inquiries, wellness guidance, wholesale partnerships, or general support. Located in Gwynn Oak, Maryland.',
  openGraph: {
    title: 'Contact Us | McFuntain Nutraceuticals',
    description:
      'Have a question? Reach out to the McFuntain Nutraceuticals team for product support, wellness guidance, or partnership inquiries.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
