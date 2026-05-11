"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaMapMarkedAlt,
  FaUniversity,
  FaUserGraduate,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

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
    return (
      <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-700 border-t-transparent animate-spin"></div>
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Loading States...
          </h2>

          <p className="text-gray-500 mt-2">
            Fetching medical colleges data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-3xl">!</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-gray-600 mb-8">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Stats
  const totalColleges = states.reduce(
    (sum, state) => sum + state.colleges.length,
    0
  );

  const totalSeats = states.reduce(
    (sum, state) =>
      sum +
      state.colleges.reduce(
        (collegeSum, college) => collegeSum + college.seats,
        0
      ),
    0
  );

  const totalGovtColleges = states.reduce(
    (sum, state) =>
      sum +
      state.colleges.filter(
        (college) => college.type === "Government"
      ).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#f7fbff] overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 text-white">
        {/* Blur Circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 rounded-lg blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-lg blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg px-5 py-2 mb-8">
              <FaMapMarkedAlt className="text-cyan-300" />
              <span className="text-sm font-medium">
                Explore MBBS Colleges State Wise
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              MBBS Colleges <br />
              <span className="text-cyan-300">Across India</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed">
              Discover top government and private medical colleges
              across different states in India. Compare seats,
              infrastructure, fees, and opportunities for your
              medical career.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {states.length}
                </h2>
                <p className="text-blue-100 mt-2">States Covered</p>
              </div>

              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {totalColleges}
                </h2>
                <p className="text-blue-100 mt-2">
                  Medical Colleges
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {totalSeats.toLocaleString()}
                </h2>
                <p className="text-blue-100 mt-2">Total Seats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-blue-700 transition">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900 font-semibold">
            States
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold mb-4">
              All States
            </span>

            <h2 className="text-4xl font-black text-gray-900">
              Browse by State
            </h2>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Choose your preferred state and explore the best
            medical colleges with detailed information about
            seats, infrastructure, fees, and admissions.
          </p>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {states.map((state) => {
            const stateSlug = state.name
              .toLowerCase()
              .replace(/\s+/g, "-");

            const govtColleges = state.colleges.filter(
              (college) => college.type === "Government"
            ).length;

            const privateColleges = state.colleges.filter(
              (college) => college.type === "Private"
            ).length;

            const stateSeats = state.colleges.reduce(
              (sum, college) => sum + college.seats,
              0
            );

            return (
              <Link
                key={state.id}
                href={`/states/${stateSlug}`}
                className="group relative bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target =
                        e.target as HTMLImageElement;
                      target.src = "/placeholder-state.png";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white text-sm font-semibold">
                    MBBS State
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-black text-white mb-2">
                      {state.name}
                    </h3>

                    <p className="text-blue-100 text-sm line-clamp-2">
                      {state.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-2xl p-5 text-center">
                      <FaUniversity className="mx-auto text-blue-700 text-2xl mb-3" />

                      <h4 className="text-3xl font-black text-gray-900">
                        {state.colleges.length}
                      </h4>

                      <p className="text-gray-500 text-sm">
                        Colleges
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-5 text-center">
                      <FaUserGraduate className="mx-auto text-green-700 text-2xl mb-3" />

                      <h4 className="text-3xl font-black text-gray-900">
                        {stateSeats}
                      </h4>

                      <p className="text-gray-500 text-sm">
                        Seats
                      </p>
                    </div>
                  </div>

                  {/* Govt / Private */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-lg bg-green-500"></span>

                        <span className="text-gray-700">
                          Government Colleges
                        </span>
                      </div>

                      <span className="font-bold text-gray-900">
                        {govtColleges}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-lg bg-purple-500"></span>

                        <span className="text-gray-700">
                          Private Colleges
                        </span>
                      </div>

                      <span className="font-bold text-gray-900">
                        {privateColleges}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-bold text-lg">
                      Explore Colleges
                    </span>

                    <div className="w-12 h-12 rounded-lg bg-blue-700 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold mb-5">
              Benefits
            </span>

            <h2 className="text-5xl font-black text-gray-900 mb-5">
              Why Study MBBS in India?
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              India offers world-class medical education with
              affordable fees, modern hospitals, and globally
              recognized degrees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left */}
            <div className="bg-[#f7fbff] border border-blue-100 rounded-[32px] p-10 hover:shadow-xl transition">
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Quality Education
              </h3>

              <div className="space-y-5">
                {[
                  "NMC/MCI recognized medical colleges",
                  "Experienced faculty and practical training",
                  "Advanced infrastructure and labs",
                  "Clinical exposure from early years",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <FaCheckCircle className="text-blue-700 mt-1 shrink-0" />

                    <p className="text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="bg-[#f7fff8] border border-green-100 rounded-[32px] p-10 hover:shadow-xl transition">
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Affordable & Rewarding
              </h3>

              <div className="space-y-5">
                {[
                  "Affordable government college fees",
                  "Scholarship opportunities available",
                  "Lower living expenses",
                  "Excellent career opportunities worldwide",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <FaCheckCircle className="text-green-700 mt-1 shrink-0" />

                    <p className="text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-blue-700 text-white rounded-3xl p-8 text-center">
              <h3 className="text-5xl font-black mb-3">
                {totalGovtColleges}+
              </h3>
              <p className="text-blue-100">
                Government Medical Colleges
              </p>
            </div>

            <div className="bg-gray-900 text-white rounded-3xl p-8 text-center">
              <h3 className="text-5xl font-black mb-3">
                {totalSeats.toLocaleString()}+
              </h3>
              <p className="text-gray-300">MBBS Seats</p>
            </div>

            <div className="bg-cyan-600 text-white rounded-3xl p-8 text-center">
              <h3 className="text-5xl font-black mb-3">
                {states.length}+
              </h3>
              <p className="text-cyan-100">States Covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatesPage;