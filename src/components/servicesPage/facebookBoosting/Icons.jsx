// src/components/servicesPage/facebookBoosting/Icons.jsx

import { motion } from "framer-motion";

const IconWrapper = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4, y: 60 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay, ease: "easeOut" }}
    className="flex justify-center"
  >
    <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center p-6">
      {children}
    </div>
  </motion.div>
);

// ধাপ ১: টার্গেটেড অডিয়েন্স
export const AudienceResearchIcon = () => (
  <IconWrapper delay={0.2}>
    <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="3" className="w-full h-full">
      <circle cx="32" cy="16" r="9" fill="white" opacity="0.9"/>
      <circle cx="18" cy="42" r="8" fill="white" opacity="0.7"/>
      <circle cx="46" cy="44" r="10" fill="white" opacity="0.8"/>
      <circle cx="32" cy="48" r="11" fill="white"/>
      <path d="M18 32 Q32 44 46 32" stroke="white" strokeWidth="4" fill="none"/>
    </svg>
  </IconWrapper>
);

// ধাপ ২: ক্যাম্পেইন সেটআপ
export const CampaignSetupIcon = () => (
  <IconWrapper delay={0.4}>
    <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="3" className="w-full h-full">
      <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="4"/>
      <path d="M32 12 L32 32 M12 32 L52 32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <path d="M22 38 L32 52 L42 38 L50 42 L44 32 L50 22 L42 28 L32 12 L22 28 L14 22 L20 32 Z" fill="white"/>
    </svg>
  </IconWrapper>
);

// ধাপ ৩: এনালিটিক্স ট্র্যাকিং
export const AnalyticsTrackingIcon = () => (
  <IconWrapper delay={0.6}>
    <svg viewBox="0 0 64 64" fill="white" className="w-full h-full">
      <rect x="14" y="38" width="8" height="22" rx="4"/>
      <rect x="28" y="24" width="8" height="36" rx="4"/>
      <rect x="42" y="14" width="8" height="46" rx="4"/>
      <path d="M10 56 H54" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
      <circle cx="18" cy="48" r="4" fill="#4f46e5"/>
      <circle cx="32" cy="34" r="4" fill="#4f46e5"/>
      <circle cx="46" cy="24" r="4" fill="#4f46e5"/>
    </svg>
  </IconWrapper>
);

// ধাপ ৪: অপটিমাইজেশন & স্কেল বুস্ট
export const OptimizationIcon = () => (
  <IconWrapper delay={0.8}>
    <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="3" className="w-full h-full">
      <circle cx="32" cy="32" r="22" stroke="white" strokeWidth="4"/>
      <path d="M20 12 L26 28 L44 32 L26 36 L20 52 L16 36 L4 32 L16 28 Z" fill="white"/>
      <circle cx="48" cy="48" r="14" fill="white"/>
      <path d="M48 38 L48 48 L58 48" stroke="#4f46e5" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  </IconWrapper>
);