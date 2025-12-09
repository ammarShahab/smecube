import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import graphicDesignService from '../../services/graphicDesignService.js';
import GraphicsDesSVG from "../../assets/heroSVG/GraphicsDesSVG.jsx";

// Lucide Icons
import {
  CheckCircle, Star, ChevronRight, Paintbrush, Smartphone,
  Image, Sparkles, Brush, Pencil, Palette, Layout
} from 'lucide-react';

// Custom Icons
import {
  IdeaIcon,
  DesignCreationIcon,
  RevisionFeedbackIcon,
  FinalDeliveryIcon,
  HtmlIcon,
  CssIcon
} from "../../components/servicesPage/graphicDesign/Icons.jsx";

// Icon mapping
const ICONS = {
  Paintbrush, Smartphone, Image, Sparkles, Brush, Pencil,
  Palette, Layout, HtmlIcon, CssIcon
};

const GraphicDesign = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    graphicDesignService.getPageData()
      .then(res => { 
        console.log("Graphic Design Data:", res.data); // For debugging
        setData(res.data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
      </div>
    </div>
  );
  
  if (!data) return <div className="text-center py-32 text-2xl text-red-600">ডেটা লোড করা যায়নি</div>;

  const { hero, stats, features, processSteps, portfolio, tools, packages, cta } = data;

  // Icon mapping function for process steps
  const getProcessIcon = (iconName) => {
    if (!iconName) return IdeaIcon;
    
    const iconMap = {
      'IdeaIcon': IdeaIcon,
      'DesignCreationIcon': DesignCreationIcon,
      'RevisionFeedbackIcon': RevisionFeedbackIcon,
      'FinalDeliveryIcon': FinalDeliveryIcon,
    };
    
    return iconMap[iconName] || IdeaIcon;
  };

  // Icon mapping for features and tools
  const getIconComponent = (iconName) => {
    if (!iconName) return Paintbrush;
    
    // Check for custom icons first
    if (iconName === 'HtmlIcon') return HtmlIcon;
    if (iconName === 'CssIcon') return CssIcon;
    
    // Check for Lucide icons
    const icon = ICONS[iconName];
    return icon || Paintbrush;
  };

  // Process steps from backend
  const processStepsFromBackend = (processSteps || []).map(step => ({
    step: step.step || '',
    title: step.title || '',
    description: step.description || '',
    Icon: getProcessIcon(step.icon_name)
  }));

  const fadeIn = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
  };
  
  const stagger = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left z-10"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
                {hero?.title || 'গ্রাফিক ডিজাইন সার্ভিস'}
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                {hero?.description || 'আপনার ব্যবসার জন্য আকর্ষণীয় এবং প্রফেশনাল গ্রাফিক ডিজাইন।'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  {hero?.cta || 'ফ্রি কনসালটেশন'}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <GraphicsDesSVG className="w-full max-w-lg drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-32 md:h-40 lg:h-48">
            <defs>
              <linearGradient id="gdWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path
              d="M0 108L20 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="url(#gdWave)"
            />
          </svg>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      {stats && stats.length > 0 && (
        <section className="py-24 bg-gradient-to-r from-purple-50 to-pink-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-semibold text-sm md:text-base lg:text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== PROCESS STEPS ==================== */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              <span className="text-purple-700">
                আমাদের কাজের প্রক্রিয়া
              </span>
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              ৪টি সহজ ধাপে পেশাদার ডিজাইন পেয়ে যান
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-12"
          >
            {processStepsFromBackend.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="text-center p-6 rounded-2xl bg-white border-2 border-purple-300 hover:border-purple-500 transition-all duration-300"
              >
                <step.Icon className="w-18 h-18 lg:w-28 lg:h-28 mx-auto mb-5 text-purple-600 drop-shadow-lg" />
                <span className="text-sm lg:text-base font-bold text-purple-600 tracking-wider block mb-3">
                  {step.step}
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-8 mt-12 md:hidden">
            <ChevronRight className="w-10 h-10 text-purple-400/70" />
            <ChevronRight className="w-10 h-10 text-purple-400/70" />
            <ChevronRight className="w-10 h-10 text-purple-400/70" />
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            আমাদের গ্রাফিক ডিজাইন সার্ভিস
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features && features.map((f, i) => {
              const IconComponent = getIconComponent(f.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 text-purple-600">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PORTFOLIO SECTION ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              আমাদের সাম্প্রতিক কাজ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              পেশাদার ডিজাইন এবং সৃজনশীল সমাধান যা আপনার ব্র্যান্ডকে জীবন্ত করে তোলে
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {portfolio && portfolio.map((p, i) => {
              const gradient = p.gradient || 'from-pink-400 via-red-400 to-rose-500';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 aspect-square border border-gray-100"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 text-white">
                    <h3 className="text-base md:text-lg font-bold text-center mb-2 leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 text-center">
                      {p.category}
                    </p>
                  </div>

                  {/* Hover View Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TECHNOLOGIES SECTION ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              আমরা যেসব প্রযুক্তি ব্যবহার করি
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              আধুনিক এবং শক্তিশালী প্রযুক্তি দিয়ে আপনার ডিজাইন তৈরি করি
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {tools && tools.map((tool, i) => {
              const IconComponent = getIconComponent(tool.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br ${tool.color} rounded-full flex items-center justify-center text-white mb-4 shadow-lg hover:shadow-xl transition-shadow`}>
                    <IconComponent className="w-12 h-12 md:w-14 md:h-14" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2">{tool.name}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PACKAGES ==================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">আপনার বাজেট অনুযায়ী প্যাকেজ</h2>
          <p className="text-center text-gray-600 mb-12">সাশ্রয়ী মূল্যে পেশাদার ডিজাইন</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages && packages.map((pkg, i) => {
              const link = pkg.button_link?.trim() || "/contact";
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`rounded-2xl p-8 shadow-xl ${pkg.popular ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white scale-105' : 'bg-white border border-gray-200'}`}
                >
                  {pkg.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
                        <Star className="w-4 h-4 inline mr-1" />
                        জনপ্রিয়
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4 text-center">{pkg.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">৳{pkg.price}</span>
                    <span className="block text-lg">/{pkg.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features && pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={link}
                    className={`block text-center py-3 rounded-full font-bold ${
                      pkg.popular
                        ? 'bg-white text-purple-600 hover:bg-gray-100'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    অর্ডার করুন
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {cta?.title || 'আপনার ব্র্যান্ডকে আলাদা করুন'}
            </h2>
            <p className="text-xl mb-8">
              {cta?.description || 'ফ্রি কনসালটেশন এবং ডিজাইন মকআপ পান'}
            </p>
            <Link
              to="/contact"
              className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition hover:scale-105 shadow-xl"
            >
              {cta?.cta || 'এখনই যোগাযোগ করুন'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GraphicDesign;