'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { ChatLayout } from '../../components/modules/chat/ChatLayout';
export function FloatingChatButton({ position = 'bottom-right' }) {
    const { user } = useAuth();
    const { isChatOpen, toggleChat } = useChat();
    if (!user)
        return null;
    const positionClasses = {
        'bottom-right': 'bottom-6 right-6 md:bottom-10 md:right-10',
        'bottom-left': 'bottom-6 left-6 md:bottom-10 md:left-10',
        'top-right': 'top-24 right-6 md:top-24 md:right-10',
        'top-left': 'top-24 left-6 md:top-24 md:left-10',
    };
    return (_jsxs("div", { children: [!isChatOpen && (_jsx("div", { className: `fixed z-[80] animate-in fade-in zoom-in duration-500 ${positionClasses[position]}`, children: _jsxs("button", { onClick: toggleChat, className: "w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-blue-400/50 group focus:outline-none", title: "Sohbeti A\u00E7", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "group-hover:-translate-y-0.5 transition-transform md:w-7 md:h-7 animate-in spin-in-[-90deg] duration-300", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }), _jsx("span", { className: "absolute top-0 right-0 md:top-0.5 md:right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a0e] shadow-sm animate-pulse" })] }) }, "floating-trigger")), _jsx("div", { className: `fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[70] w-full sm:w-[400px] h-[100dvh] sm:h-[calc(100vh-100px)] md:h-[650px] shadow-[0_0_40px_rgba(0,0,0,0.3)] origin-bottom-right transition-all duration-500 sm:rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col bg-armoyu-card-bg backdrop-blur-xl ${isChatOpen
                    ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
                    : 'translate-y-10 scale-95 opacity-0 pointer-events-none'}`, children: _jsx(ChatLayout, {}) }, "floating-container")] }, "floating-chat-wrapper"));
}
//# sourceMappingURL=FloatingChatButton.js.map