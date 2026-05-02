import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ShieldCheck, Mail, Phone, Edit2, CheckCircle2, XCircle, ChevronRight, Key, Image, AlertCircle, RefreshCw } from 'lucide-react';

export interface Member {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  role: { id: string; name: string; color: string };
  status: 'active' | 'pending' | 'suspended';
  lastActive: string;
}

export const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resetAction, setResetAction] = useState<'avatar' | 'banner' | null>(null);
  const [resetReason, setResetReason] = useState('');

  // Mock members data
  const members: Member[] = [
    { id: '1', username: 'berkay', displayName: 'Berkay T.', email: 'berkay@armoyu.com', phone: '+90 5** *** ** 00', role: { id: 'admin', name: 'Yönetim Ekibi', color: 'bg-red-500' }, status: 'active', lastActive: '2 dakika önce' },
    { id: '2', username: 'alperen', displayName: 'Alperen K.', email: 'alperen@armoyu.com', phone: '+90 5** *** ** 11', role: { id: 'software_dev', name: 'Yazılım Sorumlusu', color: 'bg-armoyu-primary' }, status: 'active', lastActive: '1 saat önce' },
    { id: '3', username: 'metehan', displayName: 'Metehan G.', email: 'metehan@armoyu.com', phone: '+90 5** *** ** 22', role: { id: 'moderator', name: 'Editör', color: 'bg-emerald-500' }, status: 'pending', lastActive: 'Dün' },
  ];

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setIsVerificationStep(false);
  };

  const handleSaveAttempt = () => {
    // Show verification step as requested by user
    setIsVerificationStep(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Üye ara (Username, Email, ID)..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all shadow-xl shadow-black/5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
           <button className="p-4 bg-white dark:bg-armoyu-header-bg/40 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-white transition-all shadow-lg">
             <Filter size={18} />
           </button>
           <button className="px-6 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-armoyu-primary/20 transition-all active:scale-95">
             Yeni Üye Ekle
           </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Üye Bilgisi</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Rol</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Durum</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Son Aktivite</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.map((member) => (
                <tr key={member.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-armoyu-primary to-indigo-600 p-0.5 shadow-lg">
                          <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-900">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`} alt="" />
                          </div>
                       </div>
                       <div>
                          <p className="font-black text-sm uppercase tracking-tight">{member.displayName}</p>
                          <p className="text-[10px] text-armoyu-text-muted font-bold">@{member.username}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`px-3 py-1.5 ${member.role.color}/10 ${member.role.color.replace('bg-', 'text-')} rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5`}>
                       {member.role.name}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                           {member.status === 'active' ? 'Aktif' : 'Beklemede'}
                        </span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                    {member.lastActive}
                  </td>
                  <td className="px-8 py-6">
                     <button 
                       onClick={() => handleEditClick(member)}
                       className="p-3 bg-white/5 hover:bg-armoyu-primary/10 text-armoyu-text-muted hover:text-armoyu-primary rounded-xl transition-all border border-transparent hover:border-armoyu-primary/20"
                     >
                        <Edit2 size={16} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60 animate-in fade-in duration-500">
           <div className="w-full max-w-2xl bg-zinc-900 border border-white/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/10 blur-[100px] -z-10 rounded-full" />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                       <div className="p-2 bg-armoyu-primary/10 rounded-xl"><ShieldCheck className="text-armoyu-primary" size={20} /></div>
                       Üye Bilgilerini <span className="text-armoyu-primary">Düzenle</span>
                    </h2>
                    <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-2">ID: #{editingMember.id}</p>
                 </div>
                 <button onClick={() => setEditingMember(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-armoyu-text-muted hover:text-white">
                    <MoreVertical size={18} />
                 </button>
              </div>

              {!isVerificationStep ? (
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Görünen İsim</label>
                       <input type="text" defaultValue={editingMember.displayName} className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kullanıcı Adı</label>
                       <input type="text" defaultValue={editingMember.username} className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 relative group">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">E-Posta Adresi</label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={16} />
                          <input type="email" defaultValue={editingMember.email} className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Telefon Numarası</label>
                       <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={16} />
                          <input type="text" defaultValue={editingMember.phone} className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
                       </div>
                    </div>
                  </div>

                  {/* Görsel Yönetimi */}
                  <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 space-y-4">
                     <div className="flex items-center gap-3 text-red-500">
                        <AlertCircle size={18} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Görsel Yönetimi & Moderasyon</h4>
                     </div>

                     {!resetAction ? (
                        <div className="flex gap-4">
                           <button 
                             onClick={() => setResetAction('avatar')}
                             className="flex-1 py-3 bg-white/5 hover:bg-red-500/10 text-armoyu-text-muted hover:text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                           >
                              <Image size={14} /> Avatarı Sıfırla
                           </button>
                           <button 
                             onClick={() => setResetAction('banner')}
                             className="flex-1 py-3 bg-white/5 hover:bg-red-500/10 text-armoyu-text-muted hover:text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                           >
                              <Image size={14} /> Bannerı Sıfırla
                           </button>
                        </div>
                     ) : (
                        <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">
                           <div className="flex items-center justify-between">
                              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                                 Lütfen {resetAction === 'avatar' ? 'avatar' : 'banner'} sıfırlama nedenini seçin:
                              </p>
                              <button onClick={() => {setResetAction(null); setResetReason('');}} className="text-[9px] font-black text-armoyu-primary uppercase underline">Vazgeç</button>
                           </div>
                           <div className="grid grid-cols-1 gap-2">
                              {[
                                'Uygunsuz Cinsel İçerik',
                                'Başka Birini Taklit Etme',
                                'Şiddet / Nefret Söylemi'
                              ].map((reason) => (
                                 <button
                                   key={reason}
                                   onClick={() => setResetReason(reason)}
                                   className={`w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight text-left transition-all border ${
                                     resetReason === reason 
                                       ? 'bg-red-500 border-red-500 text-white' 
                                       : 'bg-black/20 border-white/5 text-armoyu-text-muted hover:border-red-500/50'
                                   }`}
                                 >
                                    {reason}
                                 </button>
                              ))}
                           </div>
                           {resetReason && (
                              <button 
                                onClick={() => {
                                  alert(`${resetAction === 'avatar' ? 'Avatar' : 'Banner'} sıfırlandı. Neden: ${resetReason}`);
                                  setResetAction(null);
                                  setResetReason('');
                                }}
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                              >
                                 <RefreshCw size={14} className="animate-spin-slow" /> SEÇİLENİ SIFIRLA
                              </button>
                           )}
                        </div>
                     )}
                  </div>

                  <div className="pt-4 flex gap-4">
                     <button onClick={() => setEditingMember(null)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-armoyu-text-muted font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">İptal Et</button>
                     <button onClick={handleSaveAttempt} className="flex-[2] py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-armoyu-primary/20 transition-all flex items-center justify-center gap-2">
                        Değişiklikleri Kaydet <ChevronRight size={14} />
                     </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-armoyu-primary/20 rounded-[32px] flex items-center justify-center mx-auto relative shadow-[0_0_50px_rgba(var(--armoyu-primary-rgb),0.3)]">
                      <Key className="text-armoyu-primary" size={32} />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-armoyu-primary rounded-full flex items-center justify-center text-white border-4 border-zinc-900">
                         <ShieldCheck size={14} />
                      </div>
                   </div>
                   
                   <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Güvenlik <span className="text-armoyu-primary">Doğrulaması</span></h3>
                      <p className="text-sm text-armoyu-text-muted font-bold max-w-sm mx-auto leading-relaxed italic">
                        Kritik bilgiler güncellendiği için kullanıcıya bir doğrulama kodu gönderildi. Lütfen kodu giriniz.
                      </p>
                      <div className="mt-4 p-4 bg-armoyu-primary/10 rounded-2xl border border-armoyu-primary/20">
                         <p className="text-[9px] font-black text-armoyu-primary uppercase tracking-widest mb-2">Değişecek Bilgiler:</p>
                         <p className="text-[10px] font-bold text-white uppercase italic">E-Posta: {editingMember.email} {"->"} Yeni E-Posta</p>
                      </div>
                   </div>

                   <div className="max-w-xs mx-auto space-y-6">
                      <input 
                        type="text" 
                        maxLength={6}
                        placeholder="0 0 0 0 0 0" 
                        className="w-full py-6 bg-white/5 border border-white/5 rounded-3xl text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-armoyu-primary/20 transition-all"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <div className="flex gap-4">
                         <button onClick={() => setIsVerificationStep(false)} className="flex-1 py-4 bg-white/5 text-armoyu-text-muted font-black rounded-2xl text-[10px] uppercase">Geri Dön</button>
                         <button className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-[10px] uppercase shadow-lg shadow-emerald-600/20">Doğrula ve Bitir</button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};
