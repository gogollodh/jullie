import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  X, Star, Heart, ShoppingBag, Sun, Droplets, Thermometer,
  Gauge, ShieldCheck, Truck, Sparkles, HelpCircle, FileText, Check
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist, navigateTo } = useShop();

  const [selectedImg, setSelectedImg] = useState(0);
  const [activeTab, setActiveTab] = useState('care'); // 'care', 'faqs', 'reviews', 'shipping'
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isWishlisted = wishlist.includes(product.id);

  // Find related products in same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleBuyNow = () => {
    addToCart(product, qty);
    setSelectedProduct(null);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-beige-50 border border-moss-800/40 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-charcoal-900 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 bg-forest-950/60 hover:bg-forest-950 text-beige-100 p-2.5 rounded-full border border-moss-700/50 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Gallery */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-beige-100 border border-beige-200 shadow-inner mb-4 relative">
                <img
                  src={images[selectedImg] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-forest-950/90 text-moss-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-moss-700/60 backdrop-blur-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImg === idx ? 'border-moss-600 scale-105 shadow-md' : 'border-beige-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Purchase */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono italic text-moss-800 block mb-1">
                  {product.scientificName}
                </span>

                <h1 className="font-serif text-3xl font-bold text-forest-950 mb-2">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 text-xs mb-4">
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-charcoal-800/50">({product.reviewCount} customer reviews)</span>
                  </div>
                  <span className="text-beige-300">|</span>
                  <span className="font-semibold text-moss-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ready to Ship
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-3xl font-bold text-forest-950">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-charcoal-800/60 font-light">
                    Tax included. Insulated packaging available at checkout.
                  </span>
                </div>

                <p className="text-sm text-charcoal-800/80 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 rounded-2xl bg-beige-100/80 border border-beige-200/80 mb-6 text-xs">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-moss-700 shrink-0" />
                    <div>
                      <span className="text-[10px] text-charcoal-800/50 block">Difficulty</span>
                      <span className="font-semibold">{product.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-charcoal-800/50 block">Light</span>
                      <span className="font-semibold truncate">{product.light}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-charcoal-800/50 block">Water</span>
                      <span className="font-semibold truncate">{product.water}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-charcoal-800/50 block">Temperature</span>
                      <span className="font-semibold">{product.temperature}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 sm:col-span-2">
                    <Sparkles className="w-4 h-4 text-moss-700 shrink-0" />
                    <div>
                      <span className="text-[10px] text-charcoal-800/50 block">Substrate</span>
                      <span className="font-semibold">{product.substrate}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-beige-300 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="px-3 py-2 text-sm text-charcoal-800 hover:bg-beige-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="px-3 py-2 text-sm text-charcoal-800 hover:bg-beige-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(product, qty)}
                      className="flex-1 bg-moss-800 hover:bg-moss-700 text-beige-50 font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart — ${(product.price * qty).toFixed(2)}</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-xl border transition-colors ${
                        isWishlisted
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'border-beige-300 text-charcoal-800 hover:bg-beige-200'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-forest-950 hover:bg-forest-900 text-beige-50 font-medium py-3 rounded-xl transition-colors border border-moss-800 text-sm"
                  >
                    Instant Buy Now
                  </button>
                </div>

              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-beige-200/80 grid grid-cols-2 gap-4 text-xs text-charcoal-800/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-moss-700" />
                  <span>100% Healthy Arrival Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-moss-700" />
                  <span>Thermal Eco-Insulated Packaging</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs Section: Care Instructions, FAQs, Shipping, Reviews */}
          <div className="mt-12 pt-8 border-t border-beige-200">
            <div className="flex border-b border-beige-300 gap-6 text-sm font-semibold mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'care' ? 'border-moss-700 text-moss-800 font-bold' : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
                }`}
              >
                <FileText className="w-4 h-4" /> Care Instructions
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'faqs' ? 'border-moss-700 text-moss-800 font-bold' : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" /> FAQs
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
                  activeTab === 'shipping' ? 'border-moss-700 text-moss-800 font-bold' : 'border-transparent text-charcoal-800/60 hover:text-charcoal-900'
                }`}
              >
                <Truck className="w-4 h-4" /> Shipping & Guarantee
              </button>
            </div>

            {/* Tab Contents */}
            <div className="text-sm leading-relaxed text-charcoal-800">
              {activeTab === 'care' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-forest-950 mb-2">
                    How to Keep Your {product.name} Thriving
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-charcoal-800/80">
                    {product.careInstructions ? (
                      product.careInstructions.map((step, idx) => <li key={idx}>{step}</li>)
                    ) : (
                      <li>Keep in recommended light and water conditions outlined above.</li>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  {product.faqs && product.faqs.length > 0 ? (
                    product.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-beige-100/80 p-4 rounded-xl border border-beige-200">
                        <p className="font-bold text-forest-950 mb-1">Q: {faq.q}</p>
                        <p className="text-xs text-charcoal-800/80">A: {faq.a}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-charcoal-800/70 italic">Have a question? Reach out to our botanical team via Contact page.</p>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-forest-950">Botanical Express Shipping & Live Arrival Guarantee</h4>
                  <p className="text-xs text-charcoal-800/80">
                    All plants are carefully packed in our signature thermal-insulated boxes with heat packs or ice gel inserts depending on season. If any specimen arrives damaged, submit a photo within 48 hours for an instant replacement or refund.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-beige-200">
              <h3 className="font-serif text-2xl font-bold text-forest-950 mb-6">
                You May Also Admire
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
