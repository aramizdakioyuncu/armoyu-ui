'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // Genişletilebilir nesne prop
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    profession: '',
    email: 'kullanici@armoyu.com',
    phone: '',
    birthDate: '',
    country: 'Türkiye',
    city: 'İstanbul',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // API logic buraya eklenecek
    onClose();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0e] border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-300 mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar flex flex-col">
        
        {/* Sticky Header */}
        <div className="flex justify-between items-center mb-6 shrink-0 sticky top-0 bg-white dark:bg-[#0a0a0e] z-10 pt-2 pb-4 border-b border-gray-200 dark:border-white/5">
          <h2 className="text-xl md:text-2xl font-black text-armoyu-text tracking-tight">Profili Düzenle</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-armoyu-text-muted transition-colors border border-transparent hover:border-armoyu-card-border">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="space-y-8 pb-8 flex-1">
           {/* Primary Info Veri Girişi */}
           <div className="space-y-5">
             <h3 className="text-lg font-bold text-armoyu-text border-b border-gray-200 dark:border-white/5 pb-2">Temel Bilgiler</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">E-Posta Adresi</label>
                 <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Cep Numarası</label>
                 <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+90 555 555 55 55" className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Meslek / Unvan</label>
                 <select name="profession" value={formData.profession} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors appearance-none">
                   <option value="">Seçiniz...</option>
                   <option value="Öğrenci">Öğrenci</option>
                   <option value="Öğretmen / Eğitmen">Öğretmen / Eğitmen</option>
                   <option value="Yazılım Geliştirici">Yazılım Geliştirici</option>
                   <option value="Mühendis">Mühendis</option>
                   <option value="Tasarımcı / Grafiker">Tasarımcı / Grafiker</option>
                   <option value="Mimar">Mimar</option>
                   <option value="İçerik Üreticisi (YouTuber/Yayıncı)">İçerik Üreticisi (YouTuber/Yayıncı)</option>
                   <option value="e-Spor Oyuncusu">e-Spor Oyuncusu</option>
                   <option value="Doktor / Sağlık Çalışanı">Doktor / Sağlık Çalışanı</option>
                   <option value="Avukat / Hukukçu">Avukat / Hukukçu</option>
                   <option value="Muhasebeci / Finans">Muhasebeci / Finans</option>
                   <option value="Satış / Pazarlama">Satış / Pazarlama</option>
                   <option value="Serbest Çalışan (Freelancer)">Serbest Çalışan (Freelancer)</option>
                   <option value="Girişimci / İş İnsanı">Girişimci / İş İnsanı</option>
                   <option value="Diğer">Diğer</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Doğum Tarihi</label>
                 <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Ülke</label>
                 <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors appearance-none">
                   <option value="Türkiye">Türkiye</option>
                   <option value="Azerbaycan">Azerbaycan</option>
                   <option value="Almanya">Almanya</option>
                   <option value="Diğer">Diğer</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">İl / Şehir</label>
                 <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Örn: İstanbul" className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-inner transition-colors" />
               </div>
             </div>
           </div>

           {/* Bağlı Hesaplar (Sosyal Medya ve Oyun) */}
           <div className="space-y-5">
             <h3 className="text-lg font-bold text-armoyu-text border-b border-gray-200 dark:border-white/5 pb-2">Bağlı Hesaplar</h3>
             <p className="text-xs font-bold text-armoyu-text-muted mb-4 leading-relaxed">Diğer platformlardaki hesaplarınızı bağlayarak profilinizde sergileyebilir ve arkadaşlarınızın sizi kolayca bulmasını sağlayabilirsiniz.</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Discord (Bağlanmış Durum Simülasyonu) */}
                <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-[#5865F2]/5 hover:bg-[#5865F2]/10 dark:bg-[#5865F2]/20 dark:hover:bg-[#5865F2]/30 border border-[#5865F2]/30 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0788-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[15px] text-armoyu-text">Discord</div>
                    <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Bağlandı</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl border border-red-500/20 text-red-500 text-xs font-black bg-red-500/5 hover:bg-red-500/10 transition-colors shadow-sm">İptal Et</div>
                </button>

                {/* Steam */}
                <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-[#171a21]/5 hover:bg-[#171a21]/10 dark:bg-[#171a21]/80 dark:hover:bg-[#171a21] border border-gray-200 dark:border-white/5 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-[#171a21] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.97 0C5.35 0 0 5.37 0 12c0 2.87 1.02 5.51 2.71 7.55l3.82-5.59c-.06-.31-.08-.63-.08-.96 0-3.32 2.68-6 6-6s6 2.68 6 6-2.68 6-6 6c-.84 0-1.63-.17-2.36-.5l-3.23 4.74A11.961 11.961 0 0 0 11.97 24c6.62 0 12-5.37 12-12s-5.38-12-12-12m6.25 11.89c0 1.6-1.29 2.89-2.89 2.89a2.89 2.89 0 0 1-2.89-2.89c0-1.6 1.29-2.89 2.89-2.89s2.89 1.29 2.89 2.89M8.38 14.88c-.85.34-1.8.1-2.38-.6a2.031 2.031 0 0 1 .59-2.85c.85-.34 1.8-.1 2.38.6.59.71.26 2.5-.59 2.85"/></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[15px] text-armoyu-text">Steam</div>
                    <div className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-wider">Bağlanmadı</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-black text-armoyu-text group-hover:bg-armoyu-text group-hover:text-white dark:group-hover:text-[#0a0a0e] transition-colors border border-black/5 dark:border-white/10 shadow-sm">Bağla</div>
                </button>
                
                {/* Instagram */}
                <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-pink-500/5 hover:bg-pink-500/10 dark:bg-pink-500/10 dark:hover:bg-pink-500/15 border border-pink-500/20 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[15px] text-armoyu-text">Instagram</div>
                    <div className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-wider">Bağlanmadı</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-black text-armoyu-text group-hover:bg-armoyu-text group-hover:text-white dark:group-hover:text-[#0a0a0e] transition-colors border border-black/5 dark:border-white/10 shadow-sm">Bağla</div>
                </button>

                {/* LinkedIn */}
                <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-[#0077b5]/5 hover:bg-[#0077b5]/10 dark:bg-[#0077b5]/10 dark:hover:bg-[#0077b5]/20 border border-[#0077b5]/20 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(0,119,181,0.4)]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[15px] text-armoyu-text">LinkedIn</div>
                    <div className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-wider">Bağlanmadı</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-black text-armoyu-text group-hover:bg-armoyu-text group-hover:text-white dark:group-hover:text-[#0a0a0e] transition-colors border border-black/5 dark:border-white/10 shadow-sm">Bağla</div>
                </button>

                {/* Facebook */}
                <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-[#1877F2]/5 hover:bg-[#1877F2]/10 dark:bg-[#1877F2]/10 dark:hover:bg-[#1877F2]/20 border border-[#1877F2]/20 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(24,119,242,0.4)]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[15px] text-armoyu-text">Facebook</div>
                    <div className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-wider">Bağlanmadı</div>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-black text-armoyu-text group-hover:bg-armoyu-text group-hover:text-white dark:group-hover:text-[#0a0a0e] transition-colors border border-black/5 dark:border-white/10 shadow-sm">Bağla</div>
                </button>

             </div>
           </div>

        </div>

        {/* Footer Actions Tab */}
        <div className="flex gap-4 pt-6 mt-auto sticky bottom-0 bg-white dark:bg-[#0a0a0e] pb-2 z-10 w-full shrink-0 border-t border-gray-200 dark:border-white/5">
          <button onClick={onClose} className="flex-1 py-3.5 text-sm font-black text-armoyu-text bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl transition-colors border border-black/5 dark:border-white/5 shadow-sm">
            İptal
          </button>
          <button onClick={handleSave} className="flex-1 py-3.5 text-sm font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Değişiklikleri Kaydet
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
