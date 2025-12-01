'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { SMARTLINK_CONFIG } from '@/lib/ad-management';

interface SmartlinkAdProps {
  className?: string;
  placement?: 'content' | 'sidebar' | 'header' | 'footer';
  priority?: 'low' | 'medium' | 'high';
  fallbackContent?: React.ReactNode;
  onAdLoad?: () => void;
  onAdError?: () => void;
}

// Smartlink ad component specifically for the Effectivegate link
export const SmartlinkAd = ({ 
  className,
  placement = 'content',
  priority = 'medium',
  fallbackContent,
  onAdLoad,
  onAdError
}: SmartlinkAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isAdBlocked, setIsAdBlocked] = useState(false);

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

    // Function to initialize the Smartlink ad
    const initializeSmartlinkAd = () => {
      try {
        // Create an iframe for the Smartlink
        const iframe = document.createElement('iframe');
        iframe.src = SMARTLINK_CONFIG.smartlink.url;
        iframe.style.width = '100%';
        iframe.style.height = placement === 'header' || placement === 'footer' ? '60px' : 'auto';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
        iframe.title = 'Smartlink Advertisement';
        iframe.frameBorder = '0';
        
        // Add loading attributes based on priority
        if (priority === 'low') {
          iframe.loading = 'lazy';
        } else if (priority === 'high') {
          iframe.loading = 'eager';
        } else {
          iframe.loading = 'lazy';
        }

        // Handle successful load
        iframe.onload = () => {
          setAdLoaded(true);
          onAdLoad?.();
        };

        // Handle error
        iframe.onerror = () => {
          setAdError(true);
          onAdError?.();
        };

        // Add iframe to container
        if (containerRef.current) {
          containerRef.current.appendChild(iframe);
        }

      } catch (error) {
        console.error('Error initializing Smartlink ad:', error);
        setAdError(true);
        onAdError?.();
      }
    };

    // Only initialize if no ad blocker detected
    if (!isAdBlocked) {
      // Load based on priority
      if (priority === 'low') {
        // Load after page is mostly loaded
        setTimeout(() => {
          if (containerRef.current && !adLoaded && !adError) {
            initializeSmartlinkAd();
          }
        }, 3000);
      } else if (priority === 'medium') {
        // Load after initial render
        setTimeout(() => {
          if (containerRef.current && !adLoaded && !adError) {
            initializeSmartlinkAd();
          }
        }, 1000);
      } else {
        // Load immediately
        initializeSmartlinkAd();
      }
    } else {
      setAdError(true);
    }

    // Cleanup function
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
  }, [placement, priority, onAdLoad, onAdError, adLoaded, adError, isAdBlocked]);

  // Fallback content when ad fails to load or is blocked
  const renderFallback = () => {
    if (fallbackContent) {
      return fallbackContent;
    }
    
    return (
      <div className="flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg p-4 h-16">
        <span className="text-gray-500 text-sm">Advertisement</span>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "smartlink-ad-container relative overflow-hidden",
        className
      )}
    >
      {!adLoaded && !adError && (
        <div className="flex items-center justify-center bg-gray-50 h-16">
          <div className="text-gray-400 text-sm">Loading ad...</div>
        </div>
      )}
      
      {adError && renderFallback()}
      
      {/* Ad blocker notice */}
      {isAdBlocked && (
        <div className="flex items-center justify-center bg-gray-100 h-16">
          <span className="text-gray-500 text-sm">Ad Blocked</span>
        </div>
      )}
    </div>
  );
};