import { NextRequest, NextResponse } from 'next/server';

// In-memory cache with TTL
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number; // milliseconds
}

const cache = new Map<string, CacheEntry>();

function isCachedValid(key: string): boolean {
  const entry = cache.get(key);
  if (!entry) return false;
  return Date.now() - entry.timestamp < entry.ttl;
}

function setCache(key: string, data: any, ttl: number = 60000): void { // 60 seconds default
  cache.set(key, { data, timestamp: Date.now(), ttl });
}

function getCached(key: string): any | null {
  if (isCachedValid(key)) {
    return cache.get(key)!.data;
  }
  return null;
}

function clearExpiredCache(): void {
  for (const [key, entry] of cache.entries()) {
    if (Date.now() - entry.timestamp >= entry.ttl) {
      cache.delete(key);
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    const location = searchParams.get('locationId'); // Still accept locationId parameter
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const currency = searchParams.get('currency') || 'usd';
    const limit = searchParams.get('limit') || '20';

    if (!location || !checkIn || !checkOut) {
      return NextResponse.json({ error: 'locationId (as lat,lon), checkIn, and checkOut parameters are required' }, { status: 400 });
    }

    // Verify that location is in lat,lon format
    const latLonRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (!latLonRegex.test(location)) {
      return NextResponse.json({ error: 'locationId must be in format "lat,lon"' }, { status: 400 });
    }

    const cacheKey = `search:${location}:${checkIn}:${checkOut}:${currency}:${limit}`;
    const cachedData = getCached(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Clear expired cache entries periodically
    if (Math.random() < 0.1) { // 10% chance to clear expired cache
      clearExpiredCache();
    }

    const apiUrl = `https://engine.hotellook.com/api/v2/cache.json?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}&limit=${limit}&token=3fade1e333ca9f1374ebf46f820a2feb`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HotelApp/1.0)',
      },
    });

    // Get the response text first to check what we're dealing with
    const responseText = await response.text();

    if (!response.ok) {
      console.error('Hotellook API error:', response.status, response.statusText, responseText.substring(0, 200) + '...');
      return NextResponse.json({ error: `Hotellook API error: ${response.status} ${response.statusText}` }, { status: response.status || 500 });
    }

    // Check if the response is actual JSON
    if (!responseText.trim().startsWith('{') && !responseText.trim().startsWith('[')) {
      console.error('Hotellook API returned non-JSON response:', responseText.substring(0, 200) + '...');
      return NextResponse.json({ error: 'Hotellook API did not return valid JSON' }, { status: 500 });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Hotellook API JSON:', e, responseText.substring(0, 200) + '...');
      return NextResponse.json({ error: 'Failed to parse Hotellook API response' }, { status: 500 });
    }

    // Cache the response for future requests
    setCache(cacheKey, data);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// Handle preflight requests (CORS)
export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}