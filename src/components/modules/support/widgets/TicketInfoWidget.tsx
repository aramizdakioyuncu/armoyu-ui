import React from 'react';

export interface TicketInfoWidgetProps {
  id: string;
  category: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  onClose?: () => void;
}

export function TicketInfoWidget({
  category,
  priority,
  createdAt,
  updatedAt,
  status,
  onClose
}: TicketInfoWidgetProps) {
  return (
    <div className="space-y-8 flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-[10px] font-black text-armoyu-text-muted mb-8 uppercase tracking-[0.2em] opacity-60">
          BİLDİRİM BİLGİLERİ
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">KATEGORİ</p>
            <p className="text-sm font-bold text-armoyu-text uppercase">{category}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">ÖNCELİK</p>
            <span
              className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md ${
                priority === 'Yüksek' || priority === 'Kritik' || priority === 'high'
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                  : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              }`}
            >
              {priority}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">OLUŞTURULMA</p>
            <p className="text-sm font-bold text-armoyu-text">{createdAt}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">SON GÜNCELLEME</p>
            <p className="text-sm font-bold text-armoyu-text">{updatedAt}</p>
          </div>
        </div>

        {status !== 'Kapalı' && status !== 'closed' && (
          <button
            onClick={onClose}
            className="w-full mt-12 py-5 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            TALEBİ KAPAT
          </button>
        )}
      </div>

      <div className="p-6 rounded-[32px] bg-blue-500/10 text-center mt-auto">
        <p className="text-xs font-bold text-armoyu-text opacity-70 mb-2 italic">
          Daha hızlı yanıt almak için Discord'u da kullanabilirsin.
        </p>
        <a
          href="https://discord.gg/armoyu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
        >
          DİSCORD SUNUCUMUZ
        </a>
      </div>
    </div>
  );
}
