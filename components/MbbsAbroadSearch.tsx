"use client"
import React, { useState } from 'react';

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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            MBBS Abroad - Search Colleges
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find and filter medical colleges abroad based on country, fees, and 
            recognition. Explore WHO approved universities for your MBBS journey.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Colleges</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter college name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Fee Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fee Range</label>
              <select 
                value={selectedFeeRange}
                onChange={(e) => setSelectedFeeRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Fees</option>
                <option value="low">Low ($3,000-4,000)</option>
                <option value="medium">Medium ($5,000-6,000)</option>
                <option value="high">High ($6,000-8,000)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredColleges.length}</span> colleges
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {college.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657a1 1 0 00-1.414 1.414 0 1-.586V8a2 2 0 00-2 2-2h2.586l-1.414 1.414a1 1 0 001.414-1.414 1.414-1.586V8a2 2 0 00-2 2-2h2.586l1.414-1.414a1 1 0 001.414-1.414 1.414-1.586z"/>
                      </svg>
                      {college.country}
                    </span>
                    <span>{college.fees}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 4m0 0l-3-4m3 4H3"/>
                      </svg>
                      {college.duration}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  ✓
                </span>
                {college.recognition}
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No colleges found matching your criteria. Try adjusting your filters.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MbbsAbroadSearch;
