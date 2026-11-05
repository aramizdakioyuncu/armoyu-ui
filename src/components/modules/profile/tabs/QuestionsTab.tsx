'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { MessageSquare, Trash2, Send, Clock, User as UserIcon } from 'lucide-react';

interface Question {
  id: number | string;
  content: string;
  answer?: string;
  date: string;
  isAnonymous: boolean;
  asker?: { username: string; displayName: string; avatar: string } | null;
}

// Eski API'de soru-cevap ucu yok; bu örnekler yalnızca orada gösterilir
const INITIAL_QUESTIONS: Question[] = [
  { id: 1, content: "Sence de bu profil çok havalı değil mi?", date: "2 saat önce", isAnonymous: true },
  { id: 2, content: "En son kimi stalkladın dürüst ol :D", date: "5 saat önce", isAnonymous: true },
  { id: 3, content: "Neden bu kadar yakışıklısın/güzelsin?", date: "Dün", isAnonymous: true },
  { id: 4, content: "Gizli bir yeteneğin var mı? Varsa ne?", date: "2 gün önce", isAnonymous: true },
  { id: 5, content: "En sevdiğin yemek makarna mı? Değilse neden değil??", date: "3 gün önce", isAnonymous: true },
];

interface QuestionsTabProps {
  isOwnProfile?: boolean;
  /** Soruları listelenen profilin kullanıcı kimliği */
  userId?: number | string;
}

export function QuestionsTab({ isOwnProfile = true, userId }: QuestionsTabProps) {
  const { api } = useArmoyu();
  // shortcut: yayınlanan @armoyu/core tiplerinde soru metotları yok; yeni sürüm çıkınca cast kalkacak
  const users = api.users as any;
  const isLive = (api as any).version === 'current';
  const [questions, setQuestions] = useState<Question[]>(isLive ? [] : INITIAL_QUESTIONS);
  const [isLoading, setIsLoading] = useState(isLive);
  const [error, setError] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [answeringId, setAnsweringId] = useState<number | string | null>(null);
  const [tempAnswer, setTempAnswer] = useState('');
  const [visitorQuestion, setVisitorQuestion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const displayQuestions = isOwnProfile ? questions : questions.filter(q => q.answer);

  const load = useCallback(async () => {
    if (!isLive || !userId) return;
    setIsLoading(true);
    const response = await users.getQuestions(userId);
    if (response.durum === 1) {
      setQuestions(Array.isArray(response.icerik) ? response.icerik : []);
      setError('');
    } else {
      setError(response.aciklama || 'Sorular yüklenemedi.');
    }
    setIsLoading(false);
  }, [isLive, userId, users]);

  useEffect(() => { load(); }, [load]);

  const handleAsk = async () => {
    if (!visitorQuestion.trim() || isSending) return;
    if (isLive) {
      setIsSending(true);
      const response = await users.askQuestion(userId, visitorQuestion.trim(), isAnonymous);
      setIsSending(false);
      if (response.durum !== 1) {
        setError(response.aciklama || 'Soru gönderilemedi.');
        return;
      }
      setError('');
    }
    setShowSuccess(true);
    setVisitorQuestion('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAnswer = async (id: number | string) => {
    if (!tempAnswer.trim() || isSending) return;
    if (isLive) {
      setIsSending(true);
      const response = await users.answerQuestion(String(id), tempAnswer.trim());
      setIsSending(false);
      if (response.durum !== 1) {
        setError(response.aciklama || 'Cevap kaydedilemedi.');
        return;
      }
      setError('');
    }
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, answer: tempAnswer.trim() } : q
    ));
    setAnsweringId(null);
    setTempAnswer('');
  };

  const handleDelete = async (id: number | string) => {
    if (isLive) {
      const response = await users.deleteQuestion(String(id));
      if (response.durum !== 1) {
        setError(response.aciklama || 'Soru silinemedi.');
        return;
      }
    }
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Visitor Ask Box */}
      {!isOwnProfile && (
        <div className="bg-armoyu-card-bg border border-purple-500/20 rounded-3xl p-5 space-y-4 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Send size={16} />
             </div>
             <div>
                <h3 className="text-xs font-black text-armoyu-text uppercase italic">SORU SOR</h3>
             </div>
          </div>
          
          <textarea
            value={visitorQuestion}
            onChange={(e) => setVisitorQuestion(e.target.value)}
            placeholder={isAnonymous ? "Merak ettiğin bir şeyi anonim olarak sor..." : "Merak ettiğin bir şeyi sor..."}
            maxLength={500}
            className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-purple-500/50 rounded-2xl p-4 text-sm font-medium text-armoyu-text outline-none transition-all min-h-[100px]"
          />
          
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-[10px] font-bold text-armoyu-text-muted uppercase italic tracking-widest cursor-pointer">
              <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="accent-purple-600" />
              Anonim sor
            </label>
            <button 
              onClick={handleAsk}
              disabled={!visitorQuestion.trim() || isSending}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-purple-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSending ? 'GÖNDERİLİYOR...' : 'SORUYU GÖNDER'}
            </button>
          </div>

          {showSuccess && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-center animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-[10px] font-black text-green-500 uppercase tracking-widest italic">Soru başarıyla iletildi! 🎉</p>
            </div>
          )}
        </div>
      )}

      {error && <p role="alert" className="text-sm font-bold text-red-500 text-center">{error}</p>}

      <div className="grid gap-4" aria-busy={isLoading}>
        {isLoading && [0, 1].map((i) => <div key={i} className="h-40 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />)}
        {displayQuestions.map((q) => (
          <div 
            key={q.id}
            className={`group relative bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 transition-all hover:border-purple-500/30 shadow-sm ${q.answer ? 'bg-purple-500/5' : ''}`}
          >
            {/* Question Part */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-500/10 flex items-center justify-center text-zinc-500">
                    <UserIcon size={14} />
                  </div>
                  <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest italic">{q.asker ? `${q.asker.displayName} sordu` : 'Anonim Birisi Sordu'}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-armoyu-text-muted/40 uppercase tracking-tighter">
                    <Clock size={10} />
                    {q.date}
                  </div>
                </div>
                
                <p className="text-lg font-black text-armoyu-text leading-relaxed tracking-tight">
                  <span className="text-purple-500 mr-2 text-2xl">"</span>
                  {q.content}
                  <span className="text-purple-500 ml-1 text-2xl">"</span>
                </p>
              </div>

              {isOwnProfile && (
                <button 
                  onClick={() => handleDelete(q.id)}
                  className="p-3 text-armoyu-text-muted hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                  title="Soruyu Sil"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {/* Answer Part */}
            <div className="mt-5 pt-5 border-t border-armoyu-card-border">
              {q.answer ? (
                <div className="flex items-start gap-3 animate-in fade-in slide-in-from-left duration-500">
                  <div className="w-8 h-8 rounded-xl bg-armoyu-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-armoyu-primary/20">
                    <span className="font-black italic text-[10px]">SEN</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest italic">CEVABIN</p>
                    <p className="text-sm font-bold text-armoyu-text leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              ) : isOwnProfile && answeringId === q.id ? (
                <div className="flex flex-col gap-3 animate-in zoom-in-95 duration-300">
                  <textarea
                    autoFocus
                    value={tempAnswer}
                    onChange={(e) => setTempAnswer(e.target.value)}
                    placeholder="Eğlenceli bir cevap yaz..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-purple-500/30 rounded-2xl p-4 text-sm font-medium text-armoyu-text outline-none focus:ring-2 ring-purple-500/20 transition-all min-h-[80px]"
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setAnsweringId(null); setTempAnswer(''); }}
                      className="px-4 py-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest hover:text-armoyu-text transition-colors"
                    >
                      VAZGEÇ
                    </button>
                    <button 
                      onClick={() => handleAnswer(q.id)}
                      disabled={isSending}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-purple-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Send size={12} /> GÖNDER
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setAnsweringId(q.id)}
                  className="w-full py-3 bg-black/5 hover:bg-black/10 border border-dashed border-armoyu-card-border hover:border-purple-500/40 rounded-2xl text-[10px] font-black text-armoyu-text-muted hover:text-purple-500 uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 italic"
                >
                  <MessageSquare size={14} />BU SORUYU CEVAPLA
                </button>
              )}
            </div>
          </div>
        ))}

        {!isLoading && displayQuestions.length === 0 && (
          <div className="py-16 text-center border-2 border-dashed border-armoyu-card-border rounded-3xl">
             <MessageSquare className="w-12 h-12 text-armoyu-text-muted mx-auto mb-3 opacity-20" />
             <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">{isOwnProfile ? 'Henüz sana soru sorulmadı.' : 'Henüz cevaplanmış soru yok.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
