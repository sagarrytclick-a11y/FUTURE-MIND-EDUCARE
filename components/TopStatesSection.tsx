"use client"
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface StateItem {
  name: string;
  image: string;
}

const TopStatesSection: React.FC = () => {
  const [states, setStates] = React.useState<StateItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);

        const response = await fetch('/mbbs-india.json');

        if (!response.ok) {
          throw new Error('Failed to fetch states data');
        }

        const data = await response.json();

        const transformedStates: StateItem[] = data.states.map((state: any) => ({
          name: state.name,
          image: state.image,
        }));

        setStates(transformedStates);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load states data');
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const getStateSlug = (stateName: string): string => {
    return stateName.toLowerCase().replace(/\s+/g, '-');
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading Top States...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Something Went Wrong
          </h2>

          <p className="text-red-500 mb-6">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">
            MBBS In India
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Explore Top States For
            <span className="text-blue-600"> Medical Education</span>
          </h2>

          <p className="mt-5 text-slate-500 text-base md:text-lg leading-8 font-medium">
            Find the best states across India offering top-ranked MBBS colleges,
            advanced infrastructure, and excellent career opportunities.
          </p>
        </div>

        {/* STATES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {states.map((state, index) => (
            <Link
              href={`/states/${getStateSlug(state.name)}`}
              key={index}
              className="group"
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  bg-white
                  border
                  border-slate-200
                  hover:border-blue-100
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                "
              >
                {/* IMAGE */}
                <div className="relative h-[260px] overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />

                  {/* STATE NAME */}
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white drop-shadow-lg">
                          {state.name}
                        </h3>

                        <p className="text-white/80 text-sm mt-1 font-medium">
                          Top MBBS Colleges
                        </p>
                      </div>

                      <div
                        className="
                          w-12
                          h-12
                          rounded-2xl
                          bg-white/20
                          backdrop-blur-md
                          flex
                          items-center
                          justify-center
                          group-hover:bg-blue-600
                          transition-all
                          duration-300
                        "
                      >
                        <FaArrowRight className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <p className="text-sm font-bold tracking-wide uppercase text-slate-400">
                    Explore Colleges
                  </p>

                  <span className="text-blue-600 font-bold text-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-14">
          <Link
            href="/states"
            className="
              inline-flex
              items-center
              gap-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-4
              rounded-lg
              font-bold
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Explore All States

            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopStatesSection;