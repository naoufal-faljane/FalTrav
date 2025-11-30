'use client';

import React, { useEffect, useRef } from 'react';
import { adConfig } from '@/lib/adConfig';

interface Leaderboard468x60Props {
  className?: string;
  style?: React.CSSProperties;
}

const AD_KEY = '59a91338e2382528879afcab4f94a32c';
const adConfigData = adConfig[AD_KEY];

const Leaderboard468x60: React.FC<Leaderboard468x60Props> = ({ className = '', style }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adConfigData?.enabled || typeof window === 'undefined') {
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
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${className}`}
      style={{ 
        width: `${adConfigData.width}px`, 
        height: `${adConfigData.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        border: '1px dashed #ccc',
        ...style
      }}
    >
      {adConfigData.enabled ? 'Loading Ad...' : 'Ad Disabled'}
    </div>
  );
};

export default Leaderboard468x60;