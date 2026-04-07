'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    // Tarayıcı hafızasını okuyarak temayı yükleme (Local Storage)
    useEffect(() => {
        const savedTheme = localStorage.getItem('armoyu_theme');
        if (savedTheme === 'light') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
        else {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            // İlk girişte varsayılan olarak depolanır
            localStorage.setItem('armoyu_theme', 'dark');
        }
    }, []);
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('armoyu_theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useTheme hooks must be used inside ThemeProvider!');
    return context;
}
//# sourceMappingURL=ThemeContext.js.map