import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: ((...args: any[]) => void) | undefined;
    dataLayer: any[];
  }
}

// Enhanced analytics with location tracking
export const initGtag = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    window.dataLayer = window.dataLayer || [];

    // Define gtag function that pushes to dataLayer
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}`;
    document.head.appendChild(script);

    // Initialize gtag with our tracking ID
    script.onload = () => {
      window.gtag!('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        // Enable enhanced measurement
        enhanced_measurements: {
          scrolls: true,
          outbound_clicks: true,
          site_search: true,
          video_engagement: true,
          file_downloads: true
        }
      });
    };
  }
};

// Hook to track page views with enhanced data
export const useEnhancedPageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || '';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParamsString ? '?' + searchParamsString : '');
      
      // Track the page view with enhanced data
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.origin + url,
        // Add custom dimensions for visitor location if available
        ...(window as any).userLocation && {
          custom_map: {
            dimension1: 'user_city',
            dimension2: 'user_region',
            dimension3: 'user_country'
          },
          user_city: (window as any).userLocation.city,
          user_region: (window as any).userLocation.region,
          user_country: (window as any).userLocation.country
        }
      });

      // Enhanced tracking based on page type
      if (pathname.includes('/destinations/')) {
        // Extract destination name from URL
        const destinationSlug = pathname.split('/destinations/')[1]?.split('/')[0];
        const destinationName = destinationSlug ? decodeURIComponent(destinationSlug.replace(/-/g, ' ')) : 'unknown';
        trackViewDestination(destinationName);
      } else if (pathname.includes('/books/')) {
        // Extract book title from URL
        const bookSlug = pathname.split('/books/')[1]?.split('/')[0];
        const bookTitle = bookSlug ? decodeURIComponent(bookSlug.replace(/-/g, ' ')) : 'unknown';
        trackViewBook(bookTitle);
      } else if (pathname.includes('/news/')) {
        // Extract article title from URL
        const articleSlug = pathname.split('/news/')[1]?.split('/')[0];
        const articleTitle = articleSlug ? decodeURIComponent(articleSlug.replace(/-/g, ' ')) : 'unknown';
        trackViewArticle(articleTitle);
      } else if (pathname.includes('/japan-travel-guide/')) {
        const guideSlug = pathname.split('/japan-travel-guide/')[1]?.split('/')[0];
        const guideTitle = guideSlug ? decodeURIComponent(guideSlug.replace(/-/g, ' ')) : 'unknown';
        trackViewGuide(guideTitle);
      }
    }
  }, [pathname, searchParamsString]);
};

// Function to get user location (city/country) using browser API
export const getUserLocation = async (): Promise<{
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
} | null> => {
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser.');
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000, // 10 seconds timeout
        enableHighAccuracy: true
      });
    });

    // Use a reverse geocoding service to get city/country from coordinates
    // Note: In production, you might want to use your own backend to avoid exposing API keys
    const { latitude, longitude } = position.coords;
    
    // For privacy and rate limiting purposes, we'll make this a server-side API call
    // In a real implementation, this would call your backend API
    // which would call a reverse geocoding service like Google Maps API, OpenCage, etc.
    
    // For now, we'll return a mock function - replace this with actual API call
    return {
      city: 'Unknown City', // This would be filled in by reverse geocoding
      region: 'Unknown Region',
      country: 'Unknown Country',
      latitude,
      longitude
    };
  } catch (error) {
    console.warn('Could not get user location:', error);
    return null;
  }
};

// Alternative approach: Use IP-based geolocation
export const getLocationFromIP = async (): Promise<{
  city: string;
  region: string;
  country: string;
} | null> => {
  try {
    // Using ipapi.co - you could also use other free services like ip-api.com
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      city: data.city || 'Unknown City',
      region: data.region || 'Unknown Region',
      country: data.country_name || 'Unknown Country'
    };
  } catch (error) {
    console.warn('Could not get location from IP:', error);
    return null;
  }
};

// Track custom events with location data
export const trackEventWithLocation = (
  action: string,
  category: string,
  label: string,
  customParams?: Record<string, any>,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const locationData = (window as any).userLocation;
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      // Include location data if available
      ...(locationData && {
        user_city: locationData.city,
        user_region: locationData.region,
        user_country: locationData.country
      }),
      // Include custom parameters
      ...customParams
    });
  }
};

// Track destination views with location
export const trackViewDestination = (destinationName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_destination', {
      destination_name: destinationName,
      page_location: window.location.href,
      // Include location data if available
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      }
    });
  }
};

// Track book views
export const trackViewBook = (bookTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_book', {
      book_title: bookTitle,
      page_location: window.location.href,
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      }
    });
  }
};

// Track article views
export const trackViewArticle = (articleTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_article', {
      article_title: articleTitle,
      page_location: window.location.href,
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      }
    });
  }
};

// Track guide views
export const trackViewGuide = (guideTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_guide', {
      guide_title: guideTitle,
      page_location: window.location.href,
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      }
    });
  }
};

// Track user interactions with location
export const trackUserInteraction = (
  interactionType: string,
  elementName: string,
  extraParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_interaction', {
      interaction_type: interactionType,
      element_name: elementName,
      page_location: window.location.href,
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      },
      ...extraParams
    });
  }
};

// Enhanced page view tracking for specific page types
export const trackPageViewDetails = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    const path = window.location.pathname;
    let pageType = 'other';
    
    if (path.includes('/destinations/')) pageType = 'destination';
    else if (path.includes('/books/')) pageType = 'book';
    else if (path.includes('/news/')) pageType = 'article';
    else if (path.includes('/japan-travel-guide/')) pageType = 'guide';
    else if (path === '/' || path === '/home') pageType = 'homepage';
    else if (path.includes('/contact')) pageType = 'contact';
    else if (path.includes('/about')) pageType = 'about';
    
    window.gtag('event', 'page_view_detailed', {
      page_type: pageType,
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
      ...(window as any).userLocation && {
        user_city: (window as any).userLocation.city,
        user_region: (window as any).userLocation.region,
        user_country: (window as any).userLocation.country
      }
    });
  }
};