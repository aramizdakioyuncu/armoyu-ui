import { BaseModel } from '../BaseModel';
import { User } from '../auth/User';
import { SurveyAnswer } from './SurveyAnswer';

/**
 * Represents a community Survey (Anket) in the ARMOYU platform.
 */
export class Survey extends BaseModel {
  id: string = '';
  question: string = '';
  description?: string = '';
  options: SurveyAnswer[] = [];
  author: User | null = null;
  createdAt: string = '';
  expiresAt?: string = '';
  totalVotes: number = 0;
  
  // Current user's interaction state
  hasVoted: boolean = false;
  myVoteId?: string = '';

  constructor(data: Partial<Survey>) {
    super();
    Object.assign(this, data);
    this.totalVotes = this.options.reduce((sum, opt) => sum + opt.votes, 0);
  }

  /**
   * Helper to get percentage for a specific option.
   */
  getOptionPercentage(optionId: string): number {
    const option = this.options.find(o => o.id === optionId);
    if (!option || this.totalVotes === 0) return 0;
    return Math.round((option.votes / this.totalVotes) * 100);
  }

  /**
   * Instantiates a Survey object from an API response.
   */
  static fromAPI(json: Record<string, any>): Survey {
    if (!json) return new Survey({});

    return new Survey({
      id: String(json.id || json.anketID || ''),
      question: json.question || json.anketsoru || '',
      description: json.description || json.anketaciklama || '',
      options: Array.isArray(json.options || json.secenekler) ? (json.options || json.secenekler).map((o: any) => SurveyAnswer.fromAPI(o)) : [],
      author: json.author ? User.fromAPI(json.author) : (json.person_armoID ? User.fromAPI({
        id: json.person_armoID,
        ad: json.person_ad,
        soyad: json.person_soyad,
        avatar: json.person_foto
      }) : null),
      createdAt: json.createdAt || json.eklemezaman || '',
      expiresAt: json.expiresAt || json.bitiszaman || '',
      totalVotes: Number(json.totalVotes || json.toplamoy || 0),
      hasVoted: !!(json.hasVoted || json.katildim),
      myVoteId: String(json.myVoteId || ''),
    });
  }
}
