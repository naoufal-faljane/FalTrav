// Adsterra Configuration File
// All ad settings and configurations in one place

export interface AdConfig {
  key: string;
  enabled: boolean;
  placement: 'header' | 'sidebar' | 'footer' | 'in-article' | 'sticky' | 'popup' | 'notification';
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  delayMs?: number;
  frequencyHours?: number;
}

export interface AdManagerConfig {
  [key: string]: AdConfig;
}

// Configuration for all Adsterra ads
export const adConfig: AdManagerConfig = {
  // Banner 300x250 - for in-article or sidebar
  'a425a9ba84b0de190841de26b949448c': {
    key: 'a425a9ba84b0de190841de26b949448c',
    enabled: true,
    placement: 'in-article',
  },

  // Skyscraper 160x600 - for sidebar
  'bffd773e654446e24e77e661c6dce759': {
    key: 'bffd773e654446e24e77e661c6dce759',
    enabled: true,
    placement: 'sidebar',
    desktopOnly: true,
  },

  // Popunder ad
  '45e2c1252aed751f164908f0b02d9e17': {
    key: '45e2c1252aed751f164908f0b02d9e17',
    enabled: true,
    placement: 'popup',
    delayMs: 5000, // Delay in ms before showing
    frequencyHours: 1, // Show once per hour
  },

  // SmartLink configuration
  'smartlink': {
    key: 'a8e77dedbcfc76e7bab9ed12d4091a97',
    enabled: true,
    placement: 'content',
  },
};

// Global ad settings
export const globalAdSettings = {
  enableDuplicateDetection: true,
  consentRequired: false, // Set to true if GDPR/privacy consent is required
  adBlockDetection: true,
  maxAdsPerPage: 3,
  respectDNT: true,
  lazyLoad: true,
};