import { User } from '../../auth/User';
import { Comment } from './Comment';


/**
 * Represents a Social Post.
 */
export class Post {
  id: string = '';
  author: User | null = null;
  content: string = '';
  media: { type: 'image' | 'video' | 'audio', url: string }[] = [];
  timestamp: string = '';
  likeCount: number = 0;
  commentCount: number = 0;
  isLiked: boolean = false;
  comments: Comment[] = [];
  likeList: User[] = [];
  device?: 'mobile' | 'web';
  timeLabel?: string;
  location?: string;

  constructor(data: Partial<Post>) {
    Object.assign(this, data);
  }

  /**
   * Maps a raw API response (PostResponse) to a UI-friendly Post instance.
   */
  static fromAPI(json: any): Post {
    if (!json) return new Post({});

    return new Post({
      id: String(json.id || json.postID || json.paylasimid || json.paylasim_id || json.post_id || json.sosyalid || json.sosyal_id || ''),
      author: (json.owner || json.author || json.oyuncu || json.oyuncuID) ? User.fromAPI(json.owner || json.author || json.oyuncu || json) : null,
      content: json.content || json.paylasimicerik || json.icerik || json.text || json.paylasimmetin || '',
      media: (Array.isArray(json.media) ? json.media : 
             (Array.isArray(json.mappedMedia) ? json.mappedMedia.map((m: any) => m.url) :
             (Array.isArray(json.paylasimfoto) ? json.paylasimfoto.map((f: any) => f.fotourl || f.url) : []))).map((url: string) => {
               const ext = url.split('.').pop()?.toLowerCase() || '';
               const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
               return { type: isVideo ? 'video' : 'image', url };
             }),
      timestamp: json.date || json.paylasimzaman || json.timestamp || json.tarih || json.created_at || '',
      likeCount: Number(json.likesCount || json.begenisay || 0),
      commentCount: Number(json.commentsCount || json.yorumsay || 0),
      isLiked: json.isLiked === true || json.benbegendim === 1 || false,
      comments: Array.isArray(json.topComments) ? json.topComments.map((c: any) => Comment.fromAPI(c)) : 
                (Array.isArray(json.ilkucyorum) ? json.ilkucyorum.map((c: any) => Comment.fromAPI(c)) : []),
      likeList: Array.isArray(json.topLikers) ? json.topLikers.map((l: any) => User.fromAPI(l)) :
                (Array.isArray(json.paylasimilkucbegenen) ? json.paylasimilkucbegenen.map((l: any) => User.fromAPI(l)) : 
                (Array.isArray(json.begenenler) ? json.begenenler.map((l: any) => User.fromAPI(l)) : 
                (Array.isArray(json.likes) ? json.likes.map((l: any) => User.fromAPI(l)) :
                (Array.isArray(json.likers) ? json.likers.map((l: any) => User.fromAPI(l)) : [])))),
      device: (['mobil', 'mobile', 'ios', 'android'].includes(json.device?.toLowerCase()) || Number(json.paylasimcihaz || json.cihaz) === 1) ? 'mobile' : 'web',
      timeLabel: json.paylasimzamangecen || json.timeLabel || '',
      location: json.paylasimkonum || json.location || ''
    });
  }
}
