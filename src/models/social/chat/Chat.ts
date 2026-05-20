import { User } from '../../auth/User';
import { ChatMessage } from './Message';

/**
 * Represents a Chat conversation or summary in the UI.
 */
export class Chat {
  id: string = '';
  uid: string = '';
  username: string = ''; // Added to match with socket sender
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
  chatType: 'ozel' | 'grup' = 'ozel';
  messages: ChatMessage[] = [];

  constructor(data: Partial<Chat>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Chat object from an API response.
   */
  static fromAPI(json: Record<string, any>): Chat {
    if (!json) return new Chat({});

    const idStr = String(json.id || '');
    const typeStr = json.type === 'grup' ? 'grup' : 'ozel';

    let lastMsgModel = null;
    if (json.lastMessage) {
      if (typeof json.lastMessage === 'string') {
        lastMsgModel = new ChatMessage({ content: json.lastMessage, timestamp: json.lastLogin || '' });
      } else {
        lastMsgModel = ChatMessage.fromAPI(json.lastMessage);
      }
    }

    return new Chat({
      id: idStr,
      uid: `${typeStr}-${idStr}`,
      username: json.username || '',
      name: json.displayName || json.username || '',
      avatar: json.avatar || '',
      lastMessage: lastMsgModel,
      time: json.lastLogin || '', 
      unreadCount: Number(json.unreadCount || 0),
      isOnline: json.lastLogin === 'Çevrimiçi',
      lastSeen: json.lastLogin || '',
      updatedAt: Date.now(),
      isGroup: typeStr === 'grup',
      chatType: typeStr,
      messages: []
    });
  }
}
