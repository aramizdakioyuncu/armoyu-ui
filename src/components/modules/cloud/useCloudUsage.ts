import { useCallback, useEffect, useState } from 'react';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { readCache, writeCache } from '../../../lib/cache';

export interface CloudUsage {
  used: number;
  quota: number;
  image: number;
  video: number;
  audio: number;
}

/** ARMOYU Bulut kotası (bayt). `enabled` false iken istek atılmaz. */
export function useCloudUsage(enabled: boolean = true) {
  const { api } = useArmoyu();
  const [usage, setUsage] = useState<CloudUsage | null>(() => readCache<CloudUsage>('cloud-usage'));

  const reload = useCallback(() => {
    // shortcut: yayınlanan @armoyu/core tiplerinde getMediaUsage yok; yeni sürüm çıkınca cast kalkacak
    (api.users as any).getMediaUsage?.().then((response: any) => {
      if (response?.durum !== 1) return;
      setUsage(response.icerik);
      writeCache('cloud-usage', response.icerik);
    });
  }, [api]);

  useEffect(() => {
    if (enabled) reload();
  }, [enabled, reload]);

  return { usage, reload };
}
