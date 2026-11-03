import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Context Definitions
export const ToastContext = createContext(null);
export const NavigationContext = createContext(null);
export const FilterContext = createContext(null);
export const WishlistContext = createContext(null);
export const CartContext = createContext(null);
export const CatalogContext = createContext(null);

// Domain Hooks
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

// 1. Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({
    toasts,
    addToast,
    removeToast
  }), [toasts, addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// 2. Navigation Provider
export const NavigationProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedGuideId, setSelectedGuideId] = useState(null);

  const navigateTo = useCallback((page, guideId = null) => {
    setActivePage(page);
    if (guideId !== null && guideId !== undefined) {
      setSelectedGuideId(guideId);
    }
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const value = useMemo(() => ({
    activePage,
    setActivePage,
    selectedGuideId,
    setSelectedGuideId,
    navigateTo
  }), [activePage, selectedGuideId, navigateTo]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// 3. Filter Provider
export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [priceRange, setPriceRange] = useState(200);

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    priceRange,
    setPriceRange
  }), [searchQuery, selectedCategory, selectedDifficulty, priceRange]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// 4. Wishlist Provider
export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sapliing_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sapliing_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    let message = '';
    setWishlist((prev) => {
      const exists = prev.some((id) => id === product.id);
      if (exists) {
        message = `Removed "${product.name}" from wishlist`;
        return prev.filter((id) => id !== product.id);
      } else {
        message = `Saved "${product.name}" to wishlist ❤️`;
        return [...prev, product.id];
      }
    });
    if (message) {
      addToast(message);
    }
  }, [addToast]);

  const value = useMemo(() => ({
    wishlist,
    setWishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen
  }), [wishlist, toggleWishlist, isWishlistOpen]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// 5. Cart Provider
export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sapliing_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sapliing_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1, customOptions = null) => {
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
  }, [addToast]);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const updateQuantity = useCallback((index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);
  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const value = useMemo(() => ({
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    isCartOpen,
    setIsCartOpen
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount, isCartOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// 6. Catalog Provider
export const CatalogProvider = ({ children }) => {
  const { cart, clearCart } = useCart();
  const { navigateTo } = useNavigation();
  const { addToast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
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

  const markAsViewed = useCallback((product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  }, []);

  const viewProductDetails = useCallback((product) => {
    setSelectedProduct(product);
    if (product) markAsViewed(product);
  }, [markAsViewed]);

  const placeOrder = useCallback((orderDetails) => {
    setOrders((prev) => {
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
      return [newOrder, ...prev];
    });
    clearCart();
    navigateTo('account');
    addToast('Order successfully placed! Thank you for growing with us 🌱');
  }, [cart, clearCart, navigateTo, addToast]);

  const value = useMemo(() => ({
    selectedProduct,
    setSelectedProduct,
    recentlyViewed,
    setRecentlyViewed,
    markAsViewed,
    viewProductDetails,
    orders,
    setOrders,
    placeOrder
  }), [selectedProduct, recentlyViewed, markAsViewed, viewProductDetails, orders, placeOrder]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};

// Composite ShopProvider
export const ShopProvider = ({ children }) => {
  return (
    <ToastProvider>
      <NavigationProvider>
        <FilterProvider>
          <WishlistProvider>
            <CartProvider>
              <CatalogProvider>
                {children}
              </CatalogProvider>
            </CartProvider>
          </WishlistProvider>
        </FilterProvider>
      </NavigationProvider>
    </ToastProvider>
  );
};

// Backward-compatible useShop facade hook
export const useShop = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const filter = useFilter();
  const wishlist = useWishlist();
  const cart = useCart();
  const catalog = useCatalog();

  return useMemo(() => ({
    ...navigation,
    ...cart,
    ...wishlist,
    ...filter,
    ...toast,
    ...catalog
  }), [navigation, cart, wishlist, filter, toast, catalog]);
};
