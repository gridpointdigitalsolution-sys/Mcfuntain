// One-off migration: align products.ts with the official McFuntain pricing + summaries.
// Single = 1 bottle; Premium (large) = Pack of 3 (3 bottles). bottleSizes = capsule options.
import fs from 'node:fs';

const FILE = 'src/data/products.ts';
let s = fs.readFileSync(FILE, 'utf8');

// id -> { single, premium, sizes:[caps...], tag, desc }
const D = {
  'mito-energy': { single: 129, premium: 302.99, sizes: [120], tag: 'Cellular energy for everyday vitality.', desc: "Divine Mitochondria Energy is a premium botanical wellness supplement formulated to support natural cellular vitality, energy resilience, metabolic balance, and healthy aging. Inspired by traditional African herbal wisdom alongside globally respected botanical wellness traditions, this formulation was developed for adults seeking sustainable wellness support in today's demanding lifestyle environment." },
  'cell-renewal': { single: 130, premium: 320.99, sizes: [120], tag: 'Cellular renewal for healthy aging.', desc: 'Divine Stem Cells is a premium botanical wellness supplement formulated to support neurological wellness, nerve vitality, cognitive resilience, physical coordination, and healthy cellular renewal. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for individuals seeking advanced support for long-term neurological and whole-body wellness, with a focus on cellular renewal and stem-cell-level vitality.' },
  'longevity-30': { single: 110, premium: 291.99, sizes: [120], tag: 'Healthy-aging foundation for the active 30s.', desc: 'Divine Longevity 30+ is a premium herbal vitality and cellular renewal supplement designed for adults from age 30 upward who want early anti-aging support, energy, clarity, metabolism balance, and immune strength. It draws from African herbal wisdom, adaptogenic botanicals, antioxidant nutrition, and mitochondrial support principles.' },
  'longevity-50': { single: 110, premium: 291.99, sizes: [120], tag: 'Mature vitality for the active 50s and beyond.', desc: 'Divine Longevity 50+ is an advanced herbal longevity and strength-support formula created for mature adults who need deeper support for aging, mobility, circulation, immunity, brain health, and recovery. It combines traditional African herbal wisdom with cellular-supportive and antioxidant-rich botanicals to promote graceful and active aging.' },
  'cogniboost-restore': { single: 99, premium: 160.99, sizes: [60, 120], tag: 'Sharper focus, memory, and cognitive endurance.', desc: 'Divine CogniBoost Restore is a premium botanical wellness supplement formulated to support mental clarity, focus, memory performance, cognitive resilience, and daily neurological wellness. Inspired by traditional African herbal wisdom together with globally respected botanical traditions, this formulation was developed for individuals seeking balanced cognitive support for modern mental demands.' },
  'nerve-renewal': { single: 72, premium: 210.99, sizes: [120], tag: 'Nerve calm, mobility, and circulation balance.', desc: 'Divine Nerve Renewal is a premium botanical wellness supplement formulated to support nerve wellness, circulation balance, physical comfort, mobility support, and long-term vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for neurological wellness and active lifestyle performance.' },
  'neuro-restore': { single: 119, premium: 305.99, sizes: [120], tag: 'Neural reactivation for clarity and mood.', desc: 'Divine Neuro Restore is a premium nerve-support supplement designed to help nourish, awaken, and restore weakened nerve function. It is created for people experiencing nerve weakness, tingling, numbness, burning sensations, poor nerve signaling, diabetic nerve discomfort, and general nervous system fatigue.' },
  'glucose-balance': { single: 99, premium: 260, sizes: [120], tag: 'Healthy blood-sugar and metabolic balance.', desc: 'Divine Glucose Balance is a premium botanical wellness supplement formulated to support healthy blood sugar balance, metabolic wellness, pancreatic function, circulation, and long-term vitality. It draws from African herbal wisdom and global botanical traditions known for supporting glucose metabolism and whole-body restoration.' },
  'thyroid-balance': { single: 76, premium: 199, sizes: [120], tag: 'Thyroid and metabolic energy support.', desc: 'Divine Thyroid Balance is a premium botanical wellness supplement formulated to support metabolic balance, energy wellness, endocrine harmony, vitality maintenance, and healthy lifestyle performance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for balanced daily wellness and long-term vitality.' },
  'belly-fat-balance': { single: 60.99, premium: 160.99, sizes: [120], tag: 'Belly-fat and metabolic balance.', desc: 'Divine Belly Fat Balance is a premium metabolic wellness and abdominal fat management formula designed to support healthy weight balance, digestive cleansing, metabolic activation, and internal detoxification. The formula combines thermogenic herbs, digestive-support botanicals, mineral-rich plants, and metabolism-enhancing nutrients traditionally used in African and global herbal medicine systems.' },
  'joint-bone': { single: 90, premium: 250, sizes: [120], tag: 'Joint, bone, and active mobility support.', desc: 'Divine Joint & Bone is a premium botanical wellness supplement formulated to support joint comfort, mobility wellness, structural resilience, physical recovery, and healthy aging support. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking long-term support for active movement and physical vitality.' },
  'lumbar-restore': { single: 120, premium: 199, sizes: [120], tag: 'Lumbar and spinal wellness.', desc: 'Divine Lumbar Restore is a premium botanical wellness supplement formulated to support spinal wellness, mobility balance, structural resilience, physical comfort, and long-term vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active movement and healthy lifestyle performance.' },
  'vision-support': { single: 49, premium: 160, sizes: [120], tag: 'Eye comfort and visual wellness.', desc: 'Divine Vision Support is a premium botanical wellness supplement formulated to support eye wellness, circulation balance, antioxidant protection, visual vitality, and healthy aging support. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured nutritional support for long-term visual wellness and daily lifestyle performance.' },
  'kidney-restore': { single: 69, premium: 160, sizes: [120], tag: 'Kidney, urinary, and cleansing support.', desc: 'Divine Kidney Restore is a premium herbal kidney and urinary wellness supplement designed to support healthy filtration, fluid balance, urinary cleansing, and natural detoxification. It combines traditional African herbal wisdom with modern botanical detox support to help the body remove excess waste and maintain internal balance.' },
  'vitality': { single: 60, premium: 150, sizes: [120], tag: 'Daily vitality, stamina, and resilience.', desc: 'Divine Vitality is a premium botanical wellness supplement formulated to support vitality, stamina, circulation wellness, endurance, and intimate wellness balance for both men and women. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active lifestyle vitality and overall wellness maintenance.' },
  'womb-renewal': { single: 120, premium: 300, sizes: [120], tag: 'Feminine wellness and cycle balance.', desc: 'Divine Womb Renewal is a premium botanical wellness supplement formulated to support feminine wellness, vitality, circulation balance, restorative wellness, and healthy lifestyle maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for women seeking structured support for overall feminine wellness and long-term vitality.' },
  'varicose-veins-support': { single: 85, premium: 270, sizes: [120], tag: 'Leg comfort and circulation support.', desc: 'Divine Varicose Veins Support is a premium botanical wellness supplement formulated to support healthy circulation, vascular wellness, mobility comfort, antioxidant protection, and daily vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for healthy lifestyle circulation and long-term wellness balance.' },
  'fresh-breath': { single: 59, premium: 125, sizes: [120], tag: 'Fresh breath and oral wellness.', desc: 'Divine Fresh Breath is a premium herbal breath, mouth, stomach, and digestive freshness formula designed to support long-lasting internal and oral cleansing. It targets common sources of bad breath, including mouth bacteria, sluggish digestion, mucus buildup, and internal toxin load.' },
  'libido-support': { single: 80, premium: 260, sizes: [60, 120], tag: 'Vitality and intimate-wellness support.', desc: 'Divine Libido Support is a premium botanical wellness supplement formulated to support vitality, stamina, circulation wellness, endurance, and intimate wellness balance for both men and women. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active lifestyle vitality and overall wellness maintenance.' },
  'glut4-metabolic-activation': { single: 120, premium: 299.99, sizes: [60, 120], tag: 'GLUT4 metabolic activation.', desc: 'Divine GLUT4 Metabolic Activation is a premium metabolic restoration capsule designed to support healthy glucose transport, insulin sensitivity, pancreatic wellness, cellular energy production, and metabolic balance.' },
  'female-fertility': { single: 78, premium: 160, sizes: [120], tag: '90-Day Precision Botanical Program for women.', desc: "Divine Female Fertility Renewal System is a comprehensive botanical program that draws on African herbal, Ayurvedic, and modern wellness traditions to support women's reproductive wellness, hormonal balance, vitality, and overall feminine health." },
  'male-fertility': { single: 78, premium: 160, sizes: [120], tag: '90-Day Precision Botanical Program for men.', desc: 'Divine Male Fertility Renewal System is a professional botanical wellness formulation developed to support male reproductive wellness, vitality, stamina, and overall masculine health. This advanced wellness program combines traditional botanical wisdom with modern nutritional support principles to help men maintain healthy lifestyle habits connected to reproductive vitality and long-term wellness.' },
  'blood-booster-pro': { single: 99, premium: 260, sizes: [60, 120], tag: 'Blood nourishment, circulation, and energy.', desc: 'Divine Blood Booster Pro is a premium botanical blood nourishment and vitality support supplement designed to support healthy blood formation, circulation, oxygen transport, energy restoration, and whole-body vitality. This formulation draws from African herbal medicine, nutrient-dense botanical traditions, and restorative wellness practices traditionally used to strengthen the blood, support recovery, and improve physical resilience.' },
  'respiratory-shield': { single: 69, premium: 200, sizes: [60], tag: 'Clear breathing, calmer airways, lung resilience.', desc: 'Divine Respiratory Shield is a premium botanical respiratory wellness formula that draws on traditional African and globally respected herbal traditions to support healthy breathing, lung wellness, airway comfort, mucus balance, and respiratory vitality.' },
  'gerd-respiratory': { single: 69, premium: 200, sizes: [60], tag: 'Calm the gut, soothe the throat, restore breathing.', desc: 'Divine GERD Respiratory System is a premium gastrointestinal and respiratory wellness formula that combines soothing mucilage-rich herbs and respiratory-supportive botanicals to support healthy acid balance, throat comfort, digestive calmness, airway wellness, and breathing comfort associated with reflux-related irritation.' },
};

let matched = 0;
const missed = [];
for (const [id, v] of Object.entries(D)) {
  const ix = s.indexOf(`id: "${id}"`);
  if (ix < 0) { missed.push(id); continue; }
  let end = s.indexOf('id: "', ix + 8);
  if (end < 0) end = s.indexOf('\n];', ix);
  let region = s.slice(ix, end);
  const primary = v.sizes[v.sizes.length - 1];

  const before = region;
  region = region.replace(
    /pricing:\s*\{\s*small:\s*\{[^}]*\},\s*large:\s*\{[^}]*\},\s*\},/,
    `pricing: {\n      small: { count: ${primary}, price: ${v.single} },\n      large: { count: 3, price: ${v.premium} },\n    },\n    bottleSizes: [${v.sizes.join(', ')}],`,
  );
  region = region.replace(/tagline:\s*"[^"]*",/, `tagline: ${JSON.stringify(v.tag)},`);
  region = region.replace(/(\n\s*)description:\s*"[^"]*",/, `$1description: ${JSON.stringify(v.desc)},`);

  if (region === before) { missed.push(id + ' (no-change)'); }
  s = s.slice(0, ix) + region + s.slice(end);
  matched++;
}

// Add bottleSizes to the Product interface (optional, so a miss never breaks the build)
s = s.replace(/(\n  pricing: Pricing;)/, `$1\n  bottleSizes?: number[];`);

// Append the missing 26th product: Divine Ulcer Care (Detox). Image falls back to gerd until real art is uploaded.
const ULCER = `  {
    id: "ulcer-care",
    name: "Divine Ulcer Care",
    series: "Detox",
    seriesSlug: "detox",
    tagline: "Gastric calm, stomach-lining protection, digestive restoration.",
    description:
      "Divine Ulcer Care is a premium botanical gastric and digestive wellness formula that draws on mucilage-rich plants and traditional soothing herbs to support stomach-lining comfort, healthy acid balance, and long-term digestive restoration.",
    whyYouNeedIt:
      "If you live with stomach burning after meals, gastric irritation, frequent indigestion, or a stomach lining that feels constantly under attack, your gut needs real botanical support, not another antacid. Divine Ulcer Care combines mucilage-rich plants and traditional soothing herbs to help calm gastric irritation, protect the stomach lining, and restore healthy acid balance. It is for adults ready to address gastric discomfort at its source and rebuild long-term digestive comfort.",
    longDescription:
      "Divine Ulcer Care brings together soothing, mucilage-rich botanicals long valued for digestive comfort. Bryophyllum and Aloe vera provide calming support for irritated tissue, while Okra and Jute leaves deliver protective mucilage that coats the stomach lining. Baobab adds antioxidant nourishment and Licorice root supports a healthy acid balance, together promoting gastric calm and long-term digestive restoration.",
    benefits: [
      "Supports stomach-lining comfort",
      "Helps soothe gastric irritation",
      "Supports healthy acid balance",
      "Encourages digestive healing support",
      "Helps reduce burning sensations after meals",
    ],
    suitableFor: [
      "Adults dealing with stomach burning, gastric irritation, or ulcer-related discomfort.",
      "Individuals seeking stomach-lining and acid-balance support.",
      "People recovering from frequent indigestion or gastric flare-ups.",
      "Wellness-conscious adults building long-term digestive routines.",
    ],
    ingredients: [
      { name: "Bryophyllum", latin: "Bryophyllum pinnatum", description: "Traditional botanical supporting tissue soothing and a healthy inflammatory response in the digestive tract." },
      { name: "Okra", latin: "Abelmoschus esculentus", description: "Provides mucilage that coats and protects the stomach lining from acid irritation." },
      { name: "Jute Leaves", latin: "Corchorus olitorius", description: "Provides soothing mucilaginous support for the digestive tract." },
      { name: "Baobab", latin: "Adansonia digitata", description: "Antioxidant-rich fruit supporting nutritional wellness and digestive resilience." },
      { name: "Aloe Vera", latin: "Aloe barbadensis", description: "Soothing botanical traditionally used to calm and support the stomach lining." },
      { name: "Licorice Root", latin: "Glycyrrhiza glabra", description: "Provides glycyrrhizin supporting stomach-lining wellness and a healthy acid balance." },
    ],
    dosage: {
      standard:
        "Take 2 capsules in the morning and 2 capsules in the evening with food and water. Daily total: 4 capsules.",
      advanced:
        "Take 1 capsule 30 minutes before each main meal for targeted stomach-lining support.",
      timeline:
        "Gastric comfort may improve within 1-2 weeks. Comprehensive stomach-lining and digestive support develops over 4-6 weeks.",
    },
    pricing: {
      small: { count: 60, price: 69 },
      large: { count: 3, price: 200 },
    },
    bottleSizes: [60],
    imageFolder: "/images/products/gerd-respiratory",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Activity",
    faq: [
      {
        q: "How is this different from Divine GERD Respiratory System?",
        a: "Ulcer Care focuses on stomach-lining protection and gastric comfort. GERD Respiratory addresses the combined gut-airway connection for reflux that reaches the throat and breathing.",
      },
      {
        q: "When should I take it?",
        a: "Taking with food supports post-meal comfort. For targeted support, 1 capsule before each main meal may be used.",
      },
    ],
  },
`;
const marker = '\n];\n\n// ---------------------------------------------------------------------------\n// Series';
if (s.includes(marker)) {
  s = s.replace(marker, '\n' + ULCER + '];\n\n// ---------------------------------------------------------------------------\n// Series');
} else {
  missed.push('ULCER-INSERT-MARKER');
}

// Register Ulcer Care in the Detox series so counts/filters include it
s = s.replace(
  'productIds: ["kidney-restore", "respiratory-shield", "gerd-respiratory"],',
  'productIds: ["kidney-restore", "respiratory-shield", "gerd-respiratory", "ulcer-care"],',
);

fs.writeFileSync(FILE, s);
console.log('updated products:', matched, 'of', Object.keys(D).length);
console.log('misses:', missed.length ? missed.join(', ') : 'none');
