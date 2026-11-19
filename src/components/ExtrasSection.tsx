import React from 'react';
import { Plus, UtensilsCrossed, Flame, CircleDot, Coffee, Sparkles, GlassWater, Beer } from 'lucide-react';
import { EXTRAS } from '../data/menuData';
import { ExtraItem, CartItem } from '../types';

interface ExtrasSectionProps {
  onAddToCart: (item: CartItem) => void;
}

export const ExtrasSection: React.FC<ExtrasSectionProps> = ({ onAddToCart }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#FFCC00]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#FF0000]" />;
      case 'CircleDot':
        return <CircleDot className="w-5 h-5 text-[#FFCC00]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#FF0000]" />;
      case 'GlassWater':
        return <GlassWater className="w-5 h-5 text-sky-400" />;
      case 'Beer':
        return <Beer className="w-5 h-5 text-[#FFCC00]" />;
      default:
        return <Coffee className="w-5 h-5 text-neutral-300" />;
    }
  };

  const handleAddExtra = (extra: ExtraItem) => {
    const item: CartItem = {
      id: `extra-${extra.id}-${Date.now()}`,
      type: 'extra',
      title: extra.name,
      subtitle: extra.category === 'bebida' ? 'Bebida Refrescante' : 'Acompañamiento Caliente',
      details: {
        bread: '-',
        instructions: extra.description,
      },
      unitPrice: extra.price,
      quantity: 1,
    };
    onAddToCart(item);
  };

  return (
    <section id="extras" className="relative bg-black py-20 border-t border-[#1C1C20] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000] mb-2">
            <span>Para Completar la Experiencia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Acompañamientos & <span className="text-[#FFCC00]">Bebidas</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 font-medium">
            Crujientes papas fritas rústicas, aros de cebolla y las bebidas más frías para acompañar el mordisco.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {EXTRAS.map((extra) => (
            <div
              key={extra.id}
              className="bg-[#101013] border border-[#222226] rounded-2xl p-5 flex flex-col justify-between hover:border-[#FFCC00] transition-all duration-300 shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#17171C] flex items-center justify-center border border-[#2A2A32] group-hover:scale-105 transition-transform">
                    {getIcon(extra.iconName)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    {extra.category}
                  </span>
                </div>

                <h3 className="font-black text-white text-base leading-snug group-hover:text-[#FFCC00] transition-colors">
                  {extra.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {extra.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1E1E24] flex items-center justify-between">
                <span className="text-lg font-black text-[#FFCC00] tabular-nums">
                  ${extra.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddExtra(extra)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D1D22] hover:bg-[#FF0000] text-white text-xs font-bold transition-colors cursor-pointer group-hover:bg-[#FF0000]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
