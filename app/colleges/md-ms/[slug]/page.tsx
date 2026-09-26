"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUniversity,
  FaUserMd,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { SkeletonDetail } from "@/components/Skeleton";
import Image from "next/image";

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
      } catch {
        setError("Failed to load state details");
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, [params.slug]);

  if (loading) {
    return <SkeletonDetail />;
  }

  if (error || !stateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 text-center max-w-lg w-full">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-xl sm:text-2xl mb-2">Not Found</h1>
          <p className="text-sm text-gray-600 mb-6">{error || "Requested details do not exist"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
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
  ];

  const msSpecializations = [
    "General Surgery", "Orthopedics", "Ophthalmology",
    "ENT (Ear, Nose, and Throat)", "Obstetrics and Gynecology", "Plastic Surgery"
  ];

  const totalSeats = stateData.colleges.reduce((acc, curr) => acc + (curr.seats || 0), 0);

  const renderCollegeCard = (college: CollegeData, badge: string) => (
    <Link
      key={college.id}
      href={`/colleges/${college.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
      className="group flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden bg-slate-100">
        <Image
          src={college.image || "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop"}
          alt={college.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span
          className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
            badge === "Govt" ? "bg-brand-950 text-white" : "bg-accent-400 text-brand-950"
          }`}
        >
          {badge === "Govt" ? "Government" : "Private"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-brand-950 font-extrabold tracking-tight text-base leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-accent-600">
          {college.name}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-sm text-gray-600 truncate">
          <FaMapMarkerAlt className="text-xs text-accent-600 shrink-0" />
          {college.city}
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
          <span className="text-xs text-gray-500">{college.seats || "—"} seats</span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-accent-600">
            View
            <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="dark"
        eyebrow="Postgraduate Medical"
        title={`MD / MS in ${stateData.name}`}
        description={stateData.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "MD/MS", href: "/colleges/md-ms" }, { label: stateData.name }]}
      />

      <Section spacing="md">
        <div className="grid grid-cols-2 gap-3 max-w-xl mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
              <FaUniversity className="text-brand-950 text-sm" />
            </div>
            <div>
              <div className="text-brand-950 font-extrabold tracking-tight text-xl">{stateData.colleges.length}</div>
              <div className="text-xs text-gray-600 font-medium">Colleges</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
              <FaUserMd className="text-brand-950 text-sm" />
            </div>
            <div>
              <div className="text-brand-950 font-extrabold tracking-tight text-xl">{totalSeats}+</div>
              <div className="text-xs text-gray-600 font-medium">Total Seats</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="mb-5 flex flex-col items-center gap-3 text-center">
              <SectionHeading
                align="center"
                    eyebrow="Government"
                title={<>Government <span className="text-accent-600">Medical Colleges</span></>}
                description={`Top-ranked government medical colleges in ${stateData.name}.`}
                className="mb-0"
              />
              <button
                onClick={() => {
                  updateFormData({ courseInterest: `MD/MS Govt - ${stateData.name}` });
                  openPopup();
                }}
                className="h-11 px-6 shrink-0 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
              >
                Admission Guidance
              </button>
            </div>

            {govtColleges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {govtColleges.map((college) => renderCollegeCard(college, "Govt"))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
                <FaUniversity className="text-3xl mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-600 font-medium">No government colleges available for {stateData.name}.</p>
              </div>
            )}
          </div>

          <div>
            <div className="mb-5 flex flex-col items-center gap-3 text-center">
              <SectionHeading
                align="center"
                eyebrow="Private"
                title={<>Private <span className="text-accent-600">Medical Colleges</span></>}
                description={`Leading private medical colleges in ${stateData.name}.`}
                className="mb-0"
              />
              <button
                onClick={() => {
                  updateFormData({ courseInterest: `MD/MS Private - ${stateData.name}` });
                  openPopup();
                }}
                className="h-11 px-6 shrink-0 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
              >
                Check Cut-off
              </button>
            </div>

            {privateColleges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {privateColleges.map((college) => renderCollegeCard(college, "Private"))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
                <FaUniversity className="text-3xl mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-600 font-medium">No private colleges data available for {stateData.name}.</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 pt-8">
          <div className="bg-brand-950 rounded-2xl p-5 text-white flex flex-col justify-center">
            <h3 className="text-brand-950 font-extrabold tracking-tight text-xl sm:text-2xl !text-white mb-2 leading-tight">Available <span className="text-accent-400">Clinical Courses</span></h3>
            <p className="text-sm text-gray-300 font-medium leading-relaxed mb-4">
              Explore the wide range of specializations available for MD and MS programs in {stateData.name}.
            </p>
            <button
              onClick={() => openPopup()}
              className="w-full h-11 rounded-full bg-white text-brand-950 text-sm font-bold hover:bg-accent-100 transition-colors"
            >
              Specialization Inquiry
            </button>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center shrink-0">
                  <FaUserMd className="text-brand-950" />
                </div>
                <h4 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg">MD Courses</h4>
              </div>
              <ul className="space-y-2.5">
                {mdSpecializations.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                    <FaCheckCircle className="text-brand-950 flex-shrink-0 text-xs" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center shrink-0">
                  <FaUniversity className="text-brand-950" />
                </div>
                <h4 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg">MS Courses</h4>
              </div>
              <ul className="space-y-2.5">
                {msSpecializations.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                    <FaCheckCircle className="text-brand-950 flex-shrink-0 text-xs" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default MdMsStatePage;
