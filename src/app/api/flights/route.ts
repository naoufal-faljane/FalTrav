import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Defaults to auto

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departure_at = searchParams.get('departure_at');
  const return_at = searchParams.get('return_at');
  const type = searchParams.get('type') || 'prices-calendar'; // Default to calendar

  const API_KEY = process.env.AVIASALES_API_KEY;

  if (!API_KEY) {
    console.error('AVIASALES_API_KEY is not set in environment variables');
    return new Response('API key not configured', { status: 500 });
  }

  if (!origin || !destination) {
    return new Response('Missing required parameters', { status: 400 });
  }

  try {
    let apiUrl = '';
    if (type === 'prices-calendar') {
      // Correct API URL for prices-calendar
      apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices-calendar?origin=${origin}&destination=${destination}&token=${API_KEY}`;
    } else {
      // For prices_for_dates
      const params = new URLSearchParams({
        origin,
        destination,
        departure_at: departure_at || '',
        ...(return_at && { return_at }),
        token: API_KEY
      });
      apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${params}`;
    }

    console.log('Making request to:', apiUrl); // Debug log
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return new Response(`API Error: ${response.status} ${response.statusText}`, { 
        status: response.status 
      });
    }
    
    const data = await response.json();
    console.log('API response data:', JSON.stringify(data, null, 2)); // Debug log
    
    // For prices-calendar, transform data to the expected format
    if (type === 'prices-calendar') {
      const transformedData = data.map((item: any) => ({
        day: item.departure_at, // This should be in YYYY-MM-DD format
        min_price: item.price,
        ...(item.return_at && { return_at: item.return_at })
      }));
      
      console.log('Transformed calendar data:', JSON.stringify(transformedData, null, 2)); // Debug log
      
      return new Response(JSON.stringify(transformedData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // For prices_for_dates, return the data as is
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Server API route error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}