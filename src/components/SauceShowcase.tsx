import React from 'react';
import { Sparkles, Droplets } from 'lucide-react';
import { SAUCES } from '../data/menuData';
import { Sauce } from '../types';
import { SplashEvent } from './SauceSplashOverlay';

interface SauceShowcaseProps {
  onTriggerSplash: (event: SplashEvent) => void;
  onSelectSauceInBuilder: (sauce: Sauce) => void;
}

export const SauceShowcase: React.FC<SauceShowcaseProps> = ({
  onTriggerSplash,
  onSelectSauceInBuilder,
}) => {
  return (
    <section id="salsas" className="relative bg-black py-20 border-t border-[#1C1C20] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FFCC00] mb-2">
            <Droplets className="w-4 h-4 fill-[#FFCC00]" />
            <span>El Secreto Está en el Chorreado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            El Universo de <span className="text-[#FF0000]">Salsas Ke Dog</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-medium">
            Emulsiones caseras, reducciones a fuego lento y recetas exclusivas. Toca cualquier salsa para ver cómo chorrea y probarla en tu perro.
          </p>
        </div>

        {/* 6 Sauces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAUCES.map((sauce) => {
            return (
              <div
                key={sauce.id}
                className="bg-[#0E0E10] border-2 rounded-2xl p-6 relative flex flex-col justify-between group hover:border-[#FFCC00] transition-all duration-300 shadow-xl overflow-hidden"
                style={{ borderColor: '#222226' }}
              >
                {/* Dripping top indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-2 group-hover:h-3 transition-all"
                  style={{ backgroundColor: sauce.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{sauce.emoji}</span>
                    <span
                      className="text-xs font-black uppercase px-2 py-0.5 rounded text-black font-mono"
                      style={{ backgroundColor: sauce.color }}
                    >
                      {sauce.flavorProfile.split('·')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-[#FFCC00] transition-colors">
                    {sauce.name}
                  </h3>

                  <p className="text-sm text-neutral-300 font-normal mt-2 leading-relaxed">
                    {sauce.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#1C1C22] flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-300">Perfil:</span>
                    <span>{sauce.flavorProfile}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-[#1F1F24] flex items-center gap-3">
                  <button
                    onClick={() =>
                      onTriggerSplash({
                        id: sauce.id,
                        name: sauce.name,
                        color: sauce.color,
                        type: 'sauce',
                        emoji: sauce.emoji,
                      })
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#18181C] hover:bg-[#25252C] border border-[#333339] text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <Droplets className="w-3.5 h-3.5" style={{ color: sauce.color }} />
                    <span>¡Chorrear!</span>
                  </button>

                  <button
                    onClick={() => onSelectSauceInBuilder(sauce)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE033] text-black text-xs font-extrabold transition-colors cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Usar en Fábrica</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
