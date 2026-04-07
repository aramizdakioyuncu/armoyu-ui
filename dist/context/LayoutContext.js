'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const LayoutContext = createContext(undefined);
export function LayoutProvider({ children }) {
    // Varsayılan masaüstü değeri %80 olarak ayarlanmıştır.
    const [pageWidth, setPageWidth] = useState('max-w-[80%]');
    return (_jsx(LayoutContext.Provider, { value: { pageWidth, setPageWidth }, children: children }));
}
export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
//# sourceMappingURL=LayoutContext.js.map