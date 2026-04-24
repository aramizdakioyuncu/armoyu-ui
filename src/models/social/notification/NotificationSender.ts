/**
 * Represents the entity that sent a notification in the UI.
 */
export class NotificationSender {
  id: string = '';
  name: string = '';
  avatar: string = '';
  type: 'USER' | 'GROUP' | 'SYSTEM' = 'SYSTEM';
  url?: string;

  constructor(data: Partial<NotificationSender>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a NotificationSender object from an API response.
   */
  static fromAPI(json: Record<string, any>): NotificationSender {
    if (!json) return new NotificationSender({});

    return new NotificationSender({
      id: String(json.id || json.senderid || ''),
      name: json.name || json.displayname || json.ad || '',
      avatar: json.avatar || json.foto || '',
      type: json.type || 'SYSTEM',
      url: json.url || ''
    });
  }
}
