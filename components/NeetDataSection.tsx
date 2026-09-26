"use client"
import React, { useState } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';

const NeetDataSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');

  const neetData = {
    '2026': {
      totalCandidates: 1872912,
      appeared: 1820654,
      qualified: 1819415,
      cutoffs: {
        general: 720,
        sc: 640,
        st: 630,
        obc: 600,
        ews: 600,
        pwd: 600
      },
      statistics: {
        maleQualified: 1038900,
        femaleQualified: 780515,
        totalQualified: 1819415
      }
    }
  };

  const currentYearData = neetData[selectedYear as keyof typeof neetData];

  const overviewRows: [string, string][] = [
    ['Total Candidates', currentYearData.totalCandidates.toLocaleString('en-IN')],
    ['Candidates Appeared', currentYearData.appeared.toLocaleString('en-IN')],
    ['Candidates Qualified', currentYearData.qualified.toLocaleString('en-IN')],
    ['Male Qualified', currentYearData.statistics.maleQualified.toLocaleString('en-IN')],
    ['Female Qualified', currentYearData.statistics.femaleQualified.toLocaleString('en-IN')],
  ];

  const cutoffRows: [string, number][] = [
    ['General', currentYearData.cutoffs.general],
    ['SC', currentYearData.cutoffs.sc],
    ['ST', currentYearData.cutoffs.st],
    ['OBC', currentYearData.cutoffs.obc],
    ['EWS', currentYearData.cutoffs.ews],
    ['PWD', currentYearData.cutoffs.pwd],
  ];

  return (
    <Section spacing="md" className="bg-white">
        <SectionHeading
          eyebrow="Exam Insights"
          title="NEET UG Statistics & Data"
          description="Cutoff marks, qualified candidates, and category-wise statistics for medical admissions."
        />

        {/* Year Selector */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full pl-4 pr-1.5 py-1.5">
            <label htmlFor="neet-year" className="text-xs font-semibold text-brand-950">Year:</label>
            <select
              id="neet-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-10 bg-white border border-slate-200 rounded-full px-3 text-sm text-brand-950 focus:outline-none focus:ring-2 focus:ring-brand-800"
            >
              <option value="2026">NEET 2026</option>
              <option value="2025">NEET 2025</option>
              <option value="2024">NEET 2024</option>
              <option value="2023">NEET 2023</option>
            </select>
          </div>
        </div>

        {/* Overview data table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 max-w-3xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-950 text-white text-left">
                <th scope="col" className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide">NEET {selectedYear} Overview</th>
                <th scope="col" className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {overviewRows.map(([label, value]) => (
                <tr key={label} className="odd:bg-white even:bg-slate-50 border-t border-slate-100">
                  <th scope="row" className="px-3 py-2.5 text-sm font-medium text-brand-950 text-left">{label}</th>
                  <td className="px-3 py-2.5 text-sm text-gray-600 text-right tabular-nums">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cutoff data table */}
        <h3 className="text-base sm:text-lg font-extrabold text-brand-950 mt-6 mb-3 text-center">
          NEET {selectedYear} Category-wise Cutoff Marks
        </h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 max-w-3xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-950 text-white text-left">
                <th scope="col" className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide">Category</th>
                <th scope="col" className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-right">Cutoff Marks</th>
              </tr>
            </thead>
            <tbody>
              {cutoffRows.map(([label, value]) => (
                <tr key={label} className="odd:bg-white even:bg-slate-50 border-t border-slate-100">
                  <th scope="row" className="px-3 py-2.5 text-sm font-medium text-brand-950 text-left">{label}</th>
                  <td className="px-3 py-2.5 text-sm font-bold text-brand-950 text-right tabular-nums">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-4">
            This data helps students understand competition level and required scores for MBBS admissions.
            Use our NEET rank predictor and counseling services to maximize your chances.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-brand-950 hover:bg-brand-900 text-white text-sm font-bold transition-colors">
              NEET Rank Predictor
            </button>
            <button className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-accent-100 hover:bg-accent-400 hover:text-brand-950 text-brand-950 text-sm font-bold transition-colors">
              Get Counseling
            </button>
          </div>
        </div>
    </Section>
  );
};

export default NeetDataSection;
