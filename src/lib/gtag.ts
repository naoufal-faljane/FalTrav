declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Log the pageview with the gtag function
export const pageview = (url: string, customParams: any = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const userLocation = (window as any).userLocation;
    const params: any = {
      page_path: url,
      ...customParams
    };

    // Add location data if available
    if (userLocation) {
      params.custom_map = {
        ...(params.custom_map || {}),
        dimension1: 'user_city',
        dimension2: 'user_region', 
        dimension3: 'user_country'
      };
      params.user_city = userLocation.city;
      params.user_region = userLocation.region;
      params.user_country = userLocation.country;
    }

    window.gtag('config', 'G-WR9K1KTMF0', params);
  }
};

// Log specific events
export const event = ({ action, category, label, value, customParams }: { action: string; category: string; label: string; value: number; customParams?: any }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const userLocation = (window as any).userLocation;
    const params: any = {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams
    };

    // Add location data if available
    if (userLocation) {
      params.custom_map = {
        ...(params.custom_map || {}),
        dimension1: 'user_city',
        dimension2: 'user_region',
        dimension3: 'user_country'
      };
      params.user_city = userLocation.city;
      params.user_region = userLocation.region;
      params.user_country = userLocation.country;
    }

    window.gtag('event', action, params);
  }
};
