// Test script to verify location tracking is working
// Run this in browser console to test location data collection

function testLocationTracking() {
  console.log('Testing location tracking...');

  // Check if user location is available
  const userLocation = window.userLocation;
  
  if (userLocation) {
    console.log('✓ User location data found:', userLocation);
    
    // Check if gtag is available
    if (window.gtag) {
      console.log('✓ gtag is available');
      
      // Test sending a sample event with location data
      try {
        window.gtag('event', 'test_location_tracking', {
          event_category: 'Debug',
          user_city: userLocation.city,
          user_region: userLocation.region, 
          user_country: userLocation.country,
          custom_map: {
            dimension1: 'user_city',
            dimension2: 'user_region',
            dimension3: 'user_country'
          }
        });
        
        console.log('✓ Test event with location data sent successfully');
        console.log('  City:', userLocation.city);
        console.log('  Region:', userLocation.region);
        console.log('  Country:', userLocation.country);
      } catch (error) {
        console.error('✗ Error sending test event:', error);
      }
    } else {
      console.error('✗ gtag is not available');
    }
  } else {
    console.log('✗ User location data not found. This may be because:');
    console.log('  - The location API request is still pending');
    console.log('  - The location API request failed');
    console.log('  - You are running this before the AnalyticsProvider initializes');
    console.log('  - The IP geolocation service is blocked');
  }

  // Check for any gtag errors in console
  console.log('Check your Network tab for requests to google-analytics.com for verification.');
}

// Also provide a function to check the current state of analytics
function checkAnalyticsState() {
  console.log('=== Analytics State Check ===');
  console.log('gtag available:', typeof window.gtag !== 'undefined');
  console.log('userLocation available:', typeof window.userLocation !== 'undefined');
  console.log('dataLayer available:', typeof window.dataLayer !== 'undefined');
  
  if (window.userLocation) {
    console.log('Location:', window.userLocation);
  }
  
  if (window.dataLayer) {
    console.log('Last 5 dataLayer entries:');
    const start = Math.max(0, window.dataLayer.length - 5);
    for (let i = start; i < window.dataLayer.length; i++) {
      console.log(`  [${i}]:`, window.dataLayer[i]);
    }
  }
  
  console.log('============================');
}

// Run tests
testLocationTracking();
checkAnalyticsState();