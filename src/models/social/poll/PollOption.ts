/**
 * Represents an option in a Poll in the UI.
 */
export class PollOption {
  id: string = '';
  text: string = '';
  votes: number = 0;
  isVoted: boolean = false;

  constructor(data: Partial<PollOption>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a PollOption object from an API response.
   */
  static fromAPI(json: Record<string, any>): PollOption {
    if (!json) return new PollOption({});
    return new PollOption({
      id: String(json.id || json.secenekid || ''),
      text: json.text || json.secenek || '',
      votes: Number(json.votes || json.oy_sayi || 0),
      isVoted: json.isVoted === true || json.secildi === 1 || false
    });
  }
}
