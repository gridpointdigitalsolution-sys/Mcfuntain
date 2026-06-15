/**
 * Canonical product-manual registry.
 *
 * Maps each catalogue product id (see src/data/products.ts) to its PDF manual,
 * the public marketing slug, the category used by the private owner vault, and
 * the bottle-config label. The PDFs live at /pdfs/Divine-<Slug>-Manual.pdf
 * (served from public/pdfs).
 *
 * HOW TO ADD A NEW PRODUCT MANUAL:
 *   1. Drop the PDF in mcfuntain-website/public/pdfs/ named
 *      Divine-<Slug>-Manual.pdf
 *   2. Add one entry below: productId (matches products.ts id) + name + slug
 *      + category + bottle.
 * Both the public product page and the private vault pick it up automatically.
 */

export type Manual = {
  /** Catalogue product id — matches src/data/products.ts `id` (route slug). */
  productId: string;
  /** Exact product name (no abbreviations / rebranding). */
  name: string;
  /** Marketing slug used in the PDF filename: Divine-<slug>-Manual.pdf */
  slug: string;
  /** Vault category. */
  category: string;
  /** Bottle config label. */
  bottle: string;
};

export const manuals: Manual[] = [
  { productId: 'mito-energy',                name: 'Divine Mitochondria Energy',          slug: 'Mitochondria-Energy',        category: 'Cellular',              bottle: '120' },
  { productId: 'cell-renewal',               name: 'Divine Stem Cells',                   slug: 'Stem-Cells',                 category: 'Cellular',              bottle: '120' },
  { productId: 'longevity-30',               name: 'Divine Longevity 30+',                slug: 'Longevity-30Plus',           category: 'Cellular',              bottle: '120' },
  { productId: 'longevity-50',               name: 'Divine Longevity 50+',                slug: 'Longevity-50Plus',           category: 'Cellular',              bottle: '120' },
  { productId: 'cogniboost-restore',         name: 'Divine CogniBoost Restore',           slug: 'CogniBoost-Restore',         category: 'Neuro',                 bottle: '60 & 120' },
  { productId: 'nerve-renewal',              name: 'Divine Nerve Renewal',                slug: 'Nerve-Renewal',              category: 'Neuro',                 bottle: '120' },
  { productId: 'neuro-restore',              name: 'Divine Neuro Restore',                slug: 'Neuro-Restore',              category: 'Neuro',                 bottle: '120' },
  { productId: 'glucose-balance',            name: 'Divine Glucose Balance',              slug: 'Glucose-Balance',            category: 'Metabolic',             bottle: '120' },
  { productId: 'thyroid-balance',            name: 'Divine Thyroid Balance',              slug: 'Thyroid-Balance',            category: 'Metabolic',             bottle: '120' },
  { productId: 'belly-fat-balance',          name: 'Divine Belly Fat Balance',            slug: 'Belly-Fat-Balance',          category: 'Metabolic',             bottle: '120' },
  { productId: 'joint-bone',                 name: 'Divine Joint & Bone',                 slug: 'Joint-and-Bone',             category: 'Mobility',              bottle: '120' },
  { productId: 'lumbar-restore',             name: 'Divine Lumbar Restore',               slug: 'Lumbar-Restore',             category: 'Mobility',              bottle: '120' },
  { productId: 'vision-support',             name: 'Divine Vision Support',               slug: 'Vision-Support',             category: 'Vision',                bottle: '120' },
  { productId: 'kidney-restore',             name: 'Divine Kidney Restore',               slug: 'Kidney-Restore',             category: 'Detox',                 bottle: '120' },
  { productId: 'vitality',                   name: 'Divine Vitality',                     slug: 'Vitality',                   category: 'Wellness',              bottle: '120' },
  { productId: 'womb-renewal',               name: 'Divine Womb Renewal',                 slug: 'Womb-Renewal',               category: 'Wellness',              bottle: '120' },
  { productId: 'varicose-veins-support',     name: 'Divine Varicose Veins Support',       slug: 'Varicose-Veins-Support',     category: 'Wellness',              bottle: '120' },
  { productId: 'fresh-breath',               name: 'Divine Fresh Breath',                 slug: 'Fresh-Breath',               category: 'Wellness',              bottle: '120' },
  { productId: 'libido-support',             name: 'Divine Libido Support™',              slug: 'Libido-Support',             category: 'Vitality & Intimate',   bottle: '60 & 120' },
  { productId: 'glut4-metabolic-activation', name: 'Divine GLUT4 Metabolic Activation',   slug: 'GLUT4-Metabolic-Activation', category: 'Metabolic',             bottle: '60 & 120' },
  { productId: 'female-fertility',           name: 'Divine Female Fertility Renewal',     slug: 'Female-Fertility-Renewal',   category: 'Vitality & Intimate',   bottle: '120' },
  { productId: 'male-fertility',             name: 'Divine Male Fertility Renewal',       slug: 'Male-Fertility-Renewal',     category: 'Vitality & Intimate',   bottle: '120' },
  { productId: 'blood-booster-pro',          name: 'Divine Blood Booster Pro™',           slug: 'Blood-Booster-Pro',          category: 'Blood & Vitality',      bottle: '60 & 120' },
  { productId: 'respiratory-shield',         name: 'Divine Respiratory Shield',           slug: 'Respiratory-Shield',         category: 'Respiratory Wellness',  bottle: '60' },
  { productId: 'gerd-respiratory',           name: 'Divine GERD Respiratory System',      slug: 'GERD-Respiratory-System',    category: 'Respiratory Wellness',  bottle: '60' },
  { productId: 'ulcer-care',                 name: 'Divine Ulcer Care',                   slug: 'Ulcer-Care',                 category: 'Digestive Wellness',    bottle: '60' },
];

/** Left-side category order for the private vault. */
export const VAULT_CATEGORY_ORDER = [
  'Cellular',
  'Neuro',
  'Metabolic',
  'Mobility',
  'Vision',
  'Detox',
  'Wellness',
  'Vitality & Intimate',
  'Blood & Vitality',
  'Respiratory Wellness',
  'Digestive Wellness',
] as const;

/** PDF filename for a manual. */
export function manualFilename(slug: string): string {
  return `Divine-${slug}-Manual.pdf`;
}

/** Public static path to the raw PDF (preview / fallback). */
export function manualPublicPath(slug: string): string {
  return `/pdfs/${manualFilename(slug)}`;
}

/** Look up a manual by catalogue product id. */
export function manualByProductId(productId: string): Manual | undefined {
  return manuals.find((m) => m.productId === productId);
}

/** Look up a manual by marketing slug. */
export function manualBySlug(slug: string): Manual | undefined {
  return manuals.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}
