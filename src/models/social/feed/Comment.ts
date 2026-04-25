import { User } from '../../auth/User';

/**
 * Represents a Comment on a Post.
 */
export class Comment {
  id: string = '';
  author: User | null = null;
  content: string = '';
  timestamp: string = '';
  // Compatibility aliases for UI
  date: string = '';
  createdAt: string = '';
  
  likeCount: number = 0;
  isLiked: boolean = false;
  replies: Comment[] = [];

  constructor(data: Partial<Comment>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Comment object from an API response.
   */
  static fromAPI(json: any): Comment {
    if (!json) return new Comment({});
    
    return new Comment({
      id: String(json.id || json.yorumid || json.yorum_id || json.paylasimyorumid || json.yorumID || Math.random().toString(36).substr(2, 9)),
      author: (json.author || json.oyuncu || json.authorDisplayName || json.yorumcuadsoyad || json.adsoyad || json.yazar_adsoyad) 
        ? User.fromAPI(json.author || json.oyuncu || { 
            id: json.authorId || json.oyuncuID || json.oyuncuid || json.yorumcuid || json.yazar_id || 0,
            displayName: json.authorDisplayName || json.yorumcuadsoyad || json.paylasimyorum_yapan_adsoyad || json.adsoyad || json.yazar_adsoyad || json.oyuncu_adsoyad || json.displayName || json.displayname,
            avatar: json.authorAvatar || json.authorSmallAvatar || json.yorumcuavatar || json.yorumcuufakavatar || json.paylasimyorum_yapan_avatar || json.yazar_avatar || json.oyuncu_avatar || json.avatar,
            username: json.authorUsername || json.yorumcukullaniciad || json.paylasimyorum_yapan_kullaniciadi || json.kullaniciadi || json.yazar_kullaniciad || json.username || json.kullaniciad
          }) 
        : null,
      content: json.content || json.icerik || json.comment || json.text || json.yorumcuicerik || json.paylasimyorum_icerik || '',
      timestamp: json.timestamp || json.tarih || json.created_at || json.zaman || json.yorumcuzaman || json.paylasimyorum_zaman || '',
      date: json.timestamp || json.tarih || json.created_at || json.zaman || json.yorumcuzaman || json.paylasimyorum_zaman || '',
      createdAt: json.timestamp || json.tarih || json.created_at || json.zaman || json.yorumcuzaman || json.paylasimyorum_zaman || '',
      likeCount: Number(json.likeCount || json.begeni_sayi || json.begenisay || 0),
      isLiked: json.isLiked === true || json.begendi === 1 || json.benbegendim === 1 || false,
      replies: Array.isArray(json.replies) ? json.replies.map((r: any) => Comment.fromAPI(r)) : 
               (Array.isArray(json.yanitlar) ? json.yanitlar.map((r: any) => Comment.fromAPI(r)) : [])
    });
  }
}
