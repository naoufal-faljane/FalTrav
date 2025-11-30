'use client';

import { useEffect, useRef } from 'react';

interface InPageNotificationProps {
  className?: string;
}

const InPageNotification = ({ className }: InPageNotificationProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      // Prevent duplicate injection
      if (window.__adsInjected && window.__adsInjected['INPAGE_NOTIFICATION_AD_KEY']) {
        return;
      }

      // Mark as injected to prevent duplicates
      if (!window.__adsInjected) {
        window.__adsInjected = {};
      }
      window.__adsInjected['INPAGE_NOTIFICATION_AD_KEY'] = true;

      // Create and configure atOptions script
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : 'INPAGE_NOTIFICATION_AD_KEY', // Replace with your actual key
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;

      // Create and configure the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/INPAGE_NOTIFICATION_AD_KEY/invoke.js';
      invokeScript.async = true;

      // Append scripts to the ad container
      const container = adContainerRef.current;
      container.appendChild(atOptionsScript);
      container.appendChild(invokeScript);

      // Cleanup function
      return () => {
        if (container && container.parentNode) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if (window.__adsInjected) {
          delete window.__adsInjected['INPAGE_NOTIFICATION_AD_KEY'];
        }
      };
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={className}
      style={{ 
        width: '300px', 
        height: '250px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        border: '1px dashed #ccc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      Loading Ad...
    </div>
  );
};

export default InPageNotification;