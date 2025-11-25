'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plane, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for popular routes
const popularRoutes = [
  { from: 'New York', to: 'London', price: '$499', duration: '7h 15m' },
  { from: 'Paris', to: 'Tokyo', price: '$899', duration: '12h 45m' },
  { from: 'Los Angeles', to: 'Sydney', price: '$1,299', duration: '15h 30m' },
  { from: 'Dubai', to: 'Singapore', price: '$750', duration: '7h 20m' },
];

// Mock data for recent searches
const recentSearches = [
  { from: 'NYC', to: 'LAX', date: 'Dec 15, 2025', travelers: 2 },
  { from: 'LHR', to: 'CDG', date: 'Nov 30, 2025', travelers: 1 },
  { from: 'DXB', to: 'BOM', date: 'Jan 5, 2026', travelers: 3 },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Plane className="h-12 w-12 mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Find Flights</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Compare and book flights from hundreds of airlines worldwide. Find the best prices and deals for your next adventure.
            </p>
          </div>
        </Container>
      </div>

      {/* Search Form */}
      <Container className="py-8">
        <Card className="shadow-lg -mt-12 relative z-10">
          <CardContent className="p-6">
            <div className="mb-6">
              <RadioGroup value={tripType} onValueChange={(value) => setTripType(value as 'one-way' | 'round-trip')} className="flex space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" />
                  <Label htmlFor="round-trip">Round Trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" />
                  <Label htmlFor="one-way">One Way</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input 
                  id="from" 
                  placeholder="City or airport" 
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input 
                  id="to" 
                  placeholder="City or airport" 
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Departure</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {tripType === 'round-trip' && (
                <div className="space-y-2">
                  <Label>Return</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="passengers">Passengers</Label>
                <Select value={passengers.toString()} onValueChange={(value) => setPassengers(parseInt(value))}>
                  <SelectTrigger id="passengers" className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="ml-auto">Search Flights</Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Routes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Flight Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold">{route.from}</span>
                      <Plane className="h-4 w-4 text-muted-foreground rotate-90" />
                      <span className="font-bold">{route.to}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="h-3 w-3 mr-1" />
                      {route.duration}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-bold text-primary">{route.price}</span>
                      <Button size="sm">Select</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Recent Searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentSearches.map((search, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{search.from} → {search.to}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <span>{search.date}</span>
                        <span>•</span>
                        <span>{search.travelers} {search.travelers === 1 ? 'traveler' : 'travelers'}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Re-search</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}