import { User } from '../auth/User';

/**
 * Represents a Game Mod (Oyun Modu) in the ARMOYU platform.
 */
export class Mod {
  id: string = '';
  name: string = '';
  game: string = '';
  version: string = '';
  author: User | null = null;
  description: string = '';
  downloads: string = '';
  image: string = '';
  isFeatured: boolean = false;

  constructor(data: Partial<Mod>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Mod object from an API response.
   */
  static fromAPI(json: Record<string, any>): Mod {
    if (!json) return new Mod({});

    return new Mod({
      id: String(json.id || ''),
      name: json.name || json.title || '',
      game: json.game || '',
      version: json.version || '',
      author: json.author ? User.fromAPI(json.author) : (json.authorUsername ? new User({ username: json.authorUsername, displayName: json.authorName }) : null),
      description: json.description || json.desc || '',
      downloads: String(json.downloads || '0'),
      image: json.image || '',
      isFeatured: !!json.isFeatured,
    });
  }
}
