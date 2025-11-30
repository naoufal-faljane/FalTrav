import { useEffect } from 'react';
import {
  trackViewArticle,
  trackViewBook,
  trackUserInteraction
} from '@/lib/enhanced-analytics';

export default function useAnalytics() {
  useEffect(() => {
    const handleClick = (event: any) => {
      const target = event.target as HTMLElement;

      if (!target) return;

      const elementName =
        target.getAttribute('data-analytics-name') ||
        target.innerText ||
        target.tagName;

   if (target.tagName === 'A' || target.closest('a')) {
  trackUserInteraction();
} else if (target.tagName === 'BUTTON' || target.closest('button')) {
  trackUserInteraction();
} else if (target.tagName === 'FORM' || target.closest('form')) {
  trackUserInteraction();
}


    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}

