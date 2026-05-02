import { Settings, Globe, Database, Shield, Bell, Zap, Save, RefreshCcw, Palette, Check } from 'lucide-react';
import { useTheme, AccentColor } from '../../../../../context/ThemeContext';

interface SettingsWidgetProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const SettingsWidget = ({ title, description, icon, children, footer }: SettingsWidgetProps) => (
  <div className="bg-white dark:bg-[#12121a] rounded-[32px] border border-white/5 shadow-2xl overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
    <div className="p-8 space-y-6 flex-1">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3">
             <div className="p-2 bg-armoyu-primary/10 rounded-xl">{icon}</div>
             {title}
          </h3>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="pt-4 space-y-4">
        {children}
      </div>
    </div>
    {footer && (
      <div className="px-8 py-4 bg-black/5 dark:bg-white/5 border-t border-white/5 flex items-center justify-end">
        {footer}
      </div>
    )}
  </div>
);

export const SystemSettingsWidget = () => {
  const { accentColor, setAccentColor } = useTheme();

  const colors: { id: AccentColor; color: string; name: string }[] = [
    { id: 'blue', color: 'var(--armoyu-primary)', name: 'Okyanus' },
    { id: 'green', color: '#10b981', name: 'Doğa' },
    { id: 'pink', color: '#ec4899', name: 'Neon' },
    { id: 'purple', color: '#8b5cf6', name: 'Asil' },
    { id: 'red', color: '#ef4444', name: 'Ateş' },
    { id: 'amber', color: '#f59e0b', name: 'Güneş' },
    { id: 'emerald', color: '#059669', name: 'Zümrüt' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Sistem <span className="text-armoyu-primary">Ayarları</span></h2>
            <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1 italic">Platform çekirdek yapılandırması ve API yönetimi.</p>
         </div>
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text-muted hover:text-white font-black rounded-2xl transition-all text-[10px] uppercase tracking-widest border border-white/5">
               <RefreshCcw size={16} /> Varsayılana Dön
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-armoyu-primary hover:opacity-90 text-white font-black rounded-2xl transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95">
               <Save size={16} /> Tümünü Kaydet
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Theme Settings */}
        <SettingsWidget 
          title="Görünüm ve Tema" 
          description="Platformun ana renk şemasını ve vurgu renklerini belirleyin."
          icon={<Palette className="text-armoyu-primary" size={18} />}
        >
          <div className="grid grid-cols-4 gap-3">
             {colors.map((c) => (
                <button
                   key={c.id}
                   onClick={() => setAccentColor(c.id)}
                   className={`group relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                      accentColor === c.id 
                      ? 'border-armoyu-primary bg-armoyu-primary/10 shadow-lg shadow-primary/10' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                   }`}
                >
                   <div 
                      className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: c.color }}
                   >
                      {accentColor === c.id && <Check size={14} className="text-white" />}
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">{c.name}</span>
                </button>
             ))}
          </div>
        </SettingsWidget>
        {/* General Site Config */}
        <SettingsWidget 
          title="Genel Yapılandırma" 
          description="Platform başlığı, sloganı ve temel meta bilgileri."
          icon={<Globe className="text-armoyu-primary" size={18} />}
          footer={
             <button className="text-[9px] font-black uppercase text-armoyu-primary hover:underline">Kaydet</button>
          }
        >
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">Site Başlığı</label>
                <input type="text" defaultValue="Aramızdaki Oyuncu" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">Site Sloganı</label>
                <input type="text" defaultValue="Oyuncuların Buluşma Noktası" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50" />
             </div>
          </div>
        </SettingsWidget>

        {/* API Settings */}
        <SettingsWidget 
          title="API / Backend" 
          description="Core API endpoint'leri ve güvenlik anahtarları."
          icon={<Database className="text-armoyu-success" size={18} />}
          footer={
            <div className="flex items-center gap-2 text-[9px] font-black text-armoyu-success">
               <div className="w-1.5 h-1.5 bg-armoyu-success rounded-full animate-pulse" />
               BAĞLANTI AKTİF
            </div>
         }
        >
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">API Endpoint</label>
                <input type="text" defaultValue="https://api.armoyu.com/v3" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm font-bold font-mono" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">CDN Sunucusu</label>
                <input type="text" defaultValue="https://cdn.armoyu.com" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm font-bold font-mono" />
             </div>
          </div>
        </SettingsWidget>

        {/* Maintenance Mode */}
        <SettingsWidget 
          title="Sistem Bakımı" 
          description="Platformu bakıma al veya erişimi kısıtla."
          icon={<Shield className="text-armoyu-danger" size={18} />}
        >
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-armoyu-danger/5 border border-armoyu-danger/10 rounded-2xl">
                <div>
                   <p className="text-[10px] font-black uppercase text-armoyu-danger">Bakım Modu</p>
                   <p className="text-[8px] font-bold text-armoyu-danger/60 uppercase italic">Tüm erişimi kapatır</p>
                </div>
                <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer group">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full transition-all group-hover:bg-white/40" />
                </div>
             </div>
             <div className="p-4 bg-armoyu-warning/5 border border-armoyu-warning/10 rounded-2xl">
                 <p className="text-[9px] font-black uppercase text-armoyu-warning mb-2 flex items-center gap-2">
                   <Bell size={12} /> Bilgilendirme Mesajı
                 </p>
                 <textarea defaultValue="Sistem şu an bakımdadır. Lütfen daha sonra tekrar deneyiniz." className="w-full bg-transparent text-[10px] font-bold text-armoyu-warning/80 focus:outline-none resize-none h-16 italic" />
             </div>
          </div>
        </SettingsWidget>

        {/* SMS & Mail Settings */}
        <SettingsWidget 
          title="Bildirim Servisleri" 
          description="SMS ve Mail gönderim sağlayıcı ayarları."
          icon={<Zap className="text-armoyu-warning" size={18} />}
        >
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                   <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">Provider</label>
                   <select className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-black uppercase">
                      <option>NetGSM</option>
                      <option>Twilio</option>
                      <option>AWS SES</option>
                   </select>
                </div>
                <div className="flex-1 space-y-2">
                   <label className="text-[10px] font-black uppercase text-armoyu-text-muted ml-1 italic">Bakiye</label>
                   <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-black text-armoyu-success">
                      1,482 Kredi
                   </div>
                </div>
             </div>
          </div>
        </SettingsWidget>
      </div>
    </div>
  );
};
