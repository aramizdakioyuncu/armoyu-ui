'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ChatList } from './ChatList';
import { Chat, User, ChatMessage as ChatMessageModel } from '@armoyu/core';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../../context/ChatContext';
import { useSocket } from '../../../context/SocketContext';
// Mock Data
import { userList } from '../../../lib/constants/seedData';
export function ChatContainer() {
    const { user, session, updateSession } = useAuth();
    const { closeChat, isLiveMode, chatList, activeMessages, fetchMessages, sendMessage: sendApiMessage, isLoading } = useChat();
    const { emit, on, isConnected } = useSocket();
    // Eğer null ise liste görünümü açık, ID var ise mesajlaşma açık.
    const [activeContactId, setActiveContactId] = useState(null);
    // Local state for Mock mode (Fallback)
    const [localMessages, setLocalMessages] = useState([]);
    const [localContacts, setLocalContacts] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    // Scroll to bottom when messages or typing status changes
    useEffect(() => {
        scrollToBottom();
    }, [localMessages, activeMessages, isTyping]);
    // Sync with session's chatList for MOCK mode
    useEffect(() => {
        if (!isLiveMode && session?.chatList) {
            setLocalContacts(session.chatList);
        }
    }, [session?.chatList, isLiveMode]);
    // Handle Contact Selection in LIVE mode
    useEffect(() => {
        if (isLiveMode && activeContactId) {
            // API expects numeric ID usually, but our models use string. 
            // Try to convert if it's a numeric string.
            const idNum = parseInt(activeContactId);
            if (!isNaN(idNum)) {
                fetchMessages(idNum);
            }
        }
    }, [activeContactId, isLiveMode, fetchMessages]);
    useEffect(() => {
        const offMsg = on('message', (incomingMsg) => {
            console.log('[ChatContainer] Incoming socket message:', incomingMsg);
            const msgModel = new ChatMessageModel({
                id: incomingMsg.id,
                sender: incomingMsg.sender ? new User(incomingMsg.sender) : undefined,
                content: incomingMsg.content,
                timestamp: incomingMsg.timestamp,
                isSystem: incomingMsg.isSystem || false
            });
            // UPDATE LOCAL STATE FOR MOCK MODE
            if (!isLiveMode) {
                setLocalContacts(prev => {
                    const contactId = incomingMsg.chatId || incomingMsg.sender?.username;
                    const contactExists = prev.some(c => c.id === contactId);
                    if (!contactExists && incomingMsg.sender?.username !== user?.username) {
                        const newChat = new Chat({
                            id: contactId,
                            name: incomingMsg.sender?.displayName || incomingMsg.sender?.username || 'Bilinmeyen',
                            avatar: incomingMsg.sender?.avatar || '',
                            lastMessage: msgModel,
                            time: msgModel.timestamp,
                            updatedAt: Date.now(),
                            messages: [msgModel],
                            unreadCount: (activeContactId !== contactId) ? 1 : 0,
                            isOnline: true
                        });
                        return [newChat, ...prev];
                    }
                    return prev.map(c => {
                        if (c.id === contactId) {
                            const messageExists = c.messages.some(m => m.id === msgModel.id);
                            return new Chat({
                                ...c,
                                lastMessage: msgModel,
                                time: msgModel.timestamp,
                                updatedAt: Date.now(),
                                messages: messageExists ? c.messages : [...(c.messages || []), msgModel],
                                unreadCount: (activeContactId !== c.id && incomingMsg.sender?.username !== user?.username) ? c.unreadCount + 1 : c.unreadCount
                            });
                        }
                        return c;
                    });
                });
                if (activeContactId === incomingMsg.chatId || activeContactId === incomingMsg.sender?.username) {
                    setLocalMessages(prev => {
                        if (prev.some(m => m.id === incomingMsg.id))
                            return prev;
                        return [...prev, msgModel];
                    });
                }
            }
            else {
                // IN LIVE MODE: Just refresh if active or handle notification
                // Note: Real implementation would push to context's activeMessages if activeContactId matches
            }
            setIsTyping(false);
        });
        const offTyping = on('typing', (data) => {
            const isChattingWithSender = data.username === activeContactId && data.chatId === user?.username;
            const isBotTyping = data.username === 'system' && data.chatId === user?.username;
            if (isChattingWithSender || isBotTyping) {
                setIsTyping(data.isTyping);
            }
        });
        return () => {
            offMsg();
            offTyping();
        };
    }, [on, activeContactId, user?.username, isLiveMode]);
    const handleSelectContact = (id) => {
        if (!isLiveMode) {
            let contact = localContacts.find((c) => c.id === id);
            if (!contact) {
                const newUser = userList.find((u) => u.username === id);
                if (newUser) {
                    contact = new Chat({
                        id: newUser.username,
                        name: newUser.displayName,
                        avatar: newUser.avatar,
                        updatedAt: Date.now(),
                        messages: [],
                        isOnline: true,
                        unreadCount: 0
                    });
                    setLocalContacts([contact, ...localContacts]);
                }
            }
            setLocalMessages(contact?.messages || []);
        }
        setActiveContactId(id);
        setIsTyping(false);
    };
    const handleSendMessage = async (text) => {
        if (!text.trim() || !activeContactId)
            return;
        if (isLiveMode) {
            const idNum = parseInt(activeContactId);
            if (!isNaN(idNum)) {
                const success = await sendApiMessage(idNum, text);
                if (success) {
                    // Socket will usually bounce this back, or we can manually push to activeMessages
                }
            }
        }
        else {
            // MOCK MODE LOGIC
            const newMessage = new ChatMessageModel({
                id: Date.now().toString(),
                sender: user || undefined,
                content: text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSystem: false
            });
            setLocalMessages(prev => [...prev, newMessage]);
            setLocalContacts(prev => prev.map(c => {
                if (c.id === activeContactId) {
                    return new Chat({
                        ...c,
                        lastMessage: newMessage,
                        time: newMessage.timestamp,
                        updatedAt: Date.now(),
                        messages: [...(c.messages || []), newMessage]
                    });
                }
                return c;
            }));
        }
        // Emit via socket for instant cross-tab / real-time feel
        emit('message', {
            id: Date.now().toString(),
            chatId: activeContactId,
            sender: {
                username: user?.username,
                displayName: user?.displayName,
                avatar: user?.avatar
            },
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
    };
    if (!user) {
        return (_jsx("div", { className: "flex items-center justify-center h-full text-armoyu-text-muted bg-armoyu-card-bg rounded-3xl border border-gray-200 dark:border-white/10", children: "Sohbetleri g\u00F6rmek i\u00E7in giri\u015F yapmal\u0131s\u0131n\u0131z." }));
    }
    const activeContact = activeContactId ? localContacts.find((c) => c.id === activeContactId) : null;
    return (_jsxs("div", { className: "flex h-full w-full bg-armoyu-header-bg overflow-hidden relative z-10", children: [!activeContactId && (_jsx("div", { className: "w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300", children: _jsx(ChatList, { contacts: localContacts, activeId: '', onSelect: handleSelectContact }) })), activeContactId && activeContact && (_jsxs("div", { className: "w-full h-full flex flex-col bg-armoyu-bg relative animate-in fade-in slide-in-from-right-4 duration-300", children: [_jsxs("div", { className: "h-[76px] border-b border-gray-200 dark:border-white/5 bg-armoyu-card-bg flex items-center px-4 gap-3 z-10 shrink-0", children: [_jsx("button", { onClick: () => setActiveContactId(null), className: "p-2 -ml-2 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-full focus:outline-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "15 18 9 12 15 6" }) }) }), _jsx("img", { src: activeContact.avatar, className: "w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm", alt: "" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-bold text-armoyu-text truncate text-base", children: activeContact.name }), _jsx("div", { className: "flex items-center gap-1.5 mt-0.5", children: activeContact.isOnline ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)] animate-pulse" }), _jsx("span", { className: "text-xs font-bold text-emerald-500 shadow-sm", children: "\u00C7evrimi\u00E7i" })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600" }), _jsxs("span", { className: "text-xs font-bold text-armoyu-text-muted", children: ["Son g\u00F6r\u00FClme ", activeContact.lastSeen] })] })) })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("button", { className: "p-2 text-armoyu-text-muted hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition-colors", title: "Ara", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) }), _jsx("button", { onClick: closeChat, className: "p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors", title: "Sohbeti Kapat", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative hide-scrollbar", children: [_jsx("div", { className: "text-center mb-8", children: _jsx("span", { className: "inline-block bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-xs font-bold px-3 py-1 rounded-full border border-black/5 dark:border-white/5", children: "Bug\u00FCn" }) }), localMessages.map(msg => (_jsx(ChatMessage, { id: msg.id, sender: {
                                    name: msg.sender?.displayName || 'Bilinmiyor',
                                    avatar: msg.sender?.avatar || '',
                                    isSelf: msg.sender?.username === user?.username
                                }, content: msg.content, timestamp: msg.timestamp }, msg.id))), isTyping && (_jsx("div", { className: "flex gap-2 items-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-300", children: _jsxs("div", { className: "flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5", children: [_jsxs("div", { className: "flex gap-0.5 mt-0.5", children: [_jsx("span", { className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" }), _jsx("span", { className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" }), _jsx("span", { className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce" })] }), _jsx("span", { className: "text-[10px] font-bold text-armoyu-text-muted italic ml-1", children: "Yaz\u0131yor..." })] }) })), _jsx("div", { ref: messagesEndRef, className: "h-2" })] }), _jsx(ChatInput, { onSend: handleSendMessage, chatId: activeContactId })] }))] }));
}
//# sourceMappingURL=ChatContainer.js.map