"use client"
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaFilter } from 'react-icons/fa';

interface College {
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

interface State {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: College[];
}

const MbbsIndiaSection: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [expandedState, setExpandedState] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredState, setHoveredState] = useState<number | null>(null);
  const [hoveredStateData, setHoveredStateData] = useState<State | null>(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch('/mbbs-india.json');
      const data = await response.json();
      setStates(data.states);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching states:', error);
      setLoading(false);
    }
  };

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStateExpansion = (stateId: number) => {
    setExpandedState(expandedState === stateId ? null : stateId);
  };

  const handleStateHover = async (stateId: number) => {
    setHoveredState(stateId);
    
    // Find the state data
    const state = states.find(s => s.id === stateId);
    if (state) {
      setHoveredStateData(state);
    }
  };

  const handleStateLeave = () => {
    setHoveredState(null);
    setHoveredStateData(null);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-lg h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading states and colleges...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Study MBBS in <span className="text-blue-600">India</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Explore top medical colleges across India. Get quality education with affordable fees 
            and excellent career opportunities in premier government and private institutions.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-blue-600 mx-auto rounded-lg"></div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search states..."
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

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStates.map((state) => (
            <div
              key={state.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 relative"
              onMouseEnter={() => handleStateHover(state.id)}
              onMouseLeave={handleStateLeave}
            >
              {/* State Image with Overlay */}
              <div className="relative h-48">
                <img
                  src={state.image}
                  alt={`MBBS in ${state.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {state.colleges.length}+ Colleges
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{state.name}</h3>
                    <p className="text-sm opacity-90">{state.description}</p>
                  </div>
                </div>
              </div>

              {/* Hover Preview */}
              {hoveredState === state.id && hoveredStateData && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-4 flex flex-col justify-center">
                  <h4 className="font-bold text-gray-900 mb-2">Top Colleges:</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {hoveredStateData.colleges.slice(0, 3).map((college) => (
                      <div key={college.id} className="text-xs text-gray-600 flex items-center justify-between">
                        <span className="font-medium">{college.name}</span>
                        <span className="text-blue-600">{college.fees}</span>
                      </div>
                    ))}
                    {hoveredStateData.colleges.length > 3 && (
                      <div className="text-xs text-gray-500 italic">
                        +{hoveredStateData.colleges.length - 3} more colleges
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* State Info */}
              <div className="p-6">
                <button
                  onClick={() => toggleStateExpansion(state.id)}
                  className="w-full text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-1 mb-4"
                >
                  {expandedState === state.id ? 'Hide' : 'Show'} Colleges
                  {expandedState === state.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* Colleges List */}
                {expandedState === state.id && (
                  <div className="space-y-3 border-t pt-4">
                    {state.colleges.map((college) => (
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
                                {college.seats} Seats
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                {college.ranking}
                              </span>
                              <span className={`${college.type === 'Government' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded`}>
                                {college.type}
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

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need help choosing the right college?</h3>
          <p className="mb-6 text-blue-100">
            Get expert guidance from our experienced counselors to secure admission in your dream medical college.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors">
            Get Free Counseling
          </button>
        </div>
      </div>
    </section>
  );
};

export default MbbsIndiaSection;
