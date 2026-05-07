"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaGraduationCap,
  FaUniversity,
  FaGlobeAsia,
  FaMoneyBillWave,
  FaCheckCircle,
  FaMapMarkerAlt,
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
      } catch (err) {
        setError("Failed to load country");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-14 w-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading Country Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Country Not Found
          </h1>

          <p className="text-slate-600 mb-8">
            {error || "Requested country does not exist"}
          </p>

          <Link
            href="/colleges/mbbs-abroad"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <FaArrowLeft />
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#12002f]/90 via-[#25005f]/80 to-[#5d00ff]/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/colleges/mbbs-abroad"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-10 transition-all"
          >
            <FaArrowLeft />
            Back to MBBS Abroad
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-5 mb-6">
              <img
                src={country.flag}
                alt={country.name}
                className="w-20 h-14 rounded-xl object-cover border border-white/20 shadow-2xl"
              />

              <span className="bg-white/10 border border-white/20 text-white backdrop-blur-xl px-5 py-2 rounded-full text-sm font-semibold">
                Study MBBS Abroad
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              MBBS in {country.name}
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              {country.description}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <FaUniversity className="text-white text-2xl mb-3" />
                <h3 className="text-3xl font-bold text-white">
                  {country.colleges?.length || 0}
                </h3>
                <p className="text-white/70 text-sm">Medical Colleges</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <FaGraduationCap className="text-white text-2xl mb-3" />
                <h3 className="text-3xl font-bold text-white">
                  {country.universities}
                </h3>
                <p className="text-white/70 text-sm">Universities</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <FaGlobeAsia className="text-white text-2xl mb-3" />
                <h3 className="text-xl font-bold text-white">
                  WHO & NMC
                </h3>
                <p className="text-white/70 text-sm">Recognition</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <FaMoneyBillWave className="text-white text-2xl mb-3" />
                <h3 className="text-xl font-bold text-white">Affordable</h3>
                <p className="text-white/70 text-sm">Fee Structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLEGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-purple-600 font-semibold uppercase tracking-wider mb-2">
              Top Medical Universities
            </p>

            <h2 className="text-4xl font-black text-slate-900">
              Colleges in {country.name}
            </h2>
          </div>

          <button
            onClick={() => {
              updateFormData({
                courseInterest: `MBBS in ${country.name}`,
              });

              openPopup();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-2xl font-semibold shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
          >
            Free Counseling
          </button>
        </div>

        {country.colleges && country.colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {country.colleges.map((college) => (
              <div
                key={college.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-purple-300 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        college.type === "Government"
                          ? "bg-green-500 text-white"
                          : "bg-purple-500 text-white"
                      }`}
                    >
                      {college.type}
                    </span>
                  </div>

                  {college.ranking && (
                    <div className="absolute top-4 right-4 bg-white text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {college.ranking}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt />
                      {college.city}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-snug group-hover:text-purple-600 transition-colors">
                    {college.name}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <span className="text-slate-500 font-medium">
                        Tuition Fees
                      </span>

                      <span className="font-bold text-purple-600">
                        {college.fees}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <span className="text-slate-500 font-medium">
                        Available Seats
                      </span>

                      <span className="font-bold text-slate-900">
                        {college.seats}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <span className="text-slate-500 font-medium">
                        Recognition
                      </span>

                      <span className="font-bold text-slate-900">
                        {college.recognition}
                      </span>
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="space-y-2 mb-6">
                    {[
                      "WHO Approved",
                      "English Medium",
                      "Global Degree",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <FaCheckCircle className="text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        updateFormData({
                          courseInterest: `${college.name} - ${country.name}`,
                        });

                        openPopup();
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all"
                    >
                      Apply Now
                    </button>

                    <button className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all">
                      <FaStar className="text-yellow-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              No Colleges Available
            </h3>

            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Colleges for this country will be added soon. Please explore
              other MBBS abroad destinations.
            </p>

            <Link
              href="/colleges/mbbs-abroad"
              className="inline-flex bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all"
            >
              Explore Other Countries
            </Link>
          </div>
        )}
      </section>

      {/* WHY STUDY */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-purple-600 font-semibold uppercase tracking-wider mb-3">
              Benefits
            </p>

            <h2 className="text-4xl font-black text-slate-900">
              Why Choose {country.name}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-5">
                World-Class Education
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                Medical universities in {country.name} provide globally
                recognized MBBS degrees with advanced practical training,
                modern labs, and international exposure.
              </p>

              <div className="space-y-4">
                {[
                  "Internationally recognized degree",
                  "Experienced faculty members",
                  "Modern medical infrastructure",
                  "English medium education",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <FaCheckCircle className="text-green-500 mt-1" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-5">
                Affordable MBBS Abroad
              </h3>

              <p className="text-white/80 leading-relaxed mb-6">
                Compared to private colleges in India and Western countries,
                studying MBBS in {country.name} is highly affordable with
                quality education and global opportunities.
              </p>

              <div className="space-y-4">
                {[
                  "Affordable tuition fees",
                  "Lower living expenses",
                  "Scholarship opportunities",
                  "High FMGE passing support",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-green-300 mt-1" />
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => openPopup()}
                className="mt-8 bg-white text-purple-700 hover:bg-slate-100 px-6 py-3 rounded-2xl font-bold transition-all"
              >
                Get Free Admission Guidance
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CountrySlugPage;