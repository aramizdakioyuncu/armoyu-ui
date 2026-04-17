import { BaseModel } from '../../BaseModel';
import { User } from '../../auth/User';
import { ChatMessage } from './Message';

/**
 * Represents a Chat conversation or summary in the UI.
 */
export class Chat extends BaseModel {
  id: string = '';
  participants: User[] = [];
  name: string = '';
  avatar: string = '';
  lastMessage: ChatMessage | null = null;
  time: string = '';
  unreadCount: number = 0;
  isOnline: boolean = false;
  lastSeen: string = '';
  updatedAt: number = 0;
  isGroup: boolean = false;
  isFavorite: boolean = false;
  messages: ChatMessage[] = [];

  constructor(data: Partial<Chat>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Chat object from an API response.
   */
  static fromAPI(json: Record<string, any>): Chat {
    if (!json) return new Chat({});

    const resolveKey = (keys: string[]): any => {
      // Find all matching keys
      const matchingKeys = Object.keys(json).filter(k => keys.includes(k.toLowerCase()));
      // Return the first one that has a non-empty value
      for (const k of matchingKeys) {
        const val = json[k];
        if (val !== undefined && val !== null && val !== '') return val;
      }
      return undefined;
    };

    const id = resolveKey(['kulladi', 'username', 'oyuncukullaniciadi', 'id', 'id_user', 'user_id', 'oyuncubakid', 'oyuncuid', 'arkadasid', 'id_arkadas', 'groupid', 'grupid', 'sohbetid', 'kullid']);
    const name = resolveKey(['name', 'displayname', 'user_displayname', 'oyuncuad', 'grupad', 'username', 'title', 'ad', 'adisoyadi', 'kulladi']);
    
    let avatarRaw = resolveKey(['avatar', 'chatimage', 'image', 'oyuncu_avatar', 'oyuncuminnakavatar', 'player_avatar', 'arkadasfoto', 'oyuncufoto', 'oyuncuresim', 'profil_fotosu', 'logo', 'foto', 'resim', 'grup_minnakavatar', 'avatar_url']);
    
    if (!avatarRaw) {
      const heuristicKey = Object.keys(json).find(k => {
        const lowerK = k.toLowerCase();
        return lowerK.includes('avatar') || lowerK.includes('foto') || lowerK.includes('resim') || lowerK.includes('image');
      });
      if (heuristicKey) avatarRaw = json[heuristicKey];
    }

    const nestedObj = json.oyuncu || json.arkadas || json.owner || json.user;
    if (!avatarRaw && nestedObj && typeof nestedObj === 'object') {
       const nestedUser = User.fromAPI(nestedObj);
       if (nestedUser.avatar) avatarRaw = nestedUser.avatar;
    }

    const lastMsgRaw = resolveKey(['lastmessage', 'last_message', 'sonmesaj', 'son_mesaj']);
    const time = resolveKey(['time', 'zaman', 'tarih', 'last_message_time', 'guncelletarih', 'songorusme', 'songiris']);
    const unread = resolveKey(['unreadcount', 'unread_count', 'okunmamissayi', 'okunmamis_sayi', 'bildirim_sayi', 'bildirim']);
    const onlineRaw = resolveKey(['isonline', 'is_online', 'oyuncu_online', 'durum']);
    const lastSeen = resolveKey(['lastseen', 'last_seen', 'songorulme', 'son_gorulme']);
    const isGroupRaw = resolveKey(['isgroup', 'is_group', 'is_clube', 'groupid', 'grupid']);

    return new Chat({
      id: String(id || ''),
      participants: Array.isArray(json.participants) ? json.participants.map((p: Record<string, any>) => User.fromAPI(p)) : [],
      name: name || '',
      avatar: typeof avatarRaw === 'string' ? avatarRaw : (avatarRaw?.media_URL || avatarRaw?.media_minURL || avatarRaw?.media_bigURL || avatarRaw?.fotourl || avatarRaw?.url || ''),
      lastMessage: lastMsgRaw ? ChatMessage.fromAPI(lastMsgRaw) : null,
      time: time || '',
      unreadCount: Number(unread || 0),
      isOnline: onlineRaw === 1 || onlineRaw === true,
      lastSeen: lastSeen || '',
      updatedAt: json.updatedAt || json.updated_at || Date.now(),
      isGroup: !!isGroupRaw,
      isFavorite: !!json.isFavorite || !!json.is_favorite,
      messages: Array.isArray(json.messages) ? json.messages.map((m: any) => ChatMessage.fromAPI(m)) : (Array.isArray(json.liste) ? json.liste.map((m: any) => ChatMessage.fromAPI(m)) : []),
    });
  }
}
