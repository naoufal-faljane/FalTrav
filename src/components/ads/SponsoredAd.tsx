import { AdComponent } from './AdComponent';
import { ADS_CONFIG } from '@/lib/ad-management';

// Rectangle Ad Component - 300x250
export const RectangleAd = ({ 
  className, 
  priority = 'medium',
  fallbackContent 
}: {
  className?: string;
  priority?: 'low' | 'medium' | 'high';
  fallbackContent?: React.ReactNode;
}) => {
  return (
    <AdComponent
      type="rectangle"
      adKey={ADS_CONFIG.rectangle.key}
      className={className}
      priority={priority}
      fallbackContent={fallbackContent}
    />
  );
};

// Mobile Ad Component - 320x50
export const MobileAd = ({ 
  className, 
  priority = 'medium',
  fallbackContent 
}: {
  className?: string;
  priority?: 'low' | 'medium' | 'high';
  fallbackContent?: React.ReactNode;
}) => {
  return (
    <AdComponent
      type="mobile"
      adKey={ADS_CONFIG.mobile.key}
      className={className}
      priority={priority}
      fallbackContent={fallbackContent}
    />
  );
};

// Leaderboard Ad Component - 728x90
export const LeaderboardAd = ({ 
  className, 
  priority = 'medium',
  fallbackContent 
}: {
  className?: string;
  priority?: 'low' | 'medium' | 'high';
  fallbackContent?: React.ReactNode;
}) => {
  return (
    <AdComponent
      type="leaderboard"
      adKey={ADS_CONFIG.leaderboard.key}
      className={className}
      priority={priority}
      fallbackContent={fallbackContent}
    />
  );
};

// Native Ad Component - Responsive
export const NativeAd = ({ 
  className, 
  priority = 'medium',
  slot,
  fallbackContent 
}: {
  className?: string;
  priority?: 'low' | 'medium' | 'high';
  slot?: string;
  fallbackContent?: React.ReactNode;
}) => {
  return (
    <AdComponent
      type="native"
      adKey={ADS_CONFIG.rectangle.key} // Using rectangle key as default, can be changed
      className={className}
      slot={slot}
      priority={priority}
      fallbackContent={fallbackContent}
    />
  );
};