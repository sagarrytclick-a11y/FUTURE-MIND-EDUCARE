"use client"
import React from 'react';
import { usePopup } from '../contexts/PopupContext';

const AwardsAchievementsSection: React.FC = () => {
  const { openPopup } = usePopup();
  return (
    <section className="py-16 px-4 bg-linear-to-r from-blue-900 to-blue-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Document Images */}
          <div className="lg:w-1/2 relative">
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              {/* First Document */}
              <div className="relative z-10 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <img
                  src="https://argroupofeducation.com/wp-content/uploads/elementor/thumbs/AR-Group-of-Education_page-0001-1-qn31g6ia73qcl8addivrjtram0igpuw0octpj2mfck.jpg"
                  alt="Award Certificate 1"
                  className="w-48 h-64 object-cover rounded-lg shadow-2xl"
                />
              </div>
              {/* Second Document */}
              <div className="relative transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
                <img
                  src="https://argroupofeducation.com/wp-content/uploads/elementor/thumbs/A-R-Group-of-Education_page-0001-1-e1713787042396-qn31gguiaa4i4xvcp5cnt95d593i2j12ds01t473g4.jpg"
                  alt="Award Certificate 2"
                  className="w-48 h-64 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Section Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-orange-500 mb-6">
              Awards & Achievements
            </h2>
            
            {/* Description */}
            <p className="text-white text-lg leading-relaxed mb-8">
              With more than 19 years of experience, Future Mind Educare is leading consultancy to provide top education in India or abroad. For young and aspiring doctors, we have served to bring out best in them.
            </p>
            
            {/* Call to Action Button */}
            <button 
              onClick={openPopup}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center group">
              Get Consult Now
              <svg 
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsAchievementsSection;
