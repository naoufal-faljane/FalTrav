'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AdsterraAdProps {
  keyId: string;          // Adsterra key
  width: string;          // desktop width, e.g., '300px'
  height: string;         // desktop height, e.g., '250px'
  mobileWidth?: string;   // optional mobile width
  mobileHeight?: string;  // optional mobile height
}

export default function AdsterraAd({
  keyId,
  width,
  height,
  mobileWidth,
  mobileHeight,
}: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;

    // Hide loading when script loads
    script.onload = () => setLoading(false);

    // Append script to container
    containerRef.current.appendChild(script);

    // Cleanup: remove only this script to prevent errors
    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [keyId]);

  // Determine size based on device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const finalWidth = isMobile && mobileWidth ? mobileWidth : width;
  const finalHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <div
      ref={containerRef}
      style={{
        width: finalWidth,
        height: finalHeight,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#f3f3f3',
      }}
    >
      {loading && (
        <span
          style={{
            position: 'absolute',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Loading Ad...
        </span>
      )}

      {/* Ensure iframe fills the container */}
      <style jsx>{`
        div > iframe {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
