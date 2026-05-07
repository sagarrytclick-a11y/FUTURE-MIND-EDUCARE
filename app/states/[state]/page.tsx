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

const StatePage: React.FC = () => {
  const params = useParams();
  const [state, setState] = useState<StateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { openPopup, updateFormData } = usePopup();

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        setLoading(true);
        const stateParam = params.state as string;
        
        const response = await fetch('/mbbs-india.json');
        if (!response.ok) {
          throw new Error('Failed to fetch state data');
        }

        const data: MbbsData = await response.json();

        // Find the state by name or ID
        let foundState = data.states.find(s => 
          s.name.toLowerCase().replace(/\s+/g, '-') === stateParam.toLowerCase() ||
          s.id.toString() === stateParam
        );

        if (!foundState) {
          setError('State not found');
          setLoading(false);
          return;
        }

        setState(foundState);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load state data');
        setLoading(false);
      }
    };

    fetchStateData();
  }, [params.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading state information...</p>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">State Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested state could not be found.'}</p>
          <Link 
            href="/states"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse All States
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-linear-to-r from-blue-700 to-blue-900">
        <div className="absolute inset-0">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-state.png';
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              MBBS Colleges in {state.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {state.description}
            </p>
            <div className="mt-6">
              <span className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                {state.colleges.length} Medical Colleges
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
              <Link href="/states" className="text-gray-500 hover:text-gray-700">
                States
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold">{state.name}</li>
          </ol>
        </nav>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.colleges.map((college) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      courseInterest: `${college.name} - ${state.name} - MBBS India` 
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

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About Medical Education in {state.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">
                    {state.colleges.filter(c => c.type === 'Government').length} Government colleges
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">
                    {state.colleges.filter(c => c.type === 'Private').length} Private colleges
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-600">
                    Total {state.colleges.reduce((sum, c) => sum + c.seats, 0)} MBBS seats available
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Admission to MBBS colleges in {state.name} is primarily based on NEET UG scores. 
                Students must qualify the NEET examination and participate in the state counseling process 
                for seat allocation. Both government and private colleges follow the merit-based admission system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatePage;