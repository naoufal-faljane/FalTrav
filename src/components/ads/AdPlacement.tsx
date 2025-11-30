"use client";

import React, { useEffect } from "react";

interface AdPlacementProps {
  position: string;
  type?: "banner" | "smartlink";
}

export default function AdPlacement({ position, type = "banner" }: AdPlacementProps) {
  useEffect(() => {
    try {
      // إعادة تحميل سكريبت Travelpayouts
      // باش الإعلانات تعمل بعد كل navigation
      const script = document.createElement("script");
      script.src = "//www.travelpayouts.com/widgets/XXXXX.js"; // حط هنا الكود ديالك
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } catch (err) {
      console.error("AdPlacement Error:", err);
    }
  }, [position]);

  return (
    <div className="my-6 text-center">
      <div id={`ad-${position}`} className="w-full flex justify-center">
        {/* كاين هنا الإعلان */}
      </div>
    </div>
  );
}
