'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Plane, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { motion } from 'framer-motion';

// Types
type Place = {
  code: string;
  name: string;
  city_code?: string;
  country_code?: string;
  timezone?: string;
};

type CalendarDay = {
  day: string; // Date string in YYYY-MM-DD format
  min_price?: number;
  return_at?: string;
};

type FlightResult = {
  origin: string;
  destination: string;
  departure_at: string; // ISO date string
  return_at?: string; // ISO date string
  price: number;
  airline: string;
  duration: number;
  transfers: number;
};

const FlightSearchPage = () => {
  // Form state
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromPlace, setFromPlace] = useState<Place | null>(null);
  const [toPlace, setToPlace] = useState<Place | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  
  // Autocomplete state
  const [fromSuggestions, setFromSuggestions] = useState<Place[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Place[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  
  // Calendar state
  const [calendarPrices, setCalendarPrices] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FlightResult[]>([]);
  
  // Refs for handling outside clicks
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Fetch auto-complete suggestions
  const fetchSuggestions = async (input: string, type: 'from' | 'to') => {
    if (input.length < 2) {
      if (type === 'from') {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
      return;
    }
    
    try {
      // Using a server route to handle CORS for the autocomplete API
      const response = await fetch(
        `/api/flights/autocomplete?term=${input}&locale=en`
      );
      
      if (!response.ok) {
        console.error('Autocomplete API error:', response.status, response.statusText);
        if (type === 'from') {
          setFromSuggestions([]);
          setShowFromSuggestions(false);
        } else {
          setToSuggestions([]);
          setShowToSuggestions(false);
        }
        return;
      }
      
      const data: Place[] = await response.json();
      console.log('Autocomplete data received:', data);
      
      if (type === 'from') {
        setFromSuggestions(data);
        setShowFromSuggestions(true);
      } else {
        setToSuggestions(data);
        setShowToSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      if (type === 'from') {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
    }
  };

  // Fetch calendar prices
  const fetchCalendarPrices = async (origin: string, destination: string) => {
    if (!origin || !destination) return;
    
    try {
      const response = await fetch(
        `/api/flights?type=prices-calendar&origin=${origin}&destination=${destination}`
      );
      
      if (!response.ok) {
        console.error('Calendar API error:', response.status, response.statusText);
        return;
      }
      
      const data: CalendarDay[] = await response.json();
      console.log('Calendar data received:', data);
      
      setCalendarPrices(data);
    } catch (error) {
      console.error('Error fetching calendar prices:', error);
    }
  };

  // Fetch flight results
  const fetchFlightResults = async () => {
    if (!fromPlace || !toPlace || !departureDate) return;
    
    setIsLoading(true);
    
    try {
      const departureFormatted = format(departureDate, 'yyyy-MM-dd');
      const returnFormatted = returnDate ? format(returnDate, 'yyyy-MM-dd') : '';
      
      const params = new URLSearchParams({
        origin: fromPlace.code,
        destination: toPlace.code,
        departure_at: departureFormatted,
        ...(returnDate && { return_at: returnFormatted }),
      });
      
      const url = `/api/flights?type=prices_for_dates&${params}`;
      console.log('Flight search URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('Flight search API error:', response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      console.log('Flight results received:', data);
      
      // Transform response to match our FlightResult type
      // The API returns data in the `data` property
      const transformedResults: FlightResult[] = (data.data || []).map((item: any) => ({
        origin: item.origin,
        destination: item.destination,
        departure_at: item.departure_at,
        return_at: item.return_at,
        price: item.price,
        airline: item.airline,
        duration: item.duration,
        transfers: item.number_of_changes || 0,
      }));
      
      setResults(transformedResults);
      console.log('Transformed results:', transformedResults);
    } catch (error) {
      console.error('Error fetching flight results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (!fromPlace || !toPlace || !departureDate) return;
    fetchFlightResults();
  };

  // Handle outside clicks for autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch calendar prices when origin/destination changes
  useEffect(() => {
    if (fromPlace && toPlace) {
      fetchCalendarPrices(fromPlace.code, toPlace.code);
    }
  }, [fromPlace, toPlace]);

  // Get price for a specific date
  const getPriceForDate = (date: Date | undefined) => {
  if (!date || isNaN(date.getTime())) return null;

  const dateStr = format(date, 'yyyy-MM-dd');

  const match = calendarPrices.find(
    day => day.day === dateStr
  );

  return match ? match.min_price : null;
};


  // Format duration (in minutes) to hours and minutes
  const formatDuration = (minutes: number) => {
    if (isNaN(minutes) || minutes < 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Swap origin and destination
  const swapPlaces = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    const tempPlace = fromPlace;
    setFromPlace(toPlace);
    setToPlace(tempPlace);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Flight</h1>
        
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Search Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Trip Type Selector */}
            <div className="flex gap-4 mb-6">
              <Button
                variant={tripType === 'round-trip' ? 'default' : 'outline'}
                onClick={() => setTripType('round-trip')}
              >
                Round Trip
              </Button>
              <Button
                variant={tripType === 'one-way' ? 'default' : 'outline'}
                onClick={() => setTripType('one-way')}
              >
                One Way
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin and Destination */}
              <div className="space-y-4">
                <div className="relative" ref={fromRef}>
                  <Label htmlFor="from">From</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="from"
                      placeholder="City or airport"
                      value={fromValue}
                      onChange={(e) => {
                        setFromValue(e.target.value);
                        fetchSuggestions(e.target.value, 'from');
                      }}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Autocomplete Suggestions */}
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {fromSuggestions.map((place, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setFromPlace(place);
                            setFromValue(`${place.name} (${place.code})`);
                            setShowFromSuggestions(false);
                          }}
                        >
                          <div className="font-medium">{place.name}</div>
                          <div className="text-sm text-gray-500">
                            {place.country_code} • {place.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center my-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapPlaces}
                    className="rounded-full"
                  >
                    <Plane className="h-4 w-4 rotate-90" />
                  </Button>
                </div>
                
                <div className="relative" ref={toRef}>
                  <Label htmlFor="to">To</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="to"
                      placeholder="City or airport"
                      value={toValue}
                      onChange={(e) => {
                        setToValue(e.target.value);
                        fetchSuggestions(e.target.value, 'to');
                      }}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Autocomplete Suggestions */}
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {toSuggestions.map((place, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setToPlace(place);
                            setToValue(`${place.name} (${place.code})`);
                            setShowToSuggestions(false);
                          }}
                        >
                          <div className="font-medium">{place.name}</div>
                          <div className="text-sm text-gray-500">
                            {place.country_code} • {place.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Dates and Passengers */}
              <div className="space-y-4">
                <div>
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal mt-1',
                          !departureDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                        modifiers={{
                          hasPrice: (date) => !!getPriceForDate(date),
                        }}
                        modifiersClassNames={{
                          hasPrice: 'bg-green-100 hover:bg-green-200 text-green-800',
                        }}
                        components={{
                          Day: ({ date, ...props }) => {
                            const price = getPriceForDate(date);
                            return (
                              <div className="relative">
                                <div {...props} />
                                {price && (
                                  <span className="absolute bottom-0 left-0 right-0 text-xs text-center text-green-600 font-medium">
                                    ${price}
                                  </span>
                                )}
                              </div>
                            );
                          },
                        }}
                        footer={() => {
                          const price = departureDate ? getPriceForDate(departureDate) : null;
                          return price ? (
                            <div className="p-3 text-center text-sm font-medium">
                              Price: ${price}
                            </div>
                          ) : null;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
</div>

{tripType === "round-trip" && (
  <div>
    <Label>Return Date</Label>

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal mt-1",
            !returnDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {returnDate ? format(returnDate, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={returnDate}
          onSelect={setReturnDate}
          initialFocus
          modifiers={{
            hasPrice: (date) => !!getPriceForDate(date),
          }}
          modifiersClassNames={{
            hasPrice: "bg-green-100 text-green-800",
          }}
          render={{
            day: (dayProps) => {
              const price = getPriceForDate(dayProps.date);

              return (
                <div className="relative">
                  <button {...dayProps} />
                  {price && (
                    <span className="absolute bottom-0 left-0 right-0 text-[10px] text-green-600 font-semibold text-center">
                      ${price}
                    </span>
                  )}
                </div>
              );
            },
          }}
          footer={
            returnDate && getPriceForDate(returnDate) ? (
              <div className="p-3 text-center text-sm font-medium">
                Price: ${getPriceForDate(returnDate)}
              </div>
            ) : null
          }
        />
      </PopoverContent>
    </Popover>
  </div>
)}
                
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <div className="flex mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="passengers"
                      type="number"
                      value={passengers}
                      readOnly
                      className="text-center mx-2"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPassengers(passengers + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={handleSearch}
              disabled={!fromPlace || !toPlace || !departureDate}
            >
              Search Flights
            </Button>
          </CardContent>
        </Card>
        
        {/* Flight Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            <div className="space-y-4">
              {results.map((flight, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                      <div className="flex-1">
                        <div className="font-medium flex items-center">
                          <span className="text-lg">{flight.origin}</span>
                          <Plane className="mx-2 h-4 w-4 text-gray-400" />
                          <span className="text-lg">{flight.destination}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{new Date(flight.departure_at).toLocaleDateString()}</span>
                          </div>
                          <div>Carrier: {flight.airline}</div>
                          <div>Duration: {formatDuration(flight.duration)}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-primary">
                          ${flight.price}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {flight.transfers} {flight.transfers === 1 ? 'stop' : 'stops'}
                        </div>
                        <Button className="mt-2">Select</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* No Results */}
        {results.length === 0 && !isLoading && departureDate && (
          <div className="text-center py-8 text-gray-500">
            No flights found for the selected dates. Try different dates or destinations.
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchPage;