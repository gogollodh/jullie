import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { GUIDES } from '../data/guides';
import { BookOpen, Search, Sparkles, ArrowLeft, Sun, Droplets, ShieldAlert, Check } from 'lucide-react';

export const PlantCarePage = () => {
  const { selectedGuideId, setSelectedGuideId } = useShop();

  const [activeGuide, setActiveGuide] = useState(() => {
    if (selectedGuideId) {
      return GUIDES.find((g) => g.id === selectedGuideId) || GUIDES[0];
    }
    return null;
  });

  const [search, setSearch] = useState('');

  // Diagnostic Finder state
  const [lightPref, setLightPref] = useState('bright-direct');
  const [experience, setExperience] = useState('beginner');
  const [recommendation, setRecommendation] = useState(null);

  const filteredGuides = GUIDES.filter(
    (g) => g.title.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDiagnose = (e) => {
    e.preventDefault();
    if (experience === 'beginner' && lightPref === 'bright-direct') {
      setRecommendation({
        title: 'Venus Flytrap "King Henry"',
        reason: 'Needs high direct sunlight and simple distilled water tray method. Perfect starting carnivorous plant!'
      });
    } else if (lightPref === 'medium-indirect') {
      setRecommendation({
        title: 'Nepenthes "St. Gaya" or Jewel Orchid',
        reason: 'Thrives in bright indirect room light with high ambient humidity.'
      });
    } else {
      setRecommendation({
        title: 'Apothecary Closed Terrarium',
        reason: 'Self-sustaining ecosystem needing minimal direct maintenance.'
      });
    }
  };

  return (
    <div className="bg-beige-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
            Botanical Knowledge Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950">
            “Learn. Grow. Discover.”
          </h1>
          <p className="text-charcoal-800/80 text-sm sm:text-base">
            Expert articles, humidity guides, distilled water protocols, and care tips for carnivorous and terrarium specimens.
          </p>
        </div>

        {/* If a guide is selected for detail view */}
        {activeGuide ? (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-beige-200 shadow-lg space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <button
              onClick={() => {
                setActiveGuide(null);
                setSelectedGuideId(null);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-moss-800 hover:text-moss-600 bg-moss-100 px-4 py-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
            </button>

            <div className="space-y-4">
              <span className="text-xs font-mono text-moss-700 font-bold uppercase">
                {activeGuide.category} • {activeGuide.readTime}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
                {activeGuide.title}
              </h2>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-beige-100">
              <img src={activeGuide.image} alt={activeGuide.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-stone max-w-none text-charcoal-800 leading-relaxed space-y-4 text-sm sm:text-base">
              {activeGuide.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-forest-600 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search articles (e.g., Flytrap, Terrarium, Water)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-beige-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-charcoal-900 focus:outline-none focus:border-moss-600 shadow-sm"
              />
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  onClick={() => setActiveGuide(guide)}
                  className="group bg-white rounded-3xl border border-beige-200 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all flex flex-col sm:flex-row"
                >
                  <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden bg-beige-100">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-moss-700 uppercase font-bold block mb-1">
                        {guide.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-forest-950 group-hover:text-moss-700 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-charcoal-800/70 line-clamp-3 mt-2">
                        {guide.summary}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-moss-800 flex items-center gap-1">
                      Read Care Guide
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive "Find Your Ideal Plant" Diagnostic Finder */}
            <div className="bg-forest-950 text-beige-50 p-8 sm:p-12 rounded-3xl border border-moss-800 shadow-2xl mt-16">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-moss-400 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-moss-400" /> Plant Finder Calculator
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-beige-50">
                    Which Specimen Suits Your Space?
                  </h3>
                </div>

                <form onSubmit={handleDiagnose} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-beige-200 font-semibold">Available Sunlight:</label>
                      <select
                        value={lightPref}
                        onChange={(e) => setLightPref(e.target.value)}
                        className="w-full bg-forest-900 border border-moss-700 rounded-xl px-3 py-2.5 text-beige-100 focus:outline-none"
                      >
                        <option value="bright-direct">Full Direct Sunlight (Sunny Sill)</option>
                        <option value="medium-indirect">Bright Indirect Light</option>
                        <option value="low-light">Low Light / Enclosed Desk</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-beige-200 font-semibold">Care Experience:</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-forest-900 border border-moss-700 rounded-xl px-3 py-2.5 text-beige-100 focus:outline-none"
                      >
                        <option value="beginner">Beginner (Looking for easy success)</option>
                        <option value="intermediate">Intermediate Collector</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-moss-700 hover:bg-moss-600 text-beige-50 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Calculate Match
                  </button>
                </form>

                {recommendation && (
                  <div className="bg-moss-900/90 p-5 rounded-2xl border border-moss-600 space-y-2 animate-fadeIn">
                    <h4 className="font-serif text-lg font-bold text-moss-300 flex items-center gap-2">
                      <Check className="w-5 h-5 text-moss-400" /> Recommended Match: {recommendation.title}
                    </h4>
                    <p className="text-xs text-beige-200/90">{recommendation.reason}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
