import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChat } from '../../../context/ChatContext';
import { useSocket } from '../../../context/SocketContext';
import { ChatNotes } from './ChatNotes';
import { useState } from 'react';
import { userList } from '../../../lib/constants/seedData';
import { useAuth } from '../../../context/AuthContext';
export function ChatList({ contacts, activeId, onSelect }) {
    const { user } = useAuth();
    const { closeChat } = useChat();
    const { isConnected } = useSocket();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const filteredActiveContacts = contacts
        .filter(c => {
        // 1. Search Query Filter
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch)
            return false;
        // 2. Category Filter
        if (activeFilter === 'unread')
            return c.unreadCount > 0;
        if (activeFilter === 'favorites')
            return c.isFavorite;
        if (activeFilter === 'groups')
            return c.isGroup;
        return true; // 'all'
    })
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    // 3. New Contact Search (Only when searching)
    const additionalContacts = searchQuery.length >= 2
        ? userList.filter((u) => {
            const matchesSearch = u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.username.toLowerCase().includes(searchQuery.toLowerCase());
            const isNotSelf = u.username !== user?.username;
            const notInContacts = !contacts.some(c => c.id === u.username);
            return matchesSearch && isNotSelf && notInContacts;
        }).slice(0, 10)
        : [];
    return (_jsxs("div", { className: "w-full h-full flex flex-col bg-armoyu-bg border-r border-gray-200 dark:border-white/5", children: [_jsxs("div", { className: "p-4 md:p-5 border-b border-gray-200 dark:border-white/5", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "text-xl font-bold text-armoyu-text tracking-tight flex items-center gap-2", children: "Sohbetler" }), _jsxs("div", { className: "flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5", children: [_jsx("div", { className: `w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'bg-red-500'} animate-pulse` }), _jsx("span", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-tighter", children: isConnected ? 'Sockete Bağlı' : 'Bağlanıyor...' })] })] }), _jsx("button", { onClick: closeChat, className: "p-2 -mr-2 text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-full", title: "Sohbeti Kapat", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }), _jsxs("div", { className: "relative mt-4", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }), _jsx("input", { type: "text", placeholder: "Ki\u015Fi ara...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-gray-500 hover:border-black/20 dark:hover:border-white/20 focus:outline-none focus:border-blue-500 transition-all" })] })] }), _jsx(ChatNotes, {}), _jsx("div", { className: "px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar shrink-0", children: [
                    { id: 'all', label: 'Tümü' },
                    { id: 'unread', label: 'Okunmamış' },
                    { id: 'favorites', label: 'Favoriler' },
                    { id: 'groups', label: 'Gruplar' }
                ].map((filter) => (_jsx("button", { onClick: () => setActiveFilter(filter.id), className: `px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${activeFilter === filter.id
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105'
                        : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted border-transparent hover:bg-black/10 dark:hover:bg-white/10'}`, children: filter.label }, filter.id))) }), _jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5", children: [_jsxs("div", { className: "space-y-1.5", children: [searchQuery.length > 0 && filteredActiveContacts.length > 0 && (_jsx("div", { className: "px-3 py-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50", children: "Sohbet Ge\u00E7mi\u015Fi" })), filteredActiveContacts.map(c => (_jsxs("button", { onClick: () => onSelect(c.id), className: `w-full flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer text-left ${activeId === c.id
                                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 shadow-inner'
                                    : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'}`, children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("img", { src: c.avatar, alt: c.name, className: "w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm" }), c.isOnline && (_jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm" }))] }), _jsxs("div", { className: "flex-1 overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsx("span", { className: "font-black text-slate-900 dark:text-gray-200 text-sm truncate max-w-[130px]", children: c.name }), _jsx("span", { className: "text-xs text-gray-500 font-black", children: c.time })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: `text-xs truncate max-w-[120px] font-bold ${c.unreadCount > 0 ? 'text-slate-950 dark:text-white' : 'text-slate-500'}`, children: c.lastMessage?.content || 'Mesaj yok' }), c.unreadCount > 0 && (_jsx("span", { className: "bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-md animate-in zoom-in duration-300", children: c.unreadCount > 9 ? '9+' : c.unreadCount }))] })] })] }, c.id)))] }), additionalContacts.length > 0 && (_jsxs("div", { className: "space-y-1.5 mt-6 animate-in fade-in slide-in-from-top-2 duration-500", children: [_jsx("div", { className: "px-3 py-1 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]", children: "Yeni Sohbet Ba\u015Flat" }), additionalContacts.map((u) => (_jsxs("button", { onClick: () => onSelect(u.username), className: "w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent transition-all group", children: [_jsx("div", { className: "relative shrink-0", children: _jsx("img", { src: u.avatar, alt: u.displayName, className: "w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-black text-slate-900 dark:text-gray-200 text-sm truncate", children: u.displayName }), _jsxs("div", { className: "text-[10px] font-bold text-armoyu-text-muted uppercase tracking-tighter", children: ["@", u.username] })] }), _jsx("div", { className: "w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 scale-0 group-hover:scale-100 transition-all duration-300", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }) })] }, u.username)))] })), searchQuery.length > 0 && filteredActiveContacts.length === 0 && additionalContacts.length === 0 && (_jsx("div", { className: "py-12 text-center", children: _jsx("div", { className: "text-armoyu-text-muted text-sm font-bold opacity-30", children: "Sonu\u00E7 bulunamad\u0131" }) }))] })] }));
}
//# sourceMappingURL=ChatList.js.map