"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaGlobeAsia,
  FaUniversity,
  FaUserGraduate,
  FaArrowRight,
  FaRupeeSign,
  FaCheckCircle,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { dataCache, CACHE_KEYS } from "@/lib/data-cache";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

interface CollegeData {
  id: number;
  name: string;
  city: string;
  fees: string;
  seats?: number;
  duration?: string;
  recognition: string;
  medium?: string;
  ranking?: string;
  type: string;
  image: string;
}

interface CountryData {
  id: number;
  name: string;
  flag: string;
  colleges?: CollegeData[];
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
        const data = dataCache.get<{ countries?: typeof countries }>(CACHE_KEYS.MBBS_ABROAD);
        setCountries(data?.countries || []);
      } catch (error) {
        console.error("Data loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);
  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = filteredColleges.slice(indexOfFirstCollege, indexOfLastCollege);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

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

  const totalCountries = countries.length;
  const totalColleges = allColleges.length;
  const totalSeats = allColleges.reduce((sum, college) => sum + (college.seats || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-gray-600 text-sm font-medium">Loading Colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        align="center"
        variant="light"
        eyebrow="Trusted MBBS Abroad Consultancy"
        title="Study"
        highlight="MBBS Abroad"
        description="Explore top NMC & WHO approved medical universities across the world with affordable fees and global recognition."
        crumbs={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges/mbbs-india" }, { label: "MBBS Abroad" }]}
      />

      <Section spacing="md">
        {/* Inline counts */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: <FaGlobeAsia />, value: `${totalCountries}+`, label: "Countries" },
            { icon: <FaUniversity />, value: `${totalColleges}+`, label: "Colleges" },
            { icon: <FaUserGraduate />, value: `${totalSeats.toLocaleString()}+`, label: "Total Seats" },
          ].map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:bg-brand-950 hover:border-brand-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-100 group-hover:bg-accent-400 text-accent-600 group-hover:text-brand-950 text-sm transition-colors duration-300">
                {item.icon}
              </span>
              <p className="text-sm text-gray-600 group-hover:text-slate-300 transition-colors duration-300">
                <strong className="text-accent-600 group-hover:text-accent-400 font-extrabold tracking-tight text-base">
                  {item.value}
                </strong>{" "}
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Slim pill filter bar */}
        <div className="mb-5 flex flex-col gap-2 rounded-full border border-slate-200 bg-white p-2 sm:flex-row">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search college or city..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-800 focus:ring-2 focus:ring-accent-100"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-full rounded-full border border-slate-200 bg-white px-5 text-sm outline-none focus:border-brand-800 focus:ring-2 focus:ring-accent-100 sm:w-56"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <SectionHeading
          eyebrow={`${filteredColleges.length} results`}
          title="Top Medical Colleges"
          className="mb-5"
        />

        {filteredColleges.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-gray-600">No colleges found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* COLLEGE CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentColleges.map((college) => (
                <Link
                  key={college.id}
                  href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-")}`}
                  className="group flex flex-col h-full bg-white border border-slate-200 hover:border-brand-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-3xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={college.image}
                      alt={college.name}
                      loading="lazy"
                      className="w-full h-40 object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-2.5 left-2.5 text-[11px] font-bold uppercase rounded-full px-2.5 py-1 ${
                        college.type === "Government"
                          ? "bg-brand-950 text-white"
                          : "bg-accent-400 text-brand-950"
                      }`}
                    >
                      {college.type || "Private"}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 bg-white/95 text-green-700 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                      <FaCheckCircle className="text-[10px]" />
                      WHO &amp; NMC
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    {college.ranking && (
                      <span className="self-start bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                        <FaStar className="mr-1 inline text-[10px] text-accent-500" />
                        {college.ranking}
                      </span>
                    )}

                    <h3 className="mt-2 text-brand-950 group-hover:text-brand-900 font-extrabold tracking-tight text-base leading-snug line-clamp-2 transition-colors duration-300">
                      {college.name}
                    </h3>

                    <p className="mt-1 text-gray-600 text-sm truncate transition-colors duration-300">
                      {college.city} • {college.medium} • {college.recognition}
                    </p>

                    <div className="mt-3">
                      <div className="rounded-2xl border border-accent-100 bg-accent-100/50 px-3 py-2.5">
                        <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-accent-600">
                          <FaRupeeSign className="text-[10px]" />
                          Fees
                        </p>
                        <p className="text-sm font-extrabold text-brand-950 leading-snug break-words mt-0.5">
                          {college.fees}
                        </p>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 transition-colors duration-300">
                          <FaUserGraduate className="text-[11px] text-brand-950 group-hover:text-accent-600" />
                          {college.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-accent-600 group-hover:text-brand-950 text-sm font-bold transition-colors duration-300">
                          View
                          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="py-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-6 bg-brand-950 text-white rounded-full text-sm font-bold hover:bg-brand-900 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <FaChevronLeft className="text-xs" />
                      <span>Previous</span>
                    </button>
                    <div className="flex items-center justify-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
                      {getPageNumbers().map((page, index) => {
                        if (page === "...") {
                          return (
                            <span
                              key={`ellipsis-${index}`}
                              className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none"
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
                            className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full font-bold transition-colors text-sm ${
                              isCurrent
                                ? "bg-brand-950 text-white cursor-not-allowed"
                                : "bg-slate-100 text-slate-600 hover:bg-brand-950 hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-6 bg-brand-950 text-white rounded-full text-sm font-bold hover:bg-brand-900 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <span>Next</span>
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                  <div className="text-center mt-3 text-gray-600 text-xs font-medium border-t border-slate-200 pt-3">
                    Showing Page {currentPage} of {totalPages} ({filteredColleges.length} Total Colleges)
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-6 rounded-2xl bg-brand-950 border border-brand-900 p-5">
          <h2 className="text-white font-extrabold tracking-tight text-base sm:text-lg mb-3">
            Why Choose <span className="text-accent-400">Study Abroad?</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {["Global Recognition", "Affordable Fees", "English Medium", "No Donation"].map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm font-semibold text-slate-100"
              >
                <FaCheckCircle className="text-[11px] text-accent-400 shrink-0" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MbbsAbroadPage;
