'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag: Function;
    dataLayer: any[];
  }
}

export const usePageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA if not already done
    if (typeof window !== 'undefined' && (!window.gtag || typeof window.gtag !== 'function')) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-WR9K1KTMF0', {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Track page view when route changes
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + searchParams.toString();
      window.gtag('config', 'G-WR9K1KTMF0', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.origin + url
      });
    }
  }, [pathname, searchParams]);
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Additional event tracking functions
export const trackPurchase = (value: number, currency: string = 'USD', transactionId?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      value: value,
      currency: currency,
      transaction_id: transactionId,
    });
  }
};

export const trackAddToCart = (itemName: string, itemCategory: string, value: number) => {
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

export const trackViewItemList = (items: Array<{item_name: string, item_category: string, value: number}>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item_list', {
      items: items
    });
  }
};

export const trackViewItem = (itemName: string, itemCategory: string, value: number) => {
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