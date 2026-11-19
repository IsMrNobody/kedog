import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Copy, Check, MapPin, User, Phone, FileText } from 'lucide-react';
import { CartItem } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateToBuilder: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToBuilder,
}) => {
  // Customer delivery state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerNotes, setCustomerNotes] = useState('');
  const [storePhone, setStorePhone] = useState('584129998877'); // Customizable business WhatsApp
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = deliveryType === 'delivery' && cartItems.length > 0 ? 2.0 : 0.0;
  const total = subtotal + deliveryFee;

  // Generate random order ID #KD-XXXX
  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  // Build the preformatted WhatsApp message
  const buildWhatsAppMessage = () => {
    const orderId = generateOrderId();

    let text = `¡Hola Ke Dog! 🌭 Quiero realizar el siguiente pedido:\n\n`;
    text += `- Pedido ID: #KD-${orderId}\n`;

    // Filter dogs
    const dogs = cartItems.filter(
      (i) => i.type === 'custom_dog' || i.type === 'special_dog'
    );
    const extras = cartItems.filter((i) => i.type === 'extra');

    dogs.forEach((dog, idx) => {
      const sausageName = dog.details.sausage || 'Salchicha Premium';
      const toppingsList =
        dog.details.toppings && dog.details.toppings.length > 0
          ? dog.details.toppings.join(', ')
          : 'Sin toppings adicionales';
      const saucesList =
        dog.details.sauces && dog.details.sauces.length > 0
          ? dog.details.sauces.join(', ')
          : 'Sin salsas';

      text += `- Perro ${idx + 1}: ${sausageName} en Pan de Batata. (${dog.quantity}x)\n`;
      text += `  Toppings: ${toppingsList}\n`;
      text += `  Salsas: ${saucesList}\n`;
      if (dog.details.instructions) {
        text += `  Nota del perro: ${dog.details.instructions}\n`;
      }
    });

    if (extras.length > 0) {
      text += `\n- Complementos & Bebidas:\n`;
      extras.forEach((ext) => {
        text += `  · ${ext.quantity}x ${ext.title} ($${(ext.unitPrice * ext.quantity).toFixed(2)})\n`;
      });
    }

    const additionalNotes = customerNotes.trim()
      ? customerNotes.trim()
      : 'Ninguno';
    text += `\n- Detalles adicionales: ${additionalNotes}\n`;

    const addressText =
      deliveryType === 'delivery'
        ? deliveryAddress.trim() || '[Escribir aquí]'
        : 'Retiro en Local Ke Dog';
    text += `\nDirección de Delivery: ${addressText}\n`;
    text += `Nombre del cliente: ${customerName.trim() || '[Escribir aquí]'}\n`;
    if (customerPhone.trim()) {
      text += `Teléfono de contacto: ${customerPhone.trim()}\n`;
    }
    text += `Total a pagar: $${total.toFixed(2)}\n`;

    return text;
  };

  const handleSendWhatsApp = () => {
    const rawMessage = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(rawMessage);
    const cleanPhone = storePhone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const rawMessage = buildWhatsAppMessage();
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn flex justify-end">
      {/* Slide-over panel */}
      <div className="w-full max-w-lg bg-black border-l-2 border-[#FFCC00] flex flex-col h-full shadow-[0_0_50px_rgba(255,204,0,0.2)]">
        {/* Header */}
        <div className="p-5 border-b border-[#222226] bg-[#0A0A0C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF0000] text-white flex items-center justify-center font-black">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-white text-lg uppercase tracking-tight">
                Tu Pedido Ke Dog
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} productos listos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#141417] text-neutral-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-[#2B2B32]"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <div className="w-16 h-16 rounded-full bg-[#141416] border border-[#2B2B32] flex items-center justify-center text-3xl mb-4">
                🌭
              </div>
              <h4 className="text-lg font-black text-white uppercase">
                Tu bandeja está vacía
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Aún no has agregado ningún perro caliente brutal ni acompañamientos.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToBuilder();
                }}
                className="mt-6 px-6 py-3 rounded-xl bg-[#FFCC00] text-black font-black text-xs uppercase tracking-wider hover:bg-[#FFE033] transition-colors cursor-pointer"
              >
                Ir a La Fábrica Ke Dog
              </button>
            </div>
          ) : (
            <>
              {/* Item list */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#101013] border-2 border-[#FF0000]/60 rounded-xl p-4 shadow-md relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">
                            {item.title}
                          </h4>
                          <span className="text-xs font-black text-[#FFCC00] tabular-nums">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {item.subtitle}
                        </p>

                        {/* Breakdown */}
                        {item.type !== 'extra' && (
                          <div className="mt-2 text-[11px] text-neutral-300 space-y-1 bg-black/60 p-2 rounded-lg border border-[#222226]">
                            <div>
                              <span className="text-neutral-400 font-semibold">Pan:</span>{' '}
                              Pan de Batata Dorado
                            </div>
                            {item.details.toppings && item.details.toppings.length > 0 && (
                              <div>
                                <span className="text-neutral-400 font-semibold">Toppings:</span>{' '}
                                {item.details.toppings.join(', ')}
                              </div>
                            )}
                            {item.details.sauces && item.details.sauces.length > 0 && (
                              <div>
                                <span className="text-neutral-400 font-semibold">Salsas:</span>{' '}
                                <span className="text-[#FFCC00]">
                                  {item.details.sauces.join(', ')}
                                </span>
                              </div>
                            )}
                            {item.details.instructions && (
                              <div className="italic text-neutral-400">
                                "{item.details.instructions}"
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-[#FF0000] transition-colors p-1"
                        title="Eliminar producto"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity stepper */}
                    <div className="mt-3 pt-2 border-t border-[#1C1C20] flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400 tabular-nums">
                        ${item.unitPrice.toFixed(2)} c/u
                      </span>
                      <div className="flex items-center bg-[#1A1A1E] border border-[#2B2B32] rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white"
                          aria-label="Restar uno"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white"
                          aria-label="Sumar uno"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery & Customer Info Form */}
              <div className="bg-[#0C0C0E] border border-[#2B2B30] rounded-xl p-4 space-y-3 mt-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FFCC00] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Datos de Entrega</span>
                </h4>

                {/* Delivery Type Segmented Button */}
                <div className="flex bg-[#16161A] p-1 rounded-lg border border-[#2B2B32] text-xs font-bold">
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex-1 py-1.5 rounded-md transition-colors ${
                      deliveryType === 'delivery'
                        ? 'bg-[#FF0000] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    🛵 Delivery a Domicilio
                  </button>
                  <button
                    onClick={() => setDeliveryType('pickup')}
                    className={`flex-1 py-1.5 rounded-md transition-colors ${
                      deliveryType === 'pickup'
                        ? 'bg-[#FFCC00] text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    🏪 Retiro en Local
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">
                      Nombre del Cliente *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-black border border-[#2B2B32] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">
                      Teléfono de Contacto
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ej. +58 412 1234567"
                        className="w-full bg-black border border-[#2B2B32] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="block text-neutral-400 mb-1 font-semibold">
                        Dirección de Delivery *
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Calle, edificio, piso, punto de referencia"
                          className="w-full bg-black border border-[#2B2B32] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFCC00]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-neutral-400 mb-1 font-semibold">
                      Detalles o Notas adicionales
                    </label>
                    <div className="relative">
                      <FileText className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Sin cubiertos, cambio en efectivo, etc."
                        className="w-full bg-black border border-[#2B2B32] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Totals and WhatsApp CTA */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#222226] bg-[#0A0A0D] space-y-4">
            {/* Calculation summary */}
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Subtotal:</span>
                <span className="font-semibold text-white tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">
                  {deliveryType === 'delivery' ? 'Costo de Delivery:' : 'Retiro en Local:'}
                </span>
                <span className="font-semibold text-white tabular-nums">
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Gratis'}
                </span>
              </div>
              <div className="flex justify-between text-base font-black pt-2 border-t border-[#222226]">
                <span className="text-white uppercase">Total a Pagar:</span>
                <span className="text-[#FFCC00] tabular-nums text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Prominent WhatsApp Button requested in prompt */}
            <div className="space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-4 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-black font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(37,211,102,0.4)] cursor-pointer active:scale-98"
              >
                <span>🌭 ¡ENVIAR PEDIDO A WHATSAPP! 🌭</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMessage}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#17171C] hover:bg-[#24242C] border border-[#2B2B32] text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
                  title="Copiar texto del pedido"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#25D366]" />
                      <span className="text-[#25D366]">¡Mensaje Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto del Pedido</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClearCart}
                  className="px-3 py-2 rounded-lg bg-[#17171C] hover:bg-[#2B1717] border border-[#2B2B32] hover:border-[#FF0000] text-xs text-neutral-400 hover:text-[#FF0000] transition-colors cursor-pointer"
                  title="Vaciar carrito"
                >
                  Vaciar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
