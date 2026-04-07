import React from 'react';
import { Product, CartItem } from '@armoyu/core';
interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}
export declare function CartProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useCart(): CartContextType;
export {};
//# sourceMappingURL=CartContext.d.ts.map