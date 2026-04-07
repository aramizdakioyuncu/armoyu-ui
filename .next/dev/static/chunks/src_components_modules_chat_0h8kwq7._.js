(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/modules/chat/ChatNotes.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatNotes",
    ()=>ChatNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/constants/seedData.ts [app-client] (ecmascript) <locals>");
'use client';
;
;
function ChatNotes() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full px-4 py-6 border-b border-black/5 dark:border-white/5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1",
            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MOCK_NOTES"].map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NoteItem, {
                    note: note
                }, note.id, false, {
                    fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                    lineNumber: 12,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ChatNotes;
function NoteItem({ note }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center shrink-0 cursor-pointer group relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-3 flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative px-3 py-1.5 rounded-2xl text-[10px] font-bold max-w-[85px] transition-all group-hover:-translate-y-1 shadow-sm border border-black/5 dark:border-white/10 ${note.isMe ? 'bg-white dark:bg-white/10 text-armoyu-text-muted italic' : 'bg-white dark:bg-white/20 text-armoyu-text animate-in zoom-in duration-500'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "truncate line-clamp-2 text-center leading-tight",
                                children: note.note
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-black/5 dark:border-white/10 bg-inherit"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: note.user?.avatar,
                                alt: note.user?.username,
                                className: "w-11 h-11 md:w-12 md:h-12 rounded-full border-2 border-white dark:border-white/10 shadow-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            note.isMe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-1 -right-1 w-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-400",
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[10px] text-armoyu-text-muted font-medium truncate w-14 text-center ${note.isMe ? 'italic' : ''}`,
                children: note.isMe ? 'Hikayen' : note.user?.displayName || note.user?.username
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/chat/ChatNotes.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c1 = NoteItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatNotes");
__turbopack_context__.k.register(_c1, "NoteItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/chat/ChatList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatList",
    ()=>ChatList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ChatContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/SocketContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatNotes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat/ChatNotes.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/constants/seedData.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function ChatList({ contacts, activeId, onSelect }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { closeChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const filteredActiveContacts = contacts.filter((c)=>{
        // 1. Search Query Filter
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || (c.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        // 2. Category Filter
        if (activeFilter === 'unread') return c.unreadCount > 0;
        if (activeFilter === 'favorites') return c.isFavorite;
        if (activeFilter === 'groups') return c.isGroup;
        return true; // 'all'
    }).sort((a, b)=>(b.updatedAt || 0) - (a.updatedAt || 0));
    // 3. New Contact Search (Only when searching)
    const additionalContacts = searchQuery.length >= 2 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["userList"].filter((u)=>{
        const matchesSearch = u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase());
        const isNotSelf = u.username !== user?.username;
        const notInContacts = !contacts.some((c)=>c.id === u.username);
        return matchesSearch && isNotSelf && notInContacts;
    }).slice(0, 10) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col bg-armoyu-bg border-r border-gray-200 dark:border-white/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-5 border-b border-gray-200 dark:border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-armoyu-text tracking-tight flex items-center gap-2",
                                        children: "Sohbetler"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'bg-red-500'} animate-pulse`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-tighter",
                                                children: isConnected ? 'Sockete Bağlı' : 'Bağlanıyor...'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeChat,
                                className: "p-2 -mr-2 text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-full",
                                title: "Sohbeti Kapat",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "22",
                                    height: "22",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 59,
                                            columnNumber: 193
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 59,
                                            columnNumber: 236
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                        lineNumber: 63,
                                        columnNumber: 212
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "21",
                                        y1: "21",
                                        x2: "16.65",
                                        y2: "16.65"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                        lineNumber: 63,
                                        columnNumber: 251
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 63,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Kişi ara...",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                className: "w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-gray-500 hover:border-black/20 dark:hover:border-white/20 focus:outline-none focus:border-blue-500 transition-all"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 64,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatNotes$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatNotes"], {}, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar shrink-0",
                children: [
                    {
                        id: 'all',
                        label: 'Tümü'
                    },
                    {
                        id: 'unread',
                        label: 'Okunmamış'
                    },
                    {
                        id: 'favorites',
                        label: 'Favoriler'
                    },
                    {
                        id: 'groups',
                        label: 'Gruplar'
                    }
                ].map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveFilter(filter.id),
                        className: `px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${activeFilter === filter.id ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105' : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted border-transparent hover:bg-black/10 dark:hover:bg-white/10'}`,
                        children: filter.label
                    }, filter.id, false, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            searchQuery.length > 0 && filteredActiveContacts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50",
                                children: "Sohbet Geçmişi"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 104,
                                columnNumber: 14
                            }, this),
                            filteredActiveContacts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onSelect(c.id),
                                    className: `w-full flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer text-left ${activeId === c.id ? 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 shadow-inner' : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: c.avatar,
                                                    alt: c.name,
                                                    className: "w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 18
                                                }, this),
                                                c.isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 20
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 117,
                                            columnNumber: 16
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-black text-slate-900 dark:text-gray-200 text-sm truncate max-w-[130px]",
                                                            children: c.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 20
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500 font-black",
                                                            children: c.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 20
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-xs truncate max-w-[120px] font-bold ${c.unreadCount > 0 ? 'text-slate-950 dark:text-white' : 'text-slate-500'}`,
                                                            children: c.lastMessage?.content || 'Mesaj yok'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 20
                                                        }, this),
                                                        c.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-md animate-in zoom-in duration-300",
                                                            children: c.unreadCount > 9 ? '9+' : c.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 125,
                                            columnNumber: 16
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                    lineNumber: 107,
                                    columnNumber: 14
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    additionalContacts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 mt-6 animate-in fade-in slide-in-from-top-2 duration-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-1 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]",
                                children: "Yeni Sohbet Başlat"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                lineNumber: 148,
                                columnNumber: 14
                            }, this),
                            additionalContacts.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onSelect(u.username),
                                    className: "w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 border border-transparent transition-all group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: u.avatar,
                                                alt: u.displayName,
                                                className: "w-12 h-12 rounded-full object-cover border border-white/10 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                lineNumber: 156,
                                                columnNumber: 20
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 155,
                                            columnNumber: 18
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-black text-slate-900 dark:text-gray-200 text-sm truncate",
                                                    children: u.displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[10px] font-bold text-armoyu-text-muted uppercase tracking-tighter",
                                                    children: [
                                                        "@",
                                                        u.username
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 158,
                                            columnNumber: 18
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 scale-0 group-hover:scale-100 transition-all duration-300",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 200
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                                lineNumber: 163,
                                                columnNumber: 20
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                            lineNumber: 162,
                                            columnNumber: 18
                                        }, this)
                                    ]
                                }, u.username, true, {
                                    fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                                    lineNumber: 150,
                                    columnNumber: 16
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    searchQuery.length > 0 && filteredActiveContacts.length === 0 && additionalContacts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-12 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-armoyu-text-muted text-sm font-bold opacity-30",
                            children: "Sonuç bulunamadı"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                            lineNumber: 172,
                            columnNumber: 14
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/chat/ChatList.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/chat/ChatList.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(ChatList, "GA0iyQ1tWELRaHeaFfUewZaRnA8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = ChatList;
var _c;
__turbopack_context__.k.register(_c, "ChatList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/chat/ChatMessage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessage",
    ()=>ChatMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ChatMessage({ sender, content, timestamp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex w-full ${sender.isSelf ? 'justify-end' : 'justify-start'} mb-4`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex gap-3 items-end max-w-[85%] md:max-w-[70%] ${sender.isSelf ? 'flex-row-reverse' : 'flex-row'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: sender.avatar,
                    alt: sender.name,
                    className: "w-8 h-8 rounded-full border border-white/10 shadow-sm shrink-0"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex flex-col ${sender.isSelf ? 'items-end' : 'items-start'} gap-1.5`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-gray-500 font-bold tracking-wide dark:text-gray-400",
                            children: [
                                sender.name,
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "opacity-50 mx-1",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
                                    lineNumber: 29,
                                    columnNumber: 27
                                }, this),
                                " ",
                                timestamp
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-3.5 rounded-2xl text-sm shadow-lg leading-relaxed font-medium ${sender.isSelf ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-sm shadow-[0_4px_15px_rgba(37,99,235,0.3)]' : 'bg-black/5 dark:bg-[#1a1a24] text-armoyu-text rounded-bl-sm border border-black/5 dark:border-white/5'}`,
                            children: content
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/chat/ChatMessage.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = ChatMessage;
var _c;
__turbopack_context__.k.register(_c, "ChatMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/chat/ChatInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>ChatInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/SocketContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ChatInput({ onSend, chatId }) {
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { emit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    const handleSend = (e)=>{
        e.preventDefault();
        if (text.trim()) {
            onSend(text);
            setText('');
            if (chatId) emit('typing', {
                chatId,
                isTyping: false
            });
        }
    };
    const handleChange = (val)=>{
        setText(val);
        if (chatId) {
            const isTyping = val.length > 0;
            // Include username to help receiver filter out self
            emit('typing', {
                chatId,
                isTyping,
                username: ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('armoyu_username') : "TURBOPACK unreachable"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSend,
        className: "p-3 border-t border-gray-200 dark:border-white/5 flex items-center gap-3 bg-armoyu-card-bg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "text-gray-400 hover:text-blue-500 p-2 transition-colors shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "12",
                            cy: "12",
                            r: "10"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 36,
                            columnNumber: 142
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M8 14s1.5 2 4 2 4-2 4-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 36,
                            columnNumber: 182
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "9",
                            y1: "9",
                            x2: "9.01",
                            y2: "9"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 36,
                            columnNumber: 223
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "15",
                            y1: "9",
                            x2: "15.01",
                            y2: "9"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 36,
                            columnNumber: 267
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "text-gray-400 hover:text-blue-500 p-2 transition-colors hidden sm:block shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                        lineNumber: 39,
                        columnNumber: 142
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: text,
                onChange: (e)=>handleChange(e.target.value),
                placeholder: "Bir mesaj yazın...",
                className: "flex-1 min-w-0 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-2.5 text-sm text-armoyu-text placeholder-armoyu-text-muted focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "primary",
                className: "rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)] shrink-0 group",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "22",
                            y1: "2",
                            x2: "11",
                            y2: "13"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 53,
                            columnNumber: 293
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                            points: "22 2 15 22 11 13 2 9 22 2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                            lineNumber: 53,
                            columnNumber: 337
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/chat/ChatInput.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(ChatInput, "1hs71pbbo9apqSf6nx9rpfYrJw0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = ChatInput;
var _c;
__turbopack_context__.k.register(_c, "ChatInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/chat/ChatContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatContainer",
    ()=>ChatContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat/ChatList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@armoyu/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat/ChatMessage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/chat/ChatInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ChatContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/SocketContext.tsx [app-client] (ecmascript)");
// Mock Data
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/constants/seedData.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function ChatContainer() {
    _s();
    const { user, session, updateSession } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { closeChat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { emit, on, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])();
    // Eğer null ise liste görünümü açık, ID var ise mesajlaşma açık.
    const [activeContactId, setActiveContactId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [localMessages, setLocalMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [localContacts, setLocalContacts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    // Scroll to bottom when messages or typing status changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContainer.useEffect": ()=>{
            scrollToBottom();
        }
    }["ChatContainer.useEffect"], [
        localMessages,
        isTyping
    ]);
    // Sync with session's chatList (chatList lives on Session, not User)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContainer.useEffect": ()=>{
            if (session?.chatList) {
                setLocalContacts(session.chatList);
            }
        }
    }["ChatContainer.useEffect"], [
        session?.chatList
    ]);
    // Socket Connection for Real-time Messages & Typing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContainer.useEffect": ()=>{
            const offMsg = on('message', {
                "ChatContainer.useEffect.offMsg": (incomingMsg)=>{
                    console.log('[ChatContainer] Incoming socket message:', incomingMsg);
                    const msgModel = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessage"]({
                        id: incomingMsg.id,
                        sender: incomingMsg.sender ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["User"](incomingMsg.sender) : undefined,
                        content: incomingMsg.content,
                        timestamp: incomingMsg.timestamp,
                        isSystem: incomingMsg.isSystem || false
                    });
                    // Update contacts list
                    setLocalContacts({
                        "ChatContainer.useEffect.offMsg": (prev)=>{
                            const contactId = incomingMsg.chatId || incomingMsg.sender?.username;
                            const contactExists = prev.some({
                                "ChatContainer.useEffect.offMsg.contactExists": (c)=>c.id === contactId
                            }["ChatContainer.useEffect.offMsg.contactExists"]);
                            if (!contactExists && incomingMsg.sender?.username !== user?.username) {
                                // CREATE NEW CHAT: If sender isn't in our list, create the chat box for them!
                                const newChat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chat"]({
                                    id: contactId,
                                    name: incomingMsg.sender?.displayName || incomingMsg.sender?.username || 'Bilinmeyen',
                                    avatar: incomingMsg.sender?.avatar || '',
                                    lastMessage: msgModel,
                                    time: msgModel.timestamp,
                                    updatedAt: Date.now(),
                                    messages: [
                                        msgModel
                                    ],
                                    unreadCount: activeContactId !== contactId ? 1 : 0,
                                    isOnline: true // Assume online since they just sent a message
                                });
                                // PERSIST to Session!
                                if (session) {
                                    const updatedChatList = [
                                        newChat,
                                        ...session.chatList || []
                                    ];
                                    updateSession(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Session"]({
                                        ...session,
                                        chatList: updatedChatList
                                    }));
                                }
                                return [
                                    newChat,
                                    ...prev
                                ];
                            }
                            // UPDATE EXISTING CHAT
                            return prev.map({
                                "ChatContainer.useEffect.offMsg": (c)=>{
                                    if (c.id === contactId) {
                                        // Only add if not already in messages to avoid duplicates from echo
                                        const messageExists = c.messages.some({
                                            "ChatContainer.useEffect.offMsg.messageExists": (m)=>m.id === msgModel.id
                                        }["ChatContainer.useEffect.offMsg.messageExists"]);
                                        const updatedChat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chat"]({
                                            ...c,
                                            lastMessage: msgModel,
                                            time: msgModel.timestamp,
                                            updatedAt: Date.now(),
                                            messages: messageExists ? c.messages : [
                                                ...c.messages || [],
                                                msgModel
                                            ],
                                            unreadCount: activeContactId !== c.id && incomingMsg.sender?.username !== user?.username ? c.unreadCount + 1 : c.unreadCount
                                        });
                                        // Note: We don't necessarily need to update the whole session on every message to avoid excessive renders,
                                        // as local state handles the UI. But for NEW chats, we must.
                                        return updatedChat;
                                    }
                                    return c;
                                }
                            }["ChatContainer.useEffect.offMsg"]);
                        }
                    }["ChatContainer.useEffect.offMsg"]);
                    // If this is the active chat, update visible messages
                    if (activeContactId === incomingMsg.chatId || activeContactId === incomingMsg.sender?.username) {
                        setLocalMessages({
                            "ChatContainer.useEffect.offMsg": (prev)=>{
                                if (prev.some({
                                    "ChatContainer.useEffect.offMsg": (m)=>m.id === incomingMsg.id
                                }["ChatContainer.useEffect.offMsg"])) return prev;
                                return [
                                    ...prev,
                                    msgModel
                                ];
                            }
                        }["ChatContainer.useEffect.offMsg"]);
                        setIsTyping(false); // Stop typing on message receive
                    }
                }
            }["ChatContainer.useEffect.offMsg"]);
            const offTyping = on('typing', {
                "ChatContainer.useEffect.offTyping": (data)=>{
                    // console.log('[ChatContainer] Incoming typing event:', data);
                    // If we are recipient (data.chatId is US) and the sender IS the one we are currently viewing
                    const isChattingWithSender = data.username === activeContactId && data.chatId === user?.username;
                    // Special case for system bot
                    const isBotTyping = data.username === 'system' && data.chatId === user?.username;
                    if (isChattingWithSender || isBotTyping) {
                        setIsTyping(data.isTyping);
                    }
                }
            }["ChatContainer.useEffect.offTyping"]);
            return ({
                "ChatContainer.useEffect": ()=>{
                    offMsg();
                    offTyping();
                }
            })["ChatContainer.useEffect"];
        }
    }["ChatContainer.useEffect"], [
        on,
        activeContactId,
        user?.username
    ]);
    const handleSelectContact = (id)=>{
        // Check if the contact is already in our list
        let contact = localContacts.find((c)=>c.id === id);
        // If NOT in our list (clicked from "New Contacts" search), we must create it!
        if (!contact) {
            const newUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["userList"].find((u)=>u.username === id);
            if (newUser) {
                contact = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chat"]({
                    id: newUser.username,
                    name: newUser.displayName,
                    avatar: newUser.avatar,
                    updatedAt: Date.now(),
                    messages: [],
                    isOnline: true,
                    unreadCount: 0
                });
                const updatedContacts = [
                    contact,
                    ...localContacts
                ];
                setLocalContacts(updatedContacts);
                // Persist to session so it stays in the list!
                if (session) {
                    const updatedChatList = [
                        contact,
                        ...session.chatList || []
                    ];
                    updateSession(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Session"]({
                        ...session,
                        chatList: updatedChatList
                    }));
                }
            }
        }
        setActiveContactId(id);
        setLocalMessages(contact?.messages || []);
        setIsTyping(false);
        // Clear unread on select (if it was an existing contact)
        if (contact && contact.unreadCount > 0) {
            setLocalContacts((prev)=>prev.map((c)=>c.id === id ? {
                        ...c,
                        unreadCount: 0
                    } : c));
        }
    };
    const handleSendMessage = (text)=>{
        if (!text.trim() || !activeContactId) return;
        const messageData = {
            id: Date.now().toString(),
            chatId: activeContactId,
            sender: {
                username: user?.username,
                displayName: user?.displayName,
                avatar: user?.avatar
            },
            content: text,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        // Update local state immediately for instant feedback
        const newMessage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessage"]({
            id: messageData.id,
            sender: user || undefined,
            content: text,
            timestamp: messageData.timestamp,
            isSystem: false
        });
        setLocalMessages((prev)=>[
                ...prev,
                newMessage
            ]);
        setLocalContacts((prev)=>prev.map((c)=>{
                if (c.id === activeContactId) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$armoyu$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chat"]({
                        ...c,
                        lastMessage: newMessage,
                        time: newMessage.timestamp,
                        updatedAt: Date.now(),
                        messages: [
                            ...c.messages || [],
                            newMessage
                        ]
                    });
                }
                return c;
            }));
        // Emit via socket for others
        emit('message', messageData);
    };
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full text-armoyu-text-muted bg-armoyu-card-bg rounded-3xl border border-gray-200 dark:border-white/10",
            children: "Sohbetleri görmek için giriş yapmalısınız."
        }, void 0, false, {
            fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
            lineNumber: 224,
            columnNumber: 7
        }, this);
    }
    const activeContact = activeContactId ? localContacts.find((c)=>c.id === activeContactId) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full bg-armoyu-header-bg overflow-hidden relative z-10",
        children: [
            !activeContactId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatList"], {
                    contacts: localContacts,
                    activeId: '',
                    onSelect: handleSelectContact
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this),
            activeContactId && activeContact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex flex-col bg-armoyu-bg relative animate-in fade-in slide-in-from-right-4 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[76px] border-b border-gray-200 dark:border-white/5 bg-armoyu-card-bg flex items-center px-4 gap-3 z-10 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveContactId(null),
                                className: "p-2 -ml-2 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-full focus:outline-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "28",
                                    height: "28",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "15 18 9 12 15 6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                        lineNumber: 254,
                                        columnNumber: 195
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: activeContact.avatar,
                                className: "w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm",
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-armoyu-text truncate text-base",
                                        children: activeContact.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mt-0.5",
                                        children: activeContact.isOnline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)] animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-emerald-500 shadow-sm",
                                                    children: "Çevrimiçi"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-armoyu-text-muted",
                                                    children: [
                                                        "Son görülme ",
                                                        activeContact.lastSeen
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 text-armoyu-text-muted hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition-colors",
                                        title: "Ara",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                lineNumber: 277,
                                                columnNumber: 150
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closeChat,
                                        className: "p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors",
                                        title: "Sohbeti Kapat",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "22",
                                            height: "22",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "18",
                                                    y1: "6",
                                                    x2: "6",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 197
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 240
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative hide-scrollbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-xs font-bold px-3 py-1 rounded-full border border-black/5 dark:border-white/5",
                                    children: "Bugün"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            localMessages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessage"], {
                                    id: msg.id,
                                    sender: {
                                        name: msg.sender?.displayName || 'Bilinmiyor',
                                        avatar: msg.sender?.avatar || '',
                                        isSelf: msg.sender?.username === user?.username
                                    },
                                    content: msg.content,
                                    timestamp: msg.timestamp
                                }, msg.id, false, {
                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this)),
                            isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 items-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-0.5 mt-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1 h-1 rounded-full bg-blue-500 animate-bounce"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                            lineNumber: 310,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-armoyu-text-muted italic ml-1",
                                            children: "Yazıyor..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                            lineNumber: 315,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                    lineNumber: 309,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 308,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef,
                                className: "h-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$chat$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {
                        onSend: handleSendMessage,
                        chatId: activeContactId
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/chat/ChatContainer.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
_s(ChatContainer, "sxTzFb3LdCyqCS1/1ss+RFK77zc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ChatContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SocketContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = ChatContainer;
var _c;
__turbopack_context__.k.register(_c, "ChatContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_modules_chat_0h8kwq7._.js.map