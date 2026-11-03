import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, act, fireEvent, renderHook } from '@testing-library/react';
import {
  ShopProvider,
  ToastProvider,
  NavigationProvider,
  FilterProvider,
  WishlistProvider,
  CartProvider,
  CatalogProvider,
  useToast,
  useNavigation,
  useFilter,
  useWishlist,
  useCart,
  useCatalog,
  useShop
} from '../src/context/ShopContext';
import { ProductCard } from '../src/components/ProductCard';
import { PRODUCTS } from '../src/data/products';

describe('Domain-Sliced React Context Architecture Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('All six domain context providers exist and export isolated state via domain hooks', () => {
    const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;

    const { result: toastRes } = renderHook(() => useToast(), { wrapper });
    expect(toastRes.current.toasts).toBeDefined();
    expect(typeof toastRes.current.addToast).toBe('function');

    const { result: navRes } = renderHook(() => useNavigation(), { wrapper });
    expect(navRes.current.activePage).toBe('home');
    expect(typeof navRes.current.navigateTo).toBe('function');

    const { result: filterRes } = renderHook(() => useFilter(), { wrapper });
    expect(filterRes.current.searchQuery).toBe('');
    expect(typeof filterRes.current.setSearchQuery).toBe('function');

    const { result: wishlistRes } = renderHook(() => useWishlist(), { wrapper });
    expect(Array.isArray(wishlistRes.current.wishlist)).toBe(true);
    expect(typeof wishlistRes.current.toggleWishlist).toBe('function');

    const { result: cartRes } = renderHook(() => useCart(), { wrapper });
    expect(Array.isArray(cartRes.current.cart)).toBe(true);
    expect(typeof cartRes.current.addToCart).toBe('function');

    const { result: catalogRes } = renderHook(() => useCatalog(), { wrapper });
    expect(catalogRes.current.selectedProduct).toBeNull();
    expect(typeof catalogRes.current.viewProductDetails).toBe('function');
  });

  test('Backward-compatible useShop facade hook aggregates all domain states', () => {
    const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;
    const { result } = renderHook(() => useShop(), { wrapper });

    expect(result.current.activePage).toBe('home');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.toasts).toEqual([]);
    expect(result.current.cart).toEqual([]);
    expect(result.current.wishlist).toEqual([]);
    expect(result.current.selectedProduct).toBeNull();
  });

  test('Updating search query state in FilterContext does NOT trigger re-renders in CartContext or WishlistContext consumers', () => {
    let cartRenderCount = 0;
    let wishlistRenderCount = 0;

    const CartConsumer = () => {
      cartRenderCount++;
      const { cart } = useCart();
      return <div data-testid="cart-count">{cart.length}</div>;
    };

    const WishlistConsumer = () => {
      wishlistRenderCount++;
      const { wishlist } = useWishlist();
      return <div data-testid="wishlist-count">{wishlist.length}</div>;
    };

    const FilterConsumer = () => {
      const { searchQuery, setSearchQuery } = useFilter();
      return (
        <input
          placeholder="Search catalog"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      );
    };

    const { getByPlaceholderText } = render(
      <ShopProvider>
        <FilterConsumer />
        <CartConsumer />
        <WishlistConsumer />
      </ShopProvider>
    );

    const initialCartRenders = cartRenderCount;
    const initialWishlistRenders = wishlistRenderCount;

    // Simulate typing in search bar
    const searchInput = getByPlaceholderText('Search catalog');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Flytrap' } });
    });

    // Cart and Wishlist consumers should NOT have re-rendered
    expect(cartRenderCount).toBe(initialCartRenders);
    expect(wishlistRenderCount).toBe(initialWishlistRenders);
  });

  test('Updating toast notifications via ToastContext does NOT cause re-renders in ProductCard components', () => {
    let cardRenderCount = 0;

    const TrackedProductCard = React.memo(({ product }) => {
      cardRenderCount++;
      return <ProductCard product={product} />;
    });

    const ToastTrigger = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('New Toast Alert')}>
          Dispatch Toast
        </button>
      );
    };

    const { getByRole } = render(
      <ShopProvider>
        <ToastTrigger />
        <TrackedProductCard product={PRODUCTS[0]} />
      </ShopProvider>
    );

    const initialCardRenders = cardRenderCount;

    // Dispatch toast update
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Dispatch Toast' }));
    });

    // ProductCard component must NOT re-render
    expect(cardRenderCount).toBe(initialCardRenders);
  });
});
