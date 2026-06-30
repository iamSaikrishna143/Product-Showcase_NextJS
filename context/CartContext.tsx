/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, CartSummary } from '../types/cart';
import { Product } from '../types/product';
import { getDiscountedPrice } from '../lib/utils';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  summary: CartSummary;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('techstore_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart) as CartItem[]);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist cart to LocalStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('techstore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // If it exists, update quantity
        const updatedCart = [...prevCart];
        const currentQty = updatedCart[existingItemIndex].quantity;
        // Limit quantity to available stock
        const newQty = Math.min(currentQty + quantity, product.stock);
        updatedCart[existingItemIndex].quantity = newQty;
        return updatedCart;
      } else {
        // If new, append item
        return [...prevCart, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const maxQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: maxQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart item count (e.g. for Navbar badge)
  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Pricing calculations
  const summary = useMemo((): CartSummary => {
    let subtotal = 0;
    let discountTotal = 0;

    cart.forEach((item) => {
      const itemPrice = item.product.price;
      const itemDiscountPercentage = item.product.discount;
      const discountedItemPrice = getDiscountedPrice(itemPrice, itemDiscountPercentage);

      subtotal += itemPrice * item.quantity;
      discountTotal += (itemPrice - discountedItemPrice) * item.quantity;
    });

    const subtotalAfterDiscount = subtotal - discountTotal;
    
    // Apply 18% GST to subtotal after discount
    const gst = Math.round(subtotalAfterDiscount * 0.18);
    
    // Shipping: Free shipping over ₹50,000, otherwise ₹500
    const shipping = subtotalAfterDiscount > 50000 || subtotalAfterDiscount === 0 ? 0 : 500;
    
    const grandTotal = subtotalAfterDiscount + gst + shipping;

    return {
      subtotal,
      discountTotal,
      gst,
      shipping,
      grandTotal,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
