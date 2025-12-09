import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";
import { ChevronRight, Target, Zap, Smartphone, Search, Palette, BarChart3, Clapperboard, CheckSquare2, Star, MessageSquare, FileText, Link as LinkIcon } from "lucide-react";
import {
  CustomDesignIcon,
  DevelopmentOptIcon,
  LaunchIcon,
  RequirementIcon,
} from "../../components/servicesPage/landingPage/Icons";
import { landingPageService } from "../../services/landingPageServices";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);

  const processStepIconMap = {
    RequirementIcon: RequirementIcon,
    CustomDesignIcon: CustomDesignIcon,
    DevelopmentOptIcon: DevelopmentOptIcon,
    LaunchIcon: LaunchIcon,
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      // Single API call instead of 7 separate calls!
      const response = await axios.get(`${API_URL}/landing-page/page-data`);
      // const response = await landingPageService.getPageData();
      console.log(response.data);


      if (response.data.success) {
        const data = response.data.data;


        // Transform processSteps data to include Icon components
        const transformedData = {
          ...data,
          processSteps: data.processSteps
            ? data.processSteps.map((step, index) => ({
                ...step,
                Icon: processStepIconMap[step.icon_name] || RequirementIcon, // Fallback to RequirementIcon
              }))
            : [],
        };


        setPageData(transformedData);
      }
    } catch (err) {
      console.error("Error fetching page data:", err);
      setError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={fetchPageData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  const { hero, features, elements, processSteps, useCases, packages, cta } = pageData;

  return (
    <div className="min-h-screen bg-gray-50">
 {/* HERO SECTION – 100% FINAL & PERFECT LANDING PAGE HERO */}
{hero && (
  <div className="h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden relative">
    {/* Blobs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    
    <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,50 Q360,20 720,50 T1440,50 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.1)" />
    </svg>

    <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">

      {/* Left Text */}
      <motion.div 
        className="flex-1 max-w-xl translate-y-4"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed max-w-2xl">
          {hero.description}
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-700 px-9 py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-gray-100 transition shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 inline-flex items-center gap-3"
        >
          {hero.cta_text}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>

      {/* Right Illustration – 5px MORE right + 18px down */}
      <motion.div
        className="flex-1 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* 9px right (4 + 5) + 8px down */}
        <div className="translate-x-9 translate-y-8">
          <svg width="460" height="500" viewBox="0 0 460 500" className="w-80 md:w-96 lg:w-[460px] drop-shadow-2xl">

            {/* Marketer */}
            <g transform="translate(-10, 155)">
              <circle cx="70" cy="50" r="32" fill="#fbbf24"/>
              <circle cx="70" cy="50" r="28" fill="#fcd34d"/>
              <path d="M48 32 Q70 15 92 32" fill="#7c2d12" stroke="#451a03" strokeWidth="3"/>
              <circle cx="58" cy="47" r="10" fill="none" stroke="#1e293b" strokeWidth="4"/>
              <circle cx="82" cy="47" r="10" fill="none" stroke="#1e293b" strokeWidth="4"/>
              <line x1="68" y1="47" x2="72" y2="47" stroke="#1e293b" strokeWidth="4"/>
              <rect x="40" y="80" width="60" height="90" rx="20" fill="#1e40af"/>
              <rect x="40" y="80" width="60" height="30" rx="20" fill="#3b82f6"/>
              <path d="M35 110 L10 150 L25 165" stroke="#fcd34d" strokeWidth="24" strokeLinecap="round"/>
              <path d="M105 105 L130 135 L115 155" stroke="#fcd34d" strokeWidth="20" strokeLinecap="round"/>
              <circle cx="25" cy="165" r="15" fill="#fbbf24"/>
              <circle cx="115" cy="155" r="14" fill="#fbbf24"/>
              <rect x="30" y="135" width="80" height="60" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="3"/>
              <rect x="36" y="142" width="68" height="48" rx="6" fill="#10b981">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
              </rect>
              <text x="70" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">98 percent up</text>
            </g>

            {/* Main Cone Funnel */}
            <g transform="translate(160, 73)">
              <rect x="20" y="20" width="220" height="62" rx="12" fill="#6366f1" opacity="0.8" stroke="#a5b4fc" strokeWidth="4"/>
              <text x="130" y="58" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" opacity="0.95">Traffic in</text>
              <path d="M50,92 L240,92 L210,152 L80,152 Z" fill="#8b5cf6" opacity="0.9" stroke="#ddd6fe" strokeWidth="4"/>
              <rect x="80" y="162" width="140" height="58" rx="10" fill="#10b981" opacity="0.85" stroke="#86efac" strokeWidth="4"/>
              <text x="150" y="195" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Leads</text>
              <rect x="105" y="235" width="90" height="48" rx="14" fill="#f59e0b" opacity="0.95" stroke="#fbbf24" strokeWidth="4"/>
              <text x="150" y="262" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">SALE!</text>
              <motion.path d="M150,80 L150,145 L150,215 L150,245" stroke="#fff" strokeWidth="8" fill="none"
                strokeDasharray="14,14"
                animate={{ strokeDashoffset: [0, -28] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </g>

            {/* Shield & Checkmark – 8px more right, perfectly between marketer & funnel */}
            <g transform="translate(118, 340)">
              <circle cx="0" cy="0" r="15" fill="#3b82f6"/>
              <text x="0" y="5" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Shield</text>
            </g>
            <g transform="translate(153, 340)">
              <circle cx="0" cy="0" r="15" fill="#10b981"/>
              <text x="0" y="5" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Checkmark</text>
            </g>

            {/* Floating Elements (also shifted right by 5px) */}
            <motion.g animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <rect x="325" y="150" width="100" height="40" rx="20" fill="#f97316"/>
              <text x="375" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Get Started</text>
            </motion.g>

            <motion.path d="M305,290 Q345,270 385,290 L375,320 L345,300 L315,320 Z" fill="#fff" opacity="0.15"
              animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}/>
            <text x="345" y="300" textAnchor="middle" fill="white" fontSize="10" opacity="0.8">“Best ROI ever!”</text>

            <motion.rect x="285" y="60" width="80" height="35" rx="10" fill="#dc2626" opacity="0.9"
              animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}/>
            <text x="325" y="83" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">02:34:17</text>

            <motion.g animate={{ rotate: [0, 20, 0], y: [-10, 10, -10] }} transition={{ duration: 7, repeat: Infinity }}>
              <rect x="335" y="110" width="80" height="40" rx="6" fill="#16a34a"/>
              <rect x="342" y="116" width="66" height="28" rx="4" fill="#22c55e"/>
              <circle cx="375" cy="130" r="14" fill="#15803d"/>
              <text x="375" y="137" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">$100</text>
            </motion.g>

            <motion.g animate={{ y: [-15, 10, -15] }} transition={{ repeat: Infinity, duration: 5 }}>
              <path d="M55 150 L85 120 L115 160 L145 130 L175 170" stroke="#34d399" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <circle cx="175" cy="170" r="10" fill="#34d399"/>
            </motion.g>

            <motion.circle cx="365" cy="330" r="34" fill="none" stroke="#ef4444" strokeWidth="7"
              animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.8 }} />
            <circle cx="365" cy="330" r="15" fill="#ef4444"/>

            {/* Code </> – also 5px right + down */}
            <text x="68" y="125" fill="#ec4899" fontSize="76" fontWeight="bold" opacity="0.9">{'<'}</text>
            <motion.text x="107" y="190" fill="#ec4899" fontSize="76" fontWeight="bold" opacity="0.9"
              animate={{ y: [0, 16, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              {'>'}
            </motion.text>

          </svg>
        </div>
      </motion.div>
    </div>
  </div>
)}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                কেন আমাদের ল্যান্ডিং পেজ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                আমাদের ল্যান্ডিং পেজের অসাধারণ সব বৈশিষ্ট্য জানুন
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                // Icon mapping for features
                const iconMap = {
                  '🎯': Target,
                  '⚡': Zap,
                  '📱': Smartphone,
                  '🔍': Search,
                  '🎨': Palette,
                  '📊': BarChart3,
                };
                const IconComponent = iconMap[feature.icon] || Target;

                return (
                  <motion.div
                    key={feature.id}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Elements Section */}
      {elements && elements.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                প্রতিটি ল্যান্ডিং পেজে যা থাকে
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                সফল ল্যান্ডিং পেজের জন্য প্রয়োজনীয় সব উপাদান
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {elements.map((element) => {
                // Icon mapping for elements
                const iconMap = {
                  '🎬': Clapperboard,
                  '🔘': CheckSquare2,
                  '✨': Star,
                  '💬': MessageSquare,
                  '📝': FileText,
                  '🔗': LinkIcon,
                };
                const IconComponent = iconMap[element.icon] || Star;

                return (
                  <motion.div
                    key={element.id}
                    className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{element.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{element.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps && processSteps.length > 0 && (
        <section className="py-20 lg:py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 lg:mb-24"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  কীভাবে কাজ করি
                </span>
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                প্রতিটি প্রজেক্টে আমরা সতর্কতার সাথে এই ৪টি ধাপ অনুসরণ করি
              </p>
            </motion.div>

            {/* Horizontal Process Flow */}
            <motion.div
              className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-12 xl:gap-20"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0,
                  },
                },
              }}
            >
              {processSteps.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  {/* Step Item */}
                  <motion.div
                    className="flex flex-col items-center text-center flex-1 max-w-xs lg:max-w-sm"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                  >
                    {item.Icon && <item.Icon className="w-18 h-18 mb-5 lg:w-28 lg:h-28 text-orange-600" />}

                    {/* Step Label */}
                    <span className="text-sm lg:text-base font-bold text-blue-600 tracking-wider mb-3 block">
                      {item.step}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Arrow - Perfectly Centered */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center h-full">
                      <ChevronRight className="w-9 h-9 lg:w-14 lg:h-14 mt-4 lg:mt-14 text-blue-400/60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Mobile Arrow Indicators */}
            <div className="flex justify-center gap-8 mt-12 md:hidden">
              <ChevronRight className="w-9 h-9 text-blue-400/60" />
              <ChevronRight className="w-9 h-9 text-blue-400/60" />
              <ChevronRight className="w-9 h-9 text-blue-400/60" />
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {useCases && useCases.length > 0 && (
        <div className="py-16 bg-white mx-[15%]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              কোথায় ব্যবহার করবেন?
            </h2>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg flex items-center"
                >
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span className="font-semibold">{useCase.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {/* Pricing Section – Button */}
{/* Pricing Section */}
{packages && packages.length > 0 && (
  <div className="py-16 mx-[15%]">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4">
        সাশ্রয়ী মূল্যে পেশাদার ল্যান্ডিং পেজ
      </h2>
      <p className="text-center text-gray-600 mb-12">
        আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => {
          const buttonHref = pkg.button_link?.trim() || '/contact';
          const isExternal = pkg.button_link?.trim();
          const ButtonComponent = isExternal ? 'a' : Link;
          const buttonProps = isExternal
            ? { href: buttonHref, target: '_blank', rel: 'noopener noreferrer' }
            : { to: buttonHref };

          return (
            <div
              key={pkg.id}
              className={`relative rounded-lg p-8 transition-all ${
                pkg.popular
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl scale-105'
                  : 'bg-white shadow-md'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full">
                  সবচেয়ে জনপ্রিয়
                </div>
              )}

              {/* Package Name */}
              <h3 className="text-2xl font-bold text-center mb-2">{pkg.name}</h3>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">৳{pkg.price}</span>
                {pkg.duration && (
                  <span className={pkg.popular ? 'text-blue-200' : 'text-gray-600'}>
                    /{pkg.duration}
                  </span>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {(Array.isArray(pkg.features) ? pkg.features : []).map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">Checkmark</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Dynamic Button */}
              <ButtonComponent
                {...buttonProps}
                className={`block text-center py-3 rounded-lg font-semibold transition w-full ${
                  pkg.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                এখনই শুরু করুন
              </ButtonComponent>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}
      {/* CTA Section */}
      {cta && (
        <div className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {cta.title}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {cta.description}
            </p>
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              {cta.button_text}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;