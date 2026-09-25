"use client"
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';

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
      <Section spacing="md" className="bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-950 mx-auto"></div>
          <p className="text-gray-600 text-sm font-medium mt-3">Loading Top States...</p>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section spacing="md" className="bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-brand-950 mb-3">
            Something Went Wrong
          </h2>

          <p className="text-red-500 text-sm mb-5">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="bg-brand-950 hover:bg-brand-900 text-white h-11 px-6 rounded-full text-sm font-bold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="md" className="bg-slate-50">
      <SectionHeading
        eyebrow="MBBS In India"
        title={
          <>
            Explore Top States For{" "}
            <span className="text-accent-600">Medical Education</span>
          </>
        }
        description="Find the best states across India offering top-ranked MBBS colleges and excellent career opportunities."
      />

      {/* 4-COL IMAGE CARDS — same card language */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {states.map((state, index) => (
          <Link
            href={`/states/${getStateSlug(state.name)}`}
            key={index}
            className="group block bg-white hover:bg-brand-950 border border-slate-200 hover:border-brand-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={state.image}
                alt={state.name}
                loading="lazy"
                className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="bg-slate-100 group-hover:bg-white/15 text-slate-600 group-hover:text-slate-200 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 transition-colors duration-300">
                MBBS India
              </span>
              <div className="mt-2 flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-brand-950 group-hover:text-white leading-snug truncate transition-colors duration-300">
                  {state.name}
                </h3>
                <span className="w-10 h-10 rounded-full bg-accent-100 text-accent-600 group-hover:bg-accent-400 group-hover:text-brand-950 flex items-center justify-center transition-all duration-300 shrink-0 group-hover:rotate-45">
                  <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/states"
          className="inline-flex items-center gap-2 bg-brand-950 hover:bg-brand-900 text-white h-11 px-6 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Explore All States
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </Section>
  );
};

export default TopStatesSection;
