'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Camera, BookOpen, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    continent: 'Asia',
    description: 'Tropical paradise with stunning beaches, rice terraces, and rich culture',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 1240,
    price: 599,
    duration: '7 days',
    travelers: '2-4 people',
    category: 'Beach',
    season: 'All Year',
    guide: 'Bali, Indonesia travel guide: Best beaches, temples, and cultural experiences. From Ubud\'s rice terraces to Seminyak\'s luxury resorts, explore the island of gods. Must-visit places include Uluwatu Temple, Tegallalang Rice Terraces, and Tanah Lot. The best time to visit is during dry season (April to October).',
    highlights: [
      'Ubud Rice Terraces',
      'Uluwatu Temple',
      'Seminyak Beach',
      'Mount Batur',
      'Tanah Lot Temple'
    ],
    bestFor: ['Beach Lovers', 'Culture Enthusiasts', 'Adventure Seekers'],
    images: [
      'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516920536045-af6c5ec6b99b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518638176868-65d31c3aabd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    country: 'Greece',
    continent: 'Europe',
    description: 'Iconic white buildings and breathtaking sunsets overlooking the Aegean Sea',
    image: 'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 890,
    price: 899,
    duration: '5 days',
    travelers: '2-6 people',
    category: 'Romance',
    season: 'Summer',
    guide: 'Santorini, Greece travel guide: Famous for its sunsets, white-washed buildings, and blue domes. Best visited from April to October for perfect weather. The villages of Oia and Fira offer the most stunning views, while the red beach of Akrotiri is a must-see.',
    highlights: [
      'Oia Sunset',
      'Red Beach',
      'Ancient Akrotiri',
      'Fira Town',
      'Santorini Wineries'
    ],
    bestFor: ['Romantic Getaways', 'Photography', 'Fine Dining'],
    images: [
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587314161406-4e65fccb10ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587314161405-5c9f0b5be39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587314161405-6bdfb1d003a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    country: 'Japan',
    continent: 'Asia',
    description: 'Ancient temples, traditional gardens, and beautiful cherry blossoms',
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 1120,
    price: 1299,
    duration: '10 days',
    travelers: '1-4 people',
    category: 'Culture',
    season: 'Spring',
    guide: 'Kyoto, Japan travel guide: Home to 16 UNESCO World Heritage sites and traditional geisha culture. Cherry blossom season (March-April) and autumn (October-November) are peak times. Don\'t miss the Fushimi Inari Shrine with its 10,000 torii gates.',
    highlights: [
      'Fushimi Inari Shrine',
      'Kinkaku-ji (Golden Pavilion)',
      'Arashiyama Bamboo Grove',
      'Gion District',
      'Kiyomizu-dera Temple'
    ],
    bestFor: ['Cultural Immersion', 'History Lovers', 'Garden Enthusiasts'],
    images: [
      'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541686525943-65bcb6efb0b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569342-4f3e190d4e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 4,
    name: 'Swiss Alps, Switzerland',
    country: 'Switzerland',
    continent: 'Europe',
    description: 'Majestic mountains, pristine lakes, and charming alpine villages',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 756,
    price: 1599,
    duration: '8 days',
    travelers: '2-8 people',
    category: 'Adventure',
    season: 'Winter',
    guide: 'Swiss Alps, Switzerland travel guide: Perfect for skiing in winter and hiking in summer. Zermatt and St. Moritz offer world-class resorts and mountain experiences. The Matterhorn is one of the most photographed mountains in the world.',
    highlights: [
      'Matterhorn',
      'Zermatt',
      'Jungfraujoch',
      'St. Moritz',
      'Lake Geneva'
    ],
    bestFor: ['Skiing', 'Hiking', 'Luxury Retreats'],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507699622108-3be547d2a73b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 5,
    name: 'Marrakech, Morocco',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Vibrant souks, stunning architecture, and rich cultural experiences',
    image: 'https://images.unsplash.com/photo-1517914466335-78a1e4650bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 930,
    price: 799,
    duration: '6 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Marrakech, Morocco travel guide: The Red City offers bustling markets, palaces, and gardens. Best visited in spring or fall when temperatures are more comfortable. The Jemaa el-Fnaa square comes alive at night with storytellers, musicians, and food stalls.',
    highlights: [
      'Jemaa el-Fnaa',
      'Majorelle Garden',
      'Bahia Palace',
      'Saadian Tombs',
      'Souks of Marrakech'
    ],
    bestFor: ['Cultural Immersion', 'Shopping', 'Culinary Experiences'],
    images: [
      'https://images.unsplash.com/photo-1517914466335-78a1e4650bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 6,
    name: 'Banff National Park, Canada',
    country: 'Canada',
    continent: 'North America',
    description: 'Stunning mountain landscapes, turquoise lakes, and abundant wildlife',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 1042,
    price: 1199,
    duration: '9 days',
    travelers: '2-5 people',
    category: 'Nature',
    season: 'Summer',
    guide: 'Banff National Park, Canada travel guide: Canada\'s first national park with crystal-clear lakes and mountain peaks. Summer offers hiking trails while winter provides skiing opportunities. Lake Louise and Moraine Lake are among the most photographed locations.',
    highlights: [
      'Lake Louise',
      'Moraine Lake',
      'Bow Lake',
      'Icefields Parkway',
      'Banff Town'
    ],
    bestFor: ['Hiking', 'Wildlife Watching', 'Photography'],
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 7,
    name: 'Safari, Kenya',
    country: 'Kenya',
    continent: 'Africa',
    description: 'Wildlife exploration in Maasai Mara during the Great Migration',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 1024,
    price: 2499,
    duration: '7 days',
    travelers: '2-6 people',
    category: 'Adventure',
    season: 'July-October',
    guide: 'Kenya Safari travel guide: Experience the Great Migration in Maasai Mara. The best time is July-October when millions of animals cross the plains. Other highlights include Amboseli National Park with views of Mount Kilimanjaro and the Big Five game viewing.',
    highlights: [
      'Great Migration',
      'Maasai Mara',
      'Amboseli National Park',
      'Mount Kilimanjaro Views',
      'Big Five Viewing'
    ],
    bestFor: ['Wildlife Photography', 'Adventure Seekers', 'Nature Lovers'],
    images: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-154747108a3448449df1ed6d6c0c27b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524439016562-591d3c6a5d0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523809811638-0ac919d55b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 8,
    name: 'New York City, USA',
    country: 'USA',
    continent: 'North America',
    description: 'The city that never sleeps with iconic landmarks and diverse culture',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 2100,
    price: 999,
    duration: '5 days',
    travelers: '1-4 people',
    category: 'City',
    season: 'Spring/Fall',
    guide: 'New York City travel guide: The Big Apple offers world-class museums, Broadway shows, and diverse neighborhoods. Spring and fall offer pleasant weather and fewer crowds. Don\'t miss Central Park, Times Square, Statue of Liberty, and the Metropolitan Museum of Art.',
    highlights: [
      'Times Square',
      'Central Park',
      'Statue of Liberty',
      'Broadway Shows',
      'Metropolitan Museum'
    ],
    bestFor: ['City Lovers', 'Cultural Experiences', 'Foodies'],
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506197603421-c8c76f2561a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 9,
    name: 'Tokyo, Japan',
    country: 'Japan',
    continent: 'Asia',
    description: 'Modern metropolis blending traditional culture with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 1876,
    price: 1499,
    duration: '8 days',
    travelers: '1-3 people',
    category: 'City',
    season: 'Spring',
    guide: 'Tokyo travel guide: Experience the blend of traditional and modern Japan. Spring for cherry blossoms, or autumn for beautiful foliage and comfortable temperatures. Visit Shibuya Crossing, Senso-ji Temple, and enjoy authentic sushi experiences.',
    highlights: [
      'Shibuya Crossing',
      'Senso-ji Temple',
      'Shinjuku',
      'Cherry Blossom Viewing',
      'Tsukiji Market'
    ],
    bestFor: ['Cultural Fusion', 'Technology Enthusiasts', 'Food Lovers'],
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 10,
    name: 'Sydney, Australia',
    country: 'Australia',
    continent: 'Oceania',
    description: 'Harbor city with iconic Opera House and beautiful beaches',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 1320,
    price: 1799,
    duration: '10 days',
    travelers: '2-4 people',
    category: 'City',
    season: 'Spring/Summer',
    guide: 'Sydney travel guide: Home to the iconic Opera House and Harbour Bridge. Best visited during Australian spring (September-November) or summer for beach weather. Don\'t miss the Sydney Harbor cruise and nearby Blue Mountains.',
    highlights: [
      'Sydney Opera House',
      'Harbour Bridge',
      'Bondi Beach',
      'Blue Mountains',
      'Darling Harbour'
    ],
    bestFor: ['Beach Lovers', 'City Exploration', 'Nature Activities'],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506926729481-1fb6c6c15d10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506399165489-9914f1231d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506926862613-49053fefb526?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
];

export default function DestinationPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const destId = parseInt(Array.isArray(id) ? id[0] : id);
      const foundDestination = destinations.find(dest => dest.id === destId);
      setDestination(foundDestination);
    }
  }, [id]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Loading destination...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0">
          <div className="pb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{destination.category}</Badge>
              <Badge variant="outline">{destination.continent}</Badge>
              <Badge variant="outline">{destination.season}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{destination.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-white/80">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{destination.rating} ({destination.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{destination.country}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Travel Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Travel Guide</h2>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg mb-4">{destination.description}</p>
                  <p className="text-muted-foreground">{destination.guide}</p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Highlights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Top Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Camera className="h-4 w-4" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Image Gallery */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.images.map((image: string, index: number) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 sticky top-24">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">${destination.price}</h3>
                    <p className="text-muted-foreground">per person</p>
                  </div>
                  <Badge>{destination.duration}</Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {destination.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {destination.travelers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Best season</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {destination.season}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${destination.price}
                    </span>
                  </div>
                </div>

                <Button className="w-full">
                  Book Now
                </Button>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Best for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.bestFor.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-bold mb-4">Similar Destinations</h3>
              <div className="space-y-3">
                {destinations
                  .filter(dest => dest.id !== destination.id && dest.continent === destination.continent)
                  .slice(0, 2)
                  .map(dest => (
                    <Link href={`/destinations/${dest.id}`} key={dest.id} className="block">
                      <Card className="overflow-hidden group">
                        <div className="flex">
                          <div className="w-1/3">
                            <img 
                              src={dest.image} 
                              alt={dest.name} 
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <h4 className="font-semibold">{dest.name}</h4>
                            <p className="text-sm text-muted-foreground">${dest.price}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}