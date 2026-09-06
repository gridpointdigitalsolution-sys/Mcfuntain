import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js).
 *
 * The Measurement ID is public by design — it ships in the page source of every
 * site that uses GA — so it is safe to keep a literal fallback here. Set
 * NEXT_PUBLIC_GA_ID to override it (e.g. for a staging property).
 *
 * Renders nothing outside production so local dev and preview builds do not
 * pollute the real property with test traffic.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-1WY0V793Z8';

export default function Analytics() {
  if (process.env.NODE_ENV !== 'production' || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
