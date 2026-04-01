import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { Home } from './pages/Home';
import { Men } from './pages/Men';
import { Women } from './pages/Women';
import { Wedding } from './pages/Wedding';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { AccessDenied } from './pages/AccessDenied';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { PrivateRoute } from './routes/PrivateRoute';
import { AdminRoute } from './routes/AdminRoute';
import { AnimatedLayout } from './components/AnimatedLayout';
import { CurtainEffect } from './components/CurtainEffect';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 3000, 
          style: { 
            borderRadius: '0', 
            background: '#333', 
            color: '#fff', 
            fontSize: '12px', 
            letterSpacing: '0.1em', 
            textTransform: 'uppercase' 
          } 
        }} 
      />
      <Navbar />
      <main className="grow">
        <AnimatePresence mode="wait">
          {/* Keying the CurtainEffect by pathname ensures it runs on every route change */}
          <CurtainEffect key={`curtain-${location.pathname}`} />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedLayout><Home /></AnimatedLayout>} />
            <Route path="/men" element={<AnimatedLayout><Men /></AnimatedLayout>} />
            <Route path="/women" element={<AnimatedLayout><Women /></AnimatedLayout>} />
            <Route path="/wedding" element={<AnimatedLayout><Wedding /></AnimatedLayout>} />
            <Route path="/products" element={<AnimatedLayout><Products /></AnimatedLayout>} />
            <Route path="/product/:id" element={<AnimatedLayout><ProductDetail /></AnimatedLayout>} />
            <Route path="/cart" element={<AnimatedLayout><Cart /></AnimatedLayout>} />
            <Route path="/checkout" element={<AnimatedLayout><Checkout /></AnimatedLayout>} />
            <Route path="/login" element={<AnimatedLayout><Login /></AnimatedLayout>} />
            <Route path="/signup" element={<AnimatedLayout><Signup /></AnimatedLayout>} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <PrivateRoute>
                <AnimatedLayout><Profile /></AnimatedLayout>
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AnimatedLayout><Admin /></AnimatedLayout>
              </AdminRoute>
            } />
            
            <Route path="/access-denied" element={<AnimatedLayout><AccessDenied /></AnimatedLayout>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
