import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthSidebarLeft, Stories, PostCard, postList } from '../../index';
export function SocialTab() {
    const samplePosts = postList.slice(0, 3);
    return (_jsxs("div", { className: "space-y-12", children: [_jsx("h3", { className: "text-2xl font-black italic uppercase tracking-tighter border-l-4 border-purple-500 pl-4", children: "Sosyal Mod\u00FCller" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("aside", { className: "lg:col-span-3", children: _jsx(AuthSidebarLeft, {}) }), _jsxs("div", { className: "lg:col-span-9 space-y-8", children: [_jsx(Stories, {}), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: samplePosts.map(post => _jsx(PostCard, { ...post }, post.id)) })] })] })] }));
}
//# sourceMappingURL=SocialTab.js.map