"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUniversity,
  FaSearch,
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
  const [states, setStates] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/mbbs-india.json")
        const data: MbbsData = await res.json()
        setStates(data.states || [])
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const allColleges = states.flatMap((state) => state.colleges)

  const filteredColleges = allColleges.filter((college) => {
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
  })

  const totalSeats = allColleges.reduce(
    (acc, college) => acc + college.seats,
    0
  )

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
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-xl mb-6">
              <FaGraduationCap />
              <span className="text-sm font-medium">
                India’s Top Medical Colleges
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              MBBS Colleges
              <span className="block text-cyan-300">in India</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Discover top government & private medical colleges with complete
              details about fees, seats, rankings and admissions.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                <h2 className="text-4xl font-black">{states.length}+</h2>
                <p className="text-blue-100 mt-2">States Covered</p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                <h2 className="text-4xl font-black">
                  {allColleges.length}+
                </h2>
                <p className="text-blue-100 mt-2">Medical Colleges</p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                <h2 className="text-4xl font-black">
                  {totalSeats.toLocaleString()}+
                </h2>
                <p className="text-blue-100 mt-2">MBBS Seats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* FILTER SECTION */}
        <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:w-[350px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search colleges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATES */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedState("")}
                className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
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
                  onClick={() => setSelectedState(state.name)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-xl border border-white/20 text-white px-4 py-1 rounded-full text-xs font-bold">
                  {college.ranking}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                      college.type === "Government"
                        ? "bg-green-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <h2 className="text-2xl font-black text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {college.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 mb-5">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>{college.city}</span>
                </div>

                {/* INFO BOX */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Seats</span>
                    <span className="font-bold text-gray-900">
                      {college.seats}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Fees</span>
                    <span className="font-bold text-blue-600">
                      {college.fees}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Recognition</span>
                    <span className="font-bold text-gray-900">
                      {college.recognition}
                    </span>
                  </div>
                </div>

                {/* BUTTON */}
                <Link
                  href={`/colleges/${college.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .replace(/\s+/g, "-")}`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white h-14 rounded-2xl font-bold tracking-wide hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  <FaUniversity />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-700 p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Need MBBS Admission Guidance?
              </h2>

              <p className="text-blue-100 text-lg leading-relaxed mb-10">
                Get expert counseling for NEET, admission process, counseling,
                documentation and direct guidance from our MBBS experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
                >
                  Get Free Counseling
                </Link>

                <Link
                  href="tel:+917076909090"
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