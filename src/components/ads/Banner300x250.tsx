'use client';

import { useEffect, useRef } from 'react';

const Banner300x250 = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      // Prevent duplicate injection
      if (window.__adsInjected && window.__adsInjected['a425a9ba84b0de190841de26b949448c']) {
        return;
      }

      // Mark as injected to prevent duplicates
      if (!window.__adsInjected) {
        window.__adsInjected = {};
      }
      window.__adsInjected['a425a9ba84b0de190841de26b949448c'] = true;

      // Create and configure atOptions script
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : 'a425a9ba84b0de190841de26b949448c',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;

      // Create and configure the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/a425a9ba84b0de190841de26b949448c/invoke.js';
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
        }
        if (window.__adsInjected) {
          delete window.__adsInjected['a425a9ba84b0de190841de26b949448c'];
        }
      };
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      style={{ 
        width: '300px', 
        height: '250px',
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

export default Banner300x250;