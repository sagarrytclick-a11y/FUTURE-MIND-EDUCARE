"use client"
import React, { useState } from 'react';
import { usePopup } from '../contexts/PopupContext';
import { FaArrowRight, FaHeadset } from 'react-icons/fa';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import { HOME_FAQS } from '@/lib/faq-data';

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

  const faqs: FAQ[] = HOME_FAQS;

  const categories = [
    "All",
    ...new Set(faqs.map((faq) => faq.category))
  ];

  const search = searchTerm.toLowerCase();

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search);

    const matchesCategory =
      filteredCategory === "All" || faq.category === filteredCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section
      spacing="md"
      className="bg-white overflow-x-hidden"
    >
      {/* SPLIT — sticky heading + help card left, accordion right */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 sm:gap-8 items-start">
        <div className="lg:sticky top-header-gap">
          <SectionHeading
            align="left"
            className="!mb-0"
            eyebrow="FAQs"
            title="Frequently Asked Questions"
            description="Answers on NEET, MBBS admissions, counseling and eligibility."
          />

          {/* COMPACT HELP CARD */}
          <div className="mt-4 bg-brand-950 hover:bg-brand-900 rounded-2xl p-5 border border-brand-900 transition-colors duration-300">
            <div className="w-10 h-10 rounded-xl bg-accent-400 text-brand-950 flex items-center justify-center text-base mb-3">
              <FaHeadset />
            </div>
            <h3 className="font-bold text-white">
              Still have questions?
            </h3>
            <p className="text-gray-300 text-sm leading-6 mt-1">
              Talk to our counselors for MBBS guidance in India & abroad.
            </p>
            <button
              onClick={openPopup}
              className="group mt-3 inline-flex items-center gap-2 bg-white hover:bg-accent-100 text-brand-950 h-11 px-6 rounded-full text-sm font-bold transition-all duration-300"
            >
              Talk to Expert
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div className="min-w-0">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-10 text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
              />

              <svg
                className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
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
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilteredCategory(category)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all duration-300 ${
                  filteredCategory === category
                    ? 'bg-brand-950 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-accent-100 hover:text-brand-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
              {filteredCategory !== 'All' ? ` in ${filteredCategory}` : ''}
            </p>
            {(searchTerm || filteredCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilteredCategory('All');
                }}
                className="text-[11px] font-bold uppercase tracking-wide text-accent-600 hover:text-brand-950 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* FAQ List — 2 columns like beehive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 ${
                  activeIndex === index
                    ? 'border-accent-400 shadow-lg'
                    : 'border-slate-200 hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                  className="w-full flex items-start gap-3 text-left p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-[11px] font-extrabold text-brand-950 transition-colors duration-300 group-hover:bg-accent-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-accent-600">
                      {faq.category}
                    </span>
                    <span className="mt-1 block text-sm font-bold leading-snug text-brand-950">
                      {faq.question}
                    </span>
                  </span>

                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-brand-950 transition-all duration-300 ${
                      activeIndex === index
                        ? 'rotate-180 border-accent-400 bg-accent-400'
                        : 'group-hover:border-accent-400 group-hover:bg-accent-100'
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    activeIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mx-4 mb-4 rounded-xl border border-accent-100 bg-accent-100/40 px-3 py-2.5 text-sm leading-relaxed text-gray-700">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="md:col-span-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm font-bold text-brand-950">No questions found</p>
                <p className="mt-1 text-sm text-gray-600">
                  Try a different keyword or clear the filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;
