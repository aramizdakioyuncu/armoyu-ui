'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'blue' | 'green' | 'pink' | 'purple' | 'red' | 'amber' | 'emerald';

interface ThemeContextType {
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accentColor, setAccentColorState] = useState<AccentColor>('blue');

  // Tarayıcı hafızasını okuyarak temayı yükleme (Local Storage)
  useEffect(() => {
    const savedTheme = localStorage.getItem('armoyu_theme') as 'dark' | 'light';
    const savedColor = localStorage.getItem('armoyu_accent') as AccentColor;

    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    if (savedColor) {
      setAccentColorState(savedColor);
      document.documentElement.setAttribute('data-accent', savedColor);
    } else {
      document.documentElement.setAttribute('data-accent', 'blue');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('armoyu_theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('armoyu_accent', color);
    document.documentElement.setAttribute('data-accent', color);
  };

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme hooks must be used inside ThemeProvider!');
  return context;
}
