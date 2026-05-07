"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePopup } from '@/contexts/PopupContext';

interface UniversityItem {
  name: string;
  description: string;
  image: string;
  city?: string;
  fees?: string;
  ranking?: string;
  type?: string;
  slug?: string;
  id?: number;
}

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

const TopUniversitiesSection: React.FC = () => {
  const [universities, setUniversities] = useState<UniversityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { openPopup } = usePopup();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('/mbbs-india.json');
        if (!response.ok) {
          throw new Error('Failed to fetch university data');
        }
        const data: MbbsData = await response.json();
        
        // Extract top 6 universities from different states based on ranking
        const topUniversities: UniversityItem[] = [];
        const seenUniversities = new Set<string>();
        
        // Sort colleges by ranking and get top universities
        data.states.forEach(state => {
          state.colleges.forEach(college => {
            if (topUniversities.length < 6 && !seenUniversities.has(college.name)) {
              // Extract numeric ranking for better sorting
              const rankingMatch = college.ranking.match(/#(\d+)/);
              const rankingNum = rankingMatch ? parseInt(rankingMatch[1]) : 999;
              
              // Generate slug from college name
              const slug = college.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              
              topUniversities.push({
                name: college.name,
                description: `${college.type} medical college in ${college.city} with ${college.seats} seats. ${college.recognition} recognized.`,
                image: college.image,
                city: college.city,
                fees: college.fees,
                ranking: college.ranking,
                type: college.type,
                slug: slug,
                id: college.id
              });
              seenUniversities.add(college.name);
            }
          });
        });
        
        // Sort by ranking
        topUniversities.sort((a, b) => {
          const aRank = a.ranking?.match(/#(\d+)/)?.[1] ? parseInt(a.ranking.match(/#(\d+)/)![1]) : 999;
          const bRank = b.ranking?.match(/#(\d+)/)?.[1] ? parseInt(b.ranking.match(/#(\d+)/)![1]) : 999;
          return aRank - bRank;
        });
        
        setUniversities(topUniversities.slice(0, 6));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Top MBBS Medical Universities in India
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Top MBBS Medical Universities in India
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-red-600">Error loading university data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Top MBBS Medical Universities in India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find a medical university that fits your goals and aspirations
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* University Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={university.image}
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-university.png';
                  }}
                />
                {university.ranking && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {university.ranking}
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* University Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {university.name}
                </h3>
                
                <div className="mb-3">
                  {university.type && (
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 ${
                      university.type === 'Government' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {university.type}
                    </span>
                  )}
                  {university.city && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      📍 {university.city}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {university.description}
                </p>

                {university.fees && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900">
                      💰 Fees: {university.fees}
                    </p>
                  </div>
                )}
                
                {/* Apply Now Button */}
                <Link 
                  href={`/colleges/${university.slug}`}
                  className="inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 group hover:bg-blue-700"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            These universities represent the pinnacle of medical education in India, offering cutting-edge facilities, 
            experienced faculty, and excellent career opportunities. Our expert counselors can help you navigate the 
            admission process for these prestigious institutions.
          </p>
          <button 
            onClick={() => openPopup()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Admission Guidance
          </button>
        </div>
      </div>
    </section>
    
    </>
  );
};

export default TopUniversitiesSection;
