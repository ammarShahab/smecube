import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, MessageCircle, MousePointer, Zap, Target, BarChart3 } from 'lucide-react';
import RelatedBlogs from '../../components/RelatedBlogs';
const LandingPageStrategies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" /> সব ব্লগ দেখুন
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MousePointer className="w-4 h-4" /> <span>ল্যান্ডিং পেজ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            ল্যান্ডিং পেজ ডিজাইনের কৌশল
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2"><User className="w-5 h-5" /><span className="font-medium">আরিফ হোসেন</span></div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /><span>১৫ সেপ্টেম্বর, ২০২৫</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>৬ মিনিট পড়া</span></div>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-8"></div>
        </motion.header>

        {/* Image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-8">
          <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80"
               alt="Landing Page" className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"/>
        </motion.div>

        {/* Content */}
        <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-8 rounded-r-lg">
            <p className="text-blue-800 font-semibold text-lg">
              উচ্চ কনভার্শন রেটের জন্য ল্যান্ডিং পেজ ডিজাইনের সেরা কৌশলগুলো জানুন।
            </p>
          </div>

          {/* … (rest of the article) … */}
        </motion.article>

        {/* Action */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                     className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">ল্যান্ডিং পেজ তৈরি করতে চান?</h3>
          <Link to="/services/landing-page"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:gap-4">
            ল্যান্ডিং পেজ সার্ভিস
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>

        {/* Share */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
                     className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">শেয়ার করুন:</span>
            <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
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

export default LandingPageStrategies;