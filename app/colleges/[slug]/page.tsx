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

const CollegeSlugPage: React.FC = () => {
  const params = useParams();
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [collegeType, setCollegeType] = useState<'india' | 'abroad' | 'mdms'>('india');
  const [relatedColleges, setRelatedColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'admission' | 'placement' | 'documents'>('overview');
  const { openPopup, updateFormData, resetForm } = usePopup();

  // Scroll Spy and Scroll to Section Logic
  useEffect(() => {
    if (loading || !college) return;

    const observerOptions = {
      root: null,
      rootMargin: '-200px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as any);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['overview', 'fees', 'admission', 'placement', 'documents'];
    
    // Small delay to ensure DOM is ready
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
       const offset = 200; // Account for sticky header (132px) + sticky tabs (~60px)
       const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchCollegeBySlug = async () => {
      try {
        setLoading(true);
        const slug = params.slug as string;
        
        // Fetch India, Abroad, and MD/MS data
        const [indiaResponse, abroadResponse, mdmsResponse] = await Promise.all([
          fetch('/mbbs-india.json'),
          fetch('/mbbs-abroad.json'),
          fetch('/md-ms.json')
        ]);

        if (!indiaResponse.ok && !abroadResponse.ok && !mdmsResponse.ok) {
          throw new Error('Failed to fetch college data');
        }

        // Search in India data
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

        // Search in Abroad data
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

        // Search in MD/MS data
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading college information...</p>   
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested college could not be found.'}</p>
          <div className="space-x-4">
            <Link 
              href="/colleges/mbbs-india"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors mr-4"
            >
              Browse India Colleges
            </Link>
            <Link 
              href="/colleges/mbbs-abroad"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Abroad Colleges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate slug for college
  const getCollegeSlug = (collegeName: string): string => {
    return collegeName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const bgColor = 'from-blue-700 to-blue-900';
  const buttonColor = 'bg-blue-600 hover:bg-blue-700';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
    { id: 'fees', label: 'Fees', icon: <IndianRupee size={18} /> },
    { id: 'admission', label: 'Admission', icon: <GraduationCap size={18} /> },
    { id: 'placement', label: 'Placements', icon: <TrendingUp size={18} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-linear-to-r ${bgColor} text-white py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-blue-600 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl p-2 shadow-2xl shrink-0 overflow-hidden">
              <img 
                src={college.image} 
                alt={college.name} 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-college.png';
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium border border-white/30">
                  {college.type || 'Private'}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium border border-white/30">
                  {college.recognition}
                </span>
                <span className="px-3 py-1 bg-yellow-400 text-blue-900 rounded-full text-xs font-bold border border-yellow-300">
                  {college.ranking}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">{college.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{college.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{college.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={18} />
                  <span>{college.recognition}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-[132px] z-30 bg-white/90 backdrop-blur-md border-b shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-start overflow-x-auto no-scrollbar py-4 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-bold transition-all duration-500 whitespace-nowrap rounded-full border-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 ring-4 ring-blue-50'
                    : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/30'
                }`}
              >
                <span className={`transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-blue-500'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - All Sections Vertically */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-32">
              <div className="p-8">
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Info className="text-blue-600" />
                      About {college.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {college.name} is a premier {college.type} medical institution located in {college.city}. 
                      It is recognized by {college.recognition} and is consistently ranked among the top medical colleges in India, 
                      currently holding the {college.ranking} position. The college offers a world-class environment for 
                      medical aspirants with {college.seats} seats available for the MBBS program.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                      <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Trophy className="text-blue-600" />
                        Academic Highlights
                      </h4>
                      <ul className="space-y-3">
                        {(college.academicHighlights || [
                          "Experienced Faculty & Mentorship",
                          "Modern Infrastructure & Labs",
                          "Extensive Clinical Exposure",
                          "Research Opportunities",
                          "Well-equipped Library"
                        ]).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-blue-800">
                            <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                      <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Building2 className="text-green-600" />
                        Quick Statistics
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-green-200/50">
                          <span className="text-green-800">Total Seats</span>
                          <span className="font-bold text-green-900">{college.seats}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-green-200/50">
                          <span className="text-green-800">Establishment</span>
                          <span className="font-bold text-green-900">Recognized</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-green-200/50">
                          <span className="text-green-800">Type</span>
                          <span className="font-bold text-green-900">{college.type || 'Private'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-800">City</span>
                          <span className="font-bold text-green-900">{college.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Fees Section */}
            <section id="fees" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-32">
              <div className="p-8">
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <IndianRupee className="text-blue-600" />
                    Fee Structure
                  </h3>
                  
                  {college.detailedFees ? (
                    <div className="overflow-hidden border border-gray-200 rounded-xl">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Fee Component</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 text-gray-600 font-medium">Annual Tuition Fee</td>
                            <td className="px-6 py-4 font-bold text-blue-600">{college.detailedFees.tuitionFee}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-gray-600 font-medium">Hostel & Mess Charges</td>
                            <td className="px-6 py-4 font-bold text-gray-900">{college.detailedFees.hostelFee}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-gray-600 font-medium">Other Fees (Library, Exam, Lab)</td>
                            <td className="px-6 py-4 font-bold text-gray-900">{college.detailedFees.otherFees}</td>
                          </tr>
                          {college.nriFees && (
                            <tr className="bg-purple-50">
                              <td className="px-6 py-4 text-purple-700 font-medium">NRI Quota Fees</td>
                              <td className="px-6 py-4 font-bold text-purple-600">
                                {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot className="bg-blue-50 font-bold">
                          <tr>
                            <td className="px-6 py-4 text-blue-900">Approx. Annual Total</td>
                            <td className="px-6 py-4 text-blue-600 text-xl">{college.fees}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                      <div className="flex items-start gap-4">
                        <IndianRupee className="text-blue-600 shrink-0 mt-1" size={24} />
                        <div>
                          <p className="text-sm font-bold text-blue-900 mb-2">Fee Structure</p>
                          <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">{college.fees}</p>
                          {college.nriFees && (
                            <p className="text-sm text-purple-700 font-bold mt-2">
                              NRI Quota Fees: {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm flex gap-3">
                    <Info size={20} className="shrink-0 mt-0.5" />
                    <p>Note: Fee structure is subject to change as per university and government regulations. Additional security deposits (refundable) may apply at the time of admission.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Admission Section */}
            <section id="admission" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-32">
              <div className="p-8">
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="text-blue-600" />
                    Admission Process
                  </h3>
                  
                  <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                    <p className="text-lg mb-6">
                      {college.admissionProcess || "Admission to the MBBS program is strictly based on the performance in the National Eligibility cum Entrance Test (NEET)."}
                    </p>
                    
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                      <h4 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                        <ClipboardList className="text-blue-600" />
                        Step-by-Step Admission Journey
                      </h4>
                      <div className="space-y-6">
                        {[
                          { step: "NEET UG Exam", desc: "Qualify the national level entrance exam with required percentile." },
                          { step: "Counseling Registration", desc: "Register on the official counseling portal (MCC for AIQ or State DME)." },
                          { step: "Choice Filling", desc: "Select and prioritize the college during the choice-filling rounds." },
                          { step: "Seat Allotment", desc: "Based on merit and choices, seat will be allotted in various rounds." },
                          { step: "Document Verification", desc: "Visit the allotted college for physical verification and fee payment." }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {idx + 1}
                              </div>
                              {idx < 4 && <div className="w-0.5 h-full bg-blue-200 my-1"></div>}
                            </div>
                            <div className="pb-4">
                              <h5 className="font-bold text-gray-900">{item.step}</h5>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Calendar className="text-blue-600" size={18} />
                          Entrance Exams
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(college.entranceExams || ["NEET UG"]).map((exam, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="text-blue-600" size={18} />
                          Eligibility
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Minimum 17 years age, 50% in PCB (Class 12) for General category (40% for SC/ST/OBC).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Placement Section */}
            <section id="placement" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-32">
              <div className="p-8">
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-blue-600" />
                    Placement & Career Highlights
                  </h3>
                  
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                    <p className="text-xl font-medium leading-relaxed mb-6 opacity-90 italic">
                      "{college.placements || "Graduates from this institution are well-placed in top healthcare facilities across India and abroad, with many pursuing advanced PG degrees in premier institutes."}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <div className="text-3xl font-bold mb-1">100%</div>
                        <div className="text-xs uppercase tracking-wider opacity-70 font-semibold">Internship Placement</div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <div className="text-3xl font-bold mb-1">Top Tier</div>
                        <div className="text-xs uppercase tracking-wider opacity-70 font-semibold">PG Selections</div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <div className="text-3xl font-bold mb-1">Global</div>
                        <div className="text-xs uppercase tracking-wider opacity-70 font-semibold">Alumni Network</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Internship Opportunities</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Compulsory Rotatory Residential Internship (CRRI) is provided in the associated teaching hospital, 
                        offering hands-on clinical experience across all departments including Medicine, Surgery, 
                        Obstetrics & Gynecology, and Pediatrics.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Post-Graduation Success</h4>
                      <p className="text-gray-600 leading-relaxed">
                        The institute provides an excellent foundation for PG entrance exams like INI-CET and NEET PG. 
                        A significant percentage of students secure seats in their preferred clinical specialties 
                        in the first attempt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Section */}
            <section id="documents" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-32">
              <div className="p-8">
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="text-blue-600" />
                    Documents Required
                  </h3>
                  
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 mb-6">Candidates must carry the following original documents along with 3-4 sets of photocopies at the time of reporting to the allotted college:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-red-800 text-sm">
                    <p className="font-bold mb-1 flex items-center gap-2">
                      <Info size={16} />
                      Important:
                    </p>
                    <p>Failure to produce original documents during verification may lead to immediate cancellation of the allotted seat.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <h3 className="text-xl font-bold mb-2">Admission 2026-27</h3>
                <p className="text-blue-100 text-sm mb-6">Expert guidance for NEET counseling and college selection.</p>
                <button 
                  onClick={() => {
                    updateFormData({ 
                      courseInterest: `${college.name} - ${collegeType === 'india' ? 'MBBS India' : collegeType === 'mdms' ? 'MD/MS India' : 'MBBS Abroad'}` 
                    });
                    openPopup();
                  }}
                  className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Apply for Guidance
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Fees</span>
                    <p className="font-bold text-blue-600 mt-0.5 text-xs leading-relaxed line-clamp-2" title={college.fees}>{college.fees}</p>
                  </div>
                  {college.nriFees && (
                    <div className="text-sm">
                      <span className="text-gray-500">NRI Quota Fees</span>
                      <p className="font-bold text-purple-600 mt-0.5 text-xs">
                        {college.nriFees === "NOT AVAILABLE" ? "Not Available" : college.nriFees}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Seats</span>
                    <span className="font-bold text-gray-900">{college.seats}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-bold text-gray-900">{college.type}</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
                  <Link 
                    href="/colleges/mbbs-india"
                    className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <BookOpen size={16} />
                    MBBS India
                  </Link>
                  <Link 
                    href="/colleges/mbbs-abroad"
                    className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <MapPin size={16} />
                    MBBS Abroad
                  </Link>

                </div>
              </div>
            </div>

            {/* Related Colleges */}
            {relatedColleges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 className="text-blue-600" size={20} />
                  Similar Colleges
                </h3>
                <div className="space-y-4">
                  {relatedColleges.map((relatedCollege) => (
                    <Link 
                      key={relatedCollege.id}
                      href={`/colleges/${getCollegeSlug(relatedCollege.name)}`}
                      className="group block p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                    >
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {relatedCollege.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {relatedCollege.city}
                        </span>
                        <span className="text-blue-600 font-semibold text-xs truncate max-w-[140px]" title={relatedCollege.fees}>{relatedCollege.fees}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSlugPage;