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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { dataCache, CACHE_KEYS } from "@/lib/data-cache";

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
  const [currentPage, setCurrentPage] = useState(1);

  const collegesPerPage = 12;

  useEffect(() => {
    const loadData = () => {
      try {
        const data = dataCache.get(CACHE_KEYS.MBBS_ABROAD);
        setCountries(data.countries || []);
      } catch (error) {
        console.error("Data loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ALL COLLEGES
  const allColleges = useMemo(() => {
    return countries.flatMap((country) => country.colleges || []);
  }, [countries]);

  // FILTERED COLLEGES
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

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);
  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = filteredColleges.slice(indexOfFirstCollege, indexOfLastCollege);

  // WINDOWED PAGINATION LOGIC (Generates array with 1 ... 4 5 6 ... 20)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Total target items in array

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // STATS
  const totalCountries = countries.length;
  const totalColleges = allColleges.length;
  const totalSeats = allColleges.reduce((sum, college) => sum + (college.seats || 0), 0);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-gray-600 text-lg font-medium">Loading Colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg mb-4 sm:mb-6">
            <FaGlobeAsia className="text-yellow-300 text-lg sm:text-xl" />
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
              Trusted MBBS Abroad Consultancy
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 md:mb-6 leading-tight px-2 sm:px-0">
            Study <span className="text-yellow-300">MBBS Abroad</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-blue-100 px-4 sm:px-0">
            Explore top NMC & WHO approved medical universities across the world with affordable fees and global recognition.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <FaGlobeAsia className="text-2xl sm:text-3xl text-yellow-300 mx-auto mb-2" />
              <h2 className="text-2xl sm:text-3xl font-black">{totalCountries}+</h2>
              <p className="text-blue-100 text-xs sm:text-sm">Countries</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <FaUniversity className="text-2xl sm:text-3xl text-yellow-300 mx-auto mb-2" />
              <h2 className="text-2xl sm:text-3xl font-black">{totalColleges}+</h2>
              <p className="text-blue-100 text-xs sm:text-sm">Medical Colleges</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <FaUserGraduate className="text-2xl sm:text-3xl text-yellow-300 mx-auto mb-2" />
              <h2 className="text-2xl sm:text-3xl font-black">{totalSeats.toLocaleString()}+</h2>
              <p className="text-blue-100 text-xs sm:text-sm">Total Seats</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 lg:-mt-10 relative z-20">
        <div className="bg-white rounded-xl sm:rounded-[24px] shadow-xl p-3 sm:p-4 lg:p-6 border border-gray-100 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
          {/* SEARCH */}
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Search college or city..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border bg-gray-50 pl-9 sm:pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm sm:text-base"
            />
          </div>

          {/* FILTER */}
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border bg-gray-50 px-3 sm:px-4 outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* COLLEGES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Top Medical Colleges</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">{filteredColleges.length} results found</p>
        </div>

        {filteredColleges.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-sm">
            <p className="text-lg sm:text-xl text-gray-400">No colleges found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-xl sm:rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* IMAGE */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* TYPE */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span
                        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
                          college.type === "Government" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      >
                        {college.type || "Private"}
                      </span>
                    </div>

                    {/* RANK */}
                    {college.ranking && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        <FaStar className="text-xs" />
                        <span className="hidden sm:inline">{college.ranking}</span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-4 lg:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 line-clamp-2 sm:line-clamp-1">
                      {college.name}
                    </h3>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 lg:mb-6">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-500">Fees</span>
                        <span className="font-bold text-blue-700 text-xs sm:text-sm">{college.fees}</span>
                      </div>

                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-500">City</span>
                        <span className="text-gray-900 font-medium text-xs sm:text-sm">{college.city}</span>
                      </div>

                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-500">Recognition</span>
                        <span className="text-gray-900 font-medium text-xs sm:text-sm">{college.recognition}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-600 text-xs sm:text-sm font-bold mb-2 sm:mb-3 lg:mb-4">
                      <FaCheckCircle className="text-xs sm:text-sm" />
                      <span className="text-xs sm:text-sm">WHO & NMC APPROVED</span>
                    </div>

                    <Link
                      href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-")}`}
                      className="w-full py-2 sm:py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all text-sm sm:text-base"
                    >
                      View Details
                      <FaArrowRight className="text-sm sm:text-base" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* NEW WINDOWED PAGINATION */}
            {totalPages > 1 && (
              <div className="max-w-7xl mx-auto py-8">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* PREVIOUS BUTTON */}
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm"
                    >
                      <FaChevronLeft className="text-xs" />
                      <span>Previous</span>
                    </button>

                    {/* DYNAMIC PAGE NUMBERS WITH ELLIPSIS */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto py-2">
                      {getPageNumbers().map((page, index) => {
                        if (page === "...") {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-gray-400 font-medium text-sm select-none"
                            >
                              ...
                            </span>
                          );
                        }

                        const isCurrent = currentPage === page;

                        return (
                          <button
                            key={`page-${page}`}
                            onClick={() => {
                              setCurrentPage(page as number);
                              window.scrollTo({ top: 400, behavior: "smooth" });
                            }}
                            disabled={isCurrent}
                            className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-xl font-semibold transition-all duration-200 text-sm ${
                              isCurrent
                                ? "bg-blue-50 text-blue-600 border-2 border-blue-600 cursor-not-allowed"
                                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    {/* NEXT BUTTON */}
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm"
                    >
                      <span>Next</span>
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>

                  {/* BOTTOM PAGE DETAILS INFO */}
                  <div className="text-center mt-4 text-gray-500 text-xs font-medium border-t border-gray-50 pt-3">
                    Showing Page {currentPage} of {totalPages} ({filteredColleges.length} Total Colleges)
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-12 sm:py-16 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8 sm:mb-12">
            Why Choose Study Abroad?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {["Global Recognition", "Affordable Fees", "English Medium", "No Donation"].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-sm sm:text-base">
                  ✓
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MbbsAbroadPage;