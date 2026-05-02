import React from 'react';
import { FileText, MoreVertical, Eye, Edit3, Trash2, Plus } from 'lucide-react';

export const NewsManagement = () => {
  const news = [
    { id: 1, title: 'Büyük Topluluk Buluşması Geliyor!', author: 'Berkay', category: 'Etkinlik', status: 'Yayında', date: '22.05.2026' },
    { id: 2, title: 'Yeni Web Sitemiz Yayına Girdi', author: 'Alperen', category: 'Duyuru', status: 'Yayında', date: '20.05.2026' },
    { id: 3, title: 'Haziran Ayı Turnuva Takvimi', author: 'Metehan', category: 'Turnuva', status: 'Taslak', date: '18.05.2026' },
    { id: 4, title: 'Sunucu Bakım Çalışması Hakkında', author: 'Sistem', category: 'Teknik', status: 'Arşivlendi', date: '15.05.2026' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Haberler <span className="text-armoyu-primary">&</span> Blog</h2>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1">Platform üzerindeki tüm içerikleri yönetin.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">
          <Plus size={16} /> Yeni Haber
        </button>
      </div>

      <div className="bg-white dark:bg-[#12121a] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-black/5 dark:bg-white/5">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Başlık</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Kategori</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Yazar</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Durum</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Tarih</th>
              <th className="px-6 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {news.map((item) => (
              <tr key={item.id} className="group hover:bg-armoyu-primary/5 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
                      <FileText size={18} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-black/10 dark:bg-white/10 rounded-lg">{item.category}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold italic">@{item.author.toLowerCase()}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'Yayında' ? 'bg-emerald-500' : 
                      item.status === 'Taslak' ? 'bg-amber-500' : 'bg-armoyu-text-muted'
                    }`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[10px] font-bold text-armoyu-text-muted">{item.date}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-armoyu-primary/20 text-armoyu-text-muted hover:text-armoyu-primary rounded-lg transition-all">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-armoyu-primary/20 text-armoyu-text-muted hover:text-armoyu-primary rounded-lg transition-all">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 text-armoyu-text-muted hover:text-red-500 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
