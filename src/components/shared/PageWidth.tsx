'use client';

import { useEffect } from 'react';
import { useLayout } from '../../context/LayoutContext';

interface PageWidthProps {
  width: string; // Örn: 'max-w-7xl', 'max-w-full', 'max-w-[90%]'
}

export function PageWidth({ width }: PageWidthProps) {
  const { setPageWidth } = useLayout();

  useEffect(() => {
    // Sayfa yüklendiğinde yeni genişliği uygula
    setPageWidth(width);

    // Sayfadan çıkıldığında varsayılan değere (%80) geri dön
    return () => setPageWidth('max-w-[80%]');
  }, [width, setPageWidth]);

  return null; // Görünür bir element üretmez
}
