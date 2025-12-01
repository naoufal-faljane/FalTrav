'use client';
import AdsterraAd from '@/components/AdsterraAd';


import AdPlacement from '@/components/ads/AdPlacement';
import { motion } from 'framer-motion';
import { usePageViewTracker } from '@/lib/analytics';
import { useAdContext } from '@/contexts/AdContext';
import Hero from '@/components/hero/Hero';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Map, Camera, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for featured destinations
const featuredDestinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with stunning beaches and rich culture',
    image: '/img/destinations/Bali, Indonesia.png',
    price: '$599',
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    description: 'Iconic white buildings and breathtaking sunsets',
    image: '/img/destinations/Santorini, Greece.png',
    price: '$899',
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    description: 'Ancient temples and beautiful cherry blossoms',
    image: '/img/destinations/Kyoto, Japan.png',
    price: '$1299',
  },
  {
    id: 4,
    name: 'Paris, France',
    description: 'City of lights with iconic landmarks and cuisine',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$799',
  },
];

// Mock data for quick links
const quickLinks = [
  { title: 'Find Flights', icon: Plane, path: '/flights' },
  { title: 'Book Hotels', icon: Map, path: '/hotels' },
  { title: 'Travel Photos', icon: Camera, path: '/travel-photos' },
  { title: 'Travel Guides', icon: BookOpen, path: '/travel-guides' },
];

export default function Home() {
  usePageViewTracker();

  return (
    <div>
      <Hero />

      {/* Quick Links Section */}
      <section className="py-12 bg-muted/20">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={link.path}>
                  <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                    <link.icon className="h-10 w-10 mx-auto text-primary mb-3" />
                    <h3 className="font-semibold text-sm sm:text-base">{link.title}</h3>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Featured Destinations</h2>
            <Button asChild variant="outline" className="mt-4">
              <a href="/destinations">View All</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mx-auto max-w-xs"
              >
                <Link href={`/destinations/${encodeURIComponent(destination.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-bold text-lg text-center">{destination.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm mb-2 text-center">{destination.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">{destination.price}</span>
                        <Button size="sm">Explore</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Ad placements for homepage */}
      <section className="py-6">
        <Container className="flex justify-center">
          <div className="w-full max-w-2xl">
            <AdPlacement position="homepage-top" type="banner" />
          </div>
        </Container>
      </section>

      {/* Smartlink Ad */}
      <section className="py-8">
        <Container className="flex justify-center">
          <div className="w-full max-w-2xl">
            <AdPlacement position="homepage-smartlink" type="smartlink" />
          </div>
        </Container>
      </section>

      {/* Rectangle ad after featured destinations */}
      <section className="py-6">
        <Container className="flex justify-center">
          <div className="w-full max-w-4xl">
            <AdPlacement position="homepage-middle" type="banner" />
          </div>
        </Container>
      </section>

<section className="py-6">
  <Container className="flex justify-center">
    <AdsterraAd
      keyId="a425a9ba84b0de190841de26b949448c"  // Banner 300x250
      width="300px"
      height="250px"
    />
  </Container>
</section>


      {/* Travel Tips */}
      <section className="py-16 bg-muted/20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Travel Tips & Inspiration</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                title: 'How to Stay Safe While Traveling Alone',
                description: 'Essential safety tips for solo travelers to ensure a secure and enjoyable journey.',
                image: '/img/news/How to Stay Safe While Traveling Alone.png'
              },
              { 
                title: 'Cultural Etiquette Around the World',
                description: 'Navigate different cultural norms and customs with respect and awareness in various countries.',
                image: '/img/news/Cultural Etiquette Around the World.png'
              },
              { 
                title: 'Off-the-Beaten-Path Destinations in Southeast Asia',
                description: 'Hidden gems that offer authentic experiences away from mass tourism.',
                image: '/img/news/Off-the-Beaten-Path Destinations in Southeast Asia.png'
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/news/${encodeURIComponent(tip.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={tip.image}
                        alt={tip.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-base sm:text-lg mb-2">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {tip.description}
                      </p>
                      <Button variant="outline" size="sm">Read More</Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
