'use client';

import { useEffect, useState } from 'react';
import { usePageViewTracker } from '@/lib/analytics';
import { trackViewArticle } from '@/lib/enhanced-analytics';
import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { useAdContext } from '@/contexts/AdContext';

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
  excerpt: string;
}

function slugToTitle(slug: string): string {
  // Handle known article titles that have specific capitalization
  const knownTitles = [
    { slug: 'top-10-destinations-to-visit-in-2024', original: 'Top 10 Destinations to Visit in 2024' },
    { slug: 'essential-packing-tips-for-international-travel', original: 'Essential Packing Tips for International Travel' },
    { slug: 'budget-friendly-european-cities-for-winter', original: 'Budget-Friendly European Cities for Winter' },
    { slug: 'how-to-stay-safe-while-traveling-alone', original: 'How to Stay Safe While Traveling Alone' },
    { slug: 'the-rise-of-sustainable-tourism', original: 'The Rise of Sustainable Tourism' },
    { slug: 'cultural-etiquette-around-the-world', original: 'Cultural Etiquette Around the World' },
    { slug: 'the-best-travel-photography-techniques', original: 'The Best Travel Photography Techniques' },
    { slug: 'off-the-beaten-path-destinations-in-southeast-asia', original: 'Off-the-Beaten-Path Destinations in Southeast Asia' },
    { slug: 'digital-nomad-visa-guide-2024', original: 'Digital Nomad Visa Guide 2024' },
  ];

  // Check for known titles first
  for (const title of knownTitles) {
    if (slug === title.slug) {
      return title.original;
    }
  }

  // Fallback to general conversion for unknown titles
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Mock data for news articles
const newsArticles: Article[] = [
  {
    id: 1,
    title: 'Top 10 Destinations to Visit in 2024',
    content: 'The travel landscape continues to evolve as we move into 2024, with new destinations emerging and traditional favorites adapting to changing traveler preferences. This year, we\'re seeing a shift towards more sustainable and off-the-beaten-path locations as travelers seek meaningful experiences over Instagram-worthy photos.\n\nLeading the list are destinations like Madagascar with its unique biodiversity, Bhutan with its commitment to sustainable tourism, and the Faroe Islands offering dramatic landscapes with their dramatic landscapes. European favorites like Portugal and Greece continue to attract visitors, but with a focus on lesser-known regions away from overcrowded hotspots.',
    image: '/img/news/Top 10 Destinations to Visit in 2024.png',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    category: 'Trends',
    author: 'Travel Experts',
    tags: ['Destinations', '2024', 'Travel Tips'],
    excerpt: 'Discover the most sought-after travel destinations for the upcoming year based on trends and expert predictions.'
  },
  {
    id: 2,
    title: 'Essential Packing Tips for International Travel',
    content: 'Packing for international travel can seem overwhelming, but with the right strategies, you can maximize your space while ensuring you have everything you need. Here are some essential tips:\n\n1. Roll your clothes instead of folding them - this saves up to 50% more space\n2. Pack versatile items that can be mixed and matched\n3. Wear your heaviest items on the plane\n4. Use packing cubes to stay organized\n5. Limit shoes to 2-3 pairs maximum\n6. Check the weather forecast and pack accordingly\n7. Remember that you can often buy items at your destination',
    image: '/img/news/Essential Packing Tips for International Travel.png',
    date: 'Nov 10, 2024',
    readTime: '4 min read',
    category: 'Tips',
    author: 'Adventure Pack',
    tags: ['Packing', 'Tips', 'Travel'],
    excerpt: 'Learn how to pack efficiently for your international adventures without overloading your luggage.'
  },
  {
    id: 3,
    title: 'Budget-Friendly European Cities for Winter',
    content: 'Winter in Europe doesn\'t have to mean expensive skiing resorts or crowded holiday markets. There are several cities that offer incredible experiences at affordable prices during the colder months.\n\nPrague remains one of the most affordable European capitals, with excellent architecture, cozy cafés, and winter markets at reasonable prices. Budapest offers thermal baths and beautiful views of the Danube without the high prices of Western European cities. Additionally, cities like Krakow, Ljubljana, and Tallinn provide rich cultural experiences without draining your wallet.',
    image: '/img/news/Budget-Friendly European Cities for Winter.png',
    date: 'Nov 5, 2024',
    readTime: '6 min read',
    category: 'Destinations',
    author: 'Wanderlust Weekly',
    tags: ['Europe', 'Budget', 'Winter', 'Travel'],
    excerpt: 'Explore European cities that offer beauty and culture without breaking the bank during the winter months.'
  },
  {
    id: 4,
    title: 'How to Stay Safe While Traveling Alone',
    content: 'Solo travel is becoming increasingly popular, but safety remains a primary concern. Here are key strategies to stay safe while exploring on your own:\n\nResearch your destination before arriving, including safe and unsafe areas. Share your itinerary with trusted friends or family. Keep digital and physical copies of important documents. Use hotel safes for passports and extra cash. Stay connected with local SIM cards or portable WiFi. Trust your instincts and remove yourself from uncomfortable situations. Avoid sharing your solo status with strangers.',
    image: '/img/news/How to Stay Safe While Traveling Alone.png',
    date: 'Oct 28, 2024',
    readTime: '7 min read',
    category: 'Safety',
    author: 'Safe Travels',
    tags: ['Safety', 'Solo Travel', 'Tips'],
    excerpt: 'Essential safety tips for solo travelers to ensure a secure and enjoyable journey.'
  },
  {
    id: 5,
    title: 'The Rise of Sustainable Tourism',
    content: 'Sustainable tourism has moved from a niche concept to a mainstream expectation as travelers become more environmentally and socially conscious. This shift is driving changes in the industry as destinations and businesses adapt to meet these demands.\n\nKey trends include the rise of eco-lodges, carbon offset programs, community-based tourism initiatives, and the growing popularity of slow travel. Travelers are choosing accommodations with green certifications, supporting local businesses, and opting for experiences that have minimal environmental impact while providing meaningful engagement with local communities.',
    image: '/img/news/The Rise of Sustainable Tourism.png',
    date: 'Oct 22, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Green Travel',
    tags: ['Sustainability', 'Eco-travel', 'Future of Travel'],
    excerpt: 'Understanding how eco-conscious travel is reshaping the tourism industry and what it means for travelers.'
  },
  {
    id: 6,
    title: 'Cultural Etiquette Around the World',
    content: 'Understanding and respecting local customs is essential for meaningful travel experiences. Cultural norms vary dramatically across the globe, and what\'s acceptable in one country might be offensive in another.\n\nIn Japan, it\'s polite to avoid eating while walking and to bow when greeting people. In many Middle Eastern countries, showing the soles of your feet is considered disrespectful. In Thailand, never touch someone\'s head. In Germany, punctuality is highly valued. Research these customs before traveling to show respect and enhance your experience.',
    image: '/img/news/Cultural Etiquette Around the World.png',
    date: 'Oct 18, 2024',
    readTime: '8 min read',
    category: 'Culture',
    author: 'Global Insights',
    tags: ['Culture', 'Etiquette', 'Respect'],
    excerpt: 'Navigate different cultural norms and customs with respect and awareness in various countries.'
  },
  {
    id: 7,
    title: 'The Best Travel Photography Techniques',
    content: 'Travel photography is about capturing the essence of a place, not just taking pictures of famous landmarks. The best travel photos tell a story and evoke emotions.\n\nFocus on the human element - portraits of locals, people going about their daily lives, and cultural interactions. Use the golden hours (sunrise and sunset) for the best lighting. Don\'t forget to put the camera away sometimes and just experience the moment. Include details like textures, colors, and patterns that are unique to the destination. Always ask for permission when photographing people.',
    image: '/img/news/The Best Travel Photography Techniques.png',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    category: 'Tips',
    author: 'Photo Adventures',
    tags: ['Photography', 'Tips', 'Techniques'],
    excerpt: 'Tips and tricks to capture stunning travel photos that tell a story.'
  },
  {
    id: 8,
    title: 'Off-the-Beaten-Path Destinations in Southeast Asia',
    content: 'While Thailand and Vietnam continue to attract millions of visitors, Southeast Asia has many lesser-known destinations waiting to be explored. These hidden gems offer authentic experiences without the crowds.\n\nPlaces like the Cardamom Mountains in Cambodia, the islands of Alor in Indonesia, and the mountain town of Kalaw in Myanmar provide unique experiences. These destinations offer opportunities to interact with local communities, experience traditional ways of life, and enjoy natural beauty without the commercialization found in more popular areas.',
    image: '/img/news/Off-the-Beaten-Path Destinations in Southeast Asia.png',
    date: 'Oct 10, 2024',
    readTime: '7 min read',
    category: 'Destinations',
    author: 'Hidden Horizons',
    tags: ['Southeast Asia', 'Hidden Gems', 'Adventure'],
    excerpt: 'Hidden gems that offer authentic experiences away from mass tourism.'
  },
  {
    id: 9,
    title: 'Digital Nomad Visa Guide 2024',
    content: 'The rise of remote work has led to an increase in digital nomad visas worldwide. Countries are recognizing the economic benefits of attracting location-independent workers.\n\nPopular destinations include Estonia\'s digital nomad visa, Portugal\'s D7 visa, Mexico\'s temporary resident visa for remote workers, and more recently, Costa Rica\'s remote worker visa. Each program has different requirements and benefits, so research thoroughly before applying. Consider tax implications and how these programs affect your home country\'s tax obligations.',
    image: '/img/news/Digital Nomad Visa Guide 2024.png',
    date: 'Oct 5, 2024',
    readTime: '8 min read',
    category: 'Tips',
    author: 'Remote Work Abroad',
    tags: ['Digital Nomad', 'Visas', 'Remote Work'],
    excerpt: 'Countries offering the best opportunities for remote workers.'
  },
];

export default function NewsArticleClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { AdPlacement } = useAdContext();

  useEffect(() => {
    usePageViewTracker();

    const title = slugToTitle(slug);
    const foundArticle = newsArticles.find(a => a.title === title);
    setArticle(foundArticle || null);
    setLoading(false);

    // Track article view with location data if available
    if (foundArticle) {
      const userLocation = (window as any).userLocation;
      trackViewArticle(foundArticle.title, `news-${foundArticle.id}`, userLocation);
    }
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="flex items-center gap-2 text-primary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left h-4 w-4">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>Back to News</span>
          </Link>

          <article>
            {/* Ad placement before article content */}
            <div className="mb-6">
              <AdPlacement position="article-top" type="mobile" />
            </div>

            <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <h1 className="text-2xl sm:text-4xl font-bold">{article.title}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">{article.category}</Badge>
              {article.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none leading-relaxed">
              {/* Insert ad after first paragraph for longer articles */}
              {article.content.split('\n\n').map((paragraph: string, index: number) => {
                if (index === 1 && article.content.split('\n\n').length > 3) { // Show after first paragraph if article has more than 3 paragraphs
                  return (
                    <div key={index}>
                      <p className="mb-4">{paragraph}</p>
                      <div className="my-6">
                        <AdPlacement position="article-middle" type="rectangle" />
                      </div>
                    </div>
                  );
                }
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>

            {/* Ad placement at bottom of article */}
            <div className="mt-8">
              <AdPlacement position="article-bottom" type="smartlink" />
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}