# Adsterra Ads Integration Guide

## Folder Structure
```
src/
├── components/
│   └── ads/
│       ├── Banner300x250.tsx
│       ├── Skyscraper160x600.tsx
│       ├── Popunder.tsx
│       ├── SocialBar.tsx
│       ├── InPageNotification.tsx
│       ├── NativeBanner.tsx
│       ├── SmartLink.tsx
│       ├── AdManager.tsx
│       └── utils.ts
└── lib/
    └── adConfig.ts
```

## Component Placement Guide

### 1. Header Placement
Place in your Header component for ads at the top of your site:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

// Inside your header JSX
<header>
  {/* Your header content */}
  <Banner300x250 />
</header>
```

### 2. Sidebar Placement (Desktop)
Place in your sidebar for vertical ads:
```jsx
import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';

// Inside your sidebar JSX (only show on desktop)
<div className="hidden md:block">
  <Skyscraper160x600 />
</div>
```

### 3. Footer Placement
Place in your Footer component:
```jsx
import SmartLink from '@/components/ads/SmartLink';

// Inside your footer JSX
<footer>
  {/* Your footer content */}
  <SmartLink />
</footer>
```

### 4. Inside Blog Posts
Place inside your article content:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

// Inside your article component
<article>
  <div>{/* First half of content */}</div>
  <Banner300x250 />
  <div>{/* Remaining content */}</div>
</article>
```

### 5. Mobile Sticky Banner
For mobile-only sticky bottom banner:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

// In your main layout or mobile-specific component
<div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-center bg-white z-50">
  <Banner300x250 />
</div>
```

### 6. Popup (Popunder)
Place once in your main layout, triggered after 5 seconds:
```jsx
import Popunder from '@/components/ads/Popunder';

// In your main layout component (app/layout.tsx or _app.tsx)
<Popunder delayMs={5000} triggerOnLoad={true} />
```

## Complete Example Implementation

### In your root layout (app/layout.tsx):
```jsx
import { AdManagerProvider } from '@/components/ads/AdManager';
import Popunder from '@/components/ads/Popunder';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdManagerProvider>
          {children}
          <Popunder delayMs={5000} triggerOnLoad={true} />
        </AdManagerProvider>
      </body>
    </html>
  );
}
```

### In your Header component:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

const Header = () => {
  return (
    <header>
      <nav>/* Your navigation */</nav>
      <div className="max-w-7xl mx-auto px-4">
        <Banner300x250 />
      </div>
    </header>
  );
};

export default Header;
```

### In your Sidebar component:
```jsx
import Skyscraper160x600 from '@/components/ads/Skyscraper160x600';

const Sidebar = () => {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-4">
        <Skyscraper160x600 />
      </div>
    </aside>
  );
};

export default Sidebar;
```

### In your Article component:
```jsx
import Banner300x250 from '@/components/ads/Banner300x250';

const Article = ({ content }) => {
  const contentParts = content.split('<!-- AD_PLACEHOLDER -->');

  return (
    <article>
      <h1>Article Title</h1>
      <div>{contentParts[0]}</div>
      <div className="my-6 flex justify-center">
        <Banner300x250 />
      </div>
      <div>{contentParts[1]}</div>
    </article>
  );
};

export default Article;
```

## How to Avoid Conflicts or Duplicate Ads

1. **Use the window.__adsInjected global to prevent duplicate script injections**
2. **For popups, use sessionStorage to limit frequency** 
3. **Use ad frequency management from utils.ts**
4. **Implement ad blocker detection**

## Configuration and Import Instructions

### To enable ads globally, add to your .env.local:
```
NEXT_PUBLIC_ADSTERRA_ENABLED=true
```

### To customize ad keys, update src/lib/adConfig.ts with your actual Adsterra keys

### For responsive ad display:
```jsx
// Mobile-only ad
<div className="md:hidden">
  <Banner300x250 />
</div>

// Desktop-only ad
<div className="hidden md:block">
  <Skyscraper160x600 />
</div>
```

## Important Notes:

1. Replace placeholder keys (like SOCIAL_BAR_AD_KEY) with your actual Adsterra keys when provided
2. The 300x250 banner (a425a9ba84b0de190841de26b949448c) is already implemented with your correct key
3. SmartLink is already implemented with your correct URL
4. Popunder is already implemented with your correct key
5. Test on your production domain as some Adsterra ads may not work on localhost
6. Make sure to register your domain in your Adsterra account