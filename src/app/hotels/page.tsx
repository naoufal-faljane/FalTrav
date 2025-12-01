'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePageViewTracker, trackEvent } from '@/lib/analytics';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Star, Users, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, Mountain, Building, Search, Loader2 } from 'lucide-react';

interface HotelLocation {
  id: string;
  name: string;
  country: string;
  type: string;
}

interface Hotel {
  id: string;
  name: string;
  min_price: number;
  price_from?: number;
  stars?: number;
  rating?: number;
  image?: string;
  hotel_url?: string;
  location?: {
    lat: number;
    lon: number;
  };
}

export default function HotelsPage() {
  usePageViewTracker();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<HotelLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Handle input changes with debounce
  useEffect(() => {
    if (location.length > 2) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        fetchSuggestions();
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [location]);

  const fetchSuggestions = async () => {
    try {
      setError(null); // Clear previous errors
      const res = await fetch(`/api/hotels/lookup?query=${encodeURIComponent(location)}&limit=10`);
      
      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (parseErr) {
          // If we can't parse the error response, create a generic one
          throw new Error('Failed to fetch suggestions - server error');
        }
        throw new Error(errorData.error || 'Failed to fetch suggestions');
      }
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }
      
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err: any) {
      console.error('Error fetching suggestions:', err);
      setError(err.message);
    }
  };

  const handleSuggestionClick = (suggestion: HotelLocation) => {
    setLocation(suggestion.name);
    setSelectedLocationId(suggestion.id);
    setShowSuggestions(false);
    trackEvent(
  "hotel_location_selected",
  "Hotelsearch",
  suggestion.name
);


  };

  const handleSearch = async () => {
    if (!selectedLocationId) {
      setError('Please select a location from the suggestions');
      return;
    }
    
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates');
      return;
    }

    // Validate date range
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkInDate >= checkOutDate) {
      setError('Check-out date must be after check-in date');
      return;
    }

    setError(null);
    setLoading(true);
    setNoResults(false);
    
    try {
      const res = await fetch(`/api/hotels/search?locationId=${selectedLocationId}&checkIn=${checkIn}&checkOut=${checkOut}&currency=usd&limit=20`);
      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (parseErr) {
          // If we can't parse the error response, create a generic one
          throw new Error('Failed to fetch hotels - server error');
        }
        throw new Error(errorData.error || 'Failed to fetch hotels');
      }
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }
      
      const data = await res.json();
      
      // Normalize the response structure (Hotellook can return different formats)
      let hotelData: Hotel[] = [];
      
      if (data.results && Array.isArray(data.results)) {
        hotelData = data.results;
      } else if (data.data && Array.isArray(data.data)) {
        hotelData = data.data;
      } else if (Array.isArray(data)) {
        hotelData = data;
      } else {
        hotelData = [];
      }
      
      setHotels(hotelData);
      setNoResults(hotelData.length === 0);
      trackEvent('hotel_search_performed', 'hotels', location, hotelData.length);
    } catch (err: any) {
      console.error('Error fetching hotels:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Find Your Perfect Hotel</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Discover and book the best hotels worldwide with exclusive deals and amenities.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 sm:mb-10 p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <label className="text-sm font-medium mb-1 block">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onMouseEnter={() => trackEvent('search_field_hover', 'hotels', 'destination', 0)}
                />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-gray-500">{suggestion.country} ({suggestion.type})</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onMouseEnter={() => trackEvent('search_field_hover', 'hotels', 'checkin', 0)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  onMouseEnter={() => trackEvent('search_field_hover', 'hotels', 'checkout', 0)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  onMouseEnter={() => trackEvent('search_field_hover', 'hotels', 'guests', 0)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button 
              className="w-full sm:w-auto px-8 py-2 flex items-center"
              onClick={handleSearch}
              disabled={loading}
              onMouseEnter={() => trackEvent('search_button_hover', 'hotels', 'hotel_search', 0)}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Hotels
                </>
              )}
            </Button>
          </div>
        </Card>

        {error && (
          <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            <p>Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="max-w-7xl mx-auto flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && !noResults && hotels.length > 0 && (
          <div className="mb-4 text-center">
            <p className="text-muted-foreground">
              {hotels.length} hotels found for {location} from {formatDate(checkIn)} to {formatDate(checkOut)}
            </p>
          </div>
        )}

        {/* Hotel Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group h-full flex flex-col">
                  <div className="relative h-40 sm:h-48">
                    {hotel.image ? (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onMouseEnter={() => trackEvent('hotel_image_hover', 'hotels', hotel.name, hotel.min_price || hotel.price_from)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Building className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center">
                      {[...Array(hotel.stars || 0)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold line-clamp-1 text-sm sm:text-base">{hotel.name}</h3>
                      <span className="text-base sm:text-lg font-bold text-primary">${hotel.min_price || hotel.price_from}<span className="text-xs sm:text-sm font-normal text-muted-foreground">/night</span></span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground text-xs sm:text-sm mb-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span>{location}</span>
                    </div>
                    
                    <div className="text-muted-foreground text-xs sm:text-sm mb-3">
                      <p className="line-clamp-2">
                        {hotel.name} with {hotel.stars || 'unknown'} stars. 
                        {hotel.min_price || hotel.price_from ? ` From $${hotel.min_price || hotel.price_from} per night.` : ''}
                      </p>
                    </div>

                    <div className="mt-auto pt-2">
                      <Button
                        className="w-full text-xs sm:text-sm"
                        onClick={() => {
                          trackEvent('hotel_selected', 'hotels', hotel.name, hotel.min_price || hotel.price_from);
                          trackEvent('click_book_now', 'hotels', hotel.name, hotel.min_price || hotel.price_from);
                          if (hotel.hotel_url) {
                            window.open(hotel.hotel_url, '_blank');
                          } else {
                            // Fallback to Hotellook with booking information
                            const bookingUrl = `https://www.hotellook.com/?hotel=${hotel.id}&checkIn=${checkIn}&checkOut=${checkOut}`;
                            window.open(bookingUrl, '_blank');
                          }
                        }}
                      >
                        <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && noResults && (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-medium">No hotels found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {!loading && hotels.length === 0 && !noResults && selectedLocationId && (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-medium">Search for hotels</h3>
            <p className="text-muted-foreground mt-2">Enter your destination and dates to find available hotels</p>
          </div>
        )}
      </Container>
    </div>
  );
}