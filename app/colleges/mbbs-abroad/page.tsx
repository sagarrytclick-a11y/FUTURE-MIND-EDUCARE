"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CollegeData {
  id: number;
  name: string;
  city: string;
  fees: string;
  seats: number;
  recognition: string;
  ranking: string;
  type: string;
  image: string;
}

interface CountryData {
  id: number;
  name: string;
  flag: string;
  colleges?: CollegeData[];
}

interface MbbsAbroadData {
  countries: CountryData[];
}

const MbbsAbroadPage: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [filteredColleges, setFilteredColleges] = useState<CollegeData[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const response = await fetch('/mbbs-abroad.json');
        if (!response.ok) {
          throw new Error('Failed to fetch abroad college data');
        }
        const data: MbbsAbroadData = await response.json();
        setCountries(data.countries || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load abroad college data');
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleCountryFilter = (countryName: string) => {
    setSelectedCountry(countryName);
    if (countryName === '') {
      setFilteredColleges([]);
    } else {
      const country = countries.find(c => c.name === countryName);
      if (country && country.colleges) {
        setFilteredColleges(country.colleges);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MBBS colleges abroad...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalCountries = countries.length;
  const totalColleges = countries.reduce((sum, country) => 
    sum + (country.colleges?.length || 0), 0
  );
  const totalSeats = countries.reduce((sum, country) => 
    sum + (country.colleges?.reduce((collegeSum, college) => collegeSum + college.seats, 0) || 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MBBS Colleges Abroad
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Explore medical colleges and universities across popular countries for international students. 
              Quality education with affordable fees and globally recognized degrees.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl text-black font-bold mb-2">{totalCountries}</div>
                <div className="text-black">Countries</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl text-black font-bold mb-2">{totalColleges}</div>
                <div className="text-black">Medical Colleges</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl text-black font-bold mb-2">{totalSeats.toLocaleString()}</div>
                <div className="text-black">Total Seats</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">MBBS Abroad</li>
          </ol>
        </nav>

        {/* Country Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by Country</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCountryFilter('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCountry === '' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Countries
            </button>
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountryFilter(country.name)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCountry === country.name 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        {selectedCountry && (
          <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-purple-900">
                Showing colleges in {selectedCountry}
              </h3>
              <button
                onClick={() => handleCountryFilter('')}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCountry ? filteredColleges : countries.flatMap(country => country.colleges || [])).map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* College Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-college.png';
                  }}
                />
                {college.ranking && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {college.ranking}
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* College Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {college.name}
                </h3>
                
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 ${
                    college.type === 'Government' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {college.type}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    📍 {college.city}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-semibold">{college.seats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fees:</span>
                    <span className="font-semibold text-purple-600">{college.fees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Recognition:</span>
                    <span className="font-semibold">{college.recognition}</span>
                  </div>
                </div>
                
                {/* View Details Button */}
                <Link 
                  href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
                  className="inline-flex w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 group hover:bg-purple-700 text-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Countries Overview */}
      

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Study MBBS Abroad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Recognition</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Medical degrees from abroad are recognized globally, opening doors to international 
                career opportunities and residency programs in various countries.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">WHO recognized universities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">International faculty</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Modern infrastructure</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Affordable Options</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Many countries offer quality medical education at competitive prices compared to 
                Western institutions, with various scholarship opportunities available.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Competitive tuition fees</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Scholarship programs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">English medium instruction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbbsAbroadPage;
