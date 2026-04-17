import React from 'react';
import { 
  Header, 
  Footer, 
  ViewModeToggle 
} from '../../index';
import { NavItem } from '../../types/navigation';

export function CorporateTab() {
  const corporateItems: NavItem[] = [
    { name: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
    { 
      name: 'Vizyon & Misyon', 
      href: '/kurumsal/vizyon',
      submenu: [
        { name: 'Vizyonumuz', href: '/kurumsal/vizyon' },
        { name: 'Misyonumuz', href: '/kurumsal/misyon' },
        { name: 'Değerlerimiz', href: '/kurumsal/degerler' }
      ]
    },
    { name: 'İnsan Kaynakları', href: '/kurumsal/ik' },
    { name: 'İletişim', href: '/kurumsal/iletisim' },
  ];

  return (
    <div className="space-y-16">
       <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-indigo-500 pl-4">Header Bileşeni</h3>
             <span className="text-[10px] font-bold text-armoyu-text-muted uppercase italic bg-black/20 px-3 py-1 rounded-lg">Dinamik Menü Önizleme</span>
          </div>
          <div className="relative z-50">
             <div className="rounded-[32px] border border-white/5 shadow-2xl bg-[#0a0a0f] overflow-visible">
                <Header items={corporateItems} />
             </div>
          </div>
          <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-40 px-4">
            * Yukarıdaki Header bileşeni, "Hakkımızda", "Vizyon" gibi kurumsal parametreler ile dinamik olarak beslenmektedir.
          </p>
       </div>

       <div className="space-y-6">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-indigo-500 pl-4">Footer Bileşeni</h3>
          <div className="rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
             <Footer />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="glass-panel p-8 rounded-[40px]">
             <h4 className="text-[10px] font-black uppercase text-center mb-6 opacity-30 italic">Görünüm Seçici</h4>
             <div className="flex justify-center">
                <ViewModeToggle mode="grid" onChange={() => {}} />
             </div>
          </div>
       </div>
    </div>
  );
}
