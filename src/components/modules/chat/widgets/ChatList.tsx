import React, { useState, useEffect } from 'react';
import { useChat } from '../../../../context/ChatContext';
import { useSocket } from '../../../../context/SocketContext';
import { Chat } from '../../../../models/social/chat/Chat';
import { ChatNotes } from './ChatNotes';
import { userList } from '../../../../lib/constants/seedData';
import { useAuth } from '../../../../context/AuthContext';

export function ChatList({ contacts: mockContacts, activeId, onSelect }: { contacts: Chat[], activeId: string, onSelect: (id: string) => void }) {
  const { user } = useAuth();
  const { closeChat, isLiveMode, chatList: liveContacts, hasMoreChat, chatPage, fetchChatList, isLoading, searchFriends, searchResults } = useChat();
  const { isConnected } = useSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favorites' | 'groups'>('all');

  const currentContacts = isLiveMode ? liveContacts : mockContacts;

  const filteredActiveContacts = currentContacts
    .filter(c => {
      // 1. Search Query Filter
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Category Filter
      if (activeFilter === 'unread') return c.unreadCount > 0;
      if (activeFilter === 'favorites') return c.isFavorite;
      if (activeFilter === 'groups') return c.isGroup;
      
      return true; // 'all'
    })
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  // 3. New Contact Search (API or Mock)
  useEffect(() => {
    if (isLiveMode && searchQuery.length >= 2) {
      searchFriends(searchQuery);
    }
  }, [searchQuery, isLiveMode, searchFriends]);

  const displayAdditionalContacts = isLiveMode 
    ? searchResults.filter(r => !currentContacts.some(c => c.id === r.id))
    : (searchQuery.length >= 2 
        ? userList.filter((u: any) => {
            const matchesSearch = u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               u.username.toLowerCase().includes(searchQuery.toLowerCase());
            const isNotSelf = u.username !== user?.username;
            const notInContacts = !currentContacts.some(c => c.id === u.username);
            return matchesSearch && isNotSelf && notInContacts;
          }).slice(0, 10)
        : []
      );

  // 4. Infinite Scroll Logic
  useEffect(() => {
    if (!isLiveMode || !hasMoreChat || isLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchChatList(chatPage + 1);
      }
    }, { threshold: 0.1 });

    const sentinel = document.getElementById('chat-list-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLiveMode, hasMoreChat, isLoading, chatPage, fetchChatList]);

  return (
    <div className="w-full h-full flex flex-col bg-armoyu-bg border-r border-gray-200 dark:border-white/5">
      {/* Arama ve Başlık */}
      <div className="p-4 md:p-5 border-b border-gray-200 dark:border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-armoyu-text tracking-tight flex items-center gap-2">
              Sohbetler
            </h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'bg-red-500'} animate-pulse`} />
              <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-tighter">{isConnected ? 'Sockete Bağlı' : 'Bağlanıyor...'}</span>
            </div>
          </div>
          <button onClick={closeChat} className="p-2 -mr-2 text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-full" title="Sohbeti Kapat">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="relative mt-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           <input 
             type="text" 
             placeholder="Kişi ara..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-gray-500 hover:border-black/20 dark:hover:border-white/20 focus:outline-none focus:border-blue-500 transition-all"
           />
        </div>
      </div>

      {/* Instagram Stil Notlar Kısmı */}
      <ChatNotes />

      {/* Kategori Filtreleri */}
      <div className="px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'all', label: 'Tümü' },
          { id: 'unread', label: 'Okunmamış' },
          { id: 'favorites', label: 'Favoriler' },
          { id: 'groups', label: 'Gruplar' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
              activeFilter === filter.id
                ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105'
                : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted border-transparent hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Kullanıcı Listesi */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">
        {/* Active Conversations Container */}
        <div className="space-y-1.5">
           {searchQuery.length > 0 && filteredActiveContacts.length > 0 && (
             <div className="px-3 py-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">Sohbet Geçmişi</div>
           )}
           {filteredActiveContacts.map((c, idx) => (
             <button 
               key={`${c.id}-${idx}`}
               onClick={() => onSelect(c.id)}
               className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer text-left ${
                 activeId === c.id 
                   ? 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 shadow-inner' 
                   : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
               }`}
             >
               {/* Avatar Durumu */}
               <div className="relative shrink-0">
                 <img src={c.avatar || undefined} alt={c.name} className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm" />
                 {c.isOnline && (
                   <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm" />
                 )}
               </div>

               {/* Kişi Bilgisi */}
               <div className="flex-1 overflow-hidden">
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-black text-slate-900 dark:text-gray-200 text-sm truncate max-w-[130px]">{c.name}</span>
                   <span className="text-xs text-gray-500 font-black">{c.time}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className={`text-xs truncate max-w-[120px] font-bold ${c.unreadCount > 0 ? 'text-slate-950 dark:text-white' : 'text-slate-500'}`}>
                     {c.lastMessage?.content || (c.lastMessage as any)?.mesajicerik || (c.lastMessage as any)?.icerik || (c as any).mesajicerik || 'Mesaj yok'}
                   </span>
                   {c.unreadCount > 0 && (
                     <span className="bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-md animate-in zoom-in duration-300">
                       {c.unreadCount > 9 ? '9+' : c.unreadCount}
                     </span>
                   )}
                 </div>
               </div>
             </button>
           ))}

           {/* Infinite Scroll Sentinel */}
           {isLiveMode && hasMoreChat && (
             <div id="chat-list-sentinel" className="h-10 flex items-center justify-center py-8">
                {isLoading && (
                  <div className="flex items-center gap-2 text-armoyu-text-muted">
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                )}
             </div>
           )}

           {isLiveMode && !hasMoreChat && filteredActiveContacts.length > 0 && (
             <div className="py-8 text-center">
               <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] opacity-30">Liste Sonu</p>
             </div>
           )}
        </div>

        {/* New Contact Search Results */}
        {displayAdditionalContacts.length > 0 && (
          <div className="space-y-1.5 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
             <div className="px-3 py-1 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Yeni Sohbet Başlat</div>
             {displayAdditionalContacts.map((u: any) => (
               <button 
                 key={u.id || u.username}
                 onClick={() => onSelect(u.id || u.username)}
                 className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent transition-all group"
               >
                 <div className="relative shrink-0">
                   <img src={u.avatar || undefined} alt={u.name || u.displayName} className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="font-black text-slate-900 dark:text-gray-200 text-sm truncate">{u.name || u.displayName}</div>
                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-tighter">@{u.id || u.username}</div>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 scale-0 group-hover:scale-100 transition-all duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                 </div>
               </button>
             ))}
          </div>
        )}

        {searchQuery.length > 0 && filteredActiveContacts.length === 0 && displayAdditionalContacts.length === 0 && (
          <div className="py-12 text-center">
             <div className="text-armoyu-text-muted text-sm font-bold opacity-30">Sonuç bulunamadı</div>
          </div>
        )}
      </div>
    </div>
  );
}
