/**
 * The brand's social profiles — one list, used by the footer, the hero rail and
 * the Organization `sameAs` in the root layout.
 *
 * Kept in one place because `sameAs` is how Google decides which accounts
 * represent the business: if the footer and the structured data disagree, or a
 * handle is wrong, customers and Google are pointed at someone else's account.
 */
export type SocialLink = {
  /** Full name, used as the accessible label. */
  name: string;
  /** Two-letter mark for the compact hero rail. */
  short: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', short: 'Fb', href: 'https://facebook.com/mcfuntain' },
  { name: 'Instagram', short: 'Ig', href: 'https://instagram.com/mcfuntain' },
  { name: 'X', short: 'X', href: 'https://x.com/mcfuntain' },
  { name: 'YouTube', short: 'Yt', href: 'https://youtube.com/@mcfuntain' },
  { name: 'LinkedIn', short: 'In', href: 'https://linkedin.com/company/mcfuntain' },
];
