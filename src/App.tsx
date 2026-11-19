/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HotDogBuilder } from './components/HotDogBuilder';
import { SauceShowcase } from './components/SauceShowcase';
import { HouseSpecials } from './components/HouseSpecials';
import { ExtrasSection } from './components/ExtrasSection';
import { Footer } from './components/Footer';
import { SauceSplashOverlay, SplashEvent } from './components/SauceSplashOverlay';
import { FloatingHotDogWidget } from './components/FloatingHotDogWidget';
import { OrderDrawer } from './components/OrderDrawer';
import { CartItem, HouseSpecial, Sauce, Sausage, Topping } from './types';
import { SAUSAGES, TOPPINGS, SAUCES } from './data/menuData';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [splashEvent, setSplashEvent] = useState<SplashEvent | null>(null);

  // Shared active hot dog state (displayed in both the Fábrica simulator and the live Floating Widget)
  const [selectedSausage, setSelectedSausage] = useState<Sausage>(SAUSAGES[0]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([TOPPINGS[0]]);
  const [selectedSauces, setSelectedSauces] = useState<Sauce[]>([SAUCES[0], SAUCES[2]]);

  // Add Item to Cart
  const handleAddToCart = useCallback((newItem: CartItem) => {
    setCartItems((prev) => {
      // If exact identical custom or extra item exists, increment quantity
      const existingIndex = prev.findIndex(
        (item) =>
          item.title === newItem.title &&
          item.details.sausage === newItem.details.sausage &&
          JSON.stringify(item.details.toppings) === JSON.stringify(newItem.details.toppings) &&
          JSON.stringify(item.details.sauces) === JSON.stringify(newItem.details.sauces) &&
          item.details.instructions === newItem.details.instructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [newItem, ...prev];
    });
  }, []);

  // Update item quantity
  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  // Remove single item
  const handleRemoveItem = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear cart
  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Trigger Sauce / Cheese Splash Animation
  const handleTriggerSplash = useCallback((event: SplashEvent) => {
    setSplashEvent(event);
  }, []);

  // Sausage selection
  const handleSelectSausage = useCallback((sausage: Sausage) => {
    setSelectedSausage(sausage);
  }, []);

  // Topping toggle
  const handleToggleTopping = useCallback((topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      }
      return [...prev, topping];
    });
  }, []);

  // Sauce toggle (max 3)
  const handleToggleSauce = useCallback((sauce: Sauce) => {
    setSelectedSauces((prev) => {
      const exists = prev.some((s) => s.id === sauce.id);
      if (exists) {
        return prev.filter((s) => s.id !== sauce.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), sauce];
      }
      return [...prev, sauce];
    });
  }, []);

  // Reset hot dog
  const handleResetHotDog = useCallback(() => {
    setSelectedSausage(SAUSAGES[0]);
    setSelectedToppings([TOPPINGS[0]]);
    setSelectedSauces([SAUCES[0]]);
  }, []);

  // Customize a Special Dog in the builder
  const handleCustomizeSpecial = useCallback((special: HouseSpecial) => {
    const foundSausage = SAUSAGES.find((s) => s.id === special.sausageId) || SAUSAGES[0];
    const foundToppings = TOPPINGS.filter((t) => special.toppingIds.includes(t.id));
    const foundSauces = SAUCES.filter((s) => special.sauceIds.includes(s.id));

    setSelectedSausage(foundSausage);
    setSelectedToppings(foundToppings);
    setSelectedSauces(foundSauces);

    const element = document.getElementById('fabrica');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Select sauce from showcase in builder
  const handleSelectSauceInBuilder = useCallback((sauce: Sauce) => {
    setSelectedSauces((prev) => {
      const exists = prev.some((s) => s.id === sauce.id);
      if (exists) return prev;
      if (prev.length >= 3) {
        return [...prev.slice(1), sauce];
      }
      return [...prev, sauce];
    });

    // Trigger splash
    setSplashEvent({
      id: sauce.id,
      name: sauce.name,
      color: sauce.color,
      type: 'sauce',
      emoji: sauce.emoji,
    });

    const element = document.getElementById('fabrica');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Smooth scroll helper
  const handleNavigateSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FFCC00] selection:text-black antialiased">
      {/* Dynamic Sauce Squirt / Cheese Cascade Animation Overlay */}
      <SauceSplashOverlay
        event={splashEvent}
        onComplete={() => setSplashEvent(null)}
      />

      {/* Top Bar Contract (3 zones) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartBuilding={() => handleNavigateSection('fabrica')}
          onNavigateSpecials={() => handleNavigateSection('especiales')}
        />

        {/* La Fábrica Ke Dog (Interactive Customizer) */}
        <HotDogBuilder
          selectedSausage={selectedSausage}
          onSelectSausage={handleSelectSausage}
          selectedToppings={selectedToppings}
          onToggleTopping={handleToggleTopping}
          selectedSauces={selectedSauces}
          onToggleSauce={handleToggleSauce}
          onReset={handleResetHotDog}
          onAddToCart={handleAddToCart}
          onTriggerSplash={handleTriggerSplash}
        />

        {/* El Universo de Salsas */}
        <SauceShowcase
          onTriggerSplash={handleTriggerSplash}
          onSelectSauceInBuilder={handleSelectSauceInBuilder}
        />

        {/* Combinaciones Estrella */}
        <HouseSpecials
          onAddToCart={handleAddToCart}
          onCustomizeSpecial={handleCustomizeSpecial}
        />

        {/* Extras: Acompañamientos y Bebidas */}
        <ExtrasSection onAddToCart={handleAddToCart} />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Floating Hot Dog Illustration Only - Click to Order */}
      <FloatingHotDogWidget
        sausage={selectedSausage}
        toppings={selectedToppings}
        sauces={selectedSauces}
        onAddToCart={handleAddToCart}
        onOpenOrder={() => setIsCartOpen(true)}
      />

      {/* Slide-over Cart & WhatsApp Checkout Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToBuilder={() => handleNavigateSection('fabrica')}
      />
    </div>
  );
}
