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
  try {
    // Using ipapi.co for IP geolocation
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      ip: data.ip || '',
      city: data.city || 'Unknown',
      region: data.region || data.region_name || 'Unknown',
      country: data.country_name || data.country || 'Unknown',
      latitude: data.latitude || null,
      longitude: data.longitude || null
    };
  } catch (error) {
    console.warn('Error getting location from IP:', error);
    // Fallback to a free IP geolocation service
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      
      // Then get location for the IP
      const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
      const locationData = await locationResponse.json();
      
      return {
        ip: locationData.ip || '',
        city: locationData.city || 'Unknown',
        region: locationData.region || locationData.region_name || 'Unknown',
        country: locationData.country_name || locationData.country || 'Unknown',
        latitude: locationData.latitude || null,
        longitude: locationData.longitude || null
      };
    } catch (error2) {
      console.error('Failed to get location from IP:', error2);
      return {
        ip: '',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        latitude: null,
        longitude: null
      };
    }
  }
}