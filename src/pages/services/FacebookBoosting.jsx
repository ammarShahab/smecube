import React, { useState, useEffect } from "react";
import { ArrowRight, Heart, Eye, MessageCircle, TrendingUp, Share2, X, ChevronRight, Zap, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import facebookBoostingService from "../../services/facebookBoostingService";
import IconLibrary from "../../components/admin/IconLibrary";
import FacebookBoostingHeroSVG from "../../components/animations/FacebookBoostingHeroSVG";
import {
  AudienceResearchIcon,
  CampaignSetupIcon,
  AnalyticsTrackingIcon,
  OptimizationIcon,
} from "../../components/servicesPage/facebookBoosting/Icons";

const FacebookBoosting = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    budget: "",
    mobile: "",
    pageLink: "",
    postLink: "",
    minAge: "18",
    maxAge: "65",
    location: "",
    days: "1",
    submittedBy: ""
  });

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      const response = await facebookBoostingService.getPageData();
      const pageData = response.data;

      // Process items already have icon_name from admin, no need to add hardcoded Icons
      const processWithIcons = Array.isArray(pageData.process)
        ? pageData.process.map((step) => ({
            ...step,
            // icon_name is already set from admin, fallback to 'target' if not set
            icon_name: step.icon_name || 'target'
          }))
        : [];

      setData({
        ...pageData,
        process: processWithIcons,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading page data:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const response = await facebookBoostingService.submitForm(formData);
      if (response.data.success) {
        setSubmitSuccess(true);
        setFormData({
          budget: "", mobile: "", pageLink: "", postLink: "",
          minAge: "18", maxAge: "65", location: "", days: "1", submittedBy: ""
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('ফর্ম সাবমিট করতে সমস্যা হয়েছে! পরে আবার চেষ্টা করুন।');
    } finally {
      setSubmitLoading(false);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
      </div>
    </div>
  );
  if (!data) return <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50"><div className="text-2xl font-semibold text-red-600">ডেটা লোড করা যায়নি</div></div>;

  const { hero = {}, features = [], formLabels = [], process = [], packages = [] } = data;

  // Lucide icon mapping for features
  const featureIconMap = {
    "টার্গেটেড অডিয়েন্স": Target,
    "সঠিক কাস্টমারদের কাছে পৌঁছান": Target,
    "এনালিটিক্স রিপোর্ট": BarChart3,
    "বিস্তারিত পারফরমেন্স ট্র্যাকিং": BarChart3,
    "বাজেট অপটিমাইজেশন": TrendingUp,
    "সর্বোচ্চ ROI নিশ্চিত করুন": TrendingUp,
    "দ্রুত রেজাল্ট": Zap,
    "১-২ দিনে ফলাফল দেখুন": Zap,
  };

  return (
    <div className="font-sans bg-gradient-to-br from-slate-50 via-yellow-50/20 to-white min-h-screen text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        .font-hind { font-family: 'Hind Siliguri', sans-serif; }
      `}</style>

      {/* HERO SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}
        className="h-[80vh] flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden relative">
        {/* ... (hero content same as before - unchanged) */}
        <div className="w-full mx-[15%] h-full flex items-center relative z-10">
          <div className="flex-1 pr-12 max-w-2xl">
            <motion.h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" variants={fadeIn}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-200 font-hind">
                {hero.title}
              </span>
            </motion.h1>
            <motion.p className="text-xl text-yellow-100 font-light leading-relaxed max-w-xl opacity-90 font-hind mb-10" variants={fadeIn}>{hero.description}</motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn}>
              <button onClick={() => setShowModal(true)} className="group bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-yellow-400/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 font-hind min-w-[200px]">
                {hero.cta1} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="border-2 border-white/70 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all hover:scale-105 font-hind min-w-[200px] backdrop-blur-sm">
                {hero.cta2}
              </button>
            </motion.div>
          </div>
          {/* Right side - Animated SVG */}
          <motion.div
            className="flex-1 flex justify-end items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <FacebookBoostingHeroSVG />
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES SECTION – Ecommerce Style */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-hind">
        কেন আমাদের সেবা বেছে নেবেন?
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto font-hind">
        প্রমাণিত ফলাফল, দ্রুত রেজাল্ট এবং সর্বোচ্চ ROI
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, idx) => {
        // Use different gradient colors for each feature
        const gradients = [
          'from-indigo-500 to-purple-600',
          'from-pink-500 to-red-600',
          'from-blue-500 to-cyan-600',
          'from-green-500 to-emerald-600'
        ];
        const currentGradient = gradients[idx % gradients.length];

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${currentGradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
              {feature.icon ? (
                <IconLibrary name={feature.icon} size={28} color="white" />
              ) : (
                <Target className="w-9 h-9 text-white" />
              )}
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 font-hind">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-hind">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

     {/* PROCESS SECTION – Ecommerce Style (Clean, Circle Icons, Zoomed Out) */}
<section className="py-20 lg:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    {/* Header */}
    <div className="text-center mb-16 lg:mb-24">
      <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg mb-6">
        আমাদের কাজের প্রক্রিয়া
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight font-hind">
        সহজ এবং{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          স্ট্রেইটফরওয়ার্ড
        </span>{" "}
        প্রক্রিয়া
      </h2>
      <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-hind">
        চারটি সহজ ধাপে আপনার ফেসবুক এডস সুপারচার্জ করি
      </p>
    </div>

    {/* 4 Steps Horizontal Flow */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 items-start">
      {process.map((item, index) => {
        // Use different colors for each process step
        const stepColors = [
          'text-indigo-600',
          'text-pink-600',
          'text-blue-600',
          'text-green-600'
        ];
        const currentColor = stepColors[index % stepColors.length];

        return (
          <div key={index} className="flex flex-col items-center text-center group">
            {/* Icon - Small Size with variety */}
            <div className={`mb-8 ${currentColor}`}>
              {item.icon_name ? (
                <IconLibrary name={item.icon_name} size={48} color="currentColor" />
              ) : item.Icon ? (
                <item.Icon className="w-12 h-12" />
              ) : (
                <Target className="w-12 h-12" />
              )}
            </div>

            {/* Step Number */}
            <span className={`text-sm font-bold ${currentColor} tracking-wider mb-3`}>
              {item.step}
            </span>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-hind leading-tight">
              {item.title}
            </h3>
          </div>
        );
      })}
    </div>

    {/* Mobile Arrows */}
    <div className="flex justify-center gap-6 mt-12 md:hidden">
      <ChevronRight className="w-8 h-8 text-purple-400 rotate-90" />
      <ChevronRight className="w-8 h-8 text-purple-400 rotate-90" />
      <ChevronRight className="w-8 h-8 text-purple-400 rotate-90" />
    </div>
  </div>
</section>
      {/* FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-10 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-center mb-8 font-hind bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent"
                initial="hidden"
                animate="show"
                variants={fadeIn}
              >
                Boosting Order Form
              </motion.h2>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center font-hind"
                >
                  আপনার অর্ডার সফলভাবে সাবমিট হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </motion.div>
              )}

              <div className="space-y-4">
                {formLabels.map((field, i) => (
                  <div key={i}>
                    <label className="block font-semibold mb-1 font-hind text-gray-700">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-400 focus:outline-none text-gray-800 font-hind"
                      >
                        <option value="1">১ দিন</option>
                        <option value="3">৩ দিন</option>
                        <option value="7">৭ দিন</option>
                        <option value="14">১৪ দিন</option>
                        <option value="30">৩০ দিন</option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-400 focus:outline-none text-gray-800 font-hind"
                      />
                    )}
                  </div>
                ))}

                <div>
                  <label className="block font-semibold mb-1 font-hind text-gray-700">ইমেইল বা নাম (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    name="submittedBy"
                    value={formData.submittedBy}
                    onChange={handleChange}
                    placeholder="আপনার ইমেইল বা নাম"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-400 focus:outline-none text-gray-800 font-hind"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className={`w-full bg-gradient-to-r from-indigo-500 to-purple-400 hover:from-indigo-600 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 mt-6 font-hind text-lg ${
                    submitLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitLoading ? 'সাবমিট হচ্ছে...' : 'অর্ডার করুন →'}
                </button>

                <p className="text-sm text-gray-600 text-center mt-4 font-hind">
                  * যেকোনো ফিল্ড পূরণ করলেই ফর্ম সাবমিট করা যাবে
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* FORM SECTION - CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-[15%] text-center relative z-10">
          <motion.div
            className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 font-hind text-white"
                variants={fadeIn}
              >
                শুরু করতে প্রস্তুত?
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto font-hind mb-10 leading-relaxed"
                variants={fadeIn}
              >
                আজই আপনার ফেসবুক ক্যাম্পেইন বুস্ট করুন এবং আপনার ব্যবসা বৃদ্ধি করুন।
              </motion.p>
              <motion.button
                onClick={() => setShowModal(true)}
                className="group relative bg-white text-purple-800 px-12 py-6 rounded-2xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3 font-hind mx-auto overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                
                <span className="relative z-10">এখনই শুরু করুন</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION */}
      {packages && packages.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-[15%]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">বুস্টিং প্যাকেজসমূহ</h2>
              <p className="text-lg text-gray-600">আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজ নির্বাচন করুন</p>
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
                        <svg className={`w-5 h-5 ${pkg.popular ? "text-yellow-300" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={pkg.popular ? "text-gray-100" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowModal(true)}
                    className={`block w-full text-center py-3 rounded-full font-bold transition ${
                      pkg.popular
                        ? "bg-white text-purple-600 hover:bg-gray-100"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                    }`}
                  >
                    অর্ডার করুন
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FacebookBoosting;