'use client';

import { useEffect, useState } from 'react';
import { initGtag, getLocationFromIP } from '@/lib/enhanced-analytics';
import dynamic from 'next/dynamic';

// Dynamic import for page view tracking to ensure it only runs client-side
const PageViewTracker = dynamic(() => import('./PageViewTracker').then(mod => ({ default: mod.PageViewTracker })), { ssr: false });

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

  return <PageViewTracker />;
}

