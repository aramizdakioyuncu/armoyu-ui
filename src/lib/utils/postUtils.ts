import { User } from '../../models/auth/User';
import { Post } from '../../models/social/feed/Post';
import { PostCardProps } from '../../components/modules/posts/widgets/PostCard';

/**
 * Standardizes API post objects into PostCardProps for UI components.
 * Uses the local Rich Post Model for initial mapping.
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

  // Use our new Rich mapping in the UI
  const richPost = Post.fromAPI(p);

  return {
    id: richPost.id || Math.random().toString(),
    author: richPost.author,
    content: richPost.content,
    media: richPost.media.map(url => ({ type: 'image', url })),
    createdAt: richPost.timestamp || 'Şimdi',
    stats: {
      likes: richPost.likeCount,
      comments: richPost.commentCount,
      reposts: 0, // Needs richer API DTO
      shares: 0
    },
    hashtags: [], // Can be extracted from content if needed
    repostOf: null,
    likeList: richPost.likeList,
    repostList: [],
    commentList: richPost.comments
  };
}
