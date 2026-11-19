import React from 'react';

interface DripDividerProps {
  color?: string;
  bgColor?: string;
  height?: number;
  flip?: boolean;
}

export const DripDivider: React.FC<DripDividerProps> = ({
  color = '#FFCC00',
  bgColor = '#000000',
  height = 42,
  flip = false,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none relative z-10 ${
        flip ? 'rotate-180' : ''
      }`}
      style={{ height: `${height}px`, backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          d="M0,0 L1200,0 L1200,20 C1150,30 1130,75 1090,75 C1050,75 1035,15 990,20 C945,25 925,95 870,95 C820,95 805,25 760,25 C710,25 690,80 640,80 C590,80 575,18 520,20 C465,22 445,110 390,110 C340,110 325,30 270,30 C220,30 200,75 150,75 C100,75 80,20 0,25 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
