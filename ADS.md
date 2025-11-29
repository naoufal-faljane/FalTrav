# Adsterra Ads Implementation for Travel Website

This document explains how Adsterra ads have been implemented in your travel website in a non-intrusive, user-friendly way.

## Ad Formats Implemented

### 1. Rectangle Banner (300x250)
- Key: a425a9ba84b0de190841de26b949448c
- Used in: Sidebar areas, middle of content sections

### 2. Mobile Banner (320x50)
- Key: a1593f7dbeeec27923c535ee40c45244
- Used in: Header, footer, between content sections

### 3. Smartlink
- URL: https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97
- Used in: Content areas, between articles, strategic placement in travel content

## Ad Placements Strategy

### Non-Intrusive Locations
1. **Header** - Bottom of header on desktop
2. **Footer** - Top of footer section
3. **Article Pages** - Top, middle, and sidebar positions
4. **Destination Pages** - Top, middle, and sidebar positions
5. **Mobile** - Header and content sections optimized for mobile experience
6. **Homepage** - Content area placement for travel tips
7. **News Pages** - Top of news feed and within articles
8. **Books Pages** - Top of book listings

### Ad Frequency Management
- Maximum 3 ads per page
- One ad per position maximum
- Respectful loading priority to not impact page performance
- Ad blocking detection with appropriate fallbacks

## Implementation Components

### AdComponent
- Safe script injection for Adsterra ads
- Ad blocking detection
- Fallback content when ads fail to load
- Loading states and error handling

### Ad Context (AdProvider)
- Centralized ad management
- Frequency tracking
- Position-based ad display logic
- Performance optimization

### SponsoredAd Components
- RectangleAd - 300x250 format
- MobileAd - 320x50 format
- LeaderboardAd - 728x90 format
- NativeAd - Responsive format
- SmartlinkAd - Content-relevant smart link format

## Ad Content Policy

### User Experience Guidelines
- Ads never interrupt user experience
- Loading priority set to medium to not block content
- Responsive design for all screen sizes
- Clear visual distinction between content and ads

### Performance Considerations
- Lazy loading for ads below the fold
- Ad blocking detection to maintain layout integrity
- Performance monitoring to maintain site speed
- Respect for users' connection speed

## Usage in Components

To add ads to any component, use the AdPlacement from the AdContext:

```tsx
import { useAdContext } from '@/contexts/AdContext';

// In your component:
const { AdPlacement } = useAdContext();

// Then in your JSX:
<AdPlacement position="unique-position-name" type="mobile" />
```

## Configuration

### Environment Variables
```bash
# Add to .env.local
NEXT_PUBLIC_ADSTERRA_ENABLED=true
```

### Ad Keys Configuration
Located in `src/lib/ad-management.ts`, you can update the ad keys:

```ts
export const ADS_CONFIG = {
  rectangle: {
    key: 'a425a9ba84b0de190841de26b949448c', // Your 300x250 ad key
    type: 'rectangle',
    dimensions: { width: 300, height: 250 }
  },
  mobile: {
    key: 'a1593f7dbeeec27923c535ee40c45244', // Your 320x50 ad key
    type: 'mobile', 
    dimensions: { width: 320, height: 50 }
  }
}
```

## Testing

To verify ad implementation:
1. Check that ads load properly on different page types
2. Verify ad blocking detection works
3. Ensure no ads appear during user interactions
4. Test performance impact is minimal
5. Confirm responsive behavior on mobile devices

## Troubleshooting

### If ads don't appear:
1. Verify ad keys are correctly set in `ad-management.ts`
2. Check that AdProvider is wrapping your app in the layout
3. Ensure environment variables are properly configured

### If performance is impacted:
1. Adjust ad loading priority using the `priority` prop
2. Consider reducing the number of ad placements
3. Review ad positioning to ensure no duplicate impressions