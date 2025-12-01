'use client';

import React, { useEffect, useRef } from "react";

export default function AdsterraAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double loading
    if (!adRef.current) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "//plxxx.com/xxx.js"; // ← حط هنا السكريبت الحقيقي ديالك
    script.dataset.zone = "xxx";        // ← zone الحقيقي
    script.dataset.key = "xxx";         // ← key الحقيقي

    adRef.current.appendChild(script);

    return () => {
      // Cleanup safely
      if (script && script.parentNode === adRef.current) {
        adRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "300px",
        height: "250px",
        background: "#fff", // غادي يتحيد ملي الإعلان يبان
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* placeholder */}
    </div>
  );
}
