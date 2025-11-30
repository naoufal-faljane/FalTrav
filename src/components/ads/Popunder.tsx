'use client';

import { useEffect, useRef } from 'react';

interface PopunderProps {
  delayMs?: number;
  triggerOnLoad?: boolean;
  className?: string;
}

const Popunder = ({ delayMs = 5000, triggerOnLoad = true, className }: PopunderProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adContainerRef.current) {
      // Check if already shown in this session
      const hasShown = (): boolean => {
        const lastShown = sessionStorage.getItem('ad-popunder-lastShown');
        if (!lastShown) return false;

        const lastShownTime = new Date(lastShown).getTime();
        const now = new Date().getTime();
        const hoursDiff = (now - lastShownTime) / (1000 * 60 * 60);

        // Show once per hour
        return hoursDiff < 1;
      };

      if (hasShown()) {
        return;
      }

      // Prevent duplicate injection
      if (window.__adsInjected && window.__adsInjected['popunder']) {
        return;
      }

      // Mark as injected to prevent duplicates
      if (!window.__adsInjected) {
        window.__adsInjected = {};
      }
      window.__adsInjected['popunder'] = true;

      // Create the external script
      const externalScript = document.createElement('script');
      externalScript.async = true;
      externalScript.setAttribute('data-cfasync', 'false');
      externalScript.src = '//pl28068969.effectivegatecpm.com/45e2c1252aed751f164908f0b02d9e17/invoke.js';

      // Create the container div
      const containerDiv = document.createElement('div');
      containerDiv.id = 'container-45e2c1252aed751f164908f0b02d9e17';

      // Append elements to the ad container
      const container = adContainerRef.current;
      container.appendChild(externalScript);
      container.appendChild(containerDiv);

      // Mark as shown in session storage
      const markAsShown = (): void => {
        sessionStorage.setItem('ad-popunder-lastShown', new Date().toISOString());
      };

      // Handle delayed trigger
      if (triggerOnLoad) {
        const timer = setTimeout(() => {
          markAsShown();
        }, delayMs);

        return () => {
          clearTimeout(timer);
        };
      }

      // Cleanup function
      return () => {
        if (container && container.parentNode) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
        if (window.__adsInjected) {
          delete window.__adsInjected['popunder'];
        }
      };
    }
  }, [delayMs, triggerOnLoad]);

  return (
    <div 
      ref={adContainerRef} 
      className={className}
      style={{ display: 'none' }}
    >
      {/* Popunder container - no visible content */}
    </div>
  );
};

export default Popunder;