'use client';

import React, { useState } from 'react';
import { MessageSquare, Trash2, Send, Clock, User as UserIcon } from 'lucide-react';

interface Question {
  id: number;
  content: string;
  answer?: string;
  date: string;
  isAnonymous: boolean;
}

const INITIAL_QUESTIONS: Question[] = [
  { id: 1, content: "Sence de bu profil çok havalı değil mi?", date: "2 saat önce", isAnonymous: true },
  { id: 2, content: "En son kimi stalkladın dürüst ol :D", date: "5 saat önce", isAnonymous: true },
  { id: 3, content: "Neden bu kadar yakışıklısın/güzelsin?", date: "Dün", isAnonymous: true },
  { id: 4, content: "Gizli bir yeteneğin var mı? Varsa ne?", date: "2 gün önce", isAnonymous: true },
  { id: 5, content: "En sevdiğin yemek makarna mı? Değilse neden değil??", date: "3 gün önce", isAnonymous: true },
];

interface QuestionsTabProps {
  isOwnProfile?: boolean;
}

export function QuestionsTab({ isOwnProfile = true }: QuestionsTabProps) {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [answeringId, setAnsweringId] = useState<number | null>(null);
  const [tempAnswer, setTempAnswer] = useState('');
  const [visitorQuestion, setVisitorQuestion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const displayQuestions = isOwnProfile ? questions : questions.filter(q => q.answer);

  const handleAsk = () => {
    if (!visitorQuestion.trim()) return;
    
    // In a real app, this would send to API. Here we just show success.
    setShowSuccess(true);
    setVisitorQuestion('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAnswer = (id: number) => {
    if (!tempAnswer.trim()) return;
    
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, answer: tempAnswer } : q
    ));
    setAnsweringId(null);
    setTempAnswer('');
  };

  const handleDelete = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-[32px] p-8 text-center relative overflow-hidden group">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-purple-600/20">
          <MessageSquare size={32} />
        </div>
        <h2 className="text-2xl font-black text-armoyu-text uppercase underline decoration-purple-500/50 decoration-4 underline-offset-4 italic tracking-tighter">ANONİM SORU-CEVAP</h2>
      </div>

      {/* Visitor Ask Box */}
      {!isOwnProfile && (
        <div className="bg-armoyu-card-bg border-2 border-dashed border-purple-500/30 rounded-[40px] p-8 space-y-4 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Send size={20} />
             </div>
             <div>
                <h3 className="text-sm font-black text-armoyu-text uppercase italic">SORU SOR</h3>
                <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-50 text-left">Tamamen anonim olarak soru sorabilirsin</p>
             </div>
          </div>
          
          <textarea
            value={visitorQuestion}
            onChange={(e) => setVisitorQuestion(e.target.value)}
            placeholder="Merak ettiğin bir şeyi anonim olarak sor..."
            className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-purple-500/50 rounded-3xl p-6 text-sm font-bold text-armoyu-text outline-none transition-all min-h-[120px]"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase italic tracking-widest">ASKER: ANONİM</p>
            <button 
              onClick={handleAsk}
              disabled={!visitorQuestion.trim()}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              SORUYU GÖNDER
            </button>
          </div>

          {showSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-center animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-xs font-black text-green-500 uppercase tracking-widest italic">Soru başarıyla ve anonim olarak iletildi! 🎉</p>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-6">
        {displayQuestions.map((q) => (
          <div 
            key={q.id}
            className={`group relative bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-8 transition-all hover:border-purple-500/30 shadow-sm ${q.answer ? 'bg-purple-500/5' : ''}`}
          >
            {/* Question Part */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-500/10 flex items-center justify-center text-zinc-500">
                    <UserIcon size={14} />
                  </div>
                  <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Anonim Birisi Sordu</span>
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
            <div className="mt-8 pt-8 border-t border-armoyu-card-border">
              {q.answer ? (
                <div className="flex items-start gap-4 animate-in fade-in slide-in-from-left duration-500">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                    <span className="font-black italic text-xs">SEN</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">CEVABIN</p>
                    <p className="text-sm font-bold text-armoyu-text leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              ) : isOwnProfile && answeringId === q.id ? (
                <div className="flex flex-col gap-4 animate-in zoom-in-95 duration-300">
                  <textarea
                    autoFocus
                    value={tempAnswer}
                    onChange={(e) => setTempAnswer(e.target.value)}
                    placeholder="Eğlenceli bir cevap yaz..."
                    className="w-full bg-black/5 dark:bg-white/5 border border-purple-500/30 rounded-3xl p-6 text-sm font-bold text-armoyu-text outline-none focus:ring-2 ring-purple-500/20 transition-all min-h-[100px]"
                  />
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => { setAnsweringId(null); setTempAnswer(''); }}
                      className="px-6 py-3 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest hover:text-armoyu-text transition-colors"
                    >
                      VAZGEÇ
                    </button>
                    <button 
                      onClick={() => handleAnswer(q.id)}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Send size={14} /> GÖNDER
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setAnsweringId(q.id)}
                  className="w-full py-4 bg-black/5 hover:bg-black/10 border border-dashed border-armoyu-card-border hover:border-purple-500/40 rounded-3xl text-[10px] font-black text-armoyu-text-muted hover:text-purple-500 uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 italic"
                >
                  <MessageSquare size={16} />BU SORUYU CEVAPLA
                </button>
              )}
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-armoyu-card-border rounded-[40px]">
             <MessageSquare className="w-16 h-16 text-armoyu-text-muted mx-auto mb-4 opacity-20" />
             <p className="text-xs font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Henüz hiç soru yok. Şimdilik sessiz...</p>
          </div>
        )}
      </div>
    </div>
  );
}
