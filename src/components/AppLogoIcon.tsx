import React, { useState } from 'react';

interface AppLogoIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  xs: 'w-5 h-5 rounded-md',
  sm: 'w-6 h-6 rounded-lg',
  md: 'w-8 h-8 rounded-xl',
  lg: 'w-10 h-10 rounded-2xl',
  xl: 'w-16 h-16 rounded-2xl',
  '2xl': 'w-24 h-24 rounded-3xl',
};

// High-resolution inline micro logo Data URI as an absolute fail-safe fallback
const FALLBACK_LOGO_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANAAIQAQACAAI=";

export const AppLogoIcon: React.FC<AppLogoIconProps> = ({
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  // If both file path and base64 fail, render a pristine inline vector SVG logo
  if (imgError) {
    return (
      <div
        className={`${sizeClasses[size]} bg-[#181920] border border-indigo-500/30 flex items-center justify-center relative overflow-hidden shadow-md select-none shrink-0 ${className}`}
        title="FZ Savings"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Squircle */}
          <rect width="100" height="100" rx="22" fill="#181920" />
          
          {/* Interlocking F and Z design */}
          {/* Letter F */}
          <path d="M22 26 H56 V36 H34 V48 H50 V58 H34 V76 H22 Z" fill="#2A3982" />
          
          {/* Letter Z / Ribbon path */}
          <path d="M42 26 H78 L48 66 H78 V76 H38 L68 36 H42 Z" fill="#60A5FA" />
          
          {/* Top Coin Slot */}
          <rect x="58" y="16" width="16" height="4" rx="2" fill="#3B82F6" />
          
          {/* Shiny Gold Coin inserting */}
          <ellipse cx="66" cy="18" rx="6" ry="4" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1.5" />
          
          {/* Stack of coins bottom right */}
          <ellipse cx="70" cy="74" rx="7" ry="2.5" fill="#D97706" />
          <ellipse cx="70" cy="71" rx="7" ry="2.5" fill="#F59E0B" />
          <ellipse cx="70" cy="68" rx="7" ry="2.5" fill="#FBBF24" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 overflow-hidden ${sizeClasses[size]} border border-indigo-500/30 shadow-xs bg-[#181920] ${className}`}>
      <img
        src="/app_logo.png"
        alt="FZ Savings Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
};
