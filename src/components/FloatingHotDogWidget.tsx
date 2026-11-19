import React, { useState } from 'react';
import { VisualHotDog } from './VisualHotDog';
import { Sausage, Topping, Sauce, CartItem } from '../types';
import { BREAD_INFO } from '../data/menuData';

interface FloatingHotDogWidgetProps {
  sausage: Sausage;
  toppings: Topping[];
  sauces: Sauce[];
  onAddToCart: (item: CartItem) => void;
  onOpenOrder: () => void;
}

export const FloatingHotDogWidget: React.FC<FloatingHotDogWidgetProps> = ({
  sausage,
  toppings,
  sauces,
  onAddToCart,
  onOpenOrder,
}) => {
  const [clicked, setClicked] = useState(false);

  const unitPrice =
    sausage.price + toppings.reduce((acc, t) => acc + t.price, 0);

  const handleClickToOrder = () => {
    const item: CartItem = {
      id: `custom-floating-${Date.now()}`,
      type: 'custom_dog',
      title: `Perro ${sausage.name}`,
      subtitle: `${toppings.length} Toppings · ${sauces.length} Salsas`,
      details: {
        bread: BREAD_INFO.name,
        sausage: sausage.name,
        toppings: toppings.map((t) => t.name),
        sauces: sauces.map((s) => s.name),
      },
      unitPrice,
      quantity: 1,
    };

    onAddToCart(item);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      onOpenOrder();
    }, 280);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 select-none">
      {/* Pure Hot Dog Illustration Only - Click to Order */}
      <button
        onClick={handleClickToOrder}
        className={`group relative block cursor-pointer transition-transform duration-200 outline-none focus:outline-none ${
          clicked ? 'scale-90' : 'hover:scale-110 active:scale-95'
        }`}
        title="¡Toca el perro caliente para pedir!"
        aria-label="Pedir este perro caliente"
      >
        {/* Glow effect behind the hot dog */}
        <div className="absolute inset-0 bg-[#FFCC00]/25 blur-xl rounded-full scale-90 group-hover:scale-110 group-hover:bg-[#FF0000]/30 transition-all duration-300" />

        {/* The pure hot dog illustration */}
        <div className="relative w-36 h-24 sm:w-44 sm:h-28 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
          <VisualHotDog
            sausage={sausage}
            toppings={toppings}
            sauces={sauces}
            hideBadge={true}
          />
        </div>
      </button>
    </div>
  );
};
