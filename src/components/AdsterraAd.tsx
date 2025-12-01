'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AdsterraAdProps {
  keyId: string;
  width: string;
  height: string;
  mobileWidth?: string;
  mobileHeight?: string;
}

export default function AdsterraAd({ keyId, width, height, mobileWidth, mobileHeight }: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;
    script.onload = () => setLoading(false);

    // Empty container before append
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [keyId]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const finalWidth = isMobile && mobileWidth ? mobileWidth : width;
  const finalHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <div
      ref={containerRef}
      style={{
        width: finalWidth,
        height: finalHeight,
        minWidth: finalWidth,
        minHeight: finalHeight,
        position: 'relative',
        background: '#f3f3f3',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#666',
            fontSize: '14px',
            zIndex: 1,
            background: '#f3f3f3',
          }}
        >
          Loading Ad...
        </div>
      )}
    </div>
  );
}
