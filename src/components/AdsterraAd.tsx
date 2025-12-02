"use client";
import React, { useEffect, useRef } from "react";

interface AdProps {
  keyId: string;
  width: number;
  height: number;
}

export default function AdsterraAd({ keyId, width, height }: AdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear old script
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    // IMPORTANT: Adsterra ads work even without window.atOptions
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;

    containerRef.current.appendChild(script);
  }, [keyId]);

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className="flex justify-center items-center"
    >
      Loading Ad...
    </div>
  );
}
