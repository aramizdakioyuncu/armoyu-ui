import React from 'react';
interface ThemeContextType {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}
export declare function ThemeProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map