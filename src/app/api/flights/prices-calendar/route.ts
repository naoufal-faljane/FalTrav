import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    // Validate required fields
    if (!origin || !destination) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: origin, destination' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      origin,
      destination,
      currency: 'usd',
      token: '3fade1e333ca9f1374ebf46f820a2feb',
    });

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_calendar?${params}`;

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
    console.error('Flight prices calendar API error:', error);
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