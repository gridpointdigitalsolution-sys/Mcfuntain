import type { Metadata } from 'next';
import { getProducts, getAllSeries } from '@/lib/content';
import ShopContent from './ShopContent';

// Revalidate so Sanity Studio edits appear on the live site within ~1 min
export const revalidate = 60;

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

export default async function ShopPage() {
  const [products, seriesList] = await Promise.all([getProducts(), getAllSeries()]);

  return <ShopContent products={products} seriesList={seriesList} />;
}
