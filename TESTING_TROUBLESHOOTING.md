## Adsterra Ads - Testing and Troubleshooting Guide

### Pre-Deployment Checklist

1. **Domain Registration**:
   - Ensure your domain (and all subdomains) is registered and approved in your Adsterra account
   - Verify that your Vercel deployment URL is whitelisted if testing on staging

2. **GDPR/Privacy Compliance**:
   - If your site serves EU users, implement a cookie consent banner
   - Consider adding the consent requirement to your adConfig.ts:
   ```typescript
   export const globalAdSettings = {
     consentRequired: true, // Set to true if GDPR consent is required
     // ...
   };
   ```
   - Add a comment in your component where you'd show the consent notice:
   ```typescript
   {/* TODO: Add GDPR consent banner here if required */}
   ```

3. **Ad Blocker Handling**:
   - Consider adding fallback content for users with ad blockers enabled
   - You can detect ad blockers using the AdManager:
   ```typescript
   import { AdManager } from '@/components/ads/AdManager';

   // In your component
   const checkAdBlocker = async () => {
     const isBlocked = await AdManager.isAdBlockerDetected();
     if (isBlocked) {
       // Show alternative content
     }
   };
   ```

### Testing Steps

1. **Local Development**:
   ```bash
   npm run dev
   ```
   - Note: Ads won't show on localhost due to domain restrictions
   - Check console for any errors related to scripts

2. **Deploy to Vercel**:
   - Push your changes to trigger a deployment
   - Test on the Vercel preview URL or production domain

3. **Incognito Testing**:
   - Open your site in an incognito/private window
   - Disable ad blockers for your domain during testing
   - Test on different browsers to ensure compatibility

4. **Network Tab Verification**:
   - Open DevTools → Network tab
   - Look for requests to `highperformanceformat.com` and `effectivegatecpm.com`
   - Verify that ad scripts are loading without errors
   - Check that container elements are populated with ad content

5. **Responsive Testing**:
   - Test on mobile devices/screens to ensure sticky ads appear
   - Verify desktop ads don't show on mobile
   - Use DevTools mobile emulator to test different screen sizes

### Ad Blocker Detection and Fallbacks

If ads are blocked, consider showing alternative content:

```jsx
import { AdManager } from '@/components/ads/AdManager';

const AdWithFallback = () => {
  const [adBlocked, setAdBlocked] = useState(false);
  
  useEffect(() => {
    const checkAdBlocker = async () => {
      const isBlocked = await AdManager.isAdBlockerDetected();
      setAdBlocked(isBlocked);
    };
    
    checkAdBlocker();
  }, []);
  
  if (adBlocked) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please consider disabling your ad blocker to support our site.</p>
      </div>
    );
  }
  
  return <Banner300x250 />;
};
```

### Common Issues and Solutions

1. **Ads Not Loading**:
   - Verify domain is approved in Adsterra account
   - Check browser console for errors
   - Ensure "use client" is at the top of each component
   - Confirm scripts are loading in Network tab

2. **Duplicate Ads**:
   - Verify the `window.__adsInjected` tracking is working
   - Check that useEffect dependencies are correctly set
   - Ensure session tracking for popunders is working

3. **Responsive Issues**:
   - Verify mobile detection is working properly
   - Check that mobile-only ads don't show on desktop
   - Confirm desktop-only ads don't show on mobile

4. **Popunder Not Working**:
   - Check sessionStorage is working (not in incognito)
   - Verify the trigger conditions are met
   - Ensure only one popunder per session

5. **Server-Side Rendering Errors**:
   - Confirm all DOM operations are wrapped in useEffect
   - Verify window/document checks before using them
   - Check that "use client" directive is present

### Performance Considerations

- Ads are loaded asynchronously to minimize impact on page load
- Scripts are injected only once per session
- Components include fallback content to maintain layout stability
- Mobile-specific ads reduce bandwidth usage on slower connections

### Privacy and Compliance Notes

```jsx
// TODO: Add cookie consent banner if required by region
// Example location where you might add consent logic:
const AdWithConsent = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(false);
  
  if (!consentGiven) {
    return (
      <div>
        <p>We use advertising to support our service.</p>
        <button onClick={() => setConsentGiven(true)}>Accept</button>
      </div>
    );
  }
  
  return children;
};
```

### Debugging Tips

1. Look for the `__adsInjected` object in browser console:
   ```js
   console.log(window.__adsInjected);
   ```

2. Check sessionStorage for popunder tracking:
   ```js
   console.log(sessionStorage.getItem('ad-45e2c1252aed751f164908f0b02d9e17-lastShown'));
   ```

3. Monitor network requests for ad server calls in DevTools.

4. Use the AdManager methods to check ad status:
   ```js
   // Check if an ad is enabled
   AdManager.isAdEnabled('a425a9ba84b0de190841de26b949448c');
   
   // Check if an ad is loaded
   AdManager.isAdLoaded('a425a9ba84b0de190841de26b949448c');
   ```