'use client';

import React, { useState } from 'react';
import { Survey, SurveyAnswer } from '@armoyu/core';
import { CheckCircle2, Users, Calendar, BarChart3 } from 'lucide-react';

interface SurveyCardProps {
  survey: Survey;
}

export function SurveyCard({ survey }: SurveyCardProps) {
  const [hasVoted, setHasVoted] = useState(survey.hasVoted);
  const [myVoteId, setMyVoteId] = useState(survey.myVoteId);
  const [options, setOptions] = useState<SurveyAnswer[]>(survey.options);
  const [totalVotes, setTotalVotes] = useState(survey.totalVotes);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    // Optimistic Update
    setHasVoted(true);
    setMyVoteId(optionId);
    setTotalVotes(prev => prev + 1);
    setOptions(prev => prev.map(opt => {
      if (opt.id === optionId) {
        return new SurveyAnswer({ ...opt, votes: opt.votes + 1 });
      }
      return opt;
    }));
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70"></div>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <BarChart3 size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none mb-1">Topluluk Anketi</p>
                <div className="flex items-center gap-2">
                   <img src={survey.author?.avatar} className="w-4 h-4 rounded-full" alt="" />
                   <p className="text-[10px] font-bold text-armoyu-text/60 uppercase">{survey.author?.displayName} tarafından</p>
                </div>
             </div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-armoyu-text uppercase tracking-tight italic leading-tight mb-3">
            {survey.question}
          </h3>
          {survey.description && (
            <p className="text-xs font-medium text-armoyu-text-muted leading-relaxed max-w-2xl">
              {survey.description}
            </p>
          )}
        </div>

        <div className="flex flex-col md:items-end gap-2 shrink-0">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
              <Users size={14} className="text-blue-500" />
              <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">{totalVotes} Toplam Oy</span>
           </div>
           {survey.expiresAt && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                <Calendar size={14} className="text-orange-500" />
                <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">Bitiş: {survey.expiresAt}</span>
              </div>
           )}
        </div>
      </div>

      <div className="space-y-4">
        {options.map((opt) => {
          const percentage = getPercentage(opt.votes);
          const isSelected = myVoteId === opt.id;
          
          return (
            <div 
              key={opt.id} 
              className="relative group/opt"
              onClick={() => handleVote(opt.id)}
            >
              <div 
                className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all cursor-pointer relative z-10 
                  ${isSelected ? 'bg-blue-500/10 border-blue-500/50' : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-blue-500/20'}`}
              >
                <div className="flex items-center gap-4 flex-1">
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all 
                     ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-armoyu-card-border group-hover/opt:border-blue-500/50'}`}>
                      {isSelected && <CheckCircle2 size={14} />}
                   </div>
                   <span className={`text-sm md:text-base font-black uppercase tracking-tight ${isSelected ? 'text-blue-500' : 'text-armoyu-text'}`}>
                     {opt.text}
                   </span>
                </div>
                
                {hasVoted && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-armoyu-text/40">{opt.votes} OY</span>
                    <span className="text-lg font-black text-armoyu-text italic">%{percentage}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar Background */}
              {hasVoted && (
                <div className="absolute inset-0 z-0 p-1">
                  <div className="h-full bg-blue-500/10 rounded-xl transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!hasVoted && (
        <div className="mt-8 pt-6 border-t border-armoyu-card-border flex items-center justify-center">
          <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] animate-pulse">
            Seçiminizi yapmak için bir seçeneğe tıklayın
          </p>
        </div>
      )}
      
      {hasVoted && (
        <div className="mt-8 pt-6 border-t border-armoyu-card-border flex items-center justify-between">
           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
             <CheckCircle2 size={12} /> Katılımınız için teşekkürler
           </p>
           <button 
             className="text-[9px] font-black text-armoyu-text-muted hover:text-blue-500 uppercase tracking-widest transition-colors"
             onClick={() => window.location.reload()} // Mock reset
           >
             ANKETİ SIFIRLA (TEST)
           </button>
        </div>
      )}
    </div>
  );
}

