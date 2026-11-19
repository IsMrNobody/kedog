import React from 'react';
import logoSvg from '../assets/images/loogk.png';
interface KeDogLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const KeDogLogo: React.FC<KeDogLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const dimensions = {
    sm: { width: 100, height: 50 },
    md: { width: 150, height: 75 },
    lg: { width: 200, height: 100 },
    xl: { width: 280, height: 140 },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <img
        src={logoSvg}
        alt="Ke Dog Logo"
        width={dimensions.width}
        height={dimensions.height}
        className="h-auto max-h-14 sm:max-h-16 object-contain drop-shadow-[0_6px_16px_rgba(255,0,0,0.4)] transition-transform duration-300 hover:scale-105"
      />

      {showTagline && (
        <span className="mt-1 text-xs tracking-wider uppercase font-black text-[#FFCC00] bg-black/80 px-2 py-0.5 border border-[#FFCC00]/40 rounded-sm">
          Street Food Brutal · Pan de Batata
        </span>
      )}
    </div>
  );
};
