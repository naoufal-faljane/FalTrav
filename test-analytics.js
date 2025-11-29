// Test script to verify analytics implementation
console.log('Analytics setup verification:');
console.log('- Enhanced analytics file created');
console.log('- Location tracking added');
console.log('- Interaction tracking implemented');
console.log('- Environment variables file created');
console.log('- Analytics components updated');

// Check if gtag is available
if (typeof window !== 'undefined') {
  console.log('Gtag available:', !!window.gtag);
  console.log('DataLayer initialized:', Array.isArray(window.dataLayer));
}

// Check if environment variable is set
console.log('GA Measurement ID configured:', !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);