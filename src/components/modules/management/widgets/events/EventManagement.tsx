import React, { useState } from 'react';
import { Search, Calendar, Plus, MapPin, Users, Clock, ChevronRight, MoreVertical } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}

export const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const events: Event[] = [
    { id: '1', title: 'CS2 Topluluk Gecesi', type: 'Oyun', date: '15 Mayıs 2024, 21:00', location: 'Armoyu Discord', participants: 45, maxParticipants: 100, status: 'upcoming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', title: 'ETS 2 Konvoyu - Avrupa Seferi', type: 'Oyun', date: '12 Mayıs 2024, 20:00', location: 'Simulation Server', participants: 28, maxParticipants: 50, status: 'upcoming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop' },
    { id: '3', title: 'Geliştirici Buluşması', type: 'Kurumsal', date: 'Bugün, 19:00', location: 'Online Zoom', participants: 12, maxParticipants: 20, status: 'ongoing', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Etkinlik ara..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all shadow-xl shadow-black/5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-8 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-armoyu-primary/20 transition-all active:scale-95 flex items-center gap-2">
           <Plus size={16} /> YENİ ETKİNLİK OLUŞTUR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="group bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 overflow-hidden hover:border-armoyu-primary/30 transition-all shadow-xl shadow-black/5 flex flex-col">
            <div className="relative h-48 overflow-hidden">
               <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                     {event.type}
                  </span>
               </div>
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                     <h4 className="font-black text-white uppercase tracking-tighter text-lg leading-tight">{event.title}</h4>
                  </div>
               </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col">
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <Calendar size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <MapPin size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <Users size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">{event.participants} / {event.maxParticipants} Katılımcı</span>
                  </div>
               </div>

               <div className="pt-4 mt-auto">
                  <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                     <div 
                       className="h-full bg-armoyu-primary rounded-full transition-all duration-1000" 
                       style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                     />
                  </div>
                  <div className="flex gap-2">
                     <button className="flex-1 py-3 bg-white/5 hover:bg-armoyu-primary text-armoyu-text hover:text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all">DÜZENLE</button>
                     <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-armoyu-text-muted transition-all">
                        <MoreVertical size={16} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
