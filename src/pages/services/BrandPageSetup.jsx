import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Eye,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  Zap,
  Loader2,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const BrandPageSetup = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for all sections
  const [heroData, setHeroData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [packages, setPackages] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/brand-page/page-data`);
      
      if (response.data.success) {
        const { hero, features, packages, successStories, testimonials } = response.data.data;
        setHeroData(hero);
        setFeatures(features);
        setPackages(packages);
        setSuccessStories(successStories);
        setTestimonials(testimonials);
      }
    } catch (err) {
      console.error("Error fetching page data:", err);
      setError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Icon mapping for features
  const iconMap = {
    "👁️": <Eye className="w-6 h-6" />,
    "👥": <Users className="w-6 h-6" />,
    "📅": <Share2 className="w-6 h-6" />,
    "📊": <BarChart3 className="w-6 h-6" />,
  };

  // Icon mapping for success stories
  const successIconMap = {
    "📈": <TrendingUp className="md:w-8 md:h-8 w-6 h-6" />,
    "✨": <Sparkles className="md:w-8 md:h-8 w-6 h-6" />,
    "⭐": <Star className="md:w-8 md:h-8 w-6 h-6" />,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={fetchPageData}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        .font-hind {
          font-family: 'Hind Siliguri', sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-800 via-pink-700 to-purple-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                সোশ্যাল মিডিয়া বিশেষজ্ঞ
              </motion.div>

              {heroData && (
                <>
                  <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                    {heroData.title}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mt-2">
                      {heroData.subtitle}
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed">
                    {heroData.description}
                  </p>
                </>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { number: "500+", label: "ব্র্যান্ড" },
                  { number: "10M+", label: "রিচ" },
                  { number: "98%", label: "সন্তুষ্টি" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-purple-200 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {heroData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 shadow-2xl transition-all"
                  >
                    {heroData.cta1}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    {heroData.cta2}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>


      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="px-[15%]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-500 rounded-full text-sm font-semibold mb-4"
            >
              <Zap className="w-4 h-4" />
              আমাদের সেবা
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              আমরা যা অফার করি
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              সম্পূর্ণ ব্র্যান্ড পেজ ম্যানেজমেন্ট সেবা একটি প্যাকেজে
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group text-center bg-gradient-to-br from-white to-purple-100 rounded-3xl p-2 md:p-4 shadow-lg hover:shadow-2xl transition-all border border-purple-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-26 h-26 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-500 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[feature.icon] || <Zap className="w-6 h-6" />}
                  </div>
                  <h3 className="relative z-10 text-sm sm:text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[12px] xl:text-xl md:text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a855f7' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="px-[15%] relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-white text-purple-500 rounded-full text-sm font-semibold mb-4 shadow-sm"
            >
              মূল্য পরিকল্পনা
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              আমাদের প্যাকেজ সমূহ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              আপনার প্রয়োজন অনুযায়ী সেবা প্যাকেজ নির্বাচন করুন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-3 lg:gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -15 }}
                className={`relative rounded-3xl p-2 md:p-8 shadow-xl transition-all ${
                  pkg.recommended
                    ? `bg-gradient-to-br ${pkg.gradient} text-white scale-105 shadow-2xl`
                    : "bg-white text-gray-800 hover:shadow-2xl"
                }`}
              >
                {pkg.recommended && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      সর্বাধিক জনপ্রিয়
                    </span>
                  </motion.div>
                )}

                <div className="text-center mb-8 mt-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-2xl md:text-xl lg:text-5xl font-bold">
                      ৳{pkg.price}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      pkg.recommended ? "text-purple-200" : "text-gray-500"
                    }`}
                  >
                    প্রতি {pkg.duration}
                  </span>
                </div>

                <ul className="space-y-2 md:space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pkg.recommended ? "text-green-300" : "text-green-500"
                        }`}
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                      onClick={() => {
                          if (pkg.button_link) {
                              window.open(pkg.button_link, '_blank', 'noopener,noreferrer');
                          } else {
                              setSelectedPackage(pkg.id);
                          }
                      }}
                      className={`w-full py-3 md:py-4 rounded-xl font-semibold transition-all hover:scale-102 active:scale-95 text-sm md:text-base ${
                          pkg.recommended
                              ? "bg-white text-purple-600 hover:bg-gray-50"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                      }`}
                  >
                      {pkg.button_link ? 'অর্ডার করুন' : 'প্যাকেজ নির্বাচন করুন'}
                  </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="px-[15%]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-500 rounded-full text-sm font-semibold mb-4"
            >
              <TrendingUp className="w-4 h-4" />
              সাফল্যের গল্প
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              আমাদের ক্লায়েন্টদের সাফল্য
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {successStories.map((story, index) => (
              <div
                key={story.id}
                className="group text-center bg-gradient-to-br from-white to-pink-100 rounded-2xl p-1.5 sm:p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 border border-pink-100 min-h-[180px] sm:min-h-[220px] flex flex-col justify-center"
              >
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-500 w-8 h-8 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-6 group-hover:scale-110 transition-transform">
                    {successIconMap[story.icon] || <Star className="md:w-8 md:h-8 w-6 h-6" />}
                  </div>
                  <div className="text-xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 md:mb-4">
                    {story.growth}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
                    {story.brand}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-xl">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="px-[15%]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ক্লায়েন্টরা যা বলেন
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-3xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-xs md:text-lg mb-4 md:mb-6 leading-relaxed italic font-hind line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mx-auto max-w-6xl px-[10%]"
      >
        <div className="m-10 p-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 opacity-20 p-4">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                আপনার ব্র্যান্ডের যাত্রা শুরু করুন
              </h2>
              <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                আজই আমাদের সাথে যোগাযোগ করুন এবং আপনার সোশ্যাল মিডিয়া
                উপস্থিতিকে নতুন উচ্চতায় নিয়ে যান
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 60px rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-purple-600 px-10 py-5 rounded-full font-semibold text-lg shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  ফ্রি অডিট রিকোয়েস্ট করুন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  লাইভ চ্যাট
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BrandPageSetup;