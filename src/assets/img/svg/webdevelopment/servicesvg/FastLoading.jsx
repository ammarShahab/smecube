import React from "react";

const FastLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-8 h-8 sm:w-10 sm:h-10"
      role="img"
      aria-label="Swift Loading Icon"
    >
      <defs>
        <linearGradient id="swift-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      {/* <!-- Outer spinning ring --> */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#swift-grad)"
        strokeWidth="6"
        fill="none"
        strokeDasharray="70 30"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* <!-- Inner lightning bolt --> */}
      <path
        d="M50 25 L43 55 L54 55 L47 75 L64 45 L52 45 Z"
        fill="url(#swift-grad)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;10 50 50;-10 50 50;0 50 50"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default FastLoading;
