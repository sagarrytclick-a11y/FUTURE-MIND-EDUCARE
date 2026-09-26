"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { usePopup } from "@/contexts/PopupContext";

type SiteMapEntry = {
  href: string;
  label: string;
  category: string;
};

const PAGE_SIZE = 24;

export default function SiteMapDirectory({ entries }: { entries: SiteMapEntry[] }) {
  const { openPopup } = usePopup();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredEntries = entries.filter((entry) =>
    `${entry.label} ${entry.href} ${entry.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleEntries = filteredEntries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const firstResult = filteredEntries.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const lastResult = Math.min(currentPage * PAGE_SIZE, filteredEntries.length);

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {filteredEntries.length} pages
            {query && ` matching “${query}”`}
          </p>
          <label className="relative mt-3 block w-full sm:w-80">
            <span className="sr-only">Search sitemap</span>
            <FaSearch aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Search pages"
              className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm text-brand-950 outline-none transition focus:border-brand-800 focus:ring-2 focus:ring-accent-200"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={openPopup}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-950 px-5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
        >
          Get Free Counseling
          <FaArrowRight aria-hidden="true" className="text-xs" />
        </button>
      </div>

      <p className="mb-3 text-xs text-gray-500" aria-live="polite">
        Showing {firstResult}-{lastResult} of {filteredEntries.length}
      </p>

      {visibleEntries.length ? (
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {visibleEntries.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="group flex min-h-14 items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-brand-800"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-brand-950 group-hover:text-brand-800">
                    {entry.label}
                  </span>
                  <span className="mt-0.5 block break-all text-xs text-gray-500">
                    {entry.href}
                  </span>
                </span>
                <span className="hidden shrink-0 text-xs text-gray-500 sm:block">
                  {entry.category}
                </span>
                <FaArrowRight aria-hidden="true" className="shrink-0 text-xs text-gray-400 group-hover:text-brand-800" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-y border-slate-200 py-10 text-center text-sm text-gray-600">
          No pages match this search.
        </p>
      )}

      <nav aria-label="Sitemap pages" className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaChevronLeft aria-hidden="true" className="text-[10px]" />
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={currentPage === pageCount}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <FaChevronRight aria-hidden="true" className="text-[10px]" />
        </button>
      </nav>
    </div>
  );
}