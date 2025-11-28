'use client';

import { useState, useEffect, useRef } from 'react';
import { Plane, MapPin, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Place = {
  code: string;
  name: string;
  city_code?: string;
  country_code?: string;
  timezone?: string;
};

type CalendarDay = {
  day: string;
  min_price?: number;
  return_at?: string;
};

type FlightResult = {
  origin: string;
  destination: string;
  departure_at: string;
  return_at?: string;
  price: number;
  airline: string;
  flight_number?: string;
  duration: number;
  transfers: number;
};

const FlightSearchPage = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromPlace, setFromPlace] = useState<Place | null>(null);
  const [toPlace, setToPlace] = useState<Place | null>(null);
  const [departureDate, setDepartureDate] = useState<string | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<string | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');

  const [fromSuggestions, setFromSuggestions] = useState<Place[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Place[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const [calendarPrices, setCalendarPrices] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FlightResult[]>([]);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (input: string, type: 'from' | 'to') => {
    if (!input || input.length < 2) {
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
      const res = await fetch(`/api/flights/autocomplete?term=${encodeURIComponent(input)}&locale=en`);
      if (!res.ok) {
        if (type === 'from') {
          setFromSuggestions([]);
          setShowFromSuggestions(false);
        } else {
          setToSuggestions([]);
          setShowToSuggestions(false);
        }
        return;
      }
      const data: Place[] = await res.json();
      if (type === 'from') {
        setFromSuggestions(data);
        setShowFromSuggestions(true);
      } else {
        setToSuggestions(data);
        setShowToSuggestions(true);
      }
    } catch (e) {
      if (type === 'from') {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
    }
  };

  const fetchCalendarPrices = async (origin: string, destination: string) => {
    if (!origin || !destination) return;
    try {
      const res = await fetch(`/api/flights/prices-calendar?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
      if (!res.ok) return;
      const data: CalendarDay[] = await res.json();
      setCalendarPrices(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFlightResults = async () => {
    if (!fromPlace || !toPlace || !departureDate) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: fromPlace.code,
          destination: toPlace.code,
          departure_at: departureDate,
          ...(returnDate ? { return_at: returnDate } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Process the response data
      let entries = [];
      if (data.data && typeof data.data === 'object') {
        // If data.data is an object, get its values
        entries = Object.values(data.data);
      } else if (Array.isArray(data.data)) {
        // If data.data is an array, use it directly
        entries = data.data;
      } else {
        entries = [];
      }

      const transformed: FlightResult[] = entries.slice(0, 20).map((item: any) => ({
        origin: item.origin || fromPlace.code,
        destination: item.destination || toPlace.code,
        departure_at: item.departure_at || departureDate,
        return_at: item.return_at || returnDate,
        price: typeof item.price === 'number' ? item.price : (item.value || 0),
        airline: item.airline || item.carrier_code || 'Unknown',
        duration: item.duration || 0,
        transfers: item.transfers ?? item.number_of_changes ?? 0,
      }));
      setResults(transformed);
    } catch (e) {
      console.error('Error fetching flights:', e);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!fromPlace || !toPlace || !departureDate) return;
    fetchFlightResults();
  };

  useEffect(() => {
    const onClickOutside = (ev: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(ev.target as Node)) setShowFromSuggestions(false);
      if (toRef.current && !toRef.current.contains(ev.target as Node)) setShowToSuggestions(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (fromPlace && toPlace) fetchCalendarPrices(fromPlace.code, toPlace.code);
  }, [fromPlace, toPlace]);

  const getPriceForDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const match = calendarPrices.find((d) => d.day === dateStr);
    return match ? match.min_price ?? null : null;
  };

  const formatDuration = (minutes: number) => {
    if (!minutes || isNaN(minutes)) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const swapPlaces = () => {
    setFromValue((p) => {
      const prev = p;
      setToValue(prev);
      return toValue;
    });
    const tmp = fromPlace;
    setFromPlace(toPlace);
    setToPlace(tmp);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Flight</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Search Flights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button variant={tripType === 'round-trip' ? 'default' : 'outline'} onClick={() => setTripType('round-trip')}>Round Trip</Button>
              <Button variant={tripType === 'one-way' ? 'default' : 'outline'} onClick={() => setTripType('one-way')}>One Way</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {fromSuggestions.map((place, i) => (
                        <div
                          key={i}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setFromPlace(place);
                            setFromValue(`${place.name} (${place.code})`);
                            setShowFromSuggestions(false);
                          }}
                        >
                          <div className="font-medium">{place.name}</div>
                          <div className="text-sm text-gray-500">{place.country_code} • {place.code}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-center my-2">
                  <Button variant="outline" size="icon" onClick={swapPlaces} className="rounded-full">
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

                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {toSuggestions.map((place, i) => (
                        <div
                          key={i}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setToPlace(place);
                            setToValue(`${place.name} (${place.code})`);
                            setShowToSuggestions(false);
                          }}
                        >
                          <div className="font-medium">{place.name}</div>
                          <div className="text-sm text-gray-500">{place.country_code} • {place.code}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Departure Date</Label>
                  <Input
                    type="date"
                    value={departureDate ?? ''}
                    onChange={(e) => setDepartureDate(e.target.value || undefined)}
                    className={cn('mt-1')}
                  />
                  {departureDate && (
                    <div className="text-sm text-gray-500 mt-1">
                      {format(new Date(departureDate), 'PPP')} {getPriceForDate(departureDate) ? `• ${getPriceForDate(departureDate)} USD` : ''}
                    </div>
                  )}
                </div>

                {tripType === 'round-trip' && (
                  <div>
                    <Label>Return Date</Label>
                    <Input
                      type="date"
                      value={returnDate ?? ''}
                      onChange={(e) => setReturnDate(e.target.value || undefined)}
                      className={cn('mt-1')}
                    />
                    {returnDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        {format(new Date(returnDate), 'PPP')} {getPriceForDate(returnDate) ? `• ${getPriceForDate(returnDate)} USD` : ''}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <div className="flex mt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setPassengers(Math.max(1, passengers - 1))}>-</Button>
                    <Input id="passengers" type="number" value={String(passengers)} readOnly className="text-center mx-2" />
                    <Button type="button" variant="outline" size="sm" onClick={() => setPassengers(passengers + 1)}>+</Button>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 flex items-center justify-center gap-2" onClick={handleSearch} disabled={!fromPlace || !toPlace || !departureDate}>
              <Search className="h-4 w-4" />
              Search Flights
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            
            {/* Table view for results */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Airline</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">From</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">To</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Departure</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Return</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Transfers</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((flight, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{flight.airline}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{flight.origin}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{flight.destination}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{new Date(flight.departure_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{flight.return_at ? new Date(flight.return_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{flight.transfers} {flight.transfers === 1 ? 'stop' : 'stops'}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">${flight.price}</td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        onClick={() => window.open(`https://www.aviasales.com/search?origin=${flight.origin}&destination=${flight.destination}&depart_date=${departureDate}&return_date=${returnDate ?? ''}`, '_blank')}
                      >
                        Book
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Alternative card view (commented out but available as option) */}
            {/* <div className="space-y-4 mt-6 md:hidden">
              {results.map((flight, idx) => (
                <Card key={idx}>
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
                            <span>{new Date(flight.departure_at).toLocaleString()}</span>
                          </div>
                          <div>Carrier: {flight.airline}</div>
                          <div>Duration: {formatDuration(flight.duration)}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-primary">${flight.price}</div>
                        <div className="text-sm text-gray-500 mt-1">{flight.transfers} {flight.transfers === 1 ? 'stop' : 'stops'}</div>
                        <Button className="mt-2" onClick={() => window.open(`https://www.aviasales.com/search?origin=${flight.origin}&destination=${flight.destination}&depart_date=${departureDate}&return_date=${returnDate ?? ''}`, '_blank')}>Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </motion.div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {!isLoading && results.length === 0 && departureDate && (
          <div className="text-center py-8 text-gray-500">No flights found for the selected dates. Try different dates or destinations.</div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchPage;
