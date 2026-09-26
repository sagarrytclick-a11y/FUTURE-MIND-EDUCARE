"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaUniversity,
  FaGlobeAsia,
  FaMoneyBillWave,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { handleImageError } from "@/lib/img-fallback";
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

interface CountryData {
  id: number;
  name: string;
  flag: string;
  image: string;
  description: string;
  universities: number;
  courses: string;
  colleges?: CollegeData[];
}

interface MbbsAbroadData {
  countries: CountryData[];
}

const CountrySlugPage: React.FC = () => {
  const params = useParams();
  const { openPopup, updateFormData } = usePopup();

  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 6;

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);

        const response = await fetch("/mbbs-abroad.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: MbbsAbroadData = await response.json();

        const slug = params.slug as string;

        const foundCountry = data.countries.find((item) => {
          const generatedSlug = item.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-");

          return generatedSlug === slug;
        });

        if (!foundCountry) {
          setError("Country not found");
        } else {
          setCountry(foundCountry);
        }
      } catch {
        setError("Failed to load country");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [params.slug]);

  if (loading) {
    return <SkeletonDetail />;
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center max-w-lg w-full">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">Country Not Found</h1>
          <p className="text-sm text-gray-600 mb-5">{error || "Requested country does not exist"}</p>
          <Link
            href="/colleges/mbbs-abroad"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
          >
            <FaArrowLeft />
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = (country.colleges || []).slice(indexOfFirstCollege, indexOfLastCollege);
  const totalPages = Math.ceil((country.colleges?.length || 0) / collegesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="dark"
        eyebrow="Study MBBS Abroad"
        title={`MBBS in ${country.name}`}
        description={country.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "MBBS Abroad", href: "/colleges/mbbs-abroad" }, { label: country.name }]}
      />

      <Section spacing="md">
        {/* Fact strip */}
        <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">
          {[
            { icon: FaUniversity, big: `${country.colleges?.length || 0}`, small: "Medical Colleges" },
            { icon: FaGraduationCap, big: `${country.universities}`, small: "Universities" },
            { icon: FaGlobeAsia, big: "WHO & NMC", small: "Recognition" },
            { icon: FaMoneyBillWave, big: "Affordable", small: "Fee Structure" },
          ].map((fact, i) => (
            <div key={i} className="flex items-center gap-3 bg-white px-3 py-2.5">
              <fact.icon className="shrink-0 text-sm text-brand-950" />
              <div className="min-w-0">
                <p className="truncate text-brand-950 font-extrabold tracking-tight text-base">{fact.big}</p>
                <p className="text-xs text-gray-600">{fact.small}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <SectionHeading
            align="center"
            eyebrow="Top Medical Universities"
            title={`Colleges in ${country.name}`}
            className="mb-0"
          />
          <button
            onClick={() => {
              updateFormData({ courseInterest: `MBBS in ${country.name}` });
              openPopup();
            }}
            className="h-11 px-6 shrink-0 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
          >
            Free Counseling
          </button>
        </div>

        {country.colleges && country.colleges.length > 0 ? (
          <>
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
                  onError={handleImageError}
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

                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-600">
                      <FaCheckCircle className="text-[11px] text-green-600" />
                      WHO • English Medium
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
                          updateFormData({ courseInterest: `${college.name} - ${country.name}` });
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
          </>
        ) : (
          <div className="bg-white rounded-2xl p-5 text-center border border-slate-200">
            <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">No Colleges Available</h3>
            <p className="text-sm text-gray-600 mb-5 max-w-2xl mx-auto">
              Colleges for this country will be added soon. Please explore other MBBS abroad destinations.
            </p>
            <Link
              href="/colleges/mbbs-abroad"
              className="inline-flex items-center justify-center h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
            >
              Explore Other Countries
            </Link>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-1">World-Class Education</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Medical universities in {country.name} provide globally recognized MBBS degrees with advanced practical training, modern labs, and international exposure.
            </p>
            <ul className="space-y-2">
              {[
                "Internationally recognized degree",
                "Experienced faculty members",
                "Modern medical infrastructure",
                "English medium education",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-brand-950" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-accent-100 p-5">
            <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-1">Affordable MBBS Abroad</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Compared to private colleges in India and Western countries, studying MBBS in {country.name} is highly affordable with quality education and global opportunities.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                "Affordable tuition fees",
                "Lower living expenses",
                "Scholarship opportunities",
                "High FMGE passing support",
              ].map((item, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <FaCheckCircle className="text-xs text-brand-950" />
                  {item}
                </span>
              ))}
            </div>
            <button
              onClick={() => openPopup()}
              className="mt-4 h-11 px-6 bg-brand-950 text-white hover:bg-brand-900 rounded-full text-sm font-bold transition-colors"
            >
              Get Free Admission Guidance
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CountrySlugPage;
