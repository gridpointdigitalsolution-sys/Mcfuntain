import type { Metadata } from "next";
import { Playfair_Display, Inter, Oswald } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcfuntain.com"),
  title: "McFuntain Nutraceuticals | Nature Refined for Better Living",
  description:
    "Premium herbal supplements crafted with science-backed formulations. McFuntain Nutraceuticals delivers nature-refined solutions for cellular health, cognitive clarity, metabolic balance, and whole-body wellness.",
  keywords: [
    "herbal supplements",
    "nutraceuticals",
    "natural health",
    "premium supplements",
    "McFuntain",
  ],
  openGraph: {
    title: "McFuntain Nutraceuticals | Nature Refined for Better Living",
    description:
      "Premium herbal supplements crafted with science-backed formulations for better living.",
    type: "website",
    locale: "en_US",
    siteName: "McFuntain Nutraceuticals",
  },
  twitter: {
    card: "summary_large_image",
    title: "McFuntain Nutraceuticals | Nature Refined for Better Living",
    description:
      "Premium herbal supplements crafted with science-backed formulations for better living.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${oswald.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "McFuntain Nutraceuticals",
              url: "https://mcfuntain.com",
              description:
                "Premium herbal supplements crafted with science-backed formulations",
              founder: {
                "@type": "Person",
                name: "Rev. Dr. Gideon Afolabi",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gwynn Oak",
                addressRegion: "MD",
                addressCountry: "US",
              },
            }),
          }}
        />
        <Preloader />
        <CursorGlow />
        <CartProvider>
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
