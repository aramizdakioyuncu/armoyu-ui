'use client';

import React, { useState } from 'react';
import { GraduationCap, Trash2 } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { User } from '../../../../models/auth/User';

const KINDS: Record<string, string> = { high_school: 'Lise', university: 'Üniversite', other: 'Diğer' };
const inputClass = 'w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-armoyu-primary shadow-inner transition-colors';

/** Profil düzenlemede eğitim bilgisi: listele, ekle, sil (Phatsa Profiller 1.6.0) */
export function EducationEditor({ user }: { user: User | null }) {
  const { api } = useArmoyu();
  // shortcut: yayınlanan @armoyu/core tiplerinde eğitim metotları yok; yeni sürüm çıkınca cast kalkacak
  const users = api.users as any;
  const [items, setItems] = useState(user?.education ?? []);
  const [form, setForm] = useState({ schoolName: '', kind: 'university', department: '', startYear: '', endYear: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Ekleme kimlik döndürmüyor; silinebilsin diye liste profilden yeniden okunur
  const reload = async () => {
    if (!user?.username) return;
    const response = await users.getUserByUsername(user.username);
    if (response.durum === 1) setItems(response.icerik?.education ?? []);
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.schoolName.trim()) return;
    setBusy(true);
    setError('');
    const response = await users.addEducation({
      schoolName: form.schoolName.trim(),
      kind: form.kind,
      department: form.department.trim(),
      startYear: form.startYear ? Number(form.startYear) : undefined,
      endYear: form.endYear ? Number(form.endYear) : undefined,
    });
    setBusy(false);
    if (response.durum !== 1) {
      setError(response.aciklama || 'Eklenemedi.');
      return;
    }
    setForm({ schoolName: '', kind: 'university', department: '', startYear: '', endYear: '' });
    reload();
  };

  const remove = async (id: string) => {
    const response = await users.removeEducation(id);
    if (response.durum === 1) setItems((prev) => prev.filter((item) => item.id !== id));
    else setError(response.aciklama || 'Silinemedi.');
  };

  return (
    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/5">
      <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider flex items-center gap-2">
        <GraduationCap size={14} /> Eğitim
      </label>

      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5">
          <div className="min-w-0">
            <p className="text-sm font-bold text-armoyu-text truncate">{item.schoolName}</p>
            <p className="text-xs text-armoyu-text-muted">
              {[KINDS[item.kind] ?? item.kind, item.department, [item.startYear, item.endYear].filter(Boolean).join(' – ')].filter(Boolean).join(' · ')}
            </p>
          </div>
          <button type="button" onClick={() => remove(item.id)} aria-label={`${item.schoolName} sil`} className="p-2 rounded-lg text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10">
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input aria-label="Okul adı" placeholder="Okul adı" maxLength={150} value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} className={`${inputClass} md:col-span-2`} />
        <select aria-label="Tür" value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className={`${inputClass} appearance-none`}>
          {Object.entries(KINDS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <input aria-label="Bölüm" placeholder="Bölüm (isteğe bağlı)" maxLength={150} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass} />
        <input aria-label="Başlangıç yılı" type="number" min={1950} max={2100} placeholder="Başlangıç yılı" value={form.startYear} onChange={(e) => setForm({ ...form, startYear: e.target.value })} className={inputClass} />
        <input aria-label="Bitiş yılı" type="number" min={1950} max={2100} placeholder="Bitiş yılı (devam ediyorsa boş)" value={form.endYear} onChange={(e) => setForm({ ...form, endYear: e.target.value })} className={inputClass} />
        <div className="md:col-span-2 flex items-center justify-between gap-3">
          {error ? <p role="alert" className="text-xs font-bold text-red-500">{error}</p> : <span />}
          <button type="submit" disabled={busy || !form.schoolName.trim()} className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-armoyu-primary text-white disabled:opacity-50">
            {busy ? 'Ekleniyor...' : 'Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
}
