import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Star, Search, Calendar, User, Clock, BookOpen, MessageCircle, ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react";
import { blogService } from "../services/blogServices";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const categorySliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    loadBlogData();
  }, []);

  useEffect(() => {
    checkScroll();
  }, [categories]);

  const loadBlogData = async () => {
    try {
      const data = await blogService.getBlogPageData();
      setBlogPosts(data.posts);
      setCategories(data.categories);
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkScroll = () => {
    if (categorySliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categorySliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (categorySliderRef.current) {
      const scrollAmount = 200;
      categorySliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const filters = [
    { id: "all", label: "সব পোস্ট" },
    { id: "featured", label: "ফিচার্ড" },
    { id: "popular", label: "জনপ্রিয়" },
    { id: "recent", label: "সাম্প্রতিক" },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "all" || post.category.slug === selectedCategory) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredPosts = () => {
    switch (activeFilter) {
      case "featured":
        return filteredPosts.filter(post => post.featured);
      case "popular":
        return filteredPosts.slice().sort((a, b) => b.id - a.id);
      case "recent":
        return filteredPosts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default:
        return filteredPosts;
    }
  };

  const displayPosts = getFilteredPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ব্লগ - এসএমী কিউব | ডিজিটাল মার্কেটিং ও ব্যবসায়িক টিপস</title>
        <meta name="description" content="ডিজিটাল মার্কেটিং, ব্যবসায়িক উন্নয়ন, এবং প্রযুক্তি সম্পর্কিত সর্বশেষ খবর, টিপস এবং গাইড পড়ুন এসএমী কিউব ব্লগে।" />
        <meta name="keywords" content="ডিজিটাল মার্কেটিং, ই-কমার্স, ওয়েব ডেভেলপমেন্ট, ব্যবসায়িক টিপস, বাংলাদেশ" />
        <meta property="og:title" content="ব্লগ - এসএমী কিউব" />
        <meta property="og:description" content="ডিজিটাল মার্কেটিং ও ব্যবসায়িক টিপস" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://smecube.com/blogs" />
      </Helmet>

      <div className="min-h-screen bg-white pt-20 pb-10">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header - Title and Search Bar Side by Side */}
            <div className="mb-16 flex items-center gap-4">
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent whitespace-nowrap">
                SME BLoGs
              </h1>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent bg-white text-sm text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Main Content - Flex layout with Sidebar */}
            <div className="flex gap-8">
            {/* Sidebar - Filter Buttons */}
            <div className="w-48 flex-shrink-0">
              <div className="sticky top-24 space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-sm text-left ${
                      activeFilter === filter.id
                        ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 -ml-8 max-w-5xl">
              {/* View Mode Toggle */}
              <div className="mb-6 flex items-center justify-start pl-8">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-red-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-red-50"
                    }`}
                    title="Grid View"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-red-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-red-50"
                    }`}
                    title="List View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Category Slider Tabs */}
              <div className="mb-8 relative flex items-center pl-8">
                {canScrollLeft && (
                  <button
                    onClick={() => scroll("left")}
                    className="z-10 bg-white rounded-full p-1 hover:bg-red-50 transition-all mr-2 flex-shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5 text-red-700" />
                  </button>
                )}
                
                <div
                  ref={categorySliderRef}
                  className="flex gap-2 overflow-x-auto scroll-smooth flex-1"
                  style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
                  onScroll={checkScroll}
                >
                  <style>{`
                    [role="button"]::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700"
                    }`}
                  >
                    সব ক্যাটাগরি
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm ${
                        selectedCategory === category.slug
                          ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {canScrollRight && (
                  <button
                    onClick={() => scroll("right")}
                    className="z-10 bg-white rounded-full p-1 hover:bg-red-50 transition-all ml-2 flex-shrink-0"
                  >
                    <ChevronRight className="w-5 h-5 text-red-700" />
                  </button>
                )}
              </div>

              {/* Blog Posts - Grid or List View */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {viewMode === "grid" ? (
                  // Grid View
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-8">
                    {displayPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative overflow-hidden h-44 flex-grow">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-gradient-to-r from-red-700 to-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                              {post.category.name}
                            </span>
                          </div>
                          {post.featured && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                ⭐ Featured
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col">
                          <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.read_time}
                            </span>
                          </div>
                          <Link
                            to={`/blogs/${post.slug}`}
                            className="inline-flex items-center gap-1 text-red-700 font-semibold text-sm hover:text-red-800 transition-colors group-hover:gap-2"
                          >
                            Read more
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-4">
                    {displayPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-6">
                          {/* Image Section */}
                          <div className="flex-shrink-0 w-40 h-32 rounded-lg overflow-hidden relative flex-shrink-0">
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.featured && (
                              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                ⭐ Featured
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="flex-grow flex flex-col justify-between">
                            {/* Header Info */}
                            <div>
                              <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                                  {post.category.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(post.created_at).toLocaleDateString('bn-BD')}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.read_time}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2">
                                {post.title}
                              </h3>

                              {/* Description */}
                              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Footer - Author and Read Link */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-700">
                                  {post.author}
                                </span>
                              </div>
                              <Link
                                to={`/blogs/${post.slug}`}
                                className="inline-flex items-center gap-2 text-red-700 font-semibold text-sm hover:text-red-800 transition-colors group-hover:gap-3"
                              >
                                Read Article
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-8">
                {/* Empty space for sidebar alignment */}
                <div className="w-48 flex-shrink-0"></div>
                
                {/* Reviews Content */}
                <div className="flex-1 -ml-8 max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="pt-12 border-t border-gray-200 pl-8"
                  >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent mb-8 text-center">
                    আমাদের গ্রাহকদের মতামত
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-4">
                      "{review.review}"
                    </p>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                  </div>
                </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
