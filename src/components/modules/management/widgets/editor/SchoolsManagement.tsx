import React from 'react';
import { GraduationCap, MapPin, Building2, MoreVertical, Search } from 'lucide-react';

export const SchoolsManagement = () => {
  const schools = [
    { name: 'İstanbul Teknik Üniversitesi', city: 'İstanbul', type: 'Devlet', students: 450, code: 'ITU' },
    { name: 'Ortadoğu Teknik Üniversitesi', city: 'Ankara', type: 'Devlet', students: 320, code: 'ODTU' },
    { name: 'Yıldız Teknik Üniversitesi', city: 'İstanbul', type: 'Devlet', students: 280, code: 'YTU' },
    { name: 'Koç Üniversitesi', city: 'İstanbul', type: 'Vakıf', students: 150, code: 'KOC' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Okul <span className="text-armoyu-primary">Yönetimi</span></h2>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1">Platformdaki eğitim kurumlarını ve öğrenci ağını yönetin.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-hover:text-armoyu-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Okul ara..." 
            className="pl-12 pr-6 py-3 bg-white dark:bg-[#12121a] border border-white/5 rounded-2xl text-xs font-bold focus:outline-none focus:border-armoyu-primary/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {schools.map((school, i) => (
          <div key={i} className="bg-white dark:bg-[#12121a] p-6 rounded-[28px] border border-white/5 hover:border-armoyu-primary/20 transition-all group shadow-lg shadow-black/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted group-hover:text-armoyu-primary group-hover:bg-armoyu-primary/10 transition-all">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight">{school.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-armoyu-text-muted">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-armoyu-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{school.city}</span>
                    </div>
                    <span className="text-[10px] font-bold opacity-30">|</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-primary/70">{school.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 px-8 py-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
                <div className="text-center">
                   <span className="block text-sm font-black text-armoyu-text leading-none">{school.students}</span>
                   <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Öğrenci</span>
                </div>
                <div className="text-center">
                   <span className="block text-sm font-black text-armoyu-text leading-none">{school.code}</span>
                   <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Kod</span>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                 <button className="px-6 py-3 bg-armoyu-primary/5 hover:bg-armoyu-primary text-armoyu-primary hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                    DÜZENLE
                 </button>
                 <button className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all">
                    <MoreVertical size={16} className="text-armoyu-text-muted" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
