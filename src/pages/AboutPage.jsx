import React from 'react';
import { useShop } from '../context/ShopContext';
import { Leaf, Sparkles, Compass, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-beige-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Hero */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
          Our Brand Story
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest-950">
          The Sapliing
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-moss-800">
          “Where plants become living experiences.”
        </p>
        <p className="text-charcoal-800/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Founded in the damp, mossy heart of the Pacific Northwest, **The Sapliing** is a boutique botanical laboratory born from an obsessive fascination with non-traditional flora — carnivorous hunters, glass-enclosed biospheres, and rare velvet tropical foliage.
        </p>
      </div>

      {/* Image & Philosophy Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80"
            alt="Greenhouse Laboratory"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-charcoal-800 text-sm sm:text-base leading-relaxed">
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            A Sanctuary for Curious Minds
          </h2>
          <p>
            We believe that keeping plants should evoke wonder. Standard houseplants are lovely, but watching a Venus Flytrap snap shut, inspecting the intricate veins of a Jewel Orchid under ambient light, or watching a sealed terrarium create its own rainfall is pure magic.
          </p>
          <p>
            Every single specimen in our collection is propagated sustainably using ethical lab methods and raised in controlled micro-greenhouses to ensure zero disruption to wild bogs or rain forests.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-6xl mx-auto bg-forest-950 text-beige-50 p-10 sm:p-14 rounded-3xl border border-moss-800 shadow-2xl space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold">Our Core Pillars</h2>
          <p className="text-xs text-beige-300/80">Guided by botanical excellence and environmental stewardship.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs">
          <div className="space-y-3 p-4 bg-forest-900/60 rounded-2xl border border-moss-800">
            <Compass className="w-8 h-8 text-moss-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-beige-50">Curiosity</h3>
            <p className="text-beige-300/70">Celebrating nature's most unusual, carnivorous, and evolutionary adaptations.</p>
          </div>
          <div className="space-y-3 p-4 bg-forest-900/60 rounded-2xl border border-moss-800">
            <Leaf className="w-8 h-8 text-moss-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-beige-50">Sustainability</h3>
            <p className="text-beige-300/70">100% lab-cultivated specimens that protect fragile wild bog habitats.</p>
          </div>
          <div className="space-y-3 p-4 bg-forest-900/60 rounded-2xl border border-moss-800">
            <ShieldCheck className="w-8 h-8 text-moss-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-beige-50">Care Guarantee</h3>
            <p className="text-beige-300/70">Comprehensive care support and 100% healthy live arrival warranty on every shipment.</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-moss-700 hover:bg-moss-600 text-beige-50 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm inline-flex items-center gap-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
