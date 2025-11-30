// Ad configuration and management utilities
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    __adsInjected?: Record<string, boolean>;
  }
}

// Adsterra configuration for all ad types
export const ADSTERRA_CONFIG = {
  banner300x250: {
    key: 'a425a9ba84b0de190841de26b949448c',
    dimensions: { width: 300, height: 250 },
    format: 'iframe',
    placement: 'in-article or sidebar'
  },
  skyscraper160x600: {
    key: 'bffd773e654446e24e77e661c6dce759',
    dimensions: { width: 160, height: 600 },
    format: 'iframe',
    placement: 'sidebar'
  },
  popunder: {
    key: '45e2c1252aed751f164908f0b02d9e17',
    dimensions: { width: 0, height: 0 },
    format: 'popup',
    placement: 'background'
  },
  smartlink: {
    key: 'a8e77dedbcfc76e7bab9ed12d4091a97',
    url: 'https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97',
    placement: 'content or sidebar'
  }
} as const;

// Ad placement strategy
export const AD_PLACEMENTS = {
  homepage: [
    { position: 'header', adType: 'banner300x250', priority: 'high' },
    { position: 'sidebar-top', adType: 'skyscraper160x600', priority: 'medium' },
    { position: 'footer', adType: 'smartlink', priority: 'low' }
  ],
  article: [
    { position: 'header', adType: 'banner300x250', priority: 'high' },
    { position: 'content-middle', adType: 'banner300x250', priority: 'medium' },
    { position: 'footer', adType: 'smartlink', priority: 'low' }
  ],
  mobile: [
    { position: 'sticky-bottom', adType: 'banner300x250', priority: 'high' }
  ]
} as const;

// Ad frequency management
export const useAdFrequency = () => {
  const [viewedAds, setViewedAds] = useState<Record<string, number>>({});

  const trackAdView = (adKey: string) => {
    setViewedAds(prev => ({
      ...prev,
      [adKey]: (prev[adKey] || 0) + 1
    }));
  };

  const shouldShowAd = (adKey: string, maxViews: number = 3) => {
    const views = viewedAds[adKey] || 0;
    return views < maxViews;
  };

  const resetAdFrequency = () => {
    setViewedAds({});
  };

  return { trackAdView, shouldShowAd, resetAdFrequency };
};

// Ad blocker detection
export const useAdBlockDetection = () => {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlocker = async () => {
      try {
        // Create a test element to check for ad blockers
        const adTest = document.createElement('div');
        adTest.innerHTML = '&nbsp;';
        adTest.className = 'adsbox';
        adTest.style.position = 'absolute';
        adTest.style.visibility = 'hidden';
        adTest.style.height = '1px';
        adTest.style.overflow = 'hidden';

        document.body.appendChild(adTest);

        await new Promise(resolve => setTimeout(resolve, 100));

        const isBlocked = adTest.offsetHeight === 0;
        setIsAdBlocked(isBlocked);

        document.body.removeChild(adTest);
      } catch (error) {
        setIsAdBlocked(true);
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      checkAdBlocker();
    }
  }, []);

  return isAdBlocked;
};