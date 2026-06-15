import type { Metadata } from "next";
import { getProducts, getAllSeries } from '@/lib/content';
import Hero from '@/components/home/Hero';
import BotanicalsShowcase from '@/components/home/BotanicalsShowcase';
import PremiumOfferBanner from '@/components/home/PremiumOfferBanner';
import StatsBar from '@/components/home/StatsBar';
import ShopBySeries from '@/components/home/ShopBySeries';
import FounderSection from '@/components/home/FounderSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import IngredientsShowcase from '@/components/home/IngredientsShowcase';
import Testimonials from '@/components/home/Testimonials';
import TrustBadges from '@/components/home/TrustBadges';
import CTABanner from '@/components/home/CTABanner';
import Newsletter from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: "McFuntain Nutraceuticals | Nature Refined for Better Living",
  description: "Premium herbal supplements crafted with science-backed formulations. Explore our 7 product series for cellular health, cognitive clarity, metabolic balance, and whole-body wellness.",
};

export const revalidate = 60;

export default async function Home() {
  const [products, series] = await Promise.all([getProducts(), getAllSeries()]);
  return (
    <>
      <Hero videoBg />
      <StatsBar />
      <BotanicalsShowcase />
      <PremiumOfferBanner />
      <WhyChooseUs />
      <ShopBySeries products={products} series={series} />
      <HowItWorks />
      <IngredientsShowcase />
      <Testimonials />
      <FounderSection />
      <TrustBadges />
      <CTABanner />
      <Newsletter />
    </>
  );
}
