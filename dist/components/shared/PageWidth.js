'use client';
import { useEffect } from 'react';
import { useLayout } from '../../context/LayoutContext';
export function PageWidth({ width }) {
    const { setPageWidth } = useLayout();
    useEffect(() => {
        // Sayfa yüklendiğinde yeni genişliği uygula
        setPageWidth(width);
        // Sayfadan çıkıldığında varsayılan değere (%80) geri dön
        return () => setPageWidth('max-w-[80%]');
    }, [width, setPageWidth]);
    return null; // Görünür bir element üretmez
}
//# sourceMappingURL=PageWidth.js.map