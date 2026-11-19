import React from 'react';
import { KeDogLogo } from './KeDogLogo';
import { Flame, MapPin, Clock, Phone, Heart } from 'lucide-react';
import { DrippingSauceHeader } from './DrippingSauceHeader';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
}) => {
  return (
    <footer className="relative bg-black text-white pt-12 pb-12 border-t border-[#1C1C20] overflow-hidden">
      {/* Dripping top transition in yellow */}
      <DrippingSauceHeader color="yellow" height={28} className="absolute top-0 left-0 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#202025]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <KeDogLogo size="md" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mt-2">
              La casa de los perros calientes más brutales y cargados de sabor. Pan de batata artesanal dorado a la mantequilla y 6 salsas salvajes listas para chorrear.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1 text-[#FFCC00]">
                <Flame className="w-3.5 h-3.5 fill-[#FFCC00]" />
                100% Street Food de Autor
              </span>
              <span aria-hidden="true">·</span>
              <span>Panadería Exclusiva</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFCC00]">
              La Carta Ke Dog
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => onNavigateSection('fabrica')}
                  className="hover:text-white transition-colors"
                >
                  La Fábrica (Configurador)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('salsas')}
                  className="hover:text-white transition-colors"
                >
                  El Universo de Salsas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('especiales')}
                  className="hover:text-white transition-colors"
                >
                  Combinaciones Estrella
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('extras')}
                  className="hover:text-white transition-colors"
                >
                  Papas & Bebidas Frías
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-3 text-sm text-neutral-400">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF0000]">
              Horarios & Delivery
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FFCC00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">Martes a Domingo</span>
                  <span>5:00 PM – 12:30 AM (Callejero nocturno)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">Food Truck Park Principal</span>
                  <span>Zona Gourmet Urbana · Envíos a toda la ciudad</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">WhatsApp Pedidos</span>
                  <span>Envíos rápidos con confirmación al instante</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Ke Dog. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Hecho para fanáticos del street food brutal</span>
            <Flame className="w-3.5 h-3.5 text-[#FF0000]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
