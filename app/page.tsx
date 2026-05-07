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
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <FlagSlider />
      
      {/* Flag Slider Section */}
      
      {/* Who We Are Section */}
      <WhoWeAre />
      
      {/* Progress in Numbers Section */}
      <ProgressInNumbers />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Top Countries Section */}
        <TopCountriesSection />
       

       
      {/* Target Sectors Section */}
      <TargetSectorsSection />
      
      {/* Awards & Achievements Section */}
      <AwardsAchievementsSection />
      
      {/* Top Universities Section */}
        <TopUniversitiesSection />
      
      {/* Top States Section */}
      <TopStatesSection />
      
      {/* All Colleges CTA */}
    
      
      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Blog Section */}
        <BlogSection />
      
      {/* Airport Diaries Section */}
      <AirportDiariesSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Additional content can be added here */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Journey to Medical Excellence Starts Here
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive guidance for MBBS admissions in India and abroad. 
              Let our experts help you achieve your dream of becoming a doctor.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
    </div>
  );
}
