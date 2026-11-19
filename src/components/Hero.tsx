import React from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { DrippingSauceHeader } from './DrippingSauceHeader';

interface HeroProps {
  onStartBuilding: () => void;
  onNavigateSpecials: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBuilding, onNavigateSpecials }) => {
  return (
    <section className="relative bg-black pt-6 pb-16 lg:pb-24 overflow-hidden border-b border-[#1A1A1D]">
      {/* Top dripping sauce effect */}
      <DrippingSauceHeader color="mix" height={36} className="absolute top-0 left-0 w-full z-20" />

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FFCC00]/15 via-[#FF0000]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Unboxed natural kicker */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFCC00] mb-4">
              <Flame className="w-4 h-4 text-[#FF0000] inline" />
              <span>La Casa de los Perros Calientes Brutales</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-white">Fórmula de Autor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] text-balance mb-5 sm:mb-6">
              Donde el <span className="text-[#FFCC00]">Pan de Batata</span> es sagrado y las salsas{' '}
              <span className="text-[#FF0000] underline decoration-[#FFCC00] decoration-wavy decoration-4">
                chorrean de verdad
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-neutral-300 font-medium leading-relaxed max-w-2xl mb-6 sm:mb-8">
              Arma tu obra maestra desde cero con salchichas premium ahumadas o a la parrilla, baña en queso fundido artesanal, y elige hasta 3 de nuestras 6 salsas salvajes. Creado para los fanáticos del street food sin miedo a mancharse los dedos.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
              <button
                onClick={onStartBuilding}
                className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#FF0000] text-white font-extrabold text-sm sm:text-base hover:bg-[#E60000] active:scale-98 transition-all shadow-[0_10px_25px_rgba(255,0,0,0.35)] cursor-pointer whitespace-nowrap"
              >
                <span>🌭 Armar mi Perro en La Fábrica</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={onNavigateSpecials}
                className="flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#141416] text-[#FFCC00] font-bold text-sm sm:text-base border border-[#333339] hover:border-[#FFCC00] hover:bg-[#1C1C20] transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFCC00]" />
                <span>Ver Combinaciones Estrella</span>
              </button>
            </div>

            {/* Clean unboxed proof metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-neutral-400 pt-2 border-t border-[#222225] w-full">
              <span className="text-white">Pan de Batata Dorado</span>
              <span aria-hidden="true">·</span>
              <span className="text-white">Salchicha Polaca & Mediana</span>
              <span aria-hidden="true">·</span>
              <span className="text-white">Topping Queso Fundido</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FFCC00]">6 Salsas de Autor</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#25D366]">WhatsApp Directo</span>
            </div>
          </div>

          {/* Right Column: Hero Loaded Showcase Image */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#FFCC00]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#0C0C0E] group">
              <img
                src="/src/assets/images/hero_kedog_loaded_1791165776948.jpg"
                alt="Perro Caliente Brutal Ke Dog con Pan de Batata y queso chorreando"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom card overlay info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-[#FFCC00]/50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase text-[#FF0000] tracking-wider block">
                    La Leyenda Ke Dog
                  </span>
                  <h3 className="text-base font-black text-white uppercase">
                    El Monstruo Ke Dog
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Polaca · Queso Fundido · Chutney de Piña · Triple Salsa
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Desde</span>
                  <span className="text-xl font-black text-[#FFCC00] tabular-nums">$10.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
