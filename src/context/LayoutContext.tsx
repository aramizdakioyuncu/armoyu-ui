'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type LayoutContextType = {
  pageWidth: string; // Tailwind class like max-w-7xl or max-w-[80vw]
  setPageWidth: (width: string) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  // Varsayılan masaüstü değeri %80, mobil değeri %100 olarak ayarlanmıştır.
  const [pageWidth, setPageWidth] = useState('max-w-full md:max-w-[80%]');

  return (
    <LayoutContext.Provider value={{ pageWidth, setPageWidth }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
