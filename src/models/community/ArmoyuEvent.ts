/**
 * Represents an entity that organizes an event.
 */
export class EventOrganizer {
  id: number = 0;
  displayName: string = '';
  avatar: string = '';

  constructor(data: Partial<EventOrganizer>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates an EventOrganizer object from an API response.
   */
  static fromAPI(json: Record<string, any>): EventOrganizer {
    if (!json) return new EventOrganizer({});
    return new EventOrganizer({
      id: Number(json.player_ID || json.id || 0),
      displayName: json.player_displayname || json.displayName || '',
      avatar: json.player_avatar || json.avatar || ''
    });
  }
}

/**
 * Represents an ARMOYU platform event (tournament, meeting, etc.) in the UI.
 */
export class ArmoyuEvent {
  id: number = 0;
  name: string = '';
  status: number = 0;
  link: string = '';
  thumbnail: string = '';
  image?: string;
  
  // Game details
  gameId: number = 0;
  gameName: string = '';
  gameLogo: string = '';
  gameBanner: string = '';

  // Organizer details
  organizers: EventOrganizer[] = [];

  // Event specifics
  type: string = ''; // e.g. 'bireysel', 'gruplu'
  date: string = ''; // Format: DD.MM.YYYY HH:mm
  participantType: string = ''; // e.g. 'herkes'
  participantLimit: number = 0;
  groupPlayerLimit: number = 0;
  currentParticipants: number = 0;
  
  location: string = '';
  description: string = '';
  rules: string = '';

  constructor(data: Partial<ArmoyuEvent>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates an ArmoyuEvent object from an API response.
   */
  static fromAPI(json: Record<string, any>): ArmoyuEvent {
    if (!json) return new ArmoyuEvent({});

    // Map organizer list (supports both raw and mapped formats)
    const organizersRaw = json.event_organizer || json.organizers || [];
    const organizers: EventOrganizer[] = organizersRaw.map((o: any) => EventOrganizer.fromAPI(o));

    return new ArmoyuEvent({
      id: Number(json.event_ID || json.id || 0),
      name: json.event_name || json.name || json.title || '',
      status: Number(json.event_status || json.status || 0),
      link: json.event_link || json.link || json.url || '',
      thumbnail: json.event_foto || json.logo || json.thumbnail || json.banner || '',
      image: json.event_fotodetail || json.image || json.banner || undefined,
      
      gameId: Number(json.event_gameID || json.gameId || 0),
      gameName: json.event_gamename || json.gameName || '',
      gameLogo: json.event_gamelogo || json.gameLogo || '',
      gameBanner: json.event_gamebanner || json.gameBanner || '',

      organizers: organizers,

      type: json.event_type || json.type || json.category || '',
      date: json.event_date || json.date || json.time || '',
      participantType: json.event_participanttype || json.participantType || '',
      participantLimit: Number(json.event_participantlimit || json.participantLimit || 0),
      groupPlayerLimit: Number(json.event_participantgroupplayerlimit || json.groupPlayerLimit || 0),
      currentParticipants: Number(json.event_participantcurrent || json.currentParticipants || json.participantCount || 0),

      location: json.event_location || json.location || '',
      description: json.event_description || json.description || json.icerik || '',
      rules: json.event_rules || json.rules || ''
    });
  }

  /**
   * Checks if the event has space for more participants.
   */
  hasSpace(): boolean {
    return this.participantLimit === 0 || this.currentParticipants < this.participantLimit;
  }

  /**
   * Returns a formatted progress string for participants (e.g. "12/16").
   */
  getParticipantProgress(): string {
    const limit = this.participantLimit === 0 ? "∞" : this.participantLimit;
    return `${this.currentParticipants}/${limit}`;
  }
}
