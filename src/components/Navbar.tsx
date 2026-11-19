import React from 'react';
import { ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { KeDogLogo } from './KeDogLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#222225] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Brand Wordmark (Single visual brand anchor) */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
            aria-label="Ke Dog Inicio"
          >
            <KeDogLogo size="sm" />
          </a>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide text-neutral-300">
          <button
            onClick={() => onNavigateSection('fabrica')}
            className="hover:text-[#FFCC00] transition-colors whitespace-nowrap"
          >
            La Fábrica
          </button>
          <button
            onClick={() => onNavigateSection('salsas')}
            className="hover:text-[#FFCC00] transition-colors whitespace-nowrap"
          >
            Universo de Salsas
          </button>
          <button
            onClick={() => onNavigateSection('especiales')}
            className="hover:text-[#FFCC00] transition-colors whitespace-nowrap"
          >
            Combinaciones Estrella
          </button>
          <button
            onClick={() => onNavigateSection('extras')}
            className="hover:text-[#FFCC00] transition-colors whitespace-nowrap"
          >
            Acompañamientos
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#FFCC00] text-black font-extrabold text-xs sm:text-sm hover:bg-[#FFE033] active:scale-95 transition-all shadow-[0_4px_15px_rgba(255,204,0,0.3)] whitespace-nowrap"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Tu Pedido</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-[#FFCC00] text-[11px] sm:text-xs font-black flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
