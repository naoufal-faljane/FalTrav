// Adsterra Configuration File
// All ad settings and configurations in one place

export interface AdConfig {
  key: string;
  enabled: boolean;
  placement: 'header' | 'sidebar' | 'footer' | 'in-article' | 'sticky' | 'popup' | 'notification' | 'content';
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  delayMs?: number;
  frequencyHours?: number;
  format?: string;
  height?: number;
  width?: number;
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
    format: 'iframe',
    height: 250,
    width: 300,
  },

  // Skyscraper 160x600 - for sidebar
  'bffd773e654446e24e77e661c6dce759': {
    key: 'bffd773e654446e24e77e661c6dce759',
    enabled: true,
    placement: 'sidebar',
    desktopOnly: true,
    format: 'iframe',
    height: 600,
    width: 160,
  },

  // Popunder ad
  '45e2c1252aed751f164908f0b02d9e17': {
    key: '45e2c1252aed751f164908f0b02d9e17',
    enabled: true,
    placement: 'popup',
    delayMs: 5000, // Delay in ms before showing
    frequencyHours: 1, // Show once per hour
  },

  // Leaderboard 468x60 - for header
  '59a91338e2382528879afcab4f94a32c': {
    key: '59a91338e2382528879afcab4f94a32c',
    enabled: true,
    placement: 'header',
    format: 'iframe',
    height: 60,
    width: 468,
  },

  // Mobile Sticky 320x50 - for mobile devices
  'a1593f7dbeeec27923c535ee40c45244': {
    key: 'a1593f7dbeeec27923c535ee40c45244',
    enabled: true,
    placement: 'sticky',
    mobileOnly: true,
    format: 'iframe',
    height: 50,
    width: 320,
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