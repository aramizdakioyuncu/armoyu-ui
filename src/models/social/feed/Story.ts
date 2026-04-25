import { StoryAuthor } from './StoryAuthor';

/**
 * Represents a Social Story in the UI.
 * A Story can have multiple media items from the same author.
 */
export class Story {
  id: string = '';
  author: StoryAuthor | null = null;
  media: string = '';
  /** All media items for this story group (multiple stories from same author) */
  items: { 
    id: string; 
    media: string; 
    type: 'image' | 'video' | 'audio';
    timestamp: string; 
    isRead: boolean;
    isLiked?: boolean;
    likeCount?: number;
    viewCount?: number;
  }[] = [];
  timestamp: string = '';
  isViewed: boolean = false;
  isRead: boolean = false;

  constructor(data: Partial<Story>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Story object from a Core StoryResponse.
   * Maps the nested items array into a flat Story with all media.
   */
  static fromAPI(json: Record<string, any>): Story {
    if (!json) return new Story({});

    const isReadStatus = json.isRead === true || json.isSeen === true || false;

    // Core StoryResponse: { authorId, authorName, authorUsername, authorAvatar, items: [...] }
    const coreItems = Array.isArray(json.items) ? json.items : [];

    // Her item'ı basit bir yapıya dönüştür
    const storyItems = coreItems.map((item: any) => {
      // Detect type
      let type: 'image' | 'video' | 'audio' = 'image';
      const url = item.mediaUrl || '';
      const ext = url.split('.').pop()?.toLowerCase();
      if (['mp4', 'webm', 'ogg', 'mov'].includes(ext || '')) {
        type = 'video';
      } else if (['mp3', 'wav', 'mpeg'].includes(ext || '')) {
        type = 'audio';
      }

      return {
        id: String(item.id || 0),
        media: url,
        type,
        timestamp: item.createdAt || '',
        isRead: item.isSeen === true || item.isMe === true || false,
        isLiked: item.isLiked === true || false,
        likeCount: item.likeCount || 0,
        viewCount: item.viewCount || 0
      };
    });

    const firstItem = coreItems.length > 0 ? coreItems[0] : null;

    return new Story({
      id: String(firstItem?.id || json.id || ''),
      author: StoryAuthor.fromAPI(json),
      media: firstItem?.mediaUrl || '',
      items: storyItems,
      timestamp: firstItem?.createdAt || '',
      isViewed: isReadStatus,
      isRead: isReadStatus
    });
  }
}
