import { User } from '../auth/User';
import { Group } from '../community/Group';

export interface ProjectAuthor {
  user: User;
  role: string;
}

/**
 * Represents a Project in the ARMOYU platform.
 */
export class Project {
  id: string = '';
  name: string = '';
  description: string = '';
  status: string = '';
  image: string = '';
  url: string = '';
  githubUrl: string = '';
  authors: ProjectAuthor[] = [];
  group: Group | null = null;
  techStack: string[] = [];

  constructor(data: Partial<Project>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Project object from an API response.
   */
  static fromAPI(json: Record<string, any>): Project {
    if (!json) return new Project({});

    return new Project({
      id: String(json.id || ''),
      name: json.name || json.title || '',
      description: json.description || '',
      status: json.status || '',
      image: json.image || json.thumb || '',
      url: json.url || json.demoUrl || '',
      githubUrl: json.githubUrl || json.github || '',
      authors: Array.isArray(json.authors) ? json.authors.map((a: any) => ({
         user: User.fromAPI(a.user || a),
         role: a.role || 'Geliştirici'
      })) : [],
      group: json.group ? Group.fromAPI(json.group) : null,
      techStack: Array.isArray(json.techStack) ? json.techStack : [],
    });
  }
}
