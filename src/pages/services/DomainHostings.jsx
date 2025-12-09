import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import domainHostingService from "../../services/domainHostingService";
import { ArrowRight, ChevronRight } from "lucide-react";
import ShareButton from "../../components/ShareButton";

// নতুন আইকনগুলো (তোমার admin IconLibrary থেকে)
import {
  DomainSearchIcon,
  LivewebsiteIcon,
  PaymentIcon,
  SelectPackageIcon,
} from "../../components/admin/IconLibrary";

// পুরোনো ফিচার আইকনগুলো (যদি দরকার হয়)
import domainIcon from "../../assets/icones/domainhosting/domain.svg";
import ssdIcon from "../../assets/icones/domainhosting/ssd.svg";
import sslIcon from "../../assets/icones/domainhosting/ssl.svg";
import upIcon from "../../assets/icones/domainhosting/uptime.svg";
import cpanelIcon from "../../assets/icones/domainhosting/cpanel.svg";
import supportIcon from "../../assets/icones/domainhosting/customer-care.svg";

// Icon mapping for features (যদি API থেকে আসে)
const ICONS = {
  domain: domainIcon,
  ssd: ssdIcon,
  ssl: sslIcon,
  uptime: upIcon,
  cpanel: cpanelIcon,
  support: supportIcon,
};

const DomainHostings = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    domainHostingService
      .getPageData()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const { hero = {}, features = [], packages = [], steps = [], cta = {}, seo = {} } = data || {};

  // Fallback data
  const defaultHero = {
    title: "ডোমেইন ও হোস্টিং সার্ভিস",
    description: "আপনার ওয়েবসাইটের ভিত্তি তৈরি করুন আমাদের নির্ভরযোগ্য ডোমেইন ও হোস্টিং সার্ভিসের মাধ্যমে।",
    ctaPrimary: "এখনই অর্ডার করুন",
  };

  const defaultCta = {
    title: "দ্রুত ও নিরাপদ ওয়েব হোস্টিং আজই শুরু করুন!",
    description: "আমাদের টিমের সহায়তায় আপনার ওয়েবসাইটকে নিয়ে যান পরবর্তী স্তরে।",
    ctaPrimary: "এখনই যোগাযোগ করুন",
  };

  const safeHero = { ...defaultHero, ...hero };
  const safeCta = { ...defaultCta, ...cta };

  // SEO Data with fallbacks
  const seoTitle = seo?.meta_title || `${safeHero.title} - SME CUBE`;
  const seoDescription = seo?.meta_description || safeHero.description;
  const seoKeywords = seo?.meta_keywords || 'ডোমেইন, হোস্টিং, ওয়েব হোস্টিং';
  const seoImage = seo?.og_image || hero?.image || '/images/default-og.jpg';
  const canonicalUrl = seo?.canonical_url || window.location.href;
  const currentUrl = window.location.href;

  // Icon mapping for process steps
  const stepIconMap = {
    'DomainSearchIcon': DomainSearchIcon,
    'SelectPackageIcon': SelectPackageIcon,
    'PaymentIcon': PaymentIcon,
    'LivewebsiteIcon': LivewebsiteIcon,
  };

  // Transform steps to add Icon components from backend data
  const displaySteps = (steps || []).map((step) => ({
    ...step,
    Icon: stepIconMap[step.icon_name] || DomainSearchIcon,
  }));

  // Animations
  const fadeIn = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

  return (
    <div className="text-gray-800 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 min-h-screen">
      
      {/* ==================== SEO META TAGS ==================== */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        {seo?.canonical_url && <link rel="canonical" href={seo.canonical_url} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={seo?.og_type || 'website'} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:locale" content={seo?.og_locale || 'bn_BD'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={seo?.twitter_card || 'summary_large_image'} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        
        {/* Robots */}
        <meta name="robots" content={`${seo?.meta_robots_index !== false ? 'index' : 'noindex'}, ${seo?.meta_robots_follow !== false ? 'follow' : 'nofollow'}`} />
        
        {/* Schema.org structured data */}
        {seo?.faq_items && seo.faq_items.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": seo.faq_items.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        )}
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": seo?.schema_type || "Service",
            "name": seoTitle,
            "description": seoDescription,
            "provider": {
              "@type": "Organization",
              "name": "SME CUBE"
            },
            "areaServed": "BD",
            "availableLanguage": ["bn", "en"]
          })}
        </script>
      </Helmet>

      {/* ==================== HERO SECTION – সার্ভার ইলাস্ট্রেশন সহ ==================== */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white"
      >
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 opacity-25 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-25 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600 opacity-15 rounded-full blur-3xl"></div>
        </div>

        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,50 Q360,15 720,50 T1440,50 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.12)" />
        </svg>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 to-orange-100 drop-shadow-lg">
                  {safeHero.title}
                </span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-orange-100 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90 mb-10">
                {safeHero.description}
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link to="/contact" className="group inline-flex items-center gap-4 bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-400/50 hover:scale-105 transition-all duration-300">
                  {safeHero.ctaPrimary}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right: Server Illustration */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <motion.div className="relative scale-90 md:scale-95" variants={scaleIn}>
                <div className="relative w-96 h-96">

                  {/* Main Server Rack */}
                  <div className="absolute inset-x-20 top-6 w-56 h-[420px]">
                    <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
                      <div
                        className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-800"
                        style={{ transform: "rotateX(7deg) scaleY(0.93)", transformOrigin: "top center" }}
                      >
                        <div className="flex gap-3 p-5 justify-center pt-8">
                          <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/80"></div>
                          <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse delay-200 shadow-lg shadow-blue-400/80"></div>
                          <div className="w-5 h-5 bg-red-400 rounded-full animate-pulse delay-500 shadow-lg shadow-red-400/80"></div>
                        </div>

                        <div className="space-y-6 px-8 mt-6">
                          <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-between px-6 shadow-inner border border-gray-700">
                            <div className="w-10 h-10 bg-cyan-500 rounded-lg animate-pulse shadow-lg"></div>
                            <span className="text-green-400 font-bold text-sm tracking-widest">UP</span>
                          </div>
                          <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-between px-6 shadow-inner border border-gray-700">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg shadow-lg"></div>
                            <span className="text-green-400 font-bold text-sm tracking-widest">SYNC</span>
                          </div>
                          <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-between px-6 shadow-inner border border-gray-700">
                            <div className="w-10 h-10 bg-orange-500 rounded-lg animate-pulse shadow-lg"></div>
                            <span className="text-green-400 font-bold text-sm tracking-widest">LIVE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Cards */}
                  <motion.div
                    className="absolute top-16 -left-28 w-44 h-32 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white font-black border-4 border-white -rotate-6 z-50 px-4"
                    animate={{ y: [-12, -24, -12] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-3xl leading-tight">NVMe</div>
                    <div className="text-4xl leading-none -mt-1">Cloud</div>
                    <div className="text-xs font-bold opacity-90 mt-2 tracking-wider">99.99% • Lightning Fast</div>
                  </motion.div>

                  <motion.div
                    className="absolute top-10 right-6 w-24 h-24 bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 rounded-3xl shadow-2xl flex items-center justify-center text-white font-black text-2xl border-4 border-white rotate-12"
                    animate={{ rotate: [12, 18, 12] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    SSD
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ==================== PROCESS SECTION – নতুন ডিজাইন ==================== */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 lg:mb-24" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                অর্ডার প্রসেস
              </span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">মাত্র ৪টি সহজ ধাপে আপনার প্রজেক্ট শুরু করুন</p>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row items-start justify-center gap-8 lg:gap-16 xl:gap-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {displaySteps.map((item, index) => (
              <React.Fragment key={index}>
                <motion.div className="flex flex-col items-center text-center flex-1 max-w-xs lg:max-w-sm" variants={fadeIn}>
                  <item.Icon className="w-12 h-12 mb-4 lg:w-32 lg:h-32 text-orange-600 transition-all hover:scale-110" />
                  <span className="text-sm lg:text-base font-bold text-orange-600 tracking-wider mb-3 block">{item.step}</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed px-2">{item.description}</p>
                </motion.div>

                {index < displaySteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-full">
                    <ChevronRight className="w-10 h-10 lg:w-14 lg:h-14 mt-2 lg:mt-6 text-orange-400/60" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-8 mt-12 md:hidden">
            <ChevronRight className="w-9 h-9 text-orange-400/60" />
            <ChevronRight className="w-9 h-9 text-orange-400/60" />
            <ChevronRight className="w-9 h-9 text-orange-400/60" />
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      {features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                সার্ভিস ফিচার
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                আমাদের হোস্টিং সেবার অসাধারণ বৈশিষ্ট্য জানুন
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center h-full"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <img className="w-8 h-8" src={ICONS[feature.icon] || domainIcon} alt={feature.title} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ==================== PACKAGES SECTION ==================== */}
      {packages.length > 0 && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                হোস্টিং প্যাকেজসমূহ
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">আপনার ওয়েবসাইটের প্রয়োজন অনুযায়ী সঠিক প্যাকেজ নির্বাচন করুন।</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, i) => {
                const buttonHref = pkg.button_link?.trim() || "/contact";
                const isExternal = pkg.button_link?.trim() && !buttonHref.startsWith("/");
                const ButtonComponent = isExternal ? "a" : Link;
                const buttonProps = isExternal
                  ? { href: buttonHref, target: "_blank", rel: "noopener noreferrer" }
                  : { to: buttonHref };

                return (
                  <motion.div
                    key={i}
                    className={`rounded-3xl p-8 transition-all ${ 
                      pkg.popular
                        ? "bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl hover:-translate-y-3"
                        : "bg-gray-50 shadow-lg hover:shadow-2xl hover:-translate-y-3"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {pkg.popular && (
                      <div className="bg-yellow-400 text-orange-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">জনপ্রিয়</div>
                    )}
                    <h3 className="text-2xl font-bold mb-4 text-center">{pkg.name}</h3>
                    <div className="text-center mb-6">
                      <span className="text-5xl font-black">৳{pkg.price}</span>
                      <span className={`text-base ml-3 ${
                        pkg.popular ? "text-orange-100" : "text-gray-600"
                      }`}>/ {pkg.duration}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start justify-center">
                          <span className="mr-2">✓</span>
                          <span className={pkg.popular ? "text-orange-50" : "text-gray-700"}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <ButtonComponent
                      {...buttonProps}
                      className={`block text-center w-full p-3 rounded-xl font-bold transition ${
                        pkg.popular
                          ? "bg-white text-orange-600 hover:bg-gray-100"
                          : "bg-orange-600 text-white hover:bg-orange-700"
                      }`}
                    >
                      অর্ডার করুন
                    </ButtonComponent>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-12 text-center shadow-2xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">{safeCta.title}</h3>
            <p className="text-orange-100 text-xl mb-8 max-w-2xl mx-auto">{safeCta.description}</p>
            <motion.button
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {safeCta.ctaPrimary}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ==================== FLOATING SHARE BUTTON (Bottom Right) ==================== */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <ShareButton 
            title={seoTitle}
            description={seoDescription}
            floating={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DomainHostings;