import React, { useState } from 'react';
import { Gamepad2, Plus, Calendar, Clock, MapPin, Users, ChevronRight, Trophy, CheckCircle2 } from 'lucide-react';
import { ManagementHeader } from '../dashboard/ManagementHeader';

interface GameEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const GameOfficialManagement = ({ gameName, gameColor, icon: Icon }: { gameName: string, gameColor: string, icon: any }) => {
  const [isCreating, setIsCreating] = useState(false);
  
  const events: GameEvent[] = [
    { id: '1', title: 'Haftalık Konvoy #12', date: '2026-05-10', time: '21:00', location: 'Duisburg - Calais', participants: 42, status: 'upcoming' },
    { id: '2', title: 'Gece Sürüşü Etkinliği', date: '2026-05-15', time: '23:30', location: 'İskandinavya Turu', participants: 18, status: 'upcoming' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ManagementHeader 
        title={<>{gameName} <span className={`text-${gameColor} text-shadow-glow`}>Yönetimi</span></>}
        subtitle={`${gameName} platformu üzerindeki etkinlikleri ve oyuncu katılımını yönetin.`}
        actions={
          <button 
            onClick={() => setIsCreating(true)}
            className={`flex items-center gap-2 px-6 py-3 bg-${gameColor} hover:opacity-90 text-white font-black rounded-2xl transition-all shadow-lg shadow-${gameColor}/20 active:scale-95 text-[10px] uppercase tracking-widest`}
          >
            <Plus size={18} /> Yeni Etkinlik Oluştur
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3 text-armoyu-text-muted">
              <Calendar size={18} className={`text-${gameColor}`} />
              Yaklaşan <span className="text-white">Etkinlikler</span>
           </h3>

           <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <div key={event.id} className="group bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 hover:border-white/10 transition-all flex items-center justify-between shadow-xl">
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-${gameColor}/10 flex flex-col items-center justify-center border border-${gameColor}/20`}>
                         <span className={`text-xs font-black text-${gameColor} uppercase`}>{event.date.split('-')[2]}</span>
                         <span className="text-[9px] font-bold text-armoyu-text-muted uppercase opacity-60">MAY</span>
                      </div>
                      <div>
                         <h4 className="text-md font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{event.title}</h4>
                         <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                               <Clock size={12} /> {event.time}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                               <MapPin size={12} /> {event.location}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                               <Users size={12} /> {event.participants} Kişi
                            </div>
                         </div>
                      </div>
                   </div>
                   <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                      <ChevronRight size={20} className="text-armoyu-text-muted" />
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Stats & Rules */}
        <div className="space-y-6">
           <div className={`p-8 bg-gradient-to-br from-${gameColor}/20 to-black/40 rounded-[40px] border border-${gameColor}/10 shadow-2xl relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${gameColor}/20 blur-[60px] -z-10 rounded-full`} />
              <Icon className={`text-${gameColor} mb-4`} size={40} />
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Sunucu <br/> <span className="text-armoyu-text-muted opacity-40 italic">Durumu</span></h3>
              
              <div className="mt-8 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-armoyu-text-muted">Online Oyuncu</span>
                    <span className="text-xs font-black text-white">12 / 64</span>
                 </div>
                 <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-${gameColor} rounded-full`} style={{ width: '20%' }} />
                 </div>
                 <div className="flex items-center gap-2 mt-6">
                    <CheckCircle2 className="text-emerald-500" size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Sunucu Aktif</span>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Trophy size={16} className="text-amber-500" />
                 Yetki <span className="text-white">Kuralları</span>
              </h3>
              <ul className="space-y-4">
                 {['Etkinlik öncesi yoklama zorunludur.', 'Küfür ve argo kullanımı yasaktır.', 'Konvoy düzenine uyulmalıdır.'].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-[10px] font-bold text-armoyu-text-muted leading-relaxed">
                       <div className={`w-1.5 h-1.5 rounded-full bg-${gameColor} mt-1`} />
                       {rule}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60 animate-in fade-in duration-500">
           <div className="w-full max-w-xl bg-zinc-900 border border-white/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-${gameColor}/10 blur-[100px] -z-10 rounded-full`} />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <div className={`p-2 bg-${gameColor}/10 rounded-xl`}><Plus className={`text-${gameColor}`} size={20} /></div>
                    Yeni <span className={`text-${gameColor}`}>Etkinlik</span>
                 </h2>
                 <button onClick={() => setIsCreating(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-armoyu-text-muted hover:text-white font-black text-[10px] uppercase">Kapat</button>
              </div>

              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Etkinlik Başlığı</label>
                    <input type="text" placeholder="Örn: Hafta Sonu Konvoyu" className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Tarih</label>
                       <input type="date" className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Saat</label>
                       <input type="time" className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Buluşma Noktası</label>
                    <input type="text" placeholder="Örn: Duisburg Tamirhane" className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                 </div>

                 <button 
                   onClick={() => {
                     alert('Etkinlik başarıyla oluşturuldu!');
                     setIsCreating(false);
                   }}
                   className={`w-full py-5 bg-${gameColor} hover:opacity-90 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-${gameColor}/20 transition-all active:scale-95`}
                 >
                    ETKİNLİĞİ YAYINLA
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
