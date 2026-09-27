import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Leaf, Instagram, Facebook, Mail, ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory, addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      addToast('Welcome to The Sapliing Greenhouse circle! Check your inbox for 10% off. 🌿');
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest-950 text-beige-200 border-t border-moss-900 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Leaf Pattern Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-moss-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter Section */}
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 rounded-2xl p-8 sm:p-12 mb-16 border border-moss-800/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
                Join Our Botanical Club
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-beige-50 font-bold mb-3">
                Enter the Greenhouse.
              </h3>
              <p className="text-beige-300/80 text-sm max-w-md">
                Get first access to rare plant drops, limited terrarium releases, and expert botanical care guides delivered straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-forest-950/80 border border-moss-700/60 rounded-xl px-4 py-3.5 text-sm text-beige-100 placeholder-forest-400 focus:outline-none focus:border-moss-400 flex-1"
              />
              <button
                type="submit"
                className="bg-moss-700 hover:bg-moss-600 text-beige-50 font-medium px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Join Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="p-2 rounded-lg bg-moss-900 border border-moss-700">
                <Leaf className="w-6 h-6 text-moss-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-beige-50">
                The Sapliing
              </span>
            </div>
            <p className="text-beige-300/70 text-sm leading-relaxed max-w-sm">
              The Sapliing is a boutique botanical laboratory specializing in rare carnivorous plants, living terrarium micro-worlds, and extraordinary exotic foliage cultivated for curious minds.
            </p>
            <div className="pt-2 flex items-center gap-4 text-forest-400">
              <a href="#instagram" className="p-2.5 bg-forest-900 hover:bg-moss-800 rounded-lg text-beige-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#facebook" className="p-2.5 bg-forest-900 hover:bg-moss-800 rounded-lg text-beige-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#email" className="p-2.5 bg-forest-900 hover:bg-moss-800 rounded-lg text-beige-200 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="text-beige-50 font-serif text-lg font-semibold mb-4 border-b border-moss-900 pb-2">
              Plant Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-beige-300/80">
              <li>
                <button onClick={() => { setSelectedCategory('carnivorous'); navigateTo('shop'); }} className="hover:text-moss-300 transition-colors">
                  Carnivorous Plants
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('terrariums'); navigateTo('shop'); }} className="hover:text-moss-300 transition-colors">
                  Living Terrariums
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('terrarium'); navigateTo('shop'); }} className="hover:text-moss-300 transition-colors">
                  Terrarium Moss & Plants
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('exotic'); navigateTo('shop'); }} className="hover:text-moss-300 transition-colors">
                  Exotic Rare Foliage
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('builder')} className="hover:text-moss-300 transition-colors">
                  Interactive Terrarium Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge & Experience */}
          <div>
            <h4 className="text-beige-50 font-serif text-lg font-semibold mb-4 border-b border-moss-900 pb-2">
              Learn & Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-beige-300/80">
              <li>
                <button onClick={() => navigateTo('care')} className="hover:text-moss-300 transition-colors">
                  Plant Care Guides
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('care')} className="hover:text-moss-300 transition-colors">
                  Venus Flytrap Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('care')} className="hover:text-moss-300 transition-colors">
                  Terrarium Care & Design
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-moss-300 transition-colors">
                  Our Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-moss-300 transition-colors">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Greenhouse Location */}
          <div>
            <h4 className="text-beige-50 font-serif text-lg font-semibold mb-4 border-b border-moss-900 pb-2">
              Botanical Greenhouse
            </h4>
            <div className="space-y-3 text-sm text-beige-300/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-moss-400 mt-0.5 shrink-0" />
                <span>482 Greenhouse Way, Botanical District, Pacific NW</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-moss-400 shrink-0" />
                <span>Tue - Sun: 10am - 6pm</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-moss-400 shrink-0" />
                <span>100% Live Arrival Guarantee</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-moss-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-beige-300/60 gap-4">
          <p>© {new Date().getFullYear()} The Sapliing. All rights reserved. Crafted with passion for extraordinary botanicals.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-beige-100 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-beige-100 transition-colors">Terms of Service</a>
            <a href="#shipping" className="hover:text-beige-100 transition-colors">Shipping & Refund Guarantee</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
