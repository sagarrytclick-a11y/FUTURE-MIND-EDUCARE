"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

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
}

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Constants based on your requirement
  const CARDS_PER_VIEW = 3;

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch('/blogs.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.blogs) setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const featuredBlogs = useMemo(() => blogs.slice(0, 9), [blogs]); // Show up to 9 in the slider

  useEffect(() => {
    if (!isAutoPlay || showAllBlogs || featuredBlogs.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, showAllBlogs, featuredBlogs.length, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => 
      prev + CARDS_PER_VIEW >= featuredBlogs.length ? 0 : prev + CARDS_PER_VIEW
    );
  }, [featuredBlogs.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, featuredBlogs.length - CARDS_PER_VIEW) : prev - CARDS_PER_VIEW
    );
  }, [featuredBlogs.length]);

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  const BlogCard = React.memo(({ blog }: { blog: BlogItem }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
    }, []);

    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-500 group h-full flex flex-col shadow-lg">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          {!imageError ? (
            <>
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                width={400}
                height={224}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image not available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              {blog.category}
            </span>
          </div>
        </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-gray-600 text-xs mb-3">
          <span className="flex items-center gap-1"><FaRegCalendarAlt className="text-blue-500" /> {blog.date}</span>
          <span className="flex items-center gap-1"><FaRegClock className="text-blue-500" /> {blog.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {blog.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[11px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <button className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors flex items-center gap-1 group/btn">
            Read More 
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
    );
  });

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-blue-500 font-bold tracking-[0.2em] text-sm mb-2 uppercase">Insights & Updates</h4>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              MBBS <span className="text-blue-500">Latest Blogs</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => { setIsAutoPlay(false); handlePrev(); }}
              className="p-4 rounded-xl bg-white text-gray-900 border border-gray-200 hover:border-blue-400 transition-all shadow-lg"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => { setIsAutoPlay(false); handleNext(); }}
              className="p-4 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!showAllBlogs ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700">
            {featuredBlogs.slice(currentIndex, currentIndex + CARDS_PER_VIEW).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowAllBlogs(!showAllBlogs)}
            className="px-10 py-4 rounded-full border-2 border-blue-500 text-blue-500 font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10"
          >
            {showAllBlogs ? 'Show Featured Only' : `Explore All ${blogs.length} Articles`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BlogSection);