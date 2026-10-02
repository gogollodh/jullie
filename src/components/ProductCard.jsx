import React, { memo } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';

// ⚡ Performance Optimization: Wrap ProductCard in React.memo to avoid redundant re-renders when parent components re-render without changes to product props
export const ProductCard = memo(({ product }) => {
  const { addToCart, wishlist, toggleWishlist, viewProductDetails } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Rare':
        return 'bg-purple-900/90 text-purple-200 border-purple-700/60';
      case 'Best Seller':
        return 'bg-moss-800/90 text-moss-200 border-moss-600/60';
      case 'New Arrival':
        return 'bg-emerald-900/90 text-emerald-200 border-emerald-700/60';
      case 'Limited Stock':
        return 'bg-amber-900/90 text-amber-200 border-amber-700/60';
      default:
        return 'bg-forest-900/90 text-beige-200 border-forest-700/60';
    }
  };

  return (
    <div className="group bg-beige-50/60 hover:bg-white rounded-2xl border border-beige-200/80 hover:border-moss-600/40 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col h-full relative">

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-beige-100 cursor-pointer" onClick={() => viewProductDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.beginnerFriendly && (
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-forest-950/80 text-moss-300 border border-moss-700/50 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-moss-400" /> Beginner Friendly
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-forest-950/40 text-beige-100 hover:bg-forest-950/80 hover:text-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              viewProductDetails(product);
            }}
            className="bg-forest-950/90 text-beige-50 text-xs font-semibold px-4 py-2.5 rounded-full border border-moss-600/60 shadow-lg flex items-center gap-1.5 hover:bg-forest-900 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Scientific Name */}
          <span className="text-[11px] font-mono italic text-moss-700 block mb-1">
            {product.scientificName}
          </span>

          {/* Plant Name */}
          <h3
            onClick={() => viewProductDetails(product)}
            className="font-serif text-lg font-bold text-charcoal-900 hover:text-moss-700 cursor-pointer transition-colors line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-charcoal-800/70 line-clamp-2 leading-relaxed mb-3">
            {product.shortDesc}
          </p>
        </div>

        <div>
          {/* Rating & Availability */}
          <div className="flex items-center justify-between text-xs text-charcoal-800/70 mb-3 border-t border-beige-200/60 pt-3">
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-charcoal-800/50 font-normal">({product.reviewCount})</span>
            </div>
            <span className={`font-medium ${product.stock === 'in_stock' ? 'text-moss-700' : 'text-amber-700'}`}>
              {product.stock === 'in_stock' ? 'In Stock' : 'Limited Stock'}
            </span>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-charcoal-800/50 block font-light">Price</span>
              <span className="font-serif text-xl font-bold text-forest-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="bg-moss-800 hover:bg-moss-700 text-beige-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-moss-300" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
});

ProductCard.displayName = 'ProductCard';
