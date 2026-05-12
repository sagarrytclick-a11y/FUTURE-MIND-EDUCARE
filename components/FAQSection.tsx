"use client"
import React, { useState, useMemo } from 'react';
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
  const [filteredCategory, setFilteredCategory] = useState<string>('All');

  const faqs: FAQ[] = [
    {
      question: "What is NEET UG?",
      answer:
        "NEET UG (National Eligibility cum Entrance Test - Undergraduate) is a national-level medical entrance exam conducted in India for admission to MBBS, BDS, and other undergraduate medical courses.",
      category: "General"
    },
    {
      question: "What is the eligibility criteria for NEET UG?",
      answer:
        "Candidates must have completed 17 years of age and passed 10+2 with Physics, Chemistry, Biology, and English.",
      category: "Eligibility"
    },
    {
      question: "How many times can I attempt NEET UG?",
      answer:
        "There is no limit on the number of attempts for NEET UG.",
      category: "Exam Rules"
    },
    {
      question: "What is NEET UG exam pattern?",
      answer:
        "NEET UG consists of Physics, Chemistry, and Biology with multiple-choice questions.",
      category: "Exam Pattern"
    },
    {
      question: "How are NEET UG seats allotted?",
      answer:
        "Seats are allotted through AIQ, State Quota, and other counseling processes.",
      category: "Admission Process"
    },
    {
      question: "What documents are required for MBBS admission?",
      answer:
        "10th & 12th mark sheets, NEET scorecard, ID proof, photographs, and certificates are required.",
      category: "Documentation"
    },
    {
      question: "Can I get MBBS admission without NEET UG?",
      answer:
        "NEET UG is mandatory for most MBBS admissions in India.",
      category: "Admission Process"
    },
    {
      question: "What is the minimum NEET score required?",
      answer:
        "Cutoff depends on category and college type.",
      category: "Scoring"
    }
  ];

  const categories = [
    "All",
    ...new Set(faqs.map((faq) => faq.category))
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filteredCategory === "All" ||
        faq.category === filteredCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filteredCategory]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white overflow-x-hidden to-blue-50">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            FAQs
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Find answers related to NEET, MBBS admissions, counseling,
            eligibility, and more.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 pl-10 sm:pl-12 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <svg
              className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
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

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilteredCategory(category)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filteredCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left p-4 sm:p-6"
              >
                <div>
                  <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg mb-2 sm:mb-3">
                    {faq.category}
                  </span>

                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-2">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`ml-4 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  activeIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center text-white shadow-2xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Still Have Questions?
            </h3>

            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8">
              Talk to our expert counselors and get complete guidance
              for MBBS admission in India & Abroad.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={openPopup}
                className="bg-white text-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Talk to Expert
              </button>

              <button
                onClick={openPopup}
                className="bg-blue-500 border border-white/20 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold hover:bg-blue-400 transition-all duration-300 text-sm sm:text-base"
              >
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