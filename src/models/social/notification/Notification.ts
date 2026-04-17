import { BaseModel } from '../../BaseModel';
import { NotificationType, NotificationPriority, NotificationStatus } from './NotificationEnums';
import { NotificationSender } from './NotificationSender';

/**
 * Represents a System or User Notification in the UI.
 */
export class Notification extends BaseModel {
  id: string = '';
  type: NotificationType = NotificationType.SYSTEM;
  priority: NotificationPriority = NotificationPriority.MEDIUM;
  status: NotificationStatus = NotificationStatus.UNREAD;
  title: string = '';
  message: string = '';
  sender: NotificationSender | null = null;
  link: string = '';
  createdAt: string = '';
  metaData: Record<string, any> = {};

  constructor(data: Partial<Notification>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Notification object from an API response.
   */
  static fromAPI(json: Record<string, any>): Notification {
    if (!json) return new Notification({});

    const resolveKey = (keys: string[]): any => {
      const foundKey = Object.keys(json).find(k => keys.includes(k.toLowerCase()));
      return foundKey ? json[foundKey] : undefined;
    };

    const typeStr = resolveKey(['type', 'bildirimturu', 'tür']);
    let nType = NotificationType.SYSTEM;
    if (typeStr) {
      const typeMap: Record<string, NotificationType> = {
        'arkadaslik_istegi': NotificationType.FRIEND_REQUEST,
        'arkadaslik_kabul': NotificationType.FRIEND_ACCEPT,
        'begeni': NotificationType.POST_LIKE,
        'yorum': NotificationType.POST_COMMENT,
        'etiket': NotificationType.POST_MENTION,
        'grup_davet': NotificationType.GROUP_INVITE,
        'grup_kabul': NotificationType.GROUP_ACCEPT,
        'sistem': NotificationType.SYSTEM,
        'mesaj': NotificationType.CHAT_MESSAGE,
        'seviye': NotificationType.LEVEL_UP,
        'odul': NotificationType.AWARD
      };
      nType = typeMap[typeStr] || NotificationType.SYSTEM;
    }

    const priorityVal = resolveKey(['priority', 'oncelik']);
    const statusVal = resolveKey(['status', 'durum', 'okundu']);

    return new Notification({
      id: String(resolveKey(['id', 'bildirimbakid', 'bildirimid']) || ''),
      type: nType,
      priority: typeof priorityVal === 'number' ? priorityVal : NotificationPriority.MEDIUM,
      status: (statusVal === 1 || statusVal === true) ? NotificationStatus.READ : NotificationStatus.UNREAD,
      title: resolveKey(['title', 'baslik']) || '',
      message: resolveKey(['message', 'icerik', 'mesaj', 'text']) || '',
      sender: resolveKey(['sender', 'gonderen']) ? NotificationSender.fromAPI(resolveKey(['sender', 'gonderen'])) : null,
      link: resolveKey(['link', 'url', 'baglanti']) || '',
      createdAt: resolveKey(['createdat', 'tarih', 'zaman']) || '',
      metaData: json.meta || json.extra || {}
    });
  }
}
