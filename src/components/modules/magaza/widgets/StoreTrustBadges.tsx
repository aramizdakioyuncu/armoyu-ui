'use client';

import React from 'react';

export function StoreTrustBadges() {
   return (
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-20 border-t border-armoyu-card-border">
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">GÜVENLİ ÖDEME</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Tüm ödemeleriniz 256-bit SSL ile korunmaktadır.</p>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">ANINDA TESLİMAT</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Satın aldığınız dijital ürünler profilinize anında eklenir.</p>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mx-auto">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h4 className="font-black text-armoyu-text uppercase text-sm tracking-widest">7/24 DESTEK</h4>
            <p className="text-xs font-medium text-armoyu-text-muted">Sorunlarınız için destek ekibimiz her zaman yanınızda.</p>
         </div>
      </div>
   );
}
