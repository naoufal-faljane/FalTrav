'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Define ad types
type AdType = 'rectangle' | 'leaderboard' | 'mobile' | 'native';

interface AdProps {
  type: AdType;
  adKey: string;
  className?: string;
  slot?: string; // For Google Ad Manager or similar systems
  priority?: 'low' | 'medium' | 'high'; // Controls when ad loads
  fallbackContent?: React.ReactNode; // Content to show if ad fails to load
  onAdLoad?: () => void;
  onAdError?: () => void;
}

// Ad component that safely handles Adsterra scripts
export const AdComponent = ({
  type,
  adKey,
  className,
  priority = 'medium',
  fallbackContent,
  onAdLoad,
  onAdError
}: AdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  // Determine ad dimensions based on type
  const getAdDimensions = () => {
    switch (type) {
      case 'rectangle':
        return { width: 300, height: 250 };
      case 'leaderboard':
        return { width: 728, height: 90 };
      case 'mobile':
        return { width: 320, height: 50 };
      case 'native':
        return { width: '100%', height: 250 }; // Variable for native ads
      default:
        return { width: 300, height: 250 };
    }
  };

  const { width, height } = getAdDimensions();

  useEffect(() => {
    if (!containerRef.current || adLoaded || adError) return;

    // Check for ad blockers
    const checkAdBlocker = () => {
      const adCheck = document.createElement('div');
      adCheck.innerHTML = '&nbsp;';
      adCheck.className = 'adsbox';
      adCheck.style.position = 'absolute';
      adCheck.style.visibility = 'hidden';
      adCheck.style.height = '1px';
      adCheck.style.overflow = 'hidden';

      document.body.appendChild(adCheck);

      setTimeout(() => {
        setIsAdBlocked(adCheck.offsetHeight === 0);
        if (adCheck.parentNode === document.body) {
          document.body.removeChild(adCheck);
        }
      }, 100);
    };

    checkAdBlocker();

    // Function to initialize the ad
    const initializeAd = () => {
      try {
        // Create the ad options script
        const adOptionsScript = document.createElement('script');
        adOptionsScript.type = 'text/javascript';

        // Create different ad options based on type
        let adOptions = {};
        switch (type) {
          case 'rectangle':
            adOptions = {
              'key': adKey,
              'format': 'iframe',
              'height': 250,
              'width': 300,
              'params': {}
            };
            break;
          case 'mobile':
            adOptions = {
              'key': adKey,
              'format': 'iframe',
              'height': 50,
              'width': 320,
              'params': {}
            };
            break;
          case 'leaderboard':
            adOptions = {
              'key': adKey,
              'format': 'iframe',
              'height': 90,
              'width': 728,
              'params': {}
            };
            break;
          case 'native':
            adOptions = {
              'key': adKey,
              'format': 'iframe',
              'height': 250,
              'width': '100%',
              'params': {}
            };
            break;
          default:
            adOptions = {
              'key': adKey,
              'format': 'iframe',
              'height': 250,
              'width': 300,
              'params': {}
            };
        }

        adOptionsScript.innerHTML = `
          window.atOptions = ${JSON.stringify(adOptions)};
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

        // Handle successful load
        invokeScript.onload = () => {
          setAdLoaded(true);
          onAdLoad?.();
        };

        // Handle error
        invokeScript.onerror = () => {
          setAdError(true);
          onAdError?.();
        };

        // Add scripts to container in proper order
        if (containerRef.current) {
          containerRef.current.appendChild(adOptionsScript);
          containerRef.current.appendChild(invokeScript);
        }

        // Only load ads based on priority
        if (priority === 'low') {
          // Load after page is mostly loaded
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.appendChild(adOptionsScript);
              containerRef.current.appendChild(invokeScript);
            }
          }, 3000);
        } else if (priority === 'medium') {
          // Load after initial render
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.appendChild(adOptionsScript);
              containerRef.current.appendChild(invokeScript);
            }
          }, 1000);
        } else {
          // Load immediately
          if (containerRef.current) {
            containerRef.current.appendChild(adOptionsScript);
            containerRef.current.appendChild(invokeScript);
          }
        }
      } catch (error) {
        console.error('Error initializing ad:', error);
        setAdError(true);
        onAdError?.();
      }
    };

    // Only initialize if no ad blocker detected
    if (!isAdBlocked) {
      initializeAd();
    } else {
      setAdError(true);
    }

    // Cleanup function to remove scripts
    return () => {
      if (containerRef.current) {
        // Remove all child elements from container
        while (containerRef.current.firstChild) {
          const child = containerRef.current.firstChild;
          if (containerRef.current.contains(child)) {
            containerRef.current.removeChild(child);
          }
        }
      }
    };
  }, [adKey, type, priority, onAdLoad, onAdError, adLoaded, adError, isAdBlocked]);

  // Fallback content when ad fails to load or is blocked
  const renderFallback = () => {
    if (fallbackContent) {
      return fallbackContent;
    }

    return (
      <div className="flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg h-full w-full">
        <span className="text-gray-500 text-sm">Advertisement</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "ad-container relative overflow-hidden",
        type === 'mobile' ? 'flex justify-center' : '',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      {!adLoaded && !adError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-gray-400 text-sm">Loading ad...</div>
        </div>
      )}

      {adError && renderFallback()}

      {/* Ad blocker notice */}
      {isAdBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500 text-sm">Ad Blocked</span>
        </div>
      )}
    </div>
  );
};