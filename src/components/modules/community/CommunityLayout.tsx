'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../../../models/auth/User';
import { Group } from '../../../models/community/Group';
import { Loader2 } from 'lucide-react';

// Shared Components / Contexts from main index
import {
   NotFound,
   PageWidth,
   useAuth,
   groupList,
   postList,
   eventList,
   useArmoyu
} from '../../../index';

// Module specific widgets
import { GroupHeader } from './widgets/GroupHeader';
import { GroupMenu } from './widgets/GroupMenu';
import { GroupStatsGrid } from './widgets/GroupStatsGrid';
import { GroupAboutCard } from './widgets/GroupAboutCard';
import { EventList } from '../events/widgets/EventList';
import { GroupFeedSection } from './widgets/GroupFeedSection';
import { GroupTopMembers } from './widgets/GroupTopMembers';
import { GroupPermissions } from './widgets/GroupPermissions';

interface CommunityLayoutProps {
   /** Grup ID, Slug veya URL ismi */
   groupId: string;
}

export function CommunityLayout({ groupId }: CommunityLayoutProps) {
   const { api, apiKey } = useArmoyu();
   const { user, updateUser } = useAuth();
   const normalizedGroupId = groupId?.toLowerCase() || '';

   const [group, setGroup] = useState<Group | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [localEvents, setLocalEvents] = useState<any[]>(eventList.slice(0, 3));

   // 1. Grup Bilgisini Çek (API öncelikli, Mock yedek)
   useEffect(() => {
      const fetchGroup = async () => {
         setIsLoading(true);

         // Önce API'den dene (Eğer geçerli bir anahtar varsa)
         if (apiKey && apiKey !== 'armoyu_showcase_key') {
            try {
               // Hem numeric ID hem slug olarak aramayı desteklemek için GroupService.getGroupDetail'i kullanıyoruz
               const idNum = parseInt(normalizedGroupId);
               const response = await api.groups.getGroupDetail({
                  groupId: isNaN(idNum) ? undefined : idNum,
                  groupName: isNaN(idNum) ? normalizedGroupId : undefined
               });

               if (response.durum === 1 && response.icerik) {
                  setGroup(Group.fromAPI(response.icerik));

                  // Grup yüklendikten sonra etkinliklerini de API'den çekmeye çalış
                  try {
                     const eventsResponse = await api.events.getEvents(1, { limit: 10 }); 
                     if (eventsResponse.durum === 1 && eventsResponse.icerik) {
                        setLocalEvents(eventsResponse.icerik);
                     }
                  } catch (evErr) {
                     console.warn("[GroupProfile] Events API fetch failed:", evErr);
                  }

                  setIsLoading(false);
                  return;
               }
            } catch (error) {
               console.warn("[GroupProfile] API Fetch failed, falling back to mock:", error);
            }
         }

         // Mock veriden bul
         const groupRaw = groupList.find((g: any) =>
            g.id?.toString() === normalizedGroupId ||
            g.slug === normalizedGroupId ||
            g.urlName === normalizedGroupId ||
            g.name.toLowerCase() === normalizedGroupId ||
            g.name.toLowerCase().replace(/\s+/g, '-') === normalizedGroupId
         );

         if (groupRaw) {
            setGroup(new Group(groupRaw));
         }
         setIsLoading(false);
      };

      fetchGroup();
   }, [normalizedGroupId, api, apiKey]);

   // Yerel üyelik durumu
   const [isMember, setIsMember] = useState(false);

   useEffect(() => {
      if (user && group) {
         setIsMember(group.members?.some(m => m.username === user.username) || false);
      }
   }, [user, group]);

   // Grup Admin Kontrolü
   const isGroupAdmin = useMemo(() => {
      return user && group && (
         group.owner?.displayName === user.displayName ||
         group.members?.some(m => m.username === user.username && (m.role?.id === 'admin' || m.role?.id === 'member_mgmt'))
      );
   }, [user, group]);

   const groupPosts = useMemo(() => {
      if (!group) return [];
      return postList.filter((p: any) =>
         p.hashtags?.some((h: string) => h.toLowerCase() === group.name.toLowerCase() || h.toLowerCase() === (group.shortName?.toLowerCase() || ''))
      );
   }, [group?.name, group?.shortName]);

   const stats = useMemo(() => {
      if (!group) return { members: 0, online: 0, posts: 0, founded: '2024' };
      return {
         members: group.memberCount || group.members?.length || 0,
         online: Math.floor((group.memberCount || group.members?.length || 0) * 0.15),
         posts: groupPosts.length + 12, // + mock posts
         founded: group.date?.split('.')?.[2] || '2024'
      };
   }, [group, groupPosts.length]);

   if (isLoading) {
      return (
         <div className="flex flex-col items-center justify-center h-[500px] gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <span className="text-zinc-500 font-black text-xs uppercase tracking-widest animate-pulse">Grup Bilgileri Yükleniyor...</span>
         </div>
      );
   }

   // Grup bulunamadıysa NotFound göster
   if (!group) {
      return (
         <NotFound
            title="GRUP BULUNAMADI"
            message={`"${groupId}" kimliğine sahip bir grup kayıtlarda görünmüyor. Belki de gizli bir cemiyettir?`}
            actionText="GRUPLARA GERİ DÖN"
            actionHref="/gruplar"
            footerMessage="error: group_not_found"
         />
      );
   }

   const handleJoin = () => {
      if (!user) {
         alert('Lütfen önce giriş yapın!');
         return;
      }
      setIsMember(true);
      const members = [...(group.members || []), user];
      setGroup(new Group({ ...group, members, memberCount: members.length }));
      
      const updatedUser = new User({ ...user });
      updatedUser.groups = [...(updatedUser.groups || []), {
         name: group.name,
         shortName: group.shortName,
         logo: typeof group.logo === 'string' ? group.logo : (group.logo as any)?.media_URL,
         role: 'Üye'
      }];
      updateUser(updatedUser);
   };

   const handleLeave = () => {
      if (!confirm('Gruptan ayrılmak istediğinize emin misiniz?')) return;
      setIsMember(false);
      const members = (group.members || []).filter(m => m.username !== user?.username);
      setGroup(new Group({ ...group, members, memberCount: members.length }));
      if (user) {
         const updatedUser = new User({ ...user });
         updatedUser.groups = updatedUser.groups?.filter((g: any) => g.name !== group.name);
         updateUser(updatedUser);
      }
   };

   return (
      <div className="max-w-7xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 relative text-left leading-none">

         {/* 1. Header Section */}
         <GroupHeader
            group={group as unknown as any}
            isMember={isMember}
            onJoin={handleJoin}
            onLeave={handleLeave}
            onReport={() => alert('Şikayet iletildi.')}
         />

         {/* 2. Content Grid (Main 3/4 + Sidebar 1/4) */}
         <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">

            {/* Main Content Area (Left) */}
            <div className="xl:col-span-3 space-y-12">
               <GroupStatsGrid stats={stats} />
               <GroupAboutCard description={group.description} />
               <EventList
                  events={localEvents}
                  setEvents={setLocalEvents}
                  isOwner={!!isGroupAdmin}
                  title="GRUP ETKİNLİKLERİ"
                  profilePrefix="/etkinlikler"
               />
               <GroupFeedSection
                  group={group as any}
                  user={user as any}
                  isMember={isMember}
                  posts={groupPosts}
               />
            </div>

            {/* Sidebar Area (Right) */}
            <div className="space-y-10 xl:col-span-1">
               {isMember && user && (
                  <div className="py-2">
                     <GroupMenu group={group as any} user={user as any} onLeave={handleLeave} />
                  </div>
               )}

               <GroupTopMembers members={group.members || []} groupUrl={group.getGroupUrl()} />
               <GroupPermissions permissions={(group as any).permissions || []} />
            </div>

         </div>
      </div>
   );
}
