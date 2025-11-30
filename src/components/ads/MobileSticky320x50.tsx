'use client';

import React, { useEffect, useRef, useState } from 'react';
import { adConfig } from '@/lib/adConfig';

interface MobileSticky320x50Props {
  className?: string;
  style?: React.CSSProperties;
}

const AD_KEY = 'a1593f7dbeeec27923c535ee40c45244';
const adConfigData = adConfig[AD_KEY];

const MobileSticky320x50: React.FC<MobileSticky320x50Props> = ({ className = '', style }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkIsMobile = () => {
      return window.innerWidth <= 480;
    };

    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!adConfigData?.enabled || !isMobile || typeof window === 'undefined') {
      return;
    }

    // Prevent duplicate injections
    if (window.__adsInjected && window.__adsInjected[AD_KEY]) {
      return;
    }

    if (!adContainerRef.current) {
      return;
    }

    // Mark as injected to prevent duplicates
    if (!window.__adsInjected) {
      window.__adsInjected = {};
    }
    window.__adsInjected[AD_KEY] = true;

    // Create and configure atOptions script
    const atOptionsScript = document.createElement('script');
    atOptionsScript.type = 'text/javascript';
    atOptionsScript.innerHTML = `
      atOptions = {
        'key' : '${AD_KEY}',
        'format' : '${adConfigData.format}',
        'height' : ${adConfigData.height},
        'width' : ${adConfigData.width},
        'params' : {}
      };
    `;

    // Create and configure the invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${AD_KEY}/invoke.js`;
    invokeScript.async = true;

    // Append scripts to the ad container
    const container = adContainerRef.current;
    container.appendChild(atOptionsScript);
    container.appendChild(invokeScript);

    // Cleanup function to remove scripts if needed
    return () => {
      if (container && container.parentNode) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      if (window.__adsInjected) {
        delete window.__adsInjected[AD_KEY];
      }
    };
  }, [isMobile]);

  // Only render if mobile and enabled
  if (!adConfigData.enabled || !isMobile || adConfigData.mobileOnly && !isMobile) {
    return null;
  }

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ad-sticky ${className}`}
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${adConfigData.width}px`, 
        height: `${adConfigData.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        border: '1px dashed #ccc',
        zIndex: 1000,
        ...style
      }}
    >
      {adConfigData.enabled ? 'Loading Ad...' : 'Ad Disabled'}
    </div>
  );
};

export default MobileSticky320x50;