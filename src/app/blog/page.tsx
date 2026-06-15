import type { Metadata } from 'next';
import BlogIndex from './BlogIndex';

export const metadata: Metadata = {
  title: 'Journal | McFuntain Nutraceuticals',
  description:
    'The McFuntain Journal — insights on African herbal wisdom and modern botanical science. Read honest, educational articles on cellular energy, blood sugar balance, cognitive clarity, and choosing quality supplements.',
  openGraph: {
    title: 'Journal | McFuntain Nutraceuticals',
    description:
      'Insights on African herbal wisdom and modern botanical science — energy, longevity, metabolic balance, brain health, and how to choose a quality supplement.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}
