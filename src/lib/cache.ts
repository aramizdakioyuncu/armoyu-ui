/**
 * Tarayıcı önbelleği: sayfa açılınca son veri anında gösterilir, ardından API'den tazelenir.
 * Çıkışta ve hesap değişince clearCache ile silinir.
 */
const PREFIX = 'armoyu_cache:';
// Kaydedilen verinin biçimi değişince artırın: eski kayıtlar okunmaz
const VERSION = 1;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

type Entry<T> = { v: number; at: number; data: T };

const storage = () => (typeof window === 'undefined' ? null : window.localStorage);

export function readCache<T>(key: string): T | null {
  try {
    const raw = storage()?.getItem(PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as Entry<T>;
    if (entry.v !== VERSION || Date.now() - entry.at > MAX_AGE_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, data: T): void {
  try {
    storage()?.setItem(PREFIX + key, JSON.stringify({ v: VERSION, at: Date.now(), data } satisfies Entry<T>));
  } catch {
    // Depolama doluysa önbellek devre dışı kalır; uygulama API ile çalışmaya devam eder
  }
}

export function clearCache(): void {
  const store = storage();
  if (!store) return;
  const keys: string[] = [];
  for (let i = 0; i < store.length; i++) {
    const key = store.key(i);
    if (key?.startsWith(PREFIX)) keys.push(key);
  }
  keys.forEach((key) => store.removeItem(key));
}
