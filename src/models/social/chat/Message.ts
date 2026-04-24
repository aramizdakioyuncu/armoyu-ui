import { User } from '../../auth/User';

/**
 * Represents a single message in a Chat in the UI.
 */
export class ChatMessage {
  id: string = '';
  sender: User | null = null;
  content: string = '';
  timestamp: string = '';
  isSystem: boolean = false;
  isSelf: boolean = false;

  constructor(data: Partial<ChatMessage>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a ChatMessage object from an API response.
   */
  static fromAPI(json: Record<string, any>): ChatMessage {
    if (!json) return new ChatMessage({});

    const resolveKey = (keys: string[]): any => {
      // Find all matching keys
      const matchingKeys = Object.keys(json).filter(k => keys.includes(k.toLowerCase()));
      // Return the first one that has a non-empty value
      for (const k of matchingKeys) {
        const val = json[k];
        if (val !== undefined && val !== null && val !== '') return val;
      }
    };

    const id = resolveKey(['id', 'sohbetid', 'mesajid', 'id_sohbet', 'id_mesaj']);
    const senderRaw = resolveKey(['sender', 'authorname', 'sender_name', 'gonderen_ad', 'oyuncu_ad', 'gonderen', 'adsoyad', 'kulladi', 'adisoyadi']);
    const content = resolveKey(['content', 'text', 'icerik', 'mesaj', 'text_message', 'message', 'mesajicerik']);
    const timestamp = resolveKey(['timelabel', 'timestamp', 'time', 'zaman', 'tarih', 'sent_at', 'paylasimzaman']);
    const isSystemRaw = resolveKey(['issystem', 'is_system', 'system_message', 'sistem']);
    const side = resolveKey(['side']);

    let sender: User | null = null;
    if (json.sender && typeof json.sender === 'object') {
      sender = User.fromAPI(json.sender);
    } else if (senderRaw) {
      sender = User.fromAPI({ 
        displayname: String(senderRaw),
        username: String(resolveKey(['kulladi', 'username', 'oyuncukullaniciadi']) || senderRaw),
        avatar: resolveKey(['authoravatar', 'avatar', 'chatimage', 'image', 'oyuncu_avatar', 'oyuncuminnakavatar', 'player_avatar', 'arkadasfoto', 'oyuncufoto', 'foto'])
      });
    }

    return new ChatMessage({
      id: String(id || Math.random().toString(36).substring(2, 9)),
      sender: sender,
      content: String(content || ''),
      timestamp: String(timestamp || ''),
      isSystem: isSystemRaw === 1 || isSystemRaw === true || false,
      isSelf: side === 'ben'
    });
  }
}
