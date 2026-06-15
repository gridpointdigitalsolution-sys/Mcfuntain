import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';

// Isolated preview — NOT linked anywhere, NOT in the sitemap.
// Shows the homepage hero with the faint cinematic video background turned ON,
// so the founder can compare before it goes live. The real homepage still
// renders <Hero /> with no video (videoBg defaults to false).
export const metadata = {
  title: 'Hero Video Preview (internal)',
  robots: { index: false, follow: false },
};

export default function HeroVideoPreviewPage() {
  return (
    <>
      <div className="bg-gold text-ink text-center text-sm font-semibold py-2 px-4">
        PREVIEW ONLY — faint video background. Not live. Compare with the real homepage at /
      </div>
      <Hero videoBg />
      <StatsBar />
    </>
  );
}
