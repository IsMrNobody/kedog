import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sausage, Topping, Sauce } from '../types';

interface VisualHotDogProps {
  sausage: Sausage;
  toppings: Topping[];
  sauces: Sauce[];
  isCustomizing?: boolean;
  hideBadge?: boolean;
}

export const VisualHotDog: React.FC<VisualHotDogProps> = ({
  sausage,
  toppings,
  sauces,
  hideBadge = false,
}) => {
  const hasCheese = toppings.some((t) => t.id === 'queso-fundido');
  const hasPineapple = toppings.some((t) => t.id === 'chutney-pina');
  const hasCrispyOnions = toppings.some((t) => t.id === 'cebolla-crispy');
  const hasPotatoSticks = toppings.some((t) => t.id === 'papitas-hilo');
  const hasBacon = toppings.some((t) => t.id === 'tocino-bacon');
  const hasJalapenos = toppings.some((t) => t.id === 'jalapenos');

  const isPolaca = sausage.id === 'polaca';

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-1 sm:p-2 select-none">
      {/* Glow behind the hot dog */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFCC00]/10 via-[#FF0000]/5 to-transparent blur-2xl rounded-full" />

      {/* SVG Canvas for realistic layered street hot dog */}
      <svg
        viewBox="0 0 500 280"
        className="w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] overflow-visible"
      >
        <defs>
          {/* Sweet potato bun gradients (Pan de batata: golden, warm honey glaze) */}
          <linearGradient id="sweetPotatoBunBottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C97A2B" />
            <stop offset="40%" stopColor="#A85918" />
            <stop offset="100%" stopColor="#693005" />
          </linearGradient>

          <linearGradient id="sweetPotatoBunTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5A249" />
            <stop offset="30%" stopColor="#D97A23" />
            <stop offset="85%" stopColor="#9C4B0F" />
            <stop offset="100%" stopColor="#632B04" />
          </linearGradient>

          {/* Sausage Gradients */}
          {/* Mediana Premium: Juicy smoked sausage */}
          <linearGradient id="medianaSausage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E25555" />
            <stop offset="50%" stopColor="#BD2828" />
            <stop offset="100%" stopColor="#7A1313" />
          </linearGradient>

          {/* Polaca: Charred, rustic, darker, seasoned */}
          <linearGradient id="polacaSausage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9E3B29" />
            <stop offset="45%" stopColor="#6E2014" />
            <stop offset="80%" stopColor="#4A130A" />
            <stop offset="100%" stopColor="#2D0B05" />
          </linearGradient>

          {/* Melted Cheese Flow Gradient */}
          <linearGradient id="meltedCheeseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF066" />
            <stop offset="35%" stopColor="#FFCC00" />
            <stop offset="85%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Chutney Piña golden amber */}
          <linearGradient id="pineappleChutneyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* 1. BOTTOM BUN (Pan de Batata Base) */}
        <g id="bottom-bun">
          {/* Bun shadow */}
          <ellipse cx="250" cy="225" rx="195" ry="30" fill="#000000" opacity="0.6" filter="blur(6px)" />
          {/* Lower bread body */}
          <path
            d="M 60 170 C 50 200, 100 230, 250 230 C 400 230, 450 200, 440 170 C 420 185, 350 198, 250 198 C 150 198, 80 185, 60 170 Z"
            fill="url(#sweetPotatoBunBottom)"
          />
          {/* Bun interior soft crumb */}
          <ellipse cx="250" cy="170" rx="180" ry="25" fill="#FCE7D0" opacity="0.75" />
        </g>

        {/* 2. THE SAUSAGE (Salchicha Mediana vs Polaca) */}
        <g id="sausage">
          {isPolaca ? (
            /* POLACA: Generous, thicker calibre, charred with grill marks */
            <g>
              {/* Sausage casing shadow */}
              <ellipse cx="250" cy="164" rx="194" ry="28" fill="#1C0603" opacity="0.55" />
              {/* Polish Sausage Body - robust street food girth */}
              <path
                d="M 45 146 C 38 124, 62 118, 100 120 C 190 110, 310 110, 400 120 C 438 118, 462 124, 455 146 C 448 176, 420 186, 380 184 C 290 192, 190 192, 120 184 C 80 186, 52 176, 45 146 Z"
                fill="url(#polacaSausage)"
              />
              {/* Juicy highlight along length */}
              <path
                d="M 105 128 Q 250 120 395 128"
                stroke="#C25946"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.65"
              />
              {/* Dark Charred Grill Marks on Polish sausage */}
              {[118, 162, 206, 250, 296, 342, 384].map((xPos, idx) => (
                <path
                  key={idx}
                  d={`M ${xPos} 122 Q ${xPos + 8} 148 ${xPos - 5} 178`}
                  stroke="#1F0703"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              ))}
            </g>
          ) : (
            /* MEDIANA PREMIUM: Smooth, plump, thicker juicy smoked sausage */
            <g>
              {/* Shadow */}
              <ellipse cx="250" cy="160" rx="186" ry="25" fill="#3D0B0B" opacity="0.45" />
              {/* Sausage body */}
              <path
                d="M 52 144 C 44 126, 68 122, 108 124 C 195 116, 305 116, 392 124 C 432 122, 456 126, 448 144 C 440 170, 418 178, 375 176 C 290 184, 210 184, 125 176 C 82 178, 60 170, 52 144 Z"
                fill="url(#medianaSausage)"
              />
              {/* Juicy smoked highlight */}
              <path
                d="M 115 128 Q 250 122 385 128"
                stroke="#FF8A8A"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>
          )}
        </g>

        {/* 3. EXCLUSIVE TOPPING: BAÑO DE QUESO FUNDIDO */}
        {hasCheese && (
          <motion.g
            id="topping-queso-fundido"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dripping melted cheese blanket */}
            <path
              d="M 90 140 C 110 132, 140 138, 170 132 C 210 130, 240 135, 280 130 C 330 132, 370 128, 410 140 C 405 160, 395 185, 380 185 C 370 185, 365 158, 350 162 C 340 165, 335 195, 320 195 C 305 195, 300 155, 280 156 C 265 157, 260 200, 240 200 C 220 200, 215 158, 195 160 C 180 162, 175 188, 160 188 C 145 188, 140 155, 120 156 C 105 157, 95 175, 85 165 Z"
              fill="url(#meltedCheeseGrad)"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
            />
            {/* Cheese glossy highlight */}
            <path
              d="M 115 142 Q 250 135 385 142"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>
        )}

        {/* 4. EXCLUSIVE TOPPING: CHUTNEY DE PIÑA */}
        {hasPineapple && (
          <motion.g
            id="topping-chutney-pina"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Caramelized pineapple gems */}
            {[
              { cx: 130, cy: 142, r: 7 },
              { cx: 160, cy: 138, r: 8 },
              { cx: 195, cy: 143, r: 7.5 },
              { cx: 230, cy: 137, r: 9 },
              { cx: 270, cy: 142, r: 8 },
              { cx: 310, cy: 138, r: 8.5 },
              { cx: 345, cy: 144, r: 7 },
              { cx: 375, cy: 140, r: 7.5 },
            ].map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill="url(#pineappleChutneyGrad)"
                  stroke="#78350F"
                  strokeWidth="1.2"
                />
                <circle cx={p.cx - 2} cy={p.cy - 2} r={p.r * 0.35} fill="#FFF9C4" opacity="0.8" />
              </g>
            ))}
          </motion.g>
        )}

        {/* 5. TOPPING: CEBOLLA CRISPY */}
        {hasCrispyOnions && (
          <motion.g
            id="topping-cebolla-crispy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { x: 125, y: 132, w: 14, h: 5, r: -15 },
              { x: 155, y: 144, w: 16, h: 4, r: 25 },
              { x: 185, y: 135, w: 15, h: 4, r: -8 },
              { x: 220, y: 148, w: 18, h: 5, r: 12 },
              { x: 250, y: 136, w: 14, h: 4, r: -20 },
              { x: 285, y: 146, w: 16, h: 5, r: 18 },
              { x: 320, y: 134, w: 15, h: 4, r: -10 },
              { x: 360, y: 142, w: 17, h: 4, r: 15 },
            ].map((c, i) => (
              <rect
                key={i}
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                rx="2"
                transform={`rotate(${c.r} ${c.x} ${c.y})`}
                fill="#B45309"
                stroke="#FDE68A"
                strokeWidth="1"
              />
            ))}
          </motion.g>
        )}

        {/* 6. TOPPING: PAPITAS HILO */}
        {hasPotatoSticks && (
          <motion.g
            id="topping-papitas-hilo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { x1: 110, y1: 130, x2: 135, y2: 140 },
              { x1: 140, y1: 142, x2: 165, y2: 132 },
              { x1: 170, y1: 135, x2: 195, y2: 145 },
              { x1: 200, y1: 145, x2: 230, y2: 130 },
              { x1: 235, y1: 132, x2: 260, y2: 148 },
              { x1: 265, y1: 146, x2: 295, y2: 134 },
              { x1: 300, y1: 135, x2: 330, y2: 145 },
              { x1: 335, y1: 142, x2: 365, y2: 130 },
              { x1: 370, y1: 135, x2: 395, y2: 142 },
            ].map((s, idx) => (
              <line
                key={idx}
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="#FCD34D"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
              />
            ))}
          </motion.g>
        )}

        {/* 7. TOPPING: BACON BITS */}
        {hasBacon && (
          <motion.g
            id="topping-bacon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { cx: 140, cy: 146 },
              { cx: 180, cy: 136 },
              { cx: 215, cy: 148 },
              { cx: 260, cy: 138 },
              { cx: 300, cy: 146 },
              { cx: 340, cy: 137 },
              { cx: 370, cy: 148 },
            ].map((b, i) => (
              <rect
                key={i}
                x={b.cx}
                y={b.cy}
                width="8"
                height="6"
                rx="1.5"
                fill="#7F1D1D"
                stroke="#B91C1C"
                strokeWidth="1"
              />
            ))}
          </motion.g>
        )}

        {/* 8. TOPPING: JALAPEÑOS */}
        {hasJalapenos && (
          <motion.g
            id="topping-jalapenos"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { cx: 150, cy: 138 },
              { cx: 210, cy: 134 },
              { cx: 275, cy: 140 },
              { cx: 335, cy: 136 },
            ].map((j, i) => (
              <g key={i}>
                <circle cx={j.cx} cy={j.cy} r="9" fill="#15803D" stroke="#166534" strokeWidth="2" />
                <circle cx={j.cx} cy={j.cy} r="5" fill="#14532D" />
                <circle cx={j.cx - 2} cy={j.cy - 1} r="1.5" fill="#FEF08A" />
              </g>
            ))}
          </motion.g>
        )}

        {/* 9. DRIPPING SAUCE RIBBONS (Up to 3 sauces) */}
        {sauces.map((sauce, idx) => {
          // Different squiggly drip paths for each sauce so they layer beautifully
          const pathD =
            idx === 0
              ? 'M 85 142 Q 130 115 175 145 Q 220 175 265 138 Q 310 115 355 148 Q 395 170 415 142'
              : idx === 1
              ? 'M 95 152 Q 135 172 185 138 Q 235 110 285 155 Q 335 175 375 136 Q 405 125 415 152'
              : 'M 90 135 Q 150 160 210 135 Q 270 165 330 132 Q 380 155 410 138';

          return (
            <motion.g
              key={sauce.id}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Sauce Drop Shadow */}
              <path
                d={pathD}
                fill="none"
                stroke="#000000"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
                transform="translate(1, 3)"
              />
              {/* Main Sauce Ribbon */}
              <path
                d={pathD}
                fill="none"
                stroke={sauce.color}
                strokeWidth="8.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Sauce Specular / Wet Highlight */}
              <path
                d={pathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
                transform="translate(-0.5, -1)"
              />
              {/* Hanging drip droplets */}
              <motion.circle
                cx={idx === 0 ? 175 : idx === 1 ? 285 : 330}
                cy={idx === 0 ? 168 : idx === 1 ? 176 : 158}
                r="4.5"
                fill={sauce.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          );
        })}

        {/* 10. TOP BUN (Pan de Batata Soft Crown) */}
        <g id="top-bun">
          {/* Top bun golden glaze with soft buttery shine */}
          <path
            d="M 60 148 C 55 90, 130 55, 250 55 C 370 55, 445 90, 440 148 C 420 130, 340 115, 250 115 C 160 115, 80 130, 60 148 Z"
            fill="url(#sweetPotatoBunTop)"
          />
          {/* Butter Shine Highlight on Batata Bread */}
          <path
            d="M 120 85 C 160 68, 340 68, 380 85"
            stroke="#FFF4D0"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
      </svg>

      {/* Floating Interactive Badge - Mobile Optimized */}
      {!hideBadge && (
        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-black/90 backdrop-blur-md px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-[#FFCC00]/40 text-[10px] sm:text-xs font-semibold text-white shadow-lg pointer-events-none whitespace-nowrap max-w-[94%] sm:max-w-none justify-center">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFCC00] animate-ping shrink-0" />
          <span className="truncate">Pan de Batata<span className="hidden sm:inline"> Sagrado</span></span>
          <span className="text-white/40">·</span>
          <span className="text-[#FFCC00] font-bold truncate">
            {isPolaca ? 'Polaca Rústica' : 'Mediana Premium'}
          </span>
        </div>
      )}
    </div>
  );
};
