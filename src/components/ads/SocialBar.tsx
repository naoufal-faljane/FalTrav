'use client';

import { useEffect, useRef } from 'react';

interface SocialBarProps {
  className?: string;
}

const SocialBar = ({ className }: SocialBarProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      // Prevent duplicate injection
      if (window.__adsInjected && window.__adsInjected['SOCIAL_BAR_AD_KEY']) {
        return;
      }

      // Mark as injected to prevent duplicates
      if (!window.__adsInjected) {
        window.__adsInjected = {};
      }
      window.__adsInjected['SOCIAL_BAR_AD_KEY'] = true;

      // Create and configure atOptions script
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : 'SOCIAL_BAR_AD_KEY', // Replace with your actual key
          'format' : 'iframe',
          'height' : 60,
          'width' : '100%',
          'params' : {}
        };
      `;

      // Create and configure the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/SOCIAL_BAR_AD_KEY/invoke.js';
      invokeScript.async = true;

      // Append scripts to the ad container
      const container = adContainerRef.current;
      container.appendChild(atOptionsScript);
      container.appendChild(invokeScript);

      // Cleanup function
      return () => {
        if (container && container.parentNode) {
          while (container.firstChild) {
            const child = container.firstChild;
            if (container.contains(child)) {
              container.removeChild(child);
            }
          }
        }
        if (window.__adsInjected) {
          delete window.__adsInjected['SOCIAL_BAR_AD_KEY'];
        }
      };
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={className}
      style={{ 
        width: '100%', 
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        border: '1px dashed #ccc'
      }}
    >
      Loading Ad...
    </div>
  );
};

export default SocialBar;