import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, MessageCircle, ArrowRight, RefreshCw, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogService } from '../services/blogServices';
import BlogSEO from '../components/blogSEO'; // Import the new SEO component

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Service mapping based on categories
  const serviceMappings = {
    'সোশ্যাল মিডিয়া': {
      path: '/services/facebook-boosting',
      name: 'ফেসবুক বুস্টিং সার্ভিস',
      description: 'পেশাদার ফেসবুক মার্কেটিং ও বুস্টিং সার্ভিস'
    },
    'ই-কমার্স': {
      path: '/services/ecommerce-solution',
      name: 'ই-কমার্স সলিউশন',
      description: 'সম্পূর্ণ ই-কমার্স ওয়েবসাইট ডেভেলপমেন্ট'
    },
    'ওয়েব ডেভেলপমেন্ট': {
      path: '/services/web-development',
      name: 'ওয়েব ডেভেলপমেন্ট',
      description: 'পেশাদার ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস'
    },
    'বিজনেস কনসালটিং': {
      path: '/services/business-consulting',
      name: 'বিজনেস কনসালটিং',
      description: 'বিজনেস কনসালটেশন ও স্ট্র্যাটেজি'
    },
    'ডিজিটাল মার্কেটিং': {
      path: '/services/facebook-boosting',
      name: 'ডিজিটাল মার্কেটিং',
      description: 'সম্পূর্ণ ডিজিটাল মার্কেটিং সলিউশন'
    },
    'চাটবট সেটআপ': {
      path: '/services/chatbot-setup',
      name: 'চাটবট সেটআপ',
      description: 'ফেসবুক ও ওয়েবসাইট চাটবট সেটআপ'
    },
    'ল্যান্ডিং পেজ': {
      path: '/services/landing-page',
      name: 'ল্যান্ডিং পেজ',
      description: 'হাই-কনভার্সন ল্যান্ডিং পেজ ডিজাইন'
    },
    'গ্রাফিক ডিজাইন': {
      path: '/services/graphic-design',
      name: 'গ্রাফিক ডিজাইন',
      description: 'পেশাদার গ্রাফিক ডিজাইন সার্ভিস'
    }
  };

  useEffect(() => {
    loadBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getBlogBySlug(slug);
      setPost(data.post);
      setRelatedPosts(data.relatedPosts);
      await loadFeaturedPosts(data.post?.id);
    } catch (error) {
      console.error('Error loading blog post:', error);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedPosts = async (excludePostId) => {
    try {
      const allPosts = await blogService.getAllPosts();
      const featured = allPosts.filter(post =>
        post.featured === true &&
        post.is_active === true &&
        post.id !== excludePostId
      ).slice(0, 8);
      setFeaturedPosts(featured);
    } catch (error) {
      console.error('Error loading featured posts:', error);
      // Fallback: Use related posts or other active posts if featured posts fail to load
      try {
        const allPosts = await blogService.getAllPosts();
        const fallbackPosts = allPosts.filter(post =>
          post.is_active === true &&
          post.id !== excludePostId
        ).slice(0, 8);
        setFeaturedPosts(fallbackPosts);
      } catch (fallbackError) {
        console.error('Error loading fallback posts:', fallbackError);
        setFeaturedPosts([]);
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(featuredPosts.length / 4) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(featuredPosts.length / 4) - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const refreshPost = async () => {
    await loadBlogPost();
  };

  const renderContent = (content) => {
    return { __html: content };
  };

  // Get related service based on blog category
  const getRelatedService = () => {
    if (!post?.category?.name) return null;
    return serviceMappings[post.category.name] || null;
  };

  const relatedService = getRelatedService();

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

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshPost}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Retry
          </button>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get gradient color based on category
  const getCategoryGradient = () => {
    const gradients = {
      'সোশ্যাল মিডিয়া': 'from-blue-500 to-purple-600',
      'ই-কমার্স': 'from-green-500 to-blue-600',
      'ওয়েব ডেভেলপমেন্ট': 'from-indigo-500 to-purple-600',
      'বিজনেস কনসালটিং': 'from-amber-500 to-orange-600',
      'ডিজিটাল মার্কেটিং': 'from-pink-500 to-rose-600',
      'চাটবট সেটআপ': 'from-teal-500 to-cyan-600',
      'ল্যান্ডিং পেজ': 'from-blue-500 to-cyan-600',
      'গ্রাফিক ডিজাইন': 'from-rose-500 to-pink-600',
    };
    return gradients[post.category.name] || 'from-blue-500 to-purple-600';
  };

  const getCategoryColor = () => {
    const colors = {
      'সোশ্যাল মিডিয়া': 'blue',
      'ই-কমার্স': 'green',
      'ওয়েব ডেভেলপমেন্ট': 'indigo',
      'বিজনেস কনসালটিং': 'amber',
      'ডিজিটাল মার্কেটিং': 'pink',
      'চাটবট সেটআপ': 'teal',
      'ল্যান্ডিং পেজ': 'blue',
      'গ্রাফিক ডিজাইন': 'rose',
    };
    return colors[post.category.name] || 'blue';
  };

  const gradient = getCategoryGradient();
  const color = getCategoryColor();

  // Calculate slides for carousel (4 posts per slide)
  const slides = [];
  for (let i = 0; i < featuredPosts.length; i += 4) {
    slides.push(featuredPosts.slice(i, i + 4));
  }

  return (
    <>
      {/* Use the new SEO Component */}
      <BlogSEO 
        post={post} 
        type="article" 
        relatedPosts={relatedPosts}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TOP BAR: Back + Refresh */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-between items-center"
          >
            <Link
              to="/blogs"
              className={`inline-flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              সব ব্লগ দেখুন
            </Link>
            <button
              onClick={refreshPost}
              className={`inline-flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold transition-colors`}
              title="Refresh post data"
            >
              <RefreshCw className="w-4 h-4" />
              রিফ্রেশ
            </button>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className={`inline-flex items-center gap-2 bg-${color}-100 text-${color}-800 px-4 py-2 rounded-full text-sm font-medium`}>
                <span>{post.category.name}</span>
              </div>

              {relatedService && (
                <Link
                  to={relatedService.path}
                  className="inline-flex flex-col items-center justify-center bg-cyan-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300 group min-w-[160px]"
                >
                  <span className="font-black">{post.category.name}</span>
                  <span className="text-white mt-1 opacity-90 group-hover:opacity-100">
                    সার্ভিস পেতে ক্লিক করুন
                  </span>
                </Link>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.created_at).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.read_time}</span>
              </div>
            </div>

            <div className={`w-full h-1 bg-gradient-to-r ${gradient} rounded-full mb-8`}></div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className={`bg-${color}-50 border-l-4 border-${color}-500 pl-6 py-4 mb-8 rounded-r-lg`}>
              <p className={`text-${color}-800 font-semibold text-lg`}>
                {post.excerpt}
              </p>
            </div>

            <div
              className="text-gray-700 leading-relaxed mb-8"
              dangerouslySetInnerHTML={renderContent(post.content)}
            />

            {post.sections && post.sections.length > 0 && (
              <div className="space-y-8 mb-8">
                {post.sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={renderContent(section.content)}
                    />
                  </div>
                ))}
              </div>
            )}

            {post.key_points && post.key_points.length > 0 && (
              <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-8 text-white mb-8`}>
                <h3 className="text-2xl font-bold mb-4">মূল পয়েন্টসমূহ:</h3>
                <ul className="space-y-3">
                  {post.key_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.tips && post.tips.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">প্রফেশনাল টিপস</h3>
                <ul className="text-yellow-700 space-y-2">
                  {post.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.article>

          {/* CTA Section */}
          {post.cta_title && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`bg-gradient-to-r ${gradient} rounded-2xl p-8 text-white text-center mb-8`}
            >
              <h3 className="text-2xl font-bold mb-4">{post.cta_title}</h3>
              {post.cta_button_text && post.cta_button_link && (
                <Link
                  to={post.cta_button_link}
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:gap-4"
                >
                  {post.cta_button_text}
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              )}
            </motion.div>
          )}

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200 mb-12"
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
              <button className={`p-3 bg-${color}-100 text-${color}-600 rounded-xl hover:bg-${color}-200 transition-colors`}>
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span>কমেন্ট সেকশন শীঘ্রই আসছে...</span>
            </div>
          </motion.div>

          {/* Related Blogs */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-black mb-8">
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  সম্পর্কিত ব্লগ
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`bg-${color}-500 text-white px-2 py-1 rounded-lg text-xs font-semibold`}>
                          {relatedPost.category.name}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      to={`/blogs/${relatedPost.slug}`}
                      className={`inline-flex items-center gap-2 text-${color}-500 font-semibold text-sm hover:gap-3 transition-all duration-300`}
                    >
                      বিস্তারিত পড়ুন
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Featured Carousel - Always show if there are posts, otherwise show static fallback */}
          {featuredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black">
                  <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    আরো ব্লগ দেখুন
                  </span>
                </h2>
                <Link
                  to="/blogs"
                  className={`inline-flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold transition-colors`}
                >
                  <Eye className="w-5 h-5" />
                  সব ব্লগ দেখুন
                </Link>
              </div>
              <div className="relative">
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slide, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                          {slide.map((featuredPost, index) => (
                            <motion.div
                              key={featuredPost.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative"
                            >
                              <div className="relative aspect-square overflow-hidden">
                                <img
                                  src={featuredPost.image_url}
                                  alt={featuredPost.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-2 left-2 z-10">
                                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
                                    {featuredPost.category.name}
                                  </span>
                                </div>
                                <div className="absolute bottom-2 left-2 right-2 z-10">
                                  <h3 className="text-white text-sm font-bold line-clamp-2 drop-shadow-lg">
                                    {featuredPost.title}
                                  </h3>
                                </div>
                              </div>
                              <Link
                                to={`/blogs/${featuredPost.slug}`}
                                className="absolute inset-0 z-10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="sr-only">Read {featuredPost.title}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {slides.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? `bg-${color}-500`
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            // Fallback: Show a simple grid of related or other blogs
            relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black">
                    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      সম্পর্কিত ব্লগ
                    </span>
                  </h2>
                  <Link
                    to="/blogs"
                    className={`inline-flex items-center gap-2 text-${color}-600 hover:text-${color}-700 font-semibold transition-colors`}
                  >
                    <Eye className="w-5 h-5" />
                    সব ব্লগ দেখুন
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedPosts.slice(0, 4).map((relatedPost) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                      <Link to={`/blogs/${relatedPost.slug}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={relatedPost.image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-2 left-2 z-10">
                            <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
                              {relatedPost.category.name}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 z-10">
                            <h3 className="text-white text-sm font-bold line-clamp-2 drop-shadow-lg">
                              {relatedPost.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;