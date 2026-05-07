"use client"
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const FAQSection: React.FC = () => {
  const { openPopup } = usePopup();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is NEET UG?",
      answer: "NEET UG (National Eligibility cum Entrance Test - Undergraduate) is a national-level medical entrance exam conducted in India for admission to MBBS, BDS, and other undergraduate medical courses.",
      category: "General"
    },
    {
      question: "What is the eligibility criteria for NEET UG?",
      answer: "Candidates must have completed 17 years of age and passed 10+2 or equivalent with Physics, Chemistry, Biology, and English as main subjects. Minimum age: 17 years, Maximum age: 25 years (30 years for reserved categories).",
      category: "Eligibility"
    },
    {
      question: "How many times can I attempt NEET UG?",
      answer: "There is no limit on the number of attempts for NEET UG. Candidates can appear for the exam as many times as they want until they qualify or exhaust their maximum age limit.",
      category: "Exam Rules"
    },
    {
      question: "What is NEET UG exam pattern?",
      answer: "NEET UG is a 3-hour and 20-minute exam with 180 multiple-choice questions. Subjects: Physics (45), Chemistry (45), Biology (90). Each correct answer: +4 marks, Wrong answer: -1 mark.",
      category: "Exam Pattern"
    },
    {
      question: "How are NEET UG seats allotted?",
      answer: "Seats are allotted through All India Quota (15%), State Quota (85%), and Central/Institutions Quota. 15% AIQ seats are reserved for All India candidates, 85% for state candidates.",
      category: "Admission Process"
    },
    {
      question: "What documents are required for MBBS admission?",
      answer: "Required documents include: 10th and 12th mark sheets, NEET UG scorecard, birth certificate, domicile certificate, passport photographs, category certificate (if applicable), and Aadhar card.",
      category: "Documentation"
    },
    {
      question: "Can I get MBBS admission without NEET UG?",
      answer: "Yes, through management quota, NRI quota, or direct admission in private colleges. However, NEET UG is mandatory for government colleges and most reputed institutions.",
      category: "Admission Process"
    },
    {
      question: "What is the minimum NEET UG score required for MBBS?",
      answer: "General category: 550-600 marks, OBC: 500-550 marks, SC/ST: 400-450 marks. Cut-off varies by college and category. Government colleges typically require higher scores.",
      category: "Scoring"
    },
    {
      question: "What is the fee structure for MBBS in India?",
      answer: "Government colleges: ₹10,000 - ₹50,000 per year, Private colleges: ₹10,00,000 - ₹25,00,000 per year. Fees vary by college type, location, and facilities.",
      category: "Fees"
    },
    {
      question: "What is the duration of MBBS course?",
      answer: "MBBS course duration is 5.5 years including 1 year of compulsory internship. 4.5 years of academic study + 1 year rotating internship.",
      category: "Course Details"
    },
    {
      question: "Which are the top medical colleges in India?",
      answer: "AIIMS Delhi, PGIMER Chandigarh, CMC Vellore, JIPMER Puducherry, Maulana Azad Medical College Delhi, KGMU Lucknow, and Grant Medical College Mumbai are among the top institutions.",
      category: "Colleges"
    },
    {
      question: "What is the counseling process for MBBS admission?",
      answer: "MCC conducts 2 rounds of counseling for AIQ seats, followed by mop-up round. States conduct separate counseling for state quota seats. Registration is mandatory for participation.",
      category: "Counseling"
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about MBBS admissions, NEET exam, 
            and medical education. Get clarity on your path to becoming a doctor.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['General', 'Eligibility', 'Exam Pattern', 'Admission Process', 'Documentation', 'Scoring', 'Fees', 'Course Details', 'Colleges', 'Counseling'].map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs
            .filter(faq => {
              const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               faq.category.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCategory = !filteredCategory || faq.category === filteredCategory;
              return matchesSearch && matchesCategory;
            })
            .map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                activeIndex !== null && Math.floor(activeIndex / 5) === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {/* Question */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      {faq.category}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our expert counselors are here to help you with personalized guidance for your medical journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openPopup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a42 42 0 01.678.094l11.822 11.822a2 2 0 01.586.586H4.414a2 2 0 01-.586-.586L7.586 16.414a2 2 0 01.586-.586H16a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2v4a2 2 0 012 2h6a2 2 0 012-2V5z" />
                </svg>
                Ask an Expert
              </button>
              <button 
                onClick={openPopup}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3 3m3-3l3 3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707L19.586 12.414A1 1 0 0119 11.586l-5.414-5.414A1 1 0 0113 5.586z" />
                </svg>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
