"use client"
import React, { useState } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';

interface College {
  id: number;
  name: string;
  country: string;
  fees: string;
  duration: string;
  recognition: string;
}

const MbbsAbroadSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedFeeRange, setSelectedFeeRange] = useState('all');

  const colleges: College[] = [
    {
      id: 1,
      name: "Tbilisi State Medical University",
      country: "Georgia",
      fees: "$5,000 - $8,000/year",
      duration: "6 years",
      recognition: "WHO, MCI, NMC approved"
    },
    {
      id: 2,
      name: "Kazakhstan Medical University",
      country: "Kazakhstan",
      fees: "$4,000 - $6,000/year",
      duration: "5 years",
      recognition: "WHO, MCI, NMC approved"
    },
    {
      id: 3,
      name: "Davao Medical School Foundation",
      country: "Philippines",
      fees: "$3,500 - $5,000/year",
      duration: "5 years",
      recognition: "WHO, MCI, NMC approved"
    },
    {
      id: 4,
      name: "Bangladesh Medical College",
      country: "Bangladesh",
      fees: "$4,000 - $7,000/year",
      duration: "6 years",
      recognition: "WHO, BMDC, NMC approved"
    },
    {
      id: 5,
      name: "Kyrgyz State Medical Academy",
      country: "Kyrgyzstan",
      fees: "$3,000 - $5,500/year",
      duration: "5 years",
      recognition: "WHO, MCI, NMC approved"
    },
    {
      id: 6,
      name: "Serbian Medical Universities",
      country: "Serbia",
      fees: "$6,000 - $8,000/year",
      duration: "6 years",
      recognition: "WHO, MCI, NMC approved"
    }
  ];

  const countries = ['all', 'Georgia', 'Kazakhstan', 'Philippines', 'Bangladesh', 'Kyrgyzstan', 'Serbia'];
  const feeRanges = ['all', 'low', 'medium', 'high'];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || college.country === selectedCountry;
    const matchesFeeRange = selectedFeeRange === 'all' ||
      (selectedFeeRange === 'low' && college.fees.includes('$3,000')) ||
      (selectedFeeRange === 'medium' && college.fees.includes('$5,000')) ||
      (selectedFeeRange === 'high' && college.fees.includes('$6,000'));

    return matchesSearch && matchesCountry && matchesFeeRange;
  });

  return (
    <Section spacing="md" className="bg-slate-50">
        <SectionHeading
          eyebrow="Find Your University"
          title="MBBS Abroad - Search Colleges"
          description="Filter WHO-approved medical colleges abroad by country, fees, and recognition."
        />

        {/* Slim pill filter bar */}
        <div className="bg-white border border-slate-200 rounded-full p-2 mb-4 flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="college-search" className="sr-only">Search Colleges</label>
            <input
              id="college-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search colleges..."
              className="w-full h-11 px-5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-800 bg-white"
            />
          </div>
          <div>
            <label htmlFor="country-filter" className="sr-only">Country</label>
            <select
              id="country-filter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full md:w-auto h-11 px-5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-800 bg-white"
            >
              <option value="all">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fee-filter" className="sr-only">Fee Range</label>
            <select
              id="fee-filter"
              value={selectedFeeRange}
              onChange={(e) => setSelectedFeeRange(e.target.value)}
              className="w-full md:w-auto h-11 px-5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-800 bg-white"
            >
              <option value="all">All Fees</option>
              <option value="low">Low ($3,000-4,000)</option>
              <option value="medium">Medium ($5,000-6,000)</option>
              <option value="high">High ($6,000-8,000)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-3 text-sm text-gray-600 text-center">
          Found <span className="font-bold text-brand-950">{filteredColleges.length}</span> colleges
        </p>

        {/* Compact horizontal rows */}
        <div className="space-y-2.5">
          {filteredColleges.map((college) => (
            <article
              key={college.id}
              className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
            >
              <div className="w-full sm:w-28 h-20 rounded-lg bg-accent-100 text-accent-600 font-extrabold text-xl flex items-center justify-center shrink-0">
                {college.country.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg truncate">
                  {college.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {college.country} · {college.fees} · {college.duration}
                </p>
                <p className="mt-1.5 text-xs text-gray-600">
                  <span className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 mr-1.5">
                    ✓ Approved
                  </span>
                  {college.recognition}
                </p>
              </div>
              <button className="inline-flex w-full sm:w-auto items-center justify-center h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white text-sm font-bold transition-colors shrink-0">
                View Details
              </button>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-600 text-sm">
              No colleges found matching your criteria. Try adjusting your filters.
            </div>
          </div>
        )}
    </Section>
  );
};

export default MbbsAbroadSearch;
