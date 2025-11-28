import { NextRequest } from 'next/server';

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
  const pathname = request.nextUrl.pathname;

  try {
    let apiUrl: string | null = null;
    let cacheKey: string = '';

    // Clear expired cache entries periodically
    if (Math.random() < 0.1) { // 10% chance to clear expired cache
      clearExpiredCache();
    }

    if (pathname === '/api/hotels/lookup') {
      const query = searchParams.get('query');
      const limit = searchParams.get('limit') || '10';

      if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      cacheKey = `lookup:${query}:${limit}`;
      const cachedData = getCached(cacheKey);
      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      apiUrl = `https://engine.hotellook.com/api/v2/lookup.json?query=${encodeURIComponent(query)}&lookFor=both&lang=en&limit=${limit}&token=3fade1e333ca9f1374ebf46f820a2feb`;
    } else if (pathname === '/api/hotels/search') {
      const locationId = searchParams.get('locationId');
      const checkIn = searchParams.get('checkIn');
      const checkOut = searchParams.get('checkOut');
      const currency = searchParams.get('currency') || 'usd';
      const limit = searchParams.get('limit') || '20';

      if (!locationId || !checkIn || !checkOut) {
        return new Response(JSON.stringify({ error: 'locationId, checkIn, and checkOut parameters are required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      cacheKey = `search:${locationId}:${checkIn}:${checkOut}:${currency}:${limit}`;
      const cachedData = getCached(cacheKey);
      if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      apiUrl = `https://engine.hotellook.com/api/v2/cache.json?locationId=${locationId}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}&limit=${limit}&token=3fade1e333ca9f1374ebf46f820a2feb`;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HotelApp/1.0)',
      },
    });

    // Get the response text first to check what we're dealing with
    const responseText = await response.text();

    if (!response.ok) {
      console.error('Hotellook API error:', response.status, response.statusText, responseText.substring(0, 200) + '...');
      return new Response(JSON.stringify({ error: `Hotellook API error: ${response.status} ${response.statusText}` }), {
        status: response.status || 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Check if the response is actual JSON
    if (!responseText.trim().startsWith('{') && !responseText.trim().startsWith('[')) {
      console.error('Hotellook API returned non-JSON response:', responseText.substring(0, 200) + '...');
      return new Response(JSON.stringify({ error: 'Hotellook API did not return valid JSON' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Hotellook API JSON:', e, responseText.substring(0, 200) + '...');
      return new Response(JSON.stringify({ error: 'Failed to parse Hotellook API response' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Cache the response for future requests
    setCache(cacheKey, data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error: any) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// Handle preflight requests (CORS)
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}