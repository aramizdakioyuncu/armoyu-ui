'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, Sparkles, Plus, Image as ImageIcon, AtSign, AlertCircle } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: {
    name: string;
    shortName: string;
    category: string;
    logo: string;
    description: string;
  }) => void;
}

const CATEGORIES = ['E-Spor/Takım', 'Spor', 'Spor/Takım', 'Yazılım', 'Diğer'];

export function CreateGroupModal({ isOpen, onClose, onCreateGroup }: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [category, setCategory] = useState('E-Spor/Takım');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Grup adı boş bırakılamaz.');
    if (!shortName.trim()) return setError('Grup kısa adı boş bırakılamaz.');
    if (!description.trim()) return setError('Açıklama alanı boş bırakılamaz.');

    // Clean @ prefix if entered by user
    let cleanedShortName = shortName.trim();
    if (cleanedShortName.startsWith('@')) {
      cleanedShortName = cleanedShortName.substring(1);
    }

    // Default logo if empty
    const finalLogo = logo.trim() || 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=800&q=80';

    onCreateGroup({
      name: name.trim(),
      shortName: cleanedShortName,
      category,
      logo: finalLogo,
      description: description.trim(),
    });

    // Reset fields
    setName('');
    setShortName('');
    setCategory('E-Spor/Takım');
    setLogo('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-armoyu-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl -z-10"></div>

        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic flex items-center gap-2">
              <Users className="text-armoyu-primary" size={24} />
              KENDİ GRUBUNU KUR
            </h2>
            <p className="text-[10px] font-bold text-armoyu-primary uppercase tracking-widest mt-1">
              ARMOYU TOPLULUĞUNDA KENDİ EKİBİNİ OLUŞTUR VE YÖNET
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form className="p-8 space-y-6 overflow-y-auto thin-scrollbar" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wider animate-in fade-in">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Row 1: Group Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">GRUP ADI</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm" 
                  placeholder="Örn: ARMOYU Geliştirici Ekibi" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">KATEGORİ</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0a0a0f] text-white">{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Short Name / Tag & Logo URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-1">
                  <AtSign size={12} />
                  KISA AD / ETİKET (TAG)
                </label>
                <input 
                  required
                  type="text" 
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm" 
                  placeholder="Örn: devteam" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-1">
                  <ImageIcon size={12} />
                  LOGO GÖRSEL URL (OPSİYONEL)
                </label>
                <input 
                  type="url" 
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm" 
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">AÇIKLAMA</label>
              <textarea 
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm leading-relaxed" 
                placeholder="Grubunuzun amacını ve kurallarını açıklayın..." 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all"
            >
              İPTAL ET
            </button>
            <button 
              type="submit"
              className="flex-[2] py-5 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-armoyu-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus size={16} strokeWidth={3} />
              GRUBU OLUŞTUR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
