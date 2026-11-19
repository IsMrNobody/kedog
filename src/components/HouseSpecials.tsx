import React from 'react';
import { ShoppingBag, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';
import { HOUSE_SPECIALS } from '../data/menuData';
import { HouseSpecial, CartItem } from '../types';

interface HouseSpecialsProps {
  onAddToCart: (item: CartItem) => void;
  onCustomizeSpecial: (special: HouseSpecial) => void;
}

export const HouseSpecials: React.FC<HouseSpecialsProps> = ({
  onAddToCart,
  onCustomizeSpecial,
}) => {
  const handleQuickAdd = (special: HouseSpecial) => {
    const item: CartItem = {
      id: `special-${special.id}-${Date.now()}`,
      type: 'special_dog',
      title: special.name,
      subtitle: special.tagline,
      details: {
        bread: 'Pan de Batata Dorado',
        sausage: special.sausageId === 'polaca' ? 'Salchicha Polaca Rústica' : 'Salchicha Mediana Premium',
        toppings: special.toppingIds,
        sauces: special.sauceIds,
        instructions: `Combinación estrella oficial: ${special.name}`,
      },
      unitPrice: special.price,
      quantity: 1,
    };
    onAddToCart(item);
  };

  return (
    <section id="especiales" className="relative bg-[#0A0A0C] py-20 border-t border-[#1C1C20] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000] mb-2">
              <Flame className="w-4 h-4 fill-[#FF0000]" />
              <span>Recetas Maestras Ke Dog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              Combinaciones <span className="text-[#FFCC00]">Estrella</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-medium max-w-xl">
              Equilibrio perfecto de sabores creado por nuestros maestros parrilleros. Pídelos tal cual o customízalos a tu gusto.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOUSE_SPECIALS.map((special) => {
            return (
              <div
                key={special.id}
                className="bg-[#121215] border border-[#222226] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#FFCC00] transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Photo container with measured scrim */}
                  <div className="relative h-48 w-full overflow-hidden bg-black">
                    <img
                      src={special.image}
                      alt={special.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30 pointer-events-none" />

                    {/* Badge */}
                    {special.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FF0000] text-white shadow-md">
                        {special.badge}
                      </span>
                    )}

                    <div className="absolute bottom-2 left-3 right-3">
                      <span className="text-[11px] font-bold text-[#FFCC00] uppercase tracking-wider block">
                        {special.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-[#FFCC00] transition-colors">
                      {special.name}
                    </h3>

                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                      {special.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#1F1F24] flex items-center justify-between">
                      <span className="text-xs text-neutral-400">Precio</span>
                      <span className="text-xl font-black text-[#FFCC00] tabular-nums">
                        ${special.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onCustomizeSpecial(special)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1A1A1F] hover:bg-[#25252B] border border-[#303038] text-xs font-bold text-neutral-200 transition-colors cursor-pointer"
                    title="Modificar ingredientes en La Fábrica"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>Personalizar</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd(special)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF0000] hover:bg-[#E60000] text-white text-xs font-black transition-colors cursor-pointer shadow-md"
                    title="Agregar directo al pedido"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Pedir</span>
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
