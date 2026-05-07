"use client"
import React from 'react';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  position: 'left' | 'right';
}

const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: "100% Admission",
      description: "From university selection to all the paperwork, we provide complete guidance for your admission that helps to sunshine career.",
      icon: "🏢",
      position: "left"
    },
    {
      title: "Free Counseling",
      description: "We offer free career counseling to students and parents. Our counselors have vast expertise in helping students pursue medicine.",
      icon: "💬",
      position: "left"
    },
    {
      title: "95% Visa Acceptance",
      description: "Obtain a free visa application and the greatest airfare for your flights to ensure you receive the most benefits possible.",
      icon: "✈️",
      position: "left"
    },
    {
      title: "University/Course selection",
      description: "We help to select the best one for your bright future. AR Group has a team of experts that guide you in your journey.",
      icon: "🎓",
      position: "right"
    },
    {
      title: "Customized Approach",
      description: "AR Group takes pride in being recognized as a top study abroad consultancy. Our students' customized approaches differentiate them from others.",
      icon: "🔄",
      position: "right"
    },
    {
      title: "Pre-departure Services",
      description: "Pre-departure services help to positive student experience. Candidates learn about international life, multicultural diversity, etc.",
      icon: "🌍",
      position: "right"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Services At Future Mind Educare
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Future Mind Educare, we provide you with the best services that make your studying MBBS abroad or in India much easier, simpler, and hassle-free so that you enjoy maximum benefits!
          </p>
        </div>

        {/* Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side Services */}
          <div className="space-y-6">
            {services.filter(service => service.position === 'left').map((service, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="shrink-0 text-3xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Central Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/docter.png"
                alt="Doctor with medical elements"
                className="w-full max-w-sm h-auto"
              />
            </div>
          </div>

          {/* Right Side Services */}
          <div className="space-y-6">
            {services.filter(service => service.position === 'right').map((service, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="shrink-0 text-3xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
