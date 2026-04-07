'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Layers, 
  Share2, 
  User, 
  MessageSquare, 
  ShoppingBag, 
  Users 
} from 'lucide-react';

// Showcase Components
import { GeneralTab } from '../components/showcase/GeneralTab';
import { CorporateTab } from '../components/showcase/CorporateTab';
import { SocialTab } from '../components/showcase/SocialTab';
import { ProfileTab } from '../components/showcase/ProfileTab';
import { MessagesTab } from '../components/showcase/MessagesTab';
import { CommunityTab } from '../components/showcase/CommunityTab';
import { ShopTab } from '../components/showcase/ShopTab';

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState('Genel');

  const tabs = [
    { name: 'Genel', icon: <Box size={18} /> },
    { name: 'Kurumsal', icon: <Layers size={18} /> },
    { name: 'Sosyal', icon: <Share2 size={18} /> },
    { name: 'Profil', icon: <User size={18} /> },
    { name: 'Mesajlar', icon: <MessageSquare size={18} /> },
    { name: 'Topluluk', icon: <Users size={18} /> },
    { name: 'Mağaza', icon: <ShoppingBag size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Genel': return <GeneralTab />;
      case 'Kurumsal': return <CorporateTab />;
      case 'Sosyal': return <SocialTab />;
      case 'Profil': return <ProfileTab />;
      case 'Mesajlar': return <MessagesTab />;
      case 'Topluluk': return <CommunityTab />;
      case 'Mağaza': return <ShopTab />;
      default: return <GeneralTab />;
    }
  };

  return (
    <div className="min-h-screen bg-armoyu-bg flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* MINIMAL SHOWCASE HEADER */}
      <nav className="sticky top-0 z-[110] w-full border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
               <span className="text-white font-black text-xs italic">UI</span>
            </div>
            <div>
               <h2 className="text-sm font-black text-armoyu-text uppercase tracking-tighter italic">ARMOYU <span className="text-blue-500">VITRINI</span></h2>
               <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">V3 Design System</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
             {tabs.map((tab) => (
               <button
                 key={tab.name}
                 onClick={() => setActiveTab(tab.name)}
                 className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic ${
                   activeTab === tab.name
                     ? 'bg-white dark:bg-white/10 text-blue-500 shadow-sm'
                     : 'text-armoyu-text-muted hover:text-armoyu-text'
                 }`}
               >
                 {tab.name}
               </button>
             ))}
          </div>

          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black py-1.5 px-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">v1.0.0 Stable</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
           {renderTabContent()}
        </div>
      </main>

      {/* MINIMAL SHOWCASE FOOTER */}
      <footer className="py-8 border-t border-white/5 text-center">
         <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-30 italic">
            © 2024 ARMOYU DEVELOPER EXPERIENCE • VITRIN MODU
         </p>
      </footer>
    </div>
  );
}
