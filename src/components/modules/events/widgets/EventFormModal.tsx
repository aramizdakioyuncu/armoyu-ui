'use client';

import React from 'react';
import { Calendar, X, Save } from 'lucide-react';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function EventFormModal({ isOpen, onClose, onSave, initialData }: EventFormModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const eventData = {
      id: initialData?.id || `EVT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      game: formData.get('game') as string,
      participants: initialData?.participants || 1,
      maxParticipants: 50,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
    };
    onSave(eventData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <form onSubmit={handleSubmit} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tighter leading-none">
                {initialData ? 'ETKİNLİĞİ DÜZENLE' : 'YENİ ETKİNLİK'}
              </h3>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-2 leading-none">Takımın için bir aksiyon planla</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2.5 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all border border-transparent hover:border-white/10">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">ETKİNLİK BAŞLIĞI</label>
            <input name="title" required defaultValue={initialData?.title || initialData?.name} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all italic placeholder:opacity-20" placeholder="Örn: Haftalık RP Etkinliği" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">OYUN / KATEGORİ</label>
              <input name="game" required defaultValue={initialData?.game || initialData?.gameName} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all italic placeholder:opacity-20" placeholder="Örn: Minecraft" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">TARİH (GG.AA.YYYY)</label>
              <input name="date" required defaultValue={initialData?.date} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all italic placeholder:opacity-20" placeholder="Örn: 15.05.2024" />
            </div>
          </div>
          <button type="submit" className="w-full py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-xl shadow-armoyu-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 italic">
            <Save size={18} /> {initialData ? 'KAYDET VE GÜNCELLE' : 'YAYINLA VE BAŞLAT'}
          </button>
        </div>
      </form>
    </div>
  );
}
