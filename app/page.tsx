import type { Metadata } from "next";
import { buildMetadata, faqLd, JsonLd } from "@/app/config/seo-utils";
import { HOME_FAQS } from "@/lib/faq-data";

export const metadata: Metadata = buildMetadata({
  title: "MBBS Admission Consultants in Mumbai - Future Mind Educare",
  description:
    "Future Mind Educare helps you secure MBBS seats in India and abroad. 5000+ students counselled, 50+ partner colleges, expert NEET UG counselling from Andheri East, Mumbai.",
  path: "/",
  keywords: [
    "mbbs admission consultant",
    "mbbs admission mumbai",
    "neet ug counselling",
    "mbbs colleges india and abroad",
    "medical education consultant",
  ],
});

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

const TopCountriesSection = dynamic(() => import("@/components/TopCountriesSection"));
const WhoWeAre = dynamic(() => import("@/components/WhoWeAre"));
const ProgressInNumbers = dynamic(() => import("@/components/ProgressInNumbers"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const TargetSectorsSection = dynamic(() => import("@/components/TargetSectorsSection"));
const AwardsAchievementsSection = dynamic(() => import("@/components/AwardsAchievementsSection"));
const TopUniversitiesSection = dynamic(() => import("@/components/TopUniversitiesSection"));
const TopStatesSection = dynamic(() => import("@/components/TopStatesSection"));
const TestimonialSection = dynamic(() => import("@/components/TestimonialSection"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const AirportDiariesSection = dynamic(() => import("@/components/AirportDiariesSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const PopupModal = dynamic(() => import("@/components/PopupModal"));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={faqLd(HOME_FAQS)} />
      <HeroSection />
      <TargetSectorsSection />
      <TopCountriesSection />
      <WhoWeAre />
      <ProgressInNumbers />
      <ServicesSection />
      <AwardsAchievementsSection />
      <TopUniversitiesSection />
      <TopStatesSection />
      <TestimonialSection />
      <BlogSection />
      <AirportDiariesSection />
      <FAQSection />
      <PopupModal />
    </div>
  );
}
