## Adsterra Ad Integration for Next.js

This documentation explains how to integrate and use the Adsterra ad components in your Next.js application.

### Folder Structure
```
/src
  /components
    /ads
      Banner300x250.tsx
      Skyscraper160x600.tsx
      Leaderboard468x60.tsx
      MobileSticky320x50.tsx
      Popunder.tsx
      SmartLink.tsx
      AdManager.tsx
      utils.ts
  /lib
    adConfig.ts
```

### Component Usage

#### 1. Banner 300x250
Use in articles or sidebars:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

// In your component
<Banner300x250 className="my-banner-class" />
```

#### 2. Skyscraper 160x600
Use in sidebar (desktop only):
```jsx
import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';

// In your component
<Skyscraper160x600 className="my-skyscraper-class" />
```

#### 3. Leaderboard 468x60
Use in header:
```jsx
import Leaderboard468x60 from '@/components/ads/Leaderboard468x60';

// In your component
<Leaderboard468x60 className="my-leaderboard-class" />
```

#### 4. Mobile Sticky 320x50
Use as bottom sticky (mobile only):
```jsx
import MobileSticky320x50 from '@/components/ads/MobileSticky320x50';

// In your component
<MobileSticky320x50 className="my-sticky-class" />
```

#### 5. SmartLink
Use as a button/link:
```jsx
import SmartLink from '@/components/ads/SmartLink';

// In your component
<SmartLink>Check this offer!</SmartLink>
```

#### 6. Popunder
Add once in your main layout (e.g., `_app.tsx`):
```jsx
import Popunder from '@/components/ads/Popunder';

// In your main layout
<Popunder triggerOnFirstClick={true} />
```

### AdManager Usage

To control ads programmatically:

```jsx
import { useAdManager } from '@/components/ads/AdManager';

const MyComponent = () => {
  const {
    enableAd,
    disableAd,
    isAdEnabled,
    isAdLoaded,
    getEnabledAds
  } = useAdManager();

  // Example: Disable a specific ad
  const handleDisableAd = () => {
    disableAd('a425a9ba84b0de190841de26b949448c'); // Banner 300x250 key
  };

  return (
    <div>
      <button onClick={handleDisableAd}>Disable Banner Ad</button>
      {isAdEnabled('a425a9ba84b0de190841de26b949448c') && (
        <Banner300x250 />
      )}
    </div>
  );
};
```

### Page/Component Integration Examples

#### In Header Component
```jsx
import Leaderboard468x60 from '@/components/ads/Leaderboard468x60';

const Header = () => {
  return (
    <header className="header">
      <h1>My Site</h1>
      <Leaderboard468x60 />
    </header>
  );
};
```

#### In Sidebar Component
```jsx
import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul>...</ul>
      <Skyscraper160x600 />
    </aside>
  );
};
```

#### In Blog Post Between Paragraphs
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

const BlogPost = ({ content }) => {
  const paragraphs = content.split('\\n');
  
  return (
    <article>
      {paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
      
      {/* Ad after the 3rd paragraph */}
      {paragraphs.length > 3 && (
        <>
          <Banner300x250 />
          {paragraphs.slice(3).map((para, index) => (
            <p key={index + 3}>{para}</p>
          ))}
        </>
      )}
    </article>
  );
};
```

#### In Footer Component
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';
import SmartLink from '@/components/ads/SmartLink';

const Footer = () => {
  return (
    <footer className="footer">
      <Banner300x250 />
      <SmartLink>Special Offer</SmartLink>
      <p>&copy; 2025 My Site</p>
    </footer>
  );
};
```

#### In Main App Layout (with Popunder)
```jsx
import React from 'react';
import Popunder from '@/components/ads/Popunder';
import MobileSticky320x50 from '@/components/ads/MobileSticky320x50';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Popunder triggerOnFirstClick={true} />
      <MobileSticky320x50 />
    </>
  );
};
```

### Configuration

Modify the ad behavior in `src/lib/adConfig.ts`:

- Enable/disable individual ads with the `enabled` property
- Control mobile/desktop display with `mobileOnly` and `desktopOnly`
- Set timing with `delayMs` and `frequencyHours`
- Adjust ad sizes and parameters as needed

### Responsive Behavior

- Mobile sticky ads only show on screens ≤ 480px
- Desktop ads (like skyscraper) only show on screens ≥ 768px
- Use the utility functions if you need to conditionally render ads based on screen size