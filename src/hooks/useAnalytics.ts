import { useEffect } from 'react';
import {
  trackViewArticle,
  trackViewBook,
  trackUserInteraction,
  trackEventWithLocation,
  trackViewDestination
} from '@/lib/enhanced-analytics';

export default function useAnalytics() {
  useEffect(() => {
    // Get user location data
    const userLocation = (window as any).userLocation;
    
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target) return;

      const elementName =
        target.getAttribute('data-analytics-name') ||
        target.getAttribute('id') ||
        target.getAttribute('class') ||
        target.tagName.toLowerCase();

      const elementText = target.textContent?.trim().substring(0, 50) || '';

      if (target.tagName === 'A' || target.closest('a')) {
        const linkElement = target.tagName === 'A' ? target : target.closest('a');
        trackUserInteraction('link_click', `${elementName} (${elementText})`, userLocation);
      } else if (target.tagName === 'BUTTON' || target.closest('button')) {
        trackUserInteraction('button_click', `${elementName} (${elementText})`, userLocation);
      } else if (target.tagName === 'FORM' || target.closest('form')) {
        trackUserInteraction('form_interaction', elementName, userLocation);
      }
    };

    document.addEventListener('click', handleClick);

    // Return cleanup function
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Return functions for custom tracking
  return {
    trackCustomEvent: (action: string, category?: string, label?: string) => {
      const userLocation = (window as any).userLocation;
      trackEventWithLocation(action, {
        event_category: category,
        event_label: label
      }, userLocation);
    },
    trackViewDestination: (destinationName: string) => {
      const userLocation = (window as any).userLocation;
      trackViewDestination(destinationName, userLocation);
    },
    trackViewArticle: (articleTitle: string, articleId?: string) => {
      const userLocation = (window as any).userLocation;
      trackViewArticle(articleTitle, articleId, userLocation);
    },
    trackViewBook: (bookTitle: string, bookId?: string) => {
      const userLocation = (window as any).userLocation;
      trackViewBook(bookTitle, bookId, userLocation);
    },
    trackClickInteraction: (elementName: string) => {
      const userLocation = (window as any).userLocation;
      trackUserInteraction('user_click', elementName, userLocation);
    }
  };
}

