// src/pages/services/webDevelopment/WebDevelopment.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";
import webDevelopmentService from "../../services/webDevelopmentService";
import WebDevelopmentHeroSVG from "../../components/animations/WebDevelopmentHeroSVG";

const WebDevelopment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCustomProjectForm, setShowCustomProjectForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [customProjectData, setCustomProjectData] = useState({
    name: "", email: "", mobile: "", description: "", budget: "", timeline: ""
  });

  useEffect(() => { 
    loadPageData(); 
  }, []);

  const loadPageData = async () => {
    try {
      const response = await webDevelopmentService.getPageData();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading page data:', error);
      setLoading(false);
    }
  };

  const handleCustomProjectChange = (e) => {
    const { name, value } = e.target;
    setCustomProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCustomProject = async () => {
    if (!customProjectData.mobile || !customProjectData.description) {
      alert('মোবাইল নম্বর এবং প্রজেক্ট বিবরণ আবশ্যক!');
      return;
    }
    setSubmitLoading(true);
    try {
      const response = await webDevelopmentService.submitCustomProject(customProjectData);
      if (response.data.success) {
        setSubmitSuccess(true);
        setCustomProjectData({ name: "", email: "", mobile: "", description: "", budget: "", timeline: "" });
        setTimeout(() => { 
          setSubmitSuccess(false); 
          setShowCustomProjectForm(false); 
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting custom project:', error);
      if (error.response?.status === 422) {
        let msg = 'দয়া করে নিম্নলিখিত তথ্য ঠিক করুন:\n';
        Object.values(error.response.data.errors).forEach(err => msg += `- ${err[0]}\n`);
        alert(msg);
      } else {
        alert('সাবমিট করতে সমস্যা হয়েছে! আবার চেষ্টা করুন।');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName] || LucideIcons.Box;
    return <Icon className="w-full h-full" />;
  };

  const fadeIn = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } } 
  };
  
  const staggerContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Destructure with fallbacks from backend
  const { 
    hero = {}, 
    services = [], 
    technologies = [], 
    packages = [], 
    portfolio = [], 
    cta = {} 
  } = data;

  // Default fallbacks
  const defaultHero = {
    title: 'প্রফেশনাল ওয়েব ডেভেলপমেন্ট সার্ভিস',
    description: 'আপনার ব্যবসার জন্য আধুনিক, দ্রুত এবং SEO ফ্রেন্ডলি ওয়েবসাইট তৈরি করি।',
    cta1: 'প্রজেক্ট শুরু করুন',
    cta2: 'পোর্টফোলিও দেখুন'
  };

  const defaultCta = {
    title: 'আজই পান আপনার ড্রিম ওয়েবসাইট',
    description: 'ফ্রি কনসালটেশন এবং প্রজেক্ট প্ল্যানিং',
    button: 'ফ্রি কনসালটেশন বুক করুন'
  };

  const safeHero = { ...defaultHero, ...hero };
  const safeCta = { ...defaultCta, ...cta };

  // Function to get technology icon
  const getTechIcon = (iconName) => {
    if (!iconName) return LucideIcons.Code;
    const Icon = LucideIcons[iconName] || LucideIcons.Code;
    return Icon;
  };

  // Map technologies from backend
  const technologiesFromBackend = technologies.map(tech => ({
    name: tech.name || '',
    Icon: getTechIcon(tech.icon),
    color: tech.color || 'blue'
  }));

  return (
    <div className="min-h-screen">

      {/* ========== HERO SECTION ========== */}
      <motion.section
        className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white h-[80vh] flex items-center overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>

        <div className="w-full h-full flex items-center relative z-10 px-[15%]">
          {/* Left Text */}
          <motion.div className="flex-1 max-w-xl" variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{safeHero.title}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl">{safeHero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCustomProjectForm(true)}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                {safeHero.cta1}
              </button>
              <a href="#portfolio" className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition">
                {safeHero.cta2}
              </a>
            </div>
          </motion.div>

          {/* Right Side - Animated SVG */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <WebDevelopmentHeroSVG />
          </motion.div>
        </div>
      </motion.section>

      {/* ========== SERVICES SECTION ========== */}
      {services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                আমাদের ওয়েব ডেভেলপমেন্ট সেবা
              </h2>
              <p className="text-lg text-gray-600">আপনার প্রয়োজন অনুযায়ী কাস্টমাইজড সলিউশন</p>
            </div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {services.map((service, i) => {
                const Icon = LucideIcons[service.icon] || LucideIcons.Box;
                return (
                  <motion.div 
                    key={i}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 py-4 px-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  >
                    <div className="mb-4 w-12 h-12 mx-auto text-purple-600">
                      <Icon className="w-full h-full" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">{service.title}</h3>
                    <p className="text-gray-600 text-xs text-center">{service.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ========== 3 FEATURE BOXES ========== */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-purple-50 via-pink-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Box 1 - Custom Design */}
            <motion.div
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 overflow-hidden border-2 border-purple-100 hover:border-purple-400"
              variants={fadeIn}
              whileHover={{ y: -12, scale: 1.04 }}
            >
              <div className="p-8 lg:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-purple-300 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                  <LucideIcons.Palette className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">কাস্টম ওয়েব ডিজাইন</h3>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
                  আপনার ব্র্যান্ডের জন্য সম্পূর্ণ ইউনিক, আধুনিক ও প্রফেশনাল ডিজাইন তৈরি করি। প্রতিটি পিক্সেল আপনার ব্যবসার সাথে মানানসই।
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>

            {/* Box 2 - Fast Loading */}
            <motion.div
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 overflow-hidden border-2 border-pink-100 hover:border-pink-400"
              variants={fadeIn}
              whileHover={{ y: -12, scale: 1.04 }}
            >
              <div className="p-8 lg:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-pink-300 flex items-center justify-center group-hover:border-pink-500 transition-colors">
                  <LucideIcons.Zap className="w-10 h-10 text-pink-600 group-hover:text-pink-700 transition-colors" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">দ্রুত লোডিং</h3>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
                  গুগলের স্ট্যান্ডার্ড অনুযায়ী অপটিমাইজ করা। ছবি, কোড, সার্ভার – সবকিছু হাই স্পিডের জন্য তৈরি। ব্যবহারকারী অপেক্ষা করবে না।
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>

            {/* Box 3 - Responsive */}
            <motion.div
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 overflow-hidden border-2 border-indigo-100 hover:border-indigo-400"
              variants={fadeIn}
              whileHover={{ y: -12, scale: 1.04 }}
            >
              <div className="p-8 lg:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-indigo-300 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                  <LucideIcons.Smartphone className="w-10 h-10 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">রেসপন্সিভ ডিজাইন</h3>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
                  মোবাইল, ট্যাবলেট, ল্যাপটপ, ডেস্কটপ – যেকোনো স্ক্রিন সাইজে পারফেক্ট দেখাবে। গুগল মোবাইল-ফ্রেন্ডলি টেস্টে ১০০/১০০ স্কোর।
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== TECHNOLOGIES SECTION ========== */}
      {technologiesFromBackend.length > 0 && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  আমরা যে টেকনোলজি ব্যবহার করি
                </span>
              </h2>
              <p className="text-base text-gray-600">আধুনিক ও শক্তিশালী টেক স্ট্যাক দিয়ে ভবিষ্যৎ-নির্ভর ওয়েবসাইট</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologiesFromBackend.map((tech, index) => {
                const Icon = tech.Icon;
                const colorMap = {
                  orange: 'text-orange-600 bg-orange-50 border-orange-200',
                  blue: 'text-blue-600 bg-blue-50 border-blue-200',
                  yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
                  cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                  green: 'text-green-600 bg-green-50 border-green-200',
                  purple: 'text-purple-600 bg-purple-50 border-purple-200',
                  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                  teal: 'text-teal-600 bg-teal-50 border-teal-200',
                  red: 'text-red-600 bg-red-50 border-red-200',
                  pink: 'text-pink-600 bg-pink-50 border-pink-200',
                  gray: 'text-gray-600 bg-gray-50 border-gray-200'
                };
                
                const colorClass = colorMap[tech.color] || colorMap.blue;
                
                return (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl border ${colorClass}`}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{tech.name}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== CUSTOM PROJECT SECTION ========== */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              কাস্টম প্রজেক্টের জন্য অনুরোধ করুন
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              আপনার বিশেষ প্রয়োজন অনুযায়ী কাস্টমাইজড ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস পান
            </p>
            <button
              onClick={() => setShowCustomProjectForm(true)}
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2"
            >
              <LucideIcons.Sparkles className="w-6 h-6" />
              কাস্টম প্রজেক্টের জন্য ক্লিক করুন
              <LucideIcons.ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========== PORTFOLIO SECTION ========== */}
      {portfolio.length > 0 && (
        <section id="portfolio" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                আমাদের সাম্প্রতিক কাজ
              </h2>
              <p className="text-lg text-gray-600">বিভিন্ন শিল্পে আমাদের সফলতার গল্প</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-purple-600 font-semibold mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-1"
                      >
                        বিস্তারিত দেখুন <LucideIcons.ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== PRICING SECTION ========== */}
      {packages.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">প্রাইসিং প্ল্যান</h2>
              <p className="text-lg text-gray-600">সাশ্রয়ী মূল্যে পেশাদার ওয়েবসাইট</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className={`rounded-2xl p-8 transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-br from-purple-500 to-pink-600 text-white transform scale-105 shadow-2xl"
                      : "bg-white border-2 border-gray-200 shadow-lg"
                  }`}
                >
                  {pkg.popular && (
                    <div className="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
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
                        <LucideIcons.Check 
                          className={`w-5 h-5 ${pkg.popular ? "text-yellow-300" : "text-green-500"}`} 
                        />
                        <span className={pkg.popular ? "text-gray-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.demo_order_link && pkg.demo_order_link.trim() !== '' ? (
                    <a
                      href={pkg.demo_order_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-3 rounded-full font-bold transition ${
                        pkg.popular
                          ? "bg-white text-purple-600 hover:bg-gray-100"
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      অর্ডার করুন
                    </a>
                  ) : (
                    <button
                      onClick={() => setShowCustomProjectForm(true)}
                      className={`block w-full text-center py-3 rounded-full font-bold transition ${
                        pkg.popular
                          ? "bg-white text-purple-600 hover:bg-gray-100"
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      কাস্টম প্রজেক্ট
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== CTA SECTION ========== */}
      {safeCta.title && (
        <motion.section
          className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{safeCta.title}</h2>
            <p className="text-xl mb-8 text-gray-100">{safeCta.description}</p>
            <button
              onClick={() => setShowCustomProjectForm(true)}
              className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 inline-block transform hover:scale-105 transition"
            >
              {safeCta.button}
            </button>
          </div>
        </motion.section>
      )}

      {/* ========== CUSTOM PROJECT FORM MODAL ========== */}
      {showCustomProjectForm && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">কাস্টম প্রজেক্ট অনুরোধ</h3>
              <button
                onClick={() => setShowCustomProjectForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <LucideIcons.X className="w-6 h-6" />
              </button>
            </div>
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 m-6 rounded">
                আপনার কাস্টম প্রজেক্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">নাম (ঐচ্ছিক)</label>
                    <input
                      type="text"
                      name="name"
                      value={customProjectData.name}
                      onChange={handleCustomProjectChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="আপনার নাম"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">ইমেইল (ঐচ্ছিক)</label>
                    <input
                      type="email"
                      name="email"
                      value={customProjectData.email}
                      onChange={handleCustomProjectChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="আপনার ইমেইল"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={customProjectData.mobile}
                      onChange={handleCustomProjectChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">বাজেট (ঐচ্ছিক)</label>
                    <input
                      type="text"
                      name="budget"
                      value={customProjectData.budget}
                      onChange={handleCustomProjectChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="যেমন: ৫০,০০০ টাকা"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">সময়সীমা (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    name="timeline"
                    value={customProjectData.timeline}
                    onChange={handleCustomProjectChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="যেমন: ১ মাস, ২ সপ্তাহ"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">প্রজেক্টের বিবরণ *</label>
                  <textarea
                    name="description"
                    value={customProjectData.description}
                    onChange={handleCustomProjectChange}
                    rows="8"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="আপনার প্রজেক্টের বিস্তারিত বিবরণ লিখুন... যেমন: কি ধরনের ওয়েবসাইট চান, কি কি ফিচার প্রয়োজন, টার্গেট অডিয়েন্স কারা ইত্যাদি"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <div className="max-w-2xl mx-auto flex gap-4">
                <button
                  onClick={handleSubmitCustomProject}
                  disabled={submitLoading}
                  className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg transition ${
                    submitLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  {submitLoading ? 'সাবমিট হচ্ছে...' : 'রিকোয়েস্ট পাঠান'}
                </button>
                <button
                  onClick={() => setShowCustomProjectForm(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  বাতিল
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WebDevelopment;