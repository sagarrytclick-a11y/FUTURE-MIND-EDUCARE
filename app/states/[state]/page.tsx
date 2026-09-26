"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaUniversity,
  FaArrowRight,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { SkeletonDetail } from "@/components/Skeleton";
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

const StatePage: React.FC = () => {
  const params = useParams();
  const [state, setState] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 6;

  const { openPopup, updateFormData } = usePopup();

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        setLoading(true);

        const stateParam = params.state as string;

        const response = await fetch("/mbbs-india.json");

        if (!response.ok) {
          throw new Error("Failed to fetch state data");
        }

        const data: MbbsData = await response.json();

        const foundState = data.states.find(
          (s) =>
            s.name.toLowerCase().replace(/\s+/g, "-") ===
              stateParam.toLowerCase() ||
            s.id.toString() === stateParam
        );

        if (!foundState) {
          setError("State not found");
          return;
        }

        setState(foundState);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [params.state]);

  if (loading) {
    return <SkeletonDetail />;
  }

  if (error || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white max-w-lg w-full rounded-2xl p-5 text-center border border-slate-200">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">State Not Found</h1>
          <p className="text-sm text-gray-600 mb-5">{error || "The requested state could not be found."}</p>
          <Link
            href="/states"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
          >
            Browse All States
          </Link>
        </div>
      </div>
    );
  }

  const totalSeats = state.colleges.reduce((sum, c) => sum + c.seats, 0);
  const govtColleges = state.colleges.filter((c) => c.type === "Government").length;
  const privateColleges = state.colleges.filter((c) => c.type === "Private").length;

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = state.colleges.slice(indexOfFirstCollege, indexOfLastCollege);
  const totalPages = Math.ceil(state.colleges.length / collegesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="light"
        eyebrow="MBBS Admission 2026"
        title={`MBBS Colleges in ${state.name}`}
        description={state.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "States", href: "/states" }, { label: state.name }]}
      />

      <Section spacing="md">
        {/* Slim stat band with banner thumb */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
          <Image
            src={state.image}
            alt={state.name}
            width={224}
            height={80}
            sizes="(max-width: 640px) 100vw, 112px"
            className="h-20 w-full rounded-lg bg-slate-100 object-cover sm:w-28"
          />
          <div className="grid flex-1 grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-50 px-3 py-2.5 text-center">
              <p className="flex items-center justify-center gap-1 text-brand-950 font-extrabold tracking-tight text-base">
                <FaUniversity className="text-xs text-brand-950" />
                {state.colleges.length}
              </p>
              <p className="text-xs text-gray-600">Colleges</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-3 py-2.5 text-center">
              <p className="text-brand-950 font-extrabold tracking-tight text-base">{totalSeats}</p>
              <p className="text-xs text-gray-600">MBBS Seats</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-3 py-2.5 text-center">
              <p className="flex items-center justify-center gap-1 text-brand-950 font-extrabold tracking-tight text-base">
                <FaStar className="text-xs text-yellow-500" />
                {govtColleges}
              </p>
              <p className="text-xs text-gray-600">Govt Colleges</p>
            </div>
          </div>
          <button
            onClick={openPopup}
            className="h-11 shrink-0 rounded-full bg-brand-950 px-6 text-sm font-bold text-white transition-colors hover:bg-brand-900"
          >
            Free Counseling
          </button>
        </div>

        <SectionHeading eyebrow={`${state.colleges.length} colleges`} title={`Top Colleges in ${state.name}`} className="mb-5" />

        {/* COLLEGE CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentColleges.map((college) => (
            <div
              key={college.id}
              className="group flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
            >
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <Image
                  src={college.image}
                  alt={college.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-college.png";
                  }}
                />
                <span
                  className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                    college.type === "Government"
                      ? "bg-brand-950 text-white"
                      : "bg-accent-400 text-brand-950"
                  }`}
                >
                  {college.type}
                </span>
                {college.ranking && (
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase text-accent-600">
                    {college.ranking}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-brand-950 font-extrabold tracking-tight text-base leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-accent-600">
                  {college.name}
                </h3>

                <p className="mt-1 text-sm text-gray-600 truncate">
                  {college.city} • {college.seats} seats
                </p>

                <div className="mt-3 rounded-2xl border border-accent-100 bg-accent-100/50 px-3 py-2.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-accent-600">
                    Fees
                  </p>
                  <p className="text-sm font-extrabold text-brand-950 leading-snug break-words mt-0.5">
                    {college.fees}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500 truncate">{college.recognition}</span>
                  <button
                    onClick={() => {
                      updateFormData({ courseInterest: `${college.name} - ${state.name} - MBBS India` });
                      openPopup();
                    }}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-900"
                  >
                    Apply Now
                    <FaArrowRight className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white rounded-full border border-slate-200 p-2 flex items-center gap-1.5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="w-11 h-11 rounded-full hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <FaChevronLeft className="text-gray-600 text-xs" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-11 h-11 rounded-full text-sm font-bold transition-colors ${
                          currentPage === page ? "bg-brand-950 text-white" : "hover:bg-accent-100 text-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
                    return (
                      <span key={page} className="px-1.5 text-gray-400 text-sm">...</span>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="w-11 h-11 rounded-full hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <FaChevronRight className="text-gray-600 text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* Why-study strip */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <SectionHeading
              eyebrow="Medical Education"
            title={`Why Study MBBS in ${state.name}?`}
            description={`Medical colleges in ${state.name} offer high-quality education, experienced faculty, modern hospitals, and excellent clinical exposure for aspiring doctors.`}
            className="mb-4"
          />
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {[
              `${govtColleges} Government Medical Colleges`,
              `${privateColleges} Private Medical Colleges`,
              `${totalSeats} Total MBBS Seats`,
              "NEET Based Admission Process",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm font-medium text-gray-600">
                <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-brand-950" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
};

export default StatePage;
