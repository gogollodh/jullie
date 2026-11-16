import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ShopProvider, useShop } from '../src/context/ShopContext';

describe('ShopContext Concurrency & Toast Identification Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  test('Concurrent addToast calls at the same timestamp create distinct IDs and do not prematurely remove other toasts', () => {
    const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;
    const { result } = renderHook(() => useShop(), { wrapper });

    // Freeze time so multiple addToast calls occur at the exact same millisecond
    vi.setSystemTime(1000000000);

    act(() => {
      result.current.addToast('Toast 1');
      result.current.addToast('Toast 2');
      result.current.addToast('Toast 3');
    });

    // Verify 3 toasts exist
    expect(result.current.toasts.length).toBe(3);

    // Verify all IDs are unique
    const ids = result.current.toasts.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(3);

    // Advance timer by 3500ms (timeout duration)
    act(() => {
      vi.advanceTimersByTime(3500);
    });

    // All toasts should be cleaned up after 3500ms
    expect(result.current.toasts.length).toBe(0);
  });

  test('addToCart performs immutable updates under concurrent calls', () => {
    const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;
    const { result } = renderHook(() => useShop(), { wrapper });

    const sampleProduct = { id: 'p1', name: 'Monstera Deliciosa', price: 45.00 };

    act(() => {
      result.current.addToCart(sampleProduct, 1);
      result.current.addToCart(sampleProduct, 2);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  test('toggleWishlist updates wishlist cleanly without side-effects in updaters', () => {
    const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;
    const { result } = renderHook(() => useShop(), { wrapper });

    const sampleProduct = { id: 'p2', name: 'Venus Flytrap', price: 34.00 };

    act(() => {
      result.current.toggleWishlist(sampleProduct);
    });

    expect(result.current.wishlist).toContain('p2');

    act(() => {
      result.current.toggleWishlist(sampleProduct);
    });

    expect(result.current.wishlist).not.toContain('p2');
  });
});
