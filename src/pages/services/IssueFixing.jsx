import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import issueFixingService from "../../services/issueFixingService";
import {
  Wrench, CheckCircle, Star, Award, Code, Bug, Server, Database,
  Smartphone, Globe, Palette, TrendingUp, ShoppingCart, Zap,
  HelpCircle, Calendar, Headphones, Shield, Gift, ChevronRight
} from "lucide-react";

// Hero SVG
import IssueFixSVG from "../../assets/heroSVG/IssueFixSVG";

// New Icons from IconLibrary
import {
  DiagnosisAnalysisIcon,
  FastFixTestingIcon,
  LiveWarrantyIcon,
  ProblemReportIcon,
  QuickFixIcon,
  GuaranteedIcon,
  SecureIcon,
  SupportIcon,
} from "../../components/servicesPage/issueFixing/Icons"; // Adjust path if needed

// Lucide Icon Mapping
const ICONS = {
  Wrench, CheckCircle, Star, Award, Code, Bug, Server, Database,
  Smartphone, Globe, Palette, TrendingUp, ShoppingCart, Zap,
  HelpCircle, Calendar, Headphones, Shield, Gift
};

// Icon mapping functions
const getProcessIcon = (iconName) => {
  if (!iconName) return Wrench;
  
  const iconMap = {
    'DiagnosisAnalysisIcon': DiagnosisAnalysisIcon,
    'FastFixTestingIcon': FastFixTestingIcon,
    'LiveWarrantyIcon': LiveWarrantyIcon,
    'ProblemReportIcon': ProblemReportIcon,
    'QuickFixIcon': QuickFixIcon,
    'GuaranteedIcon': GuaranteedIcon,
    'SecureIcon': SecureIcon,
    'SupportIcon': SupportIcon,
  };
  
  const icon = iconMap[iconName] || ICONS[iconName];
  return icon || Wrench;
};

const getFeatureIcon = (iconName) => {
  if (!iconName) return CheckCircle;
  
  const iconMap = {
    'DiagnosisAnalysisIcon': DiagnosisAnalysisIcon,
    'FastFixTestingIcon': FastFixTestingIcon,
    'LiveWarrantyIcon': LiveWarrantyIcon,
    'ProblemReportIcon': ProblemReportIcon,
    'QuickFixIcon': QuickFixIcon,
    'GuaranteedIcon': GuaranteedIcon,
    'SecureIcon': SecureIcon,
    'SupportIcon': SupportIcon,
  };
  
  const icon = iconMap[iconName] || ICONS[iconName];
  return icon || CheckCircle;
};

const IssueFixing = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    issueFixingService
      .getPageData()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load page data:", err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div>
      </div>
    );
  }

  // Destructure with fallbacks
const {
  hero = {},
  stats = [],
  features = [], // NEW: Get features from backend
  processSteps = [], // Get process from backend
  packages = [], // Get packages from backend (4 packages)
  technologies = [],
  cta = {}
} = data;

// Create a function to get technology icon
const getTechIcon = (iconName) => {
  if (!iconName) return Code;
  
  const icon = ICONS[iconName] || Code;
  return icon;
};

// Map technologies from backend
const technologiesFromBackend = technologies.map(tech => ({
  name: tech.name || '',
  icon: getTechIcon(tech.icon),
  problems: tech.problems || []
}));
// Map process steps with icons
const processStepsFromBackend = processSteps.map(step => ({
  step: step.step || '',
  title: step.title || '',
  description: step.description || '',
  Icon: getProcessIcon(step.icon_name) // Function to map icon name to component
}));

// Map features with icons
const featuresFromBackend = features.map(feature => ({
  title: feature.title || '',
  description: feature.description || '',
  Icon: getFeatureIcon(feature.icon_name) // Function to map icon name to component
}));


  // Default fallbacks
  const defaultHero = {
    title: 'টেকনিক্যাল ইস্যু ফিক্সিং সার্ভিস',
    description: 'ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং - যেকোনো টেকনিক্যাল সমস্যার পেশাদার সমাধান',
    ctaPrimary: 'ইস্যু ফিক্সিং শুরু করুন',
    ctaSecondary: 'বিশেষ অফার দেখুন'
  };

  const defaultCta = {
    title: 'আপনার টেক সমস্যা এখনই সমাধান করুন',
    description: 'বিশেষ অফার এবং ফ্রি কনসালটেশন - সীমিত সময়ের জন্য',
    ctaPrimary: 'ফ্রি কনসালটেশন নিন',
    ctaSecondary: 'কল করুন এখনই'
  };

  const safeHero = { ...defaultHero, ...hero };
  const safeCta = { ...defaultCta, ...cta };



const packagesFromBackend = packages || [];23

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* ==================== UPDATED HERO SECTION ==================== */}
      <section className="h-[80vh] flex items-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center px-[15%] gap-12 lg:gap-20">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left max-w-4xl z-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              {safeHero.title}
            </h1>
            <p className="text-base md:text-lg text-gray-100 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              {safeHero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {safeHero.ctaPrimary}
              </Link>
              <a
                href="#special-offers"
                className="border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                {safeHero.ctaSecondary}
              </a>
            </div>
          </motion.div>

          {/* Right: SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-lg z-10"
          >
            <IssueFixSVG />
          </motion.div>
        </div>

        {/* Beautiful Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-32 md:h-40 lg:h-48">
            <defs>
              <linearGradient id="vibrantWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="35%" stopColor="#ec4899" />
                <stop offset="65%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
            <path
              d="M0 108L20 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="url(#vibrantWaveGradient)"
            />
          </svg>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      {stats.length > 0 && (
        <section className="py-24 bg-gradient-to-r from-purple-50 to-pink-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
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
<section className="py-20 lg:py-28 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16 lg:mb-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
          আমাদের কাজের প্রক্রিয়া
        </span>
      </h2>
      <p className="mt-6 text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
        সহজ ধাপে আপনার যেকোনো টেকনিক্যাল সমস্যা ১০০% সমাধান
      </p>
    </motion.div>

    <motion.div
      className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-8 xl:gap-12 overflow-x-auto md:overflow-visible"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {processStepsFromBackend.map((item, index) => (
        <React.Fragment key={index}>
          <motion.div
            className="flex flex-col items-center text-center flex-1 min-w-0 max-w-xs lg:max-w-sm"
            variants={fadeIn}
          >
            <item.Icon className="w-18 h-18 mb-5 lg:w-28 lg:h-28 text-orange-600" />
            <span className="text-sm lg:text-base font-bold text-purple-600 tracking-wider mb-3 block">
              {item.step}
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">
              {item.description}
            </p>
          </motion.div>

          {index < processStepsFromBackend.length - 1 && (
            <div className="hidden md:flex items-center justify-center h-full lg:mt-8">
              <ChevronRight className="w-9 h-9 lg:w-14 lg:h-14 text-pink-400/70" />
            </div>
          )}
        </React.Fragment>
      ))}
    </motion.div>

    {/* Mobile Arrows */}
    {processStepsFromBackend.length > 1 && (
      <div className="flex justify-center gap-8 mt-12 md:hidden">
        {processStepsFromBackend.slice(0, -1).map((_, idx) => (
          <ChevronRight key={idx} className="w-9 h-9 text-pink-400/70" />
        ))}
      </div>
    )}
  </div>
</section>

{/* ==================== FEATURES ==================== */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">বিশেষ সুবিধা</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">কেন আমরাই আপনার ইস্যু ফিক্সিংয়ের জন্য সেরা পছন্দ?</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuresFromBackend.map((feature, idx) => (
        <motion.div
          key={idx}
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <feature.Icon className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ==================== PACKAGES ==================== */}
<section className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-purple-600 font-bold text-lg mb-2">সীমিত সময়ের জন্য এক্সক্লুসিভ ডিসকাউন্ট</p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">আমাদের প্রিমিয়াম প্যাকেজ</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {packagesFromBackend.map((pkg, index) => {
        // Determine gradient colors based on index
        const gradients = [
          'from-indigo-600 to-purple-600',
          'from-pink-600 to-rose-600',
          'from-blue-600 to-cyan-600',
          'from-green-600 to-teal-600'
        ];
        
        const gradientClass = pkg.popular 
          ? gradients[index % gradients.length]
          : '';
          
        const isPopular = pkg.popular;
        
        return (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className={`rounded-2xl p-8 ${isPopular 
              ? `bg-gradient-to-br ${gradientClass} text-white transform lg:scale-105 shadow-2xl` 
              : 'bg-white border-2 border-gray-200 shadow-lg'
            } relative`}
          >
            {isPopular && pkg.badgeText && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-indigo-900 px-4 py-1 rounded-full text-sm font-bold">
                  {pkg.badgeText}
                </span>
              </div>
            )}
            
            <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-800'}`}>
              {pkg.name}
            </h3>
            <p className={`text-sm mb-6 ${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
              {pkg.duration}
            </p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                  ৳{pkg.price}
                </span>
                {pkg.originalPrice && (
                  <span className={`text-lg line-through ${isPopular ? 'text-gray-300' : 'text-gray-400'}`}>
                    ৳{pkg.originalPrice}
                  </span>
                )}
                {pkg.discount && (
                  <span className={`${isPopular 
                    ? 'bg-yellow-400 text-indigo-900' 
                    : 'bg-green-100 text-green-800'
                  } px-2 py-1 rounded text-sm font-bold`}>
                    {pkg.discount}
                  </span>
                )}
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {(pkg.features || []).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className={`w-5 h-5 ${isPopular ? 'text-yellow-300' : 'text-green-500'}`} />
                  <span className={isPopular ? 'text-gray-100' : 'text-gray-700'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            
            <Link 
              to={pkg.button_link || "/contact"} 
              className={`block w-full py-3 rounded-full font-bold text-center transition ${
                isPopular
                  ? 'bg-white text-indigo-600 hover:bg-gray-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
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

{/* ==================== TECHNOLOGIES ==================== */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">আমরা যে টেকনোলজিতে কাজ করি</h2>
      <p className="text-lg text-gray-600">সব ধরনের প্ল্যাটফর্ম এবং টেকনোলজির ইস্যু ফিক্স করি</p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {technologiesFromBackend.map((tech, index) => {
        // Different gradient colors for each technology
        const gradients = [
          'from-blue-500 to-indigo-600',
          'from-cyan-400 to-blue-500',
          'from-purple-500 to-indigo-600',
          'from-yellow-400 to-orange-500',
          'from-pink-500 to-rose-500',
          'from-green-500 to-teal-600',
        ];
        
        const gradientClass = gradients[index % gradients.length];
        const IconComponent = tech.icon;
        
        return (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center text-white mb-6`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{tech.name}</h3>
            <ul className="space-y-2">
              {tech.problems.map((problem, pIdx) => (
                <li key={pIdx} className="flex items-center gap-2 text-gray-600">
                  <div className={`w-2 h-2 ${index === 0 ? 'bg-indigo-500' : 
                    index === 1 ? 'bg-cyan-500' : 
                    index === 2 ? 'bg-purple-500' : 
                    index === 3 ? 'bg-yellow-500' : 
                    index === 4 ? 'bg-pink-500' : 'bg-green-500'} rounded-full`}></div>
                  {problem}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{safeCta.title}</h2>
            <p className="text-xl mb-8 text-gray-100">{safeCta.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                {safeCta.ctaPrimary}
              </Link>
              <a
                href="tel:+880XXXXXXXXXX"
                className="border-2 border-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 text-sm sm:text-base"
              >
                {safeCta.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IssueFixing;