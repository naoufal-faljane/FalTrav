import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Defaults to auto

// API route for autocomplete
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const locale = searchParams.get('locale') || 'en';

  if (!term) {
    return new Response('Missing term parameter', { status: 400 });
  }

  try {
    console.log(`Autocomplete request: term=${term}, locale=${locale}`); // Debug log
    
    const response = await fetch(
      `https://autocomplete.travelpayouts.com/places2?term=${term}&locale=${locale}`
    );
    
    if (!response.ok) {
      console.error(`Autocomplete API Error: ${response.status} ${response.statusText}`); // Debug log
      return new Response(`API Error: ${response.status} ${response.statusText}`, { 
        status: response.status 
      });
    }
    
    const data = await response.json();
    console.log('Autocomplete API response:', JSON.stringify(data, null, 2)); // Debug log
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Autocomplete API route error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}