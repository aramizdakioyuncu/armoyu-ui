import React, { useState } from 'react';
import { Search, Calendar, Plus, MapPin, Users, Clock, ChevronRight, MoreVertical, Edit3, X, AlertCircle, Award, UserCheck } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number; // 0 means unlimited
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
  description: string;
  rules: string;
  minOdp: number;
  participantType: 'bireysel' | 'gruplu' | 'bireysel_gruplu';
}

interface Template {
  name: string;
  title: string;
  type: string;
  location: string;
  maxParticipants: number;
  image: string;
  description: string;
  rules: string;
  minOdp: number;
  participantType: 'bireysel' | 'gruplu' | 'bireysel_gruplu';
}

export const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>([
    { 
      id: '1', 
      title: 'CS2 Topluluk Gecesi', 
      type: 'Oyun', 
      date: '2026-05-15T21:00', 
      location: 'Armoyu Discord', 
      participants: 45, 
      maxParticipants: 100, 
      status: 'upcoming', 
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
      description: 'Haftalık CS2 topluluk gecemiz. Rekabetçi ve eğlenceli maçlar düzenlenecektir.',
      rules: 'Saygılı olunması, hile kullanılmaması ve Discord kurallarına uyulması zorunludur.',
      minOdp: 30,
      participantType: 'bireysel_gruplu'
    },
    { 
      id: '2', 
      title: 'ETS 2 Konvoyu - Avrupa Seferi', 
      type: 'Oyun', 
      date: '2026-05-12T20:00', 
      location: 'Simulation Server', 
      participants: 28, 
      maxParticipants: 50, 
      status: 'upcoming', 
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
      description: 'Avrupa yollarında konvoy etkinliği.',
      rules: 'Konvoy hız sınırlarına uyulmalı, farlar sürekli açık tutulmalıdır.',
      minOdp: 20,
      participantType: 'bireysel'
    },
    { 
      id: '3', 
      title: 'Geliştirici Buluşması', 
      type: 'Kurumsal', 
      date: '2026-05-20T19:00', 
      location: 'Online Zoom', 
      participants: 12, 
      maxParticipants: 0, 
      status: 'ongoing', 
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
      description: 'Aylık geliştirici ve katkı sağlayanlar buluşması.',
      rules: 'Toplantı gündemine sadık kalınmalı, söz hakkı sırayla alınmalıdır.',
      minOdp: 10,
      participantType: 'bireysel'
    },
  ]);

  const generalTemplates: Template[] = [
    {
      name: 'Standart (Topluluk Oyun Buluşması)',
      title: 'Haftalık Topluluk Oyun Gecesi',
      type: 'Oyun',
      location: 'Armoyu Discord Ses Kanalı',
      maxParticipants: 0,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
      description: 'Topluluğumuzla bir araya gelip eğlenceli parti oyunları (Among Us, Gartic.io vb.) oynayacağımız etkinlik.',
      rules: '1. Centilmenlik ve saygı çerçevesi dışına çıkılmamalıdır.\n2. Discord kuralları geçerlidir.',
      minOdp: 0,
      participantType: 'bireysel'
    },
    {
      name: 'Turnuva (Topluluk Eleme Maçları)',
      title: 'Armoyu Geleneksel E-Spor Turnuvası',
      type: 'Oyun',
      location: 'Discord Turnuva Lobisi',
      maxParticipants: 64,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
      description: 'Kayıtlı topluluk oyuncularının karşı karşıya geleceği eleme usulü turnuva.',
      rules: '1. Centilmenlik kuralları esastır.\n2. Hile ve haksız kazanç sağlayan her türlü yazılım yasaktır.',
      minOdp: 30,
      participantType: 'gruplu'
    },
    {
      name: 'Toplantı / Sohbet (Yönetici Buluşması)',
      title: 'Aylık Yönetim Kurulu Toplantısı',
      type: 'Kurumsal',
      location: 'Discord Toplantı Odası',
      maxParticipants: 20,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
      description: 'Yönetici ve yetkili ekibin katılımıyla sunucu gidişatının, şikayetlerin ve yeni projelerin görüşüleceği toplantı.',
      rules: '1. Sadece yönetim ekibi katılabilir.\n2. Gündem maddeleri dışında konuşulmamalıdır.',
      minOdp: 50,
      participantType: 'bireysel'
    }
  ];

  // Form states for creation
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState('-1');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Oyun');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newMaxParticipants, setNewMaxParticipants] = useState('100');
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRules, setNewRules] = useState('');
  const [newMinOdp, setNewMinOdp] = useState('0');
  const [newParticipantType, setNewParticipantType] = useState<'bireysel' | 'gruplu' | 'bireysel_gruplu'>('bireysel');
  const [createError, setCreateError] = useState('');

  // Form states for editing
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editMaxParticipants, setEditMaxParticipants] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRules, setEditRules] = useState('');
  const [editMinOdp, setEditMinOdp] = useState('0');
  const [editParticipantType, setEditParticipantType] = useState<'bireysel' | 'gruplu' | 'bireysel_gruplu'>('bireysel');
  const [editError, setEditError] = useState('');

  const handleTemplateChange = (index: string) => {
    setSelectedTemplateIndex(index);
    if (index === '-1') return;

    const template = generalTemplates[Number(index)];
    if (template) {
      setNewTitle(template.title);
      setNewType(template.type);
      setNewLocation(template.location);
      setNewMaxParticipants(template.maxParticipants.toString());
      setNewImage(template.image);
      setNewDescription(template.description);
      setNewRules(template.rules);
      setNewMinOdp(template.minOdp.toString());
      setNewParticipantType(template.participantType);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    if (!newTitle.trim()) return setCreateError('Başlık boş bırakılamaz.');
    if (!newDate) return setCreateError('Tarih ve saat seçilmelidir.');
    if (!newLocation.trim()) return setCreateError('Konum boş bırakılamaz.');
    
    const limitVal = Number(newMaxParticipants);
    if (isNaN(limitVal) || limitVal < 0) {
      return setCreateError('Geçerli bir katılımcı limiti seçiniz.');
    }

    const minOdpVal = Number(newMinOdp);
    if (isNaN(minOdpVal) || minOdpVal < 0 || minOdpVal > 100) return setCreateError('Minimum ODP 0 ile 100 arasında olmalıdır.');

    const finalImage = newImage.trim() || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop';

    const newEvent: Event = {
      id: (events.length + 1).toString(),
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      location: newLocation.trim(),
      participants: 0,
      maxParticipants: limitVal,
      status: 'upcoming',
      image: finalImage,
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
    setNewType('Oyun');
    setNewDate('');
    setNewLocation('');
    setNewMaxParticipants('100');
    setNewImage('');
    setNewDescription('');
    setNewRules('');
    setNewMinOdp('0');
    setNewParticipantType('bireysel');
  };

  const handleStartEdit = (evt: Event) => {
    setEditingEvent(evt);
    setEditTitle(evt.title);
    setEditType(evt.type);
    setEditDate(evt.date);
    setEditLocation(evt.location);
    setEditMaxParticipants(evt.maxParticipants.toString());
    setEditImage(evt.image);
    setEditDescription(evt.description);
    setEditRules(evt.rules);
    setEditMinOdp(evt.minOdp.toString());
    setEditParticipantType(evt.participantType);
    setEditError('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');

    if (!editingEvent) return;

    if (!editTitle.trim()) return setEditError('Başlık boş bırakılamaz.');
    if (!editDate) return setEditError('Tarih ve saat seçilmelidir.');
    if (!editLocation.trim()) return setEditError('Konum boş bırakılamaz.');
    
    const limitVal = Number(editMaxParticipants);
    if (isNaN(limitVal) || limitVal < 0) {
      return setEditError('Geçerli bir katılımcı limiti seçiniz.');
    }

    const minOdpVal = Number(editMinOdp);
    if (isNaN(minOdpVal) || minOdpVal < 0 || minOdpVal > 100) return setEditError('Minimum ODP 0 ile 100 arasında olmalıdır.');

    const updatedEvents = events.map(item => {
      if (item.id === editingEvent.id) {
        return {
          ...item,
          title: editTitle.trim(),
          type: editType,
          date: editDate,
          location: editLocation.trim(),
          maxParticipants: limitVal,
          image: editImage.trim() || item.image,
          description: editDescription.trim(),
          rules: editRules.trim(),
          minOdp: minOdpVal,
          participantType: editParticipantType
        };
      }
      return item;
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

  const filteredEvents = events.filter(evt => {
    return evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Etkinlik ara..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all shadow-xl shadow-black/5 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-8 py-4 bg-armoyu-primary hover:bg-armoyu-primary/95 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-armoyu-primary/20 transition-all active:scale-95 flex items-center gap-2"
        >
           <Plus size={16} /> YENİ ETKİNLİK OLUŞTUR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 overflow-hidden hover:border-armoyu-primary/30 transition-all shadow-xl shadow-black/5 flex flex-col">
            <div className="relative h-48 overflow-hidden">
               <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                     {event.type}
                  </span>
               </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col">
               <div className="space-y-3">
                  <h4 className="font-black text-white uppercase tracking-tighter text-lg leading-tight group-hover:text-armoyu-primary transition-colors">{event.title}</h4>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <Calendar size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">
                       {event.date.includes('T') ? new Date(event.date).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }) : event.date}
                     </span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <MapPin size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <Users size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic">
                       {event.maxParticipants === 0 ? `${event.participants} / Sınırsız` : `${event.participants} / ${event.maxParticipants}`} Katılımcı
                     </span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <UserCheck size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-bold italic bg-white/5 px-2 py-0.5 rounded border border-white/5">{getParticipantTypeLabel(event.participantType)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-armoyu-text-muted">
                     <Award size={14} className="text-armoyu-primary" />
                     <span className="text-[11px] font-black text-amber-400 uppercase italic">Min ODP: {event.minOdp}+</span>
                  </div>
               </div>

               <div className="pt-4 mt-auto">
                  <div className="h-1.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                     <div 
                       className="h-full bg-armoyu-primary rounded-full transition-all duration-1000" 
                       style={{ width: `${event.maxParticipants === 0 ? 10 : Math.min(100, ((event.participants / event.maxParticipants) * 100))}%` }}
                     />
                  </div>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleStartEdit(event)}
                       className="flex-1 py-3 bg-white/5 hover:bg-armoyu-primary text-armoyu-text hover:text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all"
                     >
                       DÜZENLE
                     </button>
                     <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-armoyu-text-muted transition-all">
                        <MoreVertical size={16} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsCreating(false)} />
           <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/10 blur-[100px] -z-10 rounded-full" />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                 <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-white">
                    <div className="p-2 bg-armoyu-primary/10 rounded-xl"><Plus className="text-armoyu-primary" size={20} /></div>
                    Yeni <span className="text-armoyu-primary">Etkinlik</span>
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
                         {generalTemplates.map((tpl, i) => (
                           <option key={i} value={i} className="bg-[#0a0a0f]">{tpl.name}</option>
                         ))}
                      </select>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Etkinlik Başlığı</label>
                         <input 
                           type="text" 
                           required
                           value={newTitle}
                           onChange={(e) => setNewTitle(e.target.value)}
                           placeholder="Örn: CS2 Rekabetçi Gecesi" 
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kategori</label>
                         <select 
                           value={newType}
                           onChange={(e) => setNewType(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="Oyun" className="bg-[#0a0a0f]">Oyun</option>
                            <option value="Kurumsal" className="bg-[#0a0a0f]">Kurumsal</option>
                            <option value="Topluluk" className="bg-[#0a0a0f]">Topluluk</option>
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Tarih & Saat</label>
                         <input 
                           type="datetime-local" 
                           required
                           value={newDate}
                           onChange={(e) => setNewDate(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Limiti</label>
                         <select 
                           value={newMaxParticipants}
                           onChange={(e) => setNewMaxParticipants(e.target.value)}
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
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Konum / Buluşma Noktası</label>
                         <input 
                           type="text" 
                           required
                           value={newLocation}
                           onChange={(e) => setNewLocation(e.target.value)}
                           placeholder="Örn: Discord" 
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Görsel URL (Opsiyonel)</label>
                         <input 
                           type="url" 
                           value={newImage}
                           onChange={(e) => setNewImage(e.target.value)}
                           placeholder="https://images.unsplash.com/..." 
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

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Açıklama</label>
                      <textarea 
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Etkinlik detayları..." 
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kurallar</label>
                      <textarea 
                        rows={3}
                        value={newRules}
                        onChange={(e) => setNewRules(e.target.value)}
                        placeholder="Uyuması gereken kurallar..." 
                        className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                      />
                   </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-armoyu-primary hover:bg-armoyu-primary/95 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-armoyu-primary/20 transition-all active:scale-95"
                 >
                    ETKİNLİĞİ YAYINLA
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setEditingEvent(null)} />
           <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/10 blur-[100px] -z-10 rounded-full" />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                 <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 text-white">
                    <div className="p-2 bg-armoyu-primary/10 rounded-xl"><Edit3 className="text-armoyu-primary" size={20} /></div>
                    Etkinlik <span className="text-armoyu-primary">Detayı & Düzenleme</span>
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
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Kategori</label>
                         <select 
                           value={editType}
                           onChange={(e) => setEditType(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer"
                         >
                            <option value="Oyun" className="bg-[#0a0a0f]">Oyun</option>
                            <option value="Kurumsal" className="bg-[#0a0a0f]">Kurumsal</option>
                            <option value="Topluluk" className="bg-[#0a0a0f]">Topluluk</option>
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Tarih & Saat</label>
                         <input 
                           type="datetime-local" 
                           required
                           value={editDate}
                           onChange={(e) => setEditDate(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Katılımcı Limiti</label>
                         <select 
                           value={editMaxParticipants}
                           onChange={(e) => setEditMaxParticipants(e.target.value)}
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
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Konum / Buluşma Noktası</label>
                         <input 
                           type="text" 
                           required
                           value={editLocation}
                           onChange={(e) => setEditLocation(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Görsel URL (Opsiyonel)</label>
                         <input 
                           type="url" 
                           value={editImage}
                           onChange={(e) => setEditImage(e.target.value)}
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
                         <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">Minimum ODP Puanı (0 - 100)</label>
                         <input 
                           type="number" 
                           min="0"
                           max="100"
                           value={editMinOdp}
                           onChange={(e) => setEditMinOdp(e.target.value)}
                           className="w-full px-5 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 text-white cursor-pointer" 
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
                      className="flex-[2] py-5 bg-armoyu-primary hover:bg-armoyu-primary/95 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-armoyu-primary/20 transition-all active:scale-95"
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
