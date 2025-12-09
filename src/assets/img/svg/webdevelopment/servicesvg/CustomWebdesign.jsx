import React from "react";

const CustomwebDesign = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-8 h-8 sm:w-10 sm:h-10"
    >
      <defs>
        <linearGradient id="grad-main" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="grad-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      <rect
        x="6"
        y="8"
        width="52"
        height="34"
        rx="3.5"
        fill="url(#grad-main)"
      />
      <rect
        x="10.5"
        y="12.5"
        width="45"
        height="25"
        rx="2.5"
        fill="#041025"
        opacity="0.96"
      />
      <rect
        x="14"
        y="16"
        width="36"
        height="6"
        rx="1"
        fill="#0ea5b7"
        opacity="0.16"
      />
      <rect
        x="14"
        y="24"
        width="16"
        height="10"
        rx="1"
        fill="#4f46e5"
        opacity="0.12"
      />
      <rect
        x="34"
        y="24"
        width="16"
        height="10"
        rx="1"
        fill="#60a5fa"
        opacity="0.12"
      />
      <rect
        x="26"
        y="44"
        width="12"
        height="3.5"
        rx="1.5"
        fill="#081226"
        opacity="0.95"
      />
      <rect
        x="18"
        y="48"
        width="28"
        height="3"
        rx="1.5"
        fill="#081226"
        opacity="0.6"
      />
      <g transform="translate(44,10) rotate(18)">
        <path d="M0 0 L7 3 L10 6 L6 10 L3 7 L0 0 Z" fill="url(#grad-accent)" />
        <path d="M7.5 4.5 L9 6 L7 7 L5.5 5.5 Z" fill="#fff" opacity="0.9" />
      </g>
    </svg>
  );
};

export default CustomwebDesign;
