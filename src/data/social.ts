import type { ComponentType } from 'react';
import {
  SocialFacebook,
  SocialInstagram,
  SocialTikTok,
  SocialX,
  SocialYouTube,
} from '@/components/icons/SocialIcons';

/**
 * The brand's social profiles — one list, used by the footer, the hero rail and
 * the Organization `sameAs` in the root layout.
 *
 * Kept in one place because `sameAs` is how Google decides which accounts
 * represent the business: if the footer and the structured data disagree, or a
 * handle is wrong, customers and Google are pointed at someone else's account.
 *
 * Only the icon is ever shown. The `name` exists purely as the accessible label
 * for screen readers — it is never rendered as visible text.
 */
export type SocialLink = {
  /** Accessible label only; never displayed. */
  name: string;
  /** Null while a profile exists as a brand but has no confirmed URL yet. */
  href: string | null;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/McfuntainNutraceuticals/', icon: SocialFacebook },
  { name: 'Instagram', href: 'https://www.instagram.com/mcfuntain/', icon: SocialInstagram },
  { name: 'X', href: 'https://x.com/mcfuntain0', icon: SocialX },
  { name: 'YouTube', href: 'https://www.youtube.com/@McfuntainNutraceuticals', icon: SocialYouTube },
  // TikTok handle not supplied yet. Rendered as a non-interactive icon rather
  // than a link, so it never sends anyone to a page that does not exist. Add
  // the URL here and it becomes a real link everywhere automatically.
  { name: 'TikTok', href: null, icon: SocialTikTok },
];

/** Profiles with a confirmed URL — the only ones safe to hand to Google. */
export const linkedSocials = socialLinks.filter(
  (s): s is SocialLink & { href: string } => Boolean(s.href),
);
