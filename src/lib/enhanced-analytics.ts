"use client";

import { useEffect } from 'react';
import { pageview } from '@/lib/gtag';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function initGtag() {
  // Create script element for gtag
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=G-WR9K1KTMF0`;
  document.head.appendChild(gtagScript);

  // Initialize gtag
  const initScript = document.createElement('script');
  initScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WR9K1KTMF0', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      send_page_view: false  // We'll send this manually to control timing
    });
  `;
  document.head.appendChild(initScript);
}

export function trackUserInteraction(interactionType: string, element: string, locationData?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', interactionType, {
      event_category: 'User Interaction',
      event_label: element,
      ...(locationData && {
        custom_map: {
          dimension1: 'user_city',
          dimension2: 'user_region',
          dimension3: 'user_country'
        },
        user_city: locationData.city,
        user_region: locationData.region,
        user_country: locationData.country
      })
    });
  }
}

export function trackEventWithLocation(eventName: string, params?: any, locationData?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams = {
      ...params,
      ...(locationData && {
        custom_map: {
          dimension1: 'user_city',
          dimension2: 'user_region',
          dimension3: 'user_country'
        },
        user_city: locationData.city,
        user_region: locationData.region,
        user_country: locationData.country
      })
    };

    window.gtag('event', eventName, eventParams);
  }
}

export function trackViewDestination(destinationName: string, locationData?: any) {
  trackEventWithLocation('view_destination', {
    destination_name: destinationName,
    content_type: 'destination'
  }, locationData);
}

export function trackViewArticle(articleTitle: string, articleId?: string, locationData?: any) {
  trackEventWithLocation('view_item', {
    items: [{
      item_id: articleId || articleTitle,
      item_name: articleTitle,
      content_type: 'article'
    }]
  }, locationData);
}

export function trackViewBook(bookTitle: string, bookId?: string, locationData?: any) {
  trackEventWithLocation('view_item', {
    items: [{
      item_id: bookId || bookTitle,
      item_name: bookTitle,
      content_type: 'book'
    }]
  }, locationData);
}

export async function getLocationFromIP(): Promise<any> {
  // Helper function to fetch IP address
  const fetchIPAddress = async (): Promise<string> => {
    // First try ipify
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      if (response.ok) {
        const data = await response.json();
        return data.ip || '';
      }
    } catch (error) {
      console.warn('IPify service failed:', error);
    }

    // Fallback to jsonip
    try {
      const response = await fetch('https://jsonip.com', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      if (response.ok) {
        const data = await response.json();
        return data.ip || data.origin || '';
      }
    } catch (error) {
      console.warn('JsonIP service failed:', error);
    }

    // If all IP fetching services fail, return empty string
    return '';
  };

  // Helper function to fetch location data for an IP
  const fetchLocationData = async (ip: string): Promise<any> => {
    // First try ipapi.co (with IP if available)
    let url = 'https://ipapi.co/json/';
    if (ip) {
      url = `https://ipapi.co/${ip}/json/`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        return {
          ip: data.ip || ip || '',
          city: data.city || 'Unknown',
          region: data.region || data.region_name || 'Unknown',
          country: data.country_name || data.country || 'Unknown',
          latitude: data.latitude || null,
          longitude: data.longitude || null
        };
      }
    } catch (error) {
      console.warn('IPAPI.co service failed:', error);
    }

    // Fallback to another service if IP is available
    if (ip) {
      try {
        const response = await fetch(`https://ipinfo.io/${ip}/json`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        if (response.ok) {
          const data = await response.json();
          const [lat, lon] = data.loc ? data.loc.split(',') : [null, null];
          
          return {
            ip: data.ip || ip || '',
            city: data.city || 'Unknown',
            region: data.region || data.region_name || 'Unknown',
            country: data.country || data.country_name || 'Unknown',
            latitude: lat || null,
            longitude: lon || null
          };
        }
      } catch (error) {
        console.warn('IPInfo service failed:', error);
      }
    }

    // Final fallback to a service that works without IP if possible
    try {
      const response = await fetch('https://extreme-ip-lookup.com/json/', {
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      if (response.ok) {
        const data = await response.json();
        
        return {
          ip: data.query || data.ip || '',
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country || 'Unknown',
          latitude: data.lat || null,
          longitude: data.lon || null
        };
      }
    } catch (error) {
      console.warn('Extreme IP lookup service failed:', error);
    }

    // If all services fail, return default location data
    return {
      ip: ip || '',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      latitude: null,
      longitude: null
    };
  };

  try {
    // First try the primary IP geolocation service
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      const data = await response.json();

      return {
        ip: data.ip || '',
        city: data.city || 'Unknown',
        region: data.region || data.region_name || 'Unknown',
        country: data.country_name || data.country || 'Unknown',
        latitude: data.latitude || null,
        longitude: data.longitude || null
      };
    } else {
      throw new Error(`IP geolocation request failed with status ${response.status}`);
    }
  } catch (error) {
    console.warn('Error getting location from IP (primary):', error);
    
    // Alternative implementation with better error handling and multiple fallbacks
    // Try to get location with IP
    const ipAddress = await fetchIPAddress();
    
    if (ipAddress) {
      // If we have an IP, get location data for it
      return await fetchLocationData(ipAddress);
    } else {
      // If we couldn't get IP, try location lookup without IP
      return await fetchLocationData('');
    }
  }
}