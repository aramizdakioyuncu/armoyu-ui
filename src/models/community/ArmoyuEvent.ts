import { ArmoyuEvent as CoreEvent } from '@armoyu/core';

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
  static fromAPI(json: any): EventOrganizer {
    if (!json) return new EventOrganizer({});

    // If it's already a clean object or entity with standard naming
    if (json.id && json.displayName && !json.player_ID) {
      return this.fromClass(json);
    }

    return new EventOrganizer({
      id: Number(json.player_ID || json.id || 0),
      displayName: json.player_displayname || json.displayName || '',
      avatar: json.player_avatar || json.avatar || ''
    });
  }

  /**
   * Instantiates an EventOrganizer from a core Entity class.
   */
  static fromClass(entity: any): EventOrganizer {
    return new EventOrganizer({
      id: entity.id,
      displayName: entity.displayName,
      avatar: entity.avatar
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
  minOdp: number = 0;

  location: string = '';
  description: string = '';
  rules: string = '';

  constructor(data: Partial<ArmoyuEvent>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates an ArmoyuEvent object from an API response.
   */
  static fromAPI(json: any): ArmoyuEvent {
    if (!json) return new ArmoyuEvent({});

    // If it's already a core Entity or has the clean property structure
    if (json.id && json.name && !json.event_ID) {
      return this.fromClass(json);
    }

    // Map organizer list (supports both raw and mapped formats)
    const organizersRaw = json.event_organizer || json.organizers || [];
    const organizers: EventOrganizer[] = organizersRaw.map((o: any) => EventOrganizer.fromAPI(o));

    return new ArmoyuEvent({
      id: Number(json.event_ID || json.id || 0),
      name: json.event_name || json.name || json.title || '',
      status: Number(json.event_status || json.status || 0),
      link: (json.event_link || json.link || json.url || '').replace(/^https?:\/\/[^\/]+/, '').replace(/^([^\/])/, '/$1'),
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
      minOdp: Number(json.event_minodp || json.minOdp || 0),


      location: json.event_location || json.location || '',
      description: json.event_description || json.description || json.icerik || '',
      rules: json.event_rules || json.rules || ''
    });
  }

  /**
   * Instantiates an ArmoyuEvent from a core Entity class.
   */
  static fromClass(entity: CoreEvent): ArmoyuEvent {
    const organizers = (entity.organizers || []).map((o: any) => EventOrganizer.fromClass(o));

    return new ArmoyuEvent({
      id: entity.id,
      name: entity.name,
      status: entity.status,
      link: (entity.url || '').replace(/^https?:\/\/[^\/]+/, '').replace(/^([^\/])/, '/$1'),
      thumbnail: entity.logo || '',
      image: entity.banner,
      gameId: entity.gameId,
      gameName: entity.gameName,
      gameLogo: entity.gameLogo,
      gameBanner: entity.gameBanner,
      organizers: organizers,
      type: entity.category || '',
      date: entity.date,
      participantType: entity.participantType || '',
      participantLimit: entity.participantLimit,
      groupPlayerLimit: entity.groupPlayerLimit,
      currentParticipants: entity.participantCount,
      location: entity.location,
      description: entity.description,
      rules: entity.rules,
      minOdp: (entity as any).minOdp || 0

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
