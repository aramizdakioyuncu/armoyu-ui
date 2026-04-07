'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@armoyu/core';
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('armoyu_cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                setCart(parsed.map((i) => CartItem.fromJSON(i)));
            }
            catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);
    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('armoyu_cart', JSON.stringify(cart));
    }, [cart]);
    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id
                    ? new CartItem({ ...item, quantity: item.quantity + quantity })
                    : item);
            }
            return [...prev, new CartItem({ product, quantity })];
        });
    };
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };
    const updateQuantity = (productId, quantity) => {
        setCart(prev => prev.map(item => item.product.id === productId
            ? new CartItem({ ...item, quantity: Math.max(1, quantity) })
            : item));
    };
    const clearCart = () => setCart([]);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.getTotalPrice(), 0);
    return (_jsx(CartContext.Provider, { value: {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }, children: children }));
}
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
//# sourceMappingURL=CartContext.js.map