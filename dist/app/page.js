'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// Showcase Components
import { GeneralTab } from '../components/showcase/GeneralTab';
import { CorporateTab } from '../components/showcase/CorporateTab';
import { SocialTab } from '../components/showcase/SocialTab';
import { ProfileTab } from '../components/showcase/ProfileTab';
import { MessagesTab } from '../components/showcase/MessagesTab';
import { CommunityTab } from '../components/showcase/CommunityTab';
import { ShopTab } from '../components/showcase/ShopTab';
import { GroupTab } from '../components/showcase/GroupTab';
import { EventsTab } from '../components/showcase/EventsTab';
import { ReelsTab } from '../components/showcase/ReelsTab';
function ShowcaseContent() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'Genel';
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Genel': return _jsx(GeneralTab, {});
            case 'Kurumsal': return _jsx(CorporateTab, {});
            case 'Sosyal': return _jsx(SocialTab, {});
            case 'Profil': return _jsx(ProfileTab, {});
            case 'Mesajlar': return _jsx(MessagesTab, {});
            case 'Topluluk': return _jsx(CommunityTab, {});
            case 'Gruplar': return _jsx(GroupTab, {});
            case 'Etkinlikler': return _jsx(EventsTab, {});
            case 'Shop': return _jsx(ShopTab, {});
            case 'Reels': return _jsx(ReelsTab, {});
            default: return _jsx(GeneralTab, {});
        }
    };
    return (_jsx("main", { className: "flex-1 max-w-7xl mx-auto w-full px-4 py-12", children: _jsx("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700", children: renderTabContent() }) }));
}
export default function ShowcasePage() {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "flex-1 flex items-center justify-center", children: "Y\u00FCkleniyor..." }), children: _jsx(ShowcaseContent, {}) }));
}
//# sourceMappingURL=page.js.map