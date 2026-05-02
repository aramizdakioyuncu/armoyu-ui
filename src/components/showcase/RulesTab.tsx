import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  AlertCircle, 
  Gavel, 
  Clock, 
  Ban,
  Info,
  ShieldAlert
} from 'lucide-react';
import { 
  PUNISHMENT_RULES, 
  getRestrictionLabel, 
  getCommunityComplianceLevel 
} from '../../lib/constants/punishmentData';

export function RulesTab() {
  // Group rules by category
  const categories = Array.from(new Set(PUNISHMENT_RULES.map(r => r.category)));
  
  const complianceLevels = [0, 2, 5, 8, 10].map(count => getCommunityComplianceLevel(count));

  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Header */}
      <div className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-armoyu-primary/10 rounded-full border border-armoyu-primary/20 mb-4">
           <Scale size={14} className="text-armoyu-primary" />
           <span className="text-[10px] font-black text-armoyu-primary uppercase tracking-[0.2em]">ARMOYU PROTOKOLÜ</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
          TOPLULUK <br/> <span className="text-armoyu-primary">KURALLARI</span>
        </h2>
        <p className="text-armoyu-text-muted font-bold text-lg max-w-2xl mx-auto leading-relaxed opacity-70 italic">
          Adil, saygılı ve güvenli bir oyun ortamı için hazırlanan temel ilkeler ve ihlal durumunda uygulanan yaptırımlar.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category} className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-armoyu-card-border to-transparent" />
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-armoyu-primary flex items-center gap-3">
                 {category === 'SOHBET' && <Gavel size={24} />}
                 {category === 'İÇERİK' && <ScrollText size={24} />}
                 {category === 'GÜVENLİK' && <ShieldCheck size={24} />}
                 {category === 'HESAP' && <ShieldAlert size={24} />}
                 {category} KURALLARI
               </h3>
               <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-armoyu-card-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PUNISHMENT_RULES.filter(r => r.category === category).map((rule) => (
                <div key={rule.id} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:border-armoyu-primary/30 transition-all group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -z-10 ${
                    rule.severity === 'critical' ? 'bg-armoyu-danger' : 
                    rule.severity === 'high' ? 'bg-armoyu-warning' : 
                    'bg-armoyu-primary'
                  }`} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black text-armoyu-primary bg-armoyu-primary/10 px-3 py-1.5 rounded-xl border border-armoyu-primary/20 mb-3 block w-fit italic">
                        MADDE {rule.article}
                      </span>
                      <h4 className="text-xl font-black italic uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">
                        {rule.name}
                      </h4>
                    </div>
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      rule.severity === 'critical' ? 'bg-armoyu-danger' : 
                      rule.severity === 'high' ? 'bg-armoyu-warning' : 
                      rule.severity === 'medium' ? 'bg-armoyu-primary' : 
                      'bg-armoyu-success'
                    }`} title={`Önem Seviyesi: ${rule.severity}`} />
                  </div>

                  <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-8 opacity-80">
                    {rule.description}
                  </p>

                  <div className="space-y-4 pt-6 border-t border-armoyu-card-border">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest italic">
                         <Clock size={14} className="text-armoyu-primary" />
                         TEMEL CEZA SÜRESİ
                       </div>
                       <span className="text-xs font-black text-armoyu-text italic">
                         {rule.duration === 0 ? 'KALICI (PERMANENT)' : `${rule.duration} SAAT`}
                       </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                       {rule.restrictions.map((res, i) => (
                         <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase text-armoyu-text-muted italic">
                           <Ban size={10} className="text-armoyu-danger" />
                           {getRestrictionLabel(res)}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Rating / Compliance Section */}
      <div className="space-y-10">
         <div className="text-center space-y-4">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Topluluk <span className="text-armoyu-primary">Uyum Seviyeleri</span></h3>
            <p className="text-armoyu-text-muted font-bold text-sm uppercase tracking-widest opacity-60 italic">Suç tekrarına göre uygulanan ceza çarpanları ve güven puanı karşılığı.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {complianceLevels.map((level, i) => (
              <div key={i} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg text-center space-y-4 hover:scale-105 transition-all">
                <div 
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${level.color}20`, color: level.color }}
                >
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-tighter" style={{ color: level.color }}>{level.label}</p>
                   <p className="text-2xl font-black italic mt-1">x{level.multiplier.toFixed(1)}</p>
                </div>
                <p className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-50 italic">CEZA ÇARPANI</p>
              </div>
            ))}
         </div>
      </div>

      {/* Important Disclaimer */}
      <div className="p-10 bg-armoyu-danger/5 border border-armoyu-danger/20 rounded-[48px] flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-armoyu-danger/20 rounded-[24px] flex items-center justify-center shrink-0 shadow-[0_0_50px_rgba(var(--armoyu-danger-rgb),0.2)]">
          <AlertCircle className="text-armoyu-danger" size={40} />
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h4 className="text-xl font-black uppercase text-armoyu-danger tracking-tighter italic">KRİTİK UYARI VE YAPTIRIMLAR</h4>
          <p className="text-sm font-bold text-armoyu-danger/70 leading-relaxed uppercase italic">
            KURALLARA UYULMAMASI DURUMUNDA SİSTEM OTOMATİK OLARAK CEZA ÇARPANINI HESAPLAR VE YAPTIRIMI UYGULAR. 
            AĞIR İHLALLERDE (MADDE M2.2, M3.2, M4.X) HİÇBİR UYARI YAPILMAKSIZIN KALICI UZAKLAŞTIRMA UYGULANIR.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScrollText({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
  );
}
