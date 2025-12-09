import React from 'react';
import { motion } from 'framer-motion';

const WebDevelopmentHeroSVG = () => {
  return (
    <motion.svg
      viewBox="0 0 500 500"
      className="w-full h-full max-w-lg translate-x-16 translate-y-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Background Floating Circles */}
      <motion.circle
        cx="80"
        cy="100"
        r="60"
        fill="rgba(255, 255, 255, 0.05)"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="450"
        cy="380"
        r="80"
        fill="rgba(255, 193, 7, 0.05)"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Monitor - Right Shifted */}
      <motion.rect
        x="120"
        y="60"
        width="280"
        height="200"
        rx="20"
        fill="none"
        stroke="url(#webGradient)"
        strokeWidth="3"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Monitor Bezel */}
      <rect x="120" y="60" width="280" height="200" rx="20" fill="rgba(255, 255, 255, 0.03)" />

      {/* Screen Content - Modern UI Elements */}
      <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
        {/* Header Bar */}
        <rect x="135" y="80" width="250" height="25" fill="rgba(255, 255, 255, 0.15)" rx="4" />
        <circle cx="145" cy="92" r="3" fill="#FFFFFF" />
        <circle cx="157" cy="92" r="3" fill="rgba(255, 255, 255, 0.6)" />
        <circle cx="169" cy="92" r="3" fill="rgba(255, 255, 255, 0.4)" />

        {/* Content Cards */}
        <rect x="135" y="115" width="110" height="60" fill="rgba(255, 255, 255, 0.12)" rx="6" />
        <line x1="145" y1="125" x2="235" y2="125" stroke="rgba(255, 193, 7, 0.8)" strokeWidth="2" />
        <line x1="145" y1="135" x2="225" y2="135" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
        <line x1="145" y1="145" x2="230" y2="145" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />

        <rect x="255" y="115" width="130" height="60" fill="rgba(255, 193, 7, 0.15)" rx="6" />
        <line x1="265" y1="125" x2="375" y2="125" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" />
        <line x1="265" y1="137" x2="370" y2="137" stroke="rgba(255, 193, 7, 0.7)" strokeWidth="1.5" />
        <line x1="265" y1="148" x2="365" y2="148" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />

        {/* Bottom Content */}
        <rect x="135" y="185" width="250" height="55" fill="rgba(255, 255, 255, 0.08)" rx="6" />
        <line x1="145" y1="195" x2="375" y2="195" stroke="rgba(255, 193, 7, 0.9)" strokeWidth="2" />
        <line x1="145" y1="208" x2="370" y2="208" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
        <line x1="145" y1="220" x2="360" y2="220" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
      </motion.g>

      {/* Monitor Stand */}
      <motion.rect
        x="200"
        y="260"
        width="120"
        height="12"
        rx="6"
        fill="url(#webGradient)"
        animate={{ scaleY: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <rect x="220" y="272" width="80" height="8" rx="4" fill="rgba(255, 255, 255, 0.2)" />

      {/* Floating Code Elements - Right Side */}
      <motion.g animate={{ y: [-15, 15, -15], x: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <text x="380" y="120" fontSize="32" fill="#FFFFFF" fontFamily="monospace" fontWeight="bold" opacity="0.9">
          {'<'}
        </text>
      </motion.g>

      <motion.g animate={{ y: [15, -15, 15], x: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}>
        <text x="420" y="280" fontSize="32" fill="rgba(255, 193, 7, 0.85)" fontFamily="monospace" fontWeight="bold">
          {'/'}
          {'>'}
        </text>
      </motion.g>

      {/* CSS Bracket - Left Floating */}
      <motion.g animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
        <text x="60" y="280" fontSize="28" fill="rgba(255, 255, 255, 0.7)" fontFamily="monospace" fontWeight="bold">
          {'{'}
        </text>
      </motion.g>

      <motion.g animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <text x="95" y="350" fontSize="28" fill="rgba(255, 193, 7, 0.75)" fontFamily="monospace" fontWeight="bold">
          {'}'}
        </text>
      </motion.g>

      {/* Animated Dots - Enhanced */}
      <motion.circle
        cx="140"
        cy="380"
        r="5"
        fill="#FFFFFF"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="250"
        cy="400"
        r="5"
        fill="rgba(255, 193, 7, 0.9)"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="360"
        cy="380"
        r="5"
        fill="#FFFFFF"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
      />

      {/* Connecting Lines */}
      <motion.line
        x1="140"
        y1="380"
        x2="250"
        y2="400"
        stroke="rgba(255, 193, 7, 0.3)"
        strokeWidth="1"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.line
        x1="250"
        y1="400"
        x2="360"
        y2="380"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFD54F" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default WebDevelopmentHeroSVG;
