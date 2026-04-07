import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ForumBoard, GroupCard, groupList, MOCK_FORUM_CATEGORIES } from '../../index';
export function CommunityTab() {
    return (_jsxs("div", { className: "space-y-12", children: [_jsx("h3", { className: "text-2xl font-black italic uppercase tracking-tighter border-l-4 border-orange-500 pl-4", children: "Topluluk & Forum" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsx("div", { className: "md:col-span-2", children: _jsx(ForumBoard, { ...MOCK_FORUM_CATEGORIES[1].boards[0] }) }), _jsx(GroupCard, { ...groupList[0] }), _jsx(GroupCard, { ...groupList[1] })] })] }));
}
//# sourceMappingURL=CommunityTab.js.map