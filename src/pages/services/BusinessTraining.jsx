import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import businessTrainingService from "../../services/businessTrainingService";
import IconLibrary from "../../components/admin/IconLibrary";
import {
  GraduationCap, TrendingUp, Briefcase, Users, Globe, Award,
  DollarSign, CreditCard, CheckCircle, Star, ChevronRight
} from "lucide-react";
import BusinessTrainSVG from "../../assets/heroSVG/BusinessTrainSVG";
import {
  CustomTrainingIcon,
  FreeConsultationIcon,
  LiveSessionPracticeIcon,
  ResultCertificateIcon,
  ExpertMentorIcon,
  CertificationIcon,
  BusinessGrowthIcon,
  PracticalTrainingIcon,
} from "../../components/servicesPage/businessTraining/Icons";

// Icon mapping
const ICONS = {
  GraduationCap, TrendingUp, Briefcase, Users, Globe, Award,
  DollarSign, CreditCard, CheckCircle, Star
};

const featureIconMap = {
  // Hardcoded SVG icons
  'ExpertMentorIcon': ExpertMentorIcon,
  'CertificationIcon': CertificationIcon,
  'BusinessGrowthIcon': BusinessGrowthIcon,
  'PracticalTrainingIcon': PracticalTrainingIcon,
  
  // Lucide icons (for backward compatibility)
  'GraduationCap': GraduationCap,
  'TrendingUp': TrendingUp,
  'Briefcase': Briefcase,
  'Users': Users,
  'Globe': Globe,
  'Award': Award,
  'DollarSign': DollarSign,
  'CreditCard': CreditCard,
  'CheckCircle': CheckCircle,
  'Star': Star,
};
// Steps Icon Mapping
const stepsIconMap = {
  FreeConsultationIcon: FreeConsultationIcon,
  CustomTrainingIcon: CustomTrainingIcon,
  LiveSessionPracticeIcon: LiveSessionPracticeIcon,
  ResultCertificateIcon: ResultCertificateIcon,
};

const BusinessTraining = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    businessTrainingService
      .getPageData()
      .then((res) => {
        // Transform process data to include Icon components
        const transformedData = {
          ...res.data,
          process: res.data.process
            ? res.data.process.map((step, index) => ({
                ...step,
                Icon: stepsIconMap[step.icon_name] || FreeConsultationIcon, // Fallback to FreeConsultationIcon
              }))
            : [],
        };

        setData(transformedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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

  // Safe data access with fallbacks
  const {
    hero = {},
    stats = [],
    features = [],
    process = [], // Now this will come from transformed data
    packages = [],
    cta = {}
  } = data;

  // Default fallback data
  const defaultHero = {
    title: 'বিজনেস ট্রেনিং প্রোগ্রাম',
    description: 'আপনার উদ্যোক্তা যাত্রা শুরু করুন বাস্তবভিত্তিক বিজনেস ট্রেনিংয়ের মাধ্যমে।',
    ctaPrimary: 'এখনই রেজিস্ট্রেশন করুন'
  };

  const defaultCta = {
    title: 'আপনার ব্যবসার পরবর্তী ধাপ এখান থেকেই শুরু করুন!',
    description: 'অভিজ্ঞ মেন্টরের সহায়তায় আজই নিজের ব্যবসাকে আরও শক্তিশালী করুন।',
    ctaPrimary: 'ফ্রী কন্সাল্টেশন বুক করুন'
  };

  // Fallback process if API returns empty
  const fallbackProcess = [
    {
      Icon: FreeConsultationIcon,
      step: "স্টেপ ১",
      title: "ফ্রি কনসালটেশন",
      description:
        "আপনার ব্যবসার বর্তমান অবস্থা, চ্যালেঞ্জ ও লক্ষ্য বিস্তারিত জানি",
    },
    {
      Icon: CustomTrainingIcon,
      step: "স্টেপ ২",
      title: "কাস্টম ট্রেনিং প্ল্যান",
      description:
        "আপনার ব্যবসার জন্য ১০০% ব্যক্তিগতকৃত ট্রেনিং মডিউল তৈরি করি",
    },
    {
      Icon: LiveSessionPracticeIcon,
      step: "স্টেপ ৩",
      title: "লাইভ সেশন ও প্র্যাকটিস",
      description:
        "জুম/গুগল মিটে লাইভ ক্লাস + রিয়েল প্রজেক্টে হ্যান্ডস-অন প্র্যাকটিস",
    },
    {
      Icon: ResultCertificateIcon,
      step: "স্টেপ ৪",
      title: "রেজাল্ট ও সার্টিফিকেট",
      description: "দেখতে পাবেন রিয়েল গ্রোথ + সার্টিফিকেট + লাইফটাইম সাপোর্ট",
    },
  ];

  const safeHero = { ...defaultHero, ...hero };
  const safeCta = { ...defaultCta, ...cta };

  // Use dynamic process or fallback
  const displayProcess = process && process.length > 0 ? process : fallbackProcess;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white py-28 overflow-hidden h-[80vh] flex flex-col justify-center items-center mt-12">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left z-10">
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-2xl leading-tight"
              >
                {safeHero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-xl md:text-2xl mb-10 text-cyan-100 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                {safeHero.description}
              </motion.p>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center lg:justify-start"
              >
                <Link
                  to="/contact"
                  className="bg-white text-indigo-700 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-indigo-50 hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  {safeHero.ctaPrimary} →
                </Link>
              </motion.div>
            </div>

            {/* Right: Placeholder for your SVG */}
            <motion.div
              className="flex-1 z-10 justify-between"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <BusinessTrainSVG />
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-32 md:h-40 lg:h-48 block"
          >
            <defs>
              <linearGradient id="oceanWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="35%" stopColor="#3b82f6" />
                <stop offset="65%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <path
              d="M0 108L20 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="url(#oceanWaveGradient)"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* Process Section - Newly Added */}
      <section className="py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                কীভাবে কাজ করে?
              </span>
            </h2>
            <p className="mt-4 text-base lg:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
              ৪টি শক্তিশালী ধাপে আপনার ব্যবসাকে পরবর্তী লেভেলে নিয়ে যাই
            </p>
          </motion.div>

          {/* Horizontal 4-Step Flow */}
          <motion.div
            className="flex flex-col md:flex-row items-start justify-between gap-4 lg:gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displayProcess.map((item, index) => {
              // Map different icons for each step
              const iconComponents = [
                FreeConsultationIcon,
                CustomTrainingIcon,
                LiveSessionPracticeIcon,
                ResultCertificateIcon,
              ];
              const IconComponent = iconComponents[index] || FreeConsultationIcon;

              return (
                <React.Fragment key={index}>
                  <motion.div
                    className="flex flex-col items-center text-center flex-1"
                    variants={fadeIn}
                  >
                    <IconComponent className="w-16 h-16 mb-3 text-orange-600" />

                    <span className="text-xs lg:text-sm font-bold text-blue-600 tracking-wider mb-2 block">
                      {item.step}
                    </span>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs lg:text-sm text-gray-600 leading-relaxed px-1">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Arrow */}
                  {index < displayProcess.length - 1 && (
                    <div className="hidden md:flex items-center justify-center h-full flex-shrink-0">
                      <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-sky-400/70" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <ChevronRight className="w-6 h-6 text-sky-400/70" />
            <ChevronRight className="w-6 h-6 text-sky-400/70" />
            <ChevronRight className="w-6 h-6 text-sky-400/70" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-[15%]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base font-medium text-gray-700">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

     {features.length > 0 && (
  <section className="py-20 bg-gray-50">
    <div className="mx-[15%]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">বিশেষ সুবিধা</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-hind">
          কেন আমরাই আপনার ব্যবসা প্রশিক্ষণের জন্য সেরা পছন্দ?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => {
          const iconName = feature.icon_name || feature.icon || '';
          
          // Function to render icon based on type
          const renderIcon = () => {
            if (!iconName) {
              // Default fallback icons
              const defaultIcons = [
                ExpertMentorIcon,
                CertificationIcon,
                BusinessGrowthIcon,
                PracticalTrainingIcon,
              ];
              const DefaultIcon = defaultIcons[idx] || ExpertMentorIcon;
              return <DefaultIcon className="w-10 h-10 text-blue-600" />;
            }
            
            // Check if it's a hardcoded SVG icon
            if (featureIconMap[iconName]) {
              const IconComponent = featureIconMap[iconName];
              return <IconComponent className="w-10 h-10 text-blue-600" />;
            }
            
            // Otherwise use IconLibrary
            return <IconLibrary name={iconName} size={40} className="text-blue-600" />;
          };
          
          return (
            <motion.div
              key={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                {renderIcon()}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title || `ফিচার ${idx + 1}`}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-hind whitespace-pre-line">
                {feature.description || "বিস্তারিত বিবরণ"}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
)}

      {/* PRICING SECTION */}
      {packages && packages.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-[15%]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">ট্রেনিং প্যাকেজসমূহ</h2>
              <p className="text-lg text-gray-600">আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজ নির্বাচন করুন</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className={`rounded-2xl p-8 transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white transform scale-105 shadow-2xl"
                      : "bg-white border-2 border-gray-200 shadow-lg"
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-yellow-400 text-indigo-900 px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                      প্রস্তাবিত
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-white" : "text-gray-800"}`}>
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">৳{pkg.price}</span>
                    <span className={pkg.popular ? "text-gray-200" : "text-gray-600"}>
                      /{pkg.duration}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {(pkg.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <svg className={`w-5 h-5 ${pkg.popular ? "text-yellow-300" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={pkg.popular ? "text-gray-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-full font-bold transition ${
                      pkg.popular
                        ? "bg-white text-indigo-600 hover:bg-gray-100"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    এখনই রেজিস্ট্রেশন করুন
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 mx-[15%]">
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-3xl p-12 text-center shadow-2xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {safeCta.title}
          </h3>
          <p className="text-purple-100 text-xl mb-8 max-w-2xl mx-auto">
            {safeCta.description}
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {safeCta.ctaPrimary}
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default BusinessTraining;