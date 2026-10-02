"use client"

import React, { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaRupeeSign,
  FaUserGraduate,
} from "react-icons/fa"
import PageHero from "@/components/PageHero"
import Section from "@/components/Section"
import SectionHeading from "@/components/SectionHeading"
import { SkeletonListPage } from "@/components/Skeleton"
import CollegeCardImage from "@/components/CollegeCardImage";

interface CollegeData {
  id: number
  name: string
  city: string
  fees: string
  seats: number
  recognition: string
  ranking: string
  type: string
  image: string
}

interface StateData {
  id: number
  name: string
  image: string
  description: string
  colleges: CollegeData[]
}

interface MbbsData {
  states: StateData[]
}

const MbbsIndiaPageContent: React.FC = () => {
  const searchParams = useSearchParams()
  const [states, setStates] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const collegesPerPage = 12

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/mbbs-india.json")

        if (!response.ok) {
          throw new Error("Failed to load MBBS India data")
        }

        const data: MbbsData = await response.json()
        setStates(data.states || [])

        const stateParam = searchParams.get("state")
        if (stateParam) {
          const matchedState = data.states.find(
            (s: StateData) => s.name.toLowerCase().replace(/\s+/g, "-") === stateParam
          )
          if (matchedState) {
            setSelectedState(matchedState.name)
          }
        }
      } catch (err) {
        console.error("Data loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  const allColleges = useMemo(() => states.flatMap((state) => state.colleges || []), [states])

  const filteredColleges = useMemo(() => allColleges.filter(
    (college) => {
      const matchesState =
        selectedState === "" ||
        states.find(
          (s) =>
            s.name === selectedState &&
            s.colleges.some((c) => c.id === college.id)
        )

      const matchesSearch =
        college.name.toLowerCase().includes(search.toLowerCase()) ||
        college.city.toLowerCase().includes(search.toLowerCase())

      return matchesState && matchesSearch
    }
  ), [allColleges, selectedState, search, states])

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage)
  const indexOfLastCollege = currentPage * collegesPerPage
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage
  const currentColleges = filteredColleges.slice(indexOfFirstCollege, indexOfLastCollege)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i)
    } else {
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      pages.push(1)
      if (startPage > 2) pages.push("...")
      for (let i = startPage; i <= endPage; i += 1) pages.push(i)
      if (endPage < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }

    return pages
  }

  const totalSeats = useMemo(() => allColleges.reduce((acc, college) => acc + (college.seats || 0), 0), [allColleges])

  if (loading) {
    return <SkeletonListPage stats={4} cards={6} bg="bg-slate-50" />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="light"
        eyebrow="India's Top Medical Colleges"
        title="MBBS Colleges"
        highlight="in India"
        description="Discover top government & private medical colleges with complete details about fees, seats, rankings and admissions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Colleges" }, { label: "MBBS India" }]}
      />

      <Section spacing="md">
        {/* STAT CARDS */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { value: `${states.length}+`, label: "States Covered" },
            { value: `${allColleges.length}+`, label: "Medical Colleges" },
            { value: `${totalSeats.toLocaleString()}+`, label: "MBBS Seats" },
            {
              value: `${allColleges.filter((c) => c.type === "Government").length}+`,
              label: "Government Colleges",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg"
            >
              <p className="text-xl font-extrabold leading-none tracking-tight text-accent-600 sm:text-2xl">
                {item.value}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CENTERED search + state pills */}
        <div className="mx-auto mb-6 w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="relative mb-3">
            <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-base text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges by name, city or recognition..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-28 text-base font-medium text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-accent-400 focus:bg-white focus:ring-4 focus:ring-accent-100"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("")
                  setCurrentPage(1)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-brand-950"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex min-w-0 touch-pan-x snap-x snap-proximity justify-start gap-2 overflow-x-auto overscroll-x-contain scroll-smooth pb-2">
            <button
              onClick={() => {
                setSelectedState("")
                setCurrentPage(1)
              }}
              className={`h-10 shrink-0 rounded-full border px-5 text-sm font-bold transition-all duration-300 ${
                selectedState === ""
                  ? "border-brand-950 bg-brand-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
              }`}
            >
              All States
            </button>
            {states.map((state) => (
              <button
                key={state.id}
                onClick={() => {
                  setSelectedState(state.name)
                  setCurrentPage(1)
                }}
                className={`h-10 shrink-0 rounded-full border px-5 text-sm font-bold transition-all duration-300 ${
                  selectedState === state.name
                    ? "border-brand-950 bg-brand-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
                }`}
              >
                {state.name}
              </button>
            ))}
          </div>
        </div>

        <SectionHeading
          eyebrow={`${filteredColleges.length} results`}
          title="Top Medical Colleges in India"
          className="mb-5"
        />

        {/* COLLEGE CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentColleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-")}`}
              className="group flex flex-col h-full bg-white border border-slate-200 hover:border-brand-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-3xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <CollegeCardImage
                  src={college.image}
                  alt={college.name}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  NMC Approved
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                {college.ranking && (
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-[11px] font-bold uppercase text-accent-600 transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950">
                    <FaStar className="text-[10px]" />
                    {college.ranking}
                  </span>
                )}

                <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-snug tracking-tight text-brand-950 transition-colors duration-300 group-hover:text-accent-600">
                  {college.name}
                </h3>

                <p className="mt-1 truncate text-sm text-gray-600">
                  {college.city} • {college.recognition}
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-gray-600 transition-colors duration-300 group-hover:border-accent-400 group-hover:bg-accent-100">
                      <FaUserGraduate className="text-[11px] text-accent-600" />
                      {college.seats} seats
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-accent-600 group-hover:text-brand-950 text-sm font-bold transition-colors duration-300">
                      Details
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
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setCurrentPage(currentPage - 1)
                    window.scrollTo({ top: 400, behavior: "smooth" })
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
                        <span key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">
                          ...
                        </span>
                      )
                    }
                    const isCurrent = currentPage === page
                    return (
                      <button
                        key={`page-${page}`}
                        onClick={() => {
                          setCurrentPage(page as number)
                          window.scrollTo({ top: 400, behavior: "smooth" })
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
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    setCurrentPage(currentPage + 1)
                    window.scrollTo({ top: 400, behavior: "smooth" })
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

        <div className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h2 className="mb-2 text-base font-extrabold tracking-tight text-brand-950 sm:text-lg">Need MBBS <span className="text-accent-600">Admission Guidance?</span></h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto">
              Get expert counseling for NEET, admission process, counseling, documentation and direct guidance from our MBBS experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-full bg-accent-400 px-6 text-sm font-bold text-brand-950 transition-colors hover:bg-accent-500">
                Get Free Counseling
              </Link>
              <Link href="tel:+919920798988" className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-brand-950 transition-colors hover:border-brand-900 hover:bg-accent-100">
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

const MbbsIndiaPage: React.FC = () => {
  return (
    <Suspense fallback={<SkeletonListPage stats={4} cards={6} bg="bg-slate-50" />}>
      <MbbsIndiaPageContent />
    </Suspense>
  );
};

export default MbbsIndiaPage
