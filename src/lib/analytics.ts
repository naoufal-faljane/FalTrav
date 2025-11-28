'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: ((...args: any[]) => void) | undefined;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGtag = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function that pushes to dataLayer
    window.gtag = function(..._args: any[]) {
      window.dataLayer.push(arguments);
    };

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-WR9K1KTMF0`;
    document.head.appendChild(script);

    // Initialize gtag with our tracking ID
    script.onload = () => {
      window.gtag!('js', new Date());
      window.gtag!('config', 'G-WR9K1KTMF0', {
        page_title: document.title,
        page_location: window.location.href,
      });
    };
  }
};

// Hook to track page views
export const usePageViewTracker = () => {
  // We use a try/catch to avoid issues when not in a suspense boundary
  const pathname = usePathname();
  let searchParamsString = '';
  
  try {
    const searchParams = useSearchParams();
    searchParamsString = searchParams.toString();
  } catch (e) {
    // If we're not in a suspense boundary, we can't access searchParams
    // So we'll extract them from the URL directly
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      searchParamsString = url.searchParams.toString();
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParamsString ? '?' + searchParamsString : '');
      window.gtag('config', 'G-WR9K1KTMF0', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.origin + url,
      });
    }
  }, [pathname, searchParamsString]);
};

// Function to track custom events
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
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