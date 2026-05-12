"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaRegCalendarAlt,
  FaRegClock,
  FaTag,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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

  // Fetch Blogs
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

  // Categories
  const categories = useMemo(() => {
    return ["all", ...new Set(blogs.map((b) => b.category))];
  }, [blogs]);

  // Tags
  const tags = useMemo(() => {
    return ["all", ...new Set(blogs.flatMap((b) => b.tags))];
  }, [blogs]);

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        blog.category === selectedCategory;

      const matchesTag =
        selectedTag === "all" ||
        blog.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogs, searchTerm, selectedCategory, selectedTag]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Clear Filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTag("all");
    setCurrentPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            MBBS <span className="text-blue-600">Blogs</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest medical education insights, NEET updates,
            MBBS abroad guidance and student success stories.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div className="lg:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-4 appearance-none outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-4 appearance-none outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tags.map((tag) => (
                  <option key={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            {filteredBlogs.length} Articles Found
          </p>
          
          {/* Page Info */}
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}

          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedTag !== "all") && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Blog Grid */}
        {currentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {currentBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group"
              >
                <article className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-500 shadow-sm hover:shadow-2xl h-full flex flex-col">

                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FaRegCalendarAlt />
                        {blog.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <FaRegClock />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="mt-auto">

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {blog.author}
                        </span>

                        <span className="text-blue-600 font-semibold flex items-center gap-1">
                          Read More
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Blogs Found
            </h3>

            <p className="text-gray-600 mb-6">
              Try changing search or filters
            </p>

            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="text-slate-600" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }

                  // Show ellipsis for gaps
                  if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <span key={page} className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronRight className="text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;