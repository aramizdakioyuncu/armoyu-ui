/**
 * Represents an answer option in a Survey in the UI.
 */
export class SurveyAnswer {
  id: string = '';
  text: string = '';
  votes: number = 0;
  voterIds: string[] = [];

  constructor(data: Partial<SurveyAnswer>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a SurveyAnswer object from an API response.
   */
  static fromAPI(json: Record<string, any>): SurveyAnswer {
    if (!json) return new SurveyAnswer({});

    return new SurveyAnswer({
      id: String(json.id || json.secenekID || ''),
      text: json.text || json.answer || json.secenekyazi || '',
      votes: Number(json.votes || json.secenekoy || 0),
      voterIds: Array.isArray(json.voterIds) ? json.voterIds.map(String) : [],
    });
  }
}
