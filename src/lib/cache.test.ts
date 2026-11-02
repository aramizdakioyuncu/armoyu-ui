import assert from 'node:assert/strict';

const store = new Map<string, string>();
const localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { if (v.length > 200) throw new Error('QuotaExceededError'); store.set(k, v); },
  removeItem: (k: string) => { store.delete(k); },
  key: (i: number) => [...store.keys()][i] ?? null,
  get length() { return store.size; },
};
(globalThis as any).window = { localStorage };

async function main() {
  const { readCache, writeCache, clearCache } = await import('./cache');

  writeCache('me', { id: 'u1' });
  assert.deepEqual(readCache('me'), { id: 'u1' });

  // Eski kayıt okunmaz
  store.set('armoyu_cache:old', JSON.stringify({ v: 1, at: Date.now() - 8 * 24 * 3600 * 1000, data: 1 }));
  assert.equal(readCache('old'), null);

  // Biçimi değişmiş kayıt okunmaz
  store.set('armoyu_cache:fmt', JSON.stringify({ v: 0, at: Date.now(), data: 1 }));
  assert.equal(readCache('fmt'), null);

  // Bozuk kayıt ve dolu depolama uygulamayı düşürmez
  store.set('armoyu_cache:bad', '{bozuk');
  assert.equal(readCache('bad'), null);
  writeCache('big', 'x'.repeat(500));
  assert.equal(readCache('big'), null);

  // Temizlik yalnızca önbellek kayıtlarını siler
  store.set('armoyu_token', 't');
  clearCache();
  assert.equal(readCache('me'), null);
  assert.equal(store.get('armoyu_token'), 't');

  console.log('cache OK');
}

main();
