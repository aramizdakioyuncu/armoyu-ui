'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ProfileBadgesWidget } from './widgets/ProfileBadgesWidget';
import { ProfileCloudWidget } from './widgets/ProfileCloudWidget';
import { ProfileFriendsWidget } from './widgets/ProfileFriendsWidget';
import { PostsTab } from './tabs/PostsTab';
import { AboutTab } from './tabs/AboutTab';
import { CareerTab } from './tabs/CareerTab';
import { GamesTab } from './tabs/GamesTab';
import { FriendsTab } from './tabs/FriendsTab';
import { useAuth } from '../../../context/AuthContext';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { User } from '@armoyu/core';
import { X, Shield } from 'lucide-react';
import { CloudStorageModal } from './CloudStorageModal';
import { TeamSelectorModal } from './TeamSelectorModal';
export function ProfileContent({ user }) {
    const { user: currentUser, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('Kariyer');
    const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const [showTeamBanner, setShowTeamBanner] = useState(false);
    const [friends, setFriends] = useState([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);
    const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
    const { api } = useArmoyu();
    // Use currentUser from context if it's our own profile to ensure reactivity
    const isOwnProfile = currentUser?.username === user?.username;
    const displayUser = isOwnProfile ? currentUser : user;
    const [tempBio, setTempBio] = useState(displayUser?.bio || '');
    useEffect(() => {
        async function fetchFriends() {
            if (activeTab === 'Arkadaşlar' && !hasFetchedFriends && displayUser?.id) {
                setIsLoadingFriends(true);
                try {
                    const data = await api.users.getFriendsList({
                        userId: Number(displayUser.id),
                        limit: 100
                    });
                    if (data && Array.isArray(data)) {
                        const mappedFriends = data.map((u) => User.fromJSON(u));
                        setFriends(mappedFriends);
                        setHasFetchedFriends(true);
                        console.log(`[ProfileContent] Fetched ${mappedFriends.length} friends for ${displayUser.username}`);
                    }
                }
                catch (error) {
                    console.error('[ProfileContent] Friends fetch error:', error);
                }
                finally {
                    setIsLoadingFriends(false);
                }
            }
        }
        fetchFriends();
    }, [activeTab, hasFetchedFriends, displayUser?.id, api]);
    useEffect(() => {
        // Show banner only on own profile and if team is missing and not dismissed
        if (isOwnProfile && !displayUser?.favoriteTeam) {
            const dismissed = localStorage.getItem(`team_prompt_dismissed_${displayUser?.id}`);
            if (!dismissed) {
                setShowTeamBanner(true);
            }
        }
    }, [isOwnProfile, user]);
    const handleTeamSelect = (team, zodiac) => {
        if (displayUser) {
            if (isOwnProfile && currentUser) {
                updateUser({
                    ...currentUser,
                    favoriteTeam: team,
                    zodiac: zodiac
                });
            }
        }
        setIsTeamModalOpen(false);
        setShowTeamBanner(false);
        localStorage.setItem(`team_prompt_dismissed_${displayUser?.id}`, 'true');
    };
    const handleBioSave = () => {
        if (isOwnProfile && currentUser) {
            updateUser({
                ...currentUser,
                bio: tempBio
            });
            setIsBioModalOpen(false);
        }
    };
    const tabs = ['Gönderiler', 'Hakkında', 'Kariyer', 'Oynadığı Oyunlar', 'Arkadaşlar'];
    return (_jsxs("div", { className: "w-full flex flex-col lg:flex-row gap-6 mt-6", children: [_jsxs("div", { className: "w-full lg:w-80 shrink-0 space-y-6", children: [_jsx(ProfileBadgesWidget, {}), isOwnProfile && (_jsx(ProfileCloudWidget, { onManageCloud: () => setIsCloudModalOpen(true) })), _jsx(ProfileFriendsWidget, { friendsCount: displayUser?.friendCount || friends.length || 0, friendsList: friends.length > 0 ? friends : (displayUser?.friends || []), onSeeAll: () => setActiveTab('Arkadaşlar') })] }), _jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-6", children: [showTeamBanner && (_jsxs("div", { className: "glass-panel p-6 rounded-[32px] border border-blue-500/30 bg-blue-600/5 relative overflow-hidden group animate-in slide-in-from-top duration-700", children: [_jsx("div", { className: "absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" }), _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6 relative z-10", children: [_jsxs("div", { className: "flex items-center gap-5 text-center md:text-left", children: [_jsx("div", { className: "w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20", children: _jsx(Shield, { size: 32 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-black text-armoyu-text uppercase italic tracking-tighter leading-none", children: "TAKIMINI SE\u00C7MED\u0130N!" }), _jsx("p", { className: "text-xs font-bold text-armoyu-text-muted mt-2 max-w-xs leading-relaxed uppercase tracking-wider italic", children: "Favori tak\u0131m\u0131n\u0131 ve burcunu ekleyerek profilini daha renkli hale getir." })] })] }), _jsxs("div", { className: "flex items-center gap-3 w-full md:w-auto", children: [_jsx("button", { onClick: () => setIsTeamModalOpen(true), className: "flex-1 md:flex-none px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 italic", children: "\u015E\u0130MD\u0130 SE\u00C7" }), _jsx("button", { onClick: () => {
                                                    setShowTeamBanner(false);
                                                    localStorage.setItem(`team_prompt_dismissed_${user?.id}`, 'true');
                                                }, className: "p-3.5 text-armoyu-text-muted hover:text-armoyu-text bg-black/5 hover:bg-black/10 rounded-2xl transition-all", children: _jsx(X, { size: 18 }) })] })] })] })), _jsx("div", { className: "bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl p-2 shadow-sm overflow-x-auto hide-scrollbar", children: _jsx("div", { className: "flex gap-2 min-w-max", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                                    ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                    : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`, children: tab }, tab))) }) }), _jsxs("div", { className: "min-h-[400px]", children: [activeTab === 'Gönderiler' && _jsx(PostsTab, { user: displayUser || null }), activeTab === 'Hakkında' && (_jsx(AboutTab, { displayUser: displayUser || null, isOwnProfile: isOwnProfile, onEditBio: () => setIsBioModalOpen(true), onEditTeam: () => setIsTeamModalOpen(true) })), activeTab === 'Kariyer' && _jsx(CareerTab, { displayUser: displayUser || null }), activeTab === 'Oynadığı Oyunlar' && _jsx(GamesTab, { user: displayUser || null }), activeTab === 'Arkadaşlar' && (_jsx(FriendsTab, { friends: friends.length > 0 ? friends : (displayUser?.friends || []), totalCount: displayUser?.friendCount }))] })] }), _jsx(CloudStorageModal, { isOpen: isCloudModalOpen, onClose: () => setIsCloudModalOpen(false) }), _jsx(TeamSelectorModal, { isOpen: isTeamModalOpen, onClose: () => setIsTeamModalOpen(false), onSelect: handleTeamSelect, initialTeam: displayUser?.favoriteTeam, initialZodiac: displayUser?.zodiac }), isBioModalOpen && (_jsxs("div", { className: "fixed inset-0 z-[200] flex items-center justify-center p-6 text-left", children: [_jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-md", onClick: () => setIsBioModalOpen(false) }), _jsxs("div", { className: "bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden", children: [_jsxs("div", { className: "p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl", children: "\u270D\uFE0F" }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-black text-armoyu-text uppercase tracking-tight italic", children: "Biyografini D\u00FCzenle" }), _jsx("p", { className: "text-xs font-medium text-armoyu-text-muted", children: "Kendini ARMOYU \u00FCyelerine tan\u0131t." })] })] }), _jsx("button", { onClick: () => setIsBioModalOpen(false), className: "p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "p-8 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4", children: "HAKKINDA" }), _jsx("textarea", { className: "w-full bg-black/10 border border-armoyu-card-border rounded-3xl px-6 py-5 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all min-h-[150px] resize-none", placeholder: "Kendinden bahset...", value: tempBio, onChange: (e) => setTempBio(e.target.value), autoFocus: true })] }), _jsx("button", { onClick: handleBioSave, className: "w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[20px] text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic", children: "DE\u011E\u0130\u015E\u0130KL\u0130KLER\u0130 KAYDET" })] })] })] }))] }));
}
//# sourceMappingURL=ProfileContent.js.map