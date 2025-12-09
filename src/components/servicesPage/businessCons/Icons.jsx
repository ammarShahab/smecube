// src/components/servicesPage/businessCons/Icons.jsx
// কোনো IconLibrary লাগবে না – সবকিছু এখানেই আছে

import { motion } from "framer-motion";

// সরাসরি SVG দিয়ে আইকনগুলো দিলাম – হালকা, দ্রুত, কোনো এরর হবে না

export const DiscussionIcon = ({ className = "w-28 h-28", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      <path d="M7 9h10v2H7zm0 4h7v2H7z"/>
    </svg>
  </motion.div>
);

export const ThinkIcon = ({ className = "w-28 h-28", delay = 0.1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm-6.06 4c.63-1.25 4.15-2 6.06-2 1.91 0 5.43.75 6.06 2H2.94z"/>
      <circle cx="9" cy="8" r="1.5"/>
    </svg>
  </motion.div>
);

export const DeliveryIcon = ({ className = "w-28 h-28", delay = 0.2 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zM18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  </motion.div>
);

export const SupportFollowupIcon = ({ className = "w-28 h-28", delay = 0.3 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z"/>
      <path d="M20 17h-2v-2h-2v2h-2v2h2v2h2v-2h2z"/>
    </svg>
  </motion.div>
);

export const ChevronRight = ({ className = "w-12 h-12" }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex justify-center"
  >
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  </motion.div>
);