"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUniversity,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa"

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

const MbbsIndiaPage: React.FC = () => {
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

  // ALL COLLEGES
  const allColleges = states.flatMap(
    (state) => state.colleges
  )

  // FILTERED COLLEGES
  const filteredColleges = allColleges.filter(
    (college) => {
      const matchesState =
        selectedState === "" ||
        states.find(
          (s) =>
            s.name === selectedState &&
            s.colleges.some(
              (c) => c.id === college.id
            )
        )

      const matchesSearch =
        college.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        college.city
          .toLowerCase()
          .includes(search.toLowerCase())

      return matchesState && matchesSearch
    }
  )

  // PAGINATION
  const totalPages = Math.ceil(
    filteredColleges.length / collegesPerPage
  )

  const indexOfLastCollege =
    currentPage * collegesPerPage

  const indexOfFirstCollege =
    indexOfLastCollege - collegesPerPage

  const currentColleges = filteredColleges.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  )

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i)
    } else {
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      pages.push(1)

      if (startPage > 2) {
        pages.push("...")
      }

      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages
  }

  // TOTAL SEATS
  const totalSeats = allColleges.reduce(
    (acc, college) => acc + college.seats,
    0
  )

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 text-lg">
            Loading Medical Colleges...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-gray-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 py-24 text-white">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-lg bg-cyan-400/20 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-lg bg-blue-400/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-lg backdrop-blur-xl mb-6">
              <FaGraduationCap />

              <span className="text-sm font-medium">
                India’s Top Medical Colleges
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              MBBS Colleges

              <span className="block text-cyan-300">
                in India
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Discover top government & private
              medical colleges with complete
              details about fees, seats,
              rankings and admissions.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {states.length}+
                </h2>

                <p className="text-blue-100 mt-2">
                  States Covered
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {allColleges.length}+
                </h2>

                <p className="text-blue-100 mt-2">
                  Medical Colleges
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <h2 className="text-4xl font-black">
                  {totalSeats.toLocaleString()}+
                </h2>

                <p className="text-blue-100 mt-2">
                  MBBS Seats
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* FILTER SECTION */}
        <div className="bg-white rounded-xl sm:rounded-[32px] shadow-xl border border-gray-100 p-4 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:w-[350px]">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />

              <input
                type="text"
                placeholder="Search colleges..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full h-10 sm:h-14 rounded-lg sm:rounded-2xl border border-gray-200 bg-gray-50 pl-9 sm:pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* STATES */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setSelectedState("")
                  setCurrentPage(1)
                }}
                className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  selectedState === ""
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-blue-50 text-gray-700"
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
                  className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    selectedState === state.name
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {state.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {currentColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-xl sm:rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span
                    className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
                      college.type === "Government"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {college.type || "Private"}
                  </span>
                </div>

                {college.ranking && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <FaStar className="text-xs" />
                    <span className="hidden sm:inline">{college.ranking}</span>
                  </div>
                )}
              </div>

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

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="max-w-7xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setCurrentPage(currentPage - 1)
                    window.scrollTo({ top: 400, behavior: "smooth" })
                  }}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm"
                >
                  <FaChevronLeft className="text-xs" />
                  <span>Previous</span>
                </button>

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
                        className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-xl font-semibold transition-all duration-200 text-sm ${
                          isCurrent
                            ? "bg-blue-50 text-blue-600 border-2 border-blue-600 cursor-not-allowed"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
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
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-sm"
                >
                  <span>Next</span>
                  <FaChevronRight className="text-xs" />
                </button>
              </div>

              <div className="text-center mt-4 text-gray-500 text-xs font-medium border-t border-gray-50 pt-3">
                Showing Page {currentPage} of {totalPages} ({filteredColleges.length} Total Colleges)
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-700 p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-lg"></div>

            <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Need MBBS Admission Guidance?
              </h2>

              <p className="text-blue-100 text-lg leading-relaxed mb-10">
                Get expert counseling for
                NEET, admission process,
                counseling, documentation and
                direct guidance from our MBBS
                experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
                >
                  Get Free Counseling
                </Link>

                <Link
                  href="tel:+919920798988"
                  className="border border-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
                >
                  Call Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MbbsIndiaPage