
import { AdComponent } from './AdComponent';

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
      adKey="a425a9ba84b0de190841de26b949448c" // Your 300x250 ad key
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
      adKey="a1593f7dbeeec27923c535ee40c45244" // Your mobile ad key
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
      adKey="a1593f7dbeeec27923c535ee40c45244" // Using mobile ad for leaderboard as example
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
      adKey="a425a9ba84b0de190841de26b949448c" // Using rectangle key as default
      className={className}
      slot={slot}
      priority={priority}
      fallbackContent={fallbackContent}
    />
  );
};