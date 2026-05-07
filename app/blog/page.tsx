"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { FaSearch, FaRegCalendarAlt, FaRegClock, FaTag, FaFilter } from 'react-icons/fa';
import ErrorBoundary from '../../components/ErrorBoundary';

interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  overlayText: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch('/blogs.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.blogs) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterBlogs = useCallback(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, selectedTag]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('all');
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    filterBlogs();
  }, [filterBlogs]);

  // Get unique categories and tags
  const categories = useMemo(() => ['all', ...Array.from(new Set(blogs.map(blog => blog.category)))], [blogs]);
  const tags = useMemo(() => ['all', ...Array.from(new Set(blogs.flatMap(blog => blog.tags)))], [blogs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold md:text-5xl text-gray-900 mb-4">
                MBBS <span className="text-blue-500">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest news, exam preparation tips, and insights about medical education
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tag Filter */}
              <div>
                <div className="relative">
                  <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    {tags.map(tag => (
                      <option key={tag} value={tag}>
                        {tag === 'all' ? 'All Tags' : tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {selectedTag !== 'all' && ` tagged with ${selectedTag}`}
            </p>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link href={`/blog/${blog.id}`} key={blog.id}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-300 group h-full flex flex-col shadow-lg hover:shadow-xl cursor-pointer">
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        width={400}
                        height={224}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center gap-4 text-gray-600 text-xs mb-3">
                        <span className="flex items-center gap-1">
                          <FaRegCalendarAlt className="text-blue-500" /> {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegClock className="text-blue-500" /> {blog.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[11px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="text-[11px] text-gray-500 px-2 py-0.5 rounded">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{blog.author}</span>
                          <span className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors flex items-center gap-1">
                            Read More 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <FaSearch className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(BlogPage);
