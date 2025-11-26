'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Share, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the Article interface
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

// All articles data
const allArticles: Article[] = [
  {
    id: 1,
    title: 'Top 10 Destinations to Visit in 2024',
    excerpt: 'Discover the most sought-after travel destinations for the upcoming year based on trends and expert predictions.',
    content: `The travel landscape continues to evolve as we move into 2024, with new destinations emerging and traditional favorites adapting to changing traveler preferences. This year, we're seeing a shift towards more sustainable and off-the-beaten-path locations as travelers seek meaningful experiences over Instagram-worthy photos.\n\nLeading the list are destinations like Madagascar with its unique biodiversity, Bhutan with its commitment to sustainable tourism, and the Faroe Islands offering dramatic landscapes with their dramatic landscapes. European favorites like Portugal and Greece continue to attract visitors, but with a focus on lesser-known regions away from overcrowded hotspots.\n\nKey trends for 2024 include:\n\n• Community-based tourism: Engaging with local communities and contributing directly to local economies\n• Wellness retreats: Travelers seeking mental and physical restoration\n• Slow travel: Extended stays in fewer locations to create deeper connections\n• Digital detox trips: Vacations that prioritize disconnecting from technology\n• Adventure travel for older adults: Growing interest in active experiences among retirees\n\nTravelers are also paying more attention to the environmental impact of their journeys, with many choosing destinations reachable by train or other low-emission transport where possible.`,
    image: '/img/news/Top 10 Destinations to Visit in 2024.png',
    date: 'Nov 15, 2024',
    readTime: '5 min read',
    category: 'Trends',
    author: 'Travel Experts',
    tags: ['Destinations', '2024', 'Travel Tips', 'Trends', 'Sustainable Tourism']
  },
  {
    id: 2,
    title: 'Essential Packing Tips for International Travel',
    excerpt: 'Learn how to pack efficiently for your international adventures without overloading your luggage.',
    content: `Packing for international travel can seem overwhelming, but with the right strategies, you can maximize your space while ensuring you have everything you need. Here are some essential tips:\n\n1. Roll your clothes instead of folding them - this saves up to 50% more space\n2. Pack versatile items that can be mixed and matched\n3. Wear your heaviest items on the plane\n4. Use packing cubes to stay organized\n5. Limit shoes to 2-3 pairs maximum\n6. Check the weather forecast and pack accordingly\n7. Remember that you can often buy items at your destination\n\nBeyond the basics, consider these advanced packing strategies:\n\n• Research your destination's laundry facilities, so you can pack lighter\n• Bring a compact travel towel that dries quickly\n• Use travel-sized containers for liquids that meet international standards\n• Pack a portable charger for long flights\n• Carry a small day bag for sightseeing\n\nRemember that many countries have dry cleaners and laundromats, so you don't need to pack for every eventuality. Focus on a capsule wardrobe of high-quality, versatile pieces that can be dressed up or down depending on the occasion.`,
    image: '/img/news/Essential Packing Tips for International Travel.png',
    date: 'Nov 10, 2024',
    readTime: '4 min read',
    category: 'Tips',
    author: 'Adventure Pack',
    tags: ['Packing', 'Tips', 'Travel', 'Travel Hacks', 'International Travel']
  },
  {
    id: 3,
    title: 'Budget-Friendly European Cities for Winter',
    excerpt: 'Explore European cities that offer beauty and culture without breaking the bank during the winter months.',
    content: `Winter in Europe doesn't have to mean expensive skiing resorts or crowded holiday markets. There are several cities that offer incredible experiences at affordable prices during the colder months.\n\nPrague remains one of the most affordable European capitals, with excellent architecture, cozy cafés, and winter markets at reasonable prices. Budapest offers thermal baths and beautiful views of the Danube without the high prices of Western European cities. Additionally, cities like Krakow, Ljubljana, and Tallinn provide rich cultural experiences without draining your wallet.\n\nBudget travel strategies for winter include:\n\n• Off-season discounts: Accommodation and attractions are cheaper in winter\n• Warm clothing: Buy quality winter gear before traveling to avoid higher prices abroad\n• Indoor activities: Museums and galleries offer warm retreats during cold days\n• Local cuisine: Enjoy hearty winter comfort foods that are often reasonably priced\n\nEastern European cities like Riga, Vilnius, and Sofia offer rich history and culture at significantly lower costs than their Western counterparts. Many Eastern European countries use the local currency rather than Euro, which can provide additional savings for travelers from Eurozone countries.`,
    image: '/img/news/Budget-Friendly European Cities for Winter.png',
    date: 'Nov 5, 2024',
    readTime: '6 min read',
    category: 'Destinations',
    author: 'Wanderlust Weekly',
    tags: ['Europe', 'Budget', 'Winter', 'Travel', 'Affordable Travel']
  },
  {
    id: 4,
    title: 'How to Stay Safe While Traveling Alone',
    excerpt: 'Essential safety tips for solo travelers to ensure a secure and enjoyable journey.',
    content: `Solo travel is becoming increasingly popular, but safety remains a primary concern. Here are key strategies to stay safe while exploring on your own:\n\nResearch your destination before arriving, including safe and unsafe areas. Share your itinerary with trusted friends or family. Keep digital and physical copies of important documents. Use hotel safes for passports and extra cash. Stay connected with local SIM cards or portable WiFi. Trust your instincts and remove yourself from uncomfortable situations. Avoid sharing your solo status with strangers.\n\nAdditional safety tips for solo travelers:\n\n• Book accommodation in safe neighborhoods with good reviews\n• Inform hotel staff of your travel plans\n• Avoid risky situations after dark\n• Stay sober enough to maintain awareness of surroundings\n• Keep emergency contacts stored in multiple locations\n• Know location of nearest embassy or consulate\n\nFor female solo travelers specifically, consider joining women-only travel groups initially to gain confidence. Choose accommodations with good security, and dress appropriately for the local culture. When dining alone, sit where you can see the entrance and avoid isolated tables.`,
    image: '/img/news/How to Stay Safe While Traveling Alone.png',
    date: 'Oct 28, 2024',
    readTime: '7 min read',
    category: 'Safety',
    author: 'Safe Travels',
    tags: ['Safety', 'Solo Travel', 'Tips', 'Women Travel', 'Travel Security']
  },
  {
    id: 5,
    title: 'The Rise of Sustainable Tourism',
    excerpt: 'Understanding how eco-conscious travel is reshaping the tourism industry and what it means for travelers.',
    content: `Sustainable tourism has moved from a niche concept to a mainstream expectation as travelers become more environmentally and socially conscious. This shift is driving changes in the industry as destinations and businesses adapt to meet these demands.\n\nKey trends include the rise of eco-lodges, carbon offset programs, community-based tourism initiatives, and the growing popularity of slow travel. Travelers are choosing accommodations with green certifications, supporting local businesses, and opting for experiences that have minimal environmental impact while providing meaningful engagement with local communities.\n\nWays to practice sustainable tourism:\n\n• Choose accommodations with recognized eco-certifications\n• Support local artisans and businesses\n• Use public transport, bikes, or walk instead of private transfers\n• Respect local customs and traditions\n• Leave no trace: Follow LNT principles\n• Conserve resources: Use towels and linens longer\n\nMany destinations are now implementing visitor caps to protect fragile ecosystems. Popular locations like Maya Bay in Thailand or Machu Picchu in Peru have introduced timed entry systems to preserve these sites for future generations while maintaining their appeal to visitors.`,
    image: '/img/news/The Rise of Sustainable Tourism.png',
    date: 'Oct 22, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Green Travel',
    tags: ['Sustainability', 'Eco-travel', 'Future of Travel', 'Environmental Impact', 'Responsible Tourism']
  },
  {
    id: 6,
    title: 'Cultural Etiquette Around the World',
    excerpt: 'Navigate different cultural norms and customs with respect and awareness in various countries.',
    content: `Understanding and respecting local customs is essential for meaningful travel experiences. Cultural norms vary dramatically across the globe, and what's acceptable in one country might be offensive in another.\n\nIn Japan, it's polite to avoid eating while walking and to bow when greeting people. In many Middle Eastern countries, showing the soles of your feet is considered disrespectful. In Thailand, never touch someone's head. In Germany, punctuality is highly valued. Research these customs before traveling to show respect and enhance your experience.\n\nCommon etiquette concerns by region:\n\nAsia: Remove shoes before entering homes and some businesses; avoid public displays of affection\nMiddle East: Dress conservatively; avoid alcohol and pork where forbidden\nEurope: Tipping varies widely; research local customs\nNorth America: Generous tipping culture; friendly small talk expected\nAfrica: Modest dress recommended; respect elders and traditional authorities\n\nBeing culturally sensitive enhances your travel experience and builds positive relationships with locals. Even if you make mistakes, showing effort and respect is usually appreciated. Learning a few words in the local language demonstrates respect for the culture.`,
    image: '/img/news/Cultural Etiquette Around the World.png',
    date: 'Oct 18, 2024',
    readTime: '8 min read',
    category: 'Culture',
    author: 'Global Insights',
    tags: ['Culture', 'Etiquette', 'Respect', 'International Travel', 'Cultural Awareness']
  },
  {
    id: 7,
    title: 'The Best Travel Photography Techniques',
    excerpt: 'Tips and tricks to capture stunning travel photos that tell a story.',
    content: `Travel photography is about capturing the essence of a place, not just taking pictures of famous landmarks. The best travel photos tell a story and evoke emotions.\n\nFocus on the human element - portraits of locals, people going about their daily lives, and cultural interactions. Use the golden hours (sunrise and sunset) for the best lighting. Don't forget to put the camera away sometimes and just experience the moment. Include details like textures, colors, and patterns that are unique to the destination. Always ask for permission when photographing people.\n\nAdvanced techniques for better travel photos:\n\n• Rule of thirds: Place subjects off-center for more dynamic compositions\n• Leading lines: Use roads, rivers, or structures to draw viewers into the scene\n• Depth: Include foreground, middle ground, and background elements\n• Frame within frame: Use windows, archways, or trees to create depth\n• Golden hour: Shoot during the first/last hour of sunlight\n\nConsider investing in a good tripod for long exposures, and a polarizing filter to reduce reflections and enhance colors. Remember that the best camera is the one you have with you - smartphone cameras have become incredibly capable for travel photography.`,
    image: '/img/news/The Best Travel Photography Techniques.png',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    category: 'Tips',
    author: 'Photo Adventures',
    tags: ['Photography', 'Tips', 'Techniques', 'Travel Photography', 'Visual Storytelling']
  },
  {
    id: 8,
    title: 'Off-the-Beaten-Path Destinations in Southeast Asia',
    excerpt: 'Hidden gems that offer authentic experiences away from mass tourism.',
    content: `While Thailand and Vietnam continue to attract millions of visitors, Southeast Asia has many lesser-known destinations waiting to be explored. These hidden gems offer authentic experiences without the crowds.\n\nPlaces like the Cardamom Mountains in Cambodia, the islands of Alor in Indonesia, and the mountain town of Kalaw in Myanmar provide unique experiences. These destinations offer opportunities to interact with local communities, experience traditional ways of life, and enjoy natural beauty without the commercialization found in more popular areas.\n\nEmerging destinations to consider:\n\n• Bagan, Myanmar: Ancient temple complex with thousands of pagodas\n• Sumba, Indonesia: Unique culture and pristine beaches\n• Siem Pang, Cambodia: Remote forests and wildlife sanctuary\n• Con Dao Islands, Vietnam: Untouched beaches and historical sites\n• Bintan Island, Indonesia: Traditional culture and eco-resorts\n\nWhen visiting off-the-beaten-path destinations, prepare for basic facilities and limited transportation options. Bring necessary medications and plan routes carefully. These locations often provide more authentic experiences but require more preparation and flexibility.`,
    image: '/img/news/Off-the-Beaten-Path Destinations in Southeast Asia.png',
    date: 'Oct 10, 2024',
    readTime: '7 min read',
    category: 'Destinations',
    author: 'Hidden Horizons',
    tags: ['Southeast Asia', 'Hidden Gems', 'Adventure', 'Authentic Travel', 'Remote Destinations']
  },
  {
    id: 9,
    title: 'Digital Nomad Visa Guide 2024',
    excerpt: 'Countries offering the best opportunities for remote workers.',
    content: `The rise of remote work has led to an increase in digital nomad visas worldwide. Countries are recognizing the economic benefits of attracting location-independent workers.\n\nPopular destinations include Estonia's digital nomad visa, Portugal's D7 visa, Mexico's temporary resident visa for remote workers, and more recently, Costa Rica's remote worker visa. Each program has different requirements and benefits, so research thoroughly before applying. Consider tax implications and how these programs affect your home country's tax obligations.\n\nRequirements typically include:\n\n• Proof of income (usually minimum $2,000-4,000 monthly)\n• Clean criminal background check\n• Health insurance coverage\n• Valid passport and other documentation\n• Application fees ($200-500 on average)\n\nBenefits of digital nomad visas:\n• Legal residence status\n• Tax advantages\n• Ability to open local bank accounts\n• Access to local services\n• Potential pathway to permanent residency\n\nRemember to consult with tax professionals about maintaining ties to your home country while living abroad. Some countries have strict rules about tax obligations regardless of where you live or work.`,
    image: '/img/news/Digital Nomad Visa Guide 2024.png',
    date: 'Oct 5, 2024',
    readTime: '8 min read',
    category: 'Tips',
    author: 'Remote Work Abroad',
    tags: ['Digital Nomad', 'Visas', 'Remote Work', 'Workation', 'Legal Residence']
  },
];

export default function ArticlePage() {
  const pathname = usePathname();
  const slug = decodeURIComponent(pathname.split('/').pop() || '');
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    // Find the article that matches the slug (using the title)
    const foundArticle = allArticles.find(item => 
      item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug.toLowerCase()
    );
    setArticle(foundArticle);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
            <Link href="/news" className="text-primary hover:underline mt-4 inline-block">
              Back to News
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{article.author}</span>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border bg-accent text-accent-foreground hover:bg-accent/80">
                <Bookmark className="h-4 w-4" />
                Save
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border bg-accent text-accent-foreground hover:bg-accent/80">
                <Share className="h-4 w-4" />
                Share
              </button>
            </div>
          </header>

          {/* Article Image */}
          <div className="relative h-64 sm:h-96 mb-8 overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-xl text-muted-foreground mb-6 leading-relaxed" : "mb-4"}>
                {paragraph.startsWith('•') || paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.') || paragraph.startsWith('6.') || paragraph.startsWith('7.') || paragraph.startsWith('8.') || paragraph.startsWith('9.')
                  ? renderList(paragraph)
                  : paragraph}
              </p>
            ))}
          </div>

          {/* Related Articles Section */}
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allArticles
                .filter(item => item.id !== article.id)
                .slice(0, 3)
                .map((relatedItem, index) => (
                  <Link key={relatedItem.id} href={`/news/${encodeURIComponent(relatedItem.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`}>
                    <Card className="overflow-hidden group h-full cursor-pointer hover:shadow-md transition-shadow">
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={relatedItem.image}
                          alt={relatedItem.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-base line-clamp-2 mb-2">{relatedItem.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{relatedItem.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}

// Helper function to render lists
function renderList(paragraph: string) {
  const lines = paragraph.split('\n');
  const isOrdered = lines[0].startsWith('1.');
  
  return (
    <div className="ml-4 my-4">
      {isOrdered ? (
        <ol className="list-decimal list-inside space-y-2">
          {lines.map((line, idx) => (
            line.trim() && (
              <li key={idx} className="marker:text-primary">
                {line.replace(/^\d+\.\s*/, '').trim()}
              </li>
            )
          ))}
        </ol>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {lines.map((line, idx) => (
            line.trim() && (
              <li key={idx} className="marker:text-primary">
                {line.replace(/^•\s*/, '').trim()}
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
}