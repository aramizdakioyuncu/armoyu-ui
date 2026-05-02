import React from 'react';
import { Layout, Plus, Check, Settings2, BarChart, Users, MessageSquare, Shield } from 'lucide-react';

export const ManagementWidgetCreator = ({ onClose }: { onClose: () => void }) => {
  const [selectedWidgets, setSelectedWidgets] = React.useState(['stats', 'charts']);

  const widgets = [
    { id: 'stats', name: 'Hızlı İstatistikler', description: 'Kullanıcı, haber ve destek sayılarını gösteren özet kartlar.', icon: BarChart },
    { id: 'charts', name: 'Büyüme Grafikleri', description: 'Haftalık ve aylık etkileşim verilerini görselleştirir.', icon: Layout },
    { id: 'activities', name: 'Aktivite Akışı', description: 'Platformdaki son işlemleri anlık olarak listeler.', icon: Settings2 },
    { id: 'users', name: 'Üye Özeti', description: 'Yeni kayıt olan üyelerin hızlı listesi.', icon: Users },
    { id: 'support', name: 'Destek Durumu', description: 'Açık destek taleplerinin kategorize edilmiş özeti.', icon: MessageSquare },
  ];

  const toggleWidget = (id: string) => {
    setSelectedWidgets(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/40 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-zinc-900 border border-white/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-armoyu-primary/10 rounded-xl"><Plus className="text-armoyu-primary" size={20} /></div>
              Dashboard <span className="text-armoyu-primary">Özelleştir</span>
            </h2>
            <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-2">Genel bakış ekranında görünecek widget'ları ve istatistikleri seçin.</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-armoyu-text-muted hover:text-white font-black text-[10px] uppercase">Kapat</button>
        </div>

        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {widgets.map((widget) => (
            <button 
              key={widget.id}
              onClick={() => toggleWidget(widget.id)}
              className={`w-full p-6 rounded-3xl border transition-all flex items-center justify-between group ${
                selectedWidgets.includes(widget.id) 
                  ? 'bg-armoyu-primary/10 border-armoyu-primary/30' 
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl transition-all ${
                  selectedWidgets.includes(widget.id) ? 'bg-armoyu-primary text-white' : 'bg-black/20 text-armoyu-text-muted group-hover:text-white'
                }`}>
                  <widget.icon size={24} />
                </div>
                <div className="text-left">
                  <h4 className={`text-sm font-black uppercase tracking-tight ${selectedWidgets.includes(widget.id) ? 'text-white' : 'text-armoyu-text-muted'}`}>{widget.name}</h4>
                  <p className="text-[10px] font-bold text-armoyu-text-muted opacity-60 mt-0.5">{widget.description}</p>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedWidgets.includes(widget.id) ? 'bg-armoyu-primary border-armoyu-primary text-white scale-110' : 'border-white/10 text-transparent'
              }`}>
                <Check size={16} />
              </div>
            </button>
          ))}
        </div>

        <div className="p-8 border-t border-white/5 bg-black/20">
          <button 
            onClick={() => {
              alert('Dashboard başarıyla özelleştirildi!');
              onClose();
            }}
            className="w-full py-4 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            DEĞİŞİKLİKLERİ UYGULA <BarChart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
