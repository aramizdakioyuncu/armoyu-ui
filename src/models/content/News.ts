import { User } from '../auth/User';
import { News as CoreNews } from '@armoyu/core';

/**
 * Represents a News item (Haber) in the ARMOYU platform.
 */
export class News {
  id: number = 0;
  slug: string = '';
  title: string = '';
  excerpt: string = '';
  content: string = '';
  date: string = '';
  relativeTime: string = '';
  category: string = '';
  image: string = '';
  thumbnail: string = '';
  fullImage: string = '';
  views: number = 0;
  
  // Author details
  authorId: number = 0;
  authorName: string = '';
  authorAvatar: string = '';
  author: User | null = null;

  constructor(data: Partial<News>) {
    Object.assign(this, data);
  }

  /**
   * Returns the absolute URL to the news article.
   */
  getUrl(): string {
    return `/haberler/${this.slug}`;
  }

  /**
   * Returns a truncated version of the content if excerpt is missing.
   */
  getSummary(length: number = 150): string {
    if (this.excerpt) return this.excerpt;
    if (!this.content) return '';
    return this.content.substring(0, length) + (this.content.length > length ? '...' : '');
  }

  /**
   * Instantiates a News object from an API response.
   */
  static fromAPI(json: Record<string, any>): News {
    if (!json) return new News({});

    // Core'dan gelen veride url veya link olabilir
    const link = json.url || json.link || '';
    let slug = json.slug || '';
    if (!slug && link) {
      const parts = link.split('/');
      slug = parts[parts.length - 1];
    }

    // Core Mapper (NewsMapper) veriyi id, title, summary, thumbnail olarak çeviriyor
    return new News({
      id: Number(json.id || json.haberID || 0),
      slug: slug,
      title: json.title || json.haberbaslik || '',
      excerpt: json.summary || json.ozet || json.excerpt || '',
      content: json.content || json.icerik || '',
      date: json.date || json.zaman || '',
      relativeTime: json.relativeTime || json.gecenzaman || '',
      category: json.category || json.kategori || '',
      // Core'da 'thumbnail' olarak gelen alan asıl resmimiz
      image: json.thumbnail || json.image || json.resim || '',
      thumbnail: json.thumbnail || json.resimminnak || '',
      fullImage: json.fullImage || json.resimorijinal || '',
      views: Number(json.views || json.goruntulen || 0),
      authorId: Number(json.authorId || json.yazarID || 0),
      authorName: json.authorName || json.author || json.yazar || '',
      authorAvatar: json.authorAvatar || json.yazaravatar || '',
      author: json.author ? (typeof json.author === 'object' ? User.fromAPI(json.author) : new User({ displayName: json.author })) : null,
    });
  }

  /**
   * Instantiates a News object from a Core Entity.
   */
  static fromClass(entity: CoreNews): News {
    if (!entity) return new News({});

    const json = entity.toJSON();
    return this.fromAPI(json);
  }
}
