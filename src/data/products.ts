// =============================================================================
// McFuntain Nutraceuticals - Product Data
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Ingredient {
  name: string;
  latin: string;
  description: string;
}

export interface DosageInfo {
  standard: string;
  advanced: string;
  timeline: string;
}

export interface PricingTier {
  count: number;
  price: number;
}

export interface Pricing {
  small: PricingTier;
  large: PricingTier;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  name: string;
  series: string;
  seriesSlug: string;
  tagline: string;
  description: string;
  whyYouNeedIt: string;
  longDescription: string;
  benefits: string[];
  suitableFor: string[];
  ingredients: Ingredient[];
  dosage: DosageInfo;
  pricing: Pricing;
  bottleSizes?: number[];
  imageFolder: string;
  signatureColor: string;
  accentColor: string;
  categoryIcon: string;
  faq: FAQ[];
}

export interface Series {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  productIds: string[];
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // =========================================================================
  // 1. Divine Mitochondria Energy
  // =========================================================================
  {
    id: "mito-energy",
    name: "Divine Mitochondria Energy",
    series: "Cellular",
    seriesSlug: "cellular",
    tagline: "Cellular energy for everyday vitality.",
    description: "Divine Mitochondria Energy is a premium botanical wellness supplement formulated to support natural cellular vitality, energy resilience, metabolic balance, and healthy aging. Inspired by traditional African herbal wisdom alongside globally respected botanical wellness traditions, this formulation was developed for adults seeking sustainable wellness support in today's demanding lifestyle environment.",
    whyYouNeedIt:
      "If you spend the day pushing through fatigue, hitting an afternoon energy crash, or relying on caffeine to keep going, your cells may be signalling that they need more support. Divine Mitochondria Energy targets the cellular engines that produce your daily energy, supporting the mitochondria with nutrient-dense botanical compounds traditionally used to sustain stamina, mental clarity, and physical recovery.",
    longDescription:
      "Divine Mitochondria Energy combines five potent botanicals chosen for their ability to support mitochondrial function, the engine room of every cell. Moringa delivers broad-spectrum micronutrients while Turmeric and Ginger provide powerful antioxidant protection. Garlic supports healthy circulation, ensuring oxygen and nutrients reach tissues efficiently. Centella Asiatica rounds out the formula with adaptogenic support for mental clarity and endurance. Together these ingredients help you maintain steady energy, sharper focus, and a resilient body from morning to night.",
    benefits: [
      "Supports sustained cellular energy production",
      "Promotes mental clarity and focus",
      "Provides broad-spectrum antioxidant protection",
      "Supports healthy blood circulation",
      "Enhances physical stamina and endurance",
      "Helps combat signs of premature aging",
    ],
    suitableFor: [
      "Busy professionals and adults with demanding daily schedules.",
      "Those seeking healthy aging and cellular energy support.",
      "Individuals focused on stamina, focus, and physical resilience.",
      "Wellness-conscious adults building long-term energy routines.",
    ],
    ingredients: [
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Nutrient-dense leaf providing vitamins, minerals, and amino acids essential for cellular metabolism.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Contains curcumin, a potent antioxidant that supports healthy inflammatory response and mitochondrial integrity.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Warming root that aids digestion, supports circulation, and provides additional antioxidant activity.",
      },
      {
        name: "Garlic",
        latin: "Allium sativum",
        description:
          "Allicin-rich bulb supporting cardiovascular health and efficient oxygen delivery to cells.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Adaptogenic herb that supports cognitive function, microcirculation, and tissue repair.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced: "Take 2 capsules twice daily with meals for intensive support.",
      timeline:
        "Most users notice improved energy within 2-3 weeks. Optimal results typically observed after 60-90 days of consistent use.",
    },
    pricing: {
      small: { count: 120, price: 129 },
      large: { count: 3, price: 302.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/mito-energy",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Zap",
    faq: [
      {
        q: "How long before I feel an energy difference?",
        a: "Many users report improved energy and reduced afternoon fatigue within 2-3 weeks of daily use. Full mitochondrial support benefits develop over 60-90 days.",
      },
      {
        q: "Can I take Divine Mitochondria Energy alongside other supplements?",
        a: "Yes. This formula is designed to complement other Divine supplements. If you are on prescription medication, consult your healthcare provider first.",
      },
      {
        q: "Is this product suitable for vegetarians?",
        a: "Absolutely. All ingredients are plant-derived and the capsules are vegetarian-friendly.",
      },
      {
        q: "What makes this different from a regular multivitamin?",
        a: "Divine Mitochondria Energy specifically targets mitochondrial function rather than simply filling nutritional gaps. The botanical blend is formulated to enhance how your cells produce and use energy.",
      },
    ],
  },

  // =========================================================================
  // 2. Divine Stem Cells
  // =========================================================================
  {
    id: "cell-renewal",
    name: "Divine Stem Cells",
    series: "Cellular",
    seriesSlug: "cellular",
    tagline: "Cellular renewal for healthy aging.",
    description: "Divine Stem Cells is a premium botanical wellness supplement formulated to support neurological wellness, nerve vitality, cognitive resilience, physical coordination, and healthy cellular renewal. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for individuals seeking advanced support for long-term neurological and whole-body wellness, with a focus on cellular renewal and stem-cell-level vitality.",
    whyYouNeedIt:
      "Every body relies on cellular renewal to repair what daily life wears down. As we age, that renewal slows, and you start noticing slower recovery, duller skin, and aches that linger longer than they used to. Divine Stem Cells supports that natural renewal process with botanical compounds traditionally valued for restorative wellness and resilience.",
    longDescription:
      "Divine Stem Cells harnesses the regenerative potential of Chasmanthera and Cissus quadrangularis alongside brain-supportive Centella and Bacopa. This unique synergy targets cellular turnover and tissue integrity while nurturing cognitive pathways. Moringa provides the nutritional foundation cells need to rebuild efficiently. Whether you are recovering from physical exertion, seeking cognitive renewal, or simply want to maintain youthful cellular function, Divine Stem Cells delivers comprehensive support at the deepest biological level.",
    benefits: [
      "Promotes neuroplasticity and cognitive renewal",
      "Supports healthy cellular turnover and tissue repair",
      "Enhances mental clarity and concentration",
      "Aids healthy blood circulation to vital organs",
      "Supports joint mobility and connective tissue",
      "Accelerates post-exertion recovery",
    ],
    suitableFor: [
      "Adults focused on cellular renewal and healthy aging support.",
      "Individuals seeking recovery, repair, and restorative wellness.",
      "People with physically or mentally demanding lifestyles.",
      "Wellness-conscious adults building long-term vitality routines.",
    ],
    ingredients: [
      {
        name: "Chasmanthera",
        latin: "Chasmanthera dependens",
        description:
          "Traditional West African vine supporting connective tissue integrity and cellular regeneration.",
      },
      {
        name: "Cissus Quadrangularis",
        latin: "Cissus quadrangularis",
        description:
          "Known for bone and tissue support, rich in bioactive compounds that promote cellular repair.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Adaptogenic herb prized for supporting cognitive function, microcirculation, and skin renewal.",
      },
      {
        name: "Bacopa",
        latin: "Bacopa monnieri",
        description:
          "Nootropic botanical that supports memory, focus, and healthy neurotransmitter activity.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides a broad nutritional profile of vitamins, minerals, and amino acids that fuel cellular processes.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily with meals during intensive recovery periods.",
      timeline:
        "Tissue and cognitive benefits typically emerge within 3-4 weeks. Sustained cellular renewal develops over 90 days.",
    },
    pricing: {
      small: { count: 120, price: 130 },
      large: { count: 3, price: 320.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/cell-renewal",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "RefreshCw",
    faq: [
      {
        q: "Who is Divine Stem Cells best suited for?",
        a: "Anyone seeking deep cellular support, whether for post-workout recovery, cognitive maintenance, or age-related cellular health.",
      },
      {
        q: "Can I take this with Divine Mitochondria Energy?",
        a: "Yes, the two formulas complement each other. Mitochondria Energy fuels cellular energy while Stem Cells supports the repair and turnover cycle.",
      },
      {
        q: "Are there any known allergens?",
        a: "This product is free from common allergens including gluten, dairy, soy, and nuts. Manufactured in a facility that processes various botanical ingredients.",
      },
      {
        q: "How should I store this product?",
        a: "Store in a cool, dry place away from direct sunlight. No refrigeration required.",
      },
    ],
  },

  // =========================================================================
  // 3. Divine Longevity 30+
  // =========================================================================
  {
    id: "longevity-30",
    name: "Divine Longevity 30+",
    series: "Cellular",
    seriesSlug: "cellular",
    tagline: "Healthy-aging foundation for the active 30s.",
    description: "Divine Longevity 30+ is a premium herbal vitality and cellular renewal supplement designed for adults from age 30 upward who want early anti-aging support, energy, clarity, metabolism balance, and immune strength. It draws from African herbal wisdom, adaptogenic botanicals, antioxidant nutrition, and mitochondrial support principles.",
    whyYouNeedIt:
      "Your 30s is when small habits start writing the script for the next 40 years. Energy dips, slower recovery, stress that lingers, and skin that does not bounce back the way it used to are early signals worth addressing now. Divine Longevity 30+ is a daily foundation built to strengthen the body resilience at this pivotal decade.",
    longDescription:
      "Your thirties mark the beginning of measurable cellular change. Divine Longevity 30+ is formulated to intercept that decline early with a blend of Moringa, Maca, Turmeric, Ginger, Baobab, and Cacao. These botanicals work together to neutralize oxidative stress, sustain youthful energy, and support cognitive sharpness. Baobab provides prebiotic fiber and vitamin C for immune resilience while Cacao delivers flavanols that support cardiovascular and brain health. This is prevention-first wellness for people who refuse to slow down.",
    benefits: [
      "Sustains youthful energy levels",
      "Combats oxidative stress and free radical damage",
      "Maintains brain clarity and cognitive speed",
      "Supports healthy metabolism and weight management",
      "Strengthens immune system resilience",
      "Promotes vibrant skin and tissue health",
    ],
    suitableFor: [
      "Adults in their 30s focused on healthy aging and prevention.",
      "Busy professionals maintaining energy and daily resilience.",
      "Individuals building strong long-term wellness foundations.",
      "Wellness-conscious adults seeking vitality and balance.",
    ],
    ingredients: [
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Delivers over 90 nutrients including vitamins, minerals, and essential amino acids for whole-body maintenance.",
      },
      {
        name: "Maca",
        latin: "Lepidium meyenii",
        description:
          "Andean root supporting energy, hormonal balance, and endurance without stimulant effects.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Provides curcumin for powerful antioxidant defense and healthy inflammatory response.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Supports digestion, circulation, and provides bioactive gingerols with antioxidant properties.",
      },
      {
        name: "Baobab",
        latin: "Adansonia digitata",
        description:
          "African superfruit packed with vitamin C, fiber, and polyphenols that support immunity and gut health.",
      },
      {
        name: "Cacao",
        latin: "Theobroma cacao",
        description:
          "Rich in flavanols that support cardiovascular health, mood, and cognitive function.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with a meal.",
      advanced:
        "Take 2 capsules twice daily for accelerated longevity support.",
      timeline:
        "Energy and mood benefits often appear within 2-3 weeks. Deeper anti-aging support builds over 60-90 days of consistent use.",
    },
    pricing: {
      small: { count: 120, price: 110 },
      large: { count: 3, price: 291.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/longevity-30",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Clock",
    faq: [
      {
        q: "I'm 28 - can I start using this now?",
        a: "Yes. Prevention-first supplementation can begin in your late twenties. The formula is safe for healthy adults of any age above 18.",
      },
      {
        q: "How is this different from Longevity 50+?",
        a: "Longevity 30+ focuses on oxidative stress prevention and maintaining peak performance. Longevity 50+ addresses more advanced age-related concerns like bone density and memory preservation.",
      },
      {
        q: "Does this contain caffeine?",
        a: "Cacao provides trace amounts of theobromine, a mild stimulant. The amount is far less than a cup of coffee and is generally well tolerated.",
      },
    ],
  },

  // =========================================================================
  // 4. Divine Longevity 50+
  // =========================================================================
  {
    id: "longevity-50",
    name: "Divine Longevity 50+",
    series: "Cellular",
    seriesSlug: "cellular",
    tagline: "Mature vitality for the active 50s and beyond.",
    description: "Divine Longevity 50+ is an advanced herbal longevity and strength-support formula created for mature adults who need deeper support for aging, mobility, circulation, immunity, brain health, and recovery. It combines traditional African herbal wisdom with cellular-supportive and antioxidant-rich botanicals to promote graceful and active aging.",
    whyYouNeedIt:
      "At 50 and beyond, vitality, mobility, and clarity stop being givens and start needing protection. Divine Longevity 50+ is built specifically for mature adults who want to stay active, sharp, and resilient. With botanicals supporting joint comfort, antioxidant protection, circulation, and energy, it helps maintain the daily strength and confidence needed to keep enjoying life on your own terms.",
    longDescription:
      "After fifty the body needs more deliberate nutritional support. Divine Longevity 50+ pairs the mineral density of Moringa and Baobab with the bone-strengthening properties of Cissus quadrangularis and the neuroprotective power of Centella Asiatica. Turmeric and Ginger deliver antioxidant and anti-inflammatory activity that protects joints, cardiovascular tissue, and brain cells. This comprehensive formula is designed for those who want to remain active, mentally sharp, and independent as they move through their golden decades.",
    benefits: [
      "Targets age-related cellular decline",
      "Supports bone density and joint resilience",
      "Helps preserve memory and cognitive speed",
      "Sustains steady energy throughout the day",
      "Promotes healthy circulation to extremities",
      "Reinforces immune defense and recovery",
    ],
    suitableFor: [
      "Adults aged 50 and over focused on healthy aging support.",
      "Individuals seeking mobility, vitality, and daily resilience.",
      "People maintaining active lifestyles in their later years.",
      "Wellness-conscious adults building long-term wellness routines.",
    ],
    ingredients: [
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Dense source of calcium, iron, and antioxidants critical for aging bodies.",
      },
      {
        name: "Baobab",
        latin: "Adansonia digitata",
        description:
          "Provides vitamin C and prebiotic fiber supporting immunity and nutrient absorption.",
      },
      {
        name: "Cissus Quadrangularis",
        latin: "Cissus quadrangularis",
        description:
          "Supports bone mineral density and connective tissue repair through natural anabolic compounds.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin-rich root protecting joints and brain tissue from oxidative and inflammatory stress.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Supports digestion, nutrient absorption, and provides warming circulatory benefits.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Neuroprotective herb that supports memory consolidation and microcirculation in the brain.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily with meals for comprehensive age-related support.",
      timeline:
        "Initial benefits often noticed within 3-4 weeks. Bone and cognitive support deepens over 90-120 days.",
    },
    pricing: {
      small: { count: 120, price: 110 },
      large: { count: 3, price: 291.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/longevity-50",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Shield",
    faq: [
      {
        q: "Can I take this alongside prescription medications?",
        a: "We recommend consulting your healthcare provider before combining any supplement with prescription medications, especially blood thinners or diabetes medications.",
      },
      {
        q: "Is this formula safe for daily long-term use?",
        a: "Yes. All ingredients are food-grade botanicals suitable for ongoing daily supplementation. Many users take this formula continuously for years.",
      },
      {
        q: "Does this help with joint stiffness?",
        a: "Cissus quadrangularis and Turmeric both support joint comfort and flexibility. Many users report noticeable improvement in morning stiffness within 4-6 weeks.",
      },
    ],
  },

  // =========================================================================
  // 5. Divine CogniBoost Restore
  // =========================================================================
  {
    id: "cogniboost-restore",
    name: "Divine CogniBoost Restore",
    series: "Neuro",
    seriesSlug: "neuro",
    tagline: "Sharper focus, memory, and cognitive endurance.",
    description: "Divine CogniBoost Restore is a premium botanical wellness supplement formulated to support mental clarity, focus, memory performance, cognitive resilience, and daily neurological wellness. Inspired by traditional African herbal wisdom together with globally respected botanical traditions, this formulation was developed for individuals seeking balanced cognitive support for modern mental demands.",
    whyYouNeedIt:
      "If your work demands focus, your memory feels slower than it used to, or you finish the day mentally drained, your brain may need real nutritional support. Divine CogniBoost Restore combines botanicals traditionally used to support cognitive vitality, sharper attention, faster recall, and longer mental endurance.",
    longDescription:
      "Divine CogniBoost Restore combines the two most researched nootropic botanicals in traditional medicine - Centella Asiatica and Bacopa Monnieri - with the nutritional density of Moringa and the protective antioxidant power of Turmeric and Ginger. This formula targets multiple pathways of cognitive performance: neurotransmitter support for faster processing, antioxidant defense against brain cell oxidation, and adaptogenic compounds that help the mind perform under pressure. Whether you face demanding workdays, academic challenges, or simply want to stay mentally agile, CogniBoost Restore delivers.",
    benefits: [
      "Sharpens mental clarity and processing speed",
      "Strengthens short-term and long-term memory",
      "Provides neuroprotective antioxidant support",
      "Sustains cognitive energy without jitters",
      "Enhances daily productivity and focus",
      "Builds resilience against mental fatigue and stress",
    ],
    suitableFor: [
      "Professionals with mentally demanding schedules.",
      "Students and lifelong learners seeking sharper focus.",
      "Adults seeking memory and concentration support.",
      "Those focused on healthy aging for cognitive wellness.",
    ],
    ingredients: [
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Premier nootropic herb supporting memory, concentration, and cerebral blood flow.",
      },
      {
        name: "Bacopa",
        latin: "Bacopa monnieri",
        description:
          "Clinically studied adaptogen that enhances memory consolidation and reduces cognitive anxiety.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides iron and B-vitamins essential for neurotransmitter synthesis and oxygen delivery to the brain.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin crosses the blood-brain barrier to protect neurons from oxidative stress.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances nutrient absorption and supports healthy inflammatory response in neural tissue.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with breakfast.",
      advanced:
        "Take 2 capsules in the morning and 1 capsule in the afternoon for sustained cognitive support.",
      timeline:
        "Many users notice improved focus within 1-2 weeks. Memory and stress resilience benefits typically develop over 6-8 weeks.",
    },
    pricing: {
      small: { count: 120, price: 99 },
      large: { count: 3, price: 160.99 },
    },
    bottleSizes: [60, 120],
    imageFolder: "/images/products/cogniboost",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Brain",
    faq: [
      {
        q: "Will this interfere with my ability to sleep?",
        a: "No. Unlike synthetic stimulants, CogniBoost Restore uses adaptogens that support calm, focused energy. It does not contain caffeine or stimulants that disrupt sleep.",
      },
      {
        q: "Can students use this product?",
        a: "Yes, adults 18 and older can safely use this formula. It is popular among students and professionals seeking sustained focus.",
      },
      {
        q: "How does this compare to synthetic nootropics?",
        a: "Divine CogniBoost Restore uses whole-plant extracts that have centuries of traditional use and modern clinical research. The formula supports cognition without the dependency risks associated with synthetic stimulants.",
      },
      {
        q: "Can I take this with coffee?",
        a: "Yes. The formula does not contain caffeine so it pairs well with your normal coffee intake. Some users find they need less coffee as the nootropic benefits build.",
      },
    ],
  },

  // =========================================================================
  // 6. Divine Nerve Renewal
  // =========================================================================
  {
    id: "nerve-renewal",
    name: "Divine Nerve Renewal",
    series: "Neuro",
    seriesSlug: "neuro",
    tagline: "Nerve calm, mobility, and circulation balance.",
    description: "Divine Nerve Renewal is a premium botanical wellness supplement formulated to support nerve wellness, circulation balance, physical comfort, mobility support, and long-term vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for neurological wellness and active lifestyle performance.",
    whyYouNeedIt:
      "Tingling in your hands or feet, numbness, a buzzing under the skin, or nerves that feel weakened is your nervous system asking for support. Divine Nerve Renewal targets nerve wellness and circulation balance with botanicals traditionally used for nerve calm, mobility, and physical comfort.",
    longDescription:
      "Divine Nerve Renewal targets the peripheral and central nervous system with a precise blend of botanicals traditionally valued for nerve repair. Alstonia and Ficus contribute compounds that support myelin sheath integrity and nerve signal conduction. Centella and Bacopa provide neuroprotective and cognitive benefits while Turmeric and Ginger deliver antioxidant defense against the oxidative stress that accelerates nerve degeneration. This formula is crafted for those experiencing nerve discomfort, reduced sensation, or anyone proactively supporting their nervous system longevity.",
    benefits: [
      "Supports peripheral nerve wellness and repair",
      "Promotes healthy circulation to nerve tissue",
      "Provides neuroprotective antioxidant defense",
      "Aids mobility and comfortable movement",
      "Helps combat age-related nerve decline",
      "Builds nervous system resilience and recovery",
    ],
    suitableFor: [
      "Adults focused on nerve and circulation wellness.",
      "Individuals with active or physically demanding lifestyles.",
      "People seeking mobility and physical resilience support.",
      "Wellness-conscious adults building restorative routines.",
    ],
    ingredients: [
      {
        name: "Alstonia",
        latin: "Alstonia boonei",
        description:
          "West African bark extract traditionally used to support nerve and musculoskeletal health.",
      },
      {
        name: "Ficus",
        latin: "Ficus exasperata",
        description:
          "Leaf extract providing compounds that support nerve tissue integrity and healthy inflammatory response.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Promotes nerve growth factor activity and supports microcirculation in neural pathways.",
      },
      {
        name: "Bacopa",
        latin: "Bacopa monnieri",
        description:
          "Nootropic herb that supports neurotransmitter balance and protects against neuronal oxidative stress.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin supports healthy inflammatory response in nerve tissue and crosses the blood-brain barrier.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances bioavailability of other ingredients and supports nerve tissue circulation.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily for intensive nerve support during recovery.",
      timeline:
        "Nerve tissue responds gradually. Initial comfort improvements may appear within 4-6 weeks with continued progress over 90-120 days.",
    },
    pricing: {
      small: { count: 120, price: 72 },
      large: { count: 3, price: 210.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/nerve-renewal",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Activity",
    faq: [
      {
        q: "Is this suitable for diabetic neuropathy?",
        a: "This formula supports general nerve wellness with botanicals traditionally used for nerve comfort. Always consult your healthcare provider for condition-specific guidance.",
      },
      {
        q: "How is this different from Divine Neuro Restore?",
        a: "Nerve Renewal focuses on peripheral nerve health and tissue repair. Neuro Restore targets nerve reactivation and tingling relief with a distinct botanical profile including Mucuna and Black Pepper.",
      },
      {
        q: "Can I combine this with the Mobility series products?",
        a: "Yes. Many customers combine Nerve Renewal with Joint & Bone or Lumbar Restore for comprehensive musculoskeletal and nerve support.",
      },
    ],
  },

  // =========================================================================
  // 7. Divine Neuro Restore
  // =========================================================================
  {
    id: "neuro-restore",
    name: "Divine Neuro Restore",
    series: "Neuro",
    seriesSlug: "neuro",
    tagline: "Neural reactivation for clarity and mood.",
    description: "Divine Neuro Restore is a premium nerve-support supplement designed to help nourish, awaken, and restore weakened nerve function. It is created for people experiencing nerve weakness, tingling, numbness, burning sensations, poor nerve signaling, diabetic nerve discomfort, and general nervous system fatigue.",
    whyYouNeedIt:
      "Brain fog, mood dips, fatigue that will not lift, slower coordination. Your nervous system carries more daily stress than almost any other system in your body. Divine Neuro Restore is built to support nerve and neurological reactivation with botanicals traditionally valued for clarity, mood balance, and cognitive endurance.",
    longDescription:
      "Divine Neuro Restore takes a direct approach to nerve reactivation using Mucuna pruriens, a natural source of L-DOPA that supports dopamine pathways critical for nerve signaling. Centella Asiatica enhances nerve growth factor while Ginger and Turmeric provide anti-inflammatory and circulatory support to nerve tissue. Black Pepper extract dramatically increases the bioavailability of curcumin and other active compounds. This formula is ideal for those experiencing tingling, numbness, or impaired muscle-nerve coordination who want to awaken dormant nerve pathways naturally.",
    benefits: [
      "Supports nerve reactivation and signal transmission",
      "Helps relieve tingling and numbness sensations",
      "Promotes healthy circulation to nerve endings",
      "Nourishes nerve tissue with essential nutrients",
      "Enhances muscle-nerve coordination",
      "Calms and stabilizes the nervous system",
    ],
    suitableFor: [
      "Adults focused on neurological and nerve wellness support.",
      "Individuals seeking mental clarity and mood balance.",
      "People rebuilding daily resilience and coordination.",
      "Wellness-conscious adults building restorative routines.",
    ],
    ingredients: [
      {
        name: "Mucuna",
        latin: "Mucuna pruriens",
        description:
          "Natural source of L-DOPA supporting dopamine synthesis and healthy nerve signal transmission.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Promotes nerve growth factor production and supports neural pathway regeneration.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Warming circulatory support that helps deliver nutrients to peripheral nerve tissue.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Anti-inflammatory curcumin protecting nerve cells from oxidative damage.",
      },
      {
        name: "Black Pepper",
        latin: "Piper nigrum",
        description:
          "Contains piperine which increases curcumin bioavailability by up to 2000% and enhances overall formula absorption.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily for accelerated nerve reactivation support.",
      timeline:
        "Tingling relief may begin within 2-4 weeks. Significant nerve function improvements typically develop over 8-12 weeks.",
    },
    pricing: {
      small: { count: 120, price: 119 },
      large: { count: 3, price: 305.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/neuro-restore",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Sparkles",
    faq: [
      {
        q: "What kind of tingling does this help with?",
        a: "This formula supports general nerve health for tingling and numbness in hands, feet, and extremities. Consult your healthcare provider for diagnosis-specific guidance.",
      },
      {
        q: "Does Mucuna pruriens have side effects?",
        a: "At the dosages in this formula, Mucuna is well tolerated by most adults. Those taking MAO inhibitors or Parkinson's medication should consult their doctor before use.",
      },
      {
        q: "Why is Black Pepper included?",
        a: "Piperine from Black Pepper dramatically increases the absorption of curcumin and other active compounds, making the entire formula more effective.",
      },
    ],
  },

  // =========================================================================
  // 8. Divine Glucose Balance
  // =========================================================================
  {
    id: "glucose-balance",
    name: "Divine Glucose Balance",
    series: "Metabolic",
    seriesSlug: "metabolic",
    tagline: "Healthy blood-sugar and metabolic balance.",
    description: "Divine Glucose Balance is a premium botanical wellness supplement formulated to support healthy blood sugar balance, metabolic wellness, pancreatic function, circulation, and long-term vitality. It draws from African herbal wisdom and global botanical traditions known for supporting glucose metabolism and whole-body restoration.",
    whyYouNeedIt:
      "If your blood-sugar swings leave you crashing after meals, craving sugar in the afternoon, or worrying about prediabetic risk, you need real support. Divine Glucose Balance combines botanicals traditionally valued for healthy glucose metabolism, pancreatic wellness, and steady daily energy.",
    longDescription:
      "Divine Glucose Balance brings together potent botanicals with established blood sugar supportive properties. Bitter Gourd and Momordica are rich in charantin and polypeptide-p, compounds that mimic insulin activity and support glucose uptake. Phyllanthus niruri supports liver and pancreatic health while Moringa provides chromium and other trace minerals essential for glucose metabolism. Turmeric and Ginger round out the formula with antioxidant and circulatory support. This comprehensive approach targets multiple pathways involved in blood sugar regulation for balanced, sustained metabolic health.",
    benefits: [
      "Supports healthy blood sugar levels already in normal range",
      "Promotes pancreatic health and function",
      "Aids healthy insulin sensitivity and response",
      "Supports circulation to glucose-sensitive tissues",
      "Provides metabolic antioxidant protection",
      "Sustains balanced energy without sugar crashes",
    ],
    suitableFor: [
      "Adults focused on healthy blood sugar maintenance.",
      "Individuals seeking pancreatic and metabolic support.",
      "People managing diet, weight, and lifestyle balance.",
      "Wellness-conscious adults seeking long-term metabolic wellness.",
    ],
    ingredients: [
      {
        name: "Bitter Gourd",
        latin: "Momordica charantia",
        description:
          "Contains charantin and polypeptide-p that support natural insulin activity and glucose metabolism.",
      },
      {
        name: "Phyllanthus",
        latin: "Phyllanthus niruri",
        description:
          "Supports liver and pancreatic health, aiding the body's natural blood sugar regulation mechanisms.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides chromium and isothiocyanates that support glucose metabolism and nutrient absorption.",
      },
      {
        name: "Momordica",
        latin: "Momordica balsamina",
        description:
          "African bitter melon species with compounds supporting glucose uptake and metabolic balance.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Protects pancreatic beta cells from oxidative damage and supports healthy inflammatory response.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances circulation and nutrient delivery while supporting digestive efficiency.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily, once with breakfast and once with dinner.",
      timeline:
        "Blood sugar support benefits may be noticeable within 2-4 weeks. Consistent use over 60-90 days provides the most comprehensive metabolic support.",
    },
    pricing: {
      small: { count: 120, price: 99 },
      large: { count: 3, price: 260 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/glucose-balance",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Gauge",
    faq: [
      {
        q: "Can I take this with diabetes medication?",
        a: "If you are on blood sugar medication, consult your healthcare provider before adding this supplement, as the botanicals may enhance the effects of your medication.",
      },
      {
        q: "Should I take this with or without food?",
        a: "Take with meals for optimal absorption and to support post-meal glucose metabolism.",
      },
      {
        q: "Is this a replacement for diabetes medication?",
        a: "No. This is a dietary supplement designed to support healthy blood sugar levels. It is not intended to replace prescribed medication. Always work with your healthcare provider.",
      },
      {
        q: "How does Bitter Gourd help with blood sugar?",
        a: "Bitter Gourd contains charantin and polypeptide-p, natural compounds that have been shown to support glucose uptake in cells, functioning similarly to insulin in laboratory studies.",
      },
    ],
  },

  // =========================================================================
  // 9. Divine Thyroid Balance
  // =========================================================================
  {
    id: "thyroid-balance",
    name: "Divine Thyroid Balance",
    series: "Metabolic",
    seriesSlug: "metabolic",
    tagline: "Thyroid and metabolic energy support.",
    description: "Divine Thyroid Balance is a premium botanical wellness supplement formulated to support metabolic balance, energy wellness, endocrine harmony, vitality maintenance, and healthy lifestyle performance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for balanced daily wellness and long-term vitality.",
    whyYouNeedIt:
      "Fatigue you cannot shake, sluggish metabolism, mood swings, dry skin and hair. These are often signals of a thyroid asking for support. Divine Thyroid Balance combines botanicals traditionally valued for endocrine balance, metabolic energy, and daily vitality.",
    longDescription:
      "Divine Thyroid Balance addresses metabolic wellness at its endocrine root. Ashwagandha is an adaptogen clinically studied for its ability to support healthy thyroid hormone levels while Moringa provides iodine and selenium, two minerals essential for thyroid function. Neem and Hibiscus contribute detoxifying and antioxidant properties, protecting the thyroid gland from oxidative damage. Turmeric and Ginger maintain healthy inflammatory response throughout the endocrine system. Baobab rounds out the formula with vitamin C and trace minerals that support overall hormonal balance and immune resilience.",
    benefits: [
      "Supports healthy metabolic rate and thyroid function",
      "Promotes sustained and balanced energy",
      "Aids endocrine system harmony and hormonal balance",
      "Provides essential thyroid-supportive nutrition",
      "Helps combat metabolic signs of aging",
      "Builds adaptive resilience to metabolic stress",
    ],
    suitableFor: [
      "Adults focused on metabolic and endocrine wellness balance.",
      "Individuals seeking balanced energy and vitality support.",
      "People maintaining active and demanding lifestyles.",
      "Wellness-conscious adults building long-term vitality routines.",
    ],
    ingredients: [
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides iodine, selenium, and zinc essential for thyroid hormone synthesis.",
      },
      {
        name: "Ashwagandha",
        latin: "Withania somnifera",
        description:
          "Adaptogenic root clinically studied for supporting healthy T3 and T4 thyroid hormone levels.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Protects thyroid tissue from oxidative stress and supports healthy inflammatory response.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances circulation and nutrient delivery to the thyroid gland.",
      },
      {
        name: "Neem",
        latin: "Azadirachta indica",
        description:
          "Provides detoxifying and immunomodulatory support for the endocrine system.",
      },
      {
        name: "Hibiscus",
        latin: "Hibiscus sabdariffa",
        description:
          "Rich in polyphenols and vitamin C supporting thyroid antioxidant defense.",
      },
      {
        name: "Baobab",
        latin: "Adansonia digitata",
        description:
          "Delivers vitamin C, calcium, and trace minerals that support overall endocrine wellness.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with breakfast.",
      advanced:
        "Take 2 capsules in the morning and 1 in the evening for comprehensive thyroid support.",
      timeline:
        "Metabolic and energy benefits typically emerge within 3-4 weeks. Thyroid hormone optimization develops over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 76 },
      large: { count: 3, price: 199 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/thyroid-balance",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Scale",
    faq: [
      {
        q: "I have been diagnosed with hypothyroidism. Is this safe for me?",
        a: "Consult your endocrinologist before use, especially if you are taking levothyroxine or similar thyroid medication. Ashwagandha may influence thyroid hormone levels.",
      },
      {
        q: "Can this help with weight gain related to thyroid issues?",
        a: "This formula supports healthy metabolic rate by nourishing thyroid function. Many users report improved energy and metabolism, which can contribute to healthy weight management over time.",
      },
      {
        q: "Does this contain iodine?",
        a: "Yes. Moringa naturally contains iodine along with selenium and zinc, all of which are essential cofactors for thyroid hormone production.",
      },
    ],
  },

  // =========================================================================
  // 10. Divine Belly Fat Balance
  // =========================================================================
  {
    id: "belly-fat-balance",
    name: "Divine Belly Fat Balance",
    series: "Metabolic",
    seriesSlug: "metabolic",
    tagline: "Belly-fat and metabolic balance.",
    description: "Divine Belly Fat Balance is a premium metabolic wellness and abdominal fat management formula designed to support healthy weight balance, digestive cleansing, metabolic activation, and internal detoxification. The formula combines thermogenic herbs, digestive-support botanicals, mineral-rich plants, and metabolism-enhancing nutrients traditionally used in African and global herbal medicine systems.",
    whyYouNeedIt:
      "Stubborn belly fat that will not shift with diet alone is usually a metabolic problem, not a willpower problem. Divine Belly Fat Balance targets the digestive and metabolic side of weight balance with botanicals traditionally used for healthy digestion, water balance, and waistline support.",
    longDescription:
      "Divine Belly Fat Balance takes a multi-pathway approach to abdominal wellness. Chayote and Celery Seed support the body's natural fluid balance, reducing water-weight bloating. Pineapple Crown extract provides bromelain, an enzyme that enhances protein digestion and reduces abdominal discomfort. Lemon Peel and Apple Peel deliver pectin and citrus bioflavonoids that support liver detoxification and fat metabolism. This formula works best as part of a balanced lifestyle, helping you flatten, cleanse, and restore your digestive core naturally.",
    benefits: [
      "Targets stubborn belly fat through metabolic support",
      "Reduces abdominal bloating and water retention",
      "Boosts resting metabolic rate",
      "Enhances digestive comfort and efficiency",
      "Supports liver detoxification pathways",
      "Helps manage appetite and cravings",
    ],
    suitableFor: [
      "Adults focused on healthy weight and waistline balance.",
      "Individuals supporting metabolism and healthy digestion.",
      "People building active, balanced lifestyle routines.",
      "Wellness-conscious adults seeking long-term metabolic wellness.",
    ],
    ingredients: [
      {
        name: "Chayote",
        latin: "Sechium edule",
        description:
          "Low-calorie gourd rich in fiber and potassium that supports fluid balance and metabolic health.",
      },
      {
        name: "Pineapple Crown",
        latin: "Ananas comosus",
        description:
          "Contains bromelain enzymes that support protein digestion and reduce abdominal discomfort.",
      },
      {
        name: "Celery Seed",
        latin: "Apium graveolens",
        description:
          "Natural diuretic supporting fluid balance and providing apigenin for antioxidant protection.",
      },
      {
        name: "Lemon Peel",
        latin: "Citrus limon",
        description:
          "Rich in D-limonene and citrus bioflavonoids that support liver detoxification and fat metabolism.",
      },
      {
        name: "Apple Peel",
        latin: "Malus domestica",
        description:
          "Provides pectin fiber and ursolic acid that support fat metabolism and healthy gut function.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily before meals.",
      advanced:
        "Take 2 capsules before breakfast and 2 capsules before lunch for accelerated support.",
      timeline:
        "Bloating relief often occurs within the first week. Visible changes in abdominal composition typically develop over 4-8 weeks with consistent use and a balanced diet.",
    },
    pricing: {
      small: { count: 120, price: 60.99 },
      large: { count: 3, price: 160.99 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/belly-fat-balance",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Flame",
    faq: [
      {
        q: "Will this work without exercise?",
        a: "The formula supports metabolic processes and reduces bloating on its own, but the best results come when combined with regular physical activity and a balanced diet.",
      },
      {
        q: "Is this a laxative?",
        a: "No. Belly Fat Balance supports healthy digestion and fluid balance without laxative effects. It works through metabolic support and natural enzyme activity.",
      },
      {
        q: "How quickly will I see results?",
        a: "Bloating reduction can occur within the first week. Visible changes in belly composition typically require 4-8 weeks of consistent use alongside healthy habits.",
      },
    ],
  },

  // =========================================================================
  // 11. Divine Joint & Bone
  // =========================================================================
  {
    id: "joint-bone",
    name: "Divine Joint & Bone",
    series: "Mobility",
    seriesSlug: "mobility",
    tagline: "Joint, bone, and active mobility support.",
    description: "Divine Joint & Bone is a premium botanical wellness supplement formulated to support joint comfort, mobility wellness, structural resilience, physical recovery, and healthy aging support. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking long-term support for active movement and physical vitality.",
    whyYouNeedIt:
      "Stiff mornings, achy knees, joints that creak after sitting too long. Joint wellness is the difference between an active life and a limited one. Divine Joint and Bone supports flexibility, structural resilience, and the comfort needed for active aging with botanicals traditionally valued for mobility wellness.",
    longDescription:
      "Divine Joint & Bone combines two species of Cissus known for their remarkable bone and cartilage supportive properties with Chasmanthera and Alstonia, traditional botanicals valued for musculoskeletal health. Turmeric and Ginger provide anti-inflammatory and antioxidant support to protect joint tissue from wear-related damage. This formula targets multiple aspects of musculoskeletal wellness: cartilage integrity, bone mineral density, synovial fluid health, and comfortable range of motion. Whether you are an active athlete or managing age-related joint changes, Joint & Bone helps you move with confidence.",
    benefits: [
      "Promotes joint comfort and pain-free movement",
      "Supports flexibility and range of motion",
      "Provides antioxidant defense for joint tissue",
      "Aids healthy circulation to bones and joints",
      "Helps protect against age-related joint wear",
      "Supports post-activity recovery and repair",
    ],
    suitableFor: [
      "Adults focused on joint, bone, and mobility wellness.",
      "Individuals with physically demanding lifestyles.",
      "People seeking flexibility and structural resilience.",
      "Wellness-conscious adults building active-aging routines.",
    ],
    ingredients: [
      {
        name: "Cissus Quadrangularis",
        latin: "Cissus quadrangularis",
        description:
          "Clinically studied for bone healing acceleration and cartilage-protective properties.",
      },
      {
        name: "Cissus Populnea",
        latin: "Cissus populnea",
        description:
          "West African species supporting connective tissue strength and joint lubrication.",
      },
      {
        name: "Chasmanthera",
        latin: "Chasmanthera dependens",
        description:
          "Traditional remedy for musculoskeletal wellness, supporting tissue repair and comfort.",
      },
      {
        name: "Alstonia",
        latin: "Alstonia boonei",
        description:
          "Bark extract with compounds supporting healthy inflammatory response in joint tissue.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin protects cartilage from oxidative degradation and supports comfortable joint function.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Warming circulatory support that enhances nutrient delivery to joint tissue and aids recovery.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily during periods of increased physical activity or recovery.",
      timeline:
        "Joint comfort improvements often begin within 2-3 weeks. Structural benefits to bone and cartilage develop over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 90 },
      large: { count: 3, price: 250 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/joint-bone",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Bone",
    faq: [
      {
        q: "Is this suitable for athletes?",
        a: "Yes. Many athletes use Joint & Bone for both preventive support and post-training recovery. The formula supports cartilage protection during high-impact activity.",
      },
      {
        q: "Can I take this with glucosamine supplements?",
        a: "Yes. Joint & Bone works through different pathways than glucosamine and the two can be safely combined for comprehensive joint support.",
      },
      {
        q: "How is Cissus different from traditional joint supplements?",
        a: "Cissus quadrangularis has been clinically studied for its unique ability to accelerate bone healing and support cartilage integrity through natural anabolic compounds, offering benefits beyond typical joint supplements.",
      },
    ],
  },

  // =========================================================================
  // 12. Divine Lumbar Restore
  // =========================================================================
  {
    id: "lumbar-restore",
    name: "Divine Lumbar Restore",
    series: "Mobility",
    seriesSlug: "mobility",
    tagline: "Lumbar and spinal wellness.",
    description: "Divine Lumbar Restore is a premium botanical wellness supplement formulated to support spinal wellness, mobility balance, structural resilience, physical comfort, and long-term vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active movement and healthy lifestyle performance.",
    whyYouNeedIt:
      "Lower-back pain from sitting too long, lifting wrong, or just years of wear is one of the most common reasons adults lose mobility and quality of life. Divine Lumbar Restore is built for spinal and lower-back wellness with botanicals traditionally used to support structural resilience, posture, and recovery.",
    longDescription:
      "Divine Lumbar Restore specifically addresses the musculoskeletal structures of the lower back and spine. Two species of Cissus provide bone and cartilage support critical for vertebral disc health. Chasmanthera and Alstonia target the connective tissues and muscles surrounding the spine while Ficus exasperata contributes anti-inflammatory compounds. Turmeric protects spinal tissue from oxidative stress that accelerates degeneration. This focused formula is designed for anyone dealing with lower back discomfort, reduced spinal flexibility, or the cumulative effects of sedentary work and aging on the lumbar region.",
    benefits: [
      "Supports spinal wellness and disc health",
      "Promotes lumbar flexibility and comfortable movement",
      "Provides antioxidant protection for spinal tissue",
      "Aids healthy circulation to the lower back",
      "Helps combat age-related spinal wear",
      "Builds resilience in lumbar supporting structures",
    ],
    suitableFor: [
      "Adults focused on spinal and lower-back wellness.",
      "Individuals seeking mobility and structural resilience.",
      "People with physically demanding daily routines.",
      "Wellness-conscious adults building active-aging routines.",
    ],
    ingredients: [
      {
        name: "Cissus Quadrangularis",
        latin: "Cissus quadrangularis",
        description:
          "Supports bone mineral density and intervertebral disc integrity.",
      },
      {
        name: "Cissus Populnea",
        latin: "Cissus populnea",
        description:
          "Supports connective tissue strength in the spinal region and promotes lubrication.",
      },
      {
        name: "Chasmanthera",
        latin: "Chasmanthera dependens",
        description:
          "Targets musculoskeletal tissue repair and reduces discomfort in spinal structures.",
      },
      {
        name: "Alstonia",
        latin: "Alstonia boonei",
        description:
          "Bark extract supporting healthy inflammatory response in lumbar tissue.",
      },
      {
        name: "Ficus",
        latin: "Ficus exasperata",
        description:
          "Provides compounds that support tissue healing and reduce inflammation in the spinal region.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin provides broad-spectrum protection against oxidative stress in spinal and disc tissue.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily during periods of lower back discomfort or intensive recovery.",
      timeline:
        "Initial comfort improvements may appear within 3-4 weeks. Structural spinal support develops over 90 days of consistent use.",
    },
    pricing: {
      small: { count: 120, price: 120 },
      large: { count: 3, price: 199 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/lumbar-restore",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Vertebrae",
    faq: [
      {
        q: "Can I take this if I have a herniated disc?",
        a: "This formula supports general spinal wellness. If you have a diagnosed disc condition, consult your doctor or orthopedic specialist before starting any supplement.",
      },
      {
        q: "Does this help with sciatica symptoms?",
        a: "Lumbar Restore supports spinal tissue health and healthy inflammatory response in the lower back, which may help with general lower back discomfort. For sciatica-specific guidance, consult your healthcare provider.",
      },
      {
        q: "Should I combine this with Joint & Bone?",
        a: "Yes. Many customers use both together for comprehensive musculoskeletal support. Joint & Bone provides broader joint coverage while Lumbar Restore focuses specifically on the spine.",
      },
    ],
  },

  // =========================================================================
  // 13. Divine Vision Support
  // =========================================================================
  {
    id: "vision-support",
    name: "Divine Vision Support",
    series: "Vision",
    seriesSlug: "vision",
    tagline: "Eye comfort and visual wellness.",
    description: "Divine Vision Support is a premium botanical wellness supplement formulated to support eye wellness, circulation balance, antioxidant protection, visual vitality, and healthy aging support. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured nutritional support for long-term visual wellness and daily lifestyle performance.",
    whyYouNeedIt:
      "Hours of screens, blue light, dry eyes, blurry focus shifts. Your eyes work harder than ever and rarely get nutritional support. Divine Vision Support combines botanicals traditionally valued for eye comfort, antioxidant protection, and visual clarity.",
    longDescription:
      "Divine Vision Support combines botanicals specifically chosen for their ability to protect and nourish ocular tissue. Physalis provides zeaxanthin and beta-carotene, two carotenoids that concentrate in the macula to filter harmful blue light. Moringa and Carrot deliver additional beta-carotene and vitamin A precursors essential for retinal function. Hibiscus and Centella support microcirculation in the delicate blood vessels of the eye while Turmeric and Ginger provide broad-spectrum antioxidant defense against the oxidative stress that drives age-related visual decline. This is daily eye nutrition for the screen-era generation.",
    benefits: [
      "Supports overall eye wellness and visual acuity",
      "Provides targeted antioxidant protection for ocular tissue",
      "Promotes healthy circulation to the eyes",
      "Helps protect against age-related visual changes",
      "Supports daily eye health in screen-intensive lifestyles",
      "Enhances visual clarity and contrast sensitivity",
    ],
    suitableFor: [
      "Adults focused on eye wellness and healthy aging.",
      "Individuals with visually demanding lifestyles.",
      "People seeking antioxidant nourishment for the eyes.",
      "Wellness-conscious adults building long-term vitality routines.",
    ],
    ingredients: [
      {
        name: "Physalis",
        latin: "Physalis angulata",
        description:
          "Rich in zeaxanthin and carotenoids that protect the macula and filter blue light.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides beta-carotene, vitamin A precursors, and zinc essential for retinal function.",
      },
      {
        name: "Hibiscus",
        latin: "Hibiscus sabdariffa",
        description:
          "Anthocyanin-rich flower supporting microcirculation in ocular blood vessels.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Protects the lens and retina from oxidative stress and supports healthy intraocular pressure.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances bioavailability of carotenoids and supports blood flow to ocular tissue.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Supports microcirculation and tissue repair in the delicate structures of the eye.",
      },
      {
        name: "Carrot",
        latin: "Daucus carota",
        description:
          "Classic source of beta-carotene and vitamin A, the foundational nutrient for healthy vision.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with a meal containing healthy fats.",
      advanced:
        "Take 2 capsules twice daily for intensive eye support, especially during prolonged screen use.",
      timeline:
        "Eye comfort and reduced screen fatigue often improve within 2-3 weeks. Deeper retinal protective benefits build over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 49 },
      large: { count: 3, price: 160 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/vision-support",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Eye",
    faq: [
      {
        q: "Why should I take this with fats?",
        a: "Carotenoids like beta-carotene and zeaxanthin are fat-soluble, meaning they absorb much better when taken with a meal containing healthy fats such as avocado, nuts, or olive oil.",
      },
      {
        q: "I work at a computer all day. Will this help?",
        a: "Yes. The formula provides carotenoids that help filter blue light and antioxidants that combat the oxidative stress associated with prolonged screen exposure.",
      },
      {
        q: "Can this replace my prescription eye care?",
        a: "No. Vision Support is a nutritional supplement for eye wellness, not a replacement for prescribed eye care, corrective lenses, or medical treatment for eye conditions.",
      },
    ],
  },

  // =========================================================================
  // 14. Divine Kidney Restore
  // =========================================================================
  {
    id: "kidney-restore",
    name: "Divine Kidney Restore",
    series: "Detox",
    seriesSlug: "detox",
    tagline: "Kidney, urinary, and cleansing support.",
    description: "Divine Kidney Restore is a premium herbal kidney and urinary wellness supplement designed to support healthy filtration, fluid balance, urinary cleansing, and natural detoxification. It combines traditional African herbal wisdom with modern botanical detox support to help the body remove excess waste and maintain internal balance.",
    whyYouNeedIt:
      "Puffiness, sluggish digestion, low energy, urinary discomfort. Your kidneys quietly handle the body cleansing work, and when they are overloaded, the whole system suffers. Divine Kidney Restore supports kidney wellness, urinary comfort, and natural detoxification with botanicals traditionally valued for cleansing pathways.",
    longDescription:
      "Divine Kidney Restore targets renal wellness with a carefully selected blend of botanicals known for their kidney-supportive properties. Phyllanthus niruri, traditionally known as the stonebreaker, supports kidney filtration and urinary tract health. Dandelion and Corn Silk are gentle natural diuretics that help the kidneys flush waste while maintaining healthy electrolyte balance. Moringa provides antioxidant protection for delicate kidney tissue while Ginger supports circulation to the renal system. This formula helps your kidneys do what they do best: purify your blood and maintain the internal balance your body depends on.",
    benefits: [
      "Supports healthy kidney filtration and function",
      "Promotes urinary tract cleansing and comfort",
      "Helps maintain optimal fluid and electrolyte balance",
      "Aids the body's natural waste elimination processes",
      "Provides antioxidant protection for renal tissue",
      "Supports healthy hydration and fluid metabolism",
    ],
    suitableFor: [
      "Adults focused on kidney and urinary wellness support.",
      "Individuals seeking natural detoxification and fluid balance.",
      "People building cleansing, hydration-focused routines.",
      "Wellness-conscious adults seeking long-term wellness maintenance.",
    ],
    ingredients: [
      {
        name: "Phyllanthus",
        latin: "Phyllanthus niruri",
        description:
          "Known as stonebreaker, supports kidney filtration and urinary tract health.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides antioxidants and micronutrients that protect kidney tissue from oxidative damage.",
      },
      {
        name: "Dandelion",
        latin: "Taraxacum officinale",
        description:
          "Gentle natural diuretic that supports kidney function without depleting potassium.",
      },
      {
        name: "Corn Silk",
        latin: "Zea mays",
        description:
          "Traditional remedy for urinary comfort, supporting healthy urine flow and bladder wellness.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances renal circulation and supports digestive function for efficient waste processing.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with water.",
      advanced:
        "Take 2 capsules twice daily with plenty of water for intensive kidney cleansing support.",
      timeline:
        "Improved urinary comfort and fluid balance may be noticed within 1-2 weeks. Comprehensive kidney support develops over 4-6 weeks.",
    },
    pricing: {
      small: { count: 120, price: 69 },
      large: { count: 3, price: 160 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/kidney-restore",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Droplets",
    faq: [
      {
        q: "Is this safe for people with kidney disease?",
        a: "If you have diagnosed kidney disease or are on dialysis, consult your nephrologist before using any supplement, including this one. Some botanicals may affect kidney medication.",
      },
      {
        q: "Should I drink more water while taking this?",
        a: "Yes. Adequate hydration supports kidney function and enhances the formula's effectiveness. Aim for at least 8 glasses of water daily while using Kidney Restore.",
      },
      {
        q: "Can this help prevent kidney stones?",
        a: "Phyllanthus niruri has been traditionally used for urinary health and is often called stonebreaker. This supplement supports overall kidney wellness. For kidney stone prevention, consult your healthcare provider.",
      },
    ],
  },

  // =========================================================================
  // 15. Divine Vitality
  // =========================================================================
  {
    id: "vitality",
    name: "Divine Vitality",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Daily vitality, stamina, and resilience.",
    description: "Divine Vitality is a premium botanical wellness supplement formulated to support vitality, stamina, circulation wellness, endurance, and intimate wellness balance for both men and women. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active lifestyle vitality and overall wellness maintenance.",
    whyYouNeedIt:
      "If you wake up tired before the day starts, lose motivation by mid-afternoon, and finish the day too drained for the people you love, your body needs more than coffee. Divine Vitality is a daily botanical foundation supporting energy, stamina, mood, and resilience.",
    longDescription:
      "Divine Vitality is a potent blend of botanicals revered across cultures for their ability to support male vitality and vigor. Mucuna pruriens provides L-DOPA for dopamine support while Maca root enhances stamina and endurance. Sphenocentrum and Curculigo are traditional African and Asian botanicals supporting male reproductive wellness. Tribulus terrestris supports healthy testosterone pathways and Ginger enhances circulation throughout the body. This is comprehensive vitality support for men who want to perform at their physical and mental peak with sustained energy and natural confidence.",
    benefits: [
      "Supports overall male vitality and vigor",
      "Promotes healthy circulation throughout the body",
      "Provides broad antioxidant protection",
      "Sustains physical energy and stamina",
      "Helps combat age-related vitality decline",
      "Builds natural confidence and well-being",
    ],
    suitableFor: [
      "Adults focused on daily vitality and endurance.",
      "Men and women seeking active lifestyle support.",
      "People maintaining demanding physical or mental schedules.",
      "Wellness-conscious adults building restorative routines.",
    ],
    ingredients: [
      {
        name: "Mucuna",
        latin: "Mucuna pruriens",
        description:
          "Natural L-DOPA source supporting dopamine levels, mood, and reproductive health.",
      },
      {
        name: "Maca",
        latin: "Lepidium meyenii",
        description:
          "Peruvian root traditionally used for stamina, endurance, and hormonal balance.",
      },
      {
        name: "Sphenocentrum",
        latin: "Sphenocentrum jollyanum",
        description:
          "West African botanical traditionally used to support male reproductive vitality.",
      },
      {
        name: "Curculigo",
        latin: "Curculigo orchioides",
        description:
          "Ayurvedic herb supporting vitality, strength, and healthy reproductive function.",
      },
      {
        name: "Tribulus",
        latin: "Tribulus terrestris",
        description:
          "Supports healthy testosterone pathways and overall male endocrine balance.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances circulation and nutrient delivery, supporting systemic vitality.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules in the morning and 2 in the evening for comprehensive vitality support.",
      timeline:
        "Energy and stamina improvements may be noticed within 2-3 weeks. Full vitality benefits develop over 60-90 days of consistent use.",
    },
    pricing: {
      small: { count: 120, price: 60 },
      large: { count: 3, price: 150 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/vitality",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Bolt",
    faq: [
      {
        q: "Is this exclusively for men?",
        a: "While formulated with male vitality in mind, the energy and circulatory benefits can support anyone. However, women may prefer Divine Womb Renewal for gender-specific wellness support.",
      },
      {
        q: "Can I take this with blood pressure medication?",
        a: "Some ingredients in this formula may affect blood pressure. Consult your healthcare provider before use if you are on antihypertensive medication.",
      },
      {
        q: "How does this differ from Divine Libido Support?",
        a: "Divine Vitality focuses on overall male energy, stamina, and well-being. Libido Support shares some ingredients but is specifically formulated for intimate wellness and desire.",
      },
    ],
  },

  // =========================================================================
  // 16. Divine Womb Renewal
  // =========================================================================
  {
    id: "womb-renewal",
    name: "Divine Womb Renewal",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Feminine wellness and cycle balance.",
    description: "Divine Womb Renewal is a premium botanical wellness supplement formulated to support feminine wellness, vitality, circulation balance, restorative wellness, and healthy lifestyle maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for women seeking structured support for overall feminine wellness and long-term vitality.",
    whyYouNeedIt:
      "Painful cycles, irregular periods, hormonal mood swings, low feminine vitality. Your womb wellness affects far more than a few days a month. Divine Womb Renewal supports feminine wellness, hormonal balance, and reproductive vitality with botanicals traditionally valued in women wellness practices.",
    longDescription:
      "Divine Womb Renewal is crafted specifically for women seeking to nurture their reproductive health and hormonal harmony. Parquetina nigrescens has deep roots in traditional African medicine for feminine wellness while Curculigo supports hormonal vitality. Chasteberry is one of the most studied botanicals for female hormonal balance, helping regulate cycle regularity and reduce discomfort. Moringa and Baobab provide the dense nutrition women need, including iron, calcium, and folate. Hibiscus rounds out the formula with antioxidant-rich support for circulatory and reproductive tissue health.",
    benefits: [
      "Supports feminine reproductive wellness",
      "Promotes healthy circulation to reproductive organs",
      "Provides antioxidant protection for delicate tissue",
      "Builds hormonal resilience and cycle regularity",
      "Sustains feminine vitality and energy",
      "Supports endurance throughout the monthly cycle",
    ],
    suitableFor: [
      "Women focused on feminine vitality and nourishment.",
      "Those seeking restorative balance and wellness support.",
      "Women maintaining active and demanding lifestyles.",
      "Wellness-conscious women building long-term wellness routines.",
    ],
    ingredients: [
      {
        name: "Parquetina",
        latin: "Parquetina nigrescens",
        description:
          "West African botanical traditionally used to support feminine reproductive health and blood wellness.",
      },
      {
        name: "Curculigo",
        latin: "Curculigo orchioides",
        description:
          "Supports hormonal vitality and reproductive tissue health in women.",
      },
      {
        name: "Chasteberry",
        latin: "Vitex agnus-castus",
        description:
          "Clinically studied for supporting female hormonal balance, cycle regularity, and PMS comfort.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides iron, calcium, and folate essential for female reproductive health.",
      },
      {
        name: "Baobab",
        latin: "Adansonia digitata",
        description:
          "Delivers vitamin C and minerals supporting immune function and tissue integrity.",
      },
      {
        name: "Hibiscus",
        latin: "Hibiscus sabdariffa",
        description:
          "Rich in iron and anthocyanins supporting blood health and reproductive tissue wellness.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily during the luteal phase for enhanced cycle support.",
      timeline:
        "Cycle-related benefits may emerge within 1-2 cycles. Comprehensive hormonal and reproductive support develops over 3-4 months.",
    },
    pricing: {
      small: { count: 120, price: 120 },
      large: { count: 3, price: 300 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/womb-renewal",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Heart",
    faq: [
      {
        q: "Is this safe during pregnancy?",
        a: "Do not use this product during pregnancy or while breastfeeding without explicit approval from your obstetrician. Chasteberry may affect hormone levels.",
      },
      {
        q: "Can I take this alongside birth control?",
        a: "Consult your healthcare provider as some botanicals may interact with hormonal contraceptives.",
      },
      {
        q: "Does this help with menstrual cramps?",
        a: "Chasteberry and the anti-inflammatory botanicals in this formula may support menstrual comfort. Many users report reduced cycle-related discomfort after consistent use over 2-3 cycles.",
      },
      {
        q: "Is this suitable for women in menopause?",
        a: "Yes. The formula supports feminine wellness across all life stages. Menopausal women may benefit from the hormonal balance and vitality support. Consult your healthcare provider if you are on hormone replacement therapy.",
      },
    ],
  },

  // =========================================================================
  // 17. Divine Varicose Veins Support
  // =========================================================================
  {
    id: "varicose-veins-support",
    name: "Divine Varicose Veins Support",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Leg comfort and circulation support.",
    description: "Divine Varicose Veins Support is a premium botanical wellness supplement formulated to support healthy circulation, vascular wellness, mobility comfort, antioxidant protection, and daily vitality maintenance. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for healthy lifestyle circulation and long-term wellness balance.",
    whyYouNeedIt:
      "Heavy legs at the end of the day, visible veins, puffy ankles, discomfort after long standing or sitting. Your circulation is asking for help. Divine Varicose Veins Support targets vein and circulation wellness with botanicals traditionally valued for leg comfort and vascular support.",
    longDescription:
      "Divine Varicose Veins Support targets the circulatory system with botanicals known for their vein-strengthening and blood-flow-enhancing properties. Hibiscus and Garlic are traditional cardiovascular tonics that support arterial flexibility and healthy blood pressure. Capsicum stimulates peripheral circulation while Moringa provides antioxidant defense for vascular endothelium. Turmeric and Ginger protect blood vessel walls from inflammatory damage and Centella Asiatica supports the structural integrity of vein walls and valves. This formula is ideal for anyone seeking more comfortable legs, reduced heaviness, and stronger circulatory function.",
    benefits: [
      "Supports healthy venous circulation and vein integrity",
      "Promotes leg comfort and reduces heaviness",
      "Provides antioxidant protection for blood vessel walls",
      "Supports comfortable movement and standing",
      "Helps combat age-related circulatory decline",
      "Builds vascular resilience and strength",
    ],
    suitableFor: [
      "Adults focused on circulation and vascular wellness.",
      "People who stand or sit for long hours each day.",
      "Individuals seeking leg comfort and mobility support.",
      "Wellness-conscious adults building active-aging routines.",
    ],
    ingredients: [
      {
        name: "Hibiscus",
        latin: "Hibiscus sabdariffa",
        description:
          "Cardiovascular tonic supporting arterial flexibility and healthy blood pressure.",
      },
      {
        name: "Garlic",
        latin: "Allium sativum",
        description:
          "Allicin-rich bulb supporting blood vessel health and healthy platelet function.",
      },
      {
        name: "Capsicum",
        latin: "Capsicum annuum",
        description:
          "Contains capsaicin that stimulates peripheral blood flow and supports circulatory efficiency.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides antioxidants that protect the vascular endothelium from oxidative damage.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Supports healthy inflammatory response in blood vessel walls and surrounding tissue.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Warming circulatory stimulant that enhances blood flow to the extremities.",
      },
      {
        name: "Centella",
        latin: "Centella asiatica",
        description:
          "Strengthens vein walls and supports venous valve integrity, a key factor in varicose vein prevention.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily for intensive circulatory support, especially if on your feet frequently.",
      timeline:
        "Leg comfort and reduced heaviness may improve within 2-3 weeks. Vein health and visible circulatory improvement develop over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 85 },
      large: { count: 3, price: 270 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/varicose-veins",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "HeartPulse",
    faq: [
      {
        q: "Can this reverse existing varicose veins?",
        a: "This formula supports venous health and comfortable circulation. While it may reduce discomfort, existing structural vein changes should be evaluated by a vascular specialist.",
      },
      {
        q: "Is this safe with blood-thinning medication?",
        a: "Garlic, Turmeric, and Ginger may enhance blood-thinning effects. Consult your healthcare provider before use if you are on anticoagulant medication.",
      },
      {
        q: "I stand all day for work. Will this help?",
        a: "Yes. The formula is designed to support circulation in people who stand or sit for extended periods. Many users report reduced leg heaviness and improved comfort during long shifts.",
      },
    ],
  },

  // =========================================================================
  // 18. Divine Fresh Breath
  // =========================================================================
  {
    id: "fresh-breath",
    name: "Divine Fresh Breath",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Fresh breath and oral wellness.",
    description: "Divine Fresh Breath is a premium herbal breath, mouth, stomach, and digestive freshness formula designed to support long-lasting internal and oral cleansing. It targets common sources of bad breath, including mouth bacteria, sluggish digestion, mucus buildup, and internal toxin load.",
    whyYouNeedIt:
      "Persistent bad breath is not just embarrassing, it is a confidence problem in meetings, on dates, and in every close conversation. Divine Fresh Breath works from the inside out, supporting oral wellness, gum comfort, and the digestive freshness that fights breath odour at its source.",
    longDescription:
      "Divine Fresh Breath goes beyond masking odor to address the root causes of bad breath. Clove is a powerful natural antimicrobial that targets oral bacteria while Peppermint provides immediate freshening action. Neem is one of nature's strongest antibacterial agents, supporting gum health and reducing harmful mouth bacteria. Ginger supports digestive function because many breath issues originate in the gut, not the mouth. Lemon Peel provides detoxifying D-limonene that supports liver function and whole-body freshness. This inside-out approach delivers lasting breath confidence you can trust.",
    benefits: [
      "Promotes lasting fresh breath from the inside out",
      "Targets oral bacteria that cause bad breath",
      "Supports gum wellness and oral tissue health",
      "Enhances digestive freshness and gut health",
      "Helps clear mucus and respiratory passages",
      "Supports gentle daily oral detoxification",
    ],
    suitableFor: [
      "Adults focused on fresh breath and oral wellness.",
      "Individuals seeking digestive and gum wellness support.",
      "People wanting natural daily freshness and confidence.",
      "Wellness-conscious adults building healthy oral routines.",
    ],
    ingredients: [
      {
        name: "Clove",
        latin: "Syzygium aromaticum",
        description:
          "Contains eugenol, a powerful antimicrobial that targets odor-causing bacteria in the mouth.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Supports digestive function and addresses gut-related causes of persistent bad breath.",
      },
      {
        name: "Peppermint",
        latin: "Mentha piperita",
        description:
          "Provides immediate freshening action and supports healthy oral mucosa.",
      },
      {
        name: "Neem",
        latin: "Azadirachta indica",
        description:
          "Potent antibacterial that supports gum health and reduces harmful oral bacteria populations.",
      },
      {
        name: "Lemon Peel",
        latin: "Citrus limon",
        description:
          "Rich in D-limonene supporting liver detoxification and whole-body freshness.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 1 capsule with each meal for all-day fresh breath support.",
      timeline:
        "Immediate freshening occurs within hours of first use. Lasting gut-related breath improvement develops over 2-3 weeks of consistent use.",
    },
    pricing: {
      small: { count: 120, price: 59 },
      large: { count: 3, price: 125 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/fresh-breath",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Wind",
    faq: [
      {
        q: "Does this replace regular brushing and flossing?",
        a: "No. Fresh Breath supplements your oral hygiene routine by addressing internal causes of bad breath. Continue regular brushing, flossing, and dental checkups.",
      },
      {
        q: "How fast does this work?",
        a: "The antimicrobial and freshening ingredients provide noticeable effects within hours. Deeper gut-related breath issues improve over 2-3 weeks of daily use.",
      },
      {
        q: "Can children use this product?",
        a: "This product is formulated for adults. For children's oral health concerns, consult a pediatric dentist.",
      },
    ],
  },

  // =========================================================================
  // 19. Divine Libido Support™
  // =========================================================================
  {
    id: "libido-support",
    name: "Divine Libido Support™",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Vitality and intimate-wellness support.",
    description: "Divine Libido Support is a premium botanical wellness supplement formulated to support vitality, stamina, circulation wellness, endurance, and intimate wellness balance for both men and women. Inspired by traditional African herbal wisdom together with globally respected botanical wellness traditions, this formulation was developed for adults seeking structured support for active lifestyle vitality and overall wellness maintenance.",
    whyYouNeedIt:
      "When stress, age, or lifestyle quietly erodes drive, confidence, and stamina, your relationships, intimacy, and self-image take the hit. Divine Libido Support combines botanicals traditionally valued for vitality, endurance, and intimate-wellness balance.",
    longDescription:
      "Divine Libido Support is a comprehensive formula drawing from both African and Ayurvedic traditions to support intimate wellness. Mucuna pruriens elevates dopamine, the neurotransmitter of desire and motivation. Maca root has centuries of use for enhancing stamina and intimate performance. Sphenocentrum, Curculigo, and Parquetina are traditional botanicals used across West Africa and Southeast Asia to support reproductive vitality and desire. Tribulus supports healthy hormone pathways while Ginger ensures robust circulation where it matters most. This is natural intimacy support for those who want to reignite their passion without synthetic chemicals.",
    benefits: [
      "Supports healthy desire and intimate vitality",
      "Promotes robust circulation to reproductive tissue",
      "Provides antioxidant protection for reproductive health",
      "Sustains energy and stamina for intimate wellness",
      "Helps combat age-related changes in desire",
      "Builds natural confidence and well-being",
    ],
    suitableFor: [
      "Adults focused on vitality, stamina, and endurance.",
      "Men and women seeking intimate wellness balance.",
      "People maintaining active, demanding lifestyles.",
      "Wellness-conscious adults building restorative routines.",
    ],
    ingredients: [
      {
        name: "Mucuna",
        latin: "Mucuna pruriens",
        description:
          "Natural L-DOPA source elevating dopamine levels to support desire and motivation.",
      },
      {
        name: "Maca",
        latin: "Lepidium meyenii",
        description:
          "Andean root with centuries of traditional use for enhancing stamina and intimate performance.",
      },
      {
        name: "Sphenocentrum",
        latin: "Sphenocentrum jollyanum",
        description:
          "West African botanical traditionally valued as a potent support for reproductive vitality.",
      },
      {
        name: "Curculigo",
        latin: "Curculigo orchioides",
        description:
          "Ayurvedic herb supporting reproductive tissue health and hormonal vitality.",
      },
      {
        name: "Parquetina",
        latin: "Parquetina nigrescens",
        description:
          "Traditional African botanical supporting blood health and reproductive wellness.",
      },
      {
        name: "Tribulus",
        latin: "Tribulus terrestris",
        description:
          "Supports healthy testosterone pathways and endocrine balance for intimate wellness.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances circulation to reproductive tissue and supports overall systemic vitality.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules in the morning and 2 in the evening for comprehensive intimate support.",
      timeline:
        "Energy and desire improvements often appear within 2-3 weeks. Full intimate wellness benefits develop over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 80 },
      large: { count: 3, price: 260 },
    },
    bottleSizes: [60, 120],
    imageFolder: "/images/products/libido",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Flame",
    faq: [
      {
        q: "Is this for men only?",
        a: "While several ingredients have stronger traditional use for male intimate health, the circulatory and energy benefits support anyone. Women may also consider Divine Womb Renewal for complementary feminine support.",
      },
      {
        q: "Are there any interactions with heart medication?",
        a: "Some ingredients may affect blood pressure and circulation. If you are on cardiovascular medication, consult your healthcare provider before use.",
      },
      {
        q: "How does this compare to pharmaceutical options?",
        a: "This is a botanical supplement that supports natural intimate wellness pathways over time. It works differently from pharmaceutical solutions and is not intended as a replacement for prescribed treatments.",
      },
    ],
  },

  // =========================================================================
  // 20. Divine Blood Booster Pro™
  // =========================================================================
  {
    id: "blood-booster-pro",
    name: "Divine Blood Booster Pro™",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "Blood nourishment, circulation, and energy.",
    description: "Divine Blood Booster Pro is a premium botanical blood nourishment and vitality support supplement designed to support healthy blood formation, circulation, oxygen transport, energy restoration, and whole-body vitality. This formulation draws from African herbal medicine, nutrient-dense botanical traditions, and restorative wellness practices traditionally used to strengthen the blood, support recovery, and improve physical resilience.",
    whyYouNeedIt:
      "Constant fatigue, pale complexion, weak immunity, slow recovery. These can be signs your blood needs nourishment. Whether recovering from illness, pregnancy, blood loss, or just running on empty, Divine Blood Booster Pro is built to support healthy blood formation, hemoglobin, circulation, oxygen transport, and energy restoration.",
    longDescription:
      "Divine Blood Booster Pro is designed for anyone who needs to build and maintain healthy blood levels. Parquetina nigrescens is a cornerstone of traditional African blood-building remedies, used for generations to support hemoglobin production. Moringa provides plant-based iron alongside vitamin C cofactors that enhance iron absorption. Beetroot delivers natural nitrates that support oxygen delivery and circulation efficiency. Folic Acid and Iron provide the essential raw materials for red blood cell synthesis. This formula is ideal for those recovering from blood loss, managing low iron, or anyone wanting to maintain robust blood health and the energy that comes with it.",
    benefits: [
      "Supports healthy red blood cell production",
      "Enhances oxygen delivery throughout the body",
      "Sustains energy levels through improved blood health",
      "Strengthens immune function and resilience",
      "Supports recovery from blood loss or deficiency",
      "Promotes vibrant overall wellness",
    ],
    suitableFor: [
      "Adults experiencing fatigue, weakness, or low vitality.",
      "Individuals seeking blood-building nutritional support.",
      "Adults recovering from stress, illness, or physical depletion.",
      "Wellness-conscious adults focused on long-term vitality and healthy aging.",
    ],
    ingredients: [
      {
        name: "Parquetina",
        latin: "Parquetina nigrescens",
        description:
          "Traditional West African blood tonic supporting hemoglobin production and blood cell formation.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides plant-based iron with naturally occurring vitamin C for enhanced absorption.",
      },
      {
        name: "Beetroot",
        latin: "Beta vulgaris",
        description:
          "Rich in natural nitrates and iron that support blood oxygenation and circulation.",
      },
      {
        name: "Folic Acid",
        latin: "Vitamin B9",
        description:
          "Essential B vitamin required for DNA synthesis and healthy red blood cell formation.",
      },
      {
        name: "Iron",
        latin: "Ferrous bisglycinate",
        description:
          "Highly bioavailable chelated iron supporting hemoglobin and red blood cell production.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily for rapid blood-building support during recovery periods.",
      timeline:
        "Improved energy from better oxygen delivery may be noticed within 1-2 weeks. Measurable blood count improvements typically develop over 4-8 weeks.",
    },
    pricing: {
      small: { count: 120, price: 99 },
      large: { count: 3, price: 260 },
    },
    bottleSizes: [60, 120],
    imageFolder: "/images/products/blood-booster",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Droplet",
    faq: [
      {
        q: "Is this safe for people with iron overload conditions?",
        a: "If you have hemochromatosis or another iron overload condition, do not use this product without your doctor's explicit approval. The formula contains supplemental iron.",
      },
      {
        q: "Can I take this during pregnancy?",
        a: "Iron and folic acid are important during pregnancy. However, consult your obstetrician before starting any supplement, as they may want to coordinate with your prenatal vitamin.",
      },
      {
        q: "Why does this contain Beetroot?",
        a: "Beetroot provides natural nitrates that are converted to nitric oxide in the body, supporting blood vessel dilation and efficient oxygen delivery throughout the circulatory system.",
      },
      {
        q: "I am vegetarian. Is this a good iron source?",
        a: "Yes. The chelated iron (ferrous bisglycinate) in this formula is highly bioavailable and plant-friendly. Combined with Moringa's natural vitamin C, absorption is optimized even without animal-based iron sources.",
      },
    ],
  },

  // =========================================================================
  // 21. Divine GLUT4 Metabolic Activation
  // =========================================================================
  {
    id: "glut4-metabolic-activation",
    name: "Divine GLUT4 Metabolic Activation",
    series: "Metabolic",
    seriesSlug: "metabolic",
    tagline: "GLUT4 metabolic activation.",
    description: "Divine GLUT4 Metabolic Activation is a premium metabolic restoration capsule designed to support healthy glucose transport, insulin sensitivity, pancreatic wellness, cellular energy production, and metabolic balance.",
    whyYouNeedIt:
      "If you have tried diet after diet and still feel stuck with blood-sugar swings, stubborn weight, low energy after meals, the missing piece is usually how efficiently your cells use glucose. Divine GLUT4 Metabolic Activation targets the cellular glucose-transport pathway with botanicals traditionally valued for insulin sensitivity and metabolic energy.",
    longDescription:
      "Divine GLUT4 Metabolic Activation represents the cutting edge of botanical metabolic support. Named for the GLUT4 glucose transporter that allows cells to absorb glucose from the bloodstream, this formula combines botanicals that have been studied for their ability to enhance glucose uptake at the cellular level. Momordica and Cinnamon bark contain compounds that mimic insulin-signaling pathways, encouraging GLUT4 translocation to the cell surface. Olive leaf extract and Blueberry provide polyphenols that support insulin sensitivity. Turmeric and Moringa deliver anti-inflammatory and nutritional support for the metabolic system. This formula is ideal for anyone seeking to optimize how their cells use glucose for energy.",
    benefits: [
      "Supports healthy glucose metabolism and uptake",
      "Promotes insulin sensitivity at the cellular level",
      "Aids efficient cellular glucose absorption",
      "Supports pancreatic health and function",
      "Helps manage sugar cravings and energy crashes",
      "Sustains balanced metabolic energy throughout the day",
    ],
    suitableFor: [
      "Adults focused on blood sugar and metabolic balance.",
      "Individuals supporting healthy weight and waist management.",
      "People seeking energy and insulin-sensitivity support.",
      "Wellness-conscious adults seeking long-term metabolic wellness.",
    ],
    ingredients: [
      {
        name: "Momordica",
        latin: "Momordica charantia",
        description:
          "Contains compounds that support GLUT4 translocation and mimic insulin signaling for glucose uptake.",
      },
      {
        name: "Cinnamon",
        latin: "Cinnamomum verum",
        description:
          "Bark extract containing cinnamaldehyde that enhances insulin receptor sensitivity and GLUT4 activity.",
      },
      {
        name: "Olive Leaf",
        latin: "Olea europaea",
        description:
          "Rich in oleuropein, a polyphenol supporting insulin sensitivity and glucose metabolism.",
      },
      {
        name: "Blueberry",
        latin: "Vaccinium corymbosum",
        description:
          "Anthocyanin-rich fruit supporting insulin signaling and healthy glucose uptake in muscle cells.",
      },
      {
        name: "Turmeric",
        latin: "Curcuma longa",
        description:
          "Curcumin supports healthy inflammatory response and protects metabolic tissue from oxidative stress.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides chromium and isothiocyanates that support glucose metabolism and insulin sensitivity.",
      },
    ],
    dosage: {
      standard: "Take 2 capsules daily with meals.",
      advanced:
        "Take 2 capsules twice daily with carbohydrate-containing meals for targeted glucose support.",
      timeline:
        "Reduced post-meal energy crashes may be noticed within 1-2 weeks. Comprehensive metabolic optimization develops over 60-90 days.",
    },
    pricing: {
      small: { count: 120, price: 120 },
      large: { count: 3, price: 299.99 },
    },
    bottleSizes: [60, 120],
    imageFolder: "/images/products/glut4",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "CircuitBoard",
    faq: [
      {
        q: "What is GLUT4 and why does it matter?",
        a: "GLUT4 is a glucose transporter protein that sits on the surface of muscle and fat cells, allowing them to absorb glucose from the blood. Enhancing GLUT4 activity helps cells use glucose more efficiently for energy.",
      },
      {
        q: "Can I take this with Divine Glucose Balance?",
        a: "Yes. Glucose Balance and GLUT4 Metabolic Activation work through complementary pathways. Glucose Balance supports broader blood sugar regulation while GLUT4 targets cellular glucose uptake specifically.",
      },
      {
        q: "Is Cinnamon safe for long-term use?",
        a: "This formula uses Ceylon Cinnamon (true cinnamon), which is low in coumarin and safe for long-term daily use at the dosages provided.",
      },
      {
        q: "Should I take this before or after exercise?",
        a: "Taking it with a pre- or post-workout meal can be beneficial since exercise naturally activates GLUT4 transporters. The formula may enhance this natural response.",
      },
    ],
  },

  // =========================================================================
  // 22. Divine Female Fertility Renewal System
  // =========================================================================
  {
    id: "female-fertility",
    name: "Divine Female Fertility Renewal System™",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "90-Day Precision Botanical Program for women.",
    description: "Divine Female Fertility Renewal System is a comprehensive botanical program that draws on African herbal, Ayurvedic, and modern wellness traditions to support women's reproductive wellness, hormonal balance, vitality, and overall feminine health.",
    whyYouNeedIt:
      "For women trying to conceive, or simply wanting reproductive wellness, balanced cycles, and feminine vitality, the body needs real, nourishing botanical support. Divine Female Fertility Renewal is a 90-day precision program supporting hormonal balance, ovulation, womb conditioning, and reproductive vitality. It is for women who want their fertility journey supported with traditional wisdom and structured care.",
    longDescription:
      "Divine Female Fertility Renewal System draws on African herbal, Ayurvedic, and modern wellness traditions to provide women with a structured 90-day botanical program. Lepidium meyenii and Moringa provide foundational nutrition while Parquetina nigrescens and Curculigo pilosa support feminine reproductive wellness. Ginger and Turmeric contribute circulatory and anti-inflammatory support. This comprehensive program is designed for women building nourishing, restorative routines focused on long-term feminine vitality.",
    benefits: [
      "Supports overall feminine wellness and reproductive health",
      "Helps promote nutritional nourishment and vitality for women",
      "Supports hormonal balance and monthly wellness routines",
      "Supports healthy circulation and general body vitality",
      "Provides antioxidant-rich botanical support for cellular wellness",
    ],
    suitableFor: [
      "Women focused on reproductive wellness goals.",
      "Those seeking hormonal balance and monthly wellness support.",
      "Women building nourishing, restorative routines.",
      "Wellness-conscious women focused on feminine vitality.",
    ],
    ingredients: [
      {
        name: "Maca",
        latin: "Lepidium meyenii",
        description:
          "Andean adaptogen supporting hormonal balance, energy, and reproductive vitality in women.",
      },
      {
        name: "Baobab",
        latin: "Adansonia digitata",
        description:
          "African superfruit providing vitamin C, calcium, and mineral nutrition for feminine wellness.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides iron, folate, and broad-spectrum nutrients essential for feminine reproductive health.",
      },
      {
        name: "Parquetina",
        latin: "Parquetina nigrescens",
        description:
          "West African botanical traditionally used to support blood health and feminine reproductive wellness.",
      },
      {
        name: "Curculigo",
        latin: "Curculigo pilosa",
        description:
          "Supports feminine vitality, hormonal balance, and reproductive tissue health.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Supports circulation, digestion, and bioavailability of other botanical compounds.",
      },
    ],
    dosage: {
      standard:
        "Take 2 capsules in the morning and 2 capsules in the evening with food and water. Daily total: 4 capsules.",
      advanced:
        "Follow the 90-day program as directed for comprehensive reproductive wellness support.",
      timeline:
        "Hormonal and cycle-related benefits typically emerge within 4-6 weeks. Full program benefits develop over the complete 90-day course.",
    },
    pricing: {
      small: { count: 120, price: 78 },
      large: { count: 3, price: 160 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/female-fertility",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Heart",
    faq: [
      {
        q: "Is this safe to take while trying to conceive?",
        a: "This formula supports general feminine wellness. If you are actively trying to conceive, consult your healthcare provider before starting any supplement program.",
      },
      {
        q: "How long is the program?",
        a: "This is a 90-day precision botanical program. Consistent daily use throughout all 90 days provides the most comprehensive wellness support.",
      },
      {
        q: "Can I use this alongside Divine Womb Renewal?",
        a: "These two products complement each other. Womb Renewal supports cycle balance while Female Fertility Renewal provides the comprehensive 90-day program for broader reproductive wellness.",
      },
    ],
  },

  // =========================================================================
  // 23. Divine Male Fertility Renewal System
  // =========================================================================
  {
    id: "male-fertility",
    name: "Divine Male Fertility Renewal System™",
    series: "Wellness",
    seriesSlug: "wellness",
    tagline: "90-Day Precision Botanical Program for men.",
    description: "Divine Male Fertility Renewal System is a professional botanical wellness formulation developed to support male reproductive wellness, vitality, stamina, and overall masculine health. This advanced wellness program combines traditional botanical wisdom with modern nutritional support principles to help men maintain healthy lifestyle habits connected to reproductive vitality and long-term wellness.",
    whyYouNeedIt:
      "Low sperm count, weak motility, low testosterone, weak drive. Male fertility issues affect roughly one in seven couples, and they are rarely addressed openly. Divine Male Fertility Renewal is a 90-day precision program supporting sperm wellness, motility, testosterone balance, libido, and overall vitality. It is for men who want to take real action on reproductive wellness and the confidence that comes with it.",
    longDescription:
      "Divine Male Fertility Renewal System combines traditional botanical wisdom with modern nutritional support principles. Lepidium meyenii and Mucuna pruriens provide stamina and dopamine support while Sphenocentrum jollyanum and Tribulus terrestris support masculine wellness pathways. Moringa provides comprehensive micronutrition and Ginger enhances circulation throughout the reproductive system.",
    benefits: [
      "Supports overall male reproductive wellness and vitality",
      "Helps promote stamina, physical resilience, and daily energy",
      "Supports circulation and masculine wellness routines",
      "Provides antioxidant-rich botanical support for cellular vitality",
      "Supports healthy wellness habits focused on long-term vitality",
    ],
    suitableFor: [
      "Men focused on reproductive wellness and vitality.",
      "Those seeking stamina, circulation, and nourishment support.",
      "Men maintaining active lifestyle routines.",
      "Wellness-conscious men focused on long-term masculine wellness.",
    ],
    ingredients: [
      {
        name: "Maca",
        latin: "Lepidium meyenii",
        description:
          "Andean root with centuries of traditional use for male stamina and reproductive vitality.",
      },
      {
        name: "Mucuna",
        latin: "Mucuna pruriens",
        description:
          "Natural L-DOPA source supporting dopamine levels, mood, and male reproductive health.",
      },
      {
        name: "Sphenocentrum",
        latin: "Sphenocentrum jollyanum",
        description:
          "West African botanical traditionally used to support male reproductive vitality and stamina.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides zinc, selenium, and broad micronutrients essential for male reproductive wellness.",
      },
      {
        name: "Tribulus",
        latin: "Tribulus terrestris",
        description:
          "Supports healthy testosterone pathways and overall male endocrine balance.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Enhances circulation and nutrient delivery to reproductive tissue.",
      },
    ],
    dosage: {
      standard:
        "Take 2 capsules in the morning and 2 capsules in the evening with food and water. Daily total: 4 capsules.",
      advanced:
        "Follow the 90-day program as directed for comprehensive male wellness support.",
      timeline:
        "Vitality and stamina improvements may appear within 3-4 weeks. Full program benefits develop over the complete 90-day course.",
    },
    pricing: {
      small: { count: 120, price: 78 },
      large: { count: 3, price: 160 },
    },
    bottleSizes: [120],
    imageFolder: "/images/products/male-fertility",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Shield",
    faq: [
      {
        q: "How long before I see results?",
        a: "Vitality and stamina improvements may emerge within 3-4 weeks. Complete the full 90-day program for comprehensive reproductive wellness support.",
      },
      {
        q: "Can I combine this with Divine Vitality?",
        a: "Yes. Divine Vitality provides broad daily energy support while Male Fertility Renewal offers the focused 90-day program for reproductive wellness goals.",
      },
      {
        q: "Is this safe to take long-term?",
        a: "All ingredients are food-grade botanicals. After the initial 90-day program, consult your healthcare provider about ongoing use.",
      },
    ],
  },

  // =========================================================================
  // 24. Divine Respiratory Shield
  // =========================================================================
  {
    id: "respiratory-shield",
    name: "Divine Respiratory Shield",
    series: "Detox",
    seriesSlug: "detox",
    tagline: "Clear breathing, calmer airways, lung resilience.",
    description: "Divine Respiratory Shield is a premium botanical respiratory wellness formula that draws on traditional African and globally respected herbal traditions to support healthy breathing, lung wellness, airway comfort, mucus balance, and respiratory vitality.",
    whyYouNeedIt:
      "If you find yourself short of breath sooner than you used to, clearing your throat constantly, or struggling through allergy and cold seasons, your lungs and airways may need real botanical support. Divine Respiratory Shield combines herbs traditionally valued for clear breathing, lung wellness, mucus balance, and respiratory immune defense. It is for adults who want to breathe freely at the gym, on a long walk, through allergy season, and protect lung wellness for the long haul.",
    longDescription:
      "Divine Respiratory Shield draws on traditional African and globally respected herbal traditions. Euphorbia hirta has long been used for respiratory wellness while Moringa provides broad antioxidant and nutritional support. Thyme and Peppermint deliver natural expectorant and airway-soothing properties. Garlic contributes antimicrobial support and Ginger enhances circulation throughout the respiratory system.",
    benefits: [
      "Supports healthy breathing function and lung wellness",
      "Helps maintain healthy mucus balance",
      "Supports respiratory immune defense",
      "Encourages clearer breathing pathways",
      "Supports seasonal and environmental respiratory resilience",
    ],
    suitableFor: [
      "Adults focused on respiratory and lung wellness.",
      "Individuals managing seasonal breathing challenges.",
      "People exposed to pollution, smoke, or indoor air irritants.",
      "Wellness-conscious adults building long-term respiratory routines.",
    ],
    ingredients: [
      {
        name: "Euphorbia",
        latin: "Euphorbia hirta",
        description:
          "Traditional herb valued for supporting healthy airways and respiratory comfort.",
      },
      {
        name: "Moringa",
        latin: "Moringa oleifera",
        description:
          "Provides antioxidants and micronutrients supporting overall respiratory wellness.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Warming circulatory support that helps enhance airway wellness and immune function.",
      },
      {
        name: "Thyme",
        latin: "Thymus vulgaris",
        description:
          "Natural expectorant supporting clear airways and healthy respiratory mucus balance.",
      },
      {
        name: "Garlic",
        latin: "Allium sativum",
        description:
          "Allicin-rich botanical supporting respiratory immune defense and airway health.",
      },
      {
        name: "Peppermint",
        latin: "Mentha piperita",
        description:
          "Provides natural cooling and soothing support for airway comfort and clear breathing.",
      },
    ],
    dosage: {
      standard:
        "Take 2 capsules in the morning and 2 capsules in the evening with food and water. Daily total: 4 capsules.",
      advanced:
        "Take 2 capsules three times daily during periods of intensive respiratory support needs.",
      timeline:
        "Airway comfort improvements may appear within 1-2 weeks. Comprehensive lung wellness support develops over 4-6 weeks.",
    },
    pricing: {
      small: { count: 60, price: 69 },
      large: { count: 3, price: 200 },
    },
    bottleSizes: [60],
    imageFolder: "/images/products/respiratory-shield",
    signatureColor: "#1B2A4A",
    accentColor: "#D4A017",
    categoryIcon: "Wind",
    faq: [
      {
        q: "Can I take this during allergy season?",
        a: "Yes. The formula is specifically designed to support respiratory wellness during seasonal challenges. Many users take it preventively through allergy season.",
      },
      {
        q: "How does this differ from Divine GERD Respiratory System?",
        a: "Respiratory Shield focuses on lung and airway wellness for breathing support. GERD Respiratory targets the gut-airway connection and addresses reflux-related breathing discomfort.",
      },
      {
        q: "Is this suitable for smokers?",
        a: "The formula supports general respiratory wellness. If you smoke, quitting is the most impactful step for lung health. This supplement can provide supportive botanical nutrition.",
      },
    ],
  },

  // =========================================================================
  // 25. Divine GERD Respiratory System
  // =========================================================================
  {
    id: "gerd-respiratory",
    name: "Divine GERD Respiratory System",
    series: "Detox",
    seriesSlug: "detox",
    tagline: "Calm the gut, soothe the throat, restore breathing.",
    description: "Divine GERD Respiratory System is a premium gastrointestinal and respiratory wellness formula that combines soothing mucilage-rich herbs and respiratory-supportive botanicals to support healthy acid balance, throat comfort, digestive calmness, airway wellness, and breathing comfort associated with reflux-related irritation.",
    whyYouNeedIt:
      "Acid reflux at night, heartburn after meals, a throat that will not stop feeling irritated, breathing that feels heavy after eating. GERD does not just live in the stomach, it reaches the throat, the airways, and your sleep. Divine GERD Respiratory System combines soothing mucilage-rich herbs and respiratory-supportive botanicals to help calm the gut and restore comfortable breathing. It is for adults tired of reaching for antacids and ready to address the gut-airway connection at its source.",
    longDescription:
      "Divine GERD Respiratory System addresses the overlooked gut-airway connection with a unique blend of soothing botanicals. Licorice root provides glycyrrhizin for stomach-lining support while Bryophyllum pinnatum soothes tissue irritation. Okra provides mucilage that coats and protects the esophagus. Peppermint and Ginger support digestive calmness and Jute leaves provide additional soothing botanical activity.",
    benefits: [
      "Supports healthy acid balance and digestive comfort",
      "Helps soothe throat and chest irritation",
      "Supports digestive and respiratory comfort",
      "Supports stomach-lining wellness",
      "Encourages calm breathing pathways",
      "Helps reduce nighttime reflux-related discomfort",
    ],
    suitableFor: [
      "Adults dealing with acid reflux, heartburn, or post-meal discomfort.",
      "Individuals seeking throat and airway comfort related to reflux.",
      "People troubled by nighttime breathing discomfort after meals.",
      "Wellness-conscious adults building long-term digestive-respiratory routines.",
    ],
    ingredients: [
      {
        name: "Licorice Root",
        latin: "Glycyrrhiza glabra",
        description:
          "Provides glycyrrhizin supporting stomach-lining wellness and reducing acid irritation.",
      },
      {
        name: "Bryophyllum",
        latin: "Bryophyllum pinnatum",
        description:
          "Traditional botanical supporting tissue soothing and healthy inflammatory response in the digestive tract.",
      },
      {
        name: "Okra",
        latin: "Abelmoschus esculentus",
        description:
          "Provides mucilage that coats and protects the esophagus and stomach lining from acid.",
      },
      {
        name: "Peppermint",
        latin: "Mentha piperita",
        description:
          "Supports digestive calmness and provides soothing airway comfort.",
      },
      {
        name: "Ginger",
        latin: "Zingiber officinale",
        description:
          "Supports digestive function and healthy gastric motility to reduce reflux.",
      },
      {
        name: "Jute Leaves",
        latin: "Corchorus olitorius",
        description:
          "Provides soothing mucilaginous support for the digestive and respiratory tract.",
      },
    ],
    dosage: {
      standard:
        "Take 2 capsules in the morning and 2 capsules in the evening with food and water. Daily total: 4 capsules.",
      advanced:
        "Take 1 capsule 30 minutes before each main meal for targeted digestive support.",
      timeline:
        "Throat and digestive comfort improvements may appear within 1-2 weeks. Comprehensive gut-airway support develops over 4-6 weeks.",
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
        q: "Should I stop my antacid while using this?",
        a: "Do not stop prescribed medications without consulting your healthcare provider. This supplement supports general digestive and respiratory wellness alongside your existing care.",
      },
      {
        q: "When is the best time to take this?",
        a: "Taking with meals helps support post-meal digestive comfort. For nighttime reflux, taking with your evening meal may provide overnight support.",
      },
      {
        q: "How is this different from Divine Respiratory Shield?",
        a: "GERD Respiratory addresses the gut-airway connection with digestive-focused botanicals. Respiratory Shield targets the lungs and airways directly for breathing wellness.",
      },
    ],
  },
  {
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
];

// ---------------------------------------------------------------------------
// Series
// ---------------------------------------------------------------------------

export const series: Series[] = [
  {
    name: "Cellular",
    slug: "cellular",
    description:
      "Formulas targeting mitochondrial function, cellular renewal, and longevity at the deepest biological level.",
    icon: "Dna",
    color: "#1B2A4A",
    productIds: [
      "mito-energy",
      "cell-renewal",
      "longevity-30",
      "longevity-50",
    ],
  },
  {
    name: "Neuro",
    slug: "neuro",
    description:
      "Brain and nervous system support for cognitive performance, nerve health, and mental resilience.",
    icon: "Brain",
    color: "#1B2A4A",
    productIds: ["cogniboost-restore", "nerve-renewal", "neuro-restore"],
  },
  {
    name: "Metabolic",
    slug: "metabolic",
    description:
      "Metabolic optimization formulas for blood sugar balance, thyroid health, body composition, and glucose metabolism.",
    icon: "Gauge",
    color: "#1B2A4A",
    productIds: [
      "glucose-balance",
      "thyroid-balance",
      "belly-fat-balance",
      "glut4-metabolic-activation",
    ],
  },
  {
    name: "Mobility",
    slug: "mobility",
    description:
      "Joint, bone, and spinal support for pain-free movement, flexibility, and structural resilience.",
    icon: "Bone",
    color: "#1B2A4A",
    productIds: ["joint-bone", "lumbar-restore"],
  },
  {
    name: "Vision",
    slug: "vision",
    description:
      "Targeted eye nutrition with carotenoids and antioxidants for lasting visual clarity and protection.",
    icon: "Eye",
    color: "#1B2A4A",
    productIds: ["vision-support"],
  },
  {
    name: "Detox",
    slug: "detox",
    description:
      "Kidney and detoxification support for internal purification, fluid balance, and waste elimination.",
    icon: "Droplets",
    color: "#1B2A4A",
    productIds: ["kidney-restore", "respiratory-shield", "gerd-respiratory", "ulcer-care"],
  },
  {
    name: "Wellness",
    slug: "wellness",
    description:
      "Broad wellness formulas for vitality, feminine health, masculine health, circulation, oral care, intimate wellness, and blood health.",
    icon: "Heart",
    color: "#1B2A4A",
    productIds: [
      "vitality",
      "womb-renewal",
      "varicose-veins-support",
      "fresh-breath",
      "libido-support",
      "blood-booster-pro",
      "female-fertility",
      "male-fertility",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Look up a single product by its slug id. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.id === slug);
}

/** Return all products belonging to a given series slug. */
export function getProductsBySeries(seriesSlug: string): Product[] {
  return products.filter((p) => p.seriesSlug === seriesSlug);
}

/** Return the first 6 products as featured selections. */
export function getFeaturedProducts(): Product[] {
  return products.slice(0, 6);
}

/** Return the full series catalogue. */
export function getAllSeries(): Series[] {
  return series;
}
