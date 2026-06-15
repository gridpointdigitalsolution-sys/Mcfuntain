import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getProductsBySeries } from '@/data/products';
import ProductDetail from './ProductDetail';

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found | McFuntain Nutraceuticals' };
  }

  return {
    title: `${product.name} | McFuntain Nutraceuticals`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.description,
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // Related products: same series first, topped up from other series
  const sameSeries = getProductsBySeries(product.seriesSlug).filter(
    (p) => p.id !== product.id,
  );
  const fallback = products.filter(
    (p) => p.id !== product.id && p.seriesSlug !== product.seriesSlug,
  );
  const related = [...sameSeries, ...fallback].slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    category: `${product.series} Series`,
    image: `https://mcfuntain.com/images/products/${product.imageFolder}/bottle-1.jpg`,
    url: `https://mcfuntain.com/shop/${product.id}`,
    brand: {
      "@type": "Brand",
      name: "McFuntain Nutraceuticals",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: product.pricing.small.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://mcfuntain.com/shop/${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} relatedProducts={related} />
    </>
  );
}
