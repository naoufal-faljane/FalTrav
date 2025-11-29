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
import { useAdContext } from '@/contexts/AdContext';

// Helper function to convert slug back to destination name
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(', Indonesia', ', Indonesia')
    .replace(', Greece', ', Greece')
    .replace(', Japan', ', Japan')
    .replace(', Switzerland', ', Switzerland')
    .replace(', Morocco', ', Morocco')
    .replace(', Canada', ', Canada')
    .replace(', Kenya', ', Kenya')
    .replace(', Usa', ', USA')
    .replace(', Australia', ', Australia');
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
                        <span className="font-medium">{cost}</span>
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