'use client';

import React, { useRef, useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous content
    containerRef.current.innerHTML = "";

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;

    // When script loads, remove loading
    script.onload = () => setLoading(false);

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [keyId]);

  // Determine size based on screen
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
        background: 'transparent',
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

      {/* Ensure iframe fills container */}
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
