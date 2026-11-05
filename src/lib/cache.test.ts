import assert from 'node:assert/strict';

const store = new Map<string, string>();
const localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { if (v.length > 400) throw new Error('QuotaExceededError'); store.set(k, v); },
  removeItem: (k: string) => { store.delete(k); },
  key: (i: number) => [...store.keys()][i] ?? null,
  get length() { return store.size; },
};
(globalThis as any).window = { localStorage };

const jwt = (sub: string) => `h.${Buffer.from(JSON.stringify({ sub })).toString('base64url')}.s`;

async function main() {
  const { readCache, readCacheEntry, writeCache, clearCache, rememberProfile, readRecentProfiles, cacheScope } = await import('./cache');

  // Girişsiz kayıtlar "anon" altında
  assert.equal(cacheScope(), 'anon');
  writeCache('feed', [1]);
  assert.ok(store.has('armoyu.cache.anon.feed'));

  // Kullanıcıya göre ayrılır: başka hesap öncekinin verisini görmez
  store.set('armoyu_token', jwt('u1'));
  writeCache('me', { id: 'u1' });
  assert.deepEqual(readCache('me'), { id: 'u1' });
  assert.ok(typeof readCacheEntry('me')!.at === 'number');
  store.set('armoyu_token', jwt('u2'));
  assert.equal(readCache('me'), null);
  store.set('armoyu_token', jwt('u1'));

  // Eski ve biçimi değişmiş kayıt okunmaz
  store.set('armoyu.cache.u1.old', JSON.stringify({ v: 1, at: Date.now() - 8 * 24 * 3600 * 1000, data: 1 }));
  assert.equal(readCache('old'), null);
  store.set('armoyu.cache.u1.fmt', JSON.stringify({ v: 0, at: Date.now(), data: 1 }));
  assert.equal(readCache('fmt'), null);

  // Bozuk kayıt ve dolu depolama uygulamayı düşürmez
  store.set('armoyu.cache.u1.bad', '{bozuk');
  assert.equal(readCache('bad'), null);
  writeCache('big', 'x'.repeat(500));
  assert.equal(readCache('big'), null);

  // Son bakılan profiller: başa eklenir, tekrar açılan başa taşınır, en çok 10
  const p = (n: number) => ({ user_id: `id${n}`, username: `u${n}`, display_name: `U${n}`, avatar_url: '' });
  for (let i = 0; i < 12; i++) rememberProfile(p(i % 11));
  // Kota testi için küçük tutulmuş depoya sığmayan liste yazılmaz; sığan son hâl okunur
  const recent = readRecentProfiles();
  assert.ok(recent.length <= 10);
  assert.equal(recent[0].user_id, 'id0');
  assert.equal(new Set(recent.map((r) => r.user_id)).size, recent.length);

  // Temizlik önbellek, son bakılanlar ve eski ortak anahtarları siler; oturum anahtarına dokunmaz
  store.set('armoyu_cache:legacy', '1');
  clearCache();
  assert.equal(readCache('me'), null);
  assert.deepEqual(readRecentProfiles(), []);
  assert.ok(![...store.keys()].some((k) => k.startsWith('armoyu.cache.') || k.startsWith('armoyu.recentProfiles.') || k.startsWith('armoyu_cache:')));
  assert.ok(store.has('armoyu_token'));

  console.log('cache OK');
}

main();
