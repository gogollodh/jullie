import { describe, test, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ShopProvider, useFilter, useNavigation } from '../src/context/ShopContext';
import { ShopPage, CATEGORY_OPTIONS } from '../src/pages/ShopPage';
import { Navbar } from '../src/components/Navbar';
import { Footer } from '../src/components/Footer';
import { HomePage } from '../src/pages/HomePage';
import { PRODUCTS } from '../src/data/products';

describe('Category Taxonomy Normalization Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('ready-terrarium-moss-haven in products.js uses standardized singular category "terrarium"', () => {
    const mossHaven = PRODUCTS.find((p) => p.id === 'ready-terrarium-moss-haven');
    expect(mossHaven).toBeDefined();
    expect(mossHaven.category).toBe('terrarium');
  });

  test('CATEGORY_OPTIONS contains no duplicate options and no plural "terrariums"', () => {
    const ids = CATEGORY_OPTIONS.map((c) => c.id);
    const uniqueIds = Array.from(new Set(ids));
    expect(ids.length).toBe(uniqueIds.length);
    expect(ids).not.toContain('terrariums');
    expect(ids).toContain('terrarium');
  });

  test('every selectable category option in CATEGORY_OPTIONS returns matching products in PRODUCTS', () => {
    CATEGORY_OPTIONS.forEach((cat) => {
      const matchingProducts = PRODUCTS.filter((p) => cat.id === 'all' || p.category === cat.id);
      expect(matchingProducts.length).toBeGreaterThan(0);
    });
  });

  test('ShopPage displays matching products when filtering by "terrarium" category', () => {
    const TestShopWrapper = () => {
      const { setSelectedCategory } = useFilter();
      return (
        <div>
          <button onClick={() => setSelectedCategory('terrarium')}>Filter Terrarium</button>
          <ShopPage />
        </div>
      );
    };

    render(
      <ShopProvider>
        <TestShopWrapper />
      </ShopProvider>
    );

    // Initial state renders all products (12)
    expect(screen.getByText(/The "Moss Haven" Apothecary Glass Terrarium/i)).toBeDefined();

    // Click filter button
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Filter Terrarium' }));
    });

    // Check that terrarium products are displayed
    expect(screen.getByText(/The "Moss Haven" Apothecary Glass Terrarium/i)).toBeDefined();
    expect(screen.getByText(/Lightning Jewel Orchid/i)).toBeDefined();
    expect(screen.getByText(/Living Cushion Moss Clump/i)).toBeDefined();
    expect(screen.getByText(/Ruby Nerve Plant/i)).toBeDefined();

    // Showing 4 botanical treasures
    expect(screen.getByText(/Showing/i).textContent).toContain('4');
  });

  test('Navbar Terrariums link sets selectedCategory to "terrarium" and navigates to shop', () => {
    let currentCategory = null;
    let currentPage = null;

    const StateObserver = () => {
      const { selectedCategory } = useFilter();
      const { activePage } = useNavigation();
      currentCategory = selectedCategory;
      currentPage = activePage;
      return null;
    };

    render(
      <ShopProvider>
        <StateObserver />
        <Navbar />
      </ShopProvider>
    );

    const terrariumsLinks = screen.getAllByRole('button', { name: /Terrariums/i });
    act(() => {
      fireEvent.click(terrariumsLinks[0]);
    });

    expect(currentCategory).toBe('terrarium');
    expect(currentPage).toBe('shop');
  });

  test('Footer Living Terrariums button sets selectedCategory to "terrarium" and navigates to shop', () => {
    let currentCategory = null;
    let currentPage = null;

    const StateObserver = () => {
      const { selectedCategory } = useFilter();
      const { activePage } = useNavigation();
      currentCategory = selectedCategory;
      currentPage = activePage;
      return null;
    };

    render(
      <ShopProvider>
        <StateObserver />
        <Footer />
      </ShopProvider>
    );

    const livingTerrariumsBtn = screen.getByRole('button', { name: 'Living Terrariums' });
    act(() => {
      fireEvent.click(livingTerrariumsBtn);
    });

    expect(currentCategory).toBe('terrarium');
    expect(currentPage).toBe('shop');
  });

  test('HomePage "Shop Terrariums" button sets selectedCategory to "terrarium" and navigates to shop', () => {
    let currentCategory = null;
    let currentPage = null;

    const StateObserver = () => {
      const { selectedCategory } = useFilter();
      const { activePage } = useNavigation();
      currentCategory = selectedCategory;
      currentPage = activePage;
      return null;
    };

    render(
      <ShopProvider>
        <StateObserver />
        <HomePage />
      </ShopProvider>
    );

    const shopTerrariumsBtn = screen.getByRole('button', { name: /Shop Terrariums/i });
    act(() => {
      fireEvent.click(shopTerrariumsBtn);
    });

    expect(currentCategory).toBe('terrarium');
    expect(currentPage).toBe('shop');
  });
});
