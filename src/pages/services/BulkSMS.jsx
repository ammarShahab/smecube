import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingCart, Bell, Lock, Gift, AlertCircle, Calendar } from 'lucide-react';
import { bulkSmsService } from '../../services/bulkSmsService';

// IconLibrary থেকে আইকন ইম্পোর্ট
import {
  AccountcreateIcon,
  MessagesendIcon,
  ReportdeliveryIcon,
  SmscreditIcon,
} from "../../components/admin/IconLibrary";

const BulkSMS = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await bulkSmsService.getPageData();
      setPageData(res);
    } catch (err) {
      setError('ডাটা লোড করতে সমস্যা। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ children, className = '' }) => (
    <div className={`px-[15%] ${className}`}>{children}</div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error || 'Data not available'}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  const { hero, stats, features, useCases, processSteps, packages, cta } = pageData;

  // অ্যানিমেশন ভেরিয়েবল
  const fadeIn = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };

  // Icon mapping for process steps
  const iconMap = {
    'AccountcreateIcon': AccountcreateIcon,
    'SmscreditIcon': SmscreditIcon,
    'MessagesendIcon': MessagesendIcon,
    'ReportdeliveryIcon': ReportdeliveryIcon,
  };

  // Transform processSteps to add Icon components from backend data
  const displayProcessSteps = (processSteps || []).map((step) => ({
    ...step,
    Icon: iconMap[step.icon_name] || AccountcreateIcon,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
{/* HERO – টেক্সট + ইমেজ দুটোই ১৫% মার্জিনে, ফন্ট ছোট ও ক্লিন */}
{hero && (
  <div className="h-[80vh] min-h-[600px] flex items-center justify-center bg-gradient-to-r from-green-700 via-green-600 to-teal-700 text-white overflow-hidden relative">
    {/* Background Blobs */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500 opacity-5 rounded-full blur-3xl"></div>
    </div>

    {/* Bottom Wave */}
    <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,50 Q360,15 720,50 T1440,50 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.12)" />
    </svg>

    <div className="w-full h-full flex items-center relative z-10 px-6 lg:px-0">
      {/* Left Text – ১৫% লেফট মার্জিন + ছোট ফন্ট */}
      <div className="pl-[15%] max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-50 to-cyan-100">
              {hero.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-green-50 leading-relaxed font-light opacity-95 max-w-xl">
            {hero.description}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 group"
          >
            {hero.cta_text}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Right Illustration – ১৫% রাইট মার্জিন */}
      <div className="flex-1 flex justify-end pr-[15%]">
        <motion.div
          className="relative w-[480px] h-[480px] lg:w-[540px] lg:h-[540px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl w-full h-full">

            {/* MAIN CENTRAL PHONE */}
            <g className="animate-float">
              <rect x="180" y="90" width="180" height="360" rx="36" fill="white" fillOpacity="0.96" stroke="#10b981" strokeWidth="5"/>
              <rect x="195" y="125" width="150" height="300" rx="20" fill="#f8fff8"/>
              <g transform="translate(205,140)">
                <rect x="10" y="15" width="125" height="50" rx="20" fill="#10b981"/>
                <text x="72" y="38" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">আজকের স্পেশাল অফার!</text>
                <text x="72" y="55" textAnchor="middle" fill="#ecfdf5" fontSize="10">৳999 এ ১০,০০০ SMS</text>
                <rect x="15" y="80" width="105" height="40" rx="18" fill="#f3f4f6"/>
                <text x="67" y="102" textAnchor="middle" fill="#374151" fontSize="11">ধন্যবাদ! নিবো</text>
              </g>
            </g>

            {/* বাকি এলিমেন্টগুলো (অক্ষত) */}
            <g className="animate-float-delay-3">
              <rect x="40" y="180" width="110" height="60" rx="24" fill="white" fillOpacity="0.95" stroke="#e2e8f0" strokeWidth="3"/>
              <text x="95" y="210" textAnchor="middle" fill="#374151" fontSize="14" fontWeight="600">ঠিক আছে</text>
            </g>

            <g className="animate-float-delay-4">
              <rect x="60" y="320" width="100" height="55" rx="22" fill="#22c55e" stroke="white" strokeWidth="3"/>
              <text x="110" y="350" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">ধন্যবাদ!</text>
            </g>

            <g className="animate-float-delay-1">
              <rect x="360" y="70" width="150" height="100" rx="32" fill="white" fillOpacity="0.98" stroke="#10b981" strokeWidth="4"/>
              <text x="435" y="115" textAnchor="middle" fill="#166534" fontSize="15" fontWeight="bold">বিশেষ প্যাকেজ</text>
              <text x="435" y="145" textAnchor="middle" fill="#15803d" fontSize="20" fontWeight="bold">৳2,999</text>
            </g>

            <g className="animate-float-delay-2">
              <rect x="375" y="200" width="140" height="90" rx="30" fill="#4f46e5" stroke="white" strokeWidth="3"/>
              <text x="445" y="240" textAnchor="middle" fill="white" fontSize="19" fontWeight="bold">729481</text>
              <text x="445" y="265" textAnchor="middle" fill="#e0e7ff" fontSize="11">Your OTP Code</text>
            </g>

            <g className="animate-float-delay-1">
              <rect x="380" y="340" width="95" height="145" rx="22" fill="white" fillOpacity="0.95" stroke="#10b981" strokeWidth="3"/>
              <rect x="392" y="370" width="71" height="90" rx="12" fill="#f0fdf4"/>
              <rect x="400" y="390" width="55" height="35" rx="16" fill="#22c55e"/>
              <text x="427" y="412" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sent</text>
            </g>

            <circle cx="140" cy="240" r="8" fill="#10b981" className="animate-ping"/>
            <circle cx="400" cy="300" r="7" fill="#8b5cf6" className="animate-ping" style={{animationDelay: '0.6s'}}/>
            <g opacity="0.25">
              <circle cx="270" cy="270" r="80" stroke="#10b981" strokeWidth="5" fill="none"/>
              <circle cx="270" cy="270" r="120" stroke="#10b981" strokeWidth="4" fill="none" opacity="0.6"/>
            </g>

          </svg>
        </motion.div>
      </div>
    </div>

    {/* Floating Animation */}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      .animate-float { animation: float 7s ease-in-out infinite; }
      .animate-float-delay-1 { animation: float 8s ease-in-out infinite 0.5s; }
      .animate-float-delay-2 { animation: float 7.5s ease-in-out infinite 1.2s; }
      .animate-float-delay-3 { animation: float 6.8s ease-in-out infinite 1.8s; }
      .animate-float-delay-4 { animation: float 9s ease-in-out infinite 2.4s; }
    `}</style>
  </div>
)}

      {/* STATS */}
      <Section className="py-16 bg-white">
        {stats?.length > 0 && (
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.id}>
                <div className="text-6xl md:text-7xl font-bold text-green-600 mb-2">{s.number}</div>
                <div className="text-lg md:text-xl text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* FEATURES */}
      <Section className="py-16 bg-gray-50">
        {features?.length > 0 && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">শক্তিশালী ফিচার সমূহ</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                আমাদের SMS সিস্টেমের অসাধারণ সব বৈশিষ্ট্য জানুন
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">{f.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* USE CASES */}
      <Section className="py-16 bg-white">
        {useCases?.length > 0 && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">কোথায় ব্যবহার করবেন?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                আমাদের SMS সেবা ব্যবহারের বিভিন্ন উপায়
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((u) => {
                // Icon mapping for use cases
                const iconMap = {
                  '🛒': ShoppingCart,
                  '📢': Bell,
                  '🗳️': Lock,
                  '🎉': Gift,
                  '🏦': AlertCircle,
                  '🏥': Calendar,
                };
                const IconComponent = iconMap[u.icon] || ShoppingCart;
                
                return (
                  <motion.div
                    key={u.id}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{u.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{u.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </Section>

      {/* নতুন প্রসেস স্টেপস সেকশন – এটাই চেঞ্জ করা হয়েছে */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            className="text-center mb-16 lg:mb-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                কীভাবে কাজ করে?
              </span>
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              মাত্র ৪টি ধাপে আপনার ব্যবসার জন্য শক্তিশালী SMS মার্কেটিং শুরু করুন
            </p>
          </motion.div>

          {/* Horizontal 4-Step Flow */}
          <motion.div
            className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-12 xl:gap-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displayProcessSteps.map((item, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="flex flex-col items-center text-center flex-1 max-w-xs lg:max-w-sm"
                  variants={fadeIn}
                >
                  {/* SVG Icon from IconLibrary */}
                  <item.Icon className="w-18 h-18 mb-5 lg:w-28 lg:h-28 text-green-600 drop-shadow-lg" />

                  <span className="text-sm lg:text-base font-bold text-green-600 tracking-wider mb-3 block">
                    {item.step}
                  </span>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">
                    {item.description}
                  </p>
                </motion.div>

                {/* Arrow between steps */}
                {index < displayProcessSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-full">
                    <ChevronRight className="w-9 h-9 lg:w-14 lg:h-14 text-green-400/60" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-8 mt-12 md:hidden">
            <ChevronRight className="w-9 h-9 text-green-400/60" />
            <ChevronRight className="w-9 h-9 text-green-400/60" />
            <ChevronRight className="w-9 h-9 text-green-400/60" />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <Section className="py-16 bg-white">
        {packages?.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center mb-4">সাশ্রয়ী মূল্যে SMS প্যাকেজ</h2>
            <p className="text-center text-gray-600 mb-12">
              কোনো লুকানো খরচ নেই - শুধু আপনার প্রয়োজন অনুযায়ী কিনুন
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-lg p-8 transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-green-600 to-teal-600 text-white shadow-2xl scale-105'
                      : 'bg-gray-50 shadow-md'
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-yellow-400 text-green-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                      বেস্ট ভ্যালু
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">৳{pkg.price}</span>
                  </div>
                  <div
                    className={`mb-6 text-sm ${
                      pkg.popular ? 'text-green-200' : 'text-gray-600'
                    }`}
                  >
                    {pkg.sms_count} SMS
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features?.map((f, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">Check</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  

                <button
                  onClick={() => {
                    if (pkg.button_link) {
                      // Open external link in new tab
                      window.open(pkg.button_link, '_blank', 'noopener,noreferrer');
                    } else {
                      // Navigate to contact page for packages without direct link
                      window.location.href = '/contact';
                    }
                  }}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                    pkg.popular
                      ? 'bg-white text-green-600 hover:bg-gray-100'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {pkg.button_link ? 'এখনই কিনুন' : 'যোগাযোগ করুন'}
                </button>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* FINAL CTA */}
      {cta && (
        <div className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
            <p className="text-xl mb-8 text-green-100">{cta.description}</p>
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              {cta.button_text}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkSMS;