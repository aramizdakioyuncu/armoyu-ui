/**
 * Represents a score/entry in a project's leaderboard in the UI.
 */
export class ProjectScore {
  projectId: string = '';
  playerName: string = '';
  score: number = 0;

  constructor(data: Partial<ProjectScore>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a ProjectScore object from an API response.
   */
  static fromAPI(json: Record<string, any>): ProjectScore {
    if (!json) return new ProjectScore({});
    return new ProjectScore({
      projectId: String(json.proje_ID || ''),
      playerName: json.proje_oyuncu || '',
      score: Number(json.proje_skor || 0)
    });
  }
}
