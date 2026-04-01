import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dummyProducts as initialData } from '../data/products';

const ProductContext = createContext();

const SYNC_CHANNEL = 'jewelry_product_sync';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Initialize products with enhanced fields
  const initializeProducts = useCallback(() => {
    const savedProducts = localStorage.getItem('jewelry_products');
    const appVersion = '1.1'; // Increment this to force a reset
    const savedVersion = localStorage.getItem('jewelry_version');

    if (savedProducts && savedVersion === appVersion) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Force refresh with new dummy data
      localStorage.setItem('jewelry_version', appVersion);
      // Enhance initial dummy products with requested fields
      const enhanced = initialData.map(p => ({
        ...p,
        price: p.baseWeight * 6700, // Default calculation if not present
        stock: Math.floor(Math.random() * 20) + 5,
        sizes: ['Standard', 'Small', 'Large'],
        karats: ['22k Gold', '18k Gold'],
      }));
      setProducts(enhanced);
      localStorage.setItem('jewelry_products', JSON.stringify(enhanced));
    }
  }, []);

  useEffect(() => {
    initializeProducts();

    // BroadcastChannel for Live Updates (Simulated WebSockets)
    const channel = new BroadcastChannel(SYNC_CHANNEL);
    channel.onmessage = (event) => {
      if (event.data.type === 'PRODUCTS_UPDATED') {
        const updatedProducts = JSON.parse(localStorage.getItem('jewelry_products'));
        setProducts(updatedProducts);
        setLastUpdated(Date.now());
      }
    };

    return () => channel.close();
  }, [initializeProducts]);

  const notifyUpdate = () => {
    const channel = new BroadcastChannel(SYNC_CHANNEL);
    channel.postMessage({ type: 'PRODUCTS_UPDATED', timestamp: Date.now() });
    setLastUpdated(Date.now());
  };

  const addProduct = (newProduct) => {
    const updated = [...products, { ...newProduct, id: Date.now().toString() }];
    setProducts(updated);
    localStorage.setItem('jewelry_products', JSON.stringify(updated));
    notifyUpdate();
  };

  const updateProduct = (id, updatedFields) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setProducts(updated);
    localStorage.setItem('jewelry_products', JSON.stringify(updated));
    notifyUpdate();
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('jewelry_products', JSON.stringify(updated));
    notifyUpdate();
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct,
      lastUpdated 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
