'use client';
import AdsterraAd from '@/components/AdsterraAd';
import { motion } from 'framer-motion';
import { usePageViewTracker } from '@/lib/analytics';
import Hero from '@/components/hero/Hero';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Map, Camera, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data
const featuredDestinations = [
  { id: 1, name: 'Bali, Indonesia', description: 'Tropical paradise', image: '/img/destinations/Bali, Indonesia.png', price: '$599' },
  { id: 2, name: 'Santorini, Greece', description: 'Iconic sunsets', image: '/img/destinations/Santorini, Greece.png', price: '$899' },
  { id: 3, name: 'Kyoto, Japan', description: 'Ancient temples', image: '/img/destinations/Kyoto, Japan.png', price: '$1299' },
  { id: 4, name: 'Paris, France', description: 'City of lights', image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab', price: '$799' },
];

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

      {/* Quick Links */}
      <section className="py-12 bg-muted/20">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={link.path}>
                  <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                    <link.icon className="h-10 w-10 mx-auto text-primary mb-3" />
                    <h3 className="font-semibold text-sm sm:text-base">{link.title}</h3>
                  </Card>
                </Link>
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
              <Link href="/destinations">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {featuredDestinations.map((dest, index) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="mx-auto max-w-xs">
                <Link href={`/destinations/${encodeURIComponent(dest.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image src={dest.image} alt={dest.name} fill className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-bold text-lg text-center">{dest.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm mb-2 text-center">{dest.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">{dest.price}</span>
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

      {/* Adsterra Ads */}
      <section className="py-6">
        <Container className="flex justify-center">
          <AdsterraAd keyId="a425a9ba84b0de190841de26b949448c" width={300} height={250} />
        </Container>
      </section>
    </div>
  );
}
