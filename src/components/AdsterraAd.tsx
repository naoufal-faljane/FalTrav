'use client';
import React, { useEffect, useRef } from 'react';

interface AdsterraAdProps {
  keyId: string;
  width?: number;
  height?: number;
}

export default function AdsterraAd({
  keyId,
  width = 300,
  height = 250
}: AdsterraAdProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // HTML inside iframe
    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>
            html, body { margin:0; padding:0; overflow:hidden; background:transparent; }
          </style>
        </head>
        <body>
          <div id="ad-root" style="width:${width}px; height:${height}px;"></div>
          <script>
            atOptions = {
              key: '${keyId}',
              format: 'iframe',
              height: ${height},
              width: ${width},
              params: {}
            };
          </script>
          <script src="//www.highperformanceformat.com/${keyId}/invoke.js"></script>
        </body>
      </html>
    `;

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();

    return () => {
      try {
        const d = iframe.contentWindow?.document;
        if (d) {
          d.open();
          d.write('<!doctype html><html><body></body></html>');
          d.close();
        }
      } catch (e) {}
    };
  }, [keyId, width, height]);

  return (
    <iframe
      ref={iframeRef}
      title="adsterra-ad"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "0",
        overflow: "hidden",
        background: "transparent",
        display: "block"
      }}
      scrolling="no"
    />
  );
}