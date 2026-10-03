import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

// ⚡ Performance Optimization: Extract static array definitions outside component scope to prevent redundant array allocations on re-renders
const CATEGORY_TABS = [
  { id: 'all', label: 'All Plants' },
  { id: 'carnivorous', label: 'Carnivorous Plants' },
  { id: 'terrariums', label: 'Living Terrariums' },
  { id: 'terrarium', label: 'Terrarium Plants & Moss' },
  { id: 'exotic', label: 'Exotic Plants' },
  { id: 'supplies', label: 'Care & Craft Supplies' }
];

const DIFFICULTY_OPTIONS = ['all', 'beginner', 'intermediate', 'collector'];

export const ShopPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    priceRange,
    setPriceRange
  } = useShop();

  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // ⚡ Performance Optimization: Memoize filtered and sorted product list to prevent redundant array iterations on unrelated re-renders
  const sortedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSci = product.scientificName.toLowerCase().includes(q);
        const matchDesc = product.shortDesc.toLowerCase().includes(q);
        if (!matchName && !matchSci && !matchDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && product.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setPriceRange(200);
    setSortBy('featured');
  };

  return (
    <div className="bg-beige-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-moss-700 font-mono text-xs uppercase tracking-widest font-semibold block">
            The Sapliing Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950">
            Botanical Shop
          </h1>
          <p className="text-charcoal-800/80 text-sm sm:text-base">
            Hand-cultivated Carnivorous Specimen, Living Terrarium Glassware, and Rare Exotic Foliage.
          </p>
        </div>

        {/* Filters & Control Bar */}
        <div className="bg-white p-6 rounded-3xl border border-beige-200 shadow-sm space-y-6">

          {/* Top Search & Sorting Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-forest-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search plants by name or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-beige-50 border border-beige-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-moss-600"
              />
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2 text-xs text-charcoal-800">
                <SlidersHorizontal className="w-4 h-4 text-moss-700" />
                <span className="font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-beige-50 border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal-900 focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="text-xs text-moss-800 hover:text-moss-600 font-semibold flex items-center gap-1 underline"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-beige-200/80 pt-4">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-moss-800 text-beige-50 shadow-sm'
                    : 'bg-beige-100 text-charcoal-800 hover:bg-beige-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Price & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs border-t border-beige-200/80">
            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between font-semibold mb-1 text-charcoal-800">
                <span>Max Price:</span>
                <span className="text-moss-800 font-bold">${priceRange}</span>
              </div>
              <input
                type="range"
                min="15"
                max="200"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-moss-700 cursor-pointer"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <span className="font-semibold block mb-1 text-charcoal-800">Care Difficulty:</span>
              <div className="flex gap-2">
                {DIFFICULTY_OPTIONS.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-forest-950 text-beige-50 font-bold'
                        : 'bg-beige-100 text-charcoal-800 hover:bg-beige-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-charcoal-800/70">
          <span>Showing <b>{sortedProducts.length}</b> botanical treasures</span>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-beige-200 space-y-4">
            <Filter className="w-10 h-10 text-forest-700 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-forest-950">No plants match your search criteria</h3>
            <p className="text-xs text-charcoal-800/70">Try clearing filters or adjusting your price slider.</p>
            <button
              onClick={resetFilters}
              className="bg-moss-800 text-beige-50 text-xs font-semibold px-5 py-2.5 rounded-xl inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
