import React from 'react';

export default function Logo({ className = "h-8 w-auto", showText = true, variant = 'dark' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <svg
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 (Bottom of N/S structure - Dark Blue / Slate) */}
        <path
          d="M25 65L45 75L75 60L55 50L25 65Z"
          fill="url(#logo-grad-1)"
          className="transition-all duration-300 group-hover:translate-y-1"
        />
        {/* Layer 2 (Middle Layer - Indigo) */}
        <path
          d="M25 45L45 55L75 40L55 30L25 45Z"
          fill="url(#logo-grad-2)"
          className="transition-all duration-300"
        />
        {/* Layer 3 (Top Layer - Emerald/Cyan highlight) */}
        <path
          d="M25 25L45 35L75 20L55 10L25 25Z"
          fill="url(#logo-grad-3)"
          className="transition-all duration-300 group-hover:-translate-y-1"
        />
        
        {/* Connector lines to form N + S structure */}
        <path
          d="M25 25V65M75 20V60"
          stroke="url(#logo-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 4"
        />

        <defs>
          <linearGradient id="logo-grad-1" x1="25" y1="65" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e1b4b" />
            <stop offset="1" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="logo-grad-2" x1="25" y1="45" x2="75" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="logo-grad-3" x1="25" y1="25" x2="75" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="logo-stroke" x1="25" y1="25" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className={`font-bold text-sm sm:text-base md:text-lg tracking-wider ${textColor} uppercase transition-colors duration-200`}>
          NovaStack<span className="text-emerald-500 font-extrabold">Labs</span>
        </span>
      )}
    </div>
  );
}

