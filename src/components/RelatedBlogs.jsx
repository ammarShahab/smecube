// src/components/RelatedBlogs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RelatedBlogs = ({ currentBlogPath }) => {
  const blogPosts = [
    {
      id: 1,
      title: "ফেসবুক বুস্টিং দিয়ে আপনার ব্যবসা বাড়ান",
      excerpt: "ফেসবুক বুস্টিং কীভাবে আপনার টার্গেটেড অডিয়েন্সে পৌঁছাতে এবং বিক্রয় বাড়াতে সাহায্য করতে পারে তা জানুন।",
      category: "সোশ্যাল মিডিয়া",
      date: "১৫ অক্টোবর, ২০২৫",
      author: "তানভীর হাসান",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      path: "/blogs/facebook-boosting-guide",
      readTime: "৫ মিনিট",
      featured: true,
    },
    {
      id: 2,
      title: "ই-কমার্স সলিউশন: অনলাইন ব্যবসার ভবিষ্যৎ",
      excerpt: "আধুনিক ই-কমার্স প্ল্যাটফর্মের সুবিধা এবং কীভাবে এটি আপনার ব্যবসাকে রূপান্তরিত করতে পারে।",
      category: "ই-কমার্স",
      date: "১০ অক্টোবর, ২০২৫",
      author: "সারাহ আহমেদ",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      path: "/blogs/ecommerce-solution",
      readTime: "৭ মিনিট",
      featured: false,
    },
    {
      id: 3,
      title: "কেন আপনার ওয়েবসাইট রেসপন্সিভ হওয়া উচিত?",
      excerpt: "রেসপন্সিভ ওয়েব ডিজাইনের গুরুত্ব এবং এটি আপনার ব্যবসার জন্য কীভাবে উপকারী।",
      category: "ওয়েব ডেভেলপমেন্ট",
      date: "৫ অক্টোবর, ২০২৫",
      author: "রাকিবুল ইসলাম",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      path: "/blogs/responsive-web-design",
      readTime: "৬ মিনিট",
      featured: false,
    },
    {
      id: 4,
      title: "বিজনেস কনসালটিং: সফলতার পথে আপনার গাইড",
      excerpt: "ব্যবসায়িক পরামর্শ কীভাবে আপনার কৌশল উন্নত করতে এবং লক্ষ্য অর্জনে সহায়তা করে।",
      category: "বিজনেস কনসালটিং",
      date: "১ অক্টোবর, ২০২৫",
      author: "ফারিয়া রহমান",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      path: "/blogs/business-consulting-guide",
      readTime: "৮ মিনিট",
      featured: true,
    },
  ];

  const relatedPosts = blogPosts
    .filter((post) => post.path !== currentBlogPath)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          আরো ব্লগ দেখুন
        </span>
        <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="related-blogs-swiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {relatedPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link
              to={post.path}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden"
            >
              <div className="relative aspect-square w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      ফিচার্ড
                    </span>
                  </div>
                )}

                {/* Bottom overlay for title */}
                <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-sm p-3 text-center rounded-b-2xl">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .related-blogs-swiper .swiper-button-next,
        .related-blogs-swiper .swiper-button-prev {
          color: #3b82f6;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .related-blogs-swiper .swiper-button-next:hover,
        .related-blogs-swiper .swiper-button-prev:hover {
          background: #ffffff;
          color: #2563eb;
        }
        .related-blogs-swiper .swiper-button-next::after,
        .related-blogs-swiper .swiper-button-prev::after {
          font-size: 20px;
        }
        .related-blogs-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 0.5;
        }
        .related-blogs-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
        }
        .related-blogs-swiper .swiper-slide {
          aspect-ratio: 1 / 1;
        }
      `}</style>
    </motion.div>
  );
};

export default RelatedBlogs;
