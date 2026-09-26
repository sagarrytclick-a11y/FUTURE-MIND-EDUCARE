"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { SkeletonListPage } from "@/components/Skeleton";
import Image from "next/image";

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
        const response = await fetch("/mbbs-india.json");

        if (!response.ok) {
          throw new Error("Failed to fetch states data");
        }

        const data: MbbsData = await response.json();

        setStates(data.states);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load states data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  if (loading) {
    return <SkeletonListPage stats={4} cards={6} bg="bg-slate-50" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center max-w-md w-full">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">Something Went Wrong</h1>
          <p className="text-sm text-gray-600 mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalColleges = states.reduce((sum, state) => sum + state.colleges.length, 0);
  const totalSeats = states.reduce(
    (sum, state) => sum + state.colleges.reduce((collegeSum, college) => collegeSum + college.seats, 0),
    0
  );
  const totalGovtColleges = states.reduce(
    (sum, state) => sum + state.colleges.filter((college) => college.type === "Government").length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        variant="tinted"
        eyebrow="Explore MBBS Colleges State Wise"
        title="MBBS Colleges"
        highlight="Across India"
        description="Discover top government and private medical colleges across different states in India. Compare seats, infrastructure, fees, and opportunities for your medical career."
        crumbs={[{ label: "Home", href: "/" }, { label: "States" }]}
      />

      <Section spacing="md">
        {/* Compact ledger totals */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div className="px-3 py-2.5 text-center">
              <p className="text-accent-600 font-extrabold tracking-tight text-base">{states.length}</p>
              <p className="text-xs text-gray-600">States Covered</p>
            </div>
            <div className="px-3 py-2.5 text-center">
              <p className="text-accent-600 font-extrabold tracking-tight text-base">{totalColleges}</p>
              <p className="text-xs text-gray-600">Medical Colleges</p>
            </div>
            <div className="px-3 py-2.5 text-center">
              <p className="text-accent-600 font-extrabold tracking-tight text-base">{totalSeats.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Total Seats</p>
            </div>
          </div>
        </div>

        <SectionHeading
          eyebrow="All States"
          title="Browse by State"
          description="Choose your preferred state and explore the best medical colleges with detailed information about seats, infrastructure, fees, and admissions."
          className="mb-5"
        />

        {/* STATE CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => {
            const stateSlug = state.name.toLowerCase().replace(/\s+/g, "-");
            const govtColleges = state.colleges.filter((college) => college.type === "Government").length;
            const privateColleges = state.colleges.filter((college) => college.type === "Private").length;
            const stateSeats = state.colleges.reduce((sum, college) => sum + college.seats, 0);

            return (
              <Link
                key={state.id}
                href={`/states/${stateSlug}`}
                className="group flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <Image
                  src={state.image}
                  alt={state.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-state.png";
                    }}
                />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                    MBBS State
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-brand-950 font-extrabold tracking-tight text-base leading-snug transition-colors duration-300 group-hover:text-accent-600">
                    {state.name}
                  </h3>

                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    {[
                      { value: state.colleges.length, label: "Colleges" },
                      { value: stateSeats, label: "Seats" },
                      { value: govtColleges, label: "Govt" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-slate-200 bg-accent-100/50 px-2 py-1.5 text-center"
                      >
                        <p className="text-sm font-extrabold text-brand-950 leading-none">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-2.5 text-xs text-gray-600">
                    {privateColleges} Private colleges
                  </p>

                  <span className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      View Colleges
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-accent-600">
                      Explore
                      <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section spacing="md" className="bg-white">
        <SectionHeading
          eyebrow="Benefits"
          title="Why Study MBBS in India?"
          description="India offers world-class medical education with affordable fees, modern hospitals, and globally recognized degrees."
        />
        {/* Inline checklist */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {[
              "NMC/MCI recognized medical colleges",
              "Experienced faculty and practical training",
              "Advanced infrastructure and labs",
              "Clinical exposure from early years",
              "Affordable government college fees",
              "Scholarship opportunities available",
              "Lower living expenses",
              "Excellent career opportunities worldwide",
            ].map((item, index) => (
              <span key={index} className="inline-flex items-start gap-2 text-sm text-gray-600">
                <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-brand-950" />
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-slate-200 pt-4">
            <span className="text-sm text-gray-600"><strong className="text-brand-950 font-extrabold tracking-tight">{totalGovtColleges}+</strong> Govt Colleges</span>
            <span className="text-sm text-gray-600"><strong className="text-brand-950 font-extrabold tracking-tight">{totalSeats.toLocaleString()}+</strong> MBBS Seats</span>
            <span className="text-sm text-gray-600"><strong className="text-brand-950 font-extrabold tracking-tight">{states.length}+</strong> States Covered</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default StatesPage;
