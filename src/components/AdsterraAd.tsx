'use client';

import React, { useEffect, useRef } from "react";

interface AdsterraAdProps {
  width?: number;
  height?: number;
  zone: string; // Zone ID dyalek
  keyId: string; // Key dyalek
}

export default function AdsterraAd({
  width = 300,
  height = 250,
  zone,
  keyId,
}: AdsterraAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Generate a random key to force Adsterra refresh
    const scriptKey = `${keyId}-${Date.now()}`;

    const script = document.createElement("script");
    script.async = true;
    script.src = "//plxxx.com/xxx.js"; // ← حط هنا السكريبت الحقيقي
    script.dataset.zone = zone;        // ← zone الحقيقي
    script.dataset.key = scriptKey;    // ← key + random

    adRef.current.innerHTML = "";      // clear previous ads if any
    adRef.current.appendChild(script);

    return () => {
      if (adRef.current && script.parentNode === adRef.current) {
        adRef.current.removeChild(script);
      }
    };
  }, [zone, keyId]); // re-run if zone/key changes

  return (
    <div
      ref={adRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Placeholder */}
      Loading Ad...
    </div>
  );
}
