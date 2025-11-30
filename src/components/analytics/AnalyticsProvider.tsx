'use client';

import { useEffect, useState } from 'react';
import { initGtag, useEnhancedPageViewTracker, getLocationFromIP } from '@/lib/enhanced-analytics';

export function AnalyticsProvider() {
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    // Initialize Google Analytics
    initGtag();

    // Fetch user location
    const fetchLocation = async () => {
      try {
        const location = await getLocationFromIP();
        if (location) {
          setUserLocation(location);

          // Store location globally
          (window as any).userLocation = location;
        }
      } catch (error) {
        console.warn('Error getting user location:', error);
      }
    };

    fetchLocation();
  }, []);

  // Track page views
  useEnhancedPageViewTracker();

  return null; // This provider doesn't render UI
}

