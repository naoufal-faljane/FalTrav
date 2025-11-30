# Adsterra Configuration and Implementation Guide

## Overview
This guide explains how to fully integrate and configure all your Adsterra ads in your Next.js project with a clean, professional structure.

## Complete Component List

### 1. Banner300x250.tsx
- **Dimensions**: 300x250 pixels
- **Key**: a425a9ba84b0de190841de26b949448c (already implemented with your key)
- **Usage**: In-content, sidebar, header
- **Import**: `import Banner300x250 from '@/components/ads/Banner300x250';`

### 2. Skyscraper160x600.tsx
- **Dimensions**: 160x600 pixels
- **Key**: SKYSCRAPER_160X600_AD_KEY (replace with your actual key)
- **Usage**: Sidebar (desktop only)
- **Import**: `import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';`

### 3. Popunder.tsx
- **Type**: Popup ad
- **Key**: 45e2c1252aed751f164908f0b02d9e17 (already implemented with your key)
- **Usage**: Background popup with configurable delay
- **Import**: `import Popunder from '@/components/ads/Popunder';`

### 4. SocialBar.tsx
- **Dimensions**: Variable, typically horizontal
- **Key**: SOCIAL_BAR_AD_KEY (replace with your actual key)
- **Usage**: Top or bottom bar
- **Import**: `import SocialBar from '@/components/ads/SocialBar';`

### 5. InPageNotification.tsx
- **Dimensions**: 300x250 pixels (configurable)
- **Key**: INPAGE_NOTIFICATION_AD_KEY (replace with your actual key)
- **Usage**: Floating notification
- **Import**: `import InPageNotification from '@/components/ads/InPageNotification';`

### 6. NativeBanner.tsx
- **Dimensions**: Variable (typically responsive)
- **Key**: NATIVE_BANNER_AD_KEY (replace with your actual key)
- **Usage**: Content-integrated banner
- **Import**: `import NativeBanner from '@/components/ads/NativeBanner';`

### 7. SmartLink.tsx
- **Type**: Redirect link
- **URL**: https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97 (already implemented with your correct URL)
- **Usage**: Content or sidebar integration
- **Import**: `import SmartLink from '@/components/ads/SmartLink';`

## How to Import and Use Components

### Basic Usage
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

const MyComponent = () => {
  return (
    <div>
      <h1>Content</h1>
      <Banner300x250 />
      <p>More content...</p>
    </div>
  );
};
```

### Using AdManager Context
```jsx
import { AdManagerProvider, useAdManager } from '@/components/ads/AdManager';

// Wrap your app with AdManagerProvider in layout.tsx
const RootLayout = ({ children }) => {
  return (
    <AdManagerProvider>
      {children}
    </AdManagerProvider>
  );
};

// Use in any component
const MyComponent = () => {
  const { renderAd } = useAdManager();
  
  return (
    <div>
      <h1>Content</h1>
      {renderAd('banner300x250')}
      <p>More content...</p>
    </div>
  );
};
```

## Environment Configuration

Add to your `.env.local` file:
```bash
# Enable Adsterra ads
NEXT_PUBLIC_ADSTERRA_ENABLED=true

# Optional: Add any other Adsterra specific environment variables
NEXT_PUBLIC_ADSTERRA_DOMAIN=yourdomain.com
```

## Ad Configuration File

The `src/lib/adConfig.ts` file controls all ad settings:

```ts
export const adConfig: AdManagerConfig = {
  // Banner 300x250 - for in-article or sidebar
  'a425a9ba84b0de190841de26b949448c': {
    key: 'a425a9ba84b0de190841de26b949448c',
    enabled: true,
    placement: 'in-article',
  },

  // Add other ad configurations here as needed
};
```

## Adsterra Domain Setup

For ads to work properly:

1. **Register your domains** in your Adsterra account
2. **Verify domain ownership** as required by Adsterra
3. **Add both http://localhost:3000 and your production domain** to your Adsterra allowed domains list

## Updating Ad Keys

When you receive new Adsterra codes, update them in the respective component files:

1. Update the `atOptions` key value
2. Update the invoke script URL
3. Update the configuration in `src/lib/adConfig.ts`

## Performance Tips

1. **Use dynamic imports** for ads that don't appear on every page:
```jsx
import dynamic from 'next/dynamic';

const Banner300x250 = dynamic(() => import('@/components/ads/Banner300x250'), {
  ssr: false,
  loading: () => <div>Loading Ad...</div>
});
```

2. **Implement ad frequency capping** using the utilities in `utils.ts`

3. **Use lazy loading** for ads below the fold

## Troubleshooting

### Ads not showing?
1. Check your browser console for errors
2. Verify your Adsterra account is properly configured
3. Ensure your domain is registered in your Adsterra account
4. Disable ad blockers during testing
5. Verify all ad keys are correct in component files

### Duplicate ads appearing?
1. Check the `window.__adsInjected` global variable implementation
2. Ensure you're not rendering the same ad component multiple times

### SSR Issues?
1. Ensure all components have `'use client'` directive
2. Use dynamic imports with ssr: false for complex ads
3. Check that scripts are only injected on the client side

## Vercel Deployment Notes

1. All components are designed to work with Vercel's deployment process
2. The `use client` directives ensure proper client-side rendering
3. No server-side dependencies that would cause deployment errors
4. The fallback "Loading Ad..." elements ensure good UX during deployment