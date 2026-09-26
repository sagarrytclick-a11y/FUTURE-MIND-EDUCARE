"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { usePopup } from "@/contexts/PopupContext";
import { neetMarksSchema } from "@/lib/validation";
import {
  AIQ_2026_TOP_GOVT,
  CategoryKey,
  NEET_CUTOFF_2026,
  NEET_MAX_MARKS,
  NEET_RESULT_DATE,
  NEET_YEAR,
  PredictionTier,
  findCutoff,
  predictNeet,
} from "@/lib/neet-cutoff";

type College = {
  id: number;
  name: string;
  city: string;
  fees: string;
  seats: number;
  type: string;
  image: string;
  ranking?: string;
};

type FlatCollege = College & { state: string };

const CATEGORY_GROUPS: { label: string; options: { key: CategoryKey; label: string }[] }[] = [
  {
    label: "General & OBC",
    options: [
      { key: "UR", label: "General / UR" },
      { key: "EWS", label: "EWS" },
      { key: "OBC", label: "OBC-NCL" },
    ],
  },
  {
    label: "Scheduled Castes & Tribes",
    options: [
      { key: "SC", label: "SC (Scheduled Caste)" },
      { key: "ST", label: "ST (Scheduled Tribe)" },
    ],
  },
  {
    label: "Persons with Benchmark Disability",
    options: [
      { key: "UR_PwBD", label: "UR / EWS – PwBD" },
      { key: "OBC_PwBD", label: "OBC – PwBD" },
      { key: "SC_PwBD", label: "SC – PwBD" },
      { key: "ST_PwBD", label: "ST – PwBD" },
    ],
  },
];

const TIER_STYLE: Record<
  PredictionTier,
  { badge: string; card: string; bar: string; icon: React.ReactNode }
> = {
  "not-qualified": {
    badge: "bg-red-50 text-red-700 border border-red-200",
    card: "border-red-200 bg-red-50",
    bar: "bg-red-500",
    icon: <FaTimesCircle className="text-red-500" />,
  },
  qualified: {
    badge: "bg-accent-100 text-accent-700 border border-accent-200",
    card: "border-accent-200 bg-accent-50",
    bar: "bg-accent-400",
    icon: <FaChartLine className="text-accent-600" />,
  },
  government: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    card: "border-blue-200 bg-blue-50",
    bar: "bg-brand-900",
    icon: <FaCheckCircle className="text-brand-900" />,
  },
  "top-government": {
    badge: "bg-green-50 text-green-700 border border-green-200",
    card: "border-green-200 bg-green-50",
    bar: "bg-green-600",
    icon: <FaCheckCircle className="text-green-600" />,
  },
};

const inputClass =
  "w-full h-11 px-4 rounded-full border border-slate-200 bg-white text-sm text-brand-950 outline-none transition-all focus:border-brand-800 focus:ring-2 focus:ring-accent-100";
const labelClass =
  "block text-xs font-bold uppercase tracking-wide text-accent-600 mb-1.5";

const NeetPredictorPage: React.FC = () => {
  const { openPopup } = usePopup();
  const [marks, setMarks] = useState("");
  const [category, setCategory] = useState<CategoryKey>("UR");
  const [submitted, setSubmitted] = useState(false);
  const [colleges, setColleges] = useState<FlatCollege[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/mbbs-india.json");
        const data = await res.json();
        if (cancelled) return;
        const flat: FlatCollege[] = [];
        for (const state of data.states ?? []) {
          for (const college of state.colleges ?? []) {
            flat.push({ ...college, state: state.name });
          }
        }
        setColleges(flat);
      } catch (error) {
        console.error(error);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const numericMarks = Number(marks);
  const marksValidation = neetMarksSchema.safeParse(marks);
  const isValid = marksValidation.success;
  const marksError = isValid ? '' : marksValidation.error.issues[0]?.message ?? '';

  const prediction = useMemo(() => {
    if (!submitted || !isValid) return null;
    return predictNeet(numericMarks, category);
  }, [submitted, isValid, numericMarks, category]);

  const suggestions = useMemo(() => {
    if (!prediction) return [];
    const govt = colleges.filter((c) => c.type === "Government");
    const privateCollege = colleges.filter((c) => c.type !== "Government");

    if (prediction.tier === "top-government") return govt.slice(0, 6);
    if (prediction.tier === "government") return govt.slice(6, 14);
    if (prediction.tier === "qualified") return privateCollege.slice(0, 6);
    return [];
  }, [prediction, colleges]);

  const row = findCutoff(category);
  const scale = (value: number) => Math.max(0, Math.min(100, (value / NEET_MAX_MARKS) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        align="center"
        variant="light"
        eyebrow="NEET UG 2026"
        title="Check Your"
        highlight="Admission Chances"
        description={`Category-wise predictor built on the official NTA qualifying cut-off declared on ${NEET_RESULT_DATE}. Works for General, EWS, OBC, SC, ST and PwBD.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "NEET Predictor" }]}
      />

      {/* PREDICTOR */}
      <Section spacing="md">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] items-start">
          {/* INPUT CARD */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <SectionHeading
              align="left"
              eyebrow="Step 1"
              title="Enter Your Score"
              className="mb-4"
            />

            <label className={labelClass} htmlFor="neet-marks">
              NEET UG 2026 marks (out of {NEET_MAX_MARKS})
            </label>
            <input
              id="neet-marks"
              type="number"
              min={0}
              max={NEET_MAX_MARKS}
              step={1}
              inputMode="numeric"
              value={marks}
              onChange={(e) => {
                setMarks(e.target.value);
                setSubmitted(false);
              }}
              aria-invalid={Boolean(marksError)}
              aria-describedby={marksError ? 'neet-marks-error' : 'neet-marks-hint'}
              placeholder="e.g. 542"
              className={`${inputClass} ${marksError ? 'border-red-400' : ''}`}
            />
            {marksError ? (
              <p id="neet-marks-error" className="mt-1.5 text-xs font-medium text-red-600">
                {marksError}
              </p>
            ) : (
              <p id="neet-marks-hint" className="mt-1.5 text-xs text-slate-500">
                Whole number between 0 and {NEET_MAX_MARKS}.
              </p>
            )}

            <label className={`${labelClass} mt-4`} htmlFor="neet-category">
              Your category
            </label>
            <select
              id="neet-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as CategoryKey);
                setSubmitted(false);
              }}
              className={inputClass}
            >
              {CATEGORY_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs leading-relaxed text-gray-600">
              <span className="font-bold text-brand-950">
                {row.label} cut-off {NEET_YEAR}
              </span>{" "}
              — {row.percentile} percentile, {row.max}–{row.min} marks.{" "}
              {row.qualified.toLocaleString("en-IN")} candidates qualified in this
              category.
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-400 text-sm font-bold text-brand-950 transition-all duration-300 hover:bg-accent-500 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              Predict My Chances <FaArrowRight className="text-xs" />
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">
              Estimate only — final allotment depends on counselling round, state
              quota and seat availability.
            </p>
          </form>

          {/* RESULT CARD */}
          <div className="min-h-[320px]">
            {!prediction ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <FaChartLine className="text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-bold text-brand-950">
                  Your prediction will appear here
                </p>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-500">
                  Add your marks and category on the left. We compare them against
                  the official {NEET_YEAR} qualifying cut-off for your category.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* VERDICT */}
                <div
                  className={`rounded-3xl border p-5 sm:p-6 ${TIER_STYLE[prediction.tier].card}`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase ${TIER_STYLE[prediction.tier].badge}`}
                    >
                      {TIER_STYLE[prediction.tier].icon}
                      {prediction.row.label}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Your score: {numericMarks} / {NEET_MAX_MARKS}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-extrabold tracking-tight text-brand-950 sm:text-2xl">
                    {prediction.headline}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {prediction.summary}
                  </p>

                  {/* SCORE SCALE */}
                  <div className="mt-5">
                    <div className="relative h-3 rounded-full bg-white/70">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full ${TIER_STYLE[prediction.tier].bar}`}
                        style={{ width: `${scale(numericMarks)}%` }}
                      />
                    </div>
                    <div className="relative mt-2 h-9">
                      {[
                        { value: prediction.row.min, label: "Qualify" },
                        { value: prediction.row.govtChance, label: "Govt MBBS" },
                        { value: prediction.row.topGovt, label: "Top govt" },
                      ].map((mark) => (
                        <div
                          key={mark.label}
                          className="absolute top-0 -translate-x-1/2 text-center"
                          style={{ left: `${scale(mark.value)}%` }}
                        >
                          <div className="mx-auto h-2 w-px bg-gray-400" />
                          <div className="mt-0.5 text-[10px] font-bold text-gray-500 whitespace-nowrap">
                            {mark.value}
                          </div>
                          <div className="text-[10px] text-gray-400 whitespace-nowrap">
                            {mark.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {prediction.advice.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SUGGESTED COLLEGES */}
                {suggestions.length > 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <SectionHeading
                      align="left"
                      eyebrow="Matched to your score"
                      title={
                        prediction.tier === "qualified"
                          ? "Private colleges in range"
                          : "Government colleges in range"
                      }
                      className="mb-4"
                    />
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {suggestions.map((college) => (
                        <div
                          key={college.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 transition-colors hover:border-brand-900"
                        >
                          <p className="text-sm font-bold leading-snug text-brand-950 line-clamp-2">
                            {college.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {college.city} · {college.seats} seats
                          </p>
                          <p className="mt-1.5 text-xs font-extrabold text-brand-950">
                            {college.fees}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={openPopup}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white transition-colors hover:bg-brand-900"
                      >
                        Get Personalised Guidance <FaArrowRight className="text-xs" />
                      </button>
                      <Link
                        href="/colleges/mbbs-india"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-6 text-sm font-bold text-brand-950 transition-colors hover:border-brand-900"
                      >
                        View all 296 colleges
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* OFFICIAL CUTOFF TABLE */}
      <Section spacing="md">
        <SectionHeading
          eyebrow={`NTA · declared ${NEET_RESULT_DATE}`}
          title="NEET UG 2026 Qualifying Cut-off"
          description="Official category-wise cut-off released with the result. Reserved categories qualify at the 40th percentile, so the marks bar is lower than General."
        />

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-brand-950 text-white">
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Category
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Percentile
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  {NEET_YEAR} marks
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  2025 marks
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Qualified
                </th>
              </tr>
            </thead>
            <tbody>
              {NEET_CUTOFF_2026.map((cutoff) => (
                <tr
                  key={cutoff.key}
                  className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50 ${
                    cutoff.key === category ? "bg-accent-50" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-brand-950">{cutoff.label}</td>
                  <td className="px-4 py-3 text-gray-600">{cutoff.percentile}</td>
                  <td className="px-4 py-3 font-bold text-brand-950">
                    {cutoff.max} – {cutoff.min}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{cutoff.previous}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {cutoff.qualified.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-gray-500">
          Source: NTA, NEET UG {NEET_YEAR} result published {NEET_RESULT_DATE}.
          Qualifying makes you eligible for counselling — it does not guarantee a
          seat.
        </p>
      </Section>

      {/* AIQ RANK REFERENCE */}
      <Section spacing="md">
        <SectionHeading
          eyebrow="MCC · All India Quota Round 1, 2026"
          title="Government College Closing Ranks"
          description="Actual opening and closing ranks at which General category seats closed in Round 1 of MCC counselling."
        />

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-brand-950 text-white">
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Government college
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Opening rank
                </th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                  Closing rank
                </th>
              </tr>
            </thead>
            <tbody>
              {AIQ_2026_TOP_GOVT.map((entry) => (
                <tr
                  key={entry.college}
                  className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-semibold text-brand-950">
                    {entry.college}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {entry.opening.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-bold text-brand-950">
                    {entry.closing.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <div className="rounded-3xl bg-brand-950 px-6 py-8 text-center sm:px-10 sm:py-10">
          <SectionHeading
            align="center"
            dark
            eyebrow="Not sure about the numbers"
            title="Talk to a NEET Counsellor"
            description="Share your score and category — we will shortlist realistic government and private options for your state and budget."
            className="mb-5"
          />
          <button
            onClick={openPopup}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-400 px-7 text-sm font-bold text-brand-950 transition-all duration-300 hover:bg-accent-500 hover:shadow-lg"
          >
            Get Free Consultation <FaArrowRight className="text-xs" />
          </button>
        </div>
      </Section>
    </div>
  );
};

export default NeetPredictorPage;
