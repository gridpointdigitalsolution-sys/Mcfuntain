/**
 * Build an NDJSON file from local product + blog data for Sanity import.
 * Run: npx tsx scripts/import-to-sanity.mts  -> writes scripts/sanity-import.ndjson
 * Then: npx sanity dataset import scripts/sanity-import.ndjson production --replace
 * Images intentionally skipped (kept local for v1).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { products } from '../src/data/products.ts';
import { blogPosts, type BlogBlock } from '../src/data/blog.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const key = (prefix: string, i: number) => `${prefix}${i}`;

const docs: Record<string, unknown>[] = [];

// ---- Products ----
products.forEach((p, idx) => {
  docs.push({
    _id: `product.${p.id}`,
    _type: 'product',
    name: p.name,
    slug: { _type: 'slug', current: p.id },
    series: p.series,
    tagline: p.tagline,
    order: idx + 1,
    singlePrice: p.pricing.small.price,
    premiumPrice: p.pricing.large.price,
    capsuleCount: p.pricing.small.count,
    bottleSizes: p.bottleSizes && p.bottleSizes.length ? p.bottleSizes : [p.pricing.small.count],
    description: p.description,
    whyYouNeedIt: p.whyYouNeedIt,
    longDescription: p.longDescription,
    benefits: p.benefits,
    suitableFor: p.suitableFor,
    ingredients: p.ingredients.map((ing, i) => ({
      _key: key('ing', i),
      _type: 'object',
      name: ing.name,
      latin: ing.latin,
      description: ing.description,
    })),
    directions: p.dosage?.standard ?? '',
  });
});

// ---- Blog: convert custom blocks -> portable text ----
function toPortableText(content: BlogBlock[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  let n = 0;
  for (const block of content) {
    if (block.type === 'h2') {
      out.push({
        _key: key('b', n++),
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{ _key: key('s', n), _type: 'span', text: block.text, marks: [] }],
      });
    } else if (block.type === 'p') {
      out.push({
        _key: key('b', n++),
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _key: key('s', n), _type: 'span', text: block.text, marks: [] }],
      });
    } else if (block.type === 'ul') {
      block.items.forEach((item) => {
        out.push({
          _key: key('b', n++),
          _type: 'block',
          style: 'normal',
          level: 1,
          listItem: 'bullet',
          markDefs: [],
          children: [{ _key: key('s', n), _type: 'span', text: item, marks: [] }],
        });
      });
    }
  }
  return out;
}

blogPosts.forEach((post) => {
  docs.push({
    _id: `blogPost.${post.slug}`,
    _type: 'blogPost',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    category: post.category,
    excerpt: post.excerpt,
    heroEyebrow: post.heroEyebrow,
    readMinutes: post.readMinutes,
    date: post.date,
    body: toPortableText(post.content),
  });
});

const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';
const outPath = join(__dirname, 'sanity-import.ndjson');
writeFileSync(outPath, ndjson, 'utf8');
console.log(`Wrote ${docs.length} docs (${products.length} products + ${blogPosts.length} blogs) -> ${outPath}`);
