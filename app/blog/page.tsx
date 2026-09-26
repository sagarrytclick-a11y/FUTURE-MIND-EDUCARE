"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaRegCalendarAlt,
  FaRegClock,
  FaTag,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/blogs.json");

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();

        setBlogs(data.blogs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(blogs.map((b) => b.category))];
  }, [blogs]);

  const tags = useMemo(() => {
    return ["all", ...new Set(blogs.flatMap((b) => b.tags))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;

      const matchesTag =
        selectedTag === "all" || blog.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogs, searchTerm, selectedCategory, selectedTag]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTag("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 rounded-full border-4 border-brand-900 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        align="center"
        variant="tinted"
        eyebrow="Insights & Updates"
        title="MBBS"
        highlight="Blogs"
        description="Latest medical education insights, NEET updates, MBBS abroad guidance and student success stories."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <Section spacing="md">
        {/* CENTERED search + filters */}
        <div className="mx-auto mb-5 w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          {/* SEARCH — full width */}
          <div className="relative w-full">
            <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              placeholder="Search blogs by title, topic or keyword..."
              value={searchTerm}
              onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-28 text-base font-medium text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-accent-400 focus:bg-white focus:ring-4 focus:ring-accent-100"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-brand-950"
              >
                Clear
              </button>
            )}
          </div>

          {/* FILTERS */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative">
              <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition-all duration-300 focus:border-accent-400 focus:ring-4 focus:ring-accent-100"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FaTag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <select
                value={selectedTag}
                onChange={(e) => {
                  setSelectedTag(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition-all duration-300 focus:border-accent-400 focus:ring-4 focus:ring-accent-100"
              >
                {tags.map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center justify-center gap-2 border-b border-slate-200 pb-3 text-center sm:flex-row">
          <p className="text-sm font-semibold text-gray-600">{filteredBlogs.length} Articles Found</p>
          <div className="flex items-center gap-3">
            {totalPages > 1 && (
              <p className="text-xs text-gray-600">Page {currentPage} of {totalPages}</p>
            )}
            {(searchTerm || selectedCategory !== "all" || selectedTag !== "all") && (
              <button onClick={clearFilters} className="text-sm text-brand-950 font-bold hover:underline">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {currentBlogs.length > 0 ? (
          /* Blog card grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group flex flex-col h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-900 hover:shadow-xl"
              >
                <span className="relative block h-44 overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-accent-400 px-2.5 py-1 text-[11px] font-bold uppercase text-brand-950">
                    {blog.category}
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-4">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <FaRegCalendarAlt className="text-[11px] text-accent-500" />
                      {blog.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaRegClock className="text-[11px] text-accent-500" />
                      {blog.readTime}
                    </span>
                  </span>

                  <h2 className="mt-1.5 line-clamp-2 text-brand-950 font-extrabold tracking-tight text-base leading-snug transition-colors duration-300 group-hover:text-accent-600">
                    {blog.title}
                  </h2>

                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {blog.description}
                  </p>

                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </span>

                  <span className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="truncate text-xs text-gray-500">
                      By {blog.author}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-accent-600">
                      Read
                      <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200">
            <h3 className="text-brand-950 font-extrabold tracking-tight text-base sm:text-lg mb-1">No Blogs Found</h3>
            <p className="text-sm text-gray-600 mb-4">Try changing search or filters</p>
            <button
              onClick={clearFilters}
              className="h-11 px-6 bg-brand-950 hover:bg-brand-900 text-white rounded-full text-sm font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white rounded-full border border-slate-200 p-2 flex items-center gap-1.5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="w-11 h-11 rounded-full hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <FaChevronLeft className="text-gray-600 text-xs" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-11 h-11 rounded-full text-sm font-bold transition-colors ${
                          currentPage === page ? "bg-brand-950 text-white" : "hover:bg-accent-100 text-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
                    return (
                      <span key={page} className="px-1.5 text-gray-400 text-sm">...</span>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="w-11 h-11 rounded-full hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <FaChevronRight className="text-gray-600 text-xs" />
              </button>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default BlogPage;
