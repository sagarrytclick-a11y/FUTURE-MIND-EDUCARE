"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaGraduationCap,
  FaHospital,
  FaMapMarkerAlt,
  FaUniversity,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-600 text-lg font-medium">
            Loading State Information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-10 text-center border border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            State Not Found
          </h1>

          <p className="text-slate-600 mb-8">
            {error || "The requested state could not be found."}
          </p>

          <Link
            href="/states"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Browse All States
          </Link>
        </div>
      </div>
    );
  }

  const totalSeats = state.colleges.reduce(
    (sum, c) => sum + c.seats,
    0
  );

  const govtColleges = state.colleges.filter(
    (c) => c.type === "Government"
  ).length;

  const privateColleges = state.colleges.filter(
    (c) => c.type === "Private"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={state.image}
            alt={state.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/80 to-blue-900/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap gap-2 text-sm text-blue-100 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/states"
              className="hover:text-white transition-colors"
            >
              States
            </Link>

            <span>/</span>

            <span className="text-white font-semibold">
              {state.name}
            </span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-lg mb-6">
              <FaGraduationCap />
              <span className="text-sm font-medium">
                MBBS Admission 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              MBBS Colleges in{" "}
              <span className="text-blue-300">{state.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mb-10">
              {state.description}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <FaUniversity className="text-2xl text-blue-300" />
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-lg text-blue-100">
                    Colleges
                  </span>
                </div>

                <h3 className="text-4xl font-black text-white">
                  {state.colleges.length}
                </h3>

                <p className="text-blue-100 mt-2">
                  Medical Colleges
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <FaHospital className="text-2xl text-green-300" />
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-lg text-blue-100">
                    Seats
                  </span>
                </div>

                <h3 className="text-4xl font-black text-white">
                  {totalSeats}
                </h3>

                <p className="text-blue-100 mt-2">
                  MBBS Seats Available
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <FaStar className="text-2xl text-yellow-300" />
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-lg text-blue-100">
                    Govt
                  </span>
                </div>

                <h3 className="text-4xl font-black text-white">
                  {govtColleges}
                </h3>

                <p className="text-blue-100 mt-2">
                  Government Colleges
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative -mt-14 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* TOP INFO CARD */}
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-sm text-slate-500 mb-2">
                Government Colleges
              </p>

              <h3 className="text-3xl font-black text-slate-900">
                {govtColleges}
              </h3>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-sm text-slate-500 mb-2">
                Private Colleges
              </p>

              <h3 className="text-3xl font-black text-slate-900">
                {privateColleges}
              </h3>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-sm text-slate-500 mb-2">
                Total MBBS Seats
              </p>

              <h3 className="text-3xl font-black text-slate-900">
                {totalSeats}
              </h3>
            </div>
          </div>
        </div>

        {/* COLLEGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {state.colleges.map((college) => (
            <div
              key={college.id}
              className="group bg-white rounded-[28px] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-college.png";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 rounded-lg text-xs font-bold shadow-lg ${
                      college.type === "Government"
                        ? "bg-green-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>

                {college.ranking && (
                  <div className="absolute top-4 right-4 bg-white text-slate-900 px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                    {college.ranking}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <FaMapMarkerAlt />
                    <span>{college.city}</span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <h3 className="text-2xl font-black text-slate-900 leading-snug mb-5 line-clamp-2">
                  {college.name}
                </h3>

                <div className="space-y-4 mb-7">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">
                      Total Seats
                    </span>

                    <span className="font-bold text-slate-900">
                      {college.seats}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">
                      Annual Fees
                    </span>

                    <span className="font-bold text-blue-600">
                      {college.fees}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500 text-sm">
                      Recognition
                    </span>

                    <span className="font-semibold text-slate-900 text-right">
                      {college.recognition}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    updateFormData({
                      courseInterest: `${college.name} - ${state.name} - MBBS India`,
                    });

                    openPopup();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                >
                  Apply Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ABOUT SECTION */}
        <div className="mt-20 bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold mb-5">
                Medical Education
              </span>

              <h2 className="text-4xl font-black text-slate-900 leading-tight mb-6">
                Why Study MBBS in {state.name}?
              </h2>

              <p className="text-slate-600 leading-relaxed mb-8">
                Medical colleges in {state.name} offer high-quality
                education, experienced faculty, modern hospitals, and
                excellent clinical exposure for aspiring doctors.
              </p>

              <div className="space-y-4">
                {[
                  `${govtColleges} Government Medical Colleges`,
                  `${privateColleges} Private Medical Colleges`,
                  `${totalSeats} Total MBBS Seats`,
                  "NEET Based Admission Process",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-lg bg-white"></div>
                    </div>

                    <p className="text-slate-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[400px]">
              <img
                src={state.image}
                alt={state.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>

              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h3 className="text-3xl font-black mb-4">
                  Admission Guidance
                </h3>

                <p className="text-blue-100 leading-relaxed mb-6">
                  Get complete counseling support for MBBS admissions,
                  college selection, cutoff analysis, and NEET guidance.
                </p>

                <button
                  onClick={openPopup}
                  className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Free Counseling
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatePage;