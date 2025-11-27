// Log the pageview with the gtag function
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-WR9K1KTMF0', {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value: number }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};