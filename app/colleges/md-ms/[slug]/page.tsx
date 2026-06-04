"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUniversity,
  FaPhoneAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";

interface CollegeData {
  id: number;
  name: string;
  city: string;
  seats: number;
  yearOfEstd?: string;
  fees: string;
  type: string;
  image?: string;
  recognition?: string;
  ranking?: string;
  admissionProcess?: string;
  placements?: string;
  entranceExams?: string[];
  academicHighlights?: string[];
  detailedFees?: {
    tuitionFee: string;
    hostelFee: string;
    otherFees: string;
  };
  documentsRequired?: string[];
  placementStats?: {
    medianSalaryUG?: string;
    medianSalaryPG?: string;
    internshipStipend?: string;
    topRecruiters?: string[];
  };
}

interface StateData {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  colleges: CollegeData[];
}

interface MdMsData {
  states: StateData[];
}

const MdMsStatePage: React.FC = () => {
  const params = useParams();
  const { openPopup, updateFormData } = usePopup();

  const [stateData, setStateData] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/md-ms.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: MdMsData = await response.json();
        const slug = params.slug as string;

        const foundState = data.states.find(
          (s) => s.slug === slug || s.name.toLowerCase().replace(/\s+/g, "-") === slug
        );

        if (!foundState) {
          setError("State details not found");
        } else {
          setStateData(foundState);
        }
      } catch (err) {
        setError("Failed to load state details");
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading MD/MS Details...</p>
        </div>
      </div>
    );
  }

  if (error || !stateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Not Found</h1>
          <p className="text-slate-600 mb-8">{error || "Requested details do not exist"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const govtColleges = stateData.colleges.filter((c) => c.type === "Government");
  const privateColleges = stateData.colleges.filter((c) => c.type === "Private");

  const mdSpecializations = [
    "General Medicine", "Pediatrics", "Dermatology", "Anesthesiology", 
    "Radiology", "Pathology", "Psychiatry", "Microbiology", 
    "Physiology", "Biochemistry", "Pharmacology"
  ];

  const msSpecializations = [
    "General Surgery", "Orthopedics", "Ophthalmology", 
    "ENT (Ear, Nose, and Throat)", "Obstetrics and Gynecology", "Plastic Surgery"
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-white mb-8 transition-all font-bold group text-sm uppercase tracking-widest"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter">
                Postgraduate Medical
              </span>
              <div className="h-px w-12 bg-blue-500/50"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              MD / MS in <span className="text-blue-500">{stateData.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl font-medium">
              {stateData.description}
            </p>

            <div className="flex flex-wrap gap-6 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <FaUniversity className="text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-black">{stateData.colleges.length}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Colleges</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <FaUserMd className="text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-black">
                    {stateData.colleges.reduce((acc, curr) => acc + (curr.seats || 0), 0)}+
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Seats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="space-y-16">

          {/* GOVT COLLEGES */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  <FaUniversity className="text-xs" />
                  Government
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Government <span className="text-blue-600">Medical Colleges</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Top-ranked government medical colleges in {stateData.name}.</p>
              </div>
              <button
                onClick={() => {
                  updateFormData({ courseInterest: `MD/MS Govt - ${stateData.name}` });
                  openPopup();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                Admission Guidance
              </button>
            </div>

            {govtColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {govtColleges.map((college) => (
                  <Link
                    key={college.id}
                    href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={college.image || "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop"}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-green-600', 'to-emerald-700');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-bold text-white bg-green-600/90 px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm">
                        Govt
                      </span>
                      <FaArrowRight className="absolute bottom-3 right-3 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all text-sm" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                        <FaMapMarkerAlt className="text-blue-500" />
                        {college.city}
                      </p>
                      <div className="flex items-end justify-between pt-3 border-t border-slate-100">
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Fee / Year</div>
                          <div className="text-lg font-bold text-blue-600">{college.fees}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400 font-medium">Seats</div>
                          <div className="text-lg font-bold text-slate-900">{college.seats || "—"}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center">
                <FaUniversity className="text-5xl mx-auto text-slate-300 mb-3" />
                <p className="text-slate-400 font-semibold">No government colleges available for {stateData.name}.</p>
              </div>
            )}
          </div>

          {/* PRIVATE COLLEGES */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  <FaUniversity className="text-xs" />
                  Private
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Private <span className="text-blue-600">Medical Colleges</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Leading private medical colleges in {stateData.name}.</p>
              </div>
              <button
                onClick={() => {
                  updateFormData({ courseInterest: `MD/MS Private - ${stateData.name}` });
                  openPopup();
                }}
                className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95"
              >
                Check Cut-off
              </button>
            </div>

            {privateColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {privateColleges.map((college) => (
                  <Link
                    key={college.id}
                    href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={college.image || "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop"}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-indigo-700');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-bold text-white bg-blue-600/90 px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm">
                        Private
                      </span>
                      <FaArrowRight className="absolute bottom-3 right-3 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all text-sm" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                        <FaMapMarkerAlt className="text-blue-500" />
                        {college.city}
                      </p>
                      <div className="flex items-end justify-between pt-3 border-t border-slate-100">
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Fee / Year</div>
                          <div className="text-lg font-bold text-blue-600">{college.fees}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400 font-medium">Seats</div>
                          <div className="text-lg font-bold text-slate-900">{college.seats || "—"}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center">
                <FaUniversity className="text-5xl mx-auto text-slate-300 mb-3" />
                <p className="text-slate-400 font-semibold">No private colleges data available for {stateData.name}.</p>
              </div>
            )}
          </div>
        </div>

        {/* SPECIALIZATIONS GRID */}
        <div className="grid lg:grid-cols-3 gap-8 pt-12">
          <div className="lg:col-span-1 bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-4xl font-black mb-6 leading-tight">Available <br /><span className="text-blue-500">Clinical Courses</span></h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Explore the wide range of specializations available for MD and MS programs in {stateData.name}.
            </p>
            <div className="mt-auto">
              <button 
                onClick={() => openPopup()}
                className="w-full py-4 rounded-2xl bg-white text-black font-black hover:bg-blue-500 hover:text-white transition-all"
              >
                Specialization Inquiry
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <FaUserMd className="text-blue-600 text-2xl" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">MD Courses</h4>
              </div>
              <ul className="space-y-4">
                {mdSpecializations.slice(0, 8).map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <FaUniversity className="text-blue-600 text-2xl" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">MS Courses</h4>
              </div>
              <ul className="space-y-4">
                {msSpecializations.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      
      </section>
    </div>
  );
};

export default MdMsStatePage;
