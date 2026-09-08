import type { Metadata } from 'next';
import { getProducts, getAllSeries } from '@/lib/content';
import ShopContent from './ShopContent';
import JsonLdBreadcrumbs from '@/components/seo/JsonLdBreadcrumbs';

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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ShopPage(props: {
  searchParams: Promise<{ series?: string }>;
}) {
  // Read ?series= on the server. Previously ShopContent called useSearchParams,
  // which forced its whole subtree out of server rendering: /shop shipped with
  // an EMPTY body - no h1, no product names, no links - which is the worst
  // possible outcome for the site's main commercial page.
  const [{ series }, products, seriesList] = await Promise.all([
    props.searchParams,
    getProducts(),
    getAllSeries(),
  ]);

  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
        ]}
      />
      <ShopContent products={products} seriesList={seriesList} initialSeries={series} />
    </>
  );
}
