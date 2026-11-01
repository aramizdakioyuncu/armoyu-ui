import React, { createContext, useCallback, useContext, useState, useEffect, useRef } from 'react';
import { Product } from '../models/shop/Product';
import { CartItem } from '../models/shop/CartItem';
import { useArmoyu } from './ArmoyuContext';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { api } = useArmoyu();
  const { user } = useAuth();
  // shortcut: yayınlanan @armoyu/core tiplerinde yok; yeni sürüm çıkınca cast kalkacak
  const shop = (api as any).shop;
  const usesServerCart = (api as any).version === 'current' && !!user;
  const cartRef = useRef(cart);
  cartRef.current = cart;
  const wasSignedIn = useRef(false);

  const loadServerCart = useCallback(async () => {
    const response = await shop.getCart();
    if (response.durum === 1) setCart(response.icerik.map((item: any) => CartItem.fromAPI(item)));
  }, [shop]);

  // Sunucu reddederse (ör. ürün satıştan kalktı) ekran gerçek sepete döner
  const syncItem = async (productId: string, quantity: number) => {
    if (!usesServerCart) return;
    const response = await shop.setCartItem(productId, quantity);
    if (response.durum !== 1) {
      alert(response.aciklama || 'Sepet güncellenemedi.');
      await loadServerCart();
    }
  };

  // Girişte misafir sepeti hesaba aktarılır, çıkışta hesap sepeti cihazda kalmaz
  useEffect(() => {
    if (!usesServerCart) {
      if (wasSignedIn.current) setCart([]);
      wasSignedIn.current = false;
      return;
    }

    wasSignedIn.current = true;
    (async () => {
      await Promise.allSettled(cartRef.current.map((item) => shop.setCartItem(item.product.id, item.quantity)));
      localStorage.removeItem('armoyu_cart');
      await loadServerCart();
    })();
  }, [usesServerCart, shop, loadServerCart]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('armoyu_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed.map((i: any) => CartItem.fromAPI(i)));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    // Hesap sepeti sunucuda: yerel kopya başka cihazdaki silmeleri geri getirirdi
    if (!usesServerCart) localStorage.setItem('armoyu_cart', JSON.stringify(cart));
  }, [cart, usesServerCart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const inCart = cart.find(item => item.product.id === product.id)?.quantity || 0;
    syncItem(product.id, inCart + quantity);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? new CartItem({ ...item, quantity: item.quantity + quantity })
            : item
        );
      }
      return [...prev, new CartItem({ product, quantity })];
    });
  };

  const removeFromCart = (productId: string) => {
    syncItem(productId, 0);
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    syncItem(productId, Math.max(1, quantity));
    setCart(prev => prev.map(item => 
      item.product.id === productId 
        ? new CartItem({ ...item, quantity: Math.max(1, quantity) })
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.getTotalPrice(), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

