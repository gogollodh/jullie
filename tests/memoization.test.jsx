import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ShopProvider, useShop } from '../src/context/ShopContext';
import { ShopPage } from '../src/pages/ShopPage';
import { PlantCarePage } from '../src/pages/PlantCarePage';
import { WishlistDrawer } from '../src/components/WishlistDrawer';
import { ProductDetailModal } from '../src/components/ProductDetailModal';
import { PRODUCTS } from '../src/data/products';
import { GUIDES } from '../src/data/guides';

describe('Filtering & Sorting Memoization Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('ShopPage product filtering uses useMemo and survives unrelated context updates', () => {
    const productsFilterSpy = vi.spyOn(PRODUCTS, 'filter');

    const TestComponent = () => {
      const { addToast } = useShop();
      return (
        <div>
          <button onClick={() => addToast('Test Toast')}>Trigger Shop Toast</button>
          <ShopPage />
        </div>
      );
    };

    const { getByRole } = render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    productsFilterSpy.mockClear();

    // Trigger an unrelated state update (toast)
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Trigger Shop Toast' }));
    });

    // PRODUCTS.filter should NOT have been called during the toast re-render
    expect(productsFilterSpy).not.toHaveBeenCalled();
  });

  test('PlantCarePage guide search filtering is memoized and skips re-computation on unrelated re-renders', () => {
    const guidesFilterSpy = vi.spyOn(GUIDES, 'filter');

    const TestComponent = () => {
      const { addToast } = useShop();
      return (
        <div>
          <button onClick={() => addToast('Care Toast')}>Trigger Care Toast</button>
          <PlantCarePage />
        </div>
      );
    };

    const { getByRole } = render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    guidesFilterSpy.mockClear();

    // Trigger unrelated state update
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Trigger Care Toast' }));
    });

    // Filtering on GUIDES should not run on unrelated context state change
    expect(guidesFilterSpy).not.toHaveBeenCalled();
  });

  test('WishlistDrawer uses memoized Set lookup and skips re-filtering on unrelated context updates', () => {
    const productsFilterSpy = vi.spyOn(PRODUCTS, 'filter');

    const WishlistTester = () => {
      const { setIsWishlistOpen, toggleWishlist, addToast } = useShop();
      return (
        <div>
          <button onClick={() => setIsWishlistOpen(true)}>Open Wishlist Drawer</button>
          <button onClick={() => toggleWishlist(PRODUCTS[0])}>Add First Item to Wishlist</button>
          <button onClick={() => addToast('Unrelated Message')}>Trigger Wishlist Toast</button>
          <WishlistDrawer />
        </div>
      );
    };

    const { getByRole, getAllByText } = render(
      <ShopProvider>
        <WishlistTester />
      </ShopProvider>
    );

    // Open wishlist
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Open Wishlist Drawer' }));
    });

    // Add item to wishlist
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Add First Item to Wishlist' }));
    });

    expect(getAllByText(PRODUCTS[0].name).length).toBeGreaterThan(0);

    productsFilterSpy.mockClear();

    // Trigger unrelated toast
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Trigger Wishlist Toast' }));
    });

    // Filtering should not be called again when wishlist hasn't changed
    expect(productsFilterSpy).not.toHaveBeenCalled();
  });

  test('ProductDetailModal memoizes related products filtering', () => {
    const productsFilterSpy = vi.spyOn(PRODUCTS, 'filter');

    const ModalTester = () => {
      const { setSelectedProduct, addToast } = useShop();
      return (
        <div>
          <button onClick={() => setSelectedProduct(PRODUCTS[0])}>Open Product Modal</button>
          <button onClick={() => addToast('Unrelated Message')}>Trigger Modal Toast</button>
          <ProductDetailModal />
        </div>
      );
    };

    const { getByRole } = render(
      <ShopProvider>
        <ModalTester />
      </ShopProvider>
    );

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Open Product Modal' }));
    });

    productsFilterSpy.mockClear();

    // Trigger unrelated toast
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Trigger Modal Toast' }));
    });

    expect(productsFilterSpy).not.toHaveBeenCalled();
  });
});
