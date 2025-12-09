// src/pages/client/ChatbotSetup.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, Palette } from 'lucide-react';
import ChatbotSVG from "../../assets/heroSVG/ChatbotSVG.jsx";
import chatbotService from "../../services/chatbotService.js";

// Import icons from IconLibrary
import {
  Requirement2Icon,
  ChatbotdesignIcon,
  ChatbotSetupIcon,
  LivetestingIcon,
} from "../../components/admin/IconLibrary.jsx";

const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

// Icon component for rendering icons by name
const Icon = ({ name, className }) => {
  const icons = {
    facebook: '📘',
    whatsapp: '💬',
    website: '🌐',
    telegram: '✈️',
    rules: '📋',
    learning: '📚',
    customized: '⚙️',
    responsive: '📱',
    messenger: '💬',
    instagram: '📸',
    line: '📱',
    custom: '⚙️',
    faq: '❓',
    lead: '🎯',
    booking: '📅',
    ecommerce: '🛒',
    support: '🎧',
    design: '🎨',
    step: '➡️',
    feature: '⚡',
    config: '⚙️',
  };
  
  return <span className={`inline-block ${className}`}>{icons[name] || '⭕'}</span>;
};

const ChatbotSetup = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await chatbotService.getPageData();
        
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError('Failed to load data');
          // Load default data structure
          setData({
            hero: {},
            features: [],
            platforms: [],
            chatbotTypes: [],
            setupSteps: [],
            chatbotFeatures: [],
            designShowcase: [],
            packages: [],
            cta: {}
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Network error. Please try again.');
        // Load default data structure
        setData({
          hero: {},
          features: [],
          platforms: [],
          chatbotTypes: [],
          setupSteps: [],
          chatbotFeatures: [],
          designShowcase: [],
          packages: [],
          cta: {}
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map icon names to components for setup steps
  const getIconComponent = (iconName) => {
    const iconMap = {
      'Requirement2Icon': Requirement2Icon,
      'ChatbotdesignIcon': ChatbotdesignIcon,
      'ChatbotSetupIcon': ChatbotSetupIcon,
      'LivetestingIcon': LivetestingIcon,
    };
    
    return iconMap[iconName] || Requirement2Icon;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Safely access data with fallbacks
  const safeData = data || {};
  const hero = safeData.hero || {};
  const features = safeData.features || [];
  const platforms = safeData.platforms || [];
  const chatbotTypes = safeData.chatbotTypes || [];
  const setupSteps = safeData.setupSteps || [];
  const chatbotFeatures = safeData.chatbotFeatures || [];
  const designShowcase = safeData.designShowcase || [];
  const packages = safeData.packages || [];
  const cta = safeData.cta || {};

  // Create setup steps with icons
  const displaySetupSteps = setupSteps.map(step => ({
    Icon: getIconComponent(step.icon_name || 'Requirement2Icon'),
    step: step.step || '',
    title: step.title || '',
    description: step.description || ''
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 h-[80vh] mt-12 overflow-hidden">
        <div className="container mx-auto px-10 max-w-7xl flex flex-col lg:flex-row justify-between items-center h-full">
          <div className="z-10 flex-1 text-center lg:text-left max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {hero.title || 'চ্যাটবট সেটআপ সার্ভিস'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 text-blue-100 font-light"
            >
              {hero.description || 'আপনার ব্যবসার জন্য ২৪/৭ স্মার্ট AI চ্যাটবট — কোনো মানুষের দরকার নেই!'}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {hero.ctaPrimary || 'এখনই শুরু করুন'}
              </Link>
              <button className="border-2 border-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                {hero.ctaSecondary || 'বিস্তারিত জানুন'}
              </button>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <ChatbotSVG />
          </div>
        </div>

        {/* Wave Design */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-32 md:h-40 lg:h-48 block">
            <defs>
              <linearGradient id="bluePurpleWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="40%" stopColor="#4f46e5" />
                <stop offset="70%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            <path
              d="M0 108L20 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="url(#bluePurpleWave)"
            />
          </svg>
        </div>
      </section>

      {/* SETUP PROCESS SECTION */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                সেটআপ প্রক্রিয়া
              </span>
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              মাত্র ৪টি ধাপে আপনার ব্যবসার জন্য স্মার্ট AI চ্যাটবট চালু!
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-12 xl:gap-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displaySetupSteps.map((item, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="flex flex-col items-center text-center flex-1 max-w-xs lg:max-w-sm"
                  variants={fadeIn}
                >
                  <item.Icon className="w-18 h-18 mb-5 lg:w-28 lg:h-28 text-purple-600 drop-shadow-lg" />
                  <span className="text-sm lg:text-base font-bold text-blue-600 tracking-wider mb-3 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">
                    {item.description}
                  </p>
                </motion.div>

                {index < displaySetupSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-full lg:mt-10">
                    <ChevronRight className="w-9 h-9 lg:w-14 lg:h-14 text-purple-400/60" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Mobile arrows */}
          <div className="flex justify-center gap-8 mt-12 md:hidden">
            <ChevronRight className="w-10 h-10 text-purple-400/60" />
            <ChevronRight className="w-10 h-10 text-purple-400/60" />
            <ChevronRight className="w-10 h-10 text-purple-400/60" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      {features.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">আমাদের বিশেষ ফিচারসমূহ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <Icon name={feature.icon} className="text-4xl mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PLATFORMS SECTION */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6">সব প্রধান প্ল্যাটফর্ম সাপোর্ট</h2>
          <p className="text-center text-gray-600 mb-12 md:mb-16 text-base sm:text-lg md:text-xl">যেকোনো প্ল্যাটফর্মে আপনার চ্যাটবট সেটআপ করুন</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-full mx-auto">
            {platforms.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`p-6 sm:p-8 rounded-2xl cursor-pointer border-4 transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                  selectedPlatform === p.id ? 'border-blue-500 shadow-2xl bg-blue-50' : 'border-transparent shadow-lg bg-white'
                }`}
              >
                <div className="text-center flex flex-col items-center">
                  <Icon name={p.icon} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 text-blue-600 text-4xl sm:text-5xl" />
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 text-gray-900">{p.name}</h3>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 w-full">
                    {(p.features || []).map((f, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHATBOT TYPES SECTION */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6">আপনার প্রয়োজন অনুযায়ী চ্যাটবট টাইপ</h2>
          <p className="text-center text-gray-600 mb-12 md:mb-16 text-base sm:text-lg md:text-xl">আপনার ব্যবসার জন্য সঠিক চ্যাটবট বেছে নিন</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-full mx-auto">
            {chatbotTypes.map((t, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl cursor-pointer border-4 border-transparent shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-300 hover:-translate-y-2 hover:shadow-2xl transition-all duration-200 flex flex-col">
                <div className="text-center flex flex-col items-center">
                  <Icon name={t.icon} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 text-blue-600 text-4xl sm:text-5xl" />
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-900">{t.type}</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">{t.description}</p>
                  <span className="text-xs sm:text-sm bg-blue-500 text-white px-3 py-1.5 rounded-full font-semibold">{t.useCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHATBOT FEATURES BREAKDOWN */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">চ্যাটবট ফিচার ব্রেকডাউন</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {chatbotFeatures.map((c, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-center sm:text-left">{c.category}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {(c.items || []).map((item, j) => (
                    <li key={j} className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm md:text-base">
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN SHOWCASE */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">UI ডিজাইন ফিচার</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {designShowcase.map((d, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-md text-center">
                <Palette className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 text-blue-600" />
                <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1">{d.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">সেটআপ প্যাকেজ</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm sm:text-base">আপনার বাজেট অনুযায়ী প্যাকেজ বেছে নিন</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-xl md:rounded-2xl overflow-hidden ${
                  pkg.popular ? 'ring-4 ring-blue-500 transform scale-105 shadow-2xl' : 'shadow-xl'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 font-semibold text-xs sm:text-sm">
                    জনপ্রিয়
                  </div>
                )}
                <div className="bg-white p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <div className="text-center mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">৳{pkg.price}</span>
                    <div className="text-xs sm:text-sm text-gray-500">/{pkg.duration}</div>
                  </div>
                  <ul className="space-y-2 mb-5 md:mb-8 text-xs sm:text-sm md:text-base text-center sm:text-left">
                    {(pkg.features || []).map((f, j) => (
                      <li key={j} className="flex items-center justify-center sm:justify-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Order button */}
                  <div className={`block text-center py-2.5 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}>
                    {pkg.orderLink ? (
                      <a 
                        href={pkg.orderLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        এখনই অর্ডার করুন
                      </a>
                    ) : (
                      <Link 
                        to="/contact" 
                        className="block w-full h-full"
                      >
                        এখনই অর্ডার করুন
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6">{cta.title || 'আপনার ব্যবসায় চ্যাটবট যুক্ত করুন'}</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto">
            {cta.description || 'আজই শুরু করুন এবং ২৪/৭ কাস্টমার সাপোর্ট পান'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
              {cta.ctaPrimary || 'আজই যোগাযোগ করুন'}
            </Link>
            <button className="border-2 border-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              {cta.ctaSecondary || 'আরও জানুন'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatbotSetup;