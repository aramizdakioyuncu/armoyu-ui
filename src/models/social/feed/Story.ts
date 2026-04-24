import { StoryAuthor } from './StoryAuthor';

/**
 * Represents a Social Story in the UI.
 */
export class Story {
  id: string = '';
  author: StoryAuthor | null = null;
  media: string = '';
  timestamp: string = '';
  isViewed: boolean = false;
  isRead: boolean = false;

  constructor(data: Partial<Story>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Story object from an API response.
   */
  static fromAPI(json: Record<string, any>): Story {
    if (!json) return new Story({});

    const isRead = json.isRead === true || json.izlendi === 1 || json.isViewed === true || false;

    // From Core StoryResponse: items, authorName, authorAvatar
    const firstItem = Array.isArray(json.items) && json.items.length > 0 ? json.items[0] : null;

    return new Story({
      id: String(firstItem?.id || json.id || json.hikayeid || json.hikayeID || ''),
      author: StoryAuthor.fromAPI(json),
      media: firstItem?.mediaUrl || json.media || json.resim || json.url || json.hikayemedya || '',
      timestamp: firstItem?.createdAt || json.timestamp || json.tarih || json.hikayezaman || '',
      isViewed: isRead,
      isRead: isRead
    });
  }
}
