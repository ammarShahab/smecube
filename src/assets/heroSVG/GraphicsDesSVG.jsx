import React from "react";


const GraphicsDesSVG = () => {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* Background circle with pulse */}
      <circle cx="200" cy="200" r="180" fill="url(#bgGradient)" opacity="0.2">
        <animate
          attributeName="r"
          values="180;190;180"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>


      {/* Gradient definitions */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>


        <linearGradient id="penGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#f5576c" />
        </linearGradient>


        <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>


        <linearGradient
          id="paletteGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
      </defs>


      {/* Rotating design elements circle */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 200 200"
          to="360 200 200"
          dur="20s"
          repeatCount="indefinite"
        />


        {/* Pen tool icon */}
        <g transform="translate(200, 80)">
          <path
            d="M -8,-8 L 8,8 L 4,12 L -12,4 Z"
            fill="url(#penGradient)"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </g>


        {/* Brush icon */}
        <g transform="translate(280, 160)">
          <rect
            x="-6"
            y="-15"
            width="12"
            height="30"
            rx="2"
            fill="url(#brushGradient)"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="-360 0 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </rect>
        </g>


        {/* Color palette */}
        <g transform="translate(280, 240)">
          <ellipse
            cx="0"
            cy="0"
            rx="15"
            ry="12"
            fill="url(#paletteGradient)"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <circle cx="-6" cy="-3" r="3" fill="#f093fb" />
          <circle cx="6" cy="-3" r="3" fill="#4facfe" />
          <circle cx="0" cy="4" r="3" fill="#43e97b" />
        </g>


        {/* Ruler icon */}
        <g transform="translate(200, 320)">
          <rect
            x="-20"
            y="-4"
            width="40"
            height="8"
            rx="1"
            fill="#ffd89b"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <line
            x1="-15"
            y1="-4"
            x2="-15"
            y2="4"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="-10"
            y1="-2"
            x2="-10"
            y2="4"
            stroke="#333"
            strokeWidth="1"
          />
          <line x1="-5" y1="-4" x2="-5" y2="4" stroke="#333" strokeWidth="1" />
          <line x1="0" y1="-2" x2="0" y2="4" stroke="#333" strokeWidth="1" />
          <line x1="5" y1="-4" x2="5" y2="4" stroke="#333" strokeWidth="1" />
          <line x1="10" y1="-2" x2="10" y2="4" stroke="#333" strokeWidth="1" />
          <line x1="15" y1="-4" x2="15" y2="4" stroke="#333" strokeWidth="1" />
        </g>


        {/* Shapes icon */}
        <g transform="translate(120, 240)">
          <polygon
            points="0,-12 10,4 -10,4"
            fill="#a8edea"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </polygon>
        </g>


        {/* Vector anchor */}
        <g transform="translate(120, 160)">
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke="#fed766"
            strokeWidth="2"
          />
          <circle cx="0" cy="0" r="3" fill="#fed766" />
        </g>
      </g>


      {/* Center logo area with pulsing effect */}
      <g>
        <circle
          cx="200"
          cy="200"
          r="50"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="url(#penGradient)"
          strokeWidth="3"
        >
          <animate
            attributeName="r"
            values="50;55;50"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>


        {/* Creative sparkle effect */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="-360 200 200"
            dur="8s"
            repeatCount="indefinite"
          />
          <path d="M 200,160 L 202,195 L 205,160 Z" fill="#fff" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M 240,200 L 205,202 L 240,205 Z" fill="#fff" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M 200,240 L 198,205 L 195,240 Z" fill="#fff" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M 160,200 L 195,198 L 160,195 Z" fill="#fff" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>


      {/* Floating particles */}
      <circle cx="100" cy="100" r="3" fill="#fff" opacity="0.6">
        <animate
          attributeName="cy"
          values="100;80;100"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="300" cy="120" r="2" fill="#fff" opacity="0.5">
        <animate
          attributeName="cy"
          values="120;100;120"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="320" cy="300" r="3" fill="#fff" opacity="0.6">
        <animate
          attributeName="cy"
          values="300;320;300"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="80" cy="280" r="2" fill="#fff" opacity="0.5">
        <animate
          attributeName="cy"
          values="280;300;280"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};


export default GraphicsDesSVG;



