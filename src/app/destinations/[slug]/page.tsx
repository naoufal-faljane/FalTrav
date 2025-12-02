'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Camera, BookOpen, Calendar, DollarSign, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePageViewTracker } from '@/lib/analytics';
import { trackViewDestination } from '@/lib/enhanced-analytics';
import { useAdContext } from '@/contexts/AdContext';
import AdsterraAd from '@/components/AdsterraAd';

// Helper function to convert slug back to destination name
function slugToName(slug: string): string {
  // Handle known country names that originally had commas
  const knownPatterns = [
    { slugPattern: 'bali-indonesia', original: 'Bali, Indonesia' },
    { slugPattern: 'santorini-greece', original: 'Santorini, Greece' },
    { slugPattern: 'kyoto-japan', original: 'Kyoto, Japan' },
    { slugPattern: 'marrakech-morocco', original: 'Marrakech, Morocco' },
    { slugPattern: 'new-york-city-usa', original: 'New York City, USA' },
    { slugPattern: 'tokyo-japan', original: 'Tokyo, Japan' },
    { slugPattern: 'sydney-australia', original: 'Sydney, Australia' },
    { slugPattern: 'swiss-alps-switzerland', original: 'Swiss Alps, Switzerland' },
    { slugPattern: 'banff-national-park-canada', original: 'Banff National Park, Canada' },
    { slugPattern: 'safari-kenya', original: 'Safari, Kenya' },
    { slugPattern: 'warsaw-poland', original: 'Warsaw, Poland' },
    { slugPattern: 'kuala-lumpur-malaysia', original: 'Kuala Lumpur, Malaysia' },
    { slugPattern: 'sintra-portugal', original: 'Sintra, Portugal' },
    { slugPattern: 'hong-kong-china', original: 'Hong Kong, China' },
    { slugPattern: 'cape-town-south-africa', original: 'Cape Town, South Africa' },
    { slugPattern: 'rio-de-janeiro-brazil', original: 'Rio de Janeiro, Brazil' },
    { slugPattern: 'barcelona-spain', original: 'Barcelona, Spain' },
    { slugPattern: 'dubai-uae', original: 'Dubai, UAE' },
    { slugPattern: 'paris-france', original: 'Paris, France' },
    { slugPattern: 'rabat-morocco', original: 'Rabat, Morocco' },
    { slugPattern: 'qatar', original: 'Qatar' },
    { slugPattern: 'amsterdam-netherlands', original: 'Amsterdam, Netherlands' }
  ];
  
  // Check for known patterns first
  for (const pattern of knownPatterns) {
    if (slug === pattern.slugPattern) {
      return pattern.original;
    }
  }
  
  // Fallback to general conversion for unknown patterns
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
      '/img/destinations/Bali, Indonesia.png',
      'https://images.unsplash.com/photo-1516920536045-af6c5ec6b99b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518638176868-65d31c3aabd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Traditional batik textiles',
      'Hand-carved wooden masks',
      'Silver jewelry from Celuk village',
      'Bali coffee and spices'
    ],
    restaurants: [
      'Locavore - farm-to-table fine dining',
      'Warung Made - authentic local cuisine',
      'Sardine - fresh seafood in a beautiful setting',
      'Bebek Bengil (Dirty Duck) - famous duck dish'
    ],
    costs: {
      'Budget per day': '$30-50',
      'Mid-range per day': '$50-100',
      'Luxury per day': '$150+',
      'Avg. meal (local)': '$2-10',
      'Avg. meal (international)': '$10-25',
      'Transportation': '$5-15/day'
    },
    mustSee: [
      'Ubud Monkey Forest',
      'Tirta Empul Temple (Holy Spring)',
      'Pura Lempuyang (Gates of Heaven)',
      'Jatiluwih Rice Terraces (UNESCO site)'
    ],
    cheapestPlaces: [
      'Gianyar Regency (authentic villages)',
      'Amed (peaceful fishing villages)',
      'Canggu (bohemian beach town)',
      'Sidemen Valley (off-the-beaten-path)'
    ],
    tips: [
      'Bargain respectfully at markets but with a smile',
      'Dress modestly when visiting temples',
      'Stay hydrated during the hot season',
      'Book accommodations in advance during peak season'
    ]
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
      '/img/destinations/Santorini, Greece.png',
      'https://images.unsplash.com/photo-1587314161406-4e65fccb10ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587314161405-5c9f0b5be39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587314161405-6bdfb1d003a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Local volcanic wine',
      'Santorini cherry tomatoes in olive oil',
      'Handmade jewelry with local minerals',
      'Traditional Greek pottery'
    ],
    restaurants: [
      'Dimitris Ammoudi Taverna - waterfront dining',
      'Metaxi Mas - sunset views with Greek cuisine',
      'Selene - high-end local ingredients',
      'Taverna Romantica - authentic Greek dishes'
    ],
    costs: {
      'Budget per day': '$60-100',
      'Mid-range per day': '$100-200',
      'Luxury per day': '$300+',
      'Avg. meal (local)': '$15-25',
      'Avg. meal (international)': '$25-45',
      'Transportation': '$10-30/day'
    },
    mustSee: [
      'Sunset in Oia (one of the world\'s best)',
      'Ancient Thera archaeological site',
      'Santorini wineries and tasting tours',
      'Akrotiri lighthouse'
    ],
    cheapestPlaces: [
      'Pyrgos (traditional village with fewer crowds)',
      'Megalo Chorio (authentic and affordable)',
      'Perissa (black sand beach with budget options)',
      'Kamari (family-friendly with good value)'
    ],
    tips: [
      'Visit Oia early morning to avoid tourist crowds',
      'Take advantage of the bus system to get around',
      'Book sunset dinner reservations in advance',
      'Pack comfortable shoes for walking on cobblestones'
    ]
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
      '/img/destinations/Kyoto, Japan.png',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541686525943-65bcb6efb0b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569342-4f3e190d4e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Traditional Kyoto fan (sensu)',
      'Kiyomizu-yaki pottery',
      'Matcha tea and traditional sweets',
      'Furoshiki wrapping cloths'
    ],
    restaurants: [
      'Kikunoi Kyoto - Michelin-starred kaiseki cuisine',
      'Nishiki Warai - famous okonomiyaki',
      'Gion Kappo Sakamoto - intimate dining experience',
      'Ippudo Ramen - excellent Japanese noodles'
    ],
    costs: {
      'Budget per day': '$70-120',
      'Mid-range per day': '$120-250',
      'Luxury per day': '$350+',
      'Avg. meal (local)': '$10-25',
      'Avg. meal (international)': '$25-50',
      'Transportation': '$10-20/day'
    },
    mustSee: [
      'Philosopher\'s Path during cherry blossom season',
      'Traditional tea ceremony experience',
      'Nishiki Market food tour',
      'Traditional ryokan stay'
    ],
    cheapestPlaces: [
      'Arashiyama (beautiful area with budget options)',
      'Gion (expensive area but good for window shopping)',
      'Fushimi (famous for sake breweries)',
      'Pontocho (narrow alley with many dining choices)'
    ],
    tips: [
      'Get a Kyoto City Bus Pass for unlimited travel',
      'Visit temples early morning to avoid crowds',
      'Learn basic Japanese phrases as English is limited',
      'Reserve temples and experiences in advance during peak times'
    ]
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
      '/img/destinations/Swiss Alps, Switzerland.png',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507699622108-3be547d2a73b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Swiss Army knives',
      'Swiss chocolate (Lindt, Cailler, etc.)',
      'Traditional Swiss cowbells',
      'Swiss cheese and fondue sets'
    ],
    restaurants: [
      'Schwarzwaldstube - 2 Michelin stars in Baiersbronn',
      'Alpenhof Restaurant - traditional Swiss in Zermatt',
      'Chez Donati - mountain hut dining',
      'Café du Centre - authentic local experience'
    ],
    costs: {
      'Budget per day': '$120-180',
      'Mid-range per day': '$180-300',
      'Luxury per day': '$400+',
      'Avg. meal (local)': '$30-50',
      'Avg. meal (international)': '$40-70',
      'Transportation': '$30-50/day'
    },
    mustSee: [
      'Jungfraujoch (Top of Europe)',
      'Rhine Falls (Europe\'s largest waterfall)',
      'Château de Chillon (medieval castle on Lake Geneva)',
      'Aletsch Glacier (UNESCO site)'
    ],
    cheapestPlaces: [
      'Interlaken (adventure hub with budget options)',
      'Grindelwald (family-friendly with good value)',
      'Andermatt (up-and-coming with fewer tourists)',
      'Lauterbrunnen Valley (stunning scenery, more affordable)'
    ],
    tips: [
      'Invest in a Swiss Travel Pass for unlimited public transport',
      'Book mountain excursions early in the day',
      'Carry cash as some small mountain huts don\'t accept cards',
      'Pack layers as weather changes quickly in mountains'
    ]
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
      '/img/destinations/Marrakech, Morocco.png',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Handwoven Berber carpets',
      'Argan oil and beauty products',
      'Moroccan lanterns and metalwork',
      'Spices from the souks (cumin, paprika, ras el hanout)'
    ],
    restaurants: [
      'Le Jardin - beautiful courtyard dining',
      'Dar Moha - sophisticated Moroccan cuisine',
      'Café des Épices - terrace views over spice market',
      'Nomad - rooftop dining with city views'
    ],
    costs: {
      'Budget per day': '$35-60',
      'Mid-range per day': '$60-100',
      'Luxury per day': '$150+',
      'Avg. meal (local)': '$5-15',
      'Avg. meal (international)': '$15-30',
      'Transportation': '$5-20/day'
    },
    mustSee: [
      'Jemaa el-Fnaa at sunset and night',
      'Yves Saint Laurent Museum and Majorelle Garden',
      'Saadian Tombs restoration',
      'Atlas Mountains day trip'
    ],
    cheapestPlaces: [
      'Gueliz (modern district, budget hotels)',
      'Riad area (traditional accommodations, good value)',
      'Oukaimeden (mountain escape with budget options)',
      'Essaouira (coastal city with better prices)'
    ],
    tips: [
      'Haggle respectfully in the souks but with good humor',
      'Dress modestly to respect local customs',
      'Carry small bills for tips and small purchases',
      'Stay hydrated and avoid tap water (drink bottled water)'
    ]
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
      '/img/destinations/Banff National Park, Canada.png',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Maple syrup products',
      'Inuit art and carvings',
      'Canadian whisky',
      'Rocky Mountain tea and local honey'
    ],
    restaurants: [
      'The Bison - farm-to-table Canadian cuisine',
      'Rimrock Resort Hotel - fine dining with mountain views',
      'Nourish Bistro - healthy and organic options',
      'Grizzly House - fondue and game meat specialties'
    ],
    costs: {
      'Budget per day': '$80-120',
      'Mid-range per day': '$120-220',
      'Luxury per day': '$300+',
      'Avg. meal (local)': '$15-30',
      'Avg. meal (international)': '$25-45',
      'Transportation': '$20-50/day'
    },
    mustSee: [
      'Peyto Lake (distinctive bow-shaped lake)',
      'Johnston Canyon ice walk',
      'Bow Lake and Bow Glacier Falls',
      'Vermilion Lakes (stunning sunset views)'
    ],
    cheapestPlaces: [
      'Canmore (just outside park, more affordable)',
      'Lake Louise (expensive but worth it)',
      'Highway 93 corridor (scenic but budget-friendly)',
      'Calgary (larger city with better prices)'
    ],
    tips: [
      'Book accommodations and activities months in advance during summer',
      'Bring layers as mountain weather changes quickly',
      'Pack bear spray and know how to use it',
      'Enter park early in the morning to avoid crowds'
    ]
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
    duration: '7 days',    travelers: '2-6 people',
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
      '/img/destinations/Safari, Kenya.png',
      'https://images.unsplash.com/photo-154747108a3448449df1ed6d6c0c27b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524439016562-591d3c6a5d0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523809811638-0ac919d55b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Maasai beadwork and jewelry',
      'Hand-carved soapstone animals',
      'Coffee from Kenyan highlands',
      'Traditional batik fabrics'
    ],
    restaurants: [
      'Carnivore Restaurant - Nairobi meat specialty',
      'Pellucid Rock Restaurant - Amboseli with Kilimanjaro views',
      'Kiko Restaurant - high-end Nairobi dining',
      'Camp dining (most safari lodges have excellent meals)'
    ],
    costs: {
      'Budget per day': '$100-200',
      'Mid-range per day': '$200-400',
      'Luxury per day': '$600+',
      'Avg. meal (local)': '$15-25',
      'Avg. meal (safari)': '$25-40',
      'Transportation': '$150-300/day'
    },
    mustSee: [
      'Great Migration river crossing',
      'Big Five game drives',
      'Maasai cultural experience',
      'Hot air balloon safari at sunrise'
    ],
    cheapestPlaces: [
      'Amboseli (less crowded, more affordable)',
      'Tsavo National Park (larger but less expensive)',
      'Lake Nakuru (flamingo viewing and value options)',
      'Budget camps near Maasai Mara'
    ],
    tips: [
      'Get required vaccinations 4-6 weeks before travel',
      'Pack neutral-colored clothing for safaris',
      'Bring a good camera with a zoom lens',
      'Expect early morning wake-up calls for game drives (6am+)'
    ]
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
      '/img/destinations/New York City, USA.png',
      'https://images.unsplash.com/photo-1506197603421-c8c76f2561a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'NYC coffee and bagels (famous local products)',
      'Statue of Liberty replicas',
      'Broadway theater merchandise',
      'Local chocolate and candy (like Junior\'s Cheesecake products)'
    ],
    restaurants: [
      'Le Bernardin - 3 Michelin stars seafood',
      'Katz\'s Delicatessen - famous pastrami',
      'Joe\'s Pizza - iconic New York pizza',
      'Xi\'an Famous Foods - excellent Chinese noodles'
    ],
    costs: {
      'Budget per day': '$100-150',
      'Mid-range per day': '$150-300',
      'Luxury per day': '$400+',
      'Avg. meal (local)': '$20-40',
      'Avg. meal (fine dining)': '$60-150',
      'Transportation': '$10-30/day'
    },
    mustSee: [
      '9/11 Memorial and Museum',
      'High Line elevated park',
      'Brooklyn Bridge and view of Manhattan',
      'One World Observatory for city views'
    ],
    cheapestPlaces: [
      'Brooklyn (great food and views across the river)',
      'Queens (authentic multicultural experiences)',
      'Harlem (cultural richness with value options)',
      'Upper West Side (museums and Central Park access)'
    ],
    tips: [
      'Get a MetroCard or use contactless payment for public transport',
      'Book Broadway shows in advance for better prices',
      'Walk as much as possible - that\'s the best way to see NYC',
      'Beware of street vendors selling fake merchandise in tourist areas'
    ]
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
      '/img/destinations/Tokyo, Japan.png',
      'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'KitKat flavors (Japan has unique varieties)',
      'Traditional fans and origami',
      'Maneki-neko (lucky cat figurines)',
      'Japanese green tea and matcha products'
    ],
    restaurants: [
      'Sukiyabashi Jiro - 3 Michelin stars sushi',
      'Ichiran Ramen - famous ramen chain',
      'Tsukiji Outer Market - fresh seafood and sushi',
      'Golden Gai area - small traditional eateries'
    ],
    costs: {
      'Budget per day': '$80-120',
      'Mid-range per day': '$120-250',
      'Luxury per day': '$350+',
      'Avg. meal (local)': '$10-25',
      'Avg. meal (specialty)': '$30-60',
      'Transportation': '$8-15/day'
    },
    mustSee: [
      'TeamLab Digital Art Museum',
      'Meiji Shrine in Yoyogi Park',
      'Cherry blossom viewing at Ueno Park',
      'Robot Restaurant (unique Tokyo experience)'
    ],
    cheapestPlaces: [
      'Asakusa (traditional area with good value)',
      'Ueno (museums and parks at reasonable prices)',
      'Shimokitazawa (bohemian area with budget options)',
      'Koenji (alternative Tokyo neighborhood)'
    ],
    tips: [
      'Purchase a Pasmo or Suica card for public transportation',
      'Download translation apps as English is limited',
      'Tipping is not customary in Japan',
      'Reserve high-end restaurants in advance'
    ]
  },
  {
    id: 10,
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
    guide: 'Warsaw, Poland travel guide: Experience a city that beautifully balances its tragic history with a vibrant modern culture. Explore the reconstructed Old Town, visit the moving Warsaw Uprising Museum, and enjoy the lively atmosphere of Nowy Świat. Spring through early fall offers pleasant weather for sightseeing. Don\'t miss the thriving food scene and the beautiful Łazienki Park.',
    highlights: [
      'Old Town Market Place',
      'Warsaw Uprising Museum',
      'Łazienki Park',
      'Palace of Culture and Science',
      'Wilanów Palace'
    ],
    bestFor: ['History Lovers', 'Architecture Enthusiasts', 'Foodies'],
    images: [
      '/img/destinations/Warsaw.png',
      'https://images.unsplash.com/photo-1588225936315-3a87a1607b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515822400657-9a2d6f8fcbb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545252659-1b663a7c6a97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Amber jewelry from Baltic regions',
      'Traditional Polish pottery (ceramika bolesławiecka)',
      'Solidarity movement memorabilia',
      'Vodka and traditional Polish honey'
    ],
    restaurants: [
      'Atelier Amaro - innovative Polish cuisine',
      'Polka - authentic traditional dishes',
      'Pruszkowski - upscale Polish dining',
      'Hala Koszyki - food market with local vendors'
    ],
    costs: {
      'Budget per day': '$40-60',
      'Mid-range per day': '$60-120',
      'Luxury per day': '$200+',
      'Avg. meal (local)': '$8-15',
      'Avg. meal (international)': '$15-30',
      'Transportation': '$5-10/day'
    },
    mustSee: [
      'Warsaw Old Town and Royal Castle',
      'Chopin\'s birthplace museum',
      'Jewish Ghetto Memorial',
      'Museum of Warsaw'
    ],
    cheapestPlaces: [
      'Praga district (up-and-coming area with budget options)',
      'Mokotów (residential with good value accommodations)',
      'Wola (modern area with affordable stays)',
      'Food courts in shopping centers'
    ],
    tips: [
      'Learn a few Polish phrases as English isn\'t universally spoken',
      'Use the efficient public transportation system',
      'Visit museums on free admission days (usually first Tuesday of month)',
      'Check out free walking tours for historical context'
    ]
  },
  {
    id: 11,
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
    guide: 'Kuala Lumpur, Malaysia travel guide: A vibrant mix of cultures, cuisines, and towering architecture. Visit the iconic Petronas Twin Towers, explore the colorful Batu Caves, and sample diverse street food. The city is best visited outside of the monsoon season (October to March) for optimal weather. The KLCC district is the heart of the city with shopping and dining options.',
    highlights: [
      'Petronas Twin Towers',
      'Batu Caves',
      'KLCC Park',
      'Central Market',
      'Chinatown'
    ],
    bestFor: ['Urban Adventures', 'Cultural Experiences', 'Food Lovers'],
    images: [
      '/img/destinations/kuala lumpur.png',
      'https://images.unsplash.com/photo-1582546455182-a1ef4bf645ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554189343-9b43194c7c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570736848186-d3e99401b23e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Malaysian batik fabric',
      'Pandan leaf products and spices',
      'Traditional silver crafts from Kuala Lumpur',
      'White board game (local specialty)'
    ],
    restaurants: [
      'Dewakan - 2 Michelin stars, modern Malaysian cuisine',
      'Madam Kwan\'s - famous for local Malaysian dishes',
      'The Steak House Wine Bar - great for Western palates',
      'Jalan Alor - street food avenue with multiple options'
    ],
    costs: {
      'Budget per day': '$30-50',
      'Mid-range per day': '$50-100',
      'Luxury per day': '$180+',
      'Avg. meal (local)': '$3-8',
      'Avg. meal (international)': '$10-25',
      'Transportation': '$3-8/day'
    },
    mustSee: [
      'KL Tower and Sky Deck',
      'Aquaria KLCC underwater zoo',
      'Islamic Arts Museum Malaysia',
      'National Mosque of Malaysia'
    ],
    cheapestPlaces: [
      'Chinatown (Petaling Street area with affordable stays)',
      'Brickfields (Indian quarter with budget options)',
      'Bangsar (hip area with good value accommodations)',
      'Street food for budget dining throughout the city'
    ],
    tips: [
      'Dress modestly when visiting religious sites',
      'Drink bottled water, especially during hot weather',
      'Use ride-hailing apps like Grab instead of taxis',
      'Visit Petronas Towers early morning to avoid queues'
    ]
  },
  {
    id: 12,
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
    guide: 'Sintra, Portugal travel guide: A UNESCO World Heritage site filled with colorful palaces and romantic architecture. Best visited during spring or fall for pleasant weather and fewer crowds. The town is only 30 minutes from Lisbon, making it a perfect day trip or short stay. Pena Palace is the crown jewel with its vibrant colors and panoramic views.',
    highlights: [
      'Pena Palace',
      'Moorish Castle',
      'Quinta da Regaleira',
      'Seteais Palace',
      'Sintra National Palace'
    ],
    bestFor: ['Romantic Getaways', 'Architecture Lovers', 'Historical Sites'],
    images: [
      '/img/destinations/sintra.png',
      'https://images.unsplash.com/photo-1599621605511-9089431647a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599621605511-9089431647a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599621605511-9089431647a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Traditional Sintra travesseiros (almond puff pastries)',
      'Portuguese ceramics and azulejos',
      'Hand-painted tiles and pottery',
      'Portuguese cork products'
    ],
    restaurants: [
      'Tascantiga - traditional Portuguese near train station',
      'Casa Piriquita - famous for pastries and local dishes',
      'Anjos do Cardeal - fine dining with palace views',
      'Malibu - casual dining with great atmosphere'
    ],
    costs: {
      'Budget per day': '$45-70',
      'Mid-range per day': '$70-130',
      'Luxury per day': '$250+',
      'Avg. meal (local)': '$12-20',
      'Avg. meal (international)': '$20-35',
      'Transportation': '$10-25/day'
    },
    mustSee: [
      'Pena Palace (iconic colorful palace)',
      'Quinta da Regaleira (mystical underground tunnels)',
      'Moorish Castle ruins',
      'Sintra National Palace'
    ],
    cheapestPlaces: [
      'Queluz (slightly cheaper than main Sintra area)',
      'Lisbon (easily accessible for day trips)',
      'Local cafés and bakeries for budget dining',
      'Free walking routes outside main palaces'
    ],
    tips: [
      'Buy tickets online in advance to avoid long queues',
      'Wear comfortable shoes for climbing hills and stairs',
      'Start early to beat crowds at Pena Palace',
      'Combine visit with day trip to Cascais or Cabo da Roca'
    ]
  },
  {
    id: 13,
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
    guide: 'Hong Kong, China travel guide: A dynamic city of contrasts with towering skyscrapers, traditional temples, and bustling markets. Best visited in fall or winter for comfortable temperatures. Experience the famous skyline from Victoria Peak, explore the vibrant neighborhoods, and enjoy world-class dining. The MTR system makes getting around efficient and easy.',
    highlights: [
      'Victoria Peak',
      'Symphony of Lights',
      'Temple Street Night Market',
      'Lantau Island and Big Buddha',
      'Hong Kong Disneyland'
    ],
    bestFor: ['Urban Adventures', 'Nightlife', 'Shopping', 'Food Lovers'],
    images: [
      '/img/destinations/honkong.png',
      'https://images.unsplash.com/photo-1519396317879-833e181b9e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519396317879-833e181b9e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519396317879-833e181b9e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Traditional Chinese herbs and teas',
      'Custom tailoring (famous for quality suits)',
      'Jade jewelry and ornaments',
      'Hong Kong specialty items like pineapple buns'
    ],
    restaurants: [
      'Lung King Heen - 3 Michelin stars, dim sum',
      'Tim Ho Wan - Michelin-starred dim sum at affordable prices',
      'Dai Lai Dessert - famous mango pomelo sago',
      'Australia Dairy Company - local Hong Kong café experience'
    ],
    costs: {
      'Budget per day': '$60-90',
      'Mid-range per day': '$90-180',
      'Luxury per day': '$300+',
      'Avg. meal (local)': '$8-15',
      'Avg. meal (international)': '$20-40',
      'Transportation': '$8-15/day'
    },
    mustSee: [
      'Victoria Harbour and skyline views',
      'Monk\'s Café for local experience',
      'Ngong Ping 360 cable car and Big Buddha',
      'Tai O fishing village'
    ],
    cheapestPlaces: [
      'Causeway Bay for budget shopping',
      'Local cha chaan teng (Hong Kong-style cafes)',
      'MTR for efficient transportation',
      'Free views from various vantage points'
    ],
    tips: [
      'Get an Octopus card for seamless public transportation',
      'Carry cash as some local vendors don\'t accept cards',
      'Avoid public transportation during rush hours',
      'Book Peak Tram in advance for better rates'
    ]
  },
  {
    id: 14,
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
    guide: 'Cape Town, South Africa travel guide: One of the world\'s most beautiful cities with Table Mountain as its backdrop. Visit during southern hemisphere spring or summer (October to March) for warm weather. Explore Table Mountain, the Cape Peninsula, and world-class wine regions. The V&A Waterfront is a hub for shopping, dining, and entertainment.',
    highlights: [
      'Table Mountain',
      'Cape of Good Hope',
      'Robben Island',
      'V&A Waterfront',
      'Wine tours in Stellenbosch'
    ],
    bestFor: ['Adventure Seekers', 'Nature Lovers', 'Wine Tasting', 'Photography'],
    images: [
      '/img/destinations/Cape Town.png',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'African crafts and woodcarvings',
      'Rooibos tea and honey',
      'Biltong (dried meat) and local wines',
      'Shweshwe fabric and traditional crafts'
    ],
    restaurants: [
      'The Test Kitchen - innovative cuisine with multiple awards',
      'Gold Restaurant - African-themed dining experience',
      'Harold\'s Place - famous for their famous burger',
      'Mielie Boord - traditional South African cuisine'
    ],
    costs: {
      'Budget per day': '$50-80',
      'Mid-range per day': '$80-150',
      'Luxury per day': '$250+',
      'Avg. meal (local)': '$10-20',
      'Avg. meal (international)': '$25-50',
      'Transportation': '$10-30/day'
    },
    mustSee: [
      'Table Mountain and cable car',
      'Robben Island tour where Mandela was imprisoned',
      'Cape Winelands (Stellenbosch and Franschhoek)',
      'Cape of Good Hope and penguins at Boulders Beach'
    ],
    cheapestPlaces: [
      'Long Street for budget dining and entertainment',
      'Bo-Kaap for colorful houses and affordable eats',
      'Local markets like Greenmarket Square',
      'Hiking trails instead of paid attractions'
    ],
    tips: [
      'Take safety precautions in tourist areas as advised',
      'Book wine tours in advance during peak season',
      'Check weather before hiking Table Mountain',
      'Carry minimal cash and keep valuables secure'
    ]
  },
  {
    id: 15,
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
    guide: 'Rio de Janeiro, Brazil travel guide: The city of endless summer with world-famous beaches, iconic landmarks, and samba rhythms. Best visited during Carnival season or outside of heavy rain season (December to March). Don\'t miss Copacabana and Ipanema beaches, Christ the Redeemer, and Sugar Loaf. The city pulses with music, dance, and outdoor lifestyle.',
    highlights: [
      'Christ the Redeemer',
      'Sugar Loaf Mountain',
      'Copacabana Beach',
      'Ipanema Beach',
      'Carnival celebrations'
    ],
    bestFor: ['Beach Lovers', 'Adventure Seekers', 'Cultural Experiences', 'Nightlife'],
    images: [
      '/img/destinations/rio de janeiro.png',
      'https://images.unsplash.com/photo-1520335280553-035a46e32d64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520335280553-035a46e32d64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520335280553-035a46e32d64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Havaianas flip-flops (Brazilian brand)',
      'Brazilian coffee and acai products',
      'Carnival masks and costumes',
      'Samba music and Brazilian crafts'
    ],
    restaurants: [
      'Aprazível - traditional Brazilian with city views',
      'Confeitaria Colombo - historic café and pastry shop',
      'Porcão Rio Music Bar - live music and great food',
      'Zuka - upscale Brazilian cuisine'
    ],
    costs: {
      'Budget per day': '$40-70',
      'Mid-range per day': '$70-140',
      'Luxury per day': '$220+',
      'Avg. meal (local)': '$8-15',
      'Avg. meal (international)': '$20-40',
      'Transportation': '$8-20/day'
    },
    mustSee: [
      'Christ the Redeemer statue (UNESCO site)',
      'Sugar Loaf Mountain cable car',
      'Samba show during Carnival season',
      'Tijuca National Park (world\'s largest urban forest)'
    ],
    cheapestPlaces: [
      'Lapa for nightlife and budget options',
      'Local feiras (street markets) for food and shopping',
      'Free beaches with amazing views',
      'Botafogo area for affordable accommodations'
    ],
    tips: [
      'Learn basic Portuguese phrases for better experiences',
      'Carry only small amounts of cash for safety',
      'Visit beaches safely during daylight hours',
      'Book Carnival tickets and accommodations months in advance'
    ]
  },
  {
    id: 16,
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
    guide: 'Barcelona, Spain travel guide: Gaudí\'s architectural masterpieces, delicious tapas, and vibrant beach life. Best visited in spring or fall for pleasant weather and fewer crowds. Explore Sagrada Família, Park Güell, and the Gothic Quarter. The city offers a perfect blend of history, art, and Mediterranean lifestyle.',
    highlights: [
      'Sagrada Família',
      'Park Güell',
      'Gothic Quarter',
      'La Rambla',
      'Casa Batlló'
    ],
    bestFor: ['Architecture Lovers', 'Art Enthusiasts', 'Food Lovers', 'Beach Lovers'],
    images: [
      '/img/destinations/barcelona.png',
      'https://images.unsplash.com/photo-1556814350-7ec418f7f007?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556814350-7ec418f7f007?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556814350-7ec418f7f007?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Ceramics from La Bisbal d\'Empordà',
      'Spanish wines and jamón ibérico',
      'Gaudí-inspired decorative items',
      'Sangria sets and Spanish kitchenware'
    ],
    restaurants: [
      'Tickets - molecular tapas by the Adrià brothers',
      'Can Culleretes - traditional Catalan cuisine since 1786',
      'Quimet & Quimet - famous montaditos',
      'Boquería Market stalls - fresh local ingredients'
    ],
    costs: {
      'Budget per day': '$60-90',
      'Mid-range per day': '$90-180',
      'Luxury per day': '$300+',
      'Avg. meal (local)': '$15-25',
      'Avg. meal (international)': '$25-50',
      'Transportation': '$5-15/day'
    },
    mustSee: [
      'Sagrada Família (Gaudí\'s masterpiece)',
      'Park Güell and its colorful mosaics',
      'Gothic Quarter ancient streets',
      'Magic Fountain of Montjuïc'
    ],
    cheapestPlaces: [
      'El Born for affordable tapas and shops',
      'Gràcia for local vibe and prices',
      'Free walking tours for budget sightseeing',
      'Local markets for food and provisions'
    ],
    tips: [
      'Book Sagrada Família tickets in advance online',
      'Try to avoid touristy restaurants on La Rambla',
      'Use the T10 transport card for public transportation',
      'Enjoy the local siesta schedule and late dining times'
    ]
  },
  {
    id: 17,
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
    guide: 'Dubai, UAE travel guide: A gleaming metropolis offering luxury experiences, modern architecture, and desert adventures. Best visited during fall or winter for cooler weather. Marvel at the Burj Khalifa, shop in massive malls, and experience the desert. The city seamlessly blends Middle Eastern heritage with cutting-edge innovation.',
    highlights: [
      'Burj Khalifa',
      'Palm Jumeirah',
      'Dubai Mall',
      'Desert Safari',
      'Dubai Fountain'
    ],
    bestFor: ['Luxury Travelers', 'Shopping Enthusiasts', 'Adventure Seekers', 'Architecture Lovers'],
    images: [
      '/img/destinations/Dubai.png',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Arabian oud and incense',
      'Gold from Gold Souk',
      'Traditional Arabic coffee pots',
      'Pashmina shawls and Middle Eastern textiles'
    ],
    restaurants: [
      'At.mosphere - fine dining in Burj Khalifa',
      'Pierchic - seafood restaurant on a pier',
      'Al Mahara - undersea-themed restaurant',
      'Bu Qtair - authentic local seafood'
    ],
    costs: {
      'Budget per day': '$80-120',
      'Mid-range per day': '$120-250',
      'Luxury per day': '$500+',
      'Avg. meal (local)': '$15-25',
      'Avg. meal (international)': '$30-60',
      'Transportation': '$10-30/day'
    },
    mustSee: [
      'Burj Khalifa observation deck',
      'Fountain show at Dubai Mall',
      'Desert safari with dune bashing',
      'Dubai Museum and Al Fahidi Historical District'
    ],
    cheapestPlaces: [
      'Deira for budget accommodations and shopping',
      'Local cafés and Arabian restaurants',
      'Free public beaches instead of hotel beaches',
      'Mall walking areas with free attractions'
    ],
    tips: [
      'Dress modestly in public areas respecting local customs',
      'Stay hydrated and protect from sun during outdoor activities',
      'Avoid traveling during Ramadan if non-Muslim',
      'Book Burj Khalifa tickets early in the morning'
    ]
  },
  {
    id: 18,
    name: 'Rabat, Morocco',
    country: 'Morocco',
    continent: 'Africa',
    description: 'Elegant capital city with beautiful architecture, royal gardens, and rich history',
    image: '/img/destinations/Rabat.png',
    rating: 4.3,
    reviews: 780,
    price: 699,
    duration: '4 days',
    travelers: '1-3 people',
    category: 'Culture',
    season: 'Spring/Fall',
    guide: 'Rabat, Morocco travel guide: The political capital of Morocco balances governmental functions with historical sites. The city features the Hassan Tower, Chellah Necropolis, and the Royal Palace. Enjoy the relaxed atmosphere along the Bou Regreg river and the beautiful Andalusian Gardens. Best visited in spring or fall for comfortable weather.',
    highlights: [
      'Hassan Tower',
      'Chellah Necropolis',
      'Royal Palace of Rabat',
      'Kasbah of the Udayas',
      'Andalusian Gardens'
    ],
    bestFor: ['History Lovers', 'Architecture Enthusiasts', 'Cultural Experiences'],
    images: [
      '/img/destinations/Rabat.png',
      'https://images.unsplash.com/photo-1572615133724-496e739b10f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566647862936-76a2939e3b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596127279410-ef09221e52e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Moroccan ceramics and pottery',
      'Handwoven rugs and textiles',
      'Argan oil and beauty products',
      'Traditional lanterns and metalwork'
    ],
    restaurants: [
      'Dar Zaki - traditional Moroccan cuisine with garden setting',
      'Le Dhow - dinner cruise on the Bou Regreg river',
      'Restaurant Villa Blanche - fine dining with colonial atmosphere',
      'La Shella - seafood with Atlantic views'
    ],
    costs: {
      'Budget per day': '$40-70',
      'Mid-range per day': '$70-120',
      'Luxury per day': '$200+',
      'Avg. meal (local)': '$8-15',
      'Avg. meal (international)': '$15-30',
      'Transportation': '$5-15/day'
    },
    mustSee: [
      'Hassan Tower and Mausoleum of Mohammed V',
      'Chellah Roman and Medieval ruins',
      'Kasbah of the Udayas and Oudayas Gardens',
      'Mohammed VI Museum of Modern and Contemporary Art'
    ],
    cheapestPlaces: [
      'Medina for budget accommodations and food',
      'Local markets like Souk el Had for shopping',
      'Free walking tours to explore the city',
      'Public beaches along the Atlantic coast'
    ],
    tips: [
      'Dress modestly to respect local customs',
      'Stay hydrated and protect from the sun',
      'Bargain respectfully in markets',
      'Plan visits to religious sites during non-prayer times'
    ]
  },
  {
    id: 19,
    name: 'Qatar',
    country: 'Qatar',
    continent: 'Asia',
    description: 'Modern Arabian peninsula nation with world-class architecture and cultural landmarks',
    image: '/img/destinations/Qatar.png',
    rating: 4.5,
    reviews: 890,
    price: 1699,
    duration: '5 days',
    travelers: '2-4 people',
    category: 'Luxury',
    season: 'Fall/Winter',
    guide: 'Qatar travel guide: A modern gulf state that combines traditional Qatari culture with rapid modernization. Doha, the capital, features the Museum of Islamic Art, Souq Waqif, and stunning skyline. The country hosted the 2022 FIFA World Cup and offers luxury experiences with unique desert adventures. Best visited from November to March to avoid extreme summer heat.',
    highlights: [
      'Museum of Islamic Art',
      'Souq Waqif',
      'Pearl Qatar',
      'Katara Cultural Village',
      'Aspire Park'
    ],
    bestFor: ['Luxury Travelers', 'Cultural Experiences', 'Architecture Lovers'],
    images: [
      '/img/destinations/Qatar.png',
      'https://images.unsplash.com/photo-1618017055598-41200fbbc1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618017055598-41200fbbc1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618017055598-41200fbbc1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Arabian perfumes and oud',
      'Qatari traditional dress',
      'Islamic calligraphy and art',
      'High-end jewelry from Souq Waqif'
    ],
    restaurants: [
      'Al Mourjan - Lebanese fine dining in Souq Waqif',
      'The Afghan - authentic Middle Eastern cuisine',
      'Bryant & May - contemporary dining in The Pearl',
      'ID - innovative cuisine at Marsa Malaz Kempinski'
    ],
    costs: {
      'Budget per day': '$100-150',
      'Mid-range per day': '$150-300',
      'Luxury per day': '$600+',
      'Avg. meal (local)': '$20-35',
      'Avg. meal (international)': '$35-60',
      'Transportation': '$20-50/day'
    },
    mustSee: [
      'Museum of Islamic Art and its stunning architecture',
      'Souq Waqif traditional market',
      'Doha Corniche waterfront promenade',
      'Katara Cultural Village with amphitheater'
    ],
    cheapestPlaces: [
      'Al Khor and Al Ghuwariya for budget accommodations',
      'Local cafés for affordable dining',
      'Free public transportation during World Cup legacy',
      'Public beaches for recreation'
    ],
    tips: [
      'Respect local customs especially during Ramadan',
      'Dress conservatively in public places',
      'Summer months (June-September) are extremely hot',
      'Try traditional Qatari dishes like machboos'
    ]
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
    guide: 'Amsterdam, Netherlands travel guide: Famous for its artistic heritage, elaborate canal system, and narrow houses with gabled facades. Explore the Rijksmuseum, Van Gogh Museum, and Anne Frank House. Cycle through the city like locals do, and enjoy the vibrant café culture. Best visited in spring (for tulips) or summer for pleasant weather.',
    highlights: [
      'Rijksmuseum',
      'Van Gogh Museum',
      'Anne Frank House',
      'Canal Ring',
      'Vondelpark'
    ],
    bestFor: ['Cultural Experiences', 'Art Lovers', 'Architecture Enthusiasts', 'Cyclists'],
    images: [
      '/img/destinations/Amsterdam.png',
      'https://images.unsplash.com/photo-1566738780863-f385b7f6e761?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530521954074-e64f6810b27e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518690614641-6643892693b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'Dutch cheese',
      'Cannabis-themed items (legal)',
      'Delft blue pottery',
      'Wooden clogs'
    ],
    restaurants: [
      'Café de Jaren - canal-side dining with great views',
      'Yellow - innovative French cuisine',
      'De Kas - restaurant in a greenhouse',
      'Winkel 43 - famous for apple pie'
    ],
    costs: {
      'Budget per day': '$80-120',
      'Mid-range per day': '$120-250',
      'Luxury per day': '$400+',
      'Avg. meal (local)': '$15-30',
      'Avg. meal (international)': '$25-50',
      'Transportation': '$5-15/day'
    },
    mustSee: [
      'Rijksmuseum and Dutch art collection',
      'Van Gogh Museum',
      'Anne Frank House',
      'Explore the canal ring area'
    ],
    cheapestPlaces: [
      'Jordaan district for budget accommodations',
      'Foodhallen for affordable gourmet food',
      'Vondelpark for free activities',
      'Local markets like Albert Cuypmarkt'
    ],
    tips: [
      'Rent a bicycle to get around like locals',
      'Be respectful of the coffee shop (cannabis) culture',
      'Many museums offer free entrance on certain days',
      'Be mindful of bike lanes when walking'
    ]
  },
  {
    id: 21,
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
    guide: 'Paris, France travel guide: The eternal city of romance, art, and cuisine. Best visited in spring or fall when the weather is pleasant and crowds are smaller. Stroll along the Seine, visit world-class museums, and enjoy café culture. The City of Light offers iconic landmarks like the Eiffel Tower and Louvre Museum.',
    highlights: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame Cathedral',
      'Montmartre and Sacré-Cœur',
      'Seine River Cruise'
    ],
    bestFor: ['Romantic Getaways', 'Art Lovers', 'Food Lovers', 'Cultural Experiences'],
    images: [
      '/img/destinations/paris.png',
      'https://images.unsplash.com/photo-1506357042194-4e7d8d381601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506357042194-4e7d8d381601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506357042194-4e7d8d381601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    souvenirs: [
      'French perfumes from Grasse',
      'Macarons from Ladurée',
      'Art prints from Montmartre',
      'Wine and cheese from local markets'
    ],
    restaurants: [
      'Le Jules Verne - fine dining in Eiffel Tower',
      'L\'As du Fallafel - famous falafel in Marais',
      'Le Comptoir du Relais - authentic bistro experience',
      'Angelina - famous for hot chocolate and pastries'
    ],
    costs: {
      'Budget per day': '$70-100',
      'Mid-range per day': '$100-200',
      'Luxury per day': '$400+',
      'Avg. meal (local)': '$20-35',
      'Avg. meal (international)': '$35-70',
      'Transportation': '$5-15/day'
    },
    mustSee: [
      'Louvre Museum and Mona Lisa',
      'Eiffel Tower at sunset',
      'Notre-Dame and Île de la Cité',
      'Musée d\'Orsay and Montmartre'
    ],
    cheapestPlaces: [
      'Le Marais for budget dining and vintage shopping',
      'Local food markets for provisions',
      'Free walking tours for sightseeing',
      'Parks and gardens for free relaxation'
    ],
    tips: [
      'Learn a few French phrases to enhance your experience',
      'Book museum tickets in advance to avoid lines',
      'Be cautious of pickpockets in touristy areas',
      'Use metro for efficient city transportation'
    ]
  }
];

export default function DestinationPage() {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<any>(null);
  const { AdPlacement } = useAdContext();

  useEffect(() => {
    usePageViewTracker();
    
    if (slug) {
      const destinationName = slugToName(slug);
      const foundDestination = destinations.find(d => d.name === destinationName);
      setDestination(foundDestination);
      
      // Track destination view with location data if available
      if (foundDestination) {
        const userLocation = (window as any).userLocation;
        trackViewDestination(foundDestination.name, userLocation);
      }
    }
  }, [slug]);

  if (!destination) {
    return <div className="min-h-screen flex items-center justify-center">Destination not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Ad placement before content */}
          <div className="mb-6">
            <AdPlacement position="destination-top" type="mobile" />
{/* Banner Top */}
        <section className="py-6 flex justify-center">
          <AdsterraAd keyId="a1593f7dbeeec27923c535ee40c45244" width={320} height={50} />
        </section>

          </div>

          <Link href="/destinations" className="flex items-center gap-2 text-primary mb-6">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Destinations</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <h1 className="text-2xl sm:text-4xl font-bold">{destination.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">{destination.category}</Badge>
                    <Badge variant="outline" className="text-sm">{destination.continent}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{destination.rating}</span>
                    <span className="text-muted-foreground text-sm">({destination.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{destination.travelers}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About {destination.name.split(',')[0]}</h2>
                  <p className="text-muted-foreground leading-relaxed">{destination.guide}</p>
                </div>

                {/* Ad placement in the middle of content */}
                <div className="mb-8">
                  <AdPlacement position="destination-middle" type="rectangle" />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Top Highlights</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Best For</h2>
                  <div className="flex flex-wrap gap-2">
                    {destination.bestFor.map((item: string, index: number) => (
                      <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>
                  <ul className="space-y-2">
                    {destination.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Cost Breakdown</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(destination.costs).map(([item, cost], index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">{item}</span>
                        <span className="font-medium">{String(cost)}</span>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Must-See Places</h2>
                  <div className="space-y-3">
                    {destination.mustSee.map((place: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </div>
                        <p className="text-muted-foreground">{place}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Trip Details</h3>
                    <div className="text-2xl font-bold text-primary">${destination.price}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Best Season</span>
                      </div>
                      <p className="text-muted-foreground">{destination.season}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Ideal Group Size</span>
                      </div>
                      <p className="text-muted-foreground">{destination.travelers}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Duration</span>
                      </div>
                      <p className="text-muted-foreground">{destination.duration}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Budget</span>
                      </div>
                      <p className="text-muted-foreground">From ${destination.price}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6">Book This Trip</Button>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Souvenirs to Buy</h3>
                  <ul className="space-y-2">
                    {destination.souvenirs.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Where to Dine</h3>
                  <ul className="space-y-2">
                    {destination.restaurants.map((restaurant: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{restaurant}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Budget-Friendly Areas</h3>
                  <ul className="space-y-2">
                    {destination.cheapestPlaces.map((place: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{place}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Ad placement in sidebar */}
                <div>
                  <AdPlacement position="destination-sidebar" type="rectangle" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
