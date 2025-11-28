'use client';

import { Suspense } from 'react';
import { usePageViewTracker } from '@/lib/analytics';

function PageViewTrackerContent() {
  usePageViewTracker();
  return null;
}

export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerContent />
    </Suspense>
  );
}