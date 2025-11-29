// Ad configuration and management utilities
import { useState, useEffect } from 'react';

// Ad configuration based on Adsterra account
export const ADS_CONFIG = {
  // Rectangle banner 300x250
  rectangle: {
    key: 'a425a9ba84b0de190841de26b949448c',
    type: 'rectangle',
    dimensions: { width: 300, height: 250 }
  },
  // Mobile banner 320x50
  mobile: {
    key: 'a1593f7dbeeec27923c535ee40c45244',
    type: 'mobile', 
    dimensions: { width: 320, height: 50 }
  },
  // Leaderboard (if needed) - using mobile ad for leaderboard as example
  leaderboard: {
    key: 'a1593f7dbeeec27923c535ee40c45244',
    type: 'leaderboard',
    dimensions: { width: 728, height: 90 }
  }
} as const;

// Smartlink configuration
export const SMARTLINK_CONFIG = {
  smartlink: {
    url: 'https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97',
    type: 'smartlink',
    placement: 'content' // Can be 'content', 'sidebar', 'header', 'footer'
  }
} as const;

// Ad placement strategy for different page types
export const AD_PLACEMENTS = {
  homepage: [
    { position: 'sidebar-top', adType: 'rectangle', priority: 'high' },
    { position: 'content-middle', adType: 'mobile', priority: 'medium' }
  ],
  destination: [
    { position: 'sidebar-top', adType: 'rectangle', priority: 'high' },
    { position: 'content-bottom', adType: 'mobile', priority: 'medium' }
  ],
  article: [
    { position: 'content-top', adType: 'mobile', priority: 'high' },
    { position: 'content-middle', adType: 'rectangle', priority: 'medium' }
  ],
  book: [
    { position: 'sidebar-top', adType: 'rectangle', priority: 'medium' }
  ]
} as const;

// Ad frequency management
export const useAdFrequency = () => {
  const [viewedAds, setViewedAds] = useState<Record<string, number>>({});

  // Track when an ad is viewed
  const trackAdView = (adKey: string) => {
    setViewedAds(prev => ({
      ...prev,
      [adKey]: (prev[adKey] || 0) + 1
    }));
  };

  // Check if ad should be shown based on frequency cap
  const shouldShowAd = (adKey: string, maxViews: number = 3) => {
    const views = viewedAds[adKey] || 0;
    return views < maxViews;
  };

  // Reset ad frequency for a session
  const resetAdFrequency = () => {
    setViewedAds({});
  };

  return { trackAdView, shouldShowAd, resetAdFrequency };
};

// Ad blocking detection
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

// Ad loading strategy
export const useAdLoadingStrategy = () => {
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    // Adjust ad loading priority based on page performance
    if (typeof window !== 'undefined') {
      // If page is loading slowly, delay ads
      if (performance.navigation.type === 1) { // Page refresh
        setPriority('medium');
      } else { // Navigation to page
        setPriority('high');
      }
    }
  }, []);

  return priority;
};

// Ad content policy for respectful placement
export const AD_CONTENT_POLICY = {
  // Don't show more than this many ads per page
  maxAdsPerPage: 3,
  // Minimum distance between ads (in pixels)
  minDistanceBetweenAds: 300,
  // Respect user preferences
  respectDNT: true,
  // Load ads after critical content
  lazyLoad: true,
  // Don't load ads on slow connections
  respectConnectionSpeed: true
} as const;