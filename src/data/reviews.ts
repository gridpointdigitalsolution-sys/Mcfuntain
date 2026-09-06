/**
 * Real customer testimonials. Each one names the product it is about, so the
 * matching product page can emit it as schema.org Review structured data.
 * Shared by the homepage Testimonials carousel and the product JSON-LD.
 */
export interface Testimonial {
  name: string;
  location: string;
  product: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Margaret T.',
    location: 'Baltimore, MD',
    product: 'Divine Mitochondria Energy',
    rating: 5,
    text: 'After three weeks of consistent use, I noticed a genuine shift in my daily energy. No jitters, no crashes — just steady, clean vitality throughout the day. This is different from anything I\'ve tried before.',
  },
  {
    name: 'David O.',
    location: 'Houston, TX',
    product: 'Divine CogniBoost Restore',
    rating: 5,
    text: 'As someone who works 12-hour shifts, mental fog was my constant companion. CogniBoost changed that. My focus is sharper, my recall is better, and I feel more present in conversations.',
  },
  {
    name: 'Patricia K.',
    location: 'Atlanta, GA',
    product: 'Divine Joint & Bone',
    rating: 5,
    text: 'At 58, I had accepted that morning stiffness was just part of life. Two months with Joint & Bone, and I\'m moving with a freedom I haven\'t felt in years. My morning walks are a joy again.',
  },
  {
    name: 'Samuel A.',
    location: 'Chicago, IL',
    product: 'Divine Glucose Balance',
    rating: 5,
    text: 'My doctor was impressed with my latest blood work. Combined with diet changes and this supplement, my metabolic markers have improved significantly. I\'m grateful for this natural support.',
  },
  {
    name: 'Grace M.',
    location: 'Silver Spring, MD',
    product: 'Divine Longevity 50+',
    rating: 5,
    text: 'I bought this for my mother and she absolutely loves it. She says she feels more vibrant and her recovery after her walks has improved noticeably. We\'re now buying for the whole family.',
  },
  {
    name: 'James B.',
    location: 'Philadelphia, PA',
    product: 'Divine Vitality',
    rating: 5,
    text: 'I was skeptical at first, but the results speak for themselves. My stamina during workouts has improved, my energy is more consistent, and I genuinely feel more resilient. Quality product.',
  },
];

/** Testimonials written about a given product name (exact match). */
export function reviewsForProduct(productName: string): Testimonial[] {
  return testimonials.filter((t) => t.product === productName);
}
