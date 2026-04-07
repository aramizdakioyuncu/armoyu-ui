import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileHeader, ProfileStats, ProfileContent, userList } from '../../index';
export function ProfileTab() {
    const me = userList[0];
    return (_jsxs("div", { className: "space-y-12", children: [_jsx("h3", { className: "text-2xl font-black italic uppercase tracking-tighter border-l-4 border-pink-500 pl-4", children: "Kullan\u0131c\u0131 Profili" }), _jsx(ProfileHeader, { user: me, isOwnProfile: true }), _jsx(ProfileStats, {}), _jsx(ProfileContent, { user: me })] }));
}
//# sourceMappingURL=ProfileTab.js.map