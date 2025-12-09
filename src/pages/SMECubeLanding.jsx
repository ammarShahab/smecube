import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  Code,
  Users,
  Palette,
  MessageCircle,
  Briefcase,
  BarChart3,
  Lightbulb,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  DollarSign,
  TrendingUp,
  Zap,
  Layers,
  Target,
  PenTool,
  FileText,
  Gift,
  Megaphone,
} from "lucide-react";
import Header from "./shared/Header";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import ServiceSection from "../components/ServiceSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";
import Footer from "./shared/Footer";

export default function SMECubeLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: <Facebook className="w-10 h-10" />,
      title: "ফেসবুক বুস্টিং",
      desc: "টার্গেটেড অডিয়েন্সে পৌঁছান এবং বিক্রয় বাড়ান",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-50",
      path: "/services/facebook-boosting",
    },
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: "ই-কমার্স সলিউশন",
      desc: "সম্পূর্ণ অনলাইন শপ সেটআপ এবং ম্যানেজমেন্ট",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-50",
      path: "/services/ecommerce-solution",
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "ডেভেলপ ওয়েবসাইট",
      desc: "আধুনিক এবং রেসপন্সিভ ওয়েবসাইট ডেভেলপমেন্ট",
      gradient: "from-purple-500 to-indigo-600",
      iconBg: "bg-purple-50",
      path: "/services/web-development",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "ডোমেইন হোস্টিং",
      desc: "নিরাপদ এবং দ্রুত হোস্টিং সেবা",
      gradient: "from-orange-500 to-red-600",
      iconBg: "bg-orange-50",
      path: "/services/hosting",
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "ল্যান্ডিং পেজ",
      desc: "কনভার্শন অপটিমাইজড ল্যান্ডিং পেজ ডিজাইন",
      gradient: "from-pink-500 to-rose-600",
      iconBg: "bg-pink-50",
      path: "/services/landing-page",
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: "বাল্ক এসএমএস",
      desc: "বাল্ক এসএমএস মার্কেটিং সার্ভিস",
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-50",
      path: "/services/bulk-sms",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "বিজনেস কনসালটিং",
      desc: "ব্যবসায়িক পরামর্শ এবং কৌশল উন্নয়ন",
      gradient: "from-yellow-500 to-orange-600",
      iconBg: "bg-yellow-50",
      path: "/services/business-consulting",
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "ব্র্যান্ড পেইজ সেটআপ",
      desc: "প্রফেশনাল বিজনেস পেজ সেটআপ",
      gradient: "from-cyan-500 to-blue-600",
      iconBg: "bg-cyan-50",
      path: "/services/brand-page-setup",
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "গ্রাফিক ডিজাইন",
      desc: "লোগো, ব্যানার এবং ব্র্যান্ডিং ডিজাইন",
      gradient: "from-violet-500 to-purple-600",
      iconBg: "bg-violet-50",
      path: "/services/graphic-design",
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "চাটবট সেটআপ",
      desc: "অটোমেটেড কাস্টমার সাপোর্ট সিস্টেম",
      gradient: "from-teal-500 to-cyan-600",
      iconBg: "bg-teal-50",
      path: "/services/chatbot-setup",
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "ইস্যু ফিক্সিং",
      desc: "বিশেষ প্যাকেজ এবং অফার",
      gradient: "from-rose-500 to-pink-600",
      iconBg: "bg-rose-50",
      path: "/services/issue-fixing",
    },
    {
      icon: <Megaphone className="w-10 h-10" />,
      title: "বিজনেস ট্রেনিং",
      desc: "ডিজিটাল মার্কেটিং প্রশিক্ষণ",
      gradient: "from-indigo-500 to-blue-600",
      iconBg: "bg-indigo-50",
      path: "/services/business-training",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "সন্তুষ্ট ক্লায়েন্ট",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "1000+",
      label: "সম্পন্ন প্রজেক্ট",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "দক্ষ টিম মেম্বার",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "সাপোর্ট সেবা",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const features = [
    {
      title: "দ্রুত ডেলিভারি",
      desc: "সময়মতো প্রজেক্ট সম্পন্ন করা আমাদের প্রতিশ্রুতি",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "সাশ্রয়ী মূল্য",
      desc: "বাজেট-বান্ধব প্যাকেজ সকল ব্যবসার জন্য",
      icon: <DollarSign className="w-8 h-8" />,
    },
    {
      title: "২৪/৭ সাপোর্ট",
      desc: "যেকোনো সময় আমরা আপনার সাথে আছি",
      icon: <Phone className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Services Section */}
      <ServiceSection services={services} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
