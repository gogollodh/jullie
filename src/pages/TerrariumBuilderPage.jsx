import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

// ⚡ Performance Optimization: Move static configuration options outside component scope to prevent object allocations on every render
const VESSELS = [
  { id: 'apothecary-jar', name: 'Vintage Apothecary Jar (Glass Cork Lid)', price: 35.00, img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80' },
  { id: 'geometric-dodecahedron', name: 'Geometric Brass & Glass Prism', price: 42.00, img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80' },
  { id: 'large-bell-cloche', name: 'Handblown Victorian Bell Cloche', price: 48.00, img: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80' }
];

const SUBSTRATES = [
  { id: 'volcanic-charcoal', name: 'Volcanic Lava Drainage + Activated Charcoal Substrate', price: 12.00 },
  { id: 'akadama-clay', name: 'Akadama Japanese Clay & Sphagnum Bio-Layer', price: 15.00 }
];

const MOSSES = [
  { id: 'cushion-moss', name: 'Living Pillow Cushion Moss (Leucobryum)', price: 14.00 },
  { id: 'sheet-moss', name: 'Velvet Forest Sheet Moss Clump', price: 12.00 }
];

const PLANT_OPTIONS = [
  { id: 'jewel-orchid-mini', name: 'Miniature Jewel Orchid (Macodes)', price: 24.00 },
  { id: 'ruby-fittonia', name: 'Ruby Nerve Plant (Fittonia)', price: 12.00 },
  { id: 'lemon-button-fern', name: 'Lemon Button Fern', price: 14.00 },
  { id: 'mini-peperomia', name: 'Peperomia Prostrata (String of Turtles)', price: 18.00 }
];

export const TerrariumBuilderPage = () => {
  const { addToCart, navigateTo } = useShop();

  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0]);
  const [selectedSubstrate, setSelectedSubstrate] = useState(SUBSTRATES[0]);
  const [selectedMoss, setSelectedMoss] = useState(MOSSES[0]);
  const [selectedPlants, setSelectedPlants] = useState([PLANT_OPTIONS[0], PLANT_OPTIONS[1]]);
  const [customName, setCustomName] = useState('My Forest Sanctuary');

  // ⚡ Performance Optimization: Memoize total price calculation to prevent recalculations on unrelated state updates (e.g. customName text editing)
  const totalCost = useMemo(() => {
    const vesselCost = selectedVessel ? selectedVessel.price : 0;
    const substrateCost = selectedSubstrate ? selectedSubstrate.price : 0;
    const mossCost = selectedMoss ? selectedMoss.price : 0;
    const plantsCost = selectedPlants.reduce((sum, p) => sum + p.price, 0);
    return vesselCost + substrateCost + mossCost + plantsCost;
  }, [selectedVessel, selectedSubstrate, selectedMoss, selectedPlants]);

  const togglePlant = (plant) => {
    if (selectedPlants.some((p) => p.id === plant.id)) {
      if (selectedPlants.length > 1) {
        setSelectedPlants(selectedPlants.filter((p) => p.id !== plant.id));
      }
    } else {
      if (selectedPlants.length < 3) {
        setSelectedPlants([...selectedPlants, plant]);
      }
    }
  };

  const handleAddCustomTerrariumToCart = () => {
    const customProduct = {
      id: `custom-terrarium-${Date.now()}`,
      name: `Custom Terrarium: "${customName}"`,
      scientificName: 'Personalized Living Ecosystem Kit',
      category: 'terrariums',
      price: totalCost,
      image: selectedVessel.img,
      shortDesc: `Glass vessel: ${selectedVessel.name} with ${selectedPlants.map((p) => p.name).join(', ')}.`,
      description: `Bespoke terrarium kit including ${selectedVessel.name}, ${selectedSubstrate.name}, ${selectedMoss.name}, and plants: ${selectedPlants.map((p) => p.name).join(', ')}.`,
      difficulty: 'Beginner',
      light: 'Bright Indirect Light',
      water: 'Mist lightly 2-3 times per year',
      humidity: 'Enclosed Microclimate',
      temperature: '65°F - 78°F',
      substrate: selectedSubstrate.name,
      beginnerFriendly: true,
      careInstructions: ['Includes custom assembly & care guide.']
    };

    addToCart(customProduct, 1, {
      vessel: selectedVessel.name,
      plants: selectedPlants.map((p) => p.name)
    });
  };

  return (
    <div className="bg-beige-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" /> Interactive Terrarium Lab
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 mb-4">
            Build Your Terrarium.
          </h1>
          <p className="text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
            Select your glass vessel, drainage layer, living moss foundation, and tropical miniature foliage to craft your personalized self-sustaining biosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Builder Options - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Glass Vessel */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-beige-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-forest-950 text-beige-50 text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif text-xl font-bold text-forest-950">Choose Glass Vessel</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {VESSELS.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVessel(v)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col items-center text-center ${
                      selectedVessel.id === v.id
                        ? 'border-moss-700 bg-moss-50/50 shadow-md ring-2 ring-moss-600/30'
                        : 'border-beige-200 hover:border-beige-300 bg-beige-50/50'
                    }`}
                  >
                    <img src={v.img} alt="" className="w-20 h-20 object-cover rounded-lg mb-3" loading="lazy" />
                    <span className="font-serif text-xs font-bold text-charcoal-900 line-clamp-2 mb-1">{v.name}</span>
                    <span className="text-xs font-bold text-moss-800">${v.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Substrate */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-beige-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-forest-950 text-beige-50 text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif text-xl font-bold text-forest-950">Select Bio-Substrate & Drainage</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUBSTRATES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSubstrate(s)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedSubstrate.id === s.id
                        ? 'border-moss-700 bg-moss-50/50 ring-2 ring-moss-600/30'
                        : 'border-beige-200 hover:border-beige-300'
                    }`}
                  >
                    <span className="text-xs font-medium text-charcoal-900 pr-2">{s.name}</span>
                    <span className="text-xs font-bold text-moss-800">${s.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Moss */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-beige-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-forest-950 text-beige-50 text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif text-xl font-bold text-forest-950">Pick Moss Base</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOSSES.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMoss(m)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      selectedMoss.id === m.id
                        ? 'border-moss-700 bg-moss-50/50 ring-2 ring-moss-600/30'
                        : 'border-beige-200 hover:border-beige-300'
                    }`}
                  >
                    <span className="text-xs font-medium text-charcoal-900 pr-2">{m.name}</span>
                    <span className="text-xs font-bold text-moss-800">${m.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Plants Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-beige-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-forest-950 text-beige-50 text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="font-serif text-xl font-bold text-forest-950">Select 1 to 3 Plants</h3>
                </div>
                <span className="text-xs text-moss-800 font-semibold bg-moss-100 px-3 py-1 rounded-full">
                  {selectedPlants.length}/3 selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PLANT_OPTIONS.map((p) => {
                  const isSelected = selectedPlants.some((item) => item.id === p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => togglePlant(p)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-moss-700 bg-moss-50/50 ring-2 ring-moss-600/30'
                          : 'border-beige-200 hover:border-beige-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-moss-700 border-moss-700 text-white' : 'border-beige-300'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-medium text-charcoal-900">{p.name}</span>
                      </div>
                      <span className="text-xs font-bold text-moss-800">${p.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Summary Sidebar - Right Column */}
          <div className="sticky top-28 bg-forest-950 text-beige-100 p-6 sm:p-8 rounded-3xl border border-moss-800 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-mono text-moss-400 uppercase tracking-widest block mb-1">
                Custom Kit Preview
              </span>
              <h2 className="font-serif text-2xl font-bold text-beige-50 mb-3">
                Terrarium Summary
              </h2>

              <label className="block text-xs text-beige-300/80 mb-1">Name Your Ecosystem:</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-forest-900 border border-moss-700/60 rounded-xl px-3 py-2 text-xs text-beige-50 focus:outline-none focus:border-moss-400 mb-4"
              />
            </div>

            <div className="space-y-3 text-xs border-t border-b border-moss-900/80 py-4">
              <div className="flex justify-between items-center">
                <span className="text-beige-300/70">Vessel:</span>
                <span className="font-semibold text-right max-w-[180px] truncate">{selectedVessel.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-beige-300/70">Substrate:</span>
                <span className="font-semibold text-right max-w-[180px] truncate">{selectedSubstrate.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-beige-300/70">Moss:</span>
                <span className="font-semibold text-right max-w-[180px] truncate">{selectedMoss.name}</span>
              </div>
              <div>
                <span className="text-beige-300/70 block mb-1">Plants Included:</span>
                <ul className="space-y-1 pl-2">
                  {selectedPlants.map((p) => (
                    <li key={p.id} className="font-medium text-moss-300 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-moss-400" /> {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-baseline">
              <span className="text-xs text-beige-300/80">Custom Kit Total</span>
              <span className="font-serif text-3xl font-bold text-beige-50">
                ${totalCost.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddCustomTerrariumToCart}
              className="w-full bg-moss-700 hover:bg-moss-600 text-beige-50 font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Add Custom Kit to Cart</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-moss-300/80">
              <ShieldCheck className="w-4 h-4 text-moss-400" />
              <span>Includes Step-by-step Terrarium Setup Guide</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
