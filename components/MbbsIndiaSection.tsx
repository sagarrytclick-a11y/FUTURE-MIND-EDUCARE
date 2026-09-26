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

  async function fetchStates() {
    try {
      const response = await fetch('/mbbs-india.json');
      const data = await response.json();
      setStates(data.states);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching states:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchStates();
    };

    load();
  }, []);

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
      <Section spacing="md" className="bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-950 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">Loading states and colleges...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="md" className="bg-white">
        <SectionHeading
          eyebrow="Top Colleges Across India"
          title={<>Study MBBS in <span className="text-accent-600">India</span></>}
          description="Explore top medical colleges across India with affordable fees and excellent career opportunities."
        />

        {/* Slim pill filter bar */}
        <div className="mb-4 flex flex-col sm:flex-row gap-2 bg-slate-50 border border-slate-200 rounded-full p-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search states..."
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
          Found <span className="font-bold text-brand-950">{filteredStates.length}</span> states
        </p>

        {/* Compact horizontal rows */}
        <div className="space-y-2.5">
          {filteredStates.map((state) => (
            <article
              key={state.id}
              className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4"
              onMouseEnter={() => handleStateHover(state.id)}
              onMouseLeave={handleStateLeave}
            >
              <div className="flex items-center gap-3">
                <img
                  src={state.image}
                  alt={`MBBS in ${state.name}`}
                  className="w-28 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg truncate">{state.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-1">{state.description}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="bg-accent-100 text-accent-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                      {state.colleges.length}+ Colleges
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">{state.colleges.length} colleges listed</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleStateExpansion(state.id)}
                  className="hidden sm:inline-flex items-center gap-1 h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white font-bold text-sm transition-colors shrink-0"
                >
                  {expandedState === state.id ? 'Hide' : 'View'}
                  {expandedState === state.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                </button>
              </div>

              <button
                onClick={() => toggleStateExpansion(state.id)}
                className="mt-2.5 inline-flex sm:hidden items-center gap-1 text-brand-950 hover:text-brand-950 font-bold text-sm"
              >
                {expandedState === state.id ? 'Hide' : 'View'} Colleges
                {expandedState === state.id ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
              </button>

              {/* Hover preview */}
              {hoveredState === state.id && hoveredStateData && (
                <div className="mt-3 border-t border-slate-200 pt-3">
                  <h4 className="font-extrabold text-sm text-brand-950 tracking-tight mb-2">Top Colleges:</h4>
                  <div className="space-y-1">
                    {hoveredStateData.colleges.slice(0, 3).map((college) => (
                      <div key={college.id} className="text-xs text-gray-600 flex items-center justify-between gap-2 px-2 py-1 bg-slate-50 rounded-lg">
                        <span className="font-bold text-brand-950 truncate">{college.name}</span>
                        <span className="text-brand-950 font-bold shrink-0">{college.fees}</span>
                      </div>
                    ))}
                    {hoveredStateData.colleges.length > 3 && (
                      <div className="text-xs text-gray-600 italic px-2">
                        +{hoveredStateData.colleges.length - 3} more colleges
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Colleges list */}
              {expandedState === state.id && (
                <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                  {state.colleges.map((college) => (
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
                            {college.seats} Seats
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {college.ranking}
                          </span>
                          <span className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                            {college.type}
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

        {/* Call to Action */}
        <div className="mt-5 text-center bg-brand-950 rounded-2xl p-5 text-white">
          <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg !text-white">Need help choosing the right college?</h3>
          <p className="mb-4 text-sm text-blue-100">
            Get expert guidance from our experienced counselors to secure admission in your dream medical college.
          </p>
          <button className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-brand-950 hover:bg-accent-100 text-sm font-bold transition-colors">
            Get Free Counseling
          </button>
        </div>
    </Section>
  );
};

export default MbbsIndiaSection;
