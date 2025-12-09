import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Phone, FileText, Rocket, CheckCircle, Users,Sparkles, Lock, Headphones, Zap,
  ShoppingBag, Package, TrendingUp, Truck, ChevronLeft, ChevronRight, Eye, ArrowUp, Shield, Globe, Clock
} from 'lucide-react';
import ecommerceService from "../../services/ecommerceService.js";
import { motion } from "framer-motion";
import {
  DesignIcon,
  IdeaIcon,
  LaunchSupportIcon,
  ThinkIcon,
} from "../../components/servicesPage/ecommerceSolution/Icons.jsx";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// Smaller & Thinner Outline Icon for Process Section
const SmallOutlineIcon = ({ Icon, className = "w-12 h-12" }) => (
  <div className="p-3 bg-white rounded-full shadow-xl border-2 border-white">
    <Icon className={`${className} text-blue-600 stroke-1`} />
  </div>
);

// Icon mapping
const iconMap = {
  Zap,
  Shield,
  Globe,
  Rocket,
  Sparkles,
  Clock,
};

const EcommerceSolution = () => {
  // Icon mapping for process steps
  const processStepIconMap = {
    IdeaIcon: IdeaIcon,
    ThinkIcon: ThinkIcon,
    DesignIcon: DesignIcon,
    LaunchSupportIcon: LaunchSupportIcon,
  };
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pageData, setPageData] = useState({
    hero: null,
    processSteps: [], 
    demoProjects: [], 
    clients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        const response = await ecommerceService.getPageData();
        const data = response.data?.data || response.data || response;

        // Helper function to truncate descriptions
        const truncateDescription = (text, lines = 3) => {
          if (!text) return '';
          const lineArray = text.split('\n');
          return lineArray.slice(0, lines).join('\n');
        };

        // Process processSteps data - transform icons
        const processedProcessSteps = Array.isArray(data.processSteps)
          ? data.processSteps.map((step, index) => {
              // Determine which icon to use
              let IconComponent = IdeaIcon; // default

              // Method 1: Use icon_name if available
              if (step.icon_name && processStepIconMap[step.icon_name]) {
                IconComponent = processStepIconMap[step.icon_name];
              }
              // Method 2: Use step number to determine icon
              else {
                const stepIcons = [
                  IdeaIcon,
                  ThinkIcon,
                  DesignIcon,
                  LaunchSupportIcon,
                ];
                IconComponent = stepIcons[index] || IdeaIcon;
              }

              return {
                ...step,
                Icon: IconComponent,
                // Ensure step field exists for frontend
                step: step.step_number || step.step || `স্টেপ ${index + 1}`,
                // Truncate description to 3 lines
                description: truncateDescription(step.description, 3),
              };
            })
          : [];

        setPageData({
          hero: data.hero || null,
          processSteps: processedProcessSteps,
          demoProjects: Array.isArray(data.demoProjects) ? data.demoProjects : [],
          clients: Array.isArray(data.clients) ? data.clients : [],
        });
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, Math.ceil(pageData.demoProjects.length / 4) - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const formatTitle = (title) => {
    const words = title?.split(" ") || [];
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      return <>{words.slice(0, mid).join(" ")}<br />{words.slice(mid).join(" ")}</>;
    }
    return title;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const { hero, processSteps = [], demoProjects = [], clients = [] } = pageData;
  const stepIcons = [Phone, FileText, Rocket, CheckCircle];

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        .font-hind { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

{/* ==================== HERO SECTION – FINAL (Real Product Feel + Elements Closer) ==================== */}
<motion.section
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  variants={fadeIn}
  className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white"
>
  {/* Background Blobs */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
  </div>

  <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path d="M0,50 Q360,15 720,50 T1440,50 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.12)" />
  </svg>

  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

      {/* Left Text */}
      <div className="flex-1 text-center lg:text-left max-w-2xl">
        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-100 font-hind drop-shadow-lg">
            {hero?.title || "আপনার স্বপ্নের ই-কমার্স ওয়েবসাইট"}
          </span>
        </motion.h1>
        <motion.p variants={fadeIn} className="text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90 mb-10 font-hind">
          {hero?.description || "আধুনিক, দ্রুত এবং ব্যবহারকারী-বান্ধব ই-কমার্স সলিউশন — আপনার ব্যবসাকে ডিজিটাল জগতে নিয়ে যান।"}
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <button className="group bg-white text-blue-700 px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-[240px]">
            <span className="font-hind">{hero?.cta1 || "এখনই শুরু করুন"}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="border-2 border-white/70 text-white px-10 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 min-w-[240px] font-hind">
            {hero?.cta2 || "ডেমো দেখুন"}
          </button>
        </motion.div>
      </div>

      {/* Right: Phone with Real Product Showcase */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <motion.div className="relative scale-90 md:scale-95" variants={scaleIn}>
          <div className="relative w-80 h-96">

            {/* Main Phone */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-96 bg-white rounded-[38px] shadow-2xl overflow-hidden border-8 border-gray-900 z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-3">
                <div className="bg-white rounded-2xl p-4 shadow-md h-full flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-7 h-7 text-purple-600" />
                      <span className="font-black text-base">My Store</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
                  </div>

                  {/* Real Product Grid */}
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* শাড়ি */}
                    <div className="group relative rounded-xl overflow-hidden shadow-md">
                      <div className="h-24 bg-gradient-to-br from-pink-400 via-red-400 to-rose-500 relative">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="absolute bottom-2 left-2 text-white font-bold text-xs bg-black/40 px-2 py-1 rounded">শাড়ি</div>
                      </div>
                    </div>

                    {/* গয়না */}
                    <div className="group relative rounded-xl overflow-hidden shadow-md">
                      <div className="h-24 bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 relative">
                        <Sparkles className="absolute top-4 left-6 w-10 h-10 text-white/80" />
                        <Sparkles className="absolute bottom-4 right-4 w-6 h-6 text-white/80" />
                        <div className="absolute bottom-2 left-2 text-white font-bold text-xs bg-black/40 px-2 py-1 rounded">গয়না</div>
                      </div>
                    </div>

                    {/* জুতা */}
                    <div className="group relative rounded-xl overflow-hidden shadow-md">
                      <div className="h-24 bg-gradient-to-br from-slate-700 to-slate-900 relative flex items-end justify-center">
                        <div className="text-white text-4xl mb-4">High Heels</div>
                        <div className="absolute bottom-2 left-2 text-white font-bold text-xs bg-black/40 px-2 py-1 rounded">জুতা</div>
                      </div>
                    </div>

                    {/* ব্যাগ */}
                    <div className="group relative rounded-xl overflow-hidden shadow-md">
                      <div className="h-24 bg-gradient-to-br from-emerald-400 to-teal-600 relative flex items-center justify-center">
                        <Package className="w-16 h-16 text-white/90" />
                        <div className="absolute bottom-2 left-2 text-white font-bold text-xs bg-black/40 px-2 py-1 rounded">ব্যাগ</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 text-center text-white">
                    <div className="text-xl font-black">৫০হা+</div>
                    <div className="text-[10px] opacity-90">সন্তুষ্ট গ্রাহক</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-800 rounded-full"></div>
            </motion.div>

            {/* ধামাকা শপিং – কাছে + সোজা + ছোট + উজ্জ্বল লাল */}
            <motion.div
              className="absolute top-3/4 -translate-y-1/3 -left-12 w-28 h-28 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white z-30"
              animate={{ y: [-10, -25, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-14 h-14 mb-1 animate-pulse" />
              <span className="font-black text-lg leading-tight text-center">
                ধামাকা<br />শপিং
              </span>
            </motion.div>

            {/* দ্রুত ডেলিভারি – আরও কাছে */}
            <motion.div
              className="absolute top-10 -left-14 w-28 h-28 bg-white rounded-3xl shadow-2xl border-4 border-orange-500 flex flex-col items-center justify-center -rotate-12 z-30"
              animate={{ y: [0, -18, 0], rotate: [-12, -6, -12] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Truck className="w-12 h-12 text-orange-600 mb-1" />
              <span className="text-orange-600 font-black text-sm leading-tight text-center">দ্রুত<br />ডেলিভারি</span>
            </motion.div>

            {/* ৫০% ছাড় */}
            <motion.div
              className="absolute top-10 right-6 w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white z-20"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl font-black">৫০%</span>
              <span className="text-xs font-bold">ছাড়</span>
            </motion.div>

            {/* বিক্রি বাড়ছে */}
            <motion.div
              className="absolute bottom-8 right-0 w-32 h-32 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 border border-gray-200 z-20"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-7 h-7 text-green-600" />
                <span className="text-sm font-bold text-gray-800">বিক্রি বাড়ছে</span>
              </div>
              <div className="flex items-end justify-between h-14 gap-1">
                {[35, 55, 45, 80, 70, 100].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  </div>
</motion.section>

{/* PROCESS STEPS SECTION */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24 space-y-4 lg:space-y-6">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
              আমাদের কাজের প্রক্রিয়া
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              সহজ এবং{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                স্ট্রেইটফরওয়ার্ড
              </span>{" "}
              প্রক্রিয়া
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              আপনার ডিজিটাল বিজনেস জার্নি শুরু হোক সহজ এবং পরিকল্পিত
              প্রক্রিয়ায়
            </p>
          </div>

          {/* 4-Step Horizontal Flow */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-12 xl:gap-20">
            {pageData.processSteps.map((item, index) => (
              <React.Fragment key={index}>
                {/* Step Item */}
                <div className="flex flex-col items-center justify-center text-center flex-1 ">
                  <item.Icon className="w-18 h-18 mb-5 lg:w-28 lg:h-28 text-orange-600" />

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
                </div>

                {/* Arrow - Perfectly Centered Vertically */}
                {index < pageData.processSteps.length - 1 && (
                  <div className="hidden md:flex md:mt-10 items-end justify-end h-full">
                    <ChevronRight className="w-9 h-9 lg:w-14 lg:h-14 text-gray-400 flex-shrink-0" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Arrow Indicators */}
          <div className="flex justify-center mt-12 gap-6 md:hidden">
            {[...Array(3)].map((_, i) => (
              <ChevronRight key={i} className="w-8 h-8 text-gray-400" />
            ))}
          </div>
        </div>
      </section>


{/* ==================== FEATURES SECTION – ছোট আইকন + সুন্দর স্পেসিং ==================== */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">বিশেষ সুবিধা</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto font-hind">
        কেন আমরাই আপনার ব্যবসার জন্য সেরা পছন্দ?
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { Icon: Users, title: "ব্যবহারকারী-বান্ধব", desc: "যে কেউ সহজেই ব্যবহার করতে পারবে\nকোনো টেকনিক্যাল জ্ঞান লাগবে না\nআপনার দাদীও চালাতে পারবেন!" },
        { Icon: Lock, title: "সুপার সিকিউর", desc: "সর্বোচ্চ নিরাপত্তা সিস্টেম\nআপনার ডাটা ১০০% সুরক্ষিত\nSSL + ফায়ারওয়াল সহ" },
        { Icon: Headphones, title: "দ্রুত সাপোর্ট", desc: "২৪/৭ লাইভ চ্যাট সাপোর্ট\nফোন, ইমেইল, হোয়াটসঅ্যাপ\nযে কোনো সমস্যা মুহূর্তে সমাধান" },
        { Icon: Zap, title: "বিদ্যুৎ গতি", desc: "লোড হবে মাত্র ১ সেকেন্ডে\nগুগল স্পিড ৯৫+ স্কোর\nগ্রাহক ছেড়ে যাবে না" },
      ].map((feature, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
        >
          {/* ছোট আইকন + ছোট সার্কেল */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <feature.Icon className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed font-hind whitespace-pre-line">
            {feature.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* DEMO PROJECTS SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg mb-4 sm:mb-6 lg:mb-10">
              আমাদের ডেমো প্রজেক্ট
            </div>
            <h2 className="text-2xl sm:text-3xl mb-8 mt-4 md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 px-4">
              একনজরে <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">আমাদের কাজ</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              বিভিন্ন ইন্ডাস্ট্রির জন্য তৈরি আমাদের সফল ই-কমার্স প্রজেক্টস
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-2 lg:hidden">
              {pageData.demoProjects.slice(0, 6).map((project, i) => (
                <div
                  key={project.id}
                  className="group relative bg-white rounded-xl overflow-hidden hover:shadow transition-all duration-300 aspect-square border border-gray-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                    <h3 className="text-[10px] font-bold leading-tight">
                      {formatTitle(project.title)}
                    </h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:block relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(pageData.demoProjects.length / 4) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full grid grid-cols-4 gap-4">
                      {pageData.demoProjects.slice(slideIndex * 4, (slideIndex + 1) * 4).map((project, i) => (
                        <div
                          key={project.id}
                          className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 aspect-square border border-gray-200"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                            <h3 className="text-base font-bold mb-1 leading-tight">
                              {formatTitle(project.title)}
                            </h3>
                            <p className="text-xs opacity-90 line-clamp-2 font-hind">
                              {project.description}
                            </p>
                          </div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 disabled:opacity-30 border border-gray-300 text-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide >= Math.ceil(pageData.demoProjects.length / 4) - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all hover:scale-110 active:scale-95 disabled:opacity-30 border border-gray-300 text-gray-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(pageData.demoProjects.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index ? 'w-6 bg-gradient-to-r from-purple-500 to-pink-600' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-sm inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 mb-5 rounded-full font-semibold mb-12">সম্মানিত ক্লায়েন্ট</h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              <span className="bg-gradient-to-r m-10 from-purple-600 to-pink-600 bg-clip-text text-transparent">
                আমাদের বিশ্বস্ত ব্র্যান্ড পার্টনার
              </span>
            </h2>
            <p className="text-sm mb-10 text-gray-600 mt-8">নিচে কয়েকটি পরিচিত ব্র্যান্ড — যারা আমাদের উপর বিশ্বাস স্থাপন করেছেন</p>
          </div>

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-center justify-items-center">
            {pageData.clients.map((client, i) => (
              <a
                key={client.id}
                href={`https://${client.domain}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white rounded-lg p-2 sm:p-3 w-full max-w-[150px] sm:max-w-[220px] shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`https://logo.clearbit.com/${client.domain}`}
                  alt={client.name}
                  className="h-6 sm:h-8 md:h-10 object-contain"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://via.placeholder.com/120x40?text=${encodeURIComponent(client.name)}`; }}
                />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center sm:text-left">{client.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            আপনার ডিজিটাল বিজনেস শুরু করুন আজই!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-hind">
            বিনামূল্যে কন্সাল্টেশন নিয়ে আপনার ই-কমার্স জার্নি শুরু করুন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center gap-3 hover:scale-105 hover:shadow-3xl active:scale-95">
              <span className="font-hind">ফ্রী কন্সাল্টেশন বুক করুন</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="group border-2 border-white/40 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              <span className="font-hind">কল ব্যাক রিকোয়েস্ট</span>
            </button>
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50">
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default EcommerceSolution;