import React, { lazy, Suspense } from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

// ⚡ Performance Optimization: Lazy-load page components to split the main bundle into on-demand route chunks, reducing initial load time
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const TerrariumBuilderPage = lazy(() => import('./pages/TerrariumBuilderPage').then((m) => ({ default: m.TerrariumBuilderPage })));
const PlantCarePage = lazy(() => import('./pages/PlantCarePage').then((m) => ({ default: m.PlantCarePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })));

// Minimal loading indicator for route transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-moss-700 border-t-transparent rounded-full animate-spin" />
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
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
