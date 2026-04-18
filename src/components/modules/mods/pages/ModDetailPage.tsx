'use client';

import React from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { MOCK_MODS } from './ModsPage';
import { ArrowLeft, Download, ShieldCheck, Star, Users, HardDrive } from 'lucide-react';

interface ModDetailPageProps {
  id: string;
  onBackClick?: () => void;
}

export function ModDetailPage({ id, onBackClick }: ModDetailPageProps) {
  // Find the requested mod or fallback to the first one
  const modData = MOCK_MODS.find(m => m.id === id) || MOCK_MODS[0];

  const SUGGESTED_MODS = MOCK_MODS
    .filter(m => m.id !== id)
    .slice(0, 3);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] mb-16 overflow-hidden">
        <div className="absolute inset-0">
           <img src={modData.image} alt={modData.name} className="w-full h-full object-cover blur-sm scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-armoyu-bg via-armoyu-bg/80 to-transparent"></div>
           <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-[1280px] mx-auto w-full px-4 relative h-full">
           <div className="relative h-full flex flex-col justify-end pb-16 z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl shadow-blue-600/20">
                    {modData.game}
                 </span>
                 <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl">
                    SÜRÜM: {modData.version}
                 </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6 max-w-5xl uppercase italic drop-shadow-2xl">
                 {modData.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-blue-600/20 flex items-center justify-center font-black text-blue-500">
                       {modData.author?.displayName.charAt(0)}
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Yapımcı</p>
                       <p className="text-sm font-black text-white">{modData.author?.displayName || 'Armoyu Ekibi'}</p>
                    </div>
                 </div>
                 
                 <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                 
                 <div className="flex gap-8">
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><Download size={12} strokeWidth={3} /> İndirme</p>
                       <p className="text-lg font-black text-white">{modData.downloads} <span className="text-[10px] opacity-60 italic">Kez</span></p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><Star size={12} strokeWidth={3} className="text-yellow-500" /> Puan</p>
                       <p className="text-lg font-black text-white">4.8 <span className="text-[10px] font-medium opacity-60">(125 Oy)</span></p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* Back Link */}
        <div className="mb-8">
           <button onClick={onBackClick} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-armoyu-text-muted hover:text-blue-500 transition-colors">
              <ArrowLeft size={14} strokeWidth={3} /> TÜM MODLAR
           </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
             
             {/* Thumbnail & Download Bar */}
             <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border mb-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden bg-armoyu-card-bg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                <div className="w-full md:w-64 aspect-video rounded-3xl overflow-hidden shrink-0 border border-armoyu-card-border relative z-10">
                   <img src={modData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                   <div>
                      <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter mb-2 italic">Kurulum Dosyası</h3>
                      <p className="text-sm font-bold text-armoyu-text-muted flex items-center gap-2">
                         <span className="flex items-center gap-1.5">ZIP Arşivi</span>
                         <span>•</span>
                         <span>45.2 MB</span>
                      </p>
                   </div>
                   
                   <button className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                      <Download className="group-hover:-translate-y-1 transition-transform" size={20} strokeWidth={3} />
                      HEMEN İNDİR
                   </button>
                </div>
             </div>

             {/* Description */}
             <div className="space-y-10">
                <section>
                   <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">Hakkında</h2>
                   <p className="text-base text-armoyu-text-muted font-medium leading-relaxed">{modData.description || 'Bu mod hakkında henüz detaylı bir açıklama eklenmemiş.'}</p>
                   <p className="text-base text-armoyu-text-muted font-medium leading-relaxed mt-4">Oyun deneyiminizi bir üst seviyeye taşıyacak özellikler barındırır. Bu mod, performansı etkilemeden görselliği ve mekanikleri optimize etmeyi hedefler.</p>
                </section>
                
                <section>
                   <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">Özellikler</h2>
                   <ul className="space-y-3">
                      {[
                        'Düşük donanımlarda bile yüksek performans için optimizasyon.',
                        'Tamamen Türkçe dil desteği.',
                        'Otomatik güncellemeler ile en son sürüme uyumluluk.',
                        'Çoklu sunucu desteği.'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-armoyu-text-muted font-bold text-sm">
                           <ShieldCheck size={18} className="text-blue-500 shrink-0" /> {item}
                        </li>
                      ))}
                   </ul>
                </section>

                <section>
                   <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">Nasıl Kurulur?</h2>
                   <div className="space-y-4">
                      {[
                        'İndirdiğiniz `.zip` dosyasını klasöre çıkartın.',
                        'Oyunun kurulu olduğu ana dizine gidin.',
                        '`mods` klasörünün içine çıkarttığınız dosyaları kopyalayın.',
                        'Oyunu yeniden başlatıp modlar sekmesinden aktif edin.'
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                           <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">{i+1}</span>
                           <p className="text-sm font-bold text-armoyu-text uppercase tracking-wide flex-1 mt-1.5">{step}</p>
                        </div>
                      ))}
                   </div>
                </section>
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] shrink-0 space-y-10">
             
             {/* System Requirements */}
             <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest flex items-center gap-2">
                   <HardDrive className="text-blue-500" size={16} strokeWidth={3} />
                   GEREKSİNİMLER
                </h4>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                      <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-1.5">MİNİMUM OYUN SÜRÜMÜ</p>
                      <p className="text-sm font-black text-armoyu-text uppercase">{modData.game} - {modData.version}</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                      <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-1.5">GEREKLİ EKLENTİ</p>
                      <p className="text-sm font-black text-armoyu-text uppercase">Forge / Fabric Uyumlu</p>
                   </div>
                </div>
             </div>

             {/* Similar Mods */}
             <div>
                <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-[0.4em] italic mb-6">İLGİNİ ÇEKEBİLİR</h4>
                <div className="space-y-4">
                   {SUGGESTED_MODS.map((item, idx) => (
                      <div key={idx} className="group glass-panel p-4 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-xl hover:border-blue-500/30 transition-all flex gap-4 items-center cursor-pointer">
                         <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-armoyu-card-border group-hover:scale-105 transition-transform" />
                         <div className="min-w-0">
                            <h4 className="text-sm font-black text-armoyu-text leading-tight group-hover:text-blue-500 transition-colors truncate mb-1.5 uppercase italic">{item.name}</h4>
                            <div className="flex items-center gap-3 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">
                               <span className="flex items-center gap-1"><Download size={10} strokeWidth={3} />{item.downloads}</span>
                               <span>{item.version}</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
