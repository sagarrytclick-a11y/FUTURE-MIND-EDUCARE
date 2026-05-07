'use client';
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';

const HeroSection = () => {
  const { openPopup } = usePopup();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-[#12141D]">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="University Building"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay (The Secret to Readability) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141D]/80 via-[#12141D]/60 to-[#12141D]/90" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Welcome Text */}
          <div className="mb-8 space-y-2">
            <span className="text-[#00D4FF] font-semibold tracking-widest uppercase text-sm mb-4 block">
              Empowering Medical Education
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#F8FAFC] leading-tight drop-shadow-md">
              WELCOME TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00D4FF]">
                FUTURE MIND EDUCARE
              </span>
            </h1>

          </div>

          {/* Call to Action Button */}
          <div className="mt-10">
            <button
              onClick={openPopup}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ backgroundColor: isHovered ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)' }}
              className="text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center mx-auto gap-2"
            >
              Talk to our Experts
              <svg 
                className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;