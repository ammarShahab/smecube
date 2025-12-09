// src/pages/BusinessConsulting.jsx

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { businessConsultingService } from '../../services/businessConsultingService';
import BusinessConsSVG from '../../assets/heroSVG/BusinessConsSVG';
import { motion } from 'framer-motion';

import {
  DiscussionIcon,
  ThinkIcon,
  DeliveryIcon,
  SupportFollowupIcon,
  ChevronRight,
} from '../../components/servicesPage/businessCons/Icons';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const BusinessConsulting = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await businessConsultingService.getPageData();
        if (result.success) {
          const data = result.data;

          const safeParse = (value) => {
            if (Array.isArray(value)) return value;
            if (typeof value === 'string') {
              try { return JSON.parse(value); } catch (e) { return []; }
            }
            return [];
          };

          setPageData({
            hero_title: data.hero_title || '',
            hero_description: data.hero_description || '',
            services: safeParse(data.services),
            consulting_areas: safeParse(data.consulting_areas),
            packages: safeParse(data.packages),
            process: safeParse(data.process),
            testimonials: safeParse(data.testimonials),
            stats: typeof data.stats === 'string' ? JSON.parse(data.stats) : data.stats || {},
          });
        }
      } catch (error) {
        console.error("Error fetching business consulting data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-red-600">ডেটা লোড করতে সমস্যা হয়েছে</div>
      </div>
    );
  }

  const {
    hero_title,
    hero_description,
    services = [],
    consulting_areas = [],
    packages = [],
    process = [],
    testimonials = [],
    stats = {}
  } = pageData;

  const enabledServices = services.filter(s => s.enabled);
  const enabledAreas = consulting_areas.filter(a => a.enabled);
  const enabledPackages = packages.filter(p => p.enabled);
  const enabledProcess = process.filter(p => p.enabled);
  const enabledTestimonials = testimonials.filter(t => t.enabled);

  // Icon mapping for process steps
  const processIconMap = {
    'DiscussionIcon': DiscussionIcon,
    'ThinkIcon': ThinkIcon,
    'DeliveryIcon': DeliveryIcon,
    'SupportFollowupIcon': SupportFollowupIcon,
  };

  // Transform process steps to add Icon components from backend data
  const processWithIcons = (enabledProcess || []).map((step) => ({
    ...step,
    Icon: processIconMap[step.icon_name] || DiscussionIcon,
  }));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-white mt-12 h-[80vh] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{hero_title}</h1>
              <p className="text-xl mb-10 text-orange-100 max-w-3xl mx-auto md:mx-0">{hero_description}</p>
              <Link to="/contact" className="inline-block bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-50 transition shadow-xl">
                ফ্রি কনসালটেশন বুক করুন →
              </Link>
            </div>
            <div className="flex justify-center">
              <BusinessConsSVG className="w-full max-w-lg" />
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-32 md:h-48">
            <defs>
              <linearGradient id="waveGrad">
                <stop offset="0%" stopColor="#f59e0b"/>
                <stop offset="100%" stopColor="#dc2626"/>
              </linearGradient>
            </defs>
            <path fill="url(#waveGrad)" d="M0 108L20 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"/>
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      {enabledServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              আমাদের সার্ভিসসমূহ
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {enabledServices.map((service) => (
                <motion.div key={service.id} variants={fadeIn} whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition">
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps – 15% left/right margins */}
      {enabledProcess.length > 0 && (
        <section className="py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-[15%]">
            {/* Header */}
            <motion.div
              className="text-center mb-16 lg:mb-24"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  আমাদের কাজের প্রক্রিয়া
                </span>
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                সফলতার ধাপসমূহ — সহজ, দ্রুত এবং নিখুঁত
              </p>
            </motion.div>

            {/* Horizontal 4-Step Flow */}
            <motion.div
              className="flex flex-col md:flex-row items-start justify-center gap-8 lg:gap-16 xl:gap-24"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {processWithIcons.map((item, index) => (
                <React.Fragment key={item.id}>
                  <motion.div
                    className="flex flex-col items-center text-center flex-1 max-w-xs lg:max-w-sm"
                    variants={fadeIn}
                  >
                    <item.Icon className="w-12 h-12 mb-4 lg:w-32 lg:h-32 text-orange-600" />

                    {/* Step Label */}
                    <span className="text-sm lg:text-base font-bold text-orange-600 tracking-wider mb-3 block">
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
                  {index < processWithIcons.length - 1 && (
                    <div className="hidden md:flex items-center justify-center mt-8 h-full">
                      <ChevronRight className="w-10 h-10 lg:w-14 lg:h-14 text-orange-400/70" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Mobile Arrow Indicators */}
            <div className="flex justify-center gap-8 mt-8 md:hidden">
              {processWithIcons.map((_, index) =>
                index < processWithIcons.length - 1 && (
                  <ChevronRight key={`arrow-${index}`} className="w-9 h-9 text-orange-400/70" />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Consulting Areas */}
      {enabledAreas.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">কনসালটিং এরিয়া</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {enabledAreas.map((area) => (
                <div key={area.id} className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg border border-orange-200">
                  <h3 className="text-2xl font-bold mb-6 text-orange-700">{area.category}</h3>
                  <ul className="space-y-3">
                    {area.services.map((s, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Packages */}
      {enabledPackages.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">প্রাইসিং প্যাকেজ</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {enabledPackages.map((pkg) => (
                <div key={pkg.id}
                  className={`relative p-10 rounded-3xl shadow-2xl transition-all ${pkg.popular ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white scale-105' : 'bg-white border-2 border-gray-200'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-orange-900 px-6 py-2 rounded-full font-bold text-sm">
                      সবচেয়ে জনপ্রিয়
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <div className="text-5xl font-bold mb-2">৳{pkg.price}</div>
                  <div className="text-lg mb-8 opacity-90">{pkg.duration}</div>
                  <ul className="space-y-4 mb-10 text-left">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`block w-full py-4 rounded-xl font-bold text-lg transition ${pkg.popular ? 'bg-white text-orange-600 hover:bg-gray-100' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                    এখনই শুরু করুন
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {enabledTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">ক্লায়েন্টদের মতামত</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {enabledTestimonials.map((t) => (
                <div key={t.id} className="bg-gradient-to-br from-orange-50 to-yellow-50 p-10 rounded-3xl shadow-xl">
                  <div className="text-6xl mb-6">{t.image}</div>
                  <p className="text-xl italic mb-8 text-gray-700 leading-relaxed">"{t.text}"</p>
                  <div className="font-bold text-lg">{t.name}</div>
                  <div className="text-gray-600">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA – ৩টা ছোট রেকট্যাঙ্গুলার বক্স */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">কার সাথে কথা বলতে চান?</h2>
          <p className="text-xl mb-12 text-orange-100">আমরা সবাই আপনার জন্য প্রস্তুত</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* CTA 1 */}
            <Link to="/contact" className="block group">
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-20 h-20 mx-auto mb-5 bg-orange-200 rounded-full flex items-center justify-center text-4xl font-bold text-orange-800">
                  ফ
                </div>
                <h3 className="text-2xl font-bold mb-2">ফাহিম সাহেব</h3>
                <p className="text-orange-100 mb-4">বিজনেস কনসালটেন্ট</p>
                <p className="text-sm opacity-90">→ এখনই কথা বলুন</p>
              </div>
            </Link>

            {/* CTA 2 */}
            <Link to="/contact" className="block group">
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-20 h-20 mx-auto mb-5 bg-blue-200 rounded-full flex items-center justify-center text-4xl font-bold text-blue-800">
                  র
                </div>
                <h3 className="text-2xl font-bold mb-2">রাকিব ভাই</h3>
                <p className="text-orange-100 mb-4">সিনিয়র কনসালটেন্ট</p>
                <p className="text-sm opacity-90">→ এখনই কথা বলুন</p>
              </div>
            </Link>

            {/* CTA 3 */}
            <Link to="/contact" className="block group">
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-20 h-20 mx-auto mb-5 bg-purple-200 rounded-full flex items-center justify-center text-4xl font-bold text-purple-800">
                  ট
                </div>
                <h3 className="text-2xl font-bold mb-2">টিমের সাথে</h3>
                <p className="text-orange-100 mb-4">সম্পূর্ণ টিম</p>
                <p className="text-sm opacity-90">→ গ্রুপ কনসালটেশন</p>
              </div>
            </Link>
          </div>

          <div className="mt-16">
            <Link to="/contact" className="inline-block bg-white text-orange-600 px-12 py-6 rounded-full text-2xl font-bold hover:bg-gray-100 transition shadow-2xl">
              ফ্রি কনসালটেশন বুক করুন →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BusinessConsulting;