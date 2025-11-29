# Google Analytics Setup for Travel App

This document explains how to set up and use Google Analytics with location tracking on your travel website.

## Setup

1. **Get your Google Analytics 4 Measurement ID**:
   - Go to Google Analytics
   - Create a new property or use an existing one
   - Note your Measurement ID (format: G-XXXXXXXXXX)

2. **Add to environment variables**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-GA4-MEASUREMENT-ID
   ```

## Features

### 1. Location Tracking
- Uses IP-based geolocation to determine visitor's city, region, and country
- Automatically includes location data in all page views and events
- Falls back gracefully if location detection fails

### 2. Page View Tracking
- Tracks all page views with location data
- Special tracking for:
  - Destinations (`/destinations/*`)
  - Articles (`/news/*`)
  - Books (`/books/*`)
  - Travel guides (`/travel-guides/*`, `/japan-travel-guide/*`)

### 3. Interaction Tracking
- Automatically tracks clicks on links and buttons
- Tracks scroll depth (25%, 50%, 75%, 90%)
- Tracks form interactions

### 4. Custom Event Tracking
- Use the `useAnalytics` hook for custom tracking
- Examples provided below

## Usage Examples

### Track Custom Events
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackCustomEvent, trackClickInteraction } = useAnalytics();
  
  const handleClick = () => {
    trackCustomEvent('button_click', 'navigation', 'home_to_destinations');
    trackClickInteraction('discover-destinations-btn');
  };
  
  return (
    <button onClick={handleClick}>Discover Destinations</button>
  );
};
```

### Track Specific Page Content
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const ArticlePage = ({ article }) => {
  const { trackArticleView } = useAnalytics();
  
  useEffect(() => {
    trackArticleView(article.title);
  }, [article.title]);
  
  return (
    <div>{/* Article content */}</div>
  );
};
```

### Track Form Submissions
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const ContactForm = () => {
  const { trackFormSubmission } = useAnalytics();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // ... form submission logic
    trackFormSubmission('contact_form');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## Data Collection

The system automatically collects:

### Standard GA4 Data
- Page views and paths
- Session duration
- Bounce rate
- Referral sources
- Device information
- Browser information

### Enhanced Data
- Visitor city (from IP geolocation)
- Visitor region (from IP geolocation) 
- Visitor country (from IP geolocation)
- Scroll depth percentages
- Click paths
- Content engagement metrics

### Custom Events Tracked
- `view_destination` - When viewing a destination page
- `view_article` - When viewing a news article
- `view_book` - When viewing a book page
- `view_guide` - When viewing a travel guide
- `user_interaction` - General user interaction with type and element name
- `scroll` - When users reach scroll thresholds

## Privacy Note
- Uses IP geolocation which is generally considered anonymous
- No personally identifiable information is collected
- All tracking respects user's Do Not Track settings where possible
- Data retention follows Google Analytics policies