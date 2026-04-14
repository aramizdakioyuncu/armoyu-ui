'use client';

import React from 'react';
import { X } from 'lucide-react'; 
import { StationProduct } from '@armoyu/core';

interface StationQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  item: StationProduct | null;
}

export function StationQRModal({ isOpen, onClose, stationName, item }: StationQRModalProps) {
  if (!isOpen || !item) return null;

  // Mock username - normally would come from auth context
  const username = 'berkaytikeno';
  const qrData = encodeURIComponent(`${stationName} | ${item.name} | ${item.discountRate || 'No Discount'} | User: ${username}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in slide-in-from-bottom-12 duration-500">
        <div className="p-8 pb-0 flex justify-end">
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
           >
              <X size={20} />
           </button>
        </div>

        <div className="p-10 pt-4 text-center">
           <div className="mb-6">
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
                 ARMOYU AVANTAJ KODU
              </span>
              <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
                 {item.name}
              </h3>
              <p className="text-armoyu-text-muted text-xs font-bold uppercase tracking-widest mt-1 opacity-60">
                 {stationName}
              </p>
           </div>

           {/* QR Code Container */}
           <div className="relative p-6 bg-white rounded-[40px] shadow-inner mb-8 inline-block mx-auto group">
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-150 group-hover:bg-blue-500/10 transition-colors" />
              <img 
                src={qrUrl} 
                alt="QR Code" 
                className="relative z-10 w-48 h-48 md:w-56 md:h-56 object-contain mix-blend-multiply dark:mix-blend-normal"
              />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-600 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-600 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-2xl" />
           </div>

           <div className="space-y-4">
              <div className="p-5 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none">İNDİRİM ORANI</span>
                    <span className="text-xl font-black text-emerald-500 italic">{item.discountRate || 'Özel Fiyat'}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none">ÜCRET</span>
                    <span className="text-xl font-black text-armoyu-text">{item.price} ₺</span>
                 </div>
              </div>

              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-relaxed opacity-60 max-w-[280px] mx-auto">
                 BU KODU KASADAKİ GÖREVLİYE OKUTARAK İNDİRİMİNİZİ ANINDA UYGALAYABİLİRSİNİZ.
              </p>
           </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-blue-600 text-white text-center">
           <button 
             onClick={onClose}
             className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
           >
              KAPAT
           </button>
        </div>
      </div>
    </div>
  );
}
