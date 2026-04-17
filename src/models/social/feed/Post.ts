import { BaseModel } from '../../BaseModel';
import { User } from '../../auth/User';
import { Comment } from './Comment';


/**
 * Represents a Social Post.
 */
export class Post extends BaseModel {
  id: string = '';
  author: User | null = null;
  content: string = '';
  media: string[] = [];
  timestamp: string = '';
  likeCount: number = 0;
  commentCount: number = 0;
  isLiked: boolean = false;
  comments: Comment[] = [];
  likeList: User[] = [];

  constructor(data: Partial<Post>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Maps a raw API response (PostResponse) to a UI-friendly Post instance.
   */
  static fromAPI(json: any): Post {
    if (!json) return new Post({});

    return new Post({
      id: String(json.id || json.paylasimid || json.paylasim_id || json.post_id || json.postID || json.sosyalid || json.sosyal_id || json.owner?.paylasimid || json.oyuncu?.paylasim_id || ''),
      author: (json.owner || json.author || json.oyuncu || json.oyuncuID || json.oyuncu_ID) ? User.fromAPI(json.owner || json.author || json.oyuncu || json) : null,
      content: json.paylasimicerik || json.content || json.icerik || json.text || json.paylasimmetin || json.paylasim_metin || json.paylasim_icerik || json.sosyalicerik || json.sosyal_icerik || '',
      media: Array.isArray(json.media) ? json.media : (Array.isArray(json.paylasimfoto) ? json.paylasimfoto.map((f: any) => f.fotourl || f.url || f.media_URL) : (Array.isArray(json.owner?.paylasimfoto) ? json.owner.paylasimfoto.map((f: any) => f.fotourl || f.url || f.media_URL) : (json.resim || json.paylasimresim || json.paylasim_resim ? [json.resim || json.paylasimresim || json.paylasim_resim] : []))),
      timestamp: json.paylasimzaman || json.timestamp || json.tarih || json.created_at || json.paylasim_zaman || json.zaman || '',
      likeCount: Number(json.begenisay || json.likeCount || json.begeni_sayi || 0),
      commentCount: Number(json.yorumsay || json.commentCount || json.yorum_sayi || 0),
      isLiked: json.benbegendim === 1 || json.isLiked === true || json.begendi === 1 || false,
      comments: Array.isArray(json.ilkucyorum) ? json.ilkucyorum.map((c: any) => Comment.fromAPI(c)) : 
                (Array.isArray(json.comments) ? json.comments.map((c: any) => Comment.fromAPI(c)) : 
                (Array.isArray(json.yorumlar) ? json.yorumlar.map((c: any) => Comment.fromAPI(c)) : 
                (Array.isArray(json.yorum_liste) ? json.yorum_liste.map((c: any) => Comment.fromAPI(c)) : []))),
      likeList: Array.isArray(json.paylasimilkucbegenen) ? json.paylasimilkucbegenen.map((l: any) => User.fromAPI(l)) : []
    });
  }
}
