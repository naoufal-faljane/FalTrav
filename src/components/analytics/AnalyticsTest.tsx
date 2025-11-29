'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

// Simple test component to verify analytics is working
export const AnalyticsTest = () => {
  const { trackCustomEvent } = useAnalytics();
  
  useEffect(() => {
    // Test event to verify analytics is working
    trackCustomEvent('analytics_test', 'system', 'analytics_loaded');
    console.log('Analytics test event sent');
  }, [trackCustomEvent]);

  return null;
};