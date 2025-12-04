// Simple test to validate the IP geolocation functionality
// This simulates what the getLocationFromIP function does

async function testIPLocationServices() {
  console.log('Testing IP geolocation services...\n');

  // Test AbortSignal availability in Node.js environment
  if (typeof AbortSignal !== 'undefined') {
    console.log('✓ AbortSignal is available');
  } else {
    console.log('⚠ AbortSignal is not available in this environment');
  }

  // Test IP address fetchers
  const testIPFetchers = async () => {
    console.log('\nTesting IP address services...');

    // Test 1: ipify
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ ipify.org: ${data.ip}`);
      } else {
        console.log(`✗ ipify.org failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ ipify.org failed: ${error.message}`);
    }

    // Test 2: jsonip
    try {
      const response = await fetch('https://jsonip.com', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ jsonip.com: ${data.ip || data.origin}`);
      } else {
        console.log(`✗ jsonip.com failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ jsonip.com failed: ${error.message}`);
    }
  };

  // Test location services
  const testLocationServices = async (ip = '') => {
    console.log('\nTesting location services...');

    // Test 1: ipapi.co without IP
    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ ipapi.co (no IP): Country: ${data.country || 'Unknown'}, City: ${data.city || 'Unknown'}`);
      } else {
        console.log(`✗ ipapi.co (no IP) failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ ipapi.co (no IP) failed: ${error.message}`);
    }

    // Test 2: extreme-ip-lookup
    try {
      const response = await fetch('https://extreme-ip-lookup.com/json/', {
        signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`✓ extreme-ip-lookup.com: Country: ${data.country || 'Unknown'}, City: ${data.city || 'Unknown'}`);
      } else {
        console.log(`✗ extreme-ip-lookup.com failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ extreme-ip-lookup.com failed: ${error.message}`);
    }
  };

  await testIPFetchers();
  await testLocationServices();

  console.log('\nTest completed. The updated getLocationFromIP function should now handle network failures more gracefully.');
}

// Run the test
testIPLocationServices().catch(console.error);