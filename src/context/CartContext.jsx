import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, selectedGoldType = '22k', selectedSize = 'Standard', computedPrice) => {
    setCartItems(prev => {
      // Check if same item with same specs exists to increment quantity instead
      const existingItem = prev.find(
        item => item.id === product.id && item.goldType === selectedGoldType && item.size === selectedSize
      );

      if (existingItem) {
        return prev.map(item =>
          item === existingItem ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prev, { 
        ...product, 
        quantity, 
        goldType: selectedGoldType, 
        size: selectedSize, 
        price: computedPrice,
        cartId: `${product.id}-${selectedGoldType}-${selectedSize}`
      }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
