/**
 * Emits BreadcrumbList structured data (JSON-LD) for richer Google results.
 * Server component — render it inside any page; it outputs only a <script> tag.
 */
type Crumb = { name: string; path: string };

const BASE = 'https://mcfuntain.com';

export default function JsonLdBreadcrumbs({ items }: { items: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
