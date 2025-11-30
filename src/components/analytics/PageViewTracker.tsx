'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { pageview } from '@/lib/gtag';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function PageViewTracker() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run client-side and after hydration
    if (typeof window === 'undefined' || !isMounted) return;

    const handleRouteChange = (url: string) => {
      // Get current location if available
      const userLocation = (window as any).userLocation;
      
      // Send page view event with location data
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-WR9K1KTMF0', {
          page_path: url,
          page_title: document.title,
          ...(userLocation && {
            custom_map: {
              dimension1: 'user_city',
              dimension2: 'user_region',
              dimension3: 'user_country'
            },
            user_city: userLocation.city,
            user_region: userLocation.region,
            user_country: userLocation.country
          })
        });
      }
    };

    // Track initial page load
    handleRouteChange(window.location.pathname + window.location.search);

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, isMounted]);

  return null; // This component doesn't render anything
}