'use client';
import React, { useEffect, useRef } from "react";

interface AdsterraAdProps {
  keyId: string;
  width?: number;
  height?: number;
}

export default function AdsterraAd({ keyId, width = 320, height = 50 }: AdsterraAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // نعمل div فارغ لكل ad
    adRef.current.innerHTML = '';

    // إعدادات الإعلان
    const scriptOptions = document.createElement('script');
    scriptOptions.innerHTML = `
      atOptions = {
        'key' : '${keyId}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    adRef.current.appendChild(scriptOptions);

    // السكريبت الرئيسي
    const script = document.createElement('script');
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;
    adRef.current.appendChild(script);

  }, [keyId, width, height]);

  return (
    <div ref={adRef} style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
      Loading Ad...
    </div>
  );
}
