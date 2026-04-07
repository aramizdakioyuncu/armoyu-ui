import React from 'react';
import { 
  Button, 
  RollingNumber, 
  Slider, 
  StatsGrid, 
  mockGlobalStats 
} from '../../index';

export function GeneralTab() {
  return (
    <div className="space-y-12">
      <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-blue-500 pl-4">Temel Bileşenler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[40px] space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted mb-4 opacity-50 italic">Butonlar</h4>
          <div className="flex flex-wrap gap-4">
            <Button>Normal Buton</Button>
            <Button variant="ghost">Hayalet Buton</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Premium Buton</Button>
            <Button className="bg-emerald-500">Başarı</Button>
          </div>
        </div>
        <div className="glass-panel p-8 rounded-[40px] space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted mb-4 opacity-50 italic">Sayı Animasyonları</h4>
          <div className="flex items-center gap-8">
             <div className="text-4xl font-black text-blue-500 italic"><RollingNumber value="14.2" />B</div>
             <div className="text-3xl font-black text-armoyu-text italic opacity-60"><RollingNumber value="1250" /></div>
          </div>
        </div>
        <div className="glass-panel p-8 rounded-[40px] space-y-6 md:col-span-2">
           <h4 className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted mb-4 opacity-50 italic">Slider / Carousel</h4>
           <Slider />
        </div>
        <div className="md:col-span-2">
           <StatsGrid stats={mockGlobalStats} />
        </div>
      </div>
    </div>
  );
}
