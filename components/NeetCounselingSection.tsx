"use client"
import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const NeetCounselingSection: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "NEET UG Counselling",
      description: "Expert guidance for NEET UG admissions. Get personalized counseling based on your rank, score, and preferences. We help you choose the right medical college.",
      icon: "🎯",
      features: ["Personalized Counseling", "College Selection", "Rank Prediction"]
    },
    {
      id: 2,
      title: "NEET PG Counselling", 
      description: "Complete assistance for MD/MS/PG admissions through NEET PG counseling. We provide guidance for specialization selection and admission process.",
      icon: "🩺",
      features: ["Specialization Guidance", "College Selection", "Admission Support"]
    },
    {
      id: 3,
      title: "NEET UG Rank Predictor",
      description: "Predict your NEET UG rank based on your score using our advanced algorithm. Get accurate rank estimation and college predictions.",
      icon: "📊",
      features: ["Score Analysis", "Rank Prediction", "College Predictions"]
    },
    {
      id: 4,
      title: "MBBS Admission Guidance",
      description: "Comprehensive support for direct MBBS admissions in India and abroad. From application to admission, we handle everything.",
      icon: "🎓",
      features: ["Direct Admission", "Documentation Support", "Visa Assistance"]
    },
    {
      id: 5,
      title: "Career Counseling",
      description: "Professional career counseling for medical aspirants. Explore various career paths and opportunities in healthcare sector.",
      icon: "💼",
      features: ["Career Guidance", "Path Planning", "Industry Insights"]
    },
    {
      id: 6,
      title: "Document Verification",
      description: "Help with verification of educational documents and certificates. Ensure all your paperwork is complete and authentic.",
      icon: "📋",
      features: ["Document Check", "Authentication", "Legal Support"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            NEET Counseling Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive NEET counseling services to help you secure admission in your 
            dream medical college. Expert guidance at every step of your journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 cursor-pointer group"
            >
              {/* Service Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              {/* Service Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2a1 1 0 11-1.414L12 19a1 1 0 11-1.414 0 1.586z"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Our experienced counselors have helped thousands of students secure admission in 
            top medical colleges across India and abroad. Book your free counseling session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Free Counseling
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              View All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeetCounselingSection;
