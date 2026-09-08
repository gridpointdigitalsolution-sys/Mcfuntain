"use client";

import { useState } from "react";
import { socialLinks } from "@/data/social";
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


/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !email.trim()) return;
    setSending(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        // Never show "thank you for subscribing" for a signup that failed.
        setErrorMsg(data.error || "We could not complete your subscription. Please try again later.");
        return;
      }
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    } catch {
      setErrorMsg("We could not reach the server. Please check your connection and try again.");
    } finally {
      setSending(false);
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
                  aria-label="Email address"
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-gold/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-gold/30"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex h-12 items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold to-gold-deep px-5 text-sm font-semibold text-white shadow-md shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending" : "Subscribe"}
                <ArrowRight size={14} />
              </button>
            </form>

            {errorMsg && (
              <p role="alert" className="mt-3 text-sm font-medium text-gold-light">
                {errorMsg}
              </p>
            )}

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
                  social.href ? (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/10 hover:text-gold-light"
                    >
                      <Icon />
                    </a>
                  ) : (
                    // No confirmed URL yet — show the mark, never a dead link.
                    <span
                      key={social.name}
                      aria-label={`${social.name} — coming soon`}
                      title={`${social.name} — coming soon`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30"
                    >
                      <Icon />
                    </span>
                  )
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
              Gwynn Oak, Maryland, USA
            </span>

            <span className="flex items-center gap-1.5 text-sm text-white/50">
              <Award size={12} className="text-gold/60" />
              Manufactured in the USA
            </span>
          </div>
        </div>

        {/* ---- Designer credit ---- */}
        <div className="border-t border-white/10 py-5 text-center">
          <p className="text-xs tracking-wide text-white/45">
            Designed by <span className="font-semibold text-white/70">Churchill Bracknell</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
