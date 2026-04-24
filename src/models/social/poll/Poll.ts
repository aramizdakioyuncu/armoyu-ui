import { PollOption } from './PollOption';

/**
 * Represents a Social Poll in the UI.
 */
export class Poll {
  id: string = '';
  question: string = '';
  options: PollOption[] = [];
  totalVotes: number = 0;
  expiresAt: string = '';
  isClosed: boolean = false;
  allowMultiple: boolean = false;

  constructor(data: Partial<Poll>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Poll object from an API response.
   */
  static fromAPI(json: Record<string, any>): Poll {
    if (!json) return new Poll({});
    return new Poll({
      id: String(json.id || json.anketid || ''),
      question: json.question || json.soru || '',
      options: Array.isArray(json.options || json.secenekler) ? (json.options || json.secenekler).map((o: any) => PollOption.fromAPI(o)) : [],
      totalVotes: Number(json.totalVotes || json.toplam_oy || 0),
      expiresAt: json.expiresAt || json.bitis_tarih || '',
      isClosed: json.isClosed === true || json.durum === 0 || false,
      allowMultiple: json.allowMultiple === true || json.coklu_secim === 1 || false
    });
  }
}
