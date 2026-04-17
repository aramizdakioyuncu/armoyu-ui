import { BaseModel } from '../BaseModel';

/**
 * System Settings Model for the UI.
 * Designed to manage platform-wide settings from a single point.
 */
export class SystemSettings extends BaseModel {
  siteTitle: string;
  siteDescription: string;
  isMaintenanceMode: boolean;
  isRegistrationOpen: boolean;
  contactEmail: string;
  version: string;
  socialLinks: {
    discord?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
  };
  branding: {
    logoUrl?: string;
    faviconUrl?: string;
    primaryColor?: string;
  };

  constructor(data: Partial<SystemSettings> = {}) {
    super();
    this.siteTitle = data.siteTitle || 'ARMOYU - Aramızdaki Oyuncu';
    this.siteDescription = data.siteDescription || 'Türkiye\'nin en büyük oyun topluluğu ve gelişim platformu.';
    this.isMaintenanceMode = data.isMaintenanceMode || false;
    this.isRegistrationOpen = data.isRegistrationOpen || true;
    this.contactEmail = data.contactEmail || 'iletisim@armoyu.com';
    this.version = data.version || 'v3.5.0-v2';
    this.socialLinks = data.socialLinks || {
      discord: 'https://discord.gg/armoyu',
      youtube: 'https://youtube.com/armoyu',
      instagram: 'https://instagram.com/armoyu',
      twitter: 'https://twitter.com/armoyu',
      github: 'https://github.com/armoyu'
    };
    this.branding = data.branding || {
      logoUrl: 'https://v3.armoyu.com/logo.png',
      faviconUrl: 'https://v3.armoyu.com/favicon.ico',
      primaryColor: '#3b82f6'
    };
  }

  /**
   * Instantiates a SystemSettings object from an API response.
   */
  static fromAPI(json: Record<string, any>): SystemSettings {
    if (!json) return new SystemSettings({});
    
    return new SystemSettings({
      siteTitle: json.siteTitle || json.site_title || '',
      siteDescription: json.siteDescription || json.site_description || '',
      isMaintenanceMode: !!(json.isMaintenanceMode || json.maintenance_mode),
      isRegistrationOpen: json.isRegistrationOpen !== undefined ? !!json.isRegistrationOpen : true,
      contactEmail: json.contactEmail || json.contact_email || '',
      version: json.version || '',
      socialLinks: json.socialLinks || json.social_links || {},
      branding: json.branding || {}
    });
  }

  /**
   * Creates a copy of the settings (for state management).
   */
  clone(): SystemSettings {
    return new SystemSettings(JSON.parse(JSON.stringify(this)));
  }

  /**
   * Toggles maintenance mode.
   */
  toggleMaintenance() {
    this.isMaintenanceMode = !this.isMaintenanceMode;
  }
}
