/* ------------------------------------------------------------------ *
 *  Content layer — reads product + blog data from Sanity, with the
 *  local src/data files as a guaranteed fallback.
 *
 *  - Server-only: uses a read token (SANITY_API_READ_TOKEN, never sent
 *    to the client). Import this only from server components / route
 *    files, never from a 'use client' module.
 *  - If the token is missing or Sanity errors, every function returns
 *    the local data, so the site never breaks.
 *  - Sanity holds the editable fields; non-editable fields (images,
 *    colors, seriesSlug, faq, dosage timeline) always come from local.
 * ------------------------------------------------------------------ */
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import {
  products as localProducts,
  getAllSeries as localGetAllSeries,
  type Product,
  type Series,
} from '@/data/products';
import { blogPosts as localBlogPosts, type BlogBlock, type BlogPost } from '@/data/blog';

const token = process.env.SANITY_API_READ_TOKEN;

const sanity = token
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, token, perspective: 'published' })
  : null;

const REVALIDATE = 60; // seconds — Studio edits appear on the live site within ~1 min

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const PRODUCT_QUERY = `*[_type == "product"]{
  "id": slug.current,
  name, series, tagline,
  singlePrice, premiumPrice, capsuleCount, bottleSizes,
  description, whyYouNeedIt, longDescription,
  benefits, suitableFor,
  "ingredients": ingredients[]{ name, latin, description },
  directions
}`;

type SanityProduct = {
  id?: string;
  name?: string;
  series?: string;
  tagline?: string;
  singlePrice?: number;
  premiumPrice?: number;
  capsuleCount?: number;
  bottleSizes?: number[];
  description?: string;
  whyYouNeedIt?: string;
  longDescription?: string;
  benefits?: string[];
  suitableFor?: string[];
  ingredients?: { name?: string; latin?: string; description?: string }[];
  directions?: string;
};

async function fetchSanityProductMap(): Promise<Record<string, SanityProduct>> {
  if (!sanity) return {};
  try {
    const docs: SanityProduct[] = await sanity.fetch(
      PRODUCT_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    const map: Record<string, SanityProduct> = {};
    for (const d of docs) if (d?.id) map[d.id] = d;
    return map;
  } catch {
    return {};
  }
}

function nonEmptyArray<T>(v: T[] | undefined | null): v is T[] {
  return Array.isArray(v) && v.length > 0;
}

/** Overlay Sanity's editable fields onto the full local product shape. */
function mergeProduct(local: Product, s: SanityProduct | undefined): Product {
  if (!s) return local;
  return {
    ...local,
    name: s.name ?? local.name,
    series: s.series ?? local.series,
    tagline: s.tagline ?? local.tagline,
    description: s.description ?? local.description,
    whyYouNeedIt: s.whyYouNeedIt ?? local.whyYouNeedIt,
    longDescription: s.longDescription ?? local.longDescription,
    benefits: nonEmptyArray(s.benefits) ? s.benefits : local.benefits,
    suitableFor: nonEmptyArray(s.suitableFor) ? s.suitableFor : local.suitableFor,
    ingredients: nonEmptyArray(s.ingredients)
      ? s.ingredients.map((i) => ({
          name: i.name ?? '',
          latin: i.latin ?? '',
          description: i.description ?? '',
        }))
      : local.ingredients,
    bottleSizes: nonEmptyArray(s.bottleSizes) ? s.bottleSizes : local.bottleSizes,
    pricing: {
      small: {
        count: typeof s.capsuleCount === 'number' ? s.capsuleCount : local.pricing.small.count,
        price: typeof s.singlePrice === 'number' ? s.singlePrice : local.pricing.small.price,
      },
      large: {
        count: local.pricing.large.count,
        price: typeof s.premiumPrice === 'number' ? s.premiumPrice : local.pricing.large.price,
      },
    },
    dosage: { ...local.dosage, standard: s.directions || local.dosage.standard },
  };
}

/** All products, in the local curated order, with Sanity edits applied. */
export async function getProducts(): Promise<Product[]> {
  const map = await fetchSanityProductMap();
  return localProducts.map((p) => mergeProduct(p, map[p.id]));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const local = localProducts.find((p) => p.id === slug);
  if (!local) return undefined;
  const map = await fetchSanityProductMap();
  return mergeProduct(local, map[slug]);
}

export async function getProductsBySeries(seriesSlug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.seriesSlug === seriesSlug);
}

/** Series list is structural (not edited in Studio) — always local. */
export async function getAllSeries(): Promise<Series[]> {
  return localGetAllSeries();
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

const BLOG_QUERY = `*[_type == "blogPost"]{
  "slug": slug.current,
  title, excerpt, category, readMinutes, date, heroEyebrow,
  body
}`;

type SanityBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: { text?: string }[];
};

type SanityBlog = {
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  readMinutes?: number;
  date?: string;
  heroEyebrow?: string;
  body?: SanityBlock[];
};

/** Convert Sanity portable text back into the site's BlogBlock shape. */
function fromPortableText(body: SanityBlock[] | undefined): BlogBlock[] {
  if (!Array.isArray(body)) return [];
  const out: BlogBlock[] = [];
  let currentList: { type: 'ul'; items: string[] } | null = null;
  for (const b of body) {
    if (b?._type !== 'block') continue;
    const text = (b.children ?? []).map((c) => c?.text ?? '').join('');
    if (b.listItem === 'bullet') {
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
        out.push(currentList);
      }
      currentList.items.push(text);
      continue;
    }
    currentList = null;
    if (b.style === 'h2') out.push({ type: 'h2', text });
    else out.push({ type: 'p', text });
  }
  return out;
}

function toBlogPost(s: SanityBlog, fallback?: BlogPost): BlogPost {
  return {
    slug: s.slug ?? fallback?.slug ?? '',
    title: s.title ?? fallback?.title ?? '',
    excerpt: s.excerpt ?? fallback?.excerpt ?? '',
    category: s.category ?? fallback?.category ?? '',
    readMinutes: typeof s.readMinutes === 'number' ? s.readMinutes : fallback?.readMinutes ?? 5,
    date: s.date ?? fallback?.date ?? '',
    heroEyebrow: s.heroEyebrow ?? fallback?.heroEyebrow ?? '',
    content: nonEmptyArray(s.body) ? fromPortableText(s.body) : fallback?.content ?? [],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!sanity) return localBlogPosts;
  try {
    const docs: SanityBlog[] = await sanity.fetch(
      BLOG_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!nonEmptyArray(docs)) return localBlogPosts;
    const bySlug: Record<string, SanityBlog> = {};
    for (const d of docs) if (d?.slug) bySlug[d.slug] = d;
    const merged = localBlogPosts.map((l) => (bySlug[l.slug] ? toBlogPost(bySlug[l.slug], l) : l));
    const localSlugs = new Set(localBlogPosts.map((p) => p.slug));
    const extra = docs
      .filter((d) => d?.slug && !localSlugs.has(d.slug))
      .map((d) => toBlogPost(d));
    return [...merged, ...extra];
  } catch {
    return localBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug);
}
