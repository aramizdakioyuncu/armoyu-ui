import React, { useState } from 'react';
import { Gamepad2, Plus, Calendar, Clock, MapPin, Users, ChevronRight, Trophy, CheckCircle2, Edit2, AlertCircle, Award, UserCheck } from 'lucide-react';
import { ManagementHeader } from '../dashboard/ManagementHeader';

interface GameEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  limit: number; // 0 means unlimited
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  rules: string;
  minOdp: number;
  participantType: 'bireysel' | 'gruplu' | 'bireysel_gruplu';
}

interface Template {
  name: string;
  title: string;
  location: string;
  limit: number;
  description: string;
  rules: string;
  minOdp: number;
  participantType: 'bireysel' | 'gruplu' | 'bireysel_gruplu';
}

export const GameOfficialManagement = ({ gameName, gameColor, icon: Icon }: { gameName: string, gameColor: string, icon: any }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<GameEvent | null>(null);
  
  const [events, setEvents] = useState<GameEvent[]>([
    { 
      id: '1', 
      title: 'Haftalık Konvoy #12', 
      date: '2026-05-10', 
      time: '21:00', 
      location: 'Duisburg - Calais', 
      participants: 42, 
      limit: 60,
      status: 'upcoming',
      description: 'Haftalık düzenli konvoyumuzdur. Herkes davetlidir.',
      rules: 'Konvoy liderinin arkasında kalınmalı, sollama yapılmamalıdır.',
      minOdp: 20,
      participantType: 'bireysel'
    },
    { 
      id: '2', 
      title: 'Gece Sürüşü Etkinliği', 
      date: '2026-05-15', 
      time: '23:30', 
      location: 'İskandinavya Turu', 
      participants: 18, 
      limit: 0,
      status: 'upcoming',
      description: 'İskandinavya fiyortlarında güzel bir gece sürüşü.',
      rules: 'Far kullanımı zorunludur. Hız sınırı 80 km/s olarak belirlenmiştir.',
      minOdp: 10,
      participantType: 'bireysel_gruplu'
    },
  ]);

  // Form states for creation
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState('-1');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newLimit, setNewLimit] = useState('50');
  const [newDescription, setNewDescription] = useState('');
  const [newRules, setNewRules] = useState('');
  const [newMinOdp, setNewMinOdp] = useState('0');
  const [newParticipantType, setNewParticipantType] = useState<'bireysel' | 'gruplu' | 'bireysel_gruplu'>('bireysel');
  const [createError, setCreateError] = useState('');

  // Form states for editing
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editLimit, setEditLimit] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRules, setEditRules] = useState('');
  const [editMinOdp, setEditMinOdp] = useState('0');
  const [editParticipantType, setEditParticipantType] = useState<'bireysel' | 'gruplu' | 'bireysel_gruplu'>('bireysel');
  const [editError, setEditError] = useState('');

  // Pre-configured templates based on the game name
  const getTemplatesForGame = (game: string): Template[] => {
    if (game.includes('Euro Truck')) {
      return [
        {
          name: 'Standart (Konvoy Şablonu)',
          title: 'Haftalık Konvoy #13',
          location: 'Duisburg - Calais (Sim 1)',
          limit: 60,
          description: 'Haftalık düzenli topluluk konvoyumuz. Tüm oyuncularımız davetlidir.',
          rules: '1. Sollama yapmak kesinlikle yasaktır.\n2. Telsiz kanalı 19 kullanılacaktır.\n3. Konvoy sırası takip edilmelidir.',
          minOdp: 20,
          participantType: 'bireysel'
        },
        {
          name: 'Turnuva (Hız ve Sürüş Yarışı)',
          title: 'ETS 2 Hız Turnuvası',
          location: 'Promods Yarış Pisti',
          limit: 30,
          description: 'En hızlı tır sürücüsünü seçtiğimiz zamana karşı yarış turnuvası.',
          rules: '1. Diğer tırlara kasten çarpmak diskalifiye sebebidir.\n2. Hasarsız bitirmek ek puan kazandırır.',
          minOdp: 30,
          participantType: 'bireysel'
        }
      ];
    }
    if (game.includes('Assetto')) {
      return [
        {
          name: 'Standart (Antrenman Gecesi)',
          title: 'Assetto Corsa Drift & Antrenman Gecesi',
          location: 'Kunos Drift Track (Server 2)',
          limit: 20,
          description: 'Drift severler için tandem ve antrenman buluşması.',
          rules: '1. Pist ters yönüne sürüş kesinlikle yasaktır.\n2. Chat üzerinden tartışmak yasaktır.',
          minOdp: 20,
          participantType: 'bireysel'
        },
        {
          name: 'Turnuva (Zamana Karşı Yarış)',
          title: 'Spa-Francorchamps GT3 Turnuvası',
          location: 'Spa-Francorchamps',
          limit: 30,
          description: 'GT3 kategorisinde 20 dakikalık sıralama ve 30 dakikalık ana yarış turnuvası.',
          rules: '1. İlk viraj temaslarından kaçının.\n2. Mavi bayraklara uyulması zorunludur.',
          minOdp: 50,
          participantType: 'gruplu'
        }
      ];
    }
    if (game.includes('Minecraft')) {
      return [
        {
          name: 'Standart (Survival Buluşması)',
          title: 'Survival Yeni Sezon Başlangıcı',
          location: 'ARMOYU Hub - Survival',
          limit: 0,
          description: 'Survival sunucumuzda yeni sezon sıfırlaması buluşması ve ortak üs yapımı.',
          rules: '1. Claim içi/dışı hırsızlık ve griefing yasaktır.\n2. Hileli istemci kullanımı ban sebebidir.',
          minOdp: 10,
          participantType: 'bireysel_gruplu'
        },
        {
          name: 'Turnuva (Bedwars & Skywars Turnuvası)',
          title: 'Geleneksel Bedwars Turnuvası (4v4)',
          location: 'Bedwars Turnuva Sunucusu',
          limit: 32,
          description: 'Ekiplerin karşı karşıya geleceği ödüllü Bedwars turnuvası.',
          rules: '1. Makro ve drag-click gibi ek donanım yardımları yasaktır.\n2. Küfürleşme elenme sebebidir.',
          minOdp: 30,
          participantType: 'gruplu'
        }
      ];
    }
    if (game.includes('Counter-Strike')) {
      return [
        {
          name: 'Standart (Topluluk Maçları)',
          title: 'CS2 5v5 Topluluk Maçları',
          location: 'Armoyu CS2 128T sunucusu',
          limit: 10,
          description: 'Topluluk üyelerimizle beraber keyifli 5v5 rekabetçi maçları.',
          rules: '1. Toxic davranışlar ve küfürleşmeler yasaktır.\n2. Centilmenlik ön plandadır.',
          minOdp: 20,
          participantType: 'bireysel_gruplu'
        },
        {
          name: 'Turnuva (5v5 Rekabetçi Turnuvası)',
          title: 'CS2 Armoyu Bahar Kupası Turnuvası',
          location: 'Faceit Özel Lobi',
          limit: 40,
          description: 'Kayıtlı takımların eleme usulü karşılaşacağı büyük CS2 turnuvası.',
          rules: '1. Rakibe saygısızlık diskalifiye sebebidir.\n2. Maç saatinde lobide olunmalıdır.\n3. Anti-cheat kullanımı zorunludur.',
          minOdp: 40,
          participantType: 'gruplu'
        }
      ];
    }
    return [
      {
        name: 'Standart (Sohbet & Buluşma)',
        title: 'Topluluk Oyun Gecesi',
        location: 'Discord Ses Kanalı',
        limit: 0,
        description: 'Ortaklaşa seçilen oyunların oynanacağı eğlenceli sohbet gecesi.',
        rules: '1. Saygı çerçevesinde kalınmalıdır.',
        minOdp: 0,
        participantType: 'bireysel'
      },
      {
        name: 'Turnuva Şablonu',
        title: 'Ödüllü Topluluk Turnuvası',
        location: 'Discord Sahne Alanı',
        limit: 30,
        description: 'Topluluk içi tatlı rekabete dayalı turnuva.',
        rules: '1. Centilmenlik kuralları esastır.',
        minOdp: 30,
        participantType: 'bireysel'
      }
    ];
  };

  const templates = getTemplatesForGame(gameName);

  const handleTemplateChange = (index: string) => {
    setSelectedTemplateIndex(index);
    if (index === '-1') return;

    const template = templates[Number(index)];
    if (template) {
      setNewTitle(template.title);
      setNewLocation(template.location);
      setNewLimit(template.limit.toString());
      setNewDescription(template.description);
      setNewRules(template.rules);
      setNewMinOdp(template.minOdp.toString());
      setNewParticipantType(template.participantType);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    if (!newTitle.trim()) return setCreateError('Etkinlik başlığı boş bırakılamaz.');
    if (!newDate) return setCreateError('Tarih seçilmelidir.');
    if (!newTime) return setCreateError('Saat seçilmelidir.');
    if (!newLocation.trim()) return setCreateError('Buluşma noktası boş bırakılamaz.');
    
    const limitVal = Number(newLimit);
    if (isNaN(limitVal) || limitVal < 0) {
      return setCreateError('Geçerli bir katılımcı limiti seçiniz.');
    }

    const minOdpVal = Number(newMinOdp);
    if (isNaN(minOdpVal) || minOdpVal < 0 || minOdpVal > 100) return setCreateError('Minimum ODP 0 ile 100 arasında olmalıdır.');

    const newEvent: GameEvent = {
      id: (events.length + 1).toString(),
      title: newTitle.trim(),
      date: newDate,
      time: newTime,
      location: newLocation.trim(),
      participants: 0,
      limit: limitVal,
      status: 'upcoming',
      description: newDescription.trim() || 'Açıklama belirtilmedi.',
      rules: newRules.trim() || 'Özel kural belirtilmedi.',
      minOdp: minOdpVal,
      participantType: newParticipantType
    };

    setEvents([newEvent, ...events]);
    setIsCreating(false);

    // Reset fields
    setSelectedTemplateIndex('-1');
    setNewTitle('');
    setNewDate('');
    setNewTime('');
    setNewLocation('');
    setNewLimit('50');
    setNewDescription('');
    setNewRules('');
    setNewMinOdp('0');
    setNewParticipantType('bireysel');
  };

  const handleStartEdit = (event: GameEvent) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditDate(event.date);
    setEditTime(event.time);
    setEditLocation(event.location);
    setEditLimit(event.limit.toString());
    setEditDescription(event.description);
    setEditRules(event.rules);
    setEditMinOdp(event.minOdp.toString());
    setEditParticipantType(event.participantType);
    setEditError('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');

    if (!editingEvent) return;

    if (!editTitle.trim()) return setEditError('Etkinlik başlığı boş bırakılamaz.');
    if (!editDate) return setEditError('Tarih seçilmelidir.');
    if (!editTime) return setEditError('Saat seçilmelidir.');
    if (!editLocation.trim()) return setEditError('Buluşma noktası boş bırakılamaz.');
    
    const limitVal = Number(editLimit);
    if (isNaN(limitVal) || limitVal < 0) {
      return setEditError('Geçerli bir katılımcı limiti seçiniz.');
    }

    const minOdpVal = Number(editMinOdp);
    if (isNaN(minOdpVal) || minOdpVal < 0 || minOdpVal > 100) return setEditError('Minimum ODP 0 ile 100 arasında olmalıdır.');

    const updatedEvents = events.map(evt => {
      if (evt.id === editingEvent.id) {
        return {
          ...evt,
          title: editTitle.trim(),
          date: editDate,
          time: editTime,
          location: editLocation.trim(),
          limit: limitVal,
          description: editDescription.trim(),
          rules: editRules.trim(),
          minOdp: minOdpVal,
          participantType: editParticipantType
        };
      }
      return evt;
    });

    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const getParticipantTypeLabel = (type: string) => {
    switch (type) {
      case 'bireysel': return 'Bireysel';
      case 'gruplu': return 'Gruplu';
      case 'bireysel_gruplu': return 'Bireysel & Gruplu';
      default: return 'Bireysel';
    }
  };

  // Helper function to resolve background/text colors based on gameColor prop
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'armoyu-primary':
        return {
          bg: 'bg-armoyu-primary',
          bgLight: 'bg-armoyu-primary/10',
          border: 'border-armoyu-primary/20',
          text: 'text-armoyu-primary',
          shadow: 'shadow-armoyu-primary/20',
          glow: 'bg-armoyu-primary/10',
        };
      case 'red-500':
        return {
          bg: 'bg-red-500',
          bgLight: 'bg-red-500/10',
          border: 'border-red-500/20',
          text: 'text-red-500',
          shadow: 'shadow-red-500/20',
          glow: 'bg-red-500/10',
        };
      case 'emerald-500':
        return {
          bg: 'bg-emerald-500',
          bgLight: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-500',
          shadow: 'shadow-emerald-500/20',
          glow: 'bg-emerald-500/10',
        };
      case 'amber-500':
        return {
          bg: 'bg-amber-500',
          bgLight: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-500',
          shadow: 'shadow-amber-500/20',
          glow: 'bg-amber-500/10',
        };
      default:
        return {
          bg: 'bg-blue-500',
          bgLight: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          text: 'text-blue-500',
          shadow: 'shadow-blue-500/20',
          glow: 'bg-blue-500/10',
        };
    }
  };

  const colors = getColorClasses(gameColor);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ManagementHeader 
        title={<>{gameName} <span className={`${colors.text} text-shadow-glow`}>Yönetimi</span></>}
        subtitle={`${gameName} platformu üzerindeki etkinlikleri ve oyuncu katılımını yönetin.`}
        actions={
          <button 
            onClick={() => setIsCreating(true)}
            className={`flex items-center gap-2 px-6 py-3 ${colors.bg} hover:opacity-90 text-white font-black rounded-2xl transition-all shadow-lg ${colors.shadow} active:scale-95 text-[10px] uppercase tracking-widest`}
          >
            <Plus size={18} /> Yeni Etkinlik Oluştur
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3 text-armoyu-text-muted">
              <Calendar size={18} className={colors.text} />
              Yaklaşan <span className="text-white">Etkinlikler</span>
           </h3>

           <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => handleStartEdit(event)}
                  className="group bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 hover:border-white/10 transition-all flex items-center justify-between shadow-xl cursor-pointer"
                >
                    <div className="flex items-center gap-6">
                       <div className={`w-16 h-16 rounded-2xl ${colors.bgLight} flex flex-col items-center justify-center border ${colors.border}`}>
                          <span className={`text-xs font-black ${colors.text} uppercase`}>{event.date.split('-')[2] || '??'}</span>
                          <span className="text-[9px] font-bold text-armoyu-text-muted uppercase opacity-60">
                            {event.date.split('-')[1] ? new Date(event.date).toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase() : 'MAY'}
                          </span>
                       </div>
                       <div>
                          <h4 className="text-md font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                             <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                                <Clock size={12} /> {event.time}
                             </div>
                             <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                                <MapPin size={12} /> {event.location}
                             </div>
                             <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic">
                                <Users size={12} /> {event.limit === 0 ? `${event.participants} / Sınırsız` : `${event.participants} / ${event.limit}`} Kişi
                             </div>
                             <div className="flex items-center gap-1 text-[10px] font-bold text-armoyu-text-muted uppercase italic bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                <UserCheck size={10} className="text-armoyu-primary" /> {getParticipantTypeLabel(event.participantType)}
                             </div>
                             <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10 uppercase italic">
                                <Award size={10} /> Min ODP: {event.minOdp}+
                             </div>
                          </div>
                       </div>
                    </div>
                    <button className="p-4 bg-white/5 group-hover:bg-white/10 rounded-2xl transition-all">
                       <ChevronRight size={20} className="text-armoyu-text-muted group-hover:text-white transition-colors" />
                    </button>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Stats & Rules */}
        <div className="space-y-6">
           <div className={`p-8 bg-gradient-to-br from-white/5 to-black/40 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${colors.glow} blur-[60px] -z-10 rounded-full`} />
              <Icon className={`${colors.text} mb-4`} size={40} />
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Sunucu <br/> <span className="text-armoyu-text-muted opacity-40 italic">Durumu</span></h3>
              
              <div className="mt-8 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-armoyu-text-muted">Online Oyuncu</span>
                    <span className="text-xs font-black text-white">12 / 64</span>
                 </div>
                 <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <div className={`h-full ${colors.bg} rounded-full`} style={{ width: '20%' }} />
                 </div>
                 <div className="flex items-center gap-2 mt-6">
                    <CheckCircle2 className="text-emerald-500" size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Sunucu Aktif</span>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Trophy size={16} className="text-amber-500" />
                 Yetki <span className="text-white">Kuralları</span>
              </h3>
              <ul className="space-y-4">
                 {['Etkinlik öncesi yoklama zorunludur.', 'Küfür ve argo kullanımı yasaktır.', 'Konvoy düzenine uyulmalıdır.'].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-[10px] font-bold text-armoyu-text-muted leading-relaxed">
                       <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1`} />
                       {rule}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsCreating(false)} />
           <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
              <div className={`absolute top-0 right-0 w-64 h-64 ${colors.glow} blur-[100px] -z-10 rounded-full`} />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                 <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <div className={`p-2 ${colors.bgLight} rounded-xl`}><Plus className={colors.text} size={20} /></div>
                    Yeni <span className={colors.text}>Etkinlik</span>
                 </h2>
                 <button onClick={() => setIsCreating(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white font-black text-xs">X</button>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-8 space-y-6 overflow-y-auto thin-scrollbar">
                 {createError && (
                   <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wider">
                     <AlertCircle size={18} />
                     {createError}
                   </div>
                 )}

                 <div className="space-y-4">
                   {/* Template Select Dropdown */}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Etkinlik Şablonu Seç</label>
                      <select 
                        value={selectedTemplateIndex}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                      >
                         <option value="-1" className="bg-[#0a0a0f] text-gray-500">Şablon Seçilmedi (Boş Form)</option>
                         {templates.map((tpl, i) => (
                           <option key={i} value={i} className="bg-[#0a0a0f]">{tpl.name}</option>
                         ))}
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Etkinlik Başlığı</label>
                      <input 
                        type="text" 
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Örn: Hafta Sonu Konvoyu" 
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Tarih</label>
                         <input 
                           type="date" 
                           required
                           value={newDate}
                           onChange={(e) => setNewDate(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Saat</label>
                         <input 
                           type="time" 
                           required
                           value={newTime}
                           onChange={(e) => setNewTime(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Limiti</label>
                         <select 
                           value={newLimit}
                           onChange={(e) => setNewLimit(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="0" className="bg-[#0a0a0f]">Sınırsız (0)</option>
                            <option value="5" className="bg-[#0a0a0f]">5 Katılımcı</option>
                            <option value="10" className="bg-[#0a0a0f]">10 Katılımcı</option>
                            <option value="15" className="bg-[#0a0a0f]">15 Katılımcı</option>
                            <option value="20" className="bg-[#0a0a0f]">20 Katılımcı</option>
                            <option value="30" className="bg-[#0a0a0f]">30 Katılımcı</option>
                            <option value="40" className="bg-[#0a0a0f]">40 Katılımcı</option>
                            <option value="50" className="bg-[#0a0a0f]">50 Katılımcı</option>
                            <option value="100" className="bg-[#0a0a0f]">100 Katılımcı</option>
                            <option value="200" className="bg-[#0a0a0f]">200 Katılımcı</option>
                            <option value="500" className="bg-[#0a0a0f]">500 Katılımcı</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Minimum ODP Puanı (0 - 100)</label>
                         <input 
                           type="number" 
                           min="0"
                           max="100"
                           value={newMinOdp}
                           onChange={(e) => setNewMinOdp(e.target.value)}
                           placeholder="Örn: 50" 
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Türü</label>
                         <select 
                           value={newParticipantType}
                           onChange={(e) => setNewParticipantType(e.target.value as any)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="bireysel" className="bg-[#0a0a0f]">Bireysel</option>
                            <option value="gruplu" className="bg-[#0a0a0f]">Gruplu</option>
                            <option value="bireysel_gruplu" className="bg-[#0a0a0f]">Bireysel & Gruplu</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Buluşma Noktası / Sunucu</label>
                         <input 
                           type="text" 
                           required
                           value={newLocation}
                           onChange={(e) => setNewLocation(e.target.value)}
                           placeholder="Örn: Duisburg Tamirhane" 
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Açıklama</label>
                      <textarea 
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Etkinlik detaylarını giriniz..." 
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kurallar</label>
                      <textarea 
                        rows={3}
                        value={newRules}
                        onChange={(e) => setNewRules(e.target.value)}
                        placeholder="Kuralları belirtiniz..." 
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>
                 </div>

                 <button 
                   type="submit"
                   className={`w-full py-5 ${colors.bg} hover:opacity-90 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-lg ${colors.shadow} transition-all active:scale-95`}
                 >
                    ETKİNLİĞİ YAYINLA
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Edit / Detail Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setEditingEvent(null)} />
           <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
              <div className={`absolute top-0 right-0 w-64 h-64 ${colors.glow} blur-[100px] -z-10 rounded-full`} />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                 <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <div className={`p-2 ${colors.bgLight} rounded-xl`}><Edit2 className={colors.text} size={20} /></div>
                    Etkinlik <span className={colors.text}>Detayı & Düzenleme</span>
                 </h2>
                 <button onClick={() => setEditingEvent(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white font-black text-xs">X</button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-8 space-y-6 overflow-y-auto thin-scrollbar">
                 {editError && (
                   <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wider">
                     <AlertCircle size={18} />
                     {editError}
                   </div>
                 )}

                 <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Etkinlik Başlığı</label>
                      <input 
                        type="text" 
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Tarih</label>
                         <input 
                           type="date" 
                           required
                           value={editDate}
                           onChange={(e) => setEditDate(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Saat</label>
                         <input 
                           type="time" 
                           required
                           value={editTime}
                           onChange={(e) => setEditTime(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Limiti</label>
                         <select 
                           value={editLimit}
                           onChange={(e) => setEditLimit(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="0" className="bg-[#0a0a0f]">Sınırsız (0)</option>
                            <option value="5" className="bg-[#0a0a0f]">5 Katılımcı</option>
                            <option value="10" className="bg-[#0a0a0f]">10 Katılımcı</option>
                            <option value="15" className="bg-[#0a0a0f]">15 Katılımcı</option>
                            <option value="20" className="bg-[#0a0a0f]">20 Katılımcı</option>
                            <option value="30" className="bg-[#0a0a0f]">30 Katılımcı</option>
                            <option value="40" className="bg-[#0a0a0f]">40 Katılımcı</option>
                            <option value="50" className="bg-[#0a0a0f]">50 Katılımcı</option>
                            <option value="100" className="bg-[#0a0a0f]">100 Katılımcı</option>
                            <option value="200" className="bg-[#0a0a0f]">200 Katılımcı</option>
                            <option value="500" className="bg-[#0a0a0f]">500 Katılımcı</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Minimum ODP Puanı (0 - 100)</label>
                         <input 
                           type="number" 
                           min="0"
                           max="100"
                           value={editMinOdp}
                           onChange={(e) => setEditMinOdp(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Türü</label>
                         <select 
                           value={editParticipantType}
                           onChange={(e) => setEditParticipantType(e.target.value as any)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="bireysel" className="bg-[#0a0a0f]">Bireysel</option>
                            <option value="gruplu" className="bg-[#0a0a0f]">Gruplu</option>
                            <option value="bireysel_gruplu" className="bg-[#0a0a0f]">Bireysel & Gruplu</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Buluşma Noktası / Sunucu</label>
                         <input 
                           type="text" 
                           required
                           value={editLocation}
                           onChange={(e) => setEditLocation(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Açıklama</label>
                      <textarea 
                        rows={3}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kurallar</label>
                      <textarea 
                        rows={3}
                        value={editRules}
                        onChange={(e) => setEditRules(e.target.value)}
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] transition-all"
                    >
                       İPTAL ET
                    </button>
                    <button 
                      type="submit"
                      className={`flex-[2] py-5 ${colors.bg} hover:opacity-90 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-lg ${colors.shadow} transition-all active:scale-95`}
                    >
                       DEĞİŞİKLİKLERİ KAYDET
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};
