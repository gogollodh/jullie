import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, Menu, X, Leaf, Sparkles, User } from 'lucide-react';

export const Navbar = () => {
  const {
    activePage,
    navigateTo,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop', category: 'all' },
    { label: 'Carnivorous Plants', page: 'shop', category: 'carnivorous' },
    { label: 'Terrariums', page: 'shop', category: 'terrariums' },
    { label: 'Exotic Plants', page: 'shop', category: 'exotic' },
    { label: 'Terrarium Builder', page: 'builder' },
    { label: 'Plant Care', page: 'care' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (link) => {
    if (link.category) {
      setSelectedCategory(link.category);
    }
    navigateTo(link.page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-forest-900/90 backdrop-blur-md text-beige-100 border-b border-moss-800/50 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-forest-950 text-moss-300 text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2 border-b border-forest-800/40">
        <Sparkles className="w-3.5 h-3.5 text-moss-400 animate-pulse" />
        <span>Complementary Insulated Winter Botanical Shipping on orders over $85</span>
        <span className="hidden sm:inline-block text-forest-600">|</span>
        <span className="hidden sm:inline-block text-beige-300">Use code <b>GREENHOUSE10</b> for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="p-2 rounded-lg bg-moss-900/80 border border-moss-700/50 group-hover:bg-moss-800 transition-colors">
              <Leaf className="w-6 h-6 text-moss-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-beige-50 block leading-none">
                The Sapliing
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-moss-300 font-light block mt-0.5">
                Exotic Botanical Lab
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.page && (!link.category || link.category === 'all');
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                    isActive ? 'text-moss-300 font-semibold' : 'text-beige-200/90 hover:text-beige-50'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-moss-400 transform origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Wishlist, Cart, Account, Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-forest-950 border border-moss-700/60 rounded-full px-3 py-1">
                  <Search className="w-4 h-4 text-moss-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search flytraps, terrariums..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activePage !== 'shop') navigateTo('shop');
                    }}
                    className="bg-transparent text-xs text-beige-100 placeholder-forest-400 focus:outline-none w-36 sm:w-48"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-forest-400 hover:text-beige-100 ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    if (activePage !== 'shop') navigateTo('shop');
                  }}
                  className="p-2 text-beige-200 hover:text-beige-50 hover:bg-forest-800/50 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Account Icon */}
            <button
              onClick={() => navigateTo('account')}
              className={`p-2 rounded-full transition-colors ${
                activePage === 'account' ? 'text-moss-300 bg-forest-800' : 'text-beige-200 hover:text-beige-50 hover:bg-forest-800/50'
              }`}
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-beige-200 hover:text-beige-50 hover:bg-forest-800/50 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-moss-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-moss-800/80 hover:bg-moss-700 text-beige-50 px-3.5 py-2 rounded-full border border-moss-600/50 transition-all shadow-sm"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-moss-300" />
              <span className="text-xs font-semibold hidden sm:inline-block">Cart</span>
              <span className="bg-moss-500 text-forest-950 font-bold text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-beige-200 hover:text-beige-50 rounded-lg hover:bg-forest-800/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-forest-950 border-b border-moss-800/60 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link)}
              className="block w-full text-left px-4 py-2.5 text-base font-medium text-beige-200 hover:text-moss-300 hover:bg-forest-900 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
