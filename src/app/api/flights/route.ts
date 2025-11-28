import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { origin, destination, departure_at, return_at } = await request.json();

    // Validate required fields
    if (!origin || !destination || !departure_at) {
      console.error('Missing required fields:', { origin, destination, departure_at });
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: origin, destination, departure_at',
          details: { origin: !!origin, destination: !!destination, departure_at: !!departure_at }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      origin,
      destination,
      departure_at,
      currency: 'usd',
      token: '3fade1e333ca9f1374ebf46f820a2feb',
      ...(return_at && { return_at }),
    });

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${params.toString()}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ 
          error: `Travelpayouts API error: ${response.status} ${response.statusText}` 
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error: any) {
    console.error('Flight API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}