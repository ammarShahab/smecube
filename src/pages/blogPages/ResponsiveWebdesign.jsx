import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, MessageCircle, Smartphone, Monitor, Tablet, Globe, Search } from 'lucide-react';
import RelatedBlogs from '../../components/RelatedBlogs';
const ResponsiveWebDesign = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" /> সব ব্লগ দেখুন
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" /> <span>ওয়েব ডেভেলপমেন্ট</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            কেন আপনার ওয়েবসাইট রেসপন্সিভ হওয়া উচিত?
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2"><User className="w-5 h-5" /><span className="font-medium">রাকিবুল ইসলাম</span></div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /><span>৫ অক্টোবর, ২০২৫</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>৬ মিনিট পড়া</span></div>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8"></div>
        </motion.header>

        {/* Image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-8">
          <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80"
               alt="Responsive Design" className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"/>
        </motion.div>

        {/* Content */}
        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="prose prose-lg max-w-none">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 pl-6 py-4 mb-8 rounded-r-lg">
            <p className="text-indigo-800 font-semibold text-lg">
              রেসপন্সিভ ওয়েব ডিজাইনের গুরুত্ব এবং এটি আপনার ব্যবসার জন্য কীভাবে উপকারী।
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">রেসপন্সিভ ডিজাইন কী?</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            একই ওয়েবসাইট যা ডেস্কটপ, ট্যাবলেট এবং মোবাইলে সুন্দরভাবে দেখা যায়। 
            CSS Media Queries এবং Flexible Grid ব্যবহার করে লেআউট স্বয়ংক্রিয়ভাবে অ্যাডজাস্ট হয়।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 text-center">
              <Monitor className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">ডেস্কটপ</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 text-center">
              <Tablet className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">ট্যাবলেট</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 text-center">
              <Smartphone className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">মোবাইল</h3>
            </div>
          </div>

          {/* … (rest of the article) … */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">SEO‑এর জন্য রেসপন্সিভ ডিজাইন</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Google Mobile‑First Indexing ব্যবহার করে। রেসপন্সিভ সাইট র‍্যাঙ্কিংয়ে সুবিধা পায়।
          </p>
        </motion.article>

        {/* Action */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                     className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">আপনার ওয়েবসাইট রেসপন্সিভ করতে চান?</h3>
          <Link to="/services/web-development"
                className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:gap-4">
            ওয়েব ডেভেলপমেন্ট সার্ভিস
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>

        {/* Share */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
                     className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
            <button className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>কমেন্ট সেকশন শীঘ্রই আসছে...</span>
          </div>
        </motion.div>
        {/* Related Blogs Section */}
        <RelatedBlogs currentBlogPath="/blogs/business-consulting-guide" />
      </div>
    </div>
  );
};

export default ResponsiveWebDesign;