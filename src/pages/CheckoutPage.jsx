import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, cartTotal, placeOrder, navigateTo } = useShop();

  const [address, setAddress] = useState({
    firstName: 'Julian',
    lastName: 'Thorne',
    email: 'julian@example.com',
    street: '1042 Botanical Ave, Suite 3B',
    city: 'Seattle',
    state: 'WA',
    zip: '98101'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const shippingCost = cartTotal > 85 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    placeOrder({
      total,
      address: `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    });
  };

  if (cart.length === 0) {
    return (
      <div className="bg-beige-50 min-h-screen py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Your cart is empty</h2>
        <p className="text-xs text-charcoal-800/70">Add plants before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-moss-800 text-beige-50 text-xs font-semibold px-6 py-3 rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-beige-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-moss-800 hover:text-moss-600"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Botanical Secure Checkout
          </h1>
          <p className="text-xs text-charcoal-800/70">
            Includes thermal insulated packaging and 100% Live Arrival Guarantee.
          </p>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shipping & Payment Form - Left 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Address Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <Truck className="w-5 h-5 text-moss-700" /> 1. Shipping Destination
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-charcoal-800">First Name</label>
                  <input
                    type="text"
                    required
                    value={address.firstName}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-charcoal-800">Last Name</label>
                  <input
                    type="text"
                    required
                    value={address.lastName}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-semibold text-charcoal-800">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-semibold text-charcoal-800">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-charcoal-800">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-charcoal-800">State / ZIP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-1/2 bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                    />
                    <input
                      type="text"
                      required
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="w-1/2 bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-moss-700" /> 2. Payment Method
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3 border border-moss-700 bg-moss-50/40 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-moss-800" />
                    <div>
                      <span className="font-bold block text-forest-950">Credit / Debit Card</span>
                      <span className="text-charcoal-800/60 text-[10px]">Encrypted via 256-Bit SSL</span>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-moss-700" />
                </div>

                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-beige-50 border border-beige-300 rounded-xl px-3 py-2.5 text-charcoal-900"
                />
              </div>
            </div>

          </div>

          {/* Order Summary - Right Column */}
          <div className="bg-forest-950 text-beige-50 p-6 sm:p-8 rounded-3xl border border-moss-800 shadow-xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-beige-50 border-b border-moss-900 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs divide-y divide-moss-900/80">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-beige-100 block">{item.product.name}</span>
                    <span className="text-[10px] text-moss-300">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-moss-900 pt-4 text-beige-200">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insulated Shipping</span>
                <span>{shippingCost === 0 ? <span className="text-moss-400 font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-beige-50 pt-2 border-t border-moss-800">
                <span>Grand Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-moss-700 hover:bg-moss-600 text-beige-50 font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Place Order (${total.toFixed(2)})</span>
            </button>

            <div className="text-[10px] text-center text-moss-300/80">
              By clicking "Place Order", you agree to The Sapliing live arrival terms & conditions.
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
