/**
 * Tarayıcı önbelleği: sayfa açılınca son veri anında gösterilir, ardından API'den tazelenir.
 * Kayıtlar kullanıcıya göre ayrılır (armoyu.cache.<kullanıcı|anon>.<ad>); başka hesapla girilince öncekinin verisi okunmaz.
 * Çıkışta ve oturum düşünce clearCache ile hepsi silinir. Medya saklanmaz, yalnızca adresleri.
 */
const PREFIX = 'armoyu.cache.';
const RECENT_PREFIX = 'armoyu.recentProfiles.';
// Bu sürümden önceki ortak anahtarlar; temizlikte silinir
const LEGACY_PREFIX = 'armoyu_cache:';
// Kaydedilen verinin biçimi değişince artırın: eski kayıtlar okunmaz
const VERSION = 1;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const MAX_RECENT_PROFILES = 10;

type Entry<T> = { v: number; at: number; data: T };
/** at: profilin son açıldığı an (çevrimdışı "son güncelleme" bilgisi) */
export type RecentProfile = { user_id: string; username: string; display_name: string; avatar_url: string; at?: number };

const storage = () => (typeof window === 'undefined' ? null : window.localStorage);

/** Çerez onayı: 'all' (tümü) / 'necessary' (yalnızca zorunlu). Önbellek işlevsel sayılır, yalnızca 'all' iken yazılır */
export const CONSENT_KEY = 'armoyu_cookie_consent';
export const hasFunctionalConsent = () => {
  try {
    return storage()?.getItem(CONSENT_KEY) === 'all';
  } catch {
    return false;
  }
};

/** Oturumdaki kullanıcının kimliği; JWT doğrulanmaz, yalnızca anahtar ayırmak için okunur */
export function cacheScope(): string {
  try {
    const token = storage()?.getItem('armoyu_token');
    if (!token) return 'anon';
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return String(payload.sub || 'user');
  } catch {
    return 'user';
  }
}

const keyOf = (key: string) => `${PREFIX}${cacheScope()}.${key}`;

/** Veri ve kaydedildiği an; "son güncelleme" bilgisi için */
export function readCacheEntry<T>(key: string): { data: T; at: number } | null {
  try {
    const raw = storage()?.getItem(keyOf(key));
    if (!raw) return null;
    const entry = JSON.parse(raw) as Entry<T>;
    if (entry.v !== VERSION || Date.now() - entry.at > MAX_AGE_MS) return null;
    return { data: entry.data, at: entry.at };
  } catch {
    return null;
  }
}

export function readCache<T>(key: string): T | null {
  return readCacheEntry<T>(key)?.data ?? null;
}

export function writeCache<T>(key: string, data: T): void {
  if (!hasFunctionalConsent()) return;
  try {
    storage()?.setItem(keyOf(key), JSON.stringify({ v: VERSION, at: Date.now(), data } satisfies Entry<T>));
  } catch {
    // Depolama doluysa ya da engelliyse önbellek devre dışı kalır; uygulama API ile çalışmaya devam eder
  }
}

const recentKey = () => RECENT_PREFIX + cacheScope();

export function readRecentProfiles(): RecentProfile[] {
  try {
    const list = JSON.parse(storage()?.getItem(recentKey()) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** Açılan profil listenin başına; tekrar açılan başa taşınır, en çok 10 */
export function rememberProfile(profile: RecentProfile): void {
  if (!hasFunctionalConsent() || !profile.user_id || !profile.username) return;
  const list = [{ ...profile, at: Date.now() }, ...readRecentProfiles().filter((p) => p.user_id !== profile.user_id)].slice(0, MAX_RECENT_PROFILES);
  try {
    storage()?.setItem(recentKey(), JSON.stringify(list));
  } catch {
    // Depolama doluysa son bakılanlar tutulmaz
  }
}

export function clearCache(): void {
  const store = storage();
  if (!store) return;
  const keys: string[] = [];
  for (let i = 0; i < store.length; i++) {
    const key = store.key(i);
    if (key && [PREFIX, RECENT_PREFIX, LEGACY_PREFIX].some((prefix) => key.startsWith(prefix))) keys.push(key);
  }
  keys.forEach((key) => store.removeItem(key));
}
