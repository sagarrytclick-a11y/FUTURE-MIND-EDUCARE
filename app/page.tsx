import HeroSection from "@/components/HeroSection";
import FlagSlider from "@/components/FlagSlider";
import WhoWeAre from "@/components/WhoWeAre";
import ProgressInNumbers from "@/components/ProgressInNumbers";
import ServicesSection from "@/components/ServicesSection";
import TopCountriesSection from "@/components/TopCountriesSection";
import TargetSectorsSection from "@/components/TargetSectorsSection";
import AwardsAchievementsSection from "@/components/AwardsAchievementsSection";
import TopUniversitiesSection from "@/components/TopUniversitiesSection";
import TopStatesSection from "@/components/TopStatesSection";
import TestimonialSection from "@/components/TestimonialSection";
import BlogSection from "@/components/BlogSection";
import AirportDiariesSection from "@/components/AirportDiariesSection";
import FAQSection from "@/components/FAQSection";
import MbbsCard from "@/components/MbbsCard";
import PopupModal from "@/components/PopupModal";

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
