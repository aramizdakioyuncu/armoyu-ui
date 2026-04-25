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

  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    discord: '',
    steam: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    youtube: '',
    twitter: '',
    github: '',
    twitch: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // API logic buraya eklenecek (socialLinks de dahil edilecek)
    console.log("Saving social links:", socialLinks);
    onClose();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (user && user.socials) {
      setSocialLinks(prev => ({
        ...prev,
        ...user.socials
      }));
    }
  }, [user]);

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
                 
                 {/* Sosyal Medya İşleme Mantığı */}
                 {[
                   { id: 'discord', name: 'Discord', color: '#5865F2', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0788-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>, baseUrl: '' },
                   { id: 'steam', name: 'Steam', color: '#171a21', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.97 0C5.35 0 0 5.37 0 12c0 2.87 1.02 5.51 2.71 7.55l3.82-5.59c-.06-.31-.08-.63-.08-.96 0-3.32 2.68-6 6-6s6 2.68 6 6-2.68 6-6 6c-.84 0-1.63-.17-2.36-.5l-3.23 4.74A11.961 11.961 0 0 0 11.97 24c6.62 0 12-5.37 12-12s-5.38-12-12-12m6.25 11.89c0 1.6-1.29 2.89-2.89 2.89a2.89 2.89 0 0 1-2.89-2.89c0-1.6 1.29-2.89 2.89-2.89s2.89 1.29 2.89 2.89M8.38 14.88c-.85.34-1.8.1-2.38-.6a2.031 2.031 0 0 1 .59-2.85c.85-.34 1.8-.1 2.38.6.59.71.26 2.5-.59 2.85"/></svg>, baseUrl: 'https://steamcommunity.com/id/' },
                   { id: 'instagram', name: 'Instagram', color: 'linear-gradient(to tr, #fbb03b, #d4145a, #8e2de2)', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, baseUrl: 'https://instagram.com/' },
                   { id: 'twitter', name: 'Twitter (X)', color: '#000000', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, baseUrl: 'https://twitter.com/' },
                   { id: 'github', name: 'GitHub', color: '#24292e', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, baseUrl: 'https://github.com/' },
                   { id: 'linkedin', name: 'LinkedIn', color: '#0077b5', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, baseUrl: 'https://linkedin.com/in/' },
                   { id: 'facebook', name: 'Facebook', color: '#1877F2', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, baseUrl: 'https://facebook.com/' },
                   { id: 'twitch', name: 'Twitch', color: '#9146FF', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0h1.714v5.143h-1.714zm-10.286 0H3.571v12h3.429V20l3.428-3.286h2.572l6.857-6.857V4.714zM19.286 0l-1.715 1.714V14.143h-3.428L11.571 16.714h-3.428L4.286 19.286v-2.572h-3.428V3.429L3.429 0h15.857z"/></svg>, baseUrl: 'https://twitch.tv/' },
                   { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>, baseUrl: 'https://youtube.com/@' },
                 ].map((platform) => {
                   const isEditing = editingAccount === platform.id;
                   const currentValue = (socialLinks as any)[platform.id] || '';
                   const isConnected = !!currentValue;

                   return (
                     <div key={platform.id} className={`flex flex-col gap-2 p-3.5 rounded-2xl transition-all border ${
                       isConnected ? 'bg-blue-600/5 border-blue-500/20 shadow-sm' : 'bg-black/5 dark:bg-white/5 border-transparent'
                     }`}>
                       <div className="flex items-center gap-3">
                         <div 
                           className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg"
                           style={{ background: platform.color }}
                         >
                           {platform.icon}
                         </div>
                         <div className="flex-1 text-left">
                           <div className="font-bold text-[15px] text-armoyu-text">{platform.name}</div>
                           <div className={`text-[10px] font-black uppercase tracking-wider ${isConnected ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>
                             {isConnected ? 'Bağlandı' : 'Bağlanmadı'}
                           </div>
                         </div>
                         {!isEditing && (
                           <button 
                             onClick={() => setEditingAccount(platform.id)}
                             className={`px-4 py-2 rounded-xl text-xs font-black transition-all border shadow-sm ${
                               isConnected 
                               ? 'border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10' 
                               : 'bg-black/5 dark:bg-white/5 text-armoyu-text hover:bg-armoyu-text hover:text-white dark:hover:text-[#0a0a0e] border-black/5 dark:border-white/10'
                             }`}
                           >
                             {isConnected ? 'İptal Et' : 'Bağla'}
                           </button>
                         )}
                       </div>

                       {isEditing && (
                         <div className="flex flex-col gap-2 mt-2 animate-in slide-in-from-top-2 duration-300">
                           <div className="relative">
                             <input 
                               autoFocus
                               type="text"
                               placeholder={platform.baseUrl ? `${platform.name} Kullanıcı Adı veya Link` : 'Discord ID'}
                               value={currentValue}
                               onKeyDown={(e) => e.key === 'Enter' && setEditingAccount(null)}
                               onChange={(e) => {
                                 let val = e.target.value;
                                 setSocialLinks(prev => ({ ...prev, [platform.id]: val }));
                               }}
                               onBlur={() => {
                                 let val = currentValue;
                                 if (platform.baseUrl && val && !val.startsWith('http') && !val.startsWith('www')) {
                                   val = platform.baseUrl + val;
                                   setSocialLinks(prev => ({ ...prev, [platform.id]: val }));
                                 }
                                 setEditingAccount(null);
                               }}
                               className="w-full bg-white dark:bg-black/40 border border-blue-500/30 rounded-xl px-4 py-2.5 text-xs text-armoyu-text font-bold outline-none focus:border-blue-500 shadow-lg transition-all"
                             />
                             <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button onClick={() => setEditingAccount(null)} className="p-1.5 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </button>
                             </div>
                           </div>
                           <p className="text-[9px] font-bold text-armoyu-text-muted italic px-1">
                             Kullanıcı adınızı yazın veya tam profil linkinizi yapıştırın.
                           </p>
                         </div>
                       )}
                     </div>
                   );
                 })}
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

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
