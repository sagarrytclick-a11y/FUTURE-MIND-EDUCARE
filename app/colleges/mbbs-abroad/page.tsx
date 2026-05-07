"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaGlobeAsia,
  FaUniversity,
  FaUserGraduate,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
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

interface CountryData {
  id: number;
  name: string;
  flag: string;
  colleges?: CollegeData[];
}

interface MbbsAbroadData {
  countries: CountryData[];
}

const MbbsAbroadPage: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/mbbs-abroad.json");
        const data: MbbsAbroadData = await response.json();

        setCountries(data.countries || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const allColleges = useMemo(() => {
    return countries.flatMap((country) => country.colleges || []);
  }, [countries]);

  const filteredColleges = useMemo(() => {
    return allColleges.filter((college) => {
      const matchCountry =
        !selectedCountry ||
        countries.find(
          (country) =>
            country.name === selectedCountry &&
            country.colleges?.some((c) => c.id === college.id)
        );

      const matchSearch =
        college.name.toLowerCase().includes(search.toLowerCase()) ||
        college.city.toLowerCase().includes(search.toLowerCase());

      return matchCountry && matchSearch;
    });
  }, [allColleges, selectedCountry, search, countries]);

  const totalCountries = countries.length;

  const totalColleges = allColleges.length;

  const totalSeats = allColleges.reduce(
    (sum, college) => sum + college.seats,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg font-medium">
            Loading Colleges...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fb] min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-6">
              <FaGlobeAsia className="text-yellow-300" />
              <span className="text-sm font-semibold">
                Trusted MBBS Abroad Consultancy
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Study <span className="text-yellow-300">MBBS Abroad</span>
            </h1>

            <p className="text-lg md:text-xl text-purple-100 leading-8 mb-10">
              Explore top medical universities worldwide with affordable tuition
              fees, globally recognized degrees, and world-class education.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                <FaGlobeAsia className="text-4xl text-yellow-300 mx-auto mb-4" />
                <h2 className="text-4xl font-black">{totalCountries}+</h2>
                <p className="text-purple-100 mt-2">Countries</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                <FaUniversity className="text-4xl text-yellow-300 mx-auto mb-4" />
                <h2 className="text-4xl font-black">{totalColleges}+</h2>
                <p className="text-purple-100 mt-2">Medical Colleges</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                <FaUserGraduate className="text-4xl text-yellow-300 mx-auto mb-4" />
                <h2 className="text-4xl font-black">
                  {totalSeats.toLocaleString()}+
                </h2>
                <p className="text-purple-100 mt-2">Total Seats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="max-w-7xl mx-auto px-4 -mt-14 relative z-20">
        <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* SEARCH */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search college or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    pl-14
                    pr-4
                    text-gray-900
                    outline-none
                    focus:ring-4
                    focus:ring-purple-200
                    focus:border-purple-500
                    transition-all
                  "
                />
              </div>
            </div>

            {/* COUNTRY FILTER */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-5
                  text-gray-800
                  outline-none
                  focus:ring-4
                  focus:ring-purple-200
                  focus:border-purple-500
                "
              >
                <option value="">All Countries</option>

                {countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* COLLEGES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Top Medical Colleges
            </h2>

            <p className="text-gray-600 text-lg">
              {filteredColleges.length} colleges available
            </p>
          </div>
        </div>

        {filteredColleges.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-14 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Colleges Found
            </h3>

            <p className="text-gray-600">
              Try changing filters or search keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredColleges.map((college) => (
              <div
                key={college.id}
                className="
                  bg-white
                  rounded-[32px]
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  group
                  hover:-translate-y-3
                  border
                  border-gray-100
                "
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-5 left-5">
                    <span
                      className={`
                      px-4 py-2 rounded-full text-xs font-bold shadow-lg
                      ${
                        college.type === "Government"
                          && "bg-green-500 text-white"
                         
                      }
                    `}
                    >
                      {college.type}
                    </span>
                  </div>

                  {college.ranking && (
                    <div className="absolute top-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaStar />
                      {college.ranking}
                    </div>
                  )}

                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-sm opacity-90">{college.city}</p>

                    <h3 className="text-2xl font-black leading-tight max-w-xs">
                      {college.name}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Tuition Fees</span>

                      <span className="font-black text-purple-700">
                        {college.fees}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Seats</span>

                      <span className="font-bold text-gray-900">
                        {college.seats}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Recognition</span>

                      <span className="font-semibold text-gray-900">
                        {college.recognition}
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-5">
                      <FaCheckCircle />
                      WHO & NMC Approved
                    </div>

                    <Link
                      href={`/colleges/${college.name
                        .toLowerCase()
                        .replace(/[^a-z0-9\s]/g, "")
                        .replace(/\s+/g, "-")}`}
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        bg-gradient-to-r
                        from-purple-600
                        to-indigo-600
                        hover:from-purple-700
                        hover:to-indigo-700
                        text-white
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition-all
                        duration-300
                        shadow-lg
                      "
                    >
                      View Details
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WHY MBBS ABROAD */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Why Choose MBBS Abroad?
            </h2>

            <p className="text-lg text-gray-600 leading-8">
              Study in internationally recognized universities with advanced
              infrastructure and affordable education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[32px] p-10 border border-purple-100">
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Global Recognition
              </h3>

              <div className="space-y-5">
                {[
                  "WHO & NMC Approved Universities",
                  "International Exposure",
                  "Advanced Medical Infrastructure",
                  "Globally Recognized Degrees",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 text-gray-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                      ✓
                    </div>

                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[32px] p-10 border border-green-100">
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Affordable Education
              </h3>

              <div className="space-y-5">
                {[
                  "Low Tuition Fees",
                  "No Donation Required",
                  "Scholarship Opportunities",
                  "English Medium Programs",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 text-gray-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                      ✓
                    </div>

                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MbbsAbroadPage;