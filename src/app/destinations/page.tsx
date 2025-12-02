'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Filter } from 'lucide-react';
import Link from 'next/link';
import AdsterraAd from '@/components/AdsterraAd';


// Helper function to create URL-friendly slugs
function createSlug(name: string): string {
  // Replace commas followed by space with just hyphens, then remove other special chars
  return name
    .toLowerCase()
    .replace(/,\s*/g, '-') // Replace comma+space with hyphen
    .replace(/[^\w\s-]/g, '') // Remove remaining special characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}



{/* Banner Top */}
        <section className="py-6 flex justify-center">
          <AdsterraAd keyId="2931ab60c5b897b964d4617253156a8b" width={728} height={90} />
        </section>

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    continent: 'Asia',
    description: 'Tropical paradise with stunning beaches, rice terraces, and rich culture',
    image: '/img/destinations/Bali, Indonesia.png',
    rating: 4.8,
    reviews: 1240,
    price: 599,
    duration: '7 days',
    travelers: '2-4 people',
    category: 'Beach',
    season: 'All Year',
    guide: 'Bali, Indonesia travel guide: Best beaches, temples, and cultural experiences. From Ubud\'s rice terraces to Seminyak\'s luxury resorts, explore the island of gods.'
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    country: 'Greece',
    continent: 'Europe',
    description: 'Iconic white buildings and breathtaking sunsets overlooking the Aegean Sea',
    image: '/img/destinations/Santorini, Greece.png',
    rating: 4.7,
    reviews: 890,
    price: 899,
    duration: '5 days',
    travelers: '2-6 people',
    category: 'Romance',
    season: 'Summer',
    guide: 'Santorini, Greece travel guide: Famous for its sunsets, white-washed buildings, and blue domes. Best visited from April to October for perfect weather.'
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    country: 'Japan',
    continent: 'Asia',
    description: 'Ancient temples, traditional gardens, and beautiful cherry blossoms',
    image: '/img/destinations/Kyoto, Japan.png',
    rating: 4.9,
    reviews: 1120,
    price: 1299,
    duration: '10 days',
    travelers: '1-4 people',
    category: 'Culture',
    season: 'Spring',
    guide: 'Kyoto, Japan travel guide: Home to 16 UNESCO World Heritage sites and traditional geisha culture. Cherry blossom season (March-April) and autumn (October-November) are peak times.'
  },
  {
    id: 4,
    name: 'Swiss Alps, Switzerland',
    country: 'Switzerland',
    continent: 'Europe',
    description: 'Majestic mountains, pristine lakes, and charming alpine villages',
    image: '/img/destinations/Swiss Alps, Switzerland.png',
    rating: 4.9,
    reviews: 756,
    price: 1599,
    duration: '8 days',
    travelers: '2-8 people',
    category: 'Adventure',
    season: 'Winter',
    guide: 'Swiss Alps, Switzerland travel guide: Perfect for skiing in winter and hiking in summer. Zermatt and St. Moritz offer world-class resorts and mountain experiences.'
  },
  {
    id: 5,
    name: 'Marrakech, Morocco',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Vibrant souks, stunning architecture, and rich cultural experiences',
    image: '/img/destinations/Marrakech, Morocco.png',
    rating: 4.6,
    reviews: 930,
    price: 799,
    duration: '6 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Marrakech, Morocco travel guide: The Red City offers bustling markets, palaces, and gardens. Best visited in spring or fall when temperatures are more comfortable.'
  },
  {
    id: 6,
    name: 'Banff National Park, Canada',
    country: 'Canada',
    continent: 'North America',
    description: 'Stunning mountain landscapes, turquoise lakes, and abundant wildlife',
    image: '/img/destinations/Banff National Park, Canada.png',
    rating: 4.9,
    reviews: 1042,
    price: 1199,
    duration: '9 days',
    travelers: '2-5 people',
    category: 'Nature',
    season: 'Summer',
    guide: 'Banff National Park, Canada travel guide: Canada\'s first national park with crystal-clear lakes and mountain peaks. Summer offers hiking trails while winter provides skiing opportunities.'
  },
  {
    id: 7,
    name: 'Safari, Kenya',
    country: 'Kenya',
    continent: 'Africa',
    description: 'Wildlife exploration in Maasai Mara during the Great Migration',
    image: '/img/destinations/Safari, Kenya.png',
    rating: 4.9,
    reviews: 1024,
    price: 2499,
    duration: '7 days',
    travelers: '2-6 people',
    category: 'Adventure',
    season: 'July-October',
    guide: 'Kenya Safari travel guide: Experience the Great Migration in Maasai Mara. The best time is July-October when millions of animals cross the plains.'
  },
  {
    id: 8,
    name: 'New York City, USA',
    country: 'USA',
    continent: 'North America',
    description: 'The city that never sleeps with iconic landmarks and diverse culture',
    image: '/img/destinations/New York City, USA.png',
    rating: 4.5,
    reviews: 2100,
    price: 999,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Spring/Fall',
    guide: 'New York City travel guide: The Big Apple offers world-class museums, Broadway shows, and diverse neighborhoods. Spring and fall offer pleasant weather and fewer crowds.'
  },
  {
    id: 9,
    name: 'Tokyo, Japan',
    country: 'Japan',
    continent: 'Asia',
    description: 'Modern metropolis blending traditional culture with cutting-edge technology',
    image: '/img/destinations/Tokyo, Japan.png',
    rating: 4.8,
    reviews: 1876,
    price: 1499,
    duration: '8 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring',
    guide: 'Tokyo travel guide: Experience the blend of traditional and modern Japan. Spring for cherry blossoms, or autumn for beautiful foliage and comfortable temperatures.'
  },
  {
    id: 10,
    name: 'Sydney, Australia',
    country: 'Australia',
    continent: 'Oceania',
    description: 'Harbor city with iconic Opera House and beautiful beaches',
    image: '/img/destinations/Sydney, Australia.png',
    rating: 4.7,
    reviews: 1320,
    price: 1799,
    duration: '10 days',
    travelers: '2-4 people',
    category: 'City',
    season: 'Spring/Summer',
    guide: 'Sydney travel guide: Home to the iconic Opera House and Harbour Bridge. Best visited during Australian spring (September-November) or summer for beach weather.'
  },
];

export default function DestinationsPage() {
  const [continentFilter, setContinentFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
  const priceRanges = ['All', 'Under $500', '$500-$1000', '$1000-$2000', 'Over $2000'];
  const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter', 'All Year'];

  // Filter destinations based on selections
  const filteredDestinations = destinations.filter(destination => {
    // Continent filter
    if (continentFilter !== 'All' && destination.continent !== continentFilter) return false;

    // Price filter
    if (priceFilter !== 'All') {
      if (priceFilter === 'Under $500' && destination.price >= 500) return false;
      if (priceFilter === '$500-$1000' && (destination.price < 500 || destination.price > 1000)) return false;
      if (priceFilter === '$1000-$2000' && (destination.price < 1000 || destination.price > 2000)) return false;
      if (priceFilter === 'Over $2000' && destination.price <= 2000) return false;
    }

    // Season filter
    if (seasonFilter !== 'All' && destination.season !== seasonFilter && destination.season !== 'All Year') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!destination.name.toLowerCase().includes(query) &&
          !destination.country.toLowerCase().includes(query) &&
          !destination.description.toLowerCase().includes(query)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Explore Cities & Destinations</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the world's most amazing destinations with our curated selection.
          </p>
        </div>

        {/* Advanced Filters */}
        <div className="bg-card rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Continent</label>
              <select
                className="w-full p-2 text-sm border rounded-lg bg-background"
                value={continentFilter}
                onChange={(e) => setContinentFilter(e.target.value)}
              >
                {continents.map(continent => (
                  <option key={continent} value={continent}>{continent}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Price Range</label>
              <select
                className="w-full p-2 text-sm border rounded-lg bg-background"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Best Season</label>
              <select
                className="w-full p-2 text-sm border rounded-lg bg-background"
                value={seasonFilter}
                onChange={(e) => setSeasonFilter(e.target.value)}
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
{/* Banner Top */}
        <section className="py-6 flex justify-center">
          <AdsterraAd keyId="2931ab60c5b897b964d4617253156a8b" width={300} height={50} />
        </section>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/destinations/${createSlug(destination.name)}`}>
                  <Card className="overflow-hidden group h-full flex flex-col cursor-pointer">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary text-primary-foreground text-xs sm:text-sm">
                        {destination.category}
                      </Badge>
                    </div>
                    <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base sm:text-lg">{destination.name}</h3>
                        <span className="text-base sm:text-lg font-bold text-primary">${destination.price}</span>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">{destination.country}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 flex-grow line-clamp-2">{destination.description}</p>

                      <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                          <span>{destination.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{destination.travelers}</span>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Badge variant="secondary" className="text-xs sm:text-sm">{destination.season}</Badge>
                        <Badge variant="outline" className="text-xs sm:text-sm">{destination.continent}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-medium">No destinations found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to see more results</p>
          </div>
        )}
      </Container>
{/* Smartlink Button */}
<section className="py-6 flex justify-center">
  <a
    href="https://www.effectivegatecpm.com/c4dhpuvm?key=a8e77dedbcfc76e7bab9ed12d4091a97"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button size="lg" variant="outline">
      Smartlink
    </Button>
  </a>
</section>
    </div>
  );
}