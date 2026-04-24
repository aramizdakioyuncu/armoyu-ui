/**
 * Represents a Support Ticket in the UI.
 */
export class SupportTicket {
  id: string = '';
  subject: string = '';
  category: string = '';
  status: string = '';
  priority: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  constructor(data: Partial<SupportTicket>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Support Ticket object from an API response.
   */
  static fromAPI(json: Record<string, any>): SupportTicket {
    if (!json) return new SupportTicket({});
    return new SupportTicket({
      id: String(json.id || json.destekid || ''),
      subject: json.subject || json.baslik || '',
      category: json.category || json.kategori || '',
      status: json.status || json.durum || '',
      priority: json.priority || json.oncelik || '',
      createdAt: json.createdAt || json.tarih || '',
      updatedAt: json.updatedAt || json.guncelleme || ''
    });
  }
}
