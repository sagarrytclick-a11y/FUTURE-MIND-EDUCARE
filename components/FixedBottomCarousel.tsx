"use client"
import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const FixedBottomCarousel: React.FC = () => {
  const countries = [
    "Russia",
    "Georgia", 
    "Kazakhstan",
    "Philippines",
    "China",
    "Ukraine",
    "Bangladesh",
    "Nepal",
    "Armenia",
    "Kyrgyzstan",
    "Belarus",
    "Egypt"
  ];

  const [duplicatedCountries] = useState([...countries, ...countries, ...countries]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 border-t border-blue-700 shadow-lg z-50">
      <div className="py-3 px-4">
        <div className="overflow-hidden">
          <div className="flex animate-slide">
            {duplicatedCountries.map((country, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <FaPaperPlane className="text-white text-sm" />
                <span className="text-white font-medium">MBBS in</span>
                <span className="text-white font-semibold hover:text-yellow-300 transition-colors">
                  {country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-slide {
          animation: slide 15s linear infinite;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default FixedBottomCarousel;
