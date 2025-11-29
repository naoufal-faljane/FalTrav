import { useCallback } from 'react';
import { 
  trackEventWithLocation,
  trackViewDestination,
  trackViewArticle,
  trackViewBook,
  trackViewGuide,
  trackUserInteraction
} from '@/lib/enhanced-analytics';

// Custom hook for easy access to analytics functions
export const useAnalytics = () => {
  const trackDestinationView = useCallback((destinationName: string) => {
    trackViewDestination(destinationName);
  }, []);

  const trackArticleView = useCallback((articleTitle: string) => {
    trackViewArticle(articleTitle);
  }, []);

  const trackBookView = useCallback((bookTitle: string) => {
    trackViewBook(bookTitle);
  }, []);

  const trackGuideView = useCallback((guideTitle: string) => {
    trackViewGuide(guideTitle);
  }, []);

  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label: string, 
    value?: number
  ) => {
    trackEventWithLocation(action, category, label, undefined, value);
  }, []);

  const trackClickInteraction = useCallback((
    elementName: string,
    extraParams?: Record<string, any>
  ) => {
    trackUserInteraction('click', elementName, extraParams);
  }, []);

  const trackFormSubmission = useCallback((
    formName: string,
    extraParams?: Record<string, any>
  ) => {
    trackUserInteraction('form_submission', formName, extraParams);
  }, []);

  const trackSearch = useCallback((
    searchTerm: string,
    resultCount?: number
  ) => {
    trackEventWithLocation(
      'search',
      'engagement',
      searchTerm,
      resultCount !== undefined ? { result_count: resultCount } : {}
    );
  }, []);

  return {
    trackDestinationView,
    trackArticleView,
    trackBookView,
    trackGuideView,
    trackCustomEvent,
    trackClickInteraction,
    trackFormSubmission,
    trackSearch
  };
};