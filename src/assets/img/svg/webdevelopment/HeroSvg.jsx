import React from "react";

const HeroSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      /*   width="240"
      height="240" */
      role="img"
      aria-labelledby="webTitle webDesc"
      className="mx-auto h-24 w-24"
    >
      <title id="webTitle">Web development icon</title>
      <desc id="webDesc">
        A monitor with code brackets and a small gear — represents web
        development and tooling.
      </desc>

      <defs>
        <linearGradient id="g-main" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>

        <linearGradient id="g-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>

        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="18"
            floodColor="#0f172a"
            floodOpacity="0.09"
          />
        </filter>
      </defs>

      {/* Background panel */}
      <rect
        x="16"
        y="28"
        width="208"
        height="136"
        rx="14"
        fill="url(#g-main)"
        filter="url(#shadow)"
      />

      {/* Inner screen */}
      <rect
        x="30"
        y="42"
        width="180"
        height="104"
        rx="8"
        fill="#071023"
        opacity="0.96"
      />

      {/* Code brackets */}
      <path
        d="M74 84 L60 98 L74 112"
        fill="none"
        stroke="#E6F0FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M112 80 L128 120"
        fill="none"
        stroke="#E6F0FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M156 84 L170 98 L156 112"
        fill="none"
        stroke="#E6F0FF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle code lines */}
      <rect
        x="46"
        y="132"
        width="56"
        height="6"
        rx="3"
        fill="#94A3B8"
        opacity="0.9"
      />
      <rect
        x="46"
        y="146"
        width="96"
        height="6"
        rx="3"
        fill="#64748B"
        opacity="0.9"
      />
      <rect
        x="46"
        y="160"
        width="72"
        height="6"
        rx="3"
        fill="#94A3B8"
        opacity="0.9"
      />

      {/* Monitor base */}
      <rect
        x="88"
        y="176"
        width="64"
        height="10"
        rx="5"
        fill="#081226"
        opacity="0.95"
      />
      <rect
        x="72"
        y="188"
        width="96"
        height="8"
        rx="5"
        fill="#081226"
        opacity="0.6"
      />

      {/* Accent chip + gear */}
      <g transform="translate(174,44) scale(0.9)">
        <rect
          x="-14"
          y="-14"
          width="28"
          height="28"
          rx="6"
          fill="url(#g-accent)"
          opacity="0.98"
        />
        <path
          d="M0,-8 L2,-6 M6,-2 L8,0 M6,6 L4,8 M-2,8 L-4,6 M-8,2 L-6,0 M-8,-2 L-6,-4 M-4,-8 L-2,-6"
          stroke="#071023"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="0" r="4" fill="#071023" />
      </g>
    </svg>
  );
};

export default HeroSvg;
