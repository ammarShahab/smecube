import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  CheckCircle,
  TrendingUp,
  Star,
  Zap,
  Sparkles,
  BarChart3,
  Eye,
  Award,
  Target,
  Lightbulb,
  Shield,
} from "lucide-react";
import aboutService from "../services/aboutService";

const About = () => {
  const [heroData, setHeroData] = useState({
    title: 'আমাদের সম্পর্কে',
    subtitle: 'SMECube BD',
    description: 'বাংলাদেশের অগ্রণী ডিজিটাল ট্রান্সফর্মেশন পার্টনার। আমরা ক্ষুদ্র ও মাঝারি ব্যবসাগুলিকে বিশ্বমানের প্রযুক্তি সমাধান দিয়ে ভবিষ্যতের জন্য প্রস্তুত করি এবং ডিজিটাল যুগে সফলতার নতুন উচ্চতায় পৌঁছাতে সাহায্য করি।'
  });

  const defaultStats = [
    { number: "500+", label: "সন্তুষ্ট ক্লায়েন্ট" },
    { number: "1000+", label: "সম্পন্ন প্রজেক্ট" },
    { number: "50+", label: "দক্ষ টিম মেম্বার" },
    { number: "5+", label: "বছরের অভিজ্ঞতা" },
  ];

  const defaultValues = [
    {
      title: "উদ্ভাবন",
      description: "আমরা প্রযুক্তির সীমানা অতিক্রম করে নতুন সমাধান তৈরি করি যা আপনার ব্যবসাকে এগিয়ে নিয়ে যায়",
    },
    {
      title: "উৎকর্ষতা",
      description: "প্রতিটি প্রজেক্টে সর্বোচ্চ মানের প্রতিশ্রুতি এবং ক্লায়েন্টদের সন্তুষ্টি আমাদের লক্ষ্য",
    },
    {
      title: "সততা",
      description: "স্বচ্ছতা এবং বিশ্বস্ততা আমাদের মূলমন্ত্র। আমরা বিশ্বাসযোগ্য পার্টনার হতে প্রতিশ্রুতিবদ্ধ",
    },
    {
      title: "সহযোগিতা",
      description: "ক্লায়েন্টদের সাথে অংশীদারিত্বের মনোভাব নিয়ে একসাথে সফলতা অর্জন করি",
    },
  ];

  const defaultSuccessStories = [
    {
      brand: "ডিজিটাল হাব",
      growth: "৩৫০%",
      description: "৩ মাসে ফলোয়ার ১০,০০০ তে বৃদ্ধি এবং ব্র্যান্ড ভিজিবিলিটি বৃদ্ধি",
    },
    {
      brand: "টেক সলিউশন",
      growth: "৫০০%",
      description: "রিচ ৫x বৃদ্ধি এবং কার্যকর লিড জেনারেশন",
    },
    {
      brand: "ইনোভেট বাংলা",
      growth: "২৮০%",
      description: "এনগেজমেন্ট ৩x বৃদ্ধি এবং সেলস বৃদ্ধি",
    },
  ];

  const defaultTestimonials = [
    {
      name: "আহমেদ রহমান",
      company: "টেক স্টার্টআপ সিইও",
      text: "SMECube আমাদের ব্র্যান্ডকে ডিজিটাল প্ল্যাটফর্মে প্রতিষ্ঠিত করতে অসাধারণ সাহায্য করেছে। তাদের প্রফেশনালিজম এবং ডেডিকেশন অতুলনীয়।",
      rating: 5,
    },
    {
      name: "ফারিহা আক্তার",
      company: "ফ্যাশন ব্র্যান্ড প্রতিষ্ঠাতা",
      text: "প্রফেশনাল সেবা এবং দ্রুত ফলাফল। আমাদের ফলোয়ার বেস তিনগুণ বেড়েছে এবং সেলস উল্লেখযোগ্যভাবে বৃদ্ধি পেয়েছে।",
      rating: 5,
    },
    {
      name: "রাকিবুল ইসলাম",
      company: "ই-কমার্স উদ্যোক্তা",
      text: "SMECube এর সাথে কাজ করে আমার ব্যবসা নতুন উচ্চতায় পৌঁছেছে। তারা শুধু সেবা প্রদানকারী নয়, সত্যিকারের বিজনেস পার্টনার।",
      rating: 5,
    },
  ];

  const defaultServices = [
    {
      title: "ডিজিটাল মার্কেটিং",
      description: "সোশ্যাল মিডিয়া, SEO এবং কন্টেন্ট মার্কেটিং",
    },
    {
      title: "ব্র্যান্ডিং",
      description: "লোগো ডিজাইন এবং ব্র্যান্ড আইডেন্টিটি তৈরি",
    },
    {
      title: "ওয়েব ডেভেলপমেন্ট",
      description: "আধুনিক এবং রেসপন্সিভ ওয়েবসাইট তৈরি",
    },
    {
      title: "ডিজিটাল স্ট্র্যাটেজি",
      description: "বিজনেস গ্রোথের জন্য কাস্টমাইজড পরিকল্পনা",
    },
  ];

  const [stats, setStats] = useState(defaultStats);
  const [values, setValues] = useState(defaultValues);
  const [successStories, setSuccessStories] = useState(defaultSuccessStories);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      const response = await aboutService.getPageData();
      if (response.hero) setHeroData(response.hero);
      if (response.stats) setStats(response.stats);
      if (response.values) setValues(response.values);
      if (response.successStories) setSuccessStories(response.successStories);
      if (response.testimonials) setTestimonials(response.testimonials);
      if (response.services) setServices(response.services);
    } catch (error) {
      console.error('Error loading about data:', error);
      // Use default data if API fails
    }
  };

  const iconMap = {
    'TrendingUp': <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
    'Sparkles': <Sparkles className="w-6 h-6 md:w-8 md:h-8" />,
    'Star': <Star className="w-6 h-6 md:w-8 md:h-8" />,
  };

  const valueIconMap = {
    'Lightbulb': <Lightbulb className="w-full h-full" />,
    'Award': <Award className="w-full h-full" />,
    'Shield': <Shield className="w-full h-full" />,
    'Users': <Users className="w-full h-full" />,
  };

  const serviceIconMap = {
    'BarChart3': <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />,
    'Sparkles': <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
    'Target': <Target className="w-5 h-5 md:w-6 md:h-6" />,
    'Zap': <Zap className="w-5 h-5 md:w-6 md:h-6" />,
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero Section - Reduced Height */}
      <section className="relative h-[80vh] md:h-screen flex items-center overflow-hidden bg-gradient-to-br from-red-700 via-red-700 to-red-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10 py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Logo SVG */}
            <div className="flex justify-center mb-4 md:mb-8">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[120px] md:h-[120px]">
                <rect width="120" height="120" rx="24" fill="white" fillOpacity="0.1"/>
                <path d="M40 45C40 41.6863 42.6863 39 46 39H54C57.3137 39 60 41.6863 60 45V53C60 56.3137 57.3137 59 54 59H46C42.6863 59 40 56.3137 40 53V45Z" fill="white"/>
                <path d="M64 45C64 41.6863 66.6863 39 70 39H78C81.3137 39 84 41.6863 84 45V53C84 56.3137 81.3137 59 78 59H70C66.6863 59 64 56.3137 64 53V45Z" fill="white" fillOpacity="0.7"/>
                <path d="M40 65C40 61.6863 42.6863 59 46 59H54C57.3137 59 60 61.6863 60 65V73C60 76.3137 57.3137 79 54 79H46C42.6863 79 40 76.3137 40 73V65Z" fill="white" fillOpacity="0.7"/>
                <path d="M64 65C64 61.6863 66.6863 59 70 59H78C81.3137 59 84 61.6863 84 65V73C84 76.3137 81.3137 79 78 79H70C66.6863 79 64 76.3137 64 73V65Z" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-semibold border border-white/20 mb-4 md:mb-8">
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
                <span>বাংলাদেশের বিশ্বস্ত ডিজিটাল পার্টনার</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-6 leading-tight text-white">
                {heroData.title}
              </h1>

              <div className="inline-block mb-4 md:mb-8">
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200">
                  {heroData.subtitle}
                </h2>
              </div>

              <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto">
                {heroData.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-12 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-6 border border-white/20 hover:bg-white/00 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 text-white mb-1 md:mb-3 mx-auto">
                      {index === 0 && <Users className="w-full h-full" />}
                      {index === 1 && <BarChart3 className="w-full h-full" />}
                      {index === 2 && <Users className="w-full h-full" />}
                      {index === 3 && <TrendingUp className="w-full h-full" />}
                    </div>
                    <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{stat.number}</div>
                    <p className="text-sm md:text-lg text-red/50">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button className="group bg-white text-red-600 px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                  যোগাযোগ করুন
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white/20 transition-all hover:scale-105">
                  আরও জানুন
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto block">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Services Overview - 15% margin */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="mx-[15%]">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              আমাদের সেবাসমূহ
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                যা আমরা অফার করি
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              সম্পূর্ণ ডিজিটাল ট্রান্সফর্মেশন সেবা একটি প্যাকেজে
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-red-600"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                  {['BarChart3', 'Sparkles', 'Target', 'Zap'][index] === 'BarChart3' && <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />}
                  {['BarChart3', 'Sparkles', 'Target', 'Zap'][index] === 'Sparkles' && <Sparkles className="w-5 h-5 md:w-6 md:h-6" />}
                  {['BarChart3', 'Sparkles', 'Target', 'Zap'][index] === 'Target' && <Target className="w-5 h-5 md:w-6 md:h-6" />}
                  {['BarChart3', 'Sparkles', 'Target', 'Zap'][index] === 'Zap' && <Zap className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - 15% margin */}
      <section className="py-10 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dc2626' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>

        <div className="mx-[15%] relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-block px-4 py-2 md:px-6 md:py-3 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              আমাদের মূল্যবোধ
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                যে নীতিতে আমরা বিশ্বাসী
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              যে মূল্যবোধগুলি আমাদের প্রতিটি সিদ্ধান্ত এবং কর্মকাণ্ডকে পরিচালিত করে
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-red-50 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-100 hover:border-red-600 group"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                  {['Lightbulb', 'Award', 'Shield', 'Users'][index] === 'Lightbulb' && <Lightbulb className="w-full h-full" />}
                  {['Lightbulb', 'Award', 'Shield', 'Users'][index] === 'Award' && <Award className="w-full h-full" />}
                  {['Lightbulb', 'Award', 'Shield', 'Users'][index] === 'Shield' && <Shield className="w-full h-full" />}
                  {['Lightbulb', 'Award', 'Shield', 'Users'][index] === 'Users' && <Users className="w-full h-full" />}
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">{value.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - 15% margin */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="mx-[15%]">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              <Target className="w-3 h-3 md:w-4 md:h-4" />
              আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                আমরা যেখানে যেতে চাই
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-600">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">আমাদের লক্ষ্য</h3>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                বাংলাদেশের প্রতিটি ছোট ও মাঝারি ব্যবসাকে ডিজিটাল প্ল্যাটফর্মে সফল করা এবং তাদের 
                স্বপ্ন পূরণে সহায়তা করা। আমরা বিশ্বাস করি প্রতিটি ব্যবসার সফল হওয়ার অধিকার রয়েছে।
              </p>
            </div>
            <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-600">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">আমাদের দৃষ্টিভঙ্গি</h3>
              <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                দক্ষিণ এশিয়ার শীর্ষস্থানীয় ডিজিটাল সলিউশন প্রদানকারী হিসেবে নিজেদের প্রতিষ্ঠিত করা 
                এবং বাংলাদেশী ব্যবসাগুলিকে বৈশ্বিক বাজারে প্রতিযোগিতায় সক্ষম করা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - 15% margin */}
      <section className="py-10 md:py-20 bg-white">
        <div className="mx-[15%]">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              সাফল্যের গল্প
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                আমাদের ক্লায়েন্টদের সাফল্য
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              আমরা গর্বিত যে আমাদের ক্লায়েন্টরা অসাধারণ ফলাফল অর্জন করেছেন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-red-50 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-red-100"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform mx-auto">
                  {['TrendingUp', 'Sparkles', 'Star'][index] === 'TrendingUp' && <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />}
                  {['TrendingUp', 'Sparkles', 'Star'][index] === 'Sparkles' && <Sparkles className="w-6 h-6 md:w-8 md:h-8" />}
                  {['TrendingUp', 'Sparkles', 'Star'][index] === 'Star' && <Star className="w-6 h-6 md:w-8 md:h-8" />}
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2 md:mb-4">
                    {story.growth}
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{story.brand}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - 15% margin */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q50,50 100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#b91c1c', stopOpacity: 0.3}} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mx-[15%] relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 shadow-lg">
              <Star className="w-3 h-3 md:w-4 md:h-4" />
              ক্লায়েন্ট রিভিউ
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                ক্লায়েন্টরা যা বলেন
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              আমাদের সেবা এবং সাপোর্ট সম্পর্কে তাদের অভিজ্ঞতা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex gap-1 mb-3 md:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs md:text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - 15% margin */}
      <section className="py-10 md:py-20 bg-white">
        <div className="mx-[15%]">
          <div className="text-center mb-8 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-red-100 text-red-600 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
              কেন আমাদের বেছে নেবেন
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                আমরা কেন আলাদা
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4 md:gap-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-600">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl flex items-center justify-center text-white">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">স্থানীয় বাজার জ্ঞান</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  বাংলাদেশের বাজার এবং ভোক্তা আচরণ সম্পর্কে গভীর বোঝাপড়া রয়েছে আমাদের
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-600">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">দ্রুত বাস্তবায়ন</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  আমরা সময়মতো এবং দক্ষতার সাথে প্রতিটি প্রজেক্ট সম্পন্ন করি
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-600">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl flex items-center justify-center text-white">
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">ডেডিকেটেড সাপোর্ট</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  ২৪/৭ কাস্টমার সাপোর্ট এবং আপনার প্রতিটি প্রশ্নের উত্তর দিতে প্রস্তুত
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-red-600">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg md:rounded-xl flex items-center justify-center text-white">
                  <Award className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3">প্রমাণিত ফলাফল</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  শত শত সফল প্রজেক্ট এবং সন্তুষ্ট ক্লায়েন্টদের ট্র্যাক রেকর্ড
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - 15% margin */}
      <section className="py-10 md:py-20">
        <div className="mx-[15%]">
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.3),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.3),transparent_50%)]"></div>
            </div>

            <div className="relative z-10 text-center py-10 md:py-20 px-6 md:px-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-semibold border border-white/20 mb-4 md:mb-8">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                <span>আজই শুরু করুন</span>
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6 text-white">
                আমাদের সাথে কাজ করতে প্রস্তুত?
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                আজই শুরু করুন আপনার ডিজিটাল যাত্রা এবং ব্যবসাকে নতুন উচ্চতায় নিয়ে যান। 
                আমরা আপনার সফলতার জন্য প্রস্তুত।
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center">
                <button className="group bg-white text-red-600 px-8 py-3 md:px-12 md:py-5 rounded-full font-semibold text-base md:text-lg shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 md:gap-3">
                  বিনামূল্যে পরামর্শ নিন
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white px-8 py-3 md:px-12 md:py-5 rounded-full font-semibold text-base md:text-lg hover:bg-white/20 transition-all hover:scale-105">
                  পোর্টফোলিও দেখুন
                </button>
              </div>

              <div className="mt-6 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span>বিনামূল্যে প্রথম পরামর্শ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span>দ্রুত প্রতিক্রিয়া</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span>কোন লুকানো খরচ নেই</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note - 15% margin */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="mx-[15%] text-center">
          <p className="text-gray-600 text-base md:text-lg">
            <span className="font-bold text-red-600">SMECube BD</span> - বাংলাদেশের ডিজিটাল ভবিষ্যৎ গড়ছি আমরা একসাথে
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;