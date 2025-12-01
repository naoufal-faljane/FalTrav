'use client';

import React, { useRef, useEffect } from 'react';

interface AdsterraAdProps {
  keyId: string;
  width: string;          // desktop width
  height: string;         // desktop height
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

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;

    // Show loading text before ad loads
    containerRef.current.innerHTML = "Loading Ad...";
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [keyId]);

  // Determine width/height based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      ref={containerRef}
      style={{
        width: isMobile && mobileWidth ? mobileWidth : width,
        height: isMobile && mobileHeight ? mobileHeight : height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
     
    </div>
  );
}
