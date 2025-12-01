'use client';

import { useEffect, useRef } from 'react';

// تعريف الأنواع ديال props
interface AdsterraAdProps {
  keyId: string;
  width: string;
  height: string;
}

export default function AdsterraAd({ keyId, width, height }: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. إنشاء السكريبت ديال الإعلان
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;
    script.async = true;

    // 2. عرض Loading Ad قبل ما يحمل الإعلان
    containerRef.current.innerHTML = "Loading Ad...";
    containerRef.current.appendChild(script);

    // تنظيف عند unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [keyId]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f3f3f3',
      }}
    >
      Loading Ad...
    </div>
  );
}
