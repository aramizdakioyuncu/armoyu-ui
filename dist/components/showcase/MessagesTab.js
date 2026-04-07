import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChatNotes, ChatList, ChatContainer, MOCK_SESSION } from '../../index';
export function MessagesTab() {
    return (_jsxs("div", { className: "space-y-12", children: [_jsx("h3", { className: "text-2xl font-black italic uppercase tracking-tighter border-l-4 border-emerald-500 pl-4", children: "Mesajla\u015Fma Sistemi" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]", children: [_jsxs("div", { className: "lg:col-span-4 glass-panel rounded-[40px] overflow-hidden flex flex-col", children: [_jsx(ChatNotes, {}), _jsx("div", { className: "flex-1 overflow-hidden p-2", children: _jsx(ChatList, { contacts: MOCK_SESSION.chatList, activeId: "c1", onSelect: () => { } }) })] }), _jsx("div", { className: "lg:col-span-8 glass-panel rounded-[40px] overflow-hidden", children: _jsx(ChatContainer, {}) })] })] }));
}
//# sourceMappingURL=MessagesTab.js.map