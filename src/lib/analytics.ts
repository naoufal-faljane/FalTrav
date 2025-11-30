"use client";
export function usePageViewTracker() {
  // Disabled placeholder — GA is handled globally in layout.tsx
}

export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number
) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, {
        event_category: category || "",
        event_label: label || "",
        value: value || 0,
      });
    }
  } catch (error) {
    console.error("trackEvent error:", error);
  }
}


export function trackAddToCart() {
  // Placeholder
}

export function trackViewBook() {
  // Placeholder
}
