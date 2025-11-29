'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAdFrequency, useAdBlockDetection, AD_CONTENT_POLICY } from '@/lib/ad-management';
import { MobileAd, RectangleAd } from '@/components/ads/SponsoredAd';
import { SmartlinkAd } from '@/components/ads/SmartlinkAd';

interface AdContextType {
  showAd: (position: string) => boolean;
  trackAdView: (position: string) => void;
  AdPlacement: React.FC<{ position: string; type?: 'rectangle' | 'mobile' | 'smartlink'; className?: string }>;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trackAdView, shouldShowAd } = useAdFrequency();
  const isAdBlocked = useAdBlockDetection();
  const [adsShown, setAdsShown] = useState<Record<string, boolean>>({});
  const [adsAtPosition, setAdsAtPosition] = useState<Record<string, number>>({});

  // Check if we should show an ad at a given position
  const showAd = (position: string): boolean => {
    if (isAdBlocked) return false;
    
    // Check if we've reached the maximum ads per page
    const totalAdsShown = Object.keys(adsShown).length;
    if (totalAdsShown >= AD_CONTENT_POLICY.maxAdsPerPage) {
      return false;
    }

    // Check frequency at this position
    const positionCount = adsAtPosition[position] || 0;
    if (positionCount >= 1) { // Only show one ad per position
      return false;
    }

    // Check if we've shown an ad with this key recently
    return true;
  };

  // Track when an ad is viewed
  const handleTrackAdView = (position: string) => {
    trackAdView(position);
    setAdsShown(prev => ({ ...prev, [position]: true }));
    setAdsAtPosition(prev => ({ ...prev, [position]: (prev[position] || 0) + 1 }));
  };

  // AdPlacement component for easy ad insertion
  const AdPlacement: React.FC<{ 
    position: string; 
    type?: 'rectangle' | 'mobile' | 'smartlink';
    className?: string;
  }> = ({ position, type = 'mobile', className }) => {
    if (!showAd(position)) {
      return null;
    }

    // Track that we're showing an ad at this position
    useEffect(() => {
      handleTrackAdView(position);
    }, [position]);

    // Render appropriate ad based on type
    if (type === 'rectangle') {
      return <RectangleAd className={className} priority="medium" />;
    } else if (type === 'smartlink') {
      return <SmartlinkAd className={className} placement="content" priority="medium" />;
    }

    return <MobileAd className={className} priority="medium" />;
  };

  const value = {
    showAd,
    trackAdView: handleTrackAdView,
    AdPlacement
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};

export const useAdContext = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  return context;
};