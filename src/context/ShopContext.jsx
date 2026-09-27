import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  
  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sapliing_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sapliing_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [priceRange, setPriceRange] = useState(200);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'SAP-88392',
      date: 'Sep 20, 2026',
      status: 'In Transit - Out for Delivery',
      trackingNumber: '1Z9999999999999999',
      items: [
        { name: 'Venus Flytrap "King Henry"', qty: 1, price: 34.00, image: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=400&q=80' }
      ],
      total: 39.50
    }
  ]);

  // Persist cart and wishlist
  useEffect(() => {
    localStorage.setItem('sapliing_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sapliing_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const addToCart = (product, quantity = 1, customOptions = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && JSON.stringify(item.customOptions) === JSON.stringify(customOptions)
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, customOptions }];
      }
    });
    addToast(`Added "${product.name}" to cart 🌿`);
  };

  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((id) => id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Saved "${product.name}" to wishlist ❤️`);
        return [...prev, product.id];
      }
    });
  };

  // Recently Viewed
  const markAsViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    if (product) markAsViewed(product);
  };

  const navigateTo = (page, guideId = null) => {
    setActivePage(page);
    if (guideId) setSelectedGuideId(guideId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `SAP-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing - Preparing Botanical Packaging',
      trackingNumber: `1Z99${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      items: cart.map(item => ({
        name: item.product.name,
        qty: item.quantity,
        price: item.product.price,
        image: item.product.image
      })),
      total: orderDetails.total,
      shippingAddress: orderDetails.address
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    navigateTo('account');
    addToast('Order successfully placed! Thank you for growing with us 🌱');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        activePage,
        navigateTo,
        selectedGuideId,
        setSelectedGuideId,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        priceRange,
        setPriceRange,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,
        toasts,
        addToast,
        removeToast,
        orders,
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
