import { BaseModel } from '../BaseModel';

/**
 * Represents a Platform Rule (Kural) in the UI.
 */
export class Rule extends BaseModel {
  id: number = 0;
  text: string = '';
  penalty: string = '';
  createdAt: string = '';
  subArticle: string | null = null;

  constructor(data: Partial<Rule>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Rule object from an API response.
   */
  static fromAPI(json: Record<string, any>): Rule {
    if (!json) return new Rule({});
    return new Rule({
      id: Number(json.id || json.kuralid || 0),
      text: json.text || json.kuralicerik || '',
      penalty: json.penalty || json.cezabaslangic || '',
      createdAt: json.createdAt || json.cezakoyulmatarihi || '',
      subArticle: json.subArticle || json.kuralaltmadde || null
    });
  }
}
