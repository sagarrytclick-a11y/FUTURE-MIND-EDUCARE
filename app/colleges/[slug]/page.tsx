"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePopup } from '@/contexts/PopupContext';
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

interface StateData {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: CollegeData[];
}

interface MbbsData {
  states: StateData[];
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

const CollegeSlugPage: React.FC = () => {
  const params = useParams();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [collegeType, setCollegeType] = useState<'india' | 'abroad'>('india');
  const [relatedColleges, setRelatedColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { openPopup, updateFormData, resetForm } = usePopup();

  useEffect(() => {
    const fetchCollegeBySlug = async () => {
      try {
        setLoading(true);
        const slug = params.slug as string;
        
        // Fetch both India and Abroad data
        const [indiaResponse, abroadResponse] = await Promise.all([
          fetch('/mbbs-india.json'),
          fetch('/mbbs-abroad.json')
        ]);

        if (!indiaResponse.ok && !abroadResponse.ok) {
          throw new Error('Failed to fetch college data');
        }

        // Search in India data
        if (indiaResponse.ok) {
          const indiaData = await indiaResponse.json();

          for (const state of indiaData.states) {
            const college = state.colleges.find((c: CollegeData) => {
              const collegeSlug = c.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              return collegeSlug === slug;
            });
            
            if (college) {
              setCollege(college);
              setCollegeType('india');
              setRelatedColleges(state.colleges.filter((c: CollegeData) => c.id !== college.id).slice(0, 6));
              setLoading(false);
              return;
            }
          }
        }

        // Search in Abroad data
        if (abroadResponse.ok) {
          const abroadData = await abroadResponse.json();

          for (const country of abroadData.countries) {
            if (country.colleges) {
              const college = country.colleges.find((c: CollegeData) => {
                const collegeSlug = c.name
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '');
                return collegeSlug === slug;
              });
              
              if (college) {
                setCollege(college);
                setCollegeType('abroad');
                setRelatedColleges(country.colleges.filter((c: CollegeData) => c.id !== college.id).slice(0, 6));
                setLoading(false);
                return;
              }
            }
          }
        }

        setError('College not found');
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load college details');
        setLoading(false);
      }
    };

    fetchCollegeBySlug();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-lg h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college information...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested college could not be found.'}</p>
          <div className="space-x-4">
            <Link 
              href="/colleges/mbbs-india"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors mr-4"
            >
              Browse India Colleges
            </Link>
            <Link 
              href="/colleges/mbbs-abroad"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Abroad Colleges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate slug for college
  const getCollegeSlug = (collegeName: string): string => {
    return collegeName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const bgColor = collegeType === 'india' ? 'from-blue-700 to-blue-900' : 'from-purple-700 to-purple-900';
  const buttonColor = collegeType === 'india' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-linear-to-r ${bgColor} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {college.city} • {college.type} • {college.ranking}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                college.type === 'Government' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {college.type || 'Private'}
              </span>
              <span className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-lg text-sm font-semibold">
                {college.recognition}
              </span>
              <span className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-lg text-sm font-semibold">
                {college.seats} Seats Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - College Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* College Image and Basic Info */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-college.png';
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-2">{college.name}</h2>
                    <p className="text-blue-100">{college.city}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                    <p className="font-semibold text-gray-900">{college.type}</p>
                    {college.type && (
                      <span className={`inline-block ml-2 px-2 py-1 text-xs font-medium rounded-lg ${
                        college.type === 'Government' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {college.type}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Ranking</h3>
                    <p className="font-semibold text-green-600">{college.ranking}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Seats</h3>
                    <p className="font-semibold text-gray-900">{college.seats}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Recognition</h3>
                    <p className="font-semibold text-gray-900">{college.recognition}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Annual Fees</h3>
                  <p className="text-2xl font-bold text-blue-600">{college.fees}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About College</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {college.type} medical college in {college.city} offering quality medical education 
                with {college.seats} seats. {college.recognition} recognized institution 
                with {college.ranking} ranking.
              </p>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg"></span>
                    <span className="text-gray-600">Modern Infrastructure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg"></span>
                    <span className="text-gray-600">Experienced Faculty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg"></span>
                    <span className="text-gray-600">Clinical Training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg"></span>
                    <span className="text-gray-600">Research Facilities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admission Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Admission Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Based on NEET score and merit. Fees: {college.fees}
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Eligibility Criteria</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg mt-2 shrink-0"></span>
                    <span>Minimum 17 years of age</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg mt-2 shrink-0"></span>
                    <span>Physics, Chemistry, Biology in 10+2</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-lg mt-2 shrink-0"></span>
                    <span>Valid NEET score as per cutoff</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Actions and Related */}
          <div className="space-y-6 lg:sticky lg:top-4 lg:self-start lg:w-80 lg:ml-4 lg:mr-4">
            {/* Apply Now CTA */}
            <div className={`${collegeType === 'india' ? 'bg-blue-600' : 'bg-purple-600'} text-white rounded-xl p-6 text-center`}>
              <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-blue-100 mb-6">Get expert guidance for admission</p>
              <button 
                onClick={() => {
                  updateFormData({ 
                    courseInterest: `${college.name} - ${collegeType === 'india' ? 'MBBS India' : 'MBBS Abroad'}` 
                  });
                  openPopup();
                }}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Apply Now
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link 
                  href="/colleges/mbbs-india"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  ← Browse India Colleges
                </Link>
                <Link 
                  href="/colleges/mbbs-abroad"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  ← Browse Abroad Colleges
                </Link>
                <Link 
                  href="/"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>

            {/* Related Colleges */}
            {relatedColleges.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Colleges</h3>
                <div className="space-y-3">
                  {relatedColleges.map((relatedCollege) => (
                    <Link 
                      key={relatedCollege.id}
                      href={`/colleges/${getCollegeSlug(relatedCollege.name)}`}
                      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{relatedCollege.name}</span>
                        <span className="text-xs text-gray-500">{relatedCollege.city}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSlugPage;