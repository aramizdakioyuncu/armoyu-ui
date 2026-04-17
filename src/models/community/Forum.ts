import { BaseModel } from '../BaseModel';

/**
 * Represents a Forum Board (Forum Bölümü) in the ARMOYU platform.
 */
export class Forum extends BaseModel {
  id: string = '';
  name: string = '';
  desc: string = '';
  topicCount: number = 0;
  postCount: number = 0;
  lastPost?: {
    topicTitle: string;
    author: string;
    avatar: string;
    time: string;
  };

  constructor(data: Partial<Forum>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Returns the absolute URL to the forum board.
   */
  getUrl(): string {
    return `/forum/${this.id}`;
  }

  /**
   * Instantiates a Forum object from an API response.
   */
  static fromAPI(json: Record<string, any>): Forum {
    if (!json) return new Forum({});

    return new Forum({
      id: String(json.id || ''),
      name: json.name || json.title || '',
      desc: json.desc || json.description || '',
      topicCount: Number(json.topicCount || 0),
      postCount: Number(json.postCount || 0),
      lastPost: json.lastPost || undefined,
    });
  }
}
