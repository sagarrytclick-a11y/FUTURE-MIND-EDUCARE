"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaRupeeSign,
  FaUniversity,
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

interface MdMsData {
  states: StateData[]
}

const MdMsPage: React.FC = () => {
  const [states, setStates] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const collegesPerPage = 12

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/md-ms.json")

        if (!response.ok) {
          throw new Error("Failed to load MD/MS data")
        }

        const data: MdMsData = await response.json()
        setStates(data.states || [])
      } catch (err) {
        console.error("Data loading error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const allColleges = useMemo(() => states.flatMap((state) => state.colleges || []), [states])

  const filteredColleges = useMemo(() => allColleges.filter(
    (college) => {
      const matchesState =
        selectedState === "" ||
        states.find(
          (s) => s.name === selectedState && s.colleges.some((c) => c.id === college.id)
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
    return <SkeletonListPage stats={4} cards={6} bg="bg-white" />
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        align="center"
        variant="light"
        eyebrow="India's Top MD/MS Programs"
        title="MD/MS PG Programs"
        highlight="in India"
        description="Explore premier post-graduate medical colleges with complete details about fees, seats, rankings and NEET PG admissions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Colleges" }, { label: "MD/MS" }]}
      />

      <Section spacing="md">
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: `${states.length}`, label: "States Covered" },
            { value: `${allColleges.length}`, label: "PG Colleges" },
            { value: `${totalSeats.toLocaleString()}`, label: "PG Seats" },
          ].map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:bg-brand-950 hover:border-brand-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-accent-600 font-extrabold tracking-tight text-lg leading-none">
                {item.value}+
              </p>
              <p className="text-xs text-gray-600 group-hover:text-slate-300 mt-1 transition-colors duration-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mb-5 border-l-2 border-brand-950 pl-3 text-sm font-medium text-gray-600">
          Expert guidance for NEET PG preparation and MD/MS admission counseling.
        </p>

        {/* Slim pill filter bar with state select */}
        <div className="mb-5 flex flex-col gap-2 rounded-full border border-slate-200 bg-slate-50 p-2 sm:flex-row">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search PG colleges..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-brand-800 focus:ring-2 focus:ring-accent-100"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value)
              setCurrentPage(1)
            }}
            className="h-11 w-full rounded-full border border-slate-200 bg-white px-5 text-sm outline-none focus:border-brand-800 focus:ring-2 focus:ring-accent-100 sm:w-56"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <SectionHeading eyebrow={`${filteredColleges.length} results`} title="Top MD/MS Colleges" className="mb-5" />

        {/* COLLEGE CARD GRID */}
        {currentColleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentColleges.map((college) => (
              <Link
                key={college.id}
                href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-")}`}
                className="group flex flex-col h-full bg-white border border-slate-200 hover:border-brand-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-3xl"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <CollegeCardImage
                  src={college.image}
                  alt={college.name}
                  className="w-full h-40 object-cover bg-slate-100 transition-transform duration-500 group-hover:scale-105"
                />
                  <span className="absolute top-2.5 left-2.5 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                    {college.type || "Private"}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 bg-white/95 text-green-700 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                    <FaCheckCircle className="text-[10px]" />
                    NMC Approved
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
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 transition-colors duration-300">
                        <FaUserGraduate className="text-[11px] text-brand-950 group-hover:text-accent-600" />
                        {college.seats} seats
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
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 mt-4">
            <FaUniversity className="text-3xl text-gray-300 mx-auto mb-3" />
            <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-1">No colleges found</h3>
            <p className="text-sm text-gray-600 mb-4">Try adjusting your search filters</p>
            <button
              onClick={() => {
                setSearch("")
                setSelectedState("")
                setCurrentPage(1)
              }}
              className="h-11 px-6 bg-brand-950 text-white rounded-full text-sm font-bold hover:bg-brand-900 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="py-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
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
          <div className="rounded-2xl bg-brand-950 p-5 text-white">
            <h2 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg !text-white mb-1">Need MD/MS Admission Guidance?</h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-2xl">
              Get expert counseling for NEET PG, admission process, specialization selection, counseling, documentation and direct guidance from our medical experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center h-11 px-6 rounded-full text-sm font-bold bg-white text-brand-950 hover:bg-accent-100 transition-colors">
                Get Free Counseling
              </Link>
              <Link href="tel:+919920798988" className="inline-flex items-center justify-center h-11 px-6 rounded-full text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors">
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default MdMsPage
