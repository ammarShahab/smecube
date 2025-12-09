import React from 'react';
import { Link } from "react-router";

const services = [
  { 
    icon: "📘", 
    title: "ফেসবুক বুস্টিং", 
    color: "bg-blue-50", 
    borderColor: "border-blue-200",
    link: "/services/facebook-boosting"
  },
  { 
    icon: "🛒", 
    title: "ই-কমার্স সলুশন", 
    color: "bg-green-50", 
    borderColor: "border-green-200",
    link: "/services/ecommerce-solution"
  },
  { 
    icon: "💻", 
    title: "ডেভেলপ ওয়েবসাইট", 
    color: "bg-sky-50", 
    borderColor: "border-sky-200",
    link: "/services/web-development"
  },
  { 
    icon: "📊", 
    title: "ডোমেইন হোস্টিং", 
    color: "bg-violet-50", 
    borderColor: "border-violet-200",
    link: "/services/domain-hosting"
  },
  { 
    icon: "📄", 
    title: "ল্যান্ডিং পেজ", 
    color: "bg-orange-50", 
    borderColor: "border-orange-200",
    link: "/services/landing-page"
  },
  { 
    icon: "💬", 
    title: "বাল্ক এসএমএস", 
    color: "bg-purple-50", 
    borderColor: "border-purple-200",
    link: "/services/bulk-sms"
  },
  { 
    icon: "👥", 
    title: "বিজনেস কনসাল্টিং", 
    color: "bg-yellow-50", 
    borderColor: "border-yellow-200",
    link: "/services/business-consulting"
  },
  { 
    icon: "📝", 
    title: "ব্র্যান্ড পেইজ সেটআপ", 
    color: "bg-cyan-50", 
    borderColor: "border-cyan-200",
    link: "/services/brand-page-setup"
  },
  { 
    icon: "💡", 
    title: "গ্রাফিক ডিজাইন", 
    color: "bg-pink-50", 
    borderColor: "border-pink-200",
    link: "/services/graphic-design"
  },
  { 
    icon: "🤖", 
    title: "চ্যাটবট সেটআপ", 
    color: "bg-teal-50", 
    borderColor: "border-teal-200",
    link: "/services/chatbot-setup"
  },
  { 
    icon: "🧰", 
    title: "ইইস্যু ফিক্সিং", 
    color: "bg-red-50", 
    borderColor: "border-red-200",
    link: "services/ui-features"
  },
  { 
    icon: "🗂️", 
    title: "বিজনেস ট্রেইনিং", 
    color: "bg-indigo-50", 
    borderColor: "border-indigo-200",
    link: "/services/business-training"
  },
];

const features = [
  {
    icon: "⚡",
    title: "দ্রুত ডেলিভারি",
    description: "সময়মতো প্রজেক্ট সম্পন্ন"
  },
  {
    icon: "🏆",
    title: "মান নিশ্চিত",
    description: "উচ্চমানের সেবা প্রদান"
  },
  {
    icon: "💰",
    title: "সাশ্রয়ী মূল্য",
    description: "বাজেট বান্ধব প্যাকেজ"
  },
  {
    icon: "🔒",
    title: "নিরাপত্তা",
    description: "১০০% ডেটা সুরক্ষা"
  }
];

const stats = [
  { number: "১০০০+", label: "সন্তুষ্ট ক্লায়েন্ট" },
  { number: "৫০০+", label: "সম্পন্ন প্রজেক্ট" },
  { number: "৫+", label: "বছরের অভিজ্ঞতা" },
  { number: "৯৮%", label: "সফলতার হার" }
];

const testimonials = [
  {
    name: "মোঃ রহিম উদ্দিন",
    role: "ই-কমার্স উদ্যোক্তা",
    text: "SME CUBE আমার ব্যবসাকে অনলাইনে নিয়ে যেতে অসাধারণ সাহায্য করেছে। তাদের সেবা সত্যিই প্রশংসনীয়।",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    name: "ফাতেমা আক্তার",
    role: "রেস্টুরেন্ট মালিক",
    text: "দ্রুত এবং মানসম্মত কাজের জন্য তাদের ধন্যবাদ। আমার ওয়েবসাইট এখন অনেক বেশি গ্রাহক আনছে।",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    name: "কামাল হোসেন",
    role: "শিক্ষা প্রতিষ্ঠান পরিচালক",
    text: "পেশাদার টিম এবং চমৎকার সাপোর্ট। আমি সবাইকে তাদের সেবা নেওয়ার পরামর্শ দিব।",
    rating: 5,
    avatar: "👨‍🏫"
  }
];

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              আপনার ব্যবসাকে ডিজিটাল যুগে <br />
              <span className="text-yellow-300">নিয়ে যান আমাদের সাথে</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              SME CUBE - ছোট ও মাঝারি ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সলিউশন। 
              আমরা আপনার স্বপ্নকে বাস্তবে পরিণত করি।
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/services"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
              >
                সেবা দেখুন →
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all"
              >
                যোগাযোগ করুন
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              কেন <span className="text-red-500">SME CUBE</span> বেছে নেবেন?
            </h2>
            <p className="text-lg text-gray-600">আমরা প্রদান করি সেরা মানের সেবা</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              নিচ থেকে <span className="text-red-500 underline decoration-2 decoration-red-500">সার্ভিস</span> সিলেক্ট করুন
            </h2>
            <p className="text-lg text-gray-600">আপনার ব্যবসার জন্য উপযুক্ত সেবা খুঁজে নিন</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <Link
                key={i}
                to={svc.link}
                className={`w-full h-40 ${svc.color} rounded-2xl flex flex-col items-center justify-center shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 ${svc.borderColor} group`}
              >
                <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {svc.icon}
                </span>
                <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors text-center px-2">
                  {svc.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transform hover:scale-105 transition-all shadow-lg inline-block"
            >
              সব সেবা দেখুন →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              আমাদের ক্লায়েন্টরা কি বলেন
            </h2>
            <p className="text-lg text-gray-600">সন্তুষ্ট ক্লায়েন্টদের মতামত</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="text-5xl mr-4">{testimonial.avatar}</div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            আপনার ব্যবসা শুরু করুন আজই!
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            আমাদের বিশেষজ্ঞ টিম আপনার সফলতার জন্য প্রস্তুত
          </p>
          <Link
            to="/contact"
            className="bg-white text-red-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl inline-block"
          >
            ফ্রি কনসালটেশন বুক করুন →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
