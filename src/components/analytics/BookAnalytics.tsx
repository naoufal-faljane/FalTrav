'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePageViewTracker, trackViewBook } from '@/lib/analytics';

// Client component to handle analytics for server-rendered book pages
export function BookAnalytics() {
  usePageViewTracker();
  const searchParams = useSearchParams();

  // You can add additional client-side tracking here if needed
  useEffect(() => {
    // Additional tracking can be added here if needed
  }, [searchParams]);

  return null; // This component doesn't render anything
}