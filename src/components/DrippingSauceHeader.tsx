import React from 'react';

interface DrippingSauceHeaderProps {
  color?: 'yellow' | 'red' | 'mix';
  height?: number;
  className?: string;
  inverted?: boolean;
}

export const DrippingSauceHeader: React.FC<DrippingSauceHeaderProps> = ({
  color = 'yellow',
  height = 36,
  className = '',
  inverted = false,
}) => {
  const fillColor =
    color === 'yellow' ? '#FFCC00' : color === 'red' ? '#FF0000' : '#FFCC00';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className} ${
        inverted ? 'rotate-180' : ''
      }`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
      >
        {color === 'mix' ? (
          <>
            {/* Red Sauce under layer */}
            <path
              d="M0,0 L1440,0 L1440,35 C1380,45 1360,75 1320,75 C1280,75 1260,25 1200,30 C1140,35 1120,95 1060,95 C1010,95 990,30 940,35 C880,40 850,110 800,110 C750,110 730,40 680,40 C620,40 600,85 540,85 C480,85 460,20 400,25 C340,30 320,105 260,105 C210,105 180,35 120,40 C70,45 40,80 0,65 Z"
              fill="#D90000"
              opacity="0.95"
            />
            {/* Mustard Sauce front layer with organic drips */}
            <path
              d="M0,0 L1440,0 L1440,25 C1400,35 1370,60 1340,60 C1300,60 1280,15 1220,20 C1160,25 1130,80 1080,80 C1030,80 1010,18 950,22 C890,26 865,95 810,95 C760,95 745,28 695,28 C640,28 615,70 560,70 C500,70 480,15 420,18 C360,22 335,88 280,88 C230,88 200,24 140,28 C85,32 50,65 0,45 Z"
              fill="#FFCC00"
            />
          </>
        ) : (
          <path
            d="M0,0 L1440,0 L1440,30 C1400,40 1370,80 1330,80 C1290,80 1270,25 1210,30 C1150,35 1120,105 1065,105 C1015,105 995,30 935,35 C875,40 850,115 795,115 C745,115 725,35 670,35 C615,35 590,90 535,90 C475,90 455,20 395,25 C335,30 310,105 255,105 C205,105 180,30 120,35 C70,40 40,85 0,65 Z"
            fill={fillColor}
          />
        )}
      </svg>
    </div>
  );
};
