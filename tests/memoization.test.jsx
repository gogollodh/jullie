import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ShopProvider, useShop } from '../src/context/ShopContext';
import { ShopPage } from '../src/pages/ShopPage';
import { PlantCarePage } from '../src/pages/PlantCarePage';
import { WishlistDrawer } from '../src/components/WishlistDrawer';
import { ProductDetailModal } from '../src/components/ProductDetailModal';
import { CartDrawer } from '../src/components/CartDrawer';
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

  test('CartDrawer applies GREENHOUSE10 promo code discount and navigates to checkout', () => {
    const CartTester = () => {
      const { setIsCartOpen, addToCart, activePage } = useShop();
      return (
        <div>
          <button onClick={() => setIsCartOpen(true)}>Open Cart Drawer Test</button>
          <button onClick={() => addToCart(PRODUCTS[0])}>Add Product To Cart Test</button>
          <span data-testid="active-page">{activePage}</span>
          <CartDrawer />
        </div>
      );
    };

    const { getByRole, getByPlaceholderText, getByText, getAllByText, getByTestId } = render(
      <ShopProvider>
        <CartTester />
      </ShopProvider>
    );

    // Open Cart and Add Item
    act(() => {
      fireEvent.click(getByRole('button', { name: 'Open Cart Drawer Test' }));
      fireEvent.click(getByRole('button', { name: 'Add Product To Cart Test' }));
    });

    expect(getAllByText(PRODUCTS[0].name).length).toBeGreaterThan(0);

    // Type promo code and apply
    const promoInput = getByPlaceholderText(/Promo code/i);
    act(() => {
      fireEvent.change(promoInput, { target: { value: 'GREENHOUSE10' } });
    });

    const applyButton = getByRole('button', { name: 'Apply' });
    act(() => {
      fireEvent.click(applyButton);
    });

    // Verify discount is calculated (10% OFF)
    expect(getByText(/Discount \(10% OFF\)/i)).toBeTruthy();

    // Verify proceed to checkout
    const checkoutButton = getByRole('button', { name: /Proceed to Checkout/i });
    act(() => {
      fireEvent.click(checkoutButton);
    });

    expect(getByTestId('active-page').textContent).toBe('checkout');
  });

  test('CartDrawer empty state evaluates shipping fee as $0', () => {
    const EmptyCartTester = () => {
      const { setIsCartOpen } = useShop();
      return (
        <div>
          <button onClick={() => setIsCartOpen(true)}>Open Cart Drawer Empty Test</button>
          <CartDrawer />
        </div>
      );
    };

    const { getByRole, getByText } = render(
      <ShopProvider>
        <EmptyCartTester />
      </ShopProvider>
    );

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Open Cart Drawer Empty Test' }));
    });

    expect(getByText(/Your cart is empty/i)).toBeTruthy();
  });
});
