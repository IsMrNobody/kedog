import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface SplashEvent {
  id: string;
  name: string;
  color: string;
  secondaryColor?: string;
  type: 'sauce' | 'cheese' | 'topping';
  emoji?: string;
}

interface SauceSplashOverlayProps {
  event: SplashEvent | null;
  onComplete: () => void;
}

export const SauceSplashOverlay: React.FC<SauceSplashOverlayProps> = ({
  event,
  onComplete,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [event, onComplete]);

  if (!event || !visible) return null;

  const isCheese = event.type === 'cheese' || event.id === 'queso-fundido';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
        {/* Animated Sauce Splashes / Cheese Cascade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center bg-black/90 border-2 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-sm mx-4"
          style={{ borderColor: event.color }}
        >
          {/* Top Drips on card */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-[1px]"
            style={{ backgroundColor: event.color }}
          />

          {isCheese ? (
            /* Cheese Cascade Pot Animation */
            <div className="relative w-28 h-28 mb-2 flex items-center justify-center">
              {/* Melting pot */}
              <motion.div
                initial={{ rotate: -25, y: -10 }}
                animate={{ rotate: [-25, 20, 15], y: [-10, 5, 0] }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
              >
                🧀
              </motion.div>

              {/* Streaming Cheese Fall */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 60, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute top-16 w-8 rounded-full shadow-lg"
                style={{
                  background: 'linear-gradient(to bottom, #FFE033, #FFB800, #FF9900)',
                  boxShadow: '0 0 15px rgba(255, 184, 0, 0.8)',
                }}
              />
            </div>
          ) : (
            /* Sauce Bottle Squirt Animation */
            <div className="relative w-28 h-28 mb-2 flex items-center justify-center">
              {/* Squeeze Bottle */}
              <motion.div
                initial={{ rotate: 30, scale: 0.8 }}
                animate={{
                  rotate: [30, -15, -10],
                  scale: [0.8, 1.15, 1],
                  x: [20, -5, 0],
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative"
              >
                {/* Squeeze bottle graphic SVG */}
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
                  {/* Bottle body */}
                  <rect
                    x="15"
                    y="25"
                    width="40"
                    height="58"
                    rx="8"
                    fill={event.color}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                  {/* Bottle ribs / highlights */}
                  <rect x="20" y="32" width="6" height="44" rx="3" fill="#FFFFFF" opacity="0.4" />
                  {/* Cap */}
                  <rect x="22" y="15" width="26" height="12" rx="3" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
                  {/* Tip nozzle */}
                  <polygon points="35,0 28,15 42,15" fill="#111111" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </motion.div>

              {/* Squirting stream */}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="absolute -bottom-4 -left-6 w-24 h-16 pointer-events-none"
                viewBox="0 0 100 60"
              >
                <motion.path
                  d="M 85 10 Q 50 35 15 50"
                  fill="none"
                  stroke={event.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />
              </motion.svg>
            </div>
          )}

          {/* Splatter particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: (i % 2 === 0 ? 1 : -1) * (30 + i * 15),
                  y: 20 + i * 12,
                  scale: [0, 1.2, 0.8],
                  opacity: [1, 1, 0],
                }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                style={{ backgroundColor: event.color }}
              />
            ))}
          </div>

          {/* Action text */}
          <div className="text-center z-10">
            <span className="text-[11px] font-black tracking-widest text-white/70 uppercase">
              {isCheese ? '🧀 ¡BAÑO DE QUESO FUNDIDO!' : '🔥 ¡SALSA CHORREANDO!'}
            </span>
            <h4
              className="text-lg font-black tracking-tight uppercase"
              style={{ color: event.color === '#EDE8D0' ? '#FFCC00' : event.color }}
            >
              {event.name}
            </h4>
            <p className="text-xs text-white/90 font-medium mt-0.5">
              ¡Cargado directo al perro caliente!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
