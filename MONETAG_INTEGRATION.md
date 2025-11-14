# FalTrav Website with Monetag Integration

This is the FalTrav travel website with Monetag ad integration implemented.

## Project Structure

- `index.html` - Main webpage
- `monetag.js` - Monetag ad script integration
- `sw.js` - Service Worker file for ad delivery and site performance
- `css/style.css` - Main stylesheet including monetag ad styling
- Other HTML files (`cities.html`, `news.html`, `shop.html`, etc.) - All updated with monetag integration

## Monetag Integration Details

Monetag ads have been integrated into all HTML pages with:

1. **Script inclusion**: Added monetag.js to the head of each HTML page
2. **Ad placement**: Added a responsive 300x250 ad container in page content areas
3. **Styling**: Added non-intrusive styling in style.css
4. **Service Worker**: Implemented service worker registration for optimized ad delivery

## Non-intrusive Ad Implementation

- Ad placement: Centered within content with 20px margin
- Size: 300x250 pixels (standard ad size)
- Styling: Centered with margins to avoid interfering with main content
- Placement: Added after main content but before footer for natural flow

## Service Worker

The service worker is registered on all pages for:

- Optimized ad delivery
- Improved site performance
- Offline functionality support

## Deployment

The site is ready for deployment on Netlify. All files are correctly structured and integrated with monetag for ad delivery.

## Notes

- The monetag.js file includes dynamic loading of the monetag ad manager
- Current implementation uses placeholder ad containers that will be populated by monetag
- Service worker is pre-configured for ad delivery optimization