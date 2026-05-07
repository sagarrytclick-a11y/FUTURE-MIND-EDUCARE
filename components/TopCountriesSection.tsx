"use client"
import React from 'react';
import Link from 'next/link';
import { usePopup } from '../contexts/PopupContext';

interface CountryItem {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities: number;
  courses: string;
}

const TopCountriesSection: React.FC = () => {
  const [countries, setCountries] = React.useState<CountryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/mbbs-abroad.json');
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();

        // Transform the data to match CountryItem interface
        const transformedCountries: CountryItem[] = data.countries.map((country: any) => ({
          id: country.id,
          name: country.name,
          flag: country.flag,
          image: country.image,
          description: country.description,
          universities: country.universities,
          courses: country.courses
        }));

        setCountries(transformedCountries);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load country data');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Function to create country slug for URL
  const getCountrySlug = (countryName: string): string => {
    return countryName.toLowerCase().replace(/\s+/g, '-');
  };

  
  if (error) {
    return (
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#12141D] mb-4 tracking-tight">
              Top Countries for MBBS Abroad
            </h2>
            <p className="text-lg text-red-600 max-w-2xl mx-auto font-medium">
              Error loading country data: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#12141D] mb-4 tracking-tight">
            Top Countries for MBBS Abroad
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto font-medium">
            Discover the most preferred destinations offering world-class medical education,
            globally recognized degrees, and affordable fee structures.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link
              href={`/country/${getCountrySlug(country.name)}`}
              key={country.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* Country Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                {/* Country Image with Overlay */}
                <div className="relative h-48">
                  <img
                    src={country.image}
                    alt={`Study in ${country.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Country Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700">
                      {country.universities} Universities
                    </span>
                  </div>
                </div>

                {/* Country Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={country.flag}
                      alt={`${country.name} Flag`}
                      className="w-8 h-6 rounded-sm mr-3 object-cover"
                    />
                    <h3 className="text-lg font-bold text-gray-900">
                      {country.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                    {country.description}
                  </p>

                  <div className="mb-4">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      {country.courses}
                    </span>
                  </div>

                  <button 
                    
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Explore {country.name}
                    <svg className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Countries Button */}
        <div className="text-center mt-12">
          <Link
            href="/colleges/mbbs-abroad"
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Countries
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l4-4m0 0l4 4m0 6l-4 4m0 0l4-4m0 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCountriesSection;