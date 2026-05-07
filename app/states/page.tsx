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

const StatesPage: React.FC = () => {
  const [states, setStates] = useState<StateData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('/mbbs-india.json');
        if (!response.ok) {
          throw new Error('Failed to fetch states data');
        }

        const data: MbbsData = await response.json();
        setStates(data.states);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load states data');
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading states...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading States</h1>
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
  const totalColleges = states.reduce((sum, state) => sum + state.colleges.length, 0);
  const totalSeats = states.reduce((sum, state) => 
    sum + state.colleges.reduce((collegeSum, college) => collegeSum + college.seats, 0), 0
  );
  const totalGovtColleges = states.reduce((sum, state) => 
    sum + state.colleges.filter(college => college.type === 'Government').length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MBBS Colleges by State
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Explore medical colleges across different states in India. Find the perfect institution for your medical education journey.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl text-black font-bold mb-2">{states.length}</div>
                <div className=" text-black">States</div>
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
            <li className="text-gray-900 font-semibold">States</li>
          </ol>
        </nav>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {states.map((state) => {
            const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
            const govtColleges = state.colleges.filter(college => college.type === 'Government').length;
            const privateColleges = state.colleges.filter(college => college.type === 'Private').length;
            const stateSeats = state.colleges.reduce((sum, college) => sum + college.seats, 0);
            
            return (
              <Link
                key={state.id}
                href={`/states/${stateSlug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* State Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-state.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{state.name}</h3>
                    <p className="text-sm text-blue-100">{state.description}</p>
                  </div>
                </div>
                
                {/* State Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{state.colleges.length}</div>
                      <div className="text-xs text-gray-600">Colleges</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{stateSeats}</div>
                      <div className="text-xs text-gray-600">Seats</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">{govtColleges} Government</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-600">{privateColleges} Private</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-semibold group-hover:text-blue-700">
                      View Colleges →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose Medical Colleges in India?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Education</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Indian medical colleges are recognized globally for their high standards of education, 
                experienced faculty, and comprehensive curriculum that meets international benchmarks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">NMC/MCI recognized institutions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Modern infrastructure and facilities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Research opportunities</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Affordable Education</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Compared to many other countries, medical education in India is significantly more affordable 
                while maintaining high quality standards, making it an attractive option for students.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Low tuition fees in government colleges</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Various scholarship programs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">Cost-effective living expenses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatesPage;
