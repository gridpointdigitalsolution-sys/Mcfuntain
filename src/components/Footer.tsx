"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  ArrowRight,
  Award,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const productLinks = [
  { name: "Cellular Series", href: "/shop?series=cellular" },
  { name: "Neuro Series", href: "/shop?series=neuro" },
  { name: "Metabolic Series", href: "/shop?series=metabolic" },
  { name: "Mobility Series", href: "/shop?series=mobility" },
  { name: "Vision Series", href: "/shop?series=vision" },
  { name: "Detox Series", href: "/shop?series=detox" },
  { name: "Wellness Series", href: "/shop?series=wellness" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Founder", href: "/about#founder" },
  { name: "Science & Research", href: "/science" },
  { name: "Blog", href: "/blog" },
];

const supportLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns & Refunds", href: "/returns" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

/* Inline SVG social icons (brand icons removed from lucide-react v1.x) */
const SocialFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796v8.437C19.612 23.093 24 18.098 24 12.073" />
  </svg>
);
const SocialInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.428.403a4.088 4.088 0 0 1 1.513.982 4.088 4.088 0 0 1 .982 1.513c.163.458.35 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.428a4.088 4.088 0 0 1-.982 1.513 4.088 4.088 0 0 1-1.513.982c-.458.163-1.258.35-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.428-.403a4.088 4.088 0 0 1-1.513-.982 4.088 4.088 0 0 1-.982-1.513c-.163-.458-.35-1.258-.403-2.428C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.428a4.088 4.088 0 0 1 .982-1.513 4.088 4.088 0 0 1 1.513-.982c.458-.163 1.258-.35 2.428-.403C8.416 2.175 8.796 2.163 12 2.163M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.902.333 4.14.63a6.21 6.21 0 0 0-2.245 1.462A6.21 6.21 0 0 0 .433 4.337C.136 5.1-.066 5.972-.008 7.25-.07 8.53-.084 8.938-.084 12.197s.014 3.668.072 4.948c.058 1.277.26 2.15.558 2.912a6.21 6.21 0 0 0 1.462 2.245 6.21 6.21 0 0 0 2.245 1.462c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.26 2.912-.558a6.21 6.21 0 0 0 2.245-1.462 6.21 6.21 0 0 0 1.462-2.245c.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.26-2.15-.558-2.912a6.21 6.21 0 0 0-1.462-2.245A6.21 6.21 0 0 0 19.86.633C19.1.336 18.226.134 16.948.075 15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);
const SocialX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
const SocialYouTube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
  </svg>
);
const SocialLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.882 20.452H3.793V9h3.09v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.205 24 24 23.227 24 22.271V1.729C24 .774 23.205 0 22.225 0Z" />
  </svg>
);

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/mcfuntain", icon: SocialFacebook },
  { name: "Instagram", href: "https://instagram.com/mcfuntain", icon: SocialInstagram },
  { name: "X", href: "https://x.com/mcfuntain", icon: SocialX },
  { name: "YouTube", href: "https://youtube.com/@mcfuntain", icon: SocialYouTube },
  { name: "LinkedIn", href: "https://linkedin.com/company/mcfuntain", icon: SocialLinkedIn },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-ink text-white/80">
      {/* ---- Gold accent line at top ---- */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ================================================================ */}
      {/*  Top section: Logo, tagline, brand statement                     */}
      {/* ================================================================ */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center pt-16 pb-12 text-center">
          <Link href="/" aria-label="Back to homepage">
            <Image
              src="/images/brand/logo-light.png"
              alt="McFuntain Nutraceuticals"
              width={600}
              height={600}
              className="mb-5 h-[150px] w-auto rounded-2xl shadow-[0_18px_45px_-15px_rgba(0,0,0,0.6)] ring-1 ring-gold/25 md:h-[190px] hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
          <p className="font-heading text-2xl tracking-wide text-gold-light md:text-3xl">
            Nature Refined for Better Living
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/50">
            Science-backed herbal formulations designed to unlock your body's
            full potential. Every product is thoughtfully crafted for purity,
            potency, and premium quality.
          </p>
        </div>

        {/* ---- Divider ---- */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ================================================================ */}
        {/*  Main grid: links + newsletter                                   */}
        {/* ================================================================ */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* -- Products -- */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -- Company -- */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -- Support -- */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal sub-section */}
            <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-base text-white/70 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -- Newsletter -- */}
          <div className="lg:col-span-5">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Stay Informed
            </h3>
            <p className="mb-5 text-base leading-relaxed text-white/65">
              Join our newsletter for the latest in nutraceutical science,
              exclusive offers, and wellness insights delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-gold/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-gold/30"
                />
              </div>
              <button
                type="submit"
                className="flex h-12 items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold to-gold-deep px-5 text-sm font-semibold text-white shadow-md shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 text-sm font-medium text-gold-light">
                Thank you for subscribing!
              </p>
            )}

            {/* Social links */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/10 hover:text-gold-light"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---- Divider ---- */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ================================================================ */}
        {/*  Trust strip                                                     */}
        {/* ================================================================ */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
          {['GMP-Compliant Facility', 'Third-Party Tested', 'Non-GMO', 'Made in the USA'].map((t, i) => (
            <span key={t} className="flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/60" />}
              <span className="text-white/55">{t}</span>
            </span>
          ))}
        </div>

        {/* ---- Divider ---- */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ================================================================ */}
        {/*  FDA Disclaimer                                                  */}
        {/* ================================================================ */}
        <div className="py-6">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/45">
            * These statements have not been evaluated by the Food and Drug
            Administration. These products are not intended to diagnose, treat,
            cure, or prevent any disease. Consult your healthcare provider
            before starting any supplement regimen.
          </p>
        </div>

        {/* ---- Divider ---- */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ================================================================ */}
        {/*  Bottom bar                                                      */}
        {/* ================================================================ */}
        <div className="flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} McFuntain Nutraceuticals. All
            rights reserved.
          </p>

          {/* Address & Made in USA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-1.5 text-sm text-white/50">
              <MapPin size={12} className="text-gold/60" />
              11 Brubar Court, Gwynn Oak, MD, USA
            </span>

            <span className="flex items-center gap-1.5 text-sm text-white/50">
              <Award size={12} className="text-gold/60" />
              Manufactured in the USA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
