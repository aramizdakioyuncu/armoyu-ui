import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Chat, ChatKind } from '../models/social/chat/Chat';
import { ChatMessage } from '../models/social/chat/Message';
import { User } from '../models/auth/User';
import { useArmoyu } from './ArmoyuContext';
import { readCacheEntry, writeCache } from '../lib/cache';
import { useAuth } from './AuthContext';
import { isOffline } from '../lib/offline';

// Önbellekte son 10 sohbet ve her sohbetin son 10 mesajı
const CACHED_CHATS = 10;
const CACHED_MESSAGES = 10;
const plain = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

interface ChatContextType {
  isChatOpen: boolean;
  isLiveMode: boolean;
  chatList: Chat[];
  searchResults: Chat[];
  activeMessages: ChatMessage[];
  isLoading: boolean;
  hasMoreChat: boolean;
  chatPage: number;
  /** Ağ yokken önbellekten gösterilen verinin kaydedildiği an */
  offlineAt: number | null;

  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setLiveMode: (isLive: boolean) => void;

  fetchChatList: (page?: number, forced?: boolean) => Promise<void>;
  setCommunityMembership: (id: string, join: boolean) => Promise<boolean>;
  fetchMessages: (userId: number | string, chatType: ChatKind, page?: number, forced?: boolean) => Promise<void>;
  searchFriends: (query: string) => Promise<void>;
  sendMessage: (userId: number | string, content: string, chatType: ChatKind) => Promise<boolean>;
  setChatList: React.Dispatch<React.SetStateAction<Chat[]>>;
  setActiveMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { api, apiKey, isMockEnabled, setMockEnabled } = useArmoyu();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [searchResults, setSearchResults] = useState<Chat[]>([]);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreChat, setHasMoreChat] = useState(true);
  const [chatPage, setChatPage] = useState(1);
  const [offlineAt, setOfflineAt] = useState<number | null>(null);

  // Compute isLiveMode from global isMockEnabled
  const isLiveMode = !isMockEnabled;

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  const setLiveMode = (isLive: boolean) => {
    setMockEnabled(!isLive);
    if (!isLive) {
      setChatList([]);
      setActiveMessages([]);
    }
  };

  // shortcut: grup sohbetinin mesajları Phatsa'da yok (grup ↔ sohbet bağı); oda listelenir, mesajlar eklenti gelince
  const toGroupRoom = (g: any) => new Chat({
    id: String(g.id),
    uid: `grup-${g.id}`,
    name: g.name || '',
    avatar: g.logo || '',
    isGroup: true,
    chatType: 'grup',
    updatedAt: 0,
    messages: [],
  });

  const toCommunityRoom = (c: any) => new Chat({
    id: String(c.id),
    uid: `topluluk-${c.id}`,
    name: c.title || 'Topluluk',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.title || 'T')}`,
    isGroup: true,
    chatType: 'topluluk',
    isJoined: !!c.joined,
    memberCount: Number(c.memberCount) || 0,
    description: c.description || '',
    updatedAt: c.lastMessageAt ? Date.parse(c.lastMessageAt) : 0,
    messages: [],
  });

  /** Topluluklar (ham); eski çekirdek / eski API'de null */
  const loadCommunities = useCallback(async (): Promise<any[] | null> => {
    try {
      // shortcut: getCommunities @armoyu/core 1.2.4'te; eski sürümde yoksa topluluk listelenmez
      const response = await (api.chat as any).getCommunities?.();
      return response?.durum === 1 && Array.isArray(response.icerik) ? response.icerik : null;
    } catch {
      return null;
    }
  }, [api]);

  /** Gruplarım (ham); hata olursa null: önbellekteki liste kalır */
  const loadGroups = useCallback(async (): Promise<any[] | null> => {
    try {
      const response = await api.groups.getUserGroups();
      return response.durum === 1 && Array.isArray(response.icerik) ? response.icerik : null;
    } catch {
      return null;
    }
  }, [api]);

  /** Topluluğa katıl / ayrıl; liste yerinde güncellenir */
  const setCommunityMembership = useCallback(async (id: string, join: boolean): Promise<boolean> => {
    const chat = api.chat as any;
    const response = join ? await chat.joinCommunity?.(id) : await chat.leaveCommunity?.(id);
    if (response?.durum !== 1) {
      alert(response?.aciklama || 'İşlem yapılamadı.');
      return false;
    }
    setChatList((prev) => prev.map((c) => c.chatType === 'topluluk' && c.id === id
      ? new Chat({ ...c, isJoined: join, memberCount: Math.max(0, (c.memberCount ?? 0) + (join ? 1 : -1)) })
      : c));
    return true;
  }, [api]);

  const fetchChatList = useCallback(async (page: number = 1, forced: boolean = false) => {
    if (isMockEnabled && !forced) {
      // Mock data for showcase doesn't need pagination for now
      if (page > 1) return;
      setChatList([
        new Chat({ id: '1', name: 'Berkay Tikenoğlu', lastMessage: new ChatMessage({ content: 'Hocam selamlar!' }), unreadCount: 2, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BT' }),
        new Chat({ id: '2', name: 'MythX Destek', lastMessage: new ChatMessage({ content: 'Tabii, hemen yardımcı olalım.' }), unreadCount: 0, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MX' }),
        new Chat({ id: '3', name: 'Minecraft Grubu', lastMessage: new ChatMessage({ content: 'Yarın akşam 20:00 etkinlik var.' }), unreadCount: 5, avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MG' }),
      ]);
      setHasMoreChat(false);
      return;
    }

    if (!isLiveMode && !forced) return;
    if (isLoading) return;

    setIsLoading(true);
    const cached = page === 1 ? readCacheEntry<any[]>('chats') : null;
    // Gruplar da önbellekten: sohbetlerle birlikte görünür, sonradan eklenip listeyi kaydırmaz
    const cachedGroups = page === 1 ? readCacheEntry<any[]>('chatGroups') : null;
    const cachedCommunities = page === 1 ? readCacheEntry<any[]>('chatCommunities') : null;
    if (cached) setChatList([
      ...cached.data.map((c: any) => Chat.fromAPI(c)),
      ...(cachedGroups?.data ?? []).map(toGroupRoom),
      ...(cachedCommunities?.data ?? []).map(toCommunityRoom),
    ]);
    try {
      // Sadece arkadaşları değil, tüm sohbet geçmişini (Inbox) çek; gruplar aynı anda
      const [response, groups, communities] = await Promise.all([
        api.chat.getChats(page),
        page === 1 ? loadGroups() : Promise.resolve(null),
        page === 1 ? loadCommunities() : Promise.resolve(null),
      ]);

      const data = response.icerik || [];
      if (response.durum === 1 && Array.isArray(data)) {
        const mapped = data.map((c: any) => Chat.fromAPI(c));
        // Gruplarım sohbet listesinde oda olarak; Gruplar sekmesi bunları gösterir
        const rooms = page === 1 ? [
          ...(groups ?? cachedGroups?.data ?? []).map(toGroupRoom),
          ...(communities ?? cachedCommunities?.data ?? []).map(toCommunityRoom),
        ] : [];
        if (page === 1 && groups) writeCache('chatGroups', plain(groups));
        if (page === 1 && communities) writeCache('chatCommunities', plain(communities));
        setChatList(prev => page === 1 ? [...mapped, ...rooms] : [...prev, ...mapped]);
        setChatPage(page);
        setHasMoreChat(data.length >= 20); // API limitine göre hasMore set et
        if (page === 1) writeCache('chats', plain(data).slice(0, CACHED_CHATS));
        setOfflineAt(null);
      } else if (cached && isOffline()) {
        setOfflineAt(cached.at);
        setHasMoreChat(false);
      } else {
        // Sunucu hatasında önbellek gösterilmez
        if (page === 1) setChatList([]);
        setHasMoreChat(false);
      }
    } catch (error) {
      console.error("[ChatContext] Fetch chats failed:", error);
      setHasMoreChat(false);
    } finally {
      setIsLoading(false);
    }
  }, [api, isLiveMode, isMockEnabled, isLoading, loadGroups, loadCommunities]);

  // Oturum boyunca açılan sohbetlerin mesajları bellekte: geri dönünce anında görünür, arkada tazelenir.
  // Tarayıcıya yazılmadığı için çerez onayı gerekmez (kalıcı önbellek ayrıca writeCache ile, onaya bağlı)
  const messageMemory = useRef(new Map<string, ChatMessage[]>());
  const activeKey = useRef<string | null>(null);
  // Çıkış yapınca ya da hesap değişince önceki kullanıcının mesajları bellekte kalmasın
  const { user } = useAuth();
  useEffect(() => {
    messageMemory.current.clear();
    activeKey.current = null;
  }, [user?.id]);
  useEffect(() => {
    // Gönderilen / gelen mesajlar da belleğe girsin
    if (activeKey.current) messageMemory.current.set(activeKey.current, activeMessages);
  }, [activeMessages]);

  const fetchMessages = useCallback(async (userId: number | string, chatType: ChatKind, page: number = 1, forced: boolean = false) => {
    if (isMockEnabled && !forced) {
      // Mock Messages for Showcase
      const mockUser = new User({ displayName: 'Berkay Tikenoğlu', username: 'berkay' });
      const systemUser = new User({ displayName: 'Sistem', username: 'sistem' });

      const mockMsgs = [
        new ChatMessage({ id: 'm1', sender: mockUser, content: 'Selamlar hocam!', timestamp: '12:45' }),
        new ChatMessage({ id: 'm2', sender: systemUser, content: 'Aleykümselam, hoş geldin.', timestamp: '12:46' }),
        new ChatMessage({ id: 'm3', sender: mockUser, content: 'Vitrin modu test verileri bunlar.', timestamp: '12:47' }),
        new ChatMessage({ id: 'm4', sender: systemUser, content: 'Harika görünüyor, eline sağlık!', timestamp: '12:48' }),
      ];
      setActiveMessages(page === 1 ? mockMsgs : [...mockMsgs, ...activeMessages]);
      return;
    }

    if (!isLiveMode && !forced) return;

    setIsLoading(true);
    // Son görülen mesajlar anında; yoksa önceki sohbetin mesajları hemen temizlenir
    const cacheKey = `messages:${chatType}:${userId}`;
    const cached = readCacheEntry<any[]>(cacheKey);
    activeKey.current = cacheKey;
    setActiveMessages(messageMemory.current.get(cacheKey) ?? (cached ? cached.data.map((m: any) => ChatMessage.fromAPI(m)) : []));
    try {
      // Use getChatDetail for initial fetch or getChatHistory for pagination
      // shortcut: yayınlanan @armoyu/core tiplerinde kimlik yalnızca sayı; yeni sürüm çıkınca cast kalkacak
      const response = await (api.chat as any).getChatDetail(userId, chatType);

      const data = response.icerik || [];

      if (response.durum !== 1 || !Array.isArray(data)) {
        if (cached && isOffline()) setOfflineAt(cached.at);
        else setActiveMessages([]);
      } else {
        writeCache(cacheKey, plain(data).slice(-CACHED_MESSAGES));
        setOfflineAt(null);
        const msgs = data.map((m: any) => ChatMessage.fromAPI(m));
        // Bu arada başka sohbete geçildiyse cevap yalnızca belleğe; açık sohbetin ekranı değişmez
        messageMemory.current.set(cacheKey, msgs);
        if (activeKey.current !== cacheKey) return;
        
        // Update active messages
        setActiveMessages(msgs);
        
        // Update the chatList cache
        setChatList(prev => prev.map(c => {
          if (c.id === String(userId)) { // Matching by raw ID
             return new Chat({ ...c, messages: msgs });
          }
          return c;
        }));
      }
    } catch (error) {
      console.error("[ChatContext] Fetch messages failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [api, isLiveMode, isMockEnabled]);

  const searchFriends = useCallback(async (query: string) => {
    if (!isLiveMode) {
      setSearchResults([]);
      return;
    }

    try {
      // 1. Mevcut sohbet geçmişini (Gruplar dahil) çek
      const inboxResponse = await api.chat.getChats(1, { limit: 50 });
      const inboxData = inboxResponse.icerik || [];

      // 2. Tüm arkadaş listesini çek (Yeni sohbet başlatmak için)
      const friendsResponse = await api.chat.getFriendsChat(1, { limit: 100 });
      const friendsData = friendsResponse.icerik || [];

      // İki listeyi birleştir ve tekilleştir
      const combined = [
        ...(Array.isArray(inboxData) ? inboxData : []),
        ...(Array.isArray(friendsData) ? friendsData : [])
      ];

      if (combined.length > 0) {
        const mapped = combined.map((u: any) => Chat.fromAPI(u));

        // ID'ye göre tekilleştir (Aynı kişi hem geçmişte hem arkadaş listesinde olabilir)
        const unique = mapped.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

        // Boş arama: bütün arkadaşlar (yeni sohbet başlatmak için)
        const filtered = !query.trim() ? unique : unique.filter(c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.id.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error("[ChatContext] Search friends failed:", error);
    }
  }, [api, isLiveMode]);

  const sendMessage = useCallback(async (userId: number | string, content: string, chatType: ChatKind) => {
    if (!isLiveMode) return false;

    try {
      const response = await (api.chat as any).sendMessage(userId, content, chatType);
      return response.durum === 1;
    } catch (error) {
      console.error("[ChatContext] Send message failed:", error);
      return false;
    }
  }, [api, isLiveMode]);

  return (
    <ChatContext.Provider value={{
      isChatOpen,
      isLiveMode,
      chatList,
      activeMessages,
      isLoading,
      toggleChat,
      openChat,
      closeChat,
      setLiveMode,
      fetchChatList,
      setCommunityMembership,
      fetchMessages,
      searchFriends,
      sendMessage,
      hasMoreChat,
      chatPage,
      offlineAt,
      searchResults,
      setChatList,
      setActiveMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
