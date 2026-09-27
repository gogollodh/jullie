import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    navigateTo,
    addToast
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GREENHOUSE10') {
      setDiscount(0.10);
      addToast('10% Promo Code "GREENHOUSE10" applied! 🎉');
    } else {
      addToast('Invalid promo code. Try "GREENHOUSE10"', 'info');
    }
  };

  const finalDiscountAmount = cartTotal * discount;
  const shippingFee = cartTotal > 85 || cartTotal === 0 ? 0 : 9.99;
  const grandTotal = cartTotal - finalDiscountAmount + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-forest-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-beige-50 text-charcoal-900 border-l border-moss-800/40 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 bg-forest-950 text-beige-50 border-b border-moss-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-moss-400" />
              <h2 className="font-serif text-xl font-bold tracking-tight">Your Botanical Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-forest-400 hover:text-beige-100 p-2 rounded-full hover:bg-forest-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-beige-200">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-beige-200/60 rounded-full flex items-center justify-center mx-auto text-forest-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-950">Your cart is empty</h3>
                <p className="text-xs text-charcoal-800/70 max-w-xs mx-auto">
                  Discover extraordinary Venus Flytraps, living terrariums, and rare exotic foliage.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="bg-moss-800 hover:bg-moss-700 text-beige-50 text-xs font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm inline-block"
                >
                  Explore Plants
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-beige-200 shrink-0 bg-beige-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-charcoal-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] font-mono italic text-moss-700 block mb-1">
                      {item.product.scientificName}
                    </span>
                    <span className="text-xs font-bold text-forest-900 block">
                      ${item.product.price.toFixed(2)}
                    </span>

                    {item.customOptions && (
                      <span className="text-[10px] text-moss-800 bg-moss-100 px-2 py-0.5 rounded-md inline-block mt-1">
                        Custom Terrarium Kit
                      </span>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-beige-300 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-1 text-charcoal-800 hover:bg-beige-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 font-bold min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-1 text-charcoal-800 hover:bg-beige-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 text-xs transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-beige-100/90 border-t border-beige-200/80 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-forest-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. GREENHOUSE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white border border-beige-300 rounded-xl pl-9 pr-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-moss-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-forest-900 hover:bg-forest-800 text-beige-50 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal-800">
                <div className="flex justify-between">
                  <span className="text-charcoal-800/70">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-moss-700 font-semibold">
                    <span>Discount (10% OFF)</span>
                    <span>-${finalDiscountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal-800/70">Insulated Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-moss-700 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-beige-300 text-forest-950">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {cartTotal < 85 && (
                <div className="bg-moss-100/80 p-2.5 rounded-xl border border-moss-200 text-[11px] text-moss-900 text-center font-medium">
                  Add <b>${(85 - cartTotal).toFixed(2)}</b> more for complimentary insulated shipping!
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full bg-moss-800 hover:bg-moss-700 text-beige-50 font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-800/60 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-moss-700" />
                <span>256-Bit SSL Encrypted Botanical Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
