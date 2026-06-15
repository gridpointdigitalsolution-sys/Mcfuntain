/**
 * PRIVATE OWNER VAULT — /mcfuntain-private-product-vault
 *
 * Owner-only library of all 26 product PDF manuals for sending to prospects.
 * NOT linked from any public nav / footer / sitemap. noindex + robots disallow.
 * Gated by a passphrase (MCFUNTAIN_LIBRARY_KEY) → signed 30-day cookie.
 *
 * HOW TO ADD A NEW PRODUCT TO THE VAULT:
 *   1. Drop the PDF in public/pdfs/ named Divine-<Slug>-Manual.pdf
 *   2. Add one entry to src/data/manuals.ts (productId + name + slug + category + bottle)
 * It appears here automatically. Catalogue copy (tagline, ingredients, why) is
 * pulled from src/data/products.ts by matching productId.
 */

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { manuals, manualPublicPath, VAULT_CATEGORY_ORDER } from '@/data/manuals';
import { products } from '@/data/products';
import { VAULT_COOKIE, cookieValid, vaultConfigured } from '@/lib/owner-gate';
import VaultGate from './VaultGate';
import VaultLibrary from './VaultLibrary';

export const metadata: Metadata = {
  title: 'Private Product Vault',
  robots: { index: false, follow: false, nocache: true },
};

// Always evaluate the cookie at request time.
export const dynamic = 'force-dynamic';

export type VaultItem = {
  num: number;
  productId: string;
  name: string;
  slug: string;
  category: string;
  bottle: string;
  tagline: string;
  pdfPath: string;
  /** Lower-cased searchable blob: name + category + ingredients + symptoms. */
  search: string;
};

function buildItems(): VaultItem[] {
  return manuals.map((m, i) => {
    const prod = products.find((p) => p.id === m.productId);
    const tagline = prod?.tagline ?? '';
    const ingredients = (prod?.ingredients ?? []).map((ing) => ing.name).join(' ');
    const why = prod?.whyYouNeedIt ?? '';
    const desc = prod?.description ?? '';
    const search = [m.name, m.category, m.bottle, tagline, ingredients, why, desc]
      .join(' ')
      .toLowerCase();
    return {
      num: i + 1,
      productId: m.productId,
      name: m.name,
      slug: m.slug,
      category: m.category,
      bottle: m.bottle,
      tagline,
      pdfPath: manualPublicPath(m.slug),
      search,
    };
  });
}

export default async function PrivateVaultPage() {
  const jar = await cookies();
  const unlocked = cookieValid(jar.get(VAULT_COOKIE)?.value, Date.now());

  if (!unlocked) {
    const notConfigured = process.env.NODE_ENV === 'production' && !vaultConfigured();
    return <VaultGate notConfigured={notConfigured} />;
  }

  const items = buildItems();
  const categories = VAULT_CATEGORY_ORDER.filter((c) => items.some((it) => it.category === c));

  return <VaultLibrary items={items} categories={categories as string[]} />;
}
