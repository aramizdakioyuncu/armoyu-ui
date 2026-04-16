import { User } from '@armoyu/core';
import { PostCardProps } from '../../components/modules/posts/widgets/PostCard';

/**
 * Standardizes API post objects into PostCardProps for UI components.
 * Handles different field naming conventions across ARMOYU API versions.
 */
export function mapApiPostToCardProps(p: any): PostCardProps {
  if (!p || typeof p !== 'object') {
    return {
      id: Math.random().toString(),
      author: null,
      content: '',
      createdAt: 'Şimdi',
      stats: { likes: 0, comments: 0, shares: 0 }
    };
  }

  // Handle media mapping
  let media: any[] = [];
  if (Array.isArray(p.media)) {
    media = p.media;
  } else if (Array.isArray(p.paylasimfoto)) {
    media = p.paylasimfoto.map((f: any) => ({
      type: 'image',
      url: f.fotourl || f.fotoufakurl || f.url
    }));
  } else if (p.imageUrl) {
    media = [{ type: 'image', url: p.imageUrl }];
  }

  return {
    id: p.id?.toString() || p.postID?.toString() || Math.random().toString(),
    author: p.author || p.owner || null,
    content: p.content || p.paylasimicerik || '',
    media: media,
    createdAt: p.createdAt || p.paylasimzaman || 'Şimdi',
    stats: {
      likes: p.stats?.likes ?? p.likesCount ?? p.begenisay ?? 0,
      comments: p.stats?.comments ?? p.commentsCount ?? p.yorumsay ?? 0,
      reposts: p.stats?.reposts ?? p.repostsay ?? 0,
      shares: p.stats?.shares ?? p.sikayetsay ?? 0
    },
    hashtags: p.hashtags || [],
    repostOf: p.repostOf || null,
    likeList: Array.isArray(p.likeList) ? p.likeList.map((l: any) => User.fromJSON(l)) : [],
    repostList: Array.isArray(p.repostList) ? p.repostList.map((r: any) => User.fromJSON(r)) : [],
    commentList: p.commentList || []
  };
}
