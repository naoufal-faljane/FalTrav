'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  initGtag as enhancedInitGtag,
  useEnhancedPageViewTracker as useEnhancedPageViewTracking,
  trackEventWithLocation,
  trackViewDestination,
  trackViewArticle,
  trackViewBook,
  trackViewGuide,
  trackUserInteraction,
  trackPageViewDetails
} from '@/lib/enhanced-analytics';

// Initialize Google Analytics (using enhanced version)
export const initGtag = enhancedInitGtag;

// Hook to track page views (using enhanced version)
export const usePageViewTracker = useEnhancedPageViewTracking;

// Function to track custom events with location
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  trackEventWithLocation(action, category, label, undefined, value);
};

// Additional helper functions for common GA4 events
export const trackPurchase = (
  value: number,
  currency: string = 'USD',
  transactionId?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      value: value,
      currency: currency,
      transaction_id: transactionId,
    });
  }
};

export const trackAddToCart = (
  itemName: string,
  itemCategory: string,
  value: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      items: [{
        item_name: itemName,
        item_category: itemCategory,
        value: value,
      }]
    });
  }
};

export const trackViewItemList = (
  items: Array<{item_name: string, item_category: string, value: number}>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item_list', {
      items: items
    });
  }
};

export const trackViewItem = (
  itemName: string,
  itemCategory: string,
  value: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [{
        item_name: itemName,
        item_category: itemCategory,
        value: value,
      }]
    });
  }
};

// Enhanced version of the functions that automatically include location
export { 
  trackViewDestination,
  trackViewArticle, 
  trackViewBook,
  trackViewGuide,
  trackUserInteraction,
  trackPageViewDetails
};

// Track button clicks
export const trackButtonClick = (buttonName: string, category: string = 'Button Click') => {
  trackUserInteraction('click', buttonName, { event_category: category });
};

// Track link clicks
export const trackLinkClick = (linkText: string, linkUrl: string) => {
  trackUserInteraction('click', linkText, { 
    event_category: 'Link Click',
    link_url: linkUrl 
  });
};

// Track form submissions
export const trackFormSubmission = (formId: string, formName: string) => {
  trackUserInteraction('form_submit', formName, { 
    event_category: 'Form Submission',
    form_id: formId 
  });
};