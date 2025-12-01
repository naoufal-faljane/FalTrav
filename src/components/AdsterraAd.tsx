'use client';
import React, { useEffect, useRef } from "react";

interface AdsterraAdProps {
  keyId: string;
  width?: number;
  height?: number;
}

export default function AdsterraAd({ keyId, width = 300, height = 250 }: AdsterraAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear old ad
    adRef.current.innerHTML = "";

    // Set atOptions globally
    (window as any).atOptions = {
      key: keyId,
      format: "iframe",
      height,
      width,
      params: {},
    };

    // Load Adsterra script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;

    adRef.current.appendChild(script);
  }, [keyId, width, height]);

  return (
    <div
      ref={adRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      Loading Ad...
    </div>
  );
}
