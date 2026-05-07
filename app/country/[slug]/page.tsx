"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePopup } from '@/contexts/PopupContext';

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
  image: string;
  description: string;
  universities: number;
  courses: string;
  colleges?: CollegeData[];
}

interface MbbsAbroadData {
  countries: CountryData[];
}

const CountrySlugPage: React.FC = () => {
  const params = useParams();
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { openPopup, updateFormData } = usePopup();

  useEffect(() => {
    const fetchCountryBySlug = async () => {
      try {
        setLoading(true);
        const slug = params.slug as string;
        
        const response = await fetch('/mbbs-abroad.json');
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }

        const data: MbbsAbroadData = await response.json();

        // Find country by matching slug
        let foundCountry = null;
        for (const countryItem of data.countries) {
          const countrySlug = countryItem.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
          
          if (countrySlug === slug) {
            foundCountry = countryItem;
            break;
          }
        }

        if (!foundCountry) {
          setError('Country not found');
          setLoading(false);
          return;
        }

        setCountry(foundCountry);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load country details');
        setLoading(false);
      }
    };

    fetchCountryBySlug();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested country could not be found.'}</p>
          <div className="space-x-4">
            <Link 
              href="/colleges"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors mr-4"
            >
              Browse All Colleges
            </Link>
            <Link 
              href="/states"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse by State
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-16 h-12 object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-flag.png';
                }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MBBS Colleges in {country.name}
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              {country.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-white text-purple-900 bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {country.colleges?.length || 0} Medical Colleges
              </span>
              <span className="bg-white text-purple-900 bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {country.universities} Universities
              </span>
              <span className="bg-white text-purple-900 bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {country.courses}
              </span>
              <span className="bg-white text-purple-900 bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                International Recognition
              </span>
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
            <li>
              <Link href="/colleges/mbbs-abroad" className="text-gray-500 hover:text-gray-700">
                Colleges
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">{country.name}</li>
          </ol>
        </nav>

        {/* Country Colleges */}
        {country.colleges && country.colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.colleges.map((college) => (
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
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                      <span className="font-semibold text-blue-600">{college.fees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recognition:</span>
                      <span className="font-semibold">{college.recognition}</span>
                    </div>
                  </div>
                  
                  {/* Apply Now Button */}
                  <button 
                    onClick={() => {
                      updateFormData({ 
                        courseInterest: `${college.name} - ${country.name} - MBBS Abroad` 
                      });
                      openPopup();
                    }}
                    className="inline-flex w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 group hover:bg-blue-700 text-center justify-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">No Colleges Available</h3>
            <p className="text-gray-600 mb-6">
              Currently, there are no medical colleges listed for {country.name}. 
              Please check back later or explore other countries.
            </p>
            <Link 
              href="/colleges"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Other Countries
            </Link>
          </div>
        )}

        {/* Country Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Study MBBS in {country.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Education</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {country.name} offers excellent medical education with internationally recognized 
                universities, modern infrastructure, and experienced faculty members.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Internationally recognized degrees</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">English medium of instruction</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Modern clinical facilities</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Affordable Fees</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Compared to many Western countries, MBBS education in {country.name} 
                is significantly more affordable while maintaining high quality standards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Reasonable tuition fees</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Scholarship opportunities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Cost-effective living</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySlugPage;
