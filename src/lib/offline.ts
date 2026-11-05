import { useEffect, useRef } from 'react';

/**
 * Ağ yok mu. Çekirdek ağ hatasını da sunucu hatasını da { durum: 0 } olarak döndürdüğü için ayrım tarayıcıdan yapılır.
 * shortcut: Wi-Fi bağlı ama internet yokken onLine true kalır, o durumda hata sunucu hatası sayılır; çekirdek ağ hatasını ayrı bildirince değişecek
 */
export const isOffline = () => typeof navigator !== 'undefined' && navigator.onLine === false;

/** Bağlantı geri gelince listeyi tazeler */
export function useOnlineRefresh(refresh: () => void) {
  const latest = useRef(refresh);
  latest.current = refresh;
  useEffect(() => {
    const onOnline = () => latest.current();
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);
}
