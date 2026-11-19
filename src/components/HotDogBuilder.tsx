import React, { useState } from 'react';
import { Check, Plus, Minus, Flame, Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';
import { SAUSAGES, TOPPINGS, SAUCES, BREAD_INFO } from '../data/menuData';
import { Sausage, Topping, Sauce, CartItem } from '../types';
import { VisualHotDog } from './VisualHotDog';
import { SplashEvent } from './SauceSplashOverlay';
import { DripDivider } from './DripDivider';

interface HotDogBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onTriggerSplash: (event: SplashEvent) => void;
  selectedSausage: Sausage;
  onSelectSausage: (sausage: Sausage) => void;
  selectedToppings: Topping[];
  onToggleTopping: (topping: Topping) => void;
  selectedSauces: Sauce[];
  onToggleSauce: (sauce: Sauce) => void;
  onReset: () => void;
}

export const HotDogBuilder: React.FC<HotDogBuilderProps> = ({
  onAddToCart,
  onTriggerSplash,
  selectedSausage,
  onSelectSausage,
  selectedToppings,
  onToggleTopping,
  selectedSauces,
  onToggleSauce,
  onReset,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // Toggle Topping with splash effect
  const handleToggleToppingWithSplash = (topping: Topping) => {
    const isAdding = !selectedToppings.some((t) => t.id === topping.id);
    onToggleTopping(topping);
    if (isAdding) {
      onTriggerSplash({
        id: topping.id,
        name: topping.name,
        color: topping.id === 'queso-fundido' ? '#FFB800' : '#FFCC00',
        type: topping.id === 'queso-fundido' ? 'cheese' : 'topping',
      });
    }
  };

  // Toggle Sauce with squirt animation
  const handleToggleSauceWithSplash = (sauce: Sauce) => {
    const isAdding = !selectedSauces.some((s) => s.id === sauce.id);
    onToggleSauce(sauce);
    if (isAdding) {
      onTriggerSplash({
        id: sauce.id,
        name: sauce.name,
        color: sauce.color,
        type: 'sauce',
        emoji: sauce.emoji,
      });
    }
  };

  // Price Calculation
  const unitPrice =
    selectedSausage.price +
    selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const totalPrice = unitPrice * quantity;

  // Add to Cart
  const handleAddCustomDog = () => {
    const newCartItem: CartItem = {
      id: `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: 'custom_dog',
      title: `Perro ${selectedSausage.name}`,
      subtitle: `${selectedToppings.length} Toppings · ${selectedSauces.length} Salsas`,
      details: {
        bread: BREAD_INFO.name,
        sausage: selectedSausage.name,
        toppings: selectedToppings.map((t) => t.name),
        sauces: selectedSauces.map((s) => s.name),
        instructions: notes.trim() || undefined,
      },
      unitPrice,
      quantity,
    };

    onAddToCart(newCartItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleResetInternal = () => {
    onReset();
    setNotes('');
    setQuantity(1);
  };

  return (
    <section id="fabrica" className="relative bg-[#09090B] py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF0000] mb-2">
            <Flame className="w-4 h-4 fill-[#FF0000]" />
            <span>Configurador en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            La Fábrica <span className="text-[#FFCC00]">Ke Dog</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-medium">
            Selecciona cada ingrediente paso a paso. Observa cómo cobra vida tu perro caliente brutal y báñalo en hasta 3 salsas que chorrean.
          </p>
        </div>

        {/* 2-Column Layout: Visual Canvas (Sticky) & Step Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Sticky Left Column: Live Hot Dog Visualizer */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-black rounded-2xl border-2 border-[#252528] p-3.5 sm:p-5 shadow-2xl relative overflow-hidden">
              {/* Dripping top bar on visualizer */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFCC00]" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Simulador en Vivo
                </span>
                <button
                  onClick={handleResetInternal}
                  className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-400 hover:text-[#FF0000] transition-colors"
                  title="Reiniciar ingredientes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>

              {/* Live Render */}
              <VisualHotDog
                sausage={selectedSausage}
                toppings={selectedToppings}
                sauces={selectedSauces}
                isCustomizing={true}
              />

              {/* Composition Summary Specs */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#1F1F24] space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs">
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-400">Base Sagrada:</span>
                  <span className="font-semibold text-white">Pan de Batata Dorado</span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-400">Salchicha:</span>
                  <span className="font-semibold text-[#FFCC00]">
                    {selectedSausage.name} (${selectedSausage.price.toFixed(2)})
                  </span>
                </div>
                <div className="flex justify-between items-start text-neutral-300">
                  <span className="text-neutral-400 shrink-0">Toppings ({selectedToppings.length}):</span>
                  <span className="font-medium text-right text-white max-w-[180px] sm:max-w-[200px] truncate">
                    {selectedToppings.length > 0
                      ? selectedToppings.map((t) => t.name).join(', ')
                      : 'Ninguno seleccionado'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-400">Salsas ({selectedSauces.length}/3):</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {selectedSauces.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-black"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.name}
                      </span>
                    ))}
                    {selectedSauces.length === 0 && (
                      <span className="text-neutral-500 italic">Sin salsas</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Order Box */}
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-[#2B2B32] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center justify-between sm:block">
                  <span className="text-[11px] sm:text-xs text-neutral-400 block">Total por Unidad</span>
                  <span className="text-xl sm:text-2xl font-black text-[#FFCC00] tabular-nums">
                    ${unitPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#17171A] border border-[#2B2B32] rounded-lg p-1 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded text-neutral-300 hover:bg-[#25252A] transition-colors"
                      aria-label="Restar cantidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-bold text-sm text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded text-neutral-300 hover:bg-[#25252A] transition-colors"
                      aria-label="Sumar cantidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddCustomDog}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                      addedNotice
                        ? 'bg-[#25D366] text-black shadow-[0_0_20px_rgba(37,211,102,0.5)]'
                        : 'bg-[#FF0000] text-white hover:bg-[#E60000] shadow-[0_4px_20px_rgba(255,0,0,0.4)]'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                        <span>¡Agregar! (${totalPrice.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Steps */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Base - El Pan de Batata */}
            <div className="bg-[#121214] border border-[#26262B] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg font-black uppercase text-white tracking-tight">
                    La Base: El Pan de Batata
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">
                  Incluido Sagrado
                </span>
              </div>

              <div className="bg-black/60 rounded-xl p-4 border border-[#333339] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-white text-base">
                    {BREAD_INFO.name}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 max-w-lg leading-relaxed">
                    {BREAD_INFO.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFCC00]/15 text-[#FFCC00] text-xs font-extrabold shrink-0 border border-[#FFCC00]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dorado a la Mantequilla</span>
                </div>
              </div>
            </div>

            {/* Step 2: La Salchicha (Mediana Premium vs Polaca) */}
            <div className="bg-[#121214] border border-[#26262B] rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                    La Salchicha: Calidad Premium
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-400">
                  Selecciona 1 opción
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {SAUSAGES.map((sausage) => {
                  const isSelected = selectedSausage.id === sausage.id;
                  return (
                    <button
                      key={sausage.id}
                      onClick={() => onSelectSausage(sausage)}
                      className={`text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-black border-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.25)]'
                          : 'bg-[#18181B] border-[#2B2B32] hover:border-neutral-500'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF0000] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#FFCC00] block mb-1">
                          {sausage.badge}
                        </span>
                        <h4 className="font-extrabold text-white text-sm sm:text-base">
                          {sausage.name}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                          {sausage.description}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-[#26262B] flex items-center justify-between w-full">
                        <span className="text-[11px] sm:text-xs text-neutral-400">{sausage.highlight}</span>
                        <span className="text-base font-black text-[#FFCC00] tabular-nums">
                          ${sausage.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Toppings Exclusivos */}
            <div className="bg-[#121214] border border-[#26262B] rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                    Toppings Exclusivos
                  </h3>
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-400">
                  {selectedToppings.length} elegidos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      onClick={() => handleToggleToppingWithSplash(topping)}
                      className={`text-left p-3 sm:p-3.5 rounded-xl border transition-all flex items-start justify-between gap-2.5 sm:gap-3 ${
                        isSelected
                          ? topping.isExclusive
                            ? 'bg-black border-[#FFCC00] shadow-[0_0_15px_rgba(255,204,0,0.2)]'
                            : 'bg-black border-[#FF0000]'
                          : 'bg-[#18181B] border-[#2A2A30] hover:border-neutral-500'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs sm:text-sm text-white">
                            {topping.name}
                          </h4>
                          {topping.isExclusive && (
                            <span className="text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/40">
                              Exclusivo
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-snug">
                          {topping.description}
                        </p>
                        <span className="text-[11px] sm:text-xs font-bold text-[#FFCC00] mt-1.5 block tabular-nums">
                          +${topping.price.toFixed(2)}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? topping.isExclusive
                              ? 'bg-[#FFCC00] text-black'
                              : 'bg-[#FF0000] text-white'
                            : 'border border-[#44444C] text-transparent'
                        }`}
                      >
                        <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Universo de Salsas (Max 3) */}
            <div className="bg-[#121214] border border-[#26262B] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFCC00] text-black font-black text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                    El Universo de Salsas: ¡Báñalo!
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-neutral-400">Hasta 3 salsas:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-black tabular-nums ${
                      selectedSauces.length === 3
                        ? 'bg-[#FF0000] text-white'
                        : 'bg-[#FFCC00] text-black'
                    }`}
                  >
                    {selectedSauces.length}/3
                  </span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-neutral-400 mb-3 sm:mb-4">
                Toca cualquier salsa para ver la animación de chorreado y sumarla a la receta. Todas están incluidas sin costo extra.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {SAUCES.map((sauce) => {
                  const isSelected = selectedSauces.some((s) => s.id === sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => handleToggleSauceWithSplash(sauce)}
                      className={`text-left p-2.5 sm:p-3.5 rounded-xl border-2 transition-all relative flex flex-col justify-between group overflow-hidden ${
                        isSelected
                          ? 'bg-black shadow-lg scale-[1.02]'
                          : 'bg-[#18181B] border-[#2A2A30] hover:border-neutral-500'
                      }`}
                      style={{
                        borderColor: isSelected ? sauce.color : undefined,
                      }}
                    >
                      {/* Top color indicator line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 sm:h-1.5"
                        style={{ backgroundColor: sauce.color }}
                      />

                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg sm:text-xl">{sauce.emoji}</span>
                          {isSelected && (
                            <span
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-black"
                              style={{ backgroundColor: sauce.color }}
                            >
                              <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-white leading-tight">
                          {sauce.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-1 leading-snug line-clamp-2">
                          {sauce.description}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-1.5 sm:pt-2 border-t border-[#26262B] text-[9px] sm:text-[10px] font-semibold text-neutral-400 truncate">
                        {sauce.flavorProfile}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Notas Especiales */}
            <div className="bg-[#121214] border border-[#26262B] rounded-2xl p-4 sm:p-6">
              <label htmlFor="notes" className="block text-sm font-extrabold uppercase text-white mb-2">
                Instrucciones o Notas Especiales
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. salsa aparte, cebolla bien doradita, sin servilletas..."
                className="w-full bg-black border border-[#333339] rounded-xl p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFCC00] resize-none h-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
