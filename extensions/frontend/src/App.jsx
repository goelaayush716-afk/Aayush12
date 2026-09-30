import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { OrderSuccessModal } from './components/ui/OrderSuccessModal';
import { ConciergeModal } from './components/ui/ConciergeModal';
import { AdminPortalModal } from './components/ui/AdminPortalModal';
import { Toast } from './components/ui/Toast';
import { CustomCursor } from './components/ui/CustomCursor';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { AboutPage } from './pages/AboutPage';

export const App = () => {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  return (
    <div className="app-root">
      <CustomCursor />
      <Navbar
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
      <Toast />
    </div>
  );
};
