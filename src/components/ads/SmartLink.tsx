'use client';

import { useEffect, useRef } from 'react';

const SmartLink = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      // Prevent duplicate injection
      if (window.__adsInjected && window.__adsInjected['smartlink']) {
        return;
      }

      // Mark as injected to prevent duplicates
      if (!window.__adsInjected) {
        window.__adsInjected = {};
      }
      window.__adsInjected['smartlink'] = true;

      // Create iframe for SmartLink
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97';
      iframe.style.width = '100%';
      iframe.style.height = '60px';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.title = 'SmartLink Advertisement';
      iframe.frameBorder = '0';
      iframe.loading = 'lazy';

      // Append iframe to the ad container
      const container = adContainerRef.current;
      container.appendChild(iframe);

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
          delete window.__adsInjected['smartlink'];
        }
      };
    }
  }, []);

  return (
    <div 
      ref={adContainerRef} 
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

export default SmartLink;