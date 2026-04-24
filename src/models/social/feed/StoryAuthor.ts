/**
 * Minimal user model specifically for Story displays.
 */
export class StoryAuthor {
  username: string = '';
  displayName: string = '';
  avatar: string = '';
  isMe: boolean = false;

  constructor(data: Partial<StoryAuthor>) {
    Object.assign(this, data);
  }

  static fromAPI(json: Record<string, any>): StoryAuthor {
    if (!json) return new StoryAuthor({});

    return new StoryAuthor({
      username: json.authorUsername || json.oyuncuadi || json.kullaniciadi || json.username || '',
      displayName: json.authorName || json.oyuncuadi || json.adsoyad || json.displayname || json.username || '',
      avatar: json.authorAvatar || json.oyuncuavatar || json.avatar || json.oyuncu_avatar || '',
      isMe: json.hikayeben === 1 || json.isMe === true || false
    });
  }
}
