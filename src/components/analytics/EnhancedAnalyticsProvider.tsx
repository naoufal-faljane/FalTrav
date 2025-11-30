'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  initGtag, 
  getLocationFromIP 
} from '@/lib/enhanced-analytics';
import dynamic from 'next/dynamic';

// Dynamic import for page view tracking to ensure it only runs client-side
const PageViewTracker = dynamic(() => import('./PageViewTracker').then(mod => ({ default: mod.PageViewTracker })), { ssr: false });

export function EnhancedAnalyticsProvider() {
  const [userLocation, setUserLocation] = useState<any>(null);
  
  // Initialize Google Analytics and get user location
  useEffect(() => {
    // Initialize Google Analytics
    initGtag();
    
    // Get user location (using IP-based geolocation as it's more reliable)
    const fetchLocation = async () => {
      try {
        const location = await getLocationFromIP();
        if (location) {
          setUserLocation(location);
          
          // Store location in window object for use in gtag calls
          (window as any).userLocation = location;
        }
      } catch (error) {
        console.warn('Error getting user location:', error);
      }
    };
    
    fetchLocation();
  }, []);

  // Track page views with enhanced data
  return <PageViewTracker />; // This component doesn't render anything visual
}