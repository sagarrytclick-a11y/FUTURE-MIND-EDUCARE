'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const FlagSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  const countries = [
    { name: 'India', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/india.svg', code: 'IN', description: 'Top Medical Colleges' },
    { name: 'Bangladesh', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/bangladesh.svg', code: 'BD', description: 'Affordable Education' },
    { name: 'Kyrgyzstan', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/kyrgyzstan.svg', code: 'KG', description: 'Quality Medical Education' },
    { name: 'Kazakhstan', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/kazakhstan.svg', code: 'KZ', description: 'Modern Facilities' },
    { name: 'Uzbekistan', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/uzbekistan.svg', code: 'UZ', description: 'Recognized Universities' },
    { name: 'Georgia', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/georgia.svg', code: 'GE', description: 'European Standards' },
    { name: 'Russia', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/russia-1.svg', code: 'RU', description: 'Historic Medical Tradition' },
    { name: 'Nepal', flag: 'https://argroupofeducation.com/wp-content/uploads/2024/04/nepal-1.svg', code: 'NP', description: 'Affordable Education' }
  ];

  const duplicatedCountries = [...countries, ...countries];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Global <span className="text-blue-600">Educational</span> Hubs
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Explore top-tier medical universities and educational opportunities across the globe.
        </p>
      </div>

      <div className="relative w-full">
        {/* Masking for Light Mode - Fades to White */}
        <div 
          className="flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <motion.div
            className="flex items-center py-4"
            animate={{
              x: isPaused ? 0 : ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, 
                ease: "linear",
              },
            }}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
          >
            {duplicatedCountries.map((country, index) => (
              <div
                key={`${country.code}-${index}`}
                className="flex-shrink-0 w-[300px] px-4"
              >
                <div className="bg-[#F8FAFC] border border-slate-200 hover:border-blue-600/40 p-5 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1">
                  
                  <div className="flex items-center space-x-4">
                    <div className="relative shrink-0">
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="w-16 h-12 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 border border-slate-100"
                      />
                    </div>

                    <div className="text-left">
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {country.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlagSlider;