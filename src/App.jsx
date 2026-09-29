import React from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { TerrariumBuilderPage } from './pages/TerrariumBuilderPage';
import { PlantCarePage } from './pages/PlantCarePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';

export function App() {
  const { activePage } = useShop();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'builder':
        return <TerrariumBuilderPage />;
      case 'care':
        return <PlantCarePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-beige-50 text-charcoal-900 selection:bg-moss-700 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <ToastContainer />
    </div>
  );
}

export default App;
