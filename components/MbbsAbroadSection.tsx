"use client"
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaFilter } from 'react-icons/fa';

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

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/mbbs-abroad.json');
      const data = await response.json();
      setCountries(data.countries);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading countries and colleges...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Study MBBS <span className="text-blue-600">Abroad</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Explore top medical universities across the globe. Get quality education at affordable fees 
            with globally recognized degrees and excellent career opportunities.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-blue-600 mx-auto rounded-lg"></div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            <FaFilter />
            Filter
          </button>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative"
              onMouseEnter={() => handleCountryHover(country.id)}
              onMouseLeave={handleCountryLeave}
            >
              {/* Country Image with Overlay */}
              <div className="relative h-48">
                <img
                  src={country.image}
                  alt={`Study in ${country.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {country.universities}+ Universities
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={country.flag}
                        alt={`${country.name} Flag`}
                        className="w-8 h-6 rounded-sm"
                      />
                      <h3 className="text-xl font-bold">{country.name}</h3>
                    </div>
                    <p className="text-sm opacity-90">{country.description}</p>
                  </div>
                </div>
              </div>

              {/* Hover Dropdown */}
              {hoveredCountry === country.id && hoveredCountryData && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t-2 border-blue-600 z-20">
                  <div className="p-4 max-h-64 overflow-y-auto">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Top Universities:</h4>
                    <div className="space-y-2">
                      {hoveredCountryData.colleges.slice(0, 4).map((college) => (
                        <div key={college.id} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-2">
                            <img
                              src={college.image}
                              alt={college.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-900">{college.name}</div>
                              <div className="text-xs text-gray-500">{college.city}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-blue-600 font-semibold">{college.fees}</div>
                            <div className="text-xs text-gray-500">{college.duration}</div>
                          </div>
                        </div>
                      ))}
                      {hoveredCountryData.colleges.length > 4 && (
                        <div className="text-xs text-center text-gray-500 italic py-2">
                          +{hoveredCountryData.colleges.length - 4} more universities
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Country Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{country.courses}</span>
                  <button
                    onClick={() => toggleCountryExpansion(country.id)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
                  >
                    {expandedCountry === country.id ? 'Hide' : 'Show'} Colleges
                    {expandedCountry === country.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {/* Colleges List */}
                {expandedCountry === country.id && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    {country.colleges.map((college) => (
                      <div
                        key={college.id}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={college.image}
                            alt={college.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{college.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{college.city}</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {college.fees}
                              </span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                {college.duration}
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                {college.ranking}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


        
      </div>
    </section>
  );
};

export default MbbsAbroadSection;
