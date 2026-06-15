import type { Metadata } from 'next';
import { products, getAllSeries } from '@/data/products';
import ShopContent from './ShopContent';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Shop | McFuntain Nutraceuticals',
  description:
    'Browse our complete collection of 26 premium herbal supplements. From cellular energy to cognitive clarity, metabolic balance to mobility support - find the formula that fits your wellness journey.',
  openGraph: {
    title: 'Shop | McFuntain Nutraceuticals',
    description:
      'Premium herbal supplements crafted with science-backed formulations for better living.',
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ShopPage() {
  const seriesList = getAllSeries();

  return <ShopContent products={products} seriesList={seriesList} />;
}
