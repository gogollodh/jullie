import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Truck, CheckCircle, Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export const AccountPage = () => {
  const { orders, navigateTo } = useShop();

  return (
    <div className="bg-beige-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="bg-forest-950 text-beige-50 p-8 rounded-3xl border border-moss-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-1">
              Collector Account Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-beige-50">
              Welcome, Julian Thorne
            </h1>
            <p className="text-xs text-beige-300/80 mt-1">
              Member since 2026 • VIP Greenhouse Collector
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="bg-moss-800 hover:bg-moss-700 text-beige-50 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            Explore New Arrivals
          </button>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-forest-950 flex items-center gap-2">
            <Package className="w-6 h-6 text-moss-700" /> Your Botanical Orders
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-beige-200">
              <Package className="w-10 h-10 text-forest-600 mx-auto mb-2" />
              <p className="text-xs text-charcoal-800/70">No orders placed yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-200 shadow-sm space-y-6">
                
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-beige-200 pb-4 text-xs">
                  <div>
                    <span className="text-charcoal-800/60 block">Order ID</span>
                    <span className="font-serif text-base font-bold text-forest-950">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-800/60 block">Date Placed</span>
                    <span className="font-semibold text-charcoal-900">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-800/60 block">Tracking Number</span>
                    <span className="font-mono text-moss-800 font-bold">{order.trackingNumber}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-800/60 block">Total</span>
                    <span className="font-serif text-base font-bold text-forest-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="bg-beige-100 p-4 rounded-2xl border border-beige-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-forest-950">
                    <span className="flex items-center gap-1.5 text-moss-800">
                      <Truck className="w-4 h-4" /> Status: {order.status}
                    </span>
                    <span className="text-[10px] text-charcoal-800/60">Estimated Delivery: Tomorrow by 2 PM</span>
                  </div>

                  <div className="w-full bg-beige-300 h-2 rounded-full overflow-hidden">
                    <div className="bg-moss-700 h-full w-3/4 rounded-full animate-pulse" />
                  </div>

                  <div className="grid grid-cols-4 text-[10px] text-charcoal-800/70 text-center font-medium pt-1">
                    <span className="text-moss-800 font-bold">1. Order Placed</span>
                    <span className="text-moss-800 font-bold">2. Thermal Packed</span>
                    <span className="text-moss-800 font-bold">3. In Transit</span>
                    <span>4. Delivered</span>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-charcoal-800">Items in this shipment:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-beige-50 rounded-xl border border-beige-200/80">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-beige-200 shrink-0" />
                        <div className="text-xs">
                          <span className="font-bold text-forest-950 block">{item.name}</span>
                          <span className="text-charcoal-800/60">Qty: {item.qty} • ${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
