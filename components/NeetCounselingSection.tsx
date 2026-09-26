"use client"
import React from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';

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
      description: "Expert guidance for NEET UG admissions. Get personalized counseling based on your rank, score, and preferences.",
      icon: "🎯",
      features: ["Personalized Counseling", "College Selection", "Rank Prediction"]
    },
    {
      id: 2,
      title: "NEET PG Counselling",
      description: "Complete assistance for MD/MS/PG admissions through NEET PG counseling and specialization selection.",
      icon: "🩺",
      features: ["Specialization Guidance", "College Selection", "Admission Support"]
    },
    {
      id: 3,
      title: "NEET UG Rank Predictor",
      description: "Predict your NEET UG rank based on your score using our advanced algorithm and college predictions.",
      icon: "📊",
      features: ["Score Analysis", "Rank Prediction", "College Predictions"]
    },
    {
      id: 4,
      title: "MBBS Admission Guidance",
      description: "Comprehensive support for direct MBBS admissions in India and abroad, from application to admission.",
      icon: "🎓",
      features: ["Direct Admission", "Documentation Support", "Visa Assistance"]
    },
    {
      id: 5,
      title: "Career Counseling",
      description: "Professional career counseling for medical aspirants exploring paths in the healthcare sector.",
      icon: "💼",
      features: ["Career Guidance", "Path Planning", "Industry Insights"]
    },
    {
      id: 6,
      title: "Document Verification",
      description: "Help with verification of educational documents and certificates to keep paperwork complete.",
      icon: "📋",
      features: ["Document Check", "Authentication", "Legal Support"]
    }
  ];

  return (
    <Section spacing="md" className="bg-gray-50">
        <SectionHeading
          eyebrow="Expert Guidance"
          title="NEET Counseling Services"
          description="Comprehensive NEET counseling to help you secure admission in your dream medical college."
        />

        {/* Numbered steps timeline */}
        <div className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute top-[18px] left-8 right-8 h-0.5 bg-blue-100" />
          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5">
            {services.map((service, index) => (
              <li key={service.id} className="group flex gap-3 bg-white hover:bg-brand-950 border border-slate-200 hover:border-brand-900 rounded-2xl p-3.5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10 flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-brand-950 group-hover:bg-accent-400 text-white group-hover:text-brand-950 text-sm font-bold transition-colors duration-300">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-brand-950 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-slate-300 line-clamp-1 transition-colors duration-300">
                    {service.description}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600 group-hover:text-slate-400 line-clamp-1 transition-colors duration-300">
                    {service.features.join(' · ')}
                  </p>
                  <button className="mt-1 text-xs font-semibold text-brand-950 group-hover:text-accent-400 transition-colors duration-300">
                    Get Started →
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-4">
            Our experienced counselors have helped thousands of students secure admission in
            top medical colleges across India and abroad. Book your free counseling session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white text-sm font-bold transition-colors">
              Book Free Counseling
            </button>
            <button className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-accent-100 hover:bg-accent-400 hover:text-brand-950 text-brand-950 text-sm font-bold transition-colors">
              View All Services
            </button>
          </div>
        </div>
    </Section>
  );
};

export default NeetCounselingSection;
