"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePopup } from '@/contexts/PopupContext';
import Link from 'next/link';
import {
  GraduationCap,
  MapPin,
  Award,
  Users,
  BookOpen,
  FileText,
  CheckCircle2,
  TrendingUp,
  IndianRupee,
  ClipboardList,
  Info,
  Calendar,
  Building2,
  Trophy
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';

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
  admissionProcess?: string;
  placements?: string;
  entranceExams?: string[];
  academicHighlights?: string[];
  nriFees?: string;
  detailedFees?: {
    tuitionFee: string;
    hostelFee: string;
    otherFees: string;
  };
  documentsRequired?: string[];
}

interface StateData {
  id: number;
  name: string;
  image: string;
  description: string;
  colleges: CollegeData[];
}

interface MbbsData {
  states: StateData[];
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

const TAB_IDS = ['overview', 'fees', 'admission', 'placement', 'documents'] as const;

type TabId = (typeof TAB_IDS)[number];

const isTabId = (value: string): value is TabId =>
  (TAB_IDS as readonly string[]).includes(value);

const CollegeSlugPage: React.FC = () => {
  const params = useParams();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [collegeType, setCollegeType] = useState<'india' | 'abroad' | 'mdms'>('india');
  const [relatedColleges, setRelatedColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const { openPopup, updateFormData, resetForm } = usePopup();

  useEffect(() => {
    if (loading || !college) return;

    const styles = getComputedStyle(document.documentElement);
    const headerH = parseFloat(styles.getPropertyValue('--site-header-h')) || 102;
    const tabsH = parseFloat(styles.getPropertyValue('--site-tabs-h')) || 69;
    const stickyStack = Math.round(headerH + tabsH + 12);

    const observerOptions = {
      root: null,
      rootMargin: `-${stickyStack}px 0px -70% 0px`,
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isTabId(entry.target.id)) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['overview', 'fees', 'admission', 'placement', 'documents'];

    const timeoutId = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [loading, college]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset comes from the `scroll-mt-header-tabs` class (measured header
      // height + tab bar height), so nothing hides behind the sticky bars.
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const fetchCollegeBySlug = async () => {
      try {
        setLoading(true);
        const slug = params.slug as string;

        const [indiaResponse, abroadResponse, mdmsResponse] = await Promise.all([
          fetch('/mbbs-india.json'),
          fetch('/mbbs-abroad.json'),
          fetch('/md-ms.json')
        ]);

        if (!indiaResponse.ok && !abroadResponse.ok && !mdmsResponse.ok) {
          throw new Error('Failed to fetch college data');
        }

        if (indiaResponse.ok) {
          const indiaData = await indiaResponse.json();

          for (const state of indiaData.states) {
            const college = state.colleges.find((c: CollegeData) => {
              const collegeSlug = c.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              return collegeSlug === slug;
            });

            if (college) {
              setCollege(college);
              setCollegeType('india');
              setRelatedColleges(state.colleges.filter((c: CollegeData) => c.id !== college.id).slice(0, 6));
              setLoading(false);
              return;
            }
          }
        }

        if (abroadResponse.ok) {
          const abroadData = await abroadResponse.json();

          for (const country of abroadData.countries) {
            if (country.colleges) {
              const college = country.colleges.find((c: CollegeData) => {
                const collegeSlug = c.name
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '');
                return collegeSlug === slug;
              });

              if (college) {
                setCollege(college);
                setCollegeType('abroad');
                setRelatedColleges(country.colleges.filter((c: CollegeData) => c.id !== college.id).slice(0, 6));
                setLoading(false);
                return;
              }
            }
          }
        }

        if (mdmsResponse.ok) {
          const mdmsData = await mdmsResponse.json();

          for (const state of mdmsData.states) {
            const college = state.colleges.find((c: CollegeData) => {
              const collegeSlug = c.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
              return collegeSlug === slug;
            });

            if (college) {
              setCollege(college);
              setCollegeType('india');
              setRelatedColleges(state.colleges.filter((c: CollegeData) => c.id !== college.id).slice(0, 6));
              setLoading(false);
              return;
            }
          }
        }

        setError('College not found');
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load college details');
        setLoading(false);
      }
    };

    fetchCollegeBySlug();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-950 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600">Loading college information...</p>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl border border-slate-200 p-5 max-w-md w-full">
          <h1 className="text-brand-950 font-extrabold tracking-tight text-xl mb-2">College Not Found</h1>
          <p className="text-sm text-gray-600 mb-5">{error || 'The requested college could not be found.'}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/colleges/mbbs-india"
              className="inline-flex items-center justify-center h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
            >
              Browse India Colleges
            </Link>
            <Link
              href="/colleges/mbbs-abroad"
              className="inline-flex items-center justify-center h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
            >
              Browse Abroad Colleges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCollegeSlug = (collegeName: string): string => {
    return collegeName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={15} /> },
    { id: 'fees', label: 'Fees', icon: <IndianRupee size={15} /> },
    { id: 'admission', label: 'Admission', icon: <GraduationCap size={15} /> },
    { id: 'placement', label: 'Placements', icon: <TrendingUp size={15} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={15} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="dark"
        eyebrow={college.type || 'Private'}
        title={college.name}
        description={`${college.city} • ${college.seats} Seats • ${college.recognition} • ${college.ranking}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges/mbbs-india" }, { label: college.name }]}
      />

      <div className="sticky top-header z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-6 text-sm font-bold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-brand-950 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-900 hover:text-brand-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KEY FACTS STRIP */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 py-4 lg:grid-cols-4">
            {[
              { label: "Total Seats", value: String(college.seats) },
              { label: "College Type", value: college.type || "Private" },
              { label: "Recognition", value: college.recognition || "NMC" },
              { label: "Ranking", value: college.ranking || "—" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center transition-all duration-300 hover:border-accent-400 hover:bg-accent-100"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                  {fact.label}
                </p>
                <p className="mt-1 truncate text-sm font-extrabold text-brand-950" title={fact.value}>
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section spacing="md">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <section id="overview" className="scroll-mt-header-tabs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                {/* college image banner */}
                <div className="group relative mb-5 h-56 overflow-hidden rounded-2xl bg-slate-100 sm:h-64">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-college.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                        {college.type || "Private"}
                      </span>
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                        {college.recognition}
                      </span>
                      <span className="rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                        {college.ranking}
                      </span>
                    </div>
                    <h2 className="mt-2.5 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                      About {college.name}
                    </h2>
                  </div>
                </div>

                <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-gray-600">
                  {college.name} is a premier {college.type} medical institution located in {college.city}.
                  It is recognized by {college.recognition} and is consistently ranked among the top medical colleges in India,
                  currently holding the {college.ranking} position. The college offers a world-class environment for
                  medical aspirants with {college.seats} seats available for the MBBS program.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-accent-100 bg-accent-100/50 p-5">
                    <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold tracking-tight text-brand-950 sm:text-lg">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                        <Trophy size={15} />
                      </span>
                      Academic Highlights
                    </h3>
                    <ul className="space-y-2">
                      {(college.academicHighlights || [
                        "Experienced Faculty & Mentorship",
                        "Modern Infrastructure & Labs",
                        "Extensive Clinical Exposure",
                        "Research Opportunities",
                        "Well-equipped Library"
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 size={15} className="text-brand-950 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold tracking-tight text-brand-950 sm:text-lg">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-950 text-white">
                        <Building2 size={15} />
                      </span>
                      Quick Statistics
                    </h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-gray-600">Total Seats</span>
                        <span className="font-extrabold text-brand-950 tracking-tight">{college.seats}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-gray-600">Establishment</span>
                        <span className="font-extrabold text-brand-950 tracking-tight">Recognized</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-gray-600">Type</span>
                        <span className="font-extrabold text-brand-950 tracking-tight">{college.type || 'Private'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">City</span>
                        <span className="font-extrabold text-brand-950 tracking-tight">{college.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="fees" className="scroll-mt-header-tabs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <h2 className="mb-4 flex items-center justify-center gap-2.5 text-center text-xl font-extrabold tracking-tight text-brand-950 sm:text-2xl">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-600">
                    <IndianRupee size={20} />
                  </span>
                  Fee Structure
                </h2>

                {college.detailedFees ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-brand-950 text-white uppercase text-xs">
                        <tr>
                          <th className="px-3 py-2.5 font-bold">Fee Component</th>
                          <th className="px-3 py-2.5 font-bold">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="px-3 py-2.5 text-gray-600 font-medium text-sm">Annual Tuition Fee</td>
                          <td className="px-3 py-2.5 font-bold text-brand-950 text-sm">{college.detailedFees.tuitionFee}</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="px-3 py-2.5 text-gray-600 font-medium text-sm">Hostel & Mess Charges</td>
                          <td className="px-3 py-2.5 font-bold text-brand-950 text-sm">{college.detailedFees.hostelFee}</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2.5 text-gray-600 font-medium text-sm">Other Fees (Library, Exam, Lab)</td>
                          <td className="px-3 py-2.5 font-bold text-brand-950 text-sm">{college.detailedFees.otherFees}</td>
                        </tr>
                        {college.nriFees && (
                          <tr className="bg-accent-100">
                            <td className="px-3 py-2.5 text-brand-950 font-medium text-sm">NRI Quota Fees</td>
                            <td className="px-3 py-2.5 font-bold text-brand-950 text-sm">
                              {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot className="bg-accent-100 font-bold">
                        <tr>
                          <td className="px-3 py-2.5 text-brand-950 text-sm">Approx. Annual Total</td>
                          <td className="px-3 py-2.5 text-brand-950 text-sm">{college.fees}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-accent-100 bg-accent-100/50 p-5">
                    <div className="flex items-start gap-3">
                      <IndianRupee className="text-brand-950 shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-extrabold text-brand-950 tracking-tight mb-1">Fee Structure</p>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{college.fees}</p>
                        {college.nriFees && (
                          <p className="text-sm text-brand-950 font-bold mt-2">
                            NRI Quota Fees: {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2 rounded-2xl border border-accent-100 bg-accent-100/50 p-3 text-sm text-brand-950">
                  <Info size={16} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Note: Fee structure is subject to change as per university and government regulations. Additional security deposits (refundable) may apply at the time of admission.</p>
                </div>
              </div>
            </section>

            <section id="admission" className="scroll-mt-header-tabs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <h2 className="mb-4 flex items-center justify-center gap-2.5 text-center text-xl font-extrabold tracking-tight text-brand-950 sm:text-2xl">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-600">
                    <GraduationCap size={20} />
                  </span>
                  Admission Process
                </h2>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {college.admissionProcess || "Admission to the MBBS program is strictly based on the performance in the National Eligibility cum Entrance Test (NEET)."}
                </p>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="mb-4 flex items-center justify-center gap-2 text-center text-base font-extrabold tracking-tight text-brand-950 sm:text-lg">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                      <ClipboardList size={15} />
                    </span>
                    Step-by-Step Admission Journey
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { step: "NEET UG Exam", desc: "Qualify the national level entrance exam with required percentile." },
                      { step: "Counseling Registration", desc: "Register on the official counseling portal (MCC for AIQ or State DME)." },
                      { step: "Choice Filling", desc: "Select and prioritize the college during the choice-filling rounds." },
                      { step: "Seat Allotment", desc: "Based on merit and choices, seat will be allotted in various rounds." },
                      { step: "Document Verification", desc: "Visit the allotted college for physical verification and fee payment." }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-md"
                      >
                        <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950 text-xs font-extrabold text-white transition-colors duration-300 group-hover:bg-accent-400 group-hover:text-brand-950">
                          {idx + 1}
                        </span>
                        <h4 className="mt-2.5 text-sm font-extrabold tracking-tight text-brand-950">
                          {item.step}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-5 text-center transition-colors duration-300 hover:border-accent-400">
                    <h3 className="mb-2 flex items-center justify-center gap-2 text-sm font-extrabold tracking-tight text-brand-950">
                      <Calendar className="text-accent-600" size={15} />
                      Entrance Exams
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {(college.entranceExams || ["NEET UG"]).map((exam, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase rounded-full px-2.5 py-1">
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-5 text-center transition-colors duration-300 hover:border-accent-400">
                    <h3 className="mb-2 flex items-center justify-center gap-2 text-sm font-extrabold tracking-tight text-brand-950">
                      <Users className="text-accent-600" size={15} />
                      Eligibility
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Minimum 17 years age, 50% in PCB (Class 12) for General category (40% for SC/ST/OBC).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="placement" className="scroll-mt-header-tabs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <h2 className="mb-4 flex items-center justify-center gap-2.5 text-center text-xl font-extrabold tracking-tight text-brand-950 sm:text-2xl">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-600">
                    <TrendingUp size={20} />
                  </span>
                  Placement & Career Highlights
                </h2>

                <div className="rounded-2xl bg-brand-900 p-5 text-center text-white">
                  <p className="text-sm font-medium leading-relaxed mb-4 opacity-90 italic">
                    &quot;{college.placements || "Graduates from this institution are well-placed in top healthcare facilities across India and abroad, with many pursuing advanced PG degrees in premier institutes."}&quot;
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white/10 rounded-2xl border border-white/20">
                      <div className="text-lg font-extrabold tracking-tight mb-0.5">100%</div>
                      <div className="text-xs uppercase tracking-wider opacity-70 font-bold">Internship Placement</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-2xl border border-white/20">
                      <div className="text-lg font-extrabold tracking-tight mb-0.5">Top Tier</div>
                      <div className="text-xs uppercase tracking-wider opacity-70 font-bold">PG Selections</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-2xl border border-white/20">
                      <div className="text-lg font-extrabold tracking-tight mb-0.5">Global</div>
                      <div className="text-xs uppercase tracking-wider opacity-70 font-bold">Alumni Network</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">Internship Opportunities</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Compulsory Rotatory Residential Internship (CRRI) is provided in the associated teaching hospital,
                      offering hands-on clinical experience across all departments including Medicine, Surgery,
                      Obstetrics & Gynecology, and Pediatrics.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-2">Post-Graduation Success</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      The institute provides an excellent foundation for PG entrance exams like INI-CET and NEET PG.
                      A significant percentage of students secure seats in their preferred clinical specialties
                      in the first attempt.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="documents" className="scroll-mt-header-tabs overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5">
                <h2 className="mb-4 flex items-center justify-center gap-2.5 text-center text-xl font-extrabold tracking-tight text-brand-950 sm:text-2xl">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-600">
                    <FileText size={20} />
                  </span>
                  Documents Required
                </h2>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-gray-600 mb-4">Candidates must carry the following original documents along with 3-4 sets of photocopies at the time of reporting to the allotted college:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(college.documentsRequired || [
                      "NEET UG Admit Card",
                      "NEET UG Scorecard/Rank Letter",
                      "Class 10 Certificate & Marksheet",
                      "Class 12 Certificate & Marksheet",
                      "Identity Proof (Aadhar/PAN/Passport)",
                      "8-10 Passport size photographs",
                      "Provisional Allotment Letter",
                      "Caste Certificate (if applicable)",
                      "Migration Certificate",
                      "Transfer Certificate"
                    ]).map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-white rounded-2xl border border-slate-200">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-100 text-brand-950">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm font-medium text-gray-600">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-accent-100 bg-accent-100/50 p-3 text-sm text-brand-950">
                  <p className="font-bold mb-1 flex items-center gap-2 text-sm">
                    <Info size={14} />
                    Important:
                  </p>
                  <p className="text-sm">Failure to produce original documents during verification may lead to immediate cancellation of the allotted seat.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:sticky top-header-gap">
              <div className="bg-brand-900 p-5 text-center text-white">
                <h3 className="mb-1 !text-white text-base font-extrabold tracking-tight sm:text-lg">
                  Admission <span className="text-accent-400">2026-27</span>
                </h3>
                <p className="text-slate-300 text-sm mb-4">Expert guidance for NEET counseling and college selection.</p>
                <button
                  onClick={() => {
                    updateFormData({
                      courseInterest: `${college.name} - ${collegeType === 'india' ? 'MBBS India' : collegeType === 'mdms' ? 'MD/MS India' : 'MBBS Abroad'}`
                    });
                    openPopup();
                  }}
                  className="h-12 w-full rounded-full bg-accent-400 text-sm font-bold text-brand-950 transition-colors hover:bg-accent-500"
                >
                  Apply for Guidance
                </button>
              </div>

              <div className="p-5">
                <div className="rounded-2xl border border-accent-100 bg-accent-100/50 p-3.5 text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-accent-600">Annual Fees</p>
                  <p className="mt-1 break-words text-sm font-extrabold leading-snug text-brand-950" title={college.fees}>
                    {college.fees}
                  </p>
                </div>

                {college.nriFees && (
                  <div className="mt-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-center">
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-gray-500">NRI Quota Fees</p>
                    <p className="mt-1 text-sm font-extrabold text-brand-950">
                      {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                    </p>
                  </div>
                )}

                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-slate-200 p-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Seats</p>
                    <p className="mt-0.5 text-base font-extrabold text-brand-950">{college.seats}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Type</p>
                    <p className="mt-0.5 text-sm font-extrabold text-brand-950">{college.type}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <h4 className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-brand-950">Quick Links</h4>
                  <Link
                    href="/colleges/mbbs-india"
                    className="flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 p-2.5 text-sm text-gray-600 transition-colors hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
                  >
                    <BookOpen size={15} />
                    MBBS India
                  </Link>
                  <Link
                    href="/colleges/mbbs-abroad"
                    className="flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 p-2.5 text-sm text-gray-600 transition-colors hover:border-accent-400 hover:bg-accent-100 hover:text-brand-950"
                  >
                    <MapPin size={15} />
                    MBBS Abroad
                  </Link>
                </div>
              </div>
            </div>

            {relatedColleges.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center justify-center gap-2 text-center text-base font-extrabold tracking-tight text-brand-950 sm:text-lg">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-400 text-brand-950">
                    <Building2 size={15} />
                  </span>
                  Similar Colleges
                </h3>
                <div className="space-y-3">
                  {relatedColleges.map((relatedCollege) => (
                    <Link
                      key={relatedCollege.id}
                      href={`/colleges/${getCollegeSlug(relatedCollege.name)}`}
                      className="group block p-3 bg-slate-50 hover:bg-accent-100 rounded-2xl transition-colors border border-transparent hover:border-accent-100"
                    >
                      <h4 className="line-clamp-1 text-sm font-extrabold tracking-tight text-brand-950 transition-colors group-hover:text-accent-600">
                        {relatedCollege.name}
                      </h4>
                      <div className="mt-1.5 flex items-center justify-center gap-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {relatedCollege.city}
                        </span>
                        <span className="text-brand-950 font-bold truncate max-w-[140px]" title={relatedCollege.fees}>{relatedCollege.fees}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CollegeSlugPage;
