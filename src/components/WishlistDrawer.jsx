import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    viewProductDetails
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-forest-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-beige-50 text-charcoal-900 border-l border-moss-800/40 shadow-2xl flex flex-col justify-between">
          
          {/* Wishlist Header */}
          <div className="p-6 bg-forest-950 text-beige-50 border-b border-moss-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-400 fill-current" />
              <h2 className="font-serif text-xl font-bold tracking-tight">Saved Botanical Wishlist</h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-forest-400 hover:text-beige-100 p-2 rounded-full hover:bg-forest-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-beige-200">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-beige-200/60 rounded-full flex items-center justify-center mx-auto text-rose-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-950">Your wishlist is empty</h3>
                <p className="text-xs text-charcoal-800/70 max-w-xs mx-auto">
                  Heart your favorite carnivorous and terrarium specimens as you explore.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-beige-200 shrink-0 bg-beige-100 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      viewProductDetails(product);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        viewProductDetails(product);
                      }}
                      className="font-serif text-sm font-bold text-charcoal-900 truncate hover:text-moss-700 cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <span className="text-[10px] font-mono italic text-moss-700 block mb-1">
                      {product.scientificName}
                    </span>
                    <span className="text-xs font-bold text-forest-900 block mb-2">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-moss-800 hover:bg-moss-700 text-beige-50 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-rose-600 hover:text-rose-800 p-1 text-xs"
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

        </div>
      </div>
    </div>
  );
};
