'use client';

import { createContext, useContext, ReactNode } from 'react';
import Banner300x250 from '@/components/ads/Banner300x250';
import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';
import Popunder from '@/components/ads/Popunder';
import SocialBar from '@/components/ads/SocialBar';
import InPageNotification from '@/components/ads/InPageNotification';
import NativeBanner from '@/components/ads/NativeBanner';
import SmartLink from '@/components/ads/SmartLink';

type AdType = 'banner300x250' | 'skyscraper160x600' | 'popunder' | 'socialbar' | 'inpagenotification' | 'nativebanner' | 'smartlink';

interface AdManagerContextType {
  renderAd: (type: AdType) => ReactNode;
}

const AdManagerContext = createContext<AdManagerContextType | undefined>(undefined);

interface AdManagerProviderProps {
  children: ReactNode;
}

export const AdManagerProvider: React.FC<AdManagerProviderProps> = ({ children }) => {
  const renderAd = (type: AdType): ReactNode => {
    switch (type) {
      case 'banner300x250':
        return <Banner300x250 />;
      case 'skyscraper160x600':
        return <Skyscraper160x600 />;
      case 'popunder':
        return <Popunder />;
      case 'socialbar':
        return <SocialBar />;
      case 'inpagenotification':
        return <InPageNotification />;
      case 'nativebanner':
        return <NativeBanner />;
      case 'smartlink':
        return <SmartLink />;
      default:
        return null;
    }
  };

  const value = {
    renderAd
  };

  return (
    <AdManagerContext.Provider value={value}>
      {children}
    </AdManagerContext.Provider>
  );
};

export const useAdManager = () => {
  const context = useContext(AdManagerContext);
  if (context === undefined) {
    throw new Error('useAdManager must be used within an AdManagerProvider');
  }
  return context;
};