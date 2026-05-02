import React, { useEffect } from 'react';
import { 
  ChatNotes, 
  ChatList, 
  ChatLayout, 
  MOCK_SESSION,
  useChat,
  useArmoyu
} from '../../index';
import { Database, Wifi, Loader2, Play } from 'lucide-react';

export function MessagesTab() {
  const { isLiveMode, setLiveMode, fetchChatList, isLoading, chatList } = useChat();

  const handleToggleLive = () => {
    const nextMode = !isLiveMode;
    setLiveMode(nextMode);
  };

  const { apiKey } = useArmoyu();

  useEffect(() => {
    // Geçerli bir API anahtarı varsa otomatik çek
    if (apiKey && apiKey !== 'armoyu_showcase_key') {
      if (!isLiveMode) {
        setLiveMode(true);
      }
      fetchChatList(1, true); // forced: true ile kesin olarak API'den çektiriyoruz
    }
  }, [fetchChatList, apiKey]);

  return (
    <div className="space-y-12">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                Mesajlaşma Sistemi
                {isLiveMode && (
                   <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full animate-pulse">
                      <Wifi className="w-3 h-3" />
                      CANLI
                   </span>
                )}
             </h3>
             <p className="text-zinc-500 text-xs font-bold pl-5 uppercase tracking-widest opacity-60">Socket & API Entegrasyon Test Paneli</p>
          </div>

          <button
            onClick={handleToggleLive}
            disabled={isLoading}
            className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
              isLiveMode 
                ? 'bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)]' 
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin" />
            ) : isLiveMode ? (
               <Database className="w-4 h-4" />
            ) : (
               <Play className="w-4 h-4 fill-current" />
            )}
            
            <span>{isLiveMode ? 'API MODU AKTİF' : 'API\'DEN VERİLERİ ÇEK'}</span>

            {!isLiveMode && (
               <div className="absolute -top-2 -right-2 bg-armoyu-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded-lg shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                  YENİ
               </div>
            )}
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
          <div className="lg:col-span-4 glass-panel rounded-[40px] overflow-hidden flex flex-col bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
             <ChatNotes />
             <div className="flex-1 overflow-hidden p-2">
                <ChatList 
                   contacts={chatList} 
                   activeId={""} 
                   onSelect={() => {}} 
                />
             </div>
          </div>
          <div className="lg:col-span-8 glass-panel rounded-[40px] overflow-hidden bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
             <ChatLayout />
          </div>
       </div>
    </div>
  );
}
