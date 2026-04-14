'use client';

import React, { useState } from 'react';
import { X, Check, Star } from 'lucide-react';
import { SUPER_LEAGUE_TEAMS, ZODIAC_SIGNS } from '../../../../lib/constants/teamData';
import { Team } from '@armoyu/core';


interface TeamSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (team: Team | null, zodiac: string) => void;
  initialTeam?: Team | null;
  initialZodiac?: string;
}

export function TeamSelectorModal({ isOpen, onClose, onSelect, initialTeam, initialZodiac }: TeamSelectorModalProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(initialTeam || null);
  const [selectedZodiac, setSelectedZodiac] = useState<string>(initialZodiac || '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

      {/* Modal Content */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
              <Star size={24} className="fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tighter leading-none">PROFİLİNİ TAMAMLA</h3>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-2 italic opacity-60">Seni daha yakından tanıyalım</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-10 overflow-y-auto custom-scrollbar">

          {/* Team Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] italic ml-1 leading-none">FAVORİ TAKIMIN</label>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest italic">{selectedTeam?.name || 'Seçilmedi'}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUPER_LEAGUE_TEAMS.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`relative p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-3 group ${selectedTeam?.id === team.id
                      ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                      : 'bg-black/5 border-armoyu-card-border hover:border-white/20'
                    }`}
                >
                  {team.logo ? (
                    <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl">🚫</div>
                  )}
                  <span className={`text-[10px] font-black uppercase tracking-widest text-center ${selectedTeam?.id === team.id ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>
                    {team.name}
                  </span>

                  {selectedTeam?.id === team.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white animate-in zoom-in duration-300">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Zodiac Selection */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] italic ml-1 leading-none">BURCUN</label>
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest italic">{selectedZodiac || 'Seçilmedi'}</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {ZODIAC_SIGNS.map((zodiac) => (
                <button
                  key={zodiac.name}
                  onClick={() => setSelectedZodiac(zodiac.name)}
                  className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1.5 group ${selectedZodiac === zodiac.name
                      ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-black/5 border-armoyu-card-border hover:border-white/10'
                    }`}
                  title={zodiac.name}
                >
                  <span className={`text-2xl group-hover:scale-110 transition-transform duration-500 ${selectedZodiac === zodiac.name ? 'opacity-100' : 'opacity-60'}`}>
                    {zodiac.icon}
                  </span>
                  <span className={`text-[8px] font-bold uppercase tracking-tighter ${selectedZodiac === zodiac.name ? 'text-purple-500' : 'text-armoyu-text-muted'}`}>
                    {zodiac.name}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-armoyu-card-border bg-black/5 shrink-0">
          <button
            onClick={() => onSelect(selectedTeam, selectedZodiac)}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 italic"
          >
            DEĞİŞİKLİKLERİ KAYDET <Check size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
