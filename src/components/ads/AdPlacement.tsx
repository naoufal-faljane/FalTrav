'use client';

import React from 'react';
import { useAdContext } from '@/contexts/AdContext';

interface AdPlacementProps {
  position: string;
  type?: 'mobile' | 'rectangle' | 'smartlink' | 'leaderboard' | 'native' | 'banner';
  className?: string;
}

// This component uses the AdContext to place ads properly
export default function AdPlacement({ position, type = 'mobile', className }: AdPlacementProps) {
  const { AdPlacement: ContextAdPlacement } = useAdContext();

  // Map 'banner' type to 'rectangle' for backward compatibility
  const resolvedType = type === 'banner' ? 'rectangle' : type;

  return (
    <div className={`my-6 text-center ${className}`}>
      <ContextAdPlacement position={position} type={resolvedType} />
    </div>
  );
}
