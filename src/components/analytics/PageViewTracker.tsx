'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run client-side and after hydration
    if (typeof window === 'undefined' || !isMounted) return;

    // Get current URL
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Get current location if available
    const userLocation = (window as any).userLocation;

    // Send page view event with location data
    if (typeof window !== 'undefined' && window.gtag) {
      const gtagParams: any = {
        page_path: url,
        page_title: document.title,
      };

      // Only add location data if it exists and has valid values
      if (userLocation && userLocation.city && userLocation.city !== 'Unknown') {
        gtagParams.custom_map = {
          dimension1: 'user_city',
          dimension2: 'user_region',
          dimension3: 'user_country'
        };
        gtagParams.user_city = userLocation.city;
        gtagParams.user_region = userLocation.region;
        gtagParams.user_country = userLocation.country;
      }

      window.gtag('config', 'G-WR9K1KTMF0', gtagParams);
    }
  }, [pathname, searchParams, isMounted]);

  return null; // This component doesn't render anything
}