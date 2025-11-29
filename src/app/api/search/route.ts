import { NextRequest } from 'next/server';
import { travelBooks } from '@/data/travelBooks';

// Import destination data directly
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

// Import shop data directly
const shopItems = [
  // Bags
  {
    id: 1,
    name: 'Adventure Backpack',
    description: 'Durable 50L backpack with laptop compartment',
    price: 68.99,
    originalPrice: null,
    image: '/img/product1.png',
    rating: 4.7,
    reviews: 124,
    category: 'Bags',
    tags: ['Backpacks', 'Hiking', 'Travel'],
    affiliateLink: 'https://amzn.to/3XPN0QK'
  },
  {
    id: 2,
    name: 'Luxury Leather Travel Bag',
    description: 'Premium leather tote for business travelers',
    price: 25.99,
    originalPrice: null,
    image: '/img/product2.png',
    rating: 4.9,
    reviews: 86,
    category: 'Bags',
    tags: ['Luggage', 'Business', 'Luxury'],
    affiliateLink: 'https://amzn.to/43Rperh'
  },
  {
    id: 3,
    name: 'Weekender Duffle',
    description: 'Perfect for weekend getaways',
    price: 5.98,
    originalPrice: 99.99,
    image: '/img/product3.png',
    rating: 4.5,
    reviews: 67,
    category: 'Bags',
    tags: ['Duffel', 'Weekend', 'Travel'],
    affiliateLink: 'https://amzn.to/3XOuGaO'
  },
  // Cameras
  {
    id: 4,
    name: 'Travel Action Camera',
    description: 'Waterproof camera for adventures',
    price: 55.99,
    originalPrice: null,
    image: '/img/product4.png',
    rating: 4.6,
    reviews: 98,
    category: 'Cameras',
    tags: ['Action', 'Waterproof', 'Adventure'],
    affiliateLink: 'https://amzn.to/3XOuGaO'
  },
  {
    id: 5,
    name: 'Mirrorless Camera',
    description: 'Compact high-quality travel camera',
    price: 819,
    originalPrice: 999.99,
    image: '/img/product5.png',
    rating: 4.8,
    reviews: 154,
    category: 'Cameras',
    tags: ['Photography', 'Mirrorless', 'Travel'],
    affiliateLink: 'https://amzn.to/483qwll'
  },
  {
    id: 6,
    name: '360° Travel Camera',
    description: 'Capture immersive spherical footage',
    price: 299,
    originalPrice: 349.99,
    image: '/img/product6.png',
    rating: 4.4,
    reviews: 72,
    category: 'Cameras',
    tags: ['360°', 'VR', 'Video'],
    affiliateLink: 'https://amzn.to/3M3trC7'
  },
  // Outfits
  {
    id: 7,
    name: 'Travel Clothing Set',
    description: 'Quick-dry, wrinkle-resistant travel clothes',
    price: 18.69,
    originalPrice: null,
    image: '/img/product7.png',
    rating: 4.3,
    reviews: 134,
    category: 'Outfits',
    tags: ['Clothing', 'Travel', 'Quick-dry'],
    affiliateLink: 'https://amzn.to/48iLtaZ'
  },
  {
    id: 8,
    name: 'Convertible Travel Pants',
    description: 'Pants that convert to shorts',
    price: 19.99,
    originalPrice: 79.99,
    image: '/img/product8.png',
    rating: 4.7,
    reviews: 89,
    category: 'Outfits',
    tags: ['Pants', 'Convertible', 'Hiking'],
    affiliateLink: 'https://amzn.to/4p4fCSA'
  },
  {
    id: 9,
    name: 'Travel Rain Jacket',
    description: 'Lightweight, packable rain protection',
    price: 14.99,
    originalPrice: null,
    image: '/img/product9.png',
    rating: 4.8,
    reviews: 102,
    category: 'Outfits',
    tags: ['Jackets', 'Rain', 'Outdoor'],
    affiliateLink: 'https://amzn.to/43UHoZb'
  },
  // Gadgets
  {
    id: 10,
    name: 'Portable Charger',
    description: '10000mAh power bank with fast charging',
    price: 119.99,
    originalPrice: 45.99,
    image: '/img/product10.png',
    rating: 4.6,
    reviews: 210,
    category: 'Gadgets',
    tags: ['Charger', 'Electronics', 'Travel'],
    affiliateLink: 'https://amzn.to/4ocNQ4R'
  },
  {
    id: 11,
    name: 'Travel Adapter',
    description: 'Universal adapter for 150+ countries',
    price: 16.14,
    originalPrice: 29.99,
    image: '/img/product11.png',
    rating: 4.8,
    reviews: 176,
    category: 'Gadgets',
    tags: ['Adapter', 'Electronics', 'Power'],
    affiliateLink: 'https://amzn.to/4p6D2qm'
  },
  {
    id: 12,
    name: 'Packing Cubes Set',
    description: 'Set of 6 compression cubes for organization',
    price: 14.99,
    originalPrice: 42.99,
    image: '/img/product12.png',
    rating: 4.7,
    reviews: 201,
    category: 'Gadgets',
    tags: ['Organization', 'Packing', 'Travel'],
    affiliateLink: 'https://amzn.to/48hbBTw'
  },
];

// Import news articles data directly
const newsArticles = [
  {
    id: 1,
    title: 'Top 10 Destinations to Visit in 2024',
    excerpt: 'Discover the most sought-after travel destinations for the upcoming year based on trends and expert predictions.',
    content: 'The travel landscape continues to evolve as we move into 2024, with new destinations emerging and traditional favorites adapting to changing traveler preferences. This year, we\'re seeing a shift towards more sustainable and off-the-beaten-path locations as travelers seek meaningful experiences over Instagram-worthy photos.\n\nLeading the list are destinations like Madagascar with its unique biodiversity, Bhutan with its commitment to sustainable tourism, and the Faroe Islands offering dramatic landscapes with their dramatic landscapes. European favorites like Portugal and Greece continue to attract visitors, but with a focus on lesser-known regions away from overcrowded hotspots.',
    image: '/img/news/Top 10 Destinations to Visit in 2024.png',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    category: 'Trends',
    author: 'Travel Experts',
    tags: ['Destinations', '2024', 'Travel Tips']
  },
  {
    id: 2,
    title: 'Essential Packing Tips for International Travel',
    excerpt: 'Learn how to pack efficiently for your international adventures without overloading your luggage.',
    content: 'Packing for international travel can seem overwhelming, but with the right strategies, you can maximize your space while ensuring you have everything you need. Here are some essential tips:\n\n1. Roll your clothes instead of folding them - this saves up to 50% more space\n2. Pack versatile items that can be mixed and matched\n3. Wear your heaviest items on the plane\n4. Use packing cubes to stay organized\n5. Limit shoes to 2-3 pairs maximum\n6. Check the weather forecast and pack accordingly\n7. Remember that you can often buy items at your destination',
    image: '/img/news/Essential Packing Tips for International Travel.png',
    date: 'Nov 10, 2024',
    readTime: '4 min read',
    category: 'Tips',
    author: 'Adventure Pack',
    tags: ['Packing', 'Tips', 'Travel']
  },
  {
    id: 3,
    title: 'Budget-Friendly European Cities for Winter',
    excerpt: 'Explore European cities that offer beauty and culture without breaking the bank during the winter months.',
    content: 'Winter in Europe doesn\'t have to mean expensive skiing resorts or crowded holiday markets. There are several cities that offer incredible experiences at affordable prices during the colder months.\n\nPrague remains one of the most affordable European capitals, with excellent architecture, cozy cafés, and winter markets at reasonable prices. Budapest offers thermal baths and beautiful views of the Danube without the high prices of Western European cities. Additionally, cities like Krakow, Ljubljana, and Tallinn provide rich cultural experiences without draining your wallet.',
    image: '/img/news/Budget-Friendly European Cities for Winter.png',
    date: 'Nov 5, 2024',
    readTime: '6 min read',
    category: 'Destinations',
    author: 'Wanderlust Weekly',
    tags: ['Europe', 'Budget', 'Winter', 'Travel']
  },
  {
    id: 4,
    title: 'How to Stay Safe While Traveling Alone',
    excerpt: 'Essential safety tips for solo travelers to ensure a secure and enjoyable journey.',
    content: 'Solo travel is becoming increasingly popular, but safety remains a primary concern. Here are key strategies to stay safe while exploring on your own:\n\nResearch your destination before arriving, including safe and unsafe areas. Share your itinerary with trusted friends or family. Keep digital and physical copies of important documents. Use hotel safes for passports and extra cash. Stay connected with local SIM cards or portable WiFi. Trust your instincts and remove yourself from uncomfortable situations. Avoid sharing your solo status with strangers.',
    image: '/img/news/How to Stay Safe While Traveling Alone.png',
    date: 'Oct 28, 2024',
    readTime: '7 min read',
    category: 'Safety',
    author: 'Safe Travels',
    tags: ['Safety', 'Solo Travel', 'Tips']
  },
  {
    id: 5,
    title: 'The Rise of Sustainable Tourism',
    excerpt: 'Understanding how eco-conscious travel is reshaping the tourism industry and what it means for travelers.',
    content: 'Sustainable tourism has moved from a niche concept to a mainstream expectation as travelers become more environmentally and socially conscious. This shift is driving changes in the industry as destinations and businesses adapt to meet these demands.\n\nKey trends include the rise of eco-lodges, carbon offset programs, community-based tourism initiatives, and the growing popularity of slow travel. Travelers are choosing accommodations with green certifications, supporting local businesses, and opting for experiences that have minimal environmental impact while providing meaningful engagement with local communities.',
    image: '/img/news/The Rise of Sustainable Tourism.png',
    date: 'Oct 22, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Green Travel',
    tags: ['Sustainability', 'Eco-travel', 'Future of Travel']
  },
  {
    id: 6,
    title: 'Cultural Etiquette Around the World',
    excerpt: 'Navigate different cultural norms and customs with respect and awareness in various countries.',
    content: 'Understanding and respecting local customs is essential for meaningful travel experiences. Cultural norms vary dramatically across the globe, and what\'s acceptable in one country might be offensive in another.\n\nIn Japan, it\'s polite to avoid eating while walking and to bow when greeting people. In many Middle Eastern countries, showing the soles of your feet is considered disrespectful. In Thailand, never touch someone\'s head. In Germany, punctuality is highly valued. Research these customs before traveling to show respect and enhance your experience.',
    image: '/img/news/Cultural Etiquette Around the World.png',
    date: 'Oct 18, 2024',
    readTime: '8 min read',
    category: 'Culture',
    author: 'Global Insights',
    tags: ['Culture', 'Etiquette', 'Respect']
  },
  {
    id: 7,
    title: 'The Best Travel Photography Techniques',
    excerpt: 'Tips and tricks to capture stunning travel photos that tell a story.',
    content: 'Travel photography is about capturing the essence of a place, not just taking pictures of famous landmarks. The best travel photos tell a story and evoke emotions.\n\nFocus on the human element - portraits of locals, people going about their daily lives, and cultural interactions. Use the golden hours (sunrise and sunset) for the best lighting. Don\'t forget to put the camera away sometimes and just experience the moment. Include details like textures, colors, and patterns that are unique to the destination. Always ask for permission when photographing people.',
    image: '/img/news/The Best Travel Photography Techniques.png',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    category: 'Tips',
    author: 'Photo Adventures',
    tags: ['Photography', 'Tips', 'Techniques']
  },
  {
    id: 8,
    title: 'Off-the-Beaten-Path Destinations in Southeast Asia',
    excerpt: 'Hidden gems that offer authentic experiences away from mass tourism.',
    content: 'While Thailand and Vietnam continue to attract millions of visitors, Southeast Asia has many lesser-known destinations waiting to be explored. These hidden gems offer authentic experiences without the crowds.\n\nPlaces like the Cardamom Mountains in Cambodia, the islands of Alor in Indonesia, and the mountain town of Kalaw in Myanmar provide unique experiences. These destinations offer opportunities to interact with local communities, experience traditional ways of life, and enjoy natural beauty without the commercialization found in more popular areas.',
    image: '/img/news/Off-the-Beaten-Path Destinations in Southeast Asia.png',
    date: 'Oct 10, 2024',
    readTime: '7 min read',
    category: 'Destinations',
    author: 'Hidden Horizons',
    tags: ['Southeast Asia', 'Hidden Gems', 'Adventure']
  },
  {
    id: 9,
    title: 'Digital Nomad Visa Guide 2024',
    excerpt: 'Countries offering the best opportunities for remote workers.',
    content: 'The rise of remote work has led to an increase in digital nomad visas worldwide. Countries are recognizing the economic benefits of attracting location-independent workers.\n\nPopular destinations include Estonia\'s digital nomad visa, Portugal\'s D7 visa, Mexico\'s temporary resident visa for remote workers, and more recently, Costa Rica\'s remote worker visa. Each program has different requirements and benefits, so research thoroughly before applying. Consider tax implications and how these programs affect your home country\'s tax obligations.',
    image: '/img/news/Digital Nomad Visa Guide 2024.png',
    date: 'Oct 5, 2024',
    readTime: '8 min read',
    category: 'Tips',
    author: 'Remote Work Abroad',
    tags: ['Digital Nomad', 'Visas', 'Remote Work']
  },
];

interface SearchResult {
  id: number;
  title: string;
  category: string;
  path: string;
  description?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return new Response(
        JSON.stringify({
          results: [],
          message: 'No search query provided',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create search results from all data sources
    const allSearchResults: SearchResult[] = [
      // Destinations
      ...destinations.map(dest => ({
        id: dest.id,
        title: dest.name,
        category: 'destination',
        path: `/destinations/${dest.id}`,
        description: dest.description
      })),
      
      // Shop items
      ...shopItems.map(item => ({
        id: item.id,
        title: item.name,
        category: 'product',
        path: `/shop`,
        description: item.description
      })),
      
      // Travel books
      ...travelBooks.map(book => ({
        id: book.id,
        title: book.title,
        category: 'book',
        path: `/books`,
        description: book.description
      })),
      
      // News articles
      ...newsArticles.map(article => ({
        id: article.id,
        title: article.title,
        category: 'article',
        path: `/news/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`,
        description: article.excerpt
      }))
    ];

    // Filter results based on the search query
    const results = allSearchResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
    );

    return new Response(
      JSON.stringify({
        results: results,
        query: query,
        total: results.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Search API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}