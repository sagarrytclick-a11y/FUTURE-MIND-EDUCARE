"use client"
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaFilter } from 'react-icons/fa';
import Section from './Section';
import SectionHeading from './SectionHeading';

interface College {
  id: number;
  name: string;
  city: string;
  fees: string;
  duration: string;
  recognition: string;
  medium: string;
  ranking: string;
  image: string;
}

interface Country {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities: number;
  courses: string;
  colleges: College[];
}

const MbbsAbroadSection: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [hoveredCountryData, setHoveredCountryData] = useState<Country | null>(null);

  async function fetchCountries() {
    try {
      const response = await fetch('/mbbs-abroad.json');
      const data = await response.json();
      setCountries(data.countries);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchCountries();
    };

    load();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCountryExpansion = (countryId: number) => {
    setExpandedCountry(expandedCountry === countryId ? null : countryId);
  };

  const handleCountryHover = async (countryId: number) => {
    setHoveredCountry(countryId);

    // Find the country data
    const country = countries.find(c => c.id === countryId);
    if (country) {
      setHoveredCountryData(country);
    }
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
    setHoveredCountryData(null);
  };

  if (loading) {
    return (
      <Section spacing="md" className="bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-950 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">Loading countries and colleges...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="md" className="bg-slate-50">
        <SectionHeading
          eyebrow="Global Medical Universities"
          title={<>Study MBBS <span className="text-accent-600">Abroad</span></>}
          description="Explore top medical universities across the globe. Quality education at affordable fees with globally recognized degrees."
        />

        {/* Slim pill filter bar */}
        <div className="mb-4 flex flex-col sm:flex-row gap-2 bg-white border border-slate-200 rounded-full p-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-800 bg-white"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white text-sm font-bold transition-colors shrink-0">
            <FaFilter className="text-xs" />
            Filter
          </button>
        </div>

        {/* Results count */}
        <p className="mb-3 text-sm text-gray-600">
          Found <span className="font-bold text-brand-950">{filteredCountries.length}</span> countries
        </p>

        {/* Compact horizontal rows */}
        <div className="space-y-2.5">
          {filteredCountries.map((country) => (
            <article
              key={country.id}
              className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4"
              onMouseEnter={() => handleCountryHover(country.id)}
              onMouseLeave={handleCountryLeave}
            >
              <div className="flex items-center gap-3">
                <img
                  src={country.image}
                  alt={`Study in ${country.name}`}
                  className="w-28 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={country.flag}
                      alt={`${country.name} Flag`}
                      className="w-5 h-3.5 rounded-sm shrink-0"
                    />
                    <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg truncate">{country.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-1">{country.description}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                      {country.universities}+ Universities
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">{country.courses}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleCountryExpansion(country.id)}
                  className="hidden sm:inline-flex items-center gap-1 h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white font-bold text-sm transition-colors shrink-0"
                >
                  {expandedCountry === country.id ? 'Hide' : 'View'}
                  {expandedCountry === country.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                </button>
              </div>

              <button
                onClick={() => toggleCountryExpansion(country.id)}
                className="mt-2.5 inline-flex sm:hidden items-center gap-1 text-brand-950 hover:text-brand-950 font-bold text-sm"
              >
                {expandedCountry === country.id ? 'Hide' : 'View'} Colleges
                {expandedCountry === country.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>

              {/* Hover preview */}
              {hoveredCountry === country.id && hoveredCountryData && (
                <div className="mt-3 border-t border-slate-200 pt-3">
                  <h4 className="font-extrabold text-brand-950 mb-2 text-sm tracking-tight">Top Universities:</h4>
                  <div className="space-y-1.5">
                    {hoveredCountryData.colleges.slice(0, 4).map((college) => (
                      <div key={college.id} className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={college.image}
                            alt={college.name}
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-brand-950 truncate">{college.name}</div>
                            <div className="text-xs text-gray-600">{college.city}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs text-brand-950 font-bold">{college.fees}</div>
                          <div className="text-xs text-gray-600">{college.duration}</div>
                        </div>
                      </div>
                    ))}
                    {hoveredCountryData.colleges.length > 4 && (
                      <div className="text-xs text-center text-gray-600 italic py-1">
                        +{hoveredCountryData.colleges.length - 4} more universities
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Colleges list */}
              {expandedCountry === country.id && (
                <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                  {country.colleges.map((college) => (
                    <div
                      key={college.id}
                      className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2.5 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-sm text-brand-950 tracking-tight truncate">{college.name}</h4>
                        <p className="text-gray-600 text-sm">{college.city}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          <span className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {college.fees}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {college.duration}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {college.ranking}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
    </Section>
  );
};

export default MbbsAbroadSection;
