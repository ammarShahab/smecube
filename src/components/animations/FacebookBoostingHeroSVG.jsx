import React from 'react';
import { motion } from 'framer-motion';

const FacebookBoostingHeroSVG = () => {
  return (
    <motion.svg
      viewBox="0 0 500 500"
      className="w-full h-full max-w-lg translate-y-12 translate-x-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Background Floating Elements */}
      <motion.circle
        cx="80"
        cy="100"
        r="70"
        fill="rgba(24, 119, 242, 0.05)"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="420"
        cy="400"
        r="90"
        fill="rgba(252, 203, 0, 0.05)"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Phone - Right Shifted & Down */}
      <motion.rect
        x="140"
        y="80"
        width="220"
        height="340"
        rx="30"
        fill="none"
        stroke="url(#fbGradient)"
        strokeWidth="3"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Phone Bezel */}
      <rect x="140" y="80" width="220" height="340" rx="30" fill="rgba(255, 255, 255, 0.02)" />

      {/* Phone Screen */}
      <rect x="155" y="100" width="190" height="300" rx="20" fill="#0F1419" />

      {/* Status Bar */}
      <rect x="155" y="100" width="190" height="25" fill="rgba(255, 193, 7, 0.1)" rx="20" />
      <circle cx="165" cy="112" r="2" fill="#FCCB00" />
      <line x1="330" y1="108" x2="338" y2="108" stroke="#FCCB00" strokeWidth="1.5" />
      <line x1="320" y1="108" x2="327" y2="108" stroke="#FCCB00" strokeWidth="1.5" />

      {/* Social Media Stats - Enhanced */}
      <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>
        {/* Post Card 1 */}
        <rect x="165" y="140" width="170" height="50" fill="rgba(24, 119, 242, 0.15)" rx="8" />
        <circle cx="177" cy="155" r="6" fill="#1877F2" />
        <text x="190" y="159" fontSize="10" fill="#FCCB00" fontWeight="bold">Likes: 1.2K</text>

        {/* Post Card 2 */}
        <rect x="165" y="200" width="170" height="50" fill="rgba(236, 72, 153, 0.15)" rx="8" />
        <circle cx="177" cy="215" r="6" fill="#EC4899" />
        <text x="190" y="219" fontSize="10" fill="#FCCB00" fontWeight="bold">Comments: 342</text>

        {/* Post Card 3 */}
        <rect x="165" y="260" width="170" height="50" fill="rgba(16, 185, 129, 0.15)" rx="8" />
        <circle cx="177" cy="275" r="6" fill="#10B981" />
        <text x="190" y="279" fontSize="10" fill="#FCCB00" fontWeight="bold">Reach: 45K</text>
      </motion.g>

      {/* Trending Up Arrow */}
      <motion.g animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M 380 140 L 400 110 L 410 135" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="375" y="165" fontSize="13" fill="#10B981" fontWeight="bold">+320%</text>
      </motion.g>

      {/* Target/Audience Circles - Left Side */}
      <motion.circle
        cx="100"
        cy="250"
        r="35"
        fill="none"
        stroke="url(#fbGradient)"
        strokeWidth="2.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, linear: true }}
      />
      <motion.circle
        cx="100"
        cy="250"
        r="22"
        fill="none"
        stroke="#FCCB00"
        strokeWidth="2"
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, linear: true }}
      />
      <circle cx="100" cy="250" r="10" fill="#FCCB00" />

      {/* Budget Indicator - Right Side */}
      <motion.rect
        x="410"
        y="180"
        width="60"
        height="80"
        rx="8"
        fill="rgba(24, 119, 242, 0.1)"
        stroke="#1877F2"
        strokeWidth="2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <text x="440" y="205" fontSize="14" fill="#FCCB00" fontWeight="bold" textAnchor="middle">
        Budget
      </text>
      <text x="440" y="230" fontSize="16" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
        $5K
      </text>
      <text x="440" y="250" fontSize="11" fill="rgba(255, 255, 255, 0.7)" textAnchor="middle">
        Allocated
      </text>

      {/* Floating Engagement Particles */}
      <motion.circle
        cx="80"
        cy="380"
        r="6"
        fill="#FFFFFF"
        animate={{ scale: [1, 1.7, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="250"
        cy="420"
        r="6"
        fill="rgba(252, 203, 0, 0.95)"
        animate={{ scale: [1, 1.7, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="390"
        cy="390"
        r="6"
        fill="#1877F2"
        animate={{ scale: [1, 1.7, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
      />

      {/* Connecting Pulse Lines */}
      <motion.line
        x1="80"
        y1="380"
        x2="250"
        y2="420"
        stroke="rgba(252, 203, 0, 0.3)"
        strokeWidth="1.5"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.line
        x1="250"
        y1="420"
        x2="390"
        y2="390"
        stroke="rgba(24, 119, 242, 0.3)"
        strokeWidth="1.5"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Left Side Code Elements */}
      <motion.g animate={{ y: [-10, 20, -10], x: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <text x="40" y="160" fontSize="28" fill="rgba(252, 203, 0, 0.8)" fontFamily="monospace" fontWeight="bold">
          {'<'}
        </text>
      </motion.g>

      <motion.g animate={{ y: [15, -15, 15], x: [5, -5, 5] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
        <text x="50" y="340" fontSize="28" fill="rgba(255, 255, 255, 0.7)" fontFamily="monospace" fontWeight="bold">
          {'/'}
          {'>'}
        </text>
      </motion.g>

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="fbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1877F2" />
          <stop offset="50%" stopColor="#FCCB00" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default FacebookBoostingHeroSVG;
