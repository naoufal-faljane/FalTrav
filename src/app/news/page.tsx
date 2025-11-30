'use client';
import AdPlacement from '@/components/ads/AdPlacement';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdContext } from '@/contexts/AdContext';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Search } from 'lucide-react';
import Link from 'next/link';

// Mock data for news articles
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

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tips', 'Destinations', 'Trends', 'Safety', 'Culture', 'Sustainability'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Travel Blog & News Feed</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Stay updated with the latest travel news, trends, and expert tips for your journeys.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-8 sm:mb-10">
          <div className="relative max-w-md sm:max-w-xl mx-auto mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-input bg-background text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors text-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-input hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Smartlink Ad */}
        <div className="mb-8 sm:mb-10">
          <div className="max-w-3xl mx-auto">
            <AdPlacement position="news-top" type="smartlink" />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/news/${encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`}>
                  <Card className="overflow-hidden group h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs sm:text-sm">{article.category}</Badge>
                        <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-border/30">
                        <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-3 gap-2">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-medium">No articles found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>


      </Container>
    </div>
  );
}
