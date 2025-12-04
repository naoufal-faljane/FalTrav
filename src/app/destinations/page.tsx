'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users } from 'lucide-react';
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
  {
    id: 11,
    name: 'Warsaw, Poland',
    country: 'Poland',
    continent: 'Europe',
    description: 'Vibrant European capital rich in history, culture, and revitalized after WWII',
    image: '/img/destinations/Warsaw.png',
    rating: 4.4,
    reviews: 680,
    price: 599,
    duration: '4 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Spring/Summer',
    guide: 'Warsaw, Poland travel guide: Experience a city that beautifully balances its tragic history with a vibrant modern culture. Explore the reconstructed Old Town, visit the moving Warsaw Uprising Museum, and enjoy the lively atmosphere of Nowy Świat. Spring through early fall offers pleasant weather for sightseeing. Don\'t miss the thriving food scene and the beautiful Łazienki Park.'
  },
  {
    id: 12,
    name: 'Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    continent: 'Asia',
    description: 'Dynamic metropolis blending modern skyscrapers with rich cultural heritage',
    image: '/img/destinations/kuala lumpur.png',
    rating: 4.3,
    reviews: 940,
    price: 699,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Year Round',
    guide: 'Kuala Lumpur, Malaysia travel guide: A vibrant mix of cultures, cuisines, and towering architecture. Visit the iconic Petronas Twin Towers, explore the colorful Batu Caves, and sample diverse street food. The city is best visited outside of the monsoon season (October to March) for optimal weather. The KLCC district is the heart of the city with shopping and dining options.'
  },
  {
    id: 13,
    name: 'Sintra, Portugal',
    country: 'Portugal',
    continent: 'Europe',
    description: 'Romantic town with fairytale palaces nestled in the Portuguese hills',
    image: '/img/destinations/sintra.png',
    rating: 4.6,
    reviews: 720,
    price: 499,
    duration: '3 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Sintra, Portugal travel guide: A UNESCO World Heritage site filled with colorful palaces and romantic architecture. Best visited during spring or fall for pleasant weather and fewer crowds. The town is only 30 minutes from Lisbon, making it a perfect day trip or short stay. Pena Palace is the crown jewel with its vibrant colors and panoramic views.'
  },
  {
    id: 14,
    name: 'Hong Kong, China',
    country: 'China',
    continent: 'Asia',
    description: 'Bustling metropolis where East meets West with stunning skyline and vibrant culture',
    image: '/img/destinations/honkong.png',
    rating: 4.7,
    reviews: 1580,
    price: 1199,
    duration: '6 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Fall/Winter',
    guide: 'Hong Kong, China travel guide: A dynamic city of contrasts with towering skyscrapers, traditional temples, and bustling markets. Best visited in fall or winter for comfortable temperatures. Experience the famous skyline from Victoria Peak, explore the vibrant neighborhoods, and enjoy world-class dining. The MTR system makes getting around efficient and easy.'
  },
  {
    id: 15,
    name: 'Cape Town, South Africa',
    country: 'South Africa',
    continent: 'Africa',
    description: 'Stunning coastal city with dramatic landscapes and rich cultural heritage',
    image: '/img/destinations/Cape Town.png',
    rating: 4.8,
    reviews: 1320,
    price: 899,
    duration: '7 days',
    travelers: '2-6 people',
    category: 'Adventure',
    season: 'Spring/Summer',
    guide: 'Cape Town, South Africa travel guide: One of the world\'s most beautiful cities with Table Mountain as its backdrop. Visit during southern hemisphere spring or summer (October to March) for warm weather. Explore Table Mountain, the Cape Peninsula, and world-class wine regions. The V&A Waterfront is a hub for shopping, dining, and entertainment.'
  },
  {
    id: 16,
    name: 'Rio de Janeiro, Brazil',
    country: 'Brazil',
    continent: 'South America',
    description: 'Carnival city with iconic beaches, mountains, and vibrant culture',
    image: '/img/destinations/rio de janeiro.png',
    rating: 4.5,
    reviews: 1450,
    price: 799,
    duration: '6 days',
    travelers: '2-4 people',
    category: 'Beach',
    season: 'Carnival Season',
    guide: 'Rio de Janeiro, Brazil travel guide: The city of endless summer with world-famous beaches, iconic landmarks, and samba rhythms. Best visited during Carnival season or outside of heavy rain season (December to March). Don\'t miss Copacabana and Ipanema beaches, Christ the Redeemer, and Sugar Loaf. The city pulses with music, dance, and outdoor lifestyle.'
  },
  {
    id: 17,
    name: 'Barcelona, Spain',
    country: 'Spain',
    continent: 'Europe',
    description: 'Architectural marvels, vibrant neighborhoods, and exceptional cuisine',
    image: '/img/destinations/barcelona.png',
    rating: 4.7,
    reviews: 1650,
    price: 1099,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Barcelona, Spain travel guide: Gaudí\'s architectural masterpieces, delicious tapas, and vibrant beach life. Best visited in spring or fall for pleasant weather and fewer crowds. Explore Sagrada Família, Park Güell, and the Gothic Quarter. The city offers a perfect blend of history, art, and Mediterranean lifestyle.'
  },
  {
    id: 18,
    name: 'Dubai, UAE',
    country: 'UAE',
    continent: 'Asia',
    description: 'Ultra-modern cityscape with luxury shopping and desert adventures',
    image: '/img/destinations/Dubai.png',
    rating: 4.6,
    reviews: 1280,
    price: 1399,
    duration: '4 days',
    travelers: '2-6 people',
    category: 'Luxury',
    season: 'Fall/Winter',
    guide: 'Dubai, UAE travel guide: A gleaming metropolis offering luxury experiences, modern architecture, and desert adventures. Best visited during fall or winter for cooler weather. Marvel at the Burj Khalifa, shop in massive malls, and experience the desert. The city seamlessly blends Middle Eastern heritage with cutting-edge innovation.'
  },
  {
    id: 19,
    name: 'Paris, France',
    country: 'France',
    continent: 'Europe',
    description: 'City of lights, romance, and unparalleled art and culture',
    image: '/img/destinations/paris.png',
    rating: 4.8,
    reviews: 2100,
    price: 1299,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'Romance',
    season: 'Spring/Fall',
    guide: 'Paris, France travel guide: The eternal city of romance, art, and cuisine. Best visited in spring or fall when the weather is pleasant and crowds are smaller. Stroll along the Seine, visit world-class museums, and enjoy café culture. The City of Light offers iconic landmarks like the Eiffel Tower and Louvre Museum.'
  },
  {
    id: 20,
    name: 'Amsterdam, Netherlands',
    country: 'Netherlands',
    continent: 'Europe',
    description: 'Charming canal city with rich culture, historic architecture, and vibrant atmosphere',
    image: '/img/destinations/Amsterdam.png',
    rating: 4.6,
    reviews: 1450,
    price: 1199,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Summer',
    guide: 'Amsterdam, Netherlands travel guide: Famous for its artistic heritage, elaborate canal system, and narrow houses with gabled facades. Explore the Rijksmuseum, Van Gogh Museum, and Anne Frank House. Cycle through the city like locals do, and enjoy the vibrant café culture. Best visited in spring (for tulips) or summer for pleasant weather.'
  },
  {
    id: 21,
    name: 'Athens, Greece',
    country: 'Greece',
    continent: 'Europe',
    description: 'Ancient city with rich history, iconic landmarks like the Acropolis and Parthenon',
    image: '/img/destinations/Athens.png',
    rating: 4.5,
    reviews: 1250,
    price: 899,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Athens, Greece travel guide: The cradle of democracy and Western civilization. Visit the iconic Acropolis and Parthenon, explore the Ancient Agora, and discover the National Archaeological Museum. Best visited in spring or fall for pleasant weather and fewer crowds. Don\'t miss the famous sunset views from Filopappou Hill and taste traditional Greek cuisine in Plaka neighborhood.'
  },
  {
    id: 22,
    name: 'Bangkok, Thailand',
    country: 'Thailand',
    continent: 'Asia',
    description: 'Vibrant Southeast Asian capital with rich culture, street food, and ornate temples',
    image: '/img/destinations/bangkok.png',
    rating: 4.4,
    reviews: 1800,
    price: 799,
    duration: '6 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'November-March',
    guide: 'Bangkok, Thailand travel guide: A city of contrasts with ornate temples, bustling markets, and world-class cuisine. Best visited from November to March for cooler weather. Don\'t miss the Grand Palace, Wat Pho temple, and floating markets. Experience the vibrant street food scene and tuk-tuk rides.'
  },
  {
    id: 23,
    name: 'Bengaluru, India',
    country: 'India',
    continent: 'Asia',
    description: 'Tech hub with garden city charm, rich culture, and thriving food scene',
    image: '/img/destinations/bengaluru.png',
    rating: 4.2,
    reviews: 950,
    price: 649,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'September-February',
    guide: 'Bengaluru, India travel guide: Known as the Garden City with its beautiful parks and pleasant climate. Best visited between September and February. Explore Cubbon Park, Lalbagh Botanical Garden, and the nightlife scene. Experience the tech culture and diverse culinary offerings.'
  },
  {
    id: 24,
    name: 'Bratislava, Slovakia',
    country: 'Slovakia',
    continent: 'Europe',
    description: 'Charming riverfront city with medieval castle and vibrant old town',
    image: '/img/destinations/bratislava.png',
    rating: 4.3,
    reviews: 680,
    price: 599,
    duration: '3 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Summer',
    guide: 'Bratislava, Slovakia travel guide: A picturesque city with a dominant hilltop castle and well-preserved old town. Best visited in spring or summer for pleasant weather. Walk across the iconic UFO Bridge, explore the historic center, and enjoy the riverside promenades. Day trips to Vienna or wine regions are easily accessible.'
  },
  {
    id: 25,
    name: 'Brussels, Belgium',
    country: 'Belgium',
    continent: 'Europe',
    description: 'European capital with historic architecture, chocolate, and world-famous waffles',
    image: '/img/destinations/brussels.png',
    rating: 4.4,
    reviews: 890,
    price: 799,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring/Summer',
    guide: 'Brussels, Belgium travel guide: The heart of Europe with stunning architecture and renowned chocolates. Best visited in spring or summer. See the Grand Place, Atomium, and Manneken Pis. Don\'t miss trying authentic Belgian waffles, chocolate, and beer.'
  },
  {
    id: 26,
    name: 'Bucharest, Romania',
    country: 'Romania',
    continent: 'Europe',
    description: 'Paris of the East with grand architecture and vibrant cultural scene',
    image: '/img/destinations/bucharest.png',
    rating: 4.3,
    reviews: 720,
    price: 549,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring/Summer',
    guide: 'Bucharest, Romania travel guide: Known as the Paris of the East with elegant architecture and green spaces. Best visited in spring or summer for pleasant weather. Explore the Palace of Parliament, Herăstrău Park, and the vibrant Lipscani Street for shopping and dining.'
  },
  {
    id: 27,
    name: 'Budapest, Hungary',
    country: 'Hungary',
    continent: 'Europe',
    description: 'Danube riverside beauty with thermal baths, historic architecture, and ruin bars',
    image: '/img/destinations/budapest.png',
    rating: 4.6,
    reviews: 1650,
    price: 749,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Spring/Fall',
    guide: 'Budapest, Hungary travel guide: The Queen of the Danube with stunning architecture and thermal baths. Best visited in spring or fall for ideal weather. Don\'t miss the Parliament building, Chain Bridge, and Széchenyi Thermal Bath. Experience the unique ruin bar scene in the Jewish Quarter.'
  },
  {
    id: 28,
    name: 'Buenos Aires, Argentina',
    country: 'Argentina',
    continent: 'South America',
    description: 'Passionate city of tango, European architecture, and vibrant neighborhoods',
    image: '/img/destinations/buenos aires.png',
    rating: 4.7,
    reviews: 1020,
    price: 999,
    duration: '6 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring/Fall',
    guide: 'Buenos Aires, Argentina travel guide: The Paris of South America with European-style architecture and tango culture. Best visited in spring or fall. Explore San Telmo, La Boca, and Recoleta Cemetery. Experience passionate tango performances and world-class beef.'
  },
  {
    id: 29,
    name: 'Cairo, Egypt',
    country: 'Egypt',
    continent: 'Africa',
    description: 'Ancient city with iconic pyramids, Sphinx, and rich historical legacy',
    image: '/img/destinations/cairo.png',
    rating: 4.5,
    reviews: 1240,
    price: 899,
    duration: '7 days',
    travelers: '2-4 people',
    category: 'Culture',
    season: 'Fall/Winter',
    guide: 'Cairo, Egypt travel guide: Gateway to ancient wonders including the Pyramids of Giza and Sphinx. Best visited in fall or winter to avoid intense heat. Explore Khan el-Khalili bazaar and Egyptian Museum. Consider a side trip to the pyramids just outside the city.'
  },
  {
    id: 30,
    name: 'Casablanca, Morocco',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Cosmopolitan coastal city with Art Deco architecture and vibrant culture',
    image: '/img/destinations/casablanca.png',
    rating: 4.3,
    reviews: 880,
    price: 799,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring/Fall',
    guide: 'Casablanca, Morocco travel guide: The country\'s economic hub with Hassan II Mosque and Atlantic coastline. Best visited in spring or fall for pleasant weather. Visit the impressive Hassan II Mosque, walk along the Corniche, and experience the city\'s cosmopolitan atmosphere.'
  },
  {
    id: 31,
    name: 'Copenhagen, Denmark',
    country: 'Denmark',
    continent: 'Europe',
    description: 'Hygge capital with modern design, cycling culture, and fairy tale vibes',
    image: '/img/destinations/Copenhagen.png',
    rating: 4.7,
    reviews: 980,
    price: 1199,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Summer',
    guide: 'Copenhagen, Denmark travel guide: Embrace hygge lifestyle with excellent design, food, and cycling culture. Best visited in summer for optimal weather. See Tivoli Gardens, Little Mermaid statue, and the colorful Nyhavn harbor. Experience world-class restaurants and innovative Nordic cuisine.'
  },
  {
    id: 32,
    name: 'Doha, Qatar',
    country: 'Qatar',
    continent: 'Asia',
    description: 'Modern desert city with futuristic architecture and rich cultural heritage',
    image: '/img/destinations/Doha.png',
    rating: 4.5,
    reviews: 850,
    price: 1399,
    duration: '5 days',
    travelers: '2-4 people',
    category: 'City',
    season: 'Winter',
    guide: 'Doha, Qatar travel guide: A rapidly developing city with striking architecture and cultural sites. Best visited in winter for comfortable weather. Explore Souq Waqif, Museum of Islamic Art, and the impressive skyline. Experience the blend of traditional Bedouin culture with ultra-modernity.'
  }
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
      {/* Banner Top */}
      <section className="py-6 flex justify-center">
        <AdsterraAd keyId="2931ab60c5b897b964d4617253156a8b" width={728} height={90} />
      </section>

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