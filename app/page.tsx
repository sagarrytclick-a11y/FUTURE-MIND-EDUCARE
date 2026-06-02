import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import MbbsCard from "@/components/MbbsCard";

const FlagSlider = dynamic(() => import("@/components/FlagSlider"));
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
      <HeroSection />
      <MbbsCard />
      <FlagSlider />
      <TopCountriesSection />
      <WhoWeAre />
      <ProgressInNumbers />
      <ServicesSection />
      <TargetSectorsSection />
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
