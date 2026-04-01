import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { dummyProducts as initialData } from '../data/products';

const ProductContext = createContext();

const SYNC_CHANNEL = 'jewelry_product_sync';
const STORAGE_KEY = 'jewelry_products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Initialize products with enhanced fields
<<<<<<< HEAD
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
=======
  const initializeProducts = useCallback(async () => {
    setLoading(true);
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // Enhance initial dummy products with requested fields
        const enhanced = initialData.map(p => ({
          ...p,
          price: p.baseWeight ? p.baseWeight * 6700 : p.price,
          stock: Math.floor(Math.random() * 20) + 5,
          sizes: ['Standard', 'Small', 'Large'],
          karats: ['22k Gold', '18k Gold'],
        }));
        setProducts(enhanced);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(enhanced));
      }
    } catch (error) {
      console.error('Failed to initialize products:', error);
    } finally {
      setLoading(false);
>>>>>>> Authentication
    }
  }, []);

  useEffect(() => {
    initializeProducts();

    // BroadcastChannel for Live Updates (Simulated WebSockets)
    const channel = new BroadcastChannel(SYNC_CHANNEL);
    channel.onmessage = (event) => {
      if (event.data.type === 'PRODUCTS_UPDATED') {
        const updatedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY));
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

  const addProduct = async (productData) => {
    try {
      const newProduct = await productService.addProduct(productData);
      // We still update local state for immediate feedback, 
      // but the source of truth is the service (which uses localStorage here)
      const updated = [...products, newProduct];
      setProducts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      notifyUpdate();
      return newProduct;
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const updatedProduct = await productService.updateProduct(id, updatedFields);
      const updated = products.map(p => p.id === id ? updatedProduct : p);
      setProducts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      notifyUpdate();
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      notifyUpdate();
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading,
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
