'use client';
import { trackEvent } from '@/lib/analytics';

import { useEffect, useCallback } from 'react';
import { 
  trackUserInteraction,
  trackEventWithLocation,
  trackViewDestination,
  trackViewArticle,
  trackViewBook 
} from '@/lib/enhanced-analytics';

interface InteractionTrackerProps {
  children: React.ReactNode;
}

export function InteractionTracker({ children }: InteractionTrackerProps) {
  // Track clicks on common interactive elements
  const trackClicks = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    let elementName = target.tagName.toLowerCase();
    
    // Get more descriptive name if available
    if (target.id) {
      elementName = target.id;
    } else if (target.className && typeof target.className === 'string') {
      elementName = target.className.split(' ')[0]; // Use first class name
    } else if (target.className && typeof target.className !== 'string' && target.classList && target.classList.length > 0) {
      elementName = target.classList[0]; // Use first class from classList
    } else if (target.textContent && target.textContent.trim().length > 0) {
      elementName = target.textContent.substring(0, 20).trim(); // First 20 chars of text
    }

    // Get user location data
    const userLocation = (window as any).userLocation;

    // Track different types of interactions
    if (target.tagName === 'A' || target.closest('a')) {
      const linkElement = target.tagName === 'A' ? target : target.closest('a');
      if (linkElement) {
        trackUserInteraction(
          'link_click',
          `url: ${(linkElement as HTMLAnchorElement).href} | text: ${(linkElement as HTMLAnchorElement).textContent?.substring(0, 50) || ''}`,
          userLocation
        );
      }
    } else if (target.tagName === 'BUTTON' || target.closest('button')) {
      trackUserInteraction('button_click', elementName, userLocation);
    } else if (target.tagName === 'FORM' || target.closest('form')) {
      trackUserInteraction('form_interaction', elementName, userLocation);
    }
  }, []);

  // Track scrolls and page engagement
  const trackScrolls = useCallback((event: Event) => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    // Get user location data
    const userLocation = (window as any).userLocation;

    // Track when user scrolls to significant portions of the page
    if (scrollPercent >= 25 && sessionStorage.getItem('scrolled_25') !== 'true') {
      trackEventWithLocation('scroll_25_percent', { event_category: 'engagement' }, userLocation);
      sessionStorage.setItem('scrolled_25', 'true');
    }
    if (scrollPercent >= 50 && sessionStorage.getItem('scrolled_50') !== 'true') {
      trackEventWithLocation('scroll_50_percent', { event_category: 'engagement' }, userLocation);
      sessionStorage.setItem('scrolled_50', 'true');
    }
    if (scrollPercent >= 75 && sessionStorage.getItem('scrolled_75') !== 'true') {
      trackEventWithLocation('scroll_100_percent', { event_category: 'engagement' }, userLocation);
      sessionStorage.setItem('scrolled_75', 'true');
    }
    if (scrollPercent >= 90 && sessionStorage.getItem('scrolled_90') !== 'true') {
      trackEventWithLocation('scroll_90_percent', { event_category: 'engagement' }, userLocation);
      sessionStorage.setItem('scrolled_90', 'true');
    }
  }, []);

  useEffect(() => {
    // Add event listeners for user interactions
    document.addEventListener('click', trackClicks);
    document.addEventListener('scroll', trackScrolls, { passive: true });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('click', trackClicks);
      document.removeEventListener('scroll', trackScrolls);
    };
  }, [trackClicks, trackScrolls]);

  return <>{children}</>;
}
