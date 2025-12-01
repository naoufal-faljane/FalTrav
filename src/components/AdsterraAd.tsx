'use client';

import React, { useEffect, useRef } from "react";

interface AdsterraAdProps {
  zone: string;
  keyId: string;
  width?: number;
  height?: number;
}

export default function AdsterraAd({
  zone,
  keyId,
  width,
  height,
}: AdsterraAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    const scriptKey = `${keyId}-${Date.now()}`;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.adsterra.com/script.js"; // ← هنا حط السكريبت الحقيقي
    script.dataset.zone = zone;
    script.dataset.key = scriptKey;

    adRef.current.innerHTML = ""; // clear previous ads
    adRef.current.appendChild(script);

    return () => {
      if (adRef.current && script.parentNode === adRef.current) {
        adRef.current.removeChild(script);
      }
    };
  }, [zone, keyId]);

  return (
    <div
      ref={adRef}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      Loading Ad...
    </div>
  );
}
