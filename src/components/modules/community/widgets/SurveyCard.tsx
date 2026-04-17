'use client';

import React, { useState } from 'react';
import { Survey } from '../../../../models/community/Survey';
import { CheckCircle2, Circle, Trophy, Users, Timer, ChevronRight } from 'lucide-react';

interface SurveyCardProps {
  survey: Survey;
  onVote?: (optionId: string) => void;
}

export function SurveyCard({ survey, onVote }: SurveyCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Total votes calculation
  const totalVotes = survey.options.reduce((acc, opt) => acc + (opt.votes || 0), 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setHasVoted(true);
    onVote?.(optionId);
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group">
      
      {/* Premium Gradient Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 blur-[80px] -ml-24 -mb-24 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Trophy size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md">AKTİF ANKET</span>
              <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Sona Erme: 2 Gün</span>
            </div>
            <h3 className="text-sm font-black text-armoyu-text uppercase tracking-widest">GÜNÜN SORUSU</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl">
           <Users size={14} className="text-blue-500" />
           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">{totalVotes} KATILIM</span>
        </div>
      </div>

      <div className="mb-10 relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight mb-4 group-hover:text-blue-500 transition-colors">
          {survey.question}
        </h2>
        <p className="text-sm text-armoyu-text-muted font-medium italic opacity-80">
          ARMOYU topluluğu bu konuda ne düşünüyor? Fikrini paylaş ve sonuçları gör.
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 relative z-10">
        {survey.options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative group/option rounded-2xl border transition-all duration-300 overflow-hidden ${
                hasVoted 
                  ? isSelected ? 'border-blue-500 bg-blue-500/5' : 'border-armoyu-card-border bg-black/5 dark:bg-white/5 opacity-80'
                  : 'border-armoyu-card-border bg-black/5 dark:bg-white/5 hover:border-blue-500/50 hover:bg-black/10'
              }`}
            >
              {/* Progress Bar (Visible after voting) */}
              {hasVoted && (
                <div 
                  className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${isSelected ? 'bg-blue-500/20' : 'bg-black/10 dark:bg-white/5'}`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`transition-colors ${isSelected ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>
                    {hasVoted ? (
                      isSelected ? <CheckCircle2 size={20} /> : percentage > 50 ? <Trophy size={18} className="text-yellow-500" /> : <Circle size={18} className="opacity-20" />
                    ) : (
                      <Circle size={20} className="group-hover/option:text-blue-500 transition-colors" />
                    )}
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-blue-500' : 'text-armoyu-text'}`}>
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-armoyu-text-muted opacity-40 uppercase tracking-widest">{option.votes} OY</span>
                    <span className={`text-lg font-black italic tracking-tighter ${isSelected ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>
                      %{percentage}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-10 pt-8 border-t border-armoyu-card-border flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-armoyu-text-muted">
           <Timer size={14} className="text-blue-500" />
           <span className="text-[9px] font-black uppercase tracking-[0.2em]">ANKETİN BİTMESİNE: 48:12:05</span>
        </div>
        {!hasVoted && (
           <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              OYUNU KULLAN <ChevronRight size={16} strokeWidth={3} />
           </div>
        )}
      </div>
    </div>
  );
}
