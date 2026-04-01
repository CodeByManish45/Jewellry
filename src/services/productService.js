/**
 * Simulation of a Product Management API Service for Admin Panel
 */

const API_DELAY = 1000; // ms

export const productService = {
  /**
   * Fetch all products
   */
  getProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          resolve(JSON.parse(storedProducts));
        } else {
          // Placeholder or initial state if nothing in localStorage
          resolve([]);
        }
      }, API_DELAY);
    });
  },

  /**
   * Add a new product
   */
  addProduct: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const newProduct = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString()
        };
        const updatedProducts = [...storedProducts, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        resolve(newProduct);
      }, API_DELAY);
    });
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const index = storedProducts.findIndex(p => p.id === id);
        
        if (index !== -1) {
          const updatedProduct = { ...storedProducts[index], ...data, updatedAt: new Date().toISOString() };
          storedProducts[index] = updatedProduct;
          localStorage.setItem('products', JSON.stringify(storedProducts));
          resolve(updatedProduct);
        } else {
          reject(new Error('Product not found'));
        }
      }, API_DELAY);
    });
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const filteredProducts = storedProducts.filter(p => p.id !== id);
        
        if (filteredProducts.length !== storedProducts.length) {
          localStorage.setItem('products', JSON.stringify(filteredProducts));
          resolve({ success: true });
        } else {
          reject(new Error('Product not found'));
        }
      }, API_DELAY);
    });
  }
};
