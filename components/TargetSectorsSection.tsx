"use client"
import React from 'react';

interface SectorItem {
  title: string;
  description: string;
  icon: string;
}

const TargetSectorsSection: React.FC = () => {
  const sectors: SectorItem[] = [
    {
      title: "MBBS Abroad",
      description: "We help students pursue their medical education dreams in top international universities across Russia, China, Georgia, Philippines, and other countries with affordable fees and global recognition.",
      icon: "🌍"
    },
    {
      title: "MBBS India",
      description: "Guiding students through the complex admission process for Indian medical colleges, including NEET counseling, state quota seats, and management quota admissions.",
      icon: "🇮🇳"
    },
    {
      title: "MD/MS",
      description: "Assisting medical graduates in securing postgraduate seats in prestigious institutions for specialization in various medical fields with comprehensive guidance.",
      icon: "🎓"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Target Sectors
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We specialize in providing comprehensive guidance across multiple medical education pathways, 
            ensuring students find the perfect fit for their career aspirations and academic goals.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="text-center p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Sector Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">
                  {sector.icon}
                </span>
              </div>
              
              {/* Sector Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {sector.title}
              </h3>
              
              {/* Sector Description */}
              <p className="text-gray-600 leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            With years of experience and a proven track record, we have successfully placed thousands of students 
            in their dream medical institutions. Our expert counselors provide personalized guidance to help you 
            navigate the complex admission process with confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TargetSectorsSection;
