import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Shield, Info, AlertTriangle, XCircle, Download, ChevronRight } from 'lucide-react';
import { ManagementHeader } from '../dashboard/ManagementHeader';

interface LogEntry {
  id: string;
  action: string;
  description: string;
  user: { name: string; username: string; avatar?: string };
  type: 'info' | 'warning' | 'error' | 'security';
  date: string;
  ip: string;
}

export const RegistryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const logs: LogEntry[] = [
    { id: '1', action: 'Yetki Değişikliği', description: 'berkay kullanıcısı Software Developer rolüne yükseltildi.', user: { name: 'Admin', username: 'admin' }, type: 'security', date: '2026-05-02 02:45', ip: '192.168.1.1' },
    { id: '2', action: 'Hesap Silme', description: 'kurallara uymayan @spam_user hesabı kalıcı olarak silindi.', user: { name: 'Alperen K.', username: 'alperen' }, type: 'error', date: '2026-05-02 01:20', ip: '85.105.xx.xx' },
    { id: '3', action: 'Şifre Sıfırlama', description: 'metehan kullanıcısı için şifre sıfırlama bağlantısı gönderildi.', user: { name: 'Sistem', username: 'system' }, type: 'info', date: '2026-05-01 23:15', ip: '176.42.xx.xx' },
    { id: '4', action: 'Giriş Engellendi', description: 'Çok fazla hatalı deneme nedeniyle IP adresi 1 saat kısıtlandı.', user: { name: 'Güvenlik Duvarı', username: 'security' }, type: 'security', date: '2026-05-01 22:10', ip: '127.0.0.1' },
    { id: '5', action: 'Haber Yayınlandı', description: 'Yeni güncelleme notları yayına alındı.', user: { name: 'Berkay T.', username: 'berkay' }, type: 'info', date: '2026-05-01 21:00', ip: '94.54.xx.xx' },
  ];

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'info': return { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Info };
      case 'warning': return { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: AlertTriangle };
      case 'error': return { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle };
      case 'security': return { color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Shield };
      default: return { color: 'text-zinc-500', bg: 'bg-zinc-500/10', icon: Info };
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || log.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ManagementHeader 
        title={<>Kayıt <span className="text-armoyu-primary text-shadow-glow">Defteri</span></>}
        subtitle="Platform üzerinde gerçekleşen tüm sistem ve moderasyon hareketlerini izleyin."
        actions={
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text font-black rounded-2xl transition-all border border-white/5 text-[10px] uppercase tracking-widest">
            <Download size={16} /> Logları Dışa Aktar
          </button>
        }
      />

      {/* Filters Area */}
      <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl p-6 rounded-[32px] border border-white/5 shadow-xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Eylem, açıklama veya kullanıcı ara..." 
            className="w-full pl-12 pr-4 py-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5">
            {['all', 'info', 'warning', 'error', 'security'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  selectedType === type ? 'bg-armoyu-primary text-white' : 'text-armoyu-text-muted hover:text-white'
                }`}
              >
                {type === 'all' ? 'HEPSİ' : type}
              </button>
            ))}
          </div>
          
          <button className="p-4 bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-white transition-all">
            <Calendar size={18} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Eylem & Tür</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Açıklama</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Kullanıcı</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Zaman & IP</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => {
                const style = getTypeStyle(log.type);
                return (
                  <tr key={log.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-xl ${style.bg} ${style.color}`}>
                            <style.icon size={16} />
                         </div>
                         <div>
                            <p className="text-[11px] font-black uppercase tracking-tight text-white">{log.action}</p>
                            <p className={`text-[8px] font-black uppercase tracking-widest ${style.color}`}>{log.type}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-xs font-medium text-armoyu-text-muted leading-relaxed max-w-xs">{log.description}</p>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-white/5 p-0.5 border border-white/5">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.user.username}`} className="w-full h-full rounded-[5px]" alt="" />
                          </div>
                          <span className="text-[10px] font-black uppercase text-armoyu-text opacity-80 italic">@{log.user.username}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-armoyu-text italic">{log.date}</span>
                          <span className="text-[9px] font-bold text-armoyu-text-muted opacity-40">{log.ip}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 bg-white/5 text-armoyu-text-muted hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <ChevronRight size={14} />
                       </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-white/5 text-center">
           <button className="text-[10px] font-black text-armoyu-primary uppercase tracking-[0.2em] hover:underline transition-all">Tüm Geçmişi Gör</button>
        </div>
      </div>
    </div>
  );
};
