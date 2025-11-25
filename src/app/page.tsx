'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/hero/Hero';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Map, Camera, BookOpen } from 'lucide-react';

// Mock data for featured destinations
const featuredDestinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with stunning beaches and rich culture',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$599',
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    description: 'Iconic white buildings and breathtaking sunsets',
    image: 'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$899',
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    description: 'Ancient temples and beautiful cherry blossoms',
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
  { title: 'Travel Photos', icon: Camera, path: '/photos' },
  { title: 'Travel Guides', icon: BookOpen, path: '/guides' },
];

export default function Home() {
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
            <Button variant="outline" className="mt-4">View All</Button>
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
                <Card className="overflow-hidden group">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
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
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-muted/20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Travel Tips & Inspiration</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Travel Tip Image</span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2">Essential Travel Tips for {index === 0 ? 'First-Time Travelers' : index === 1 ? 'Europe' : 'Southeast Asia'}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {index === 0
                        ? 'Learn the basics of planning your first international trip with these essential tips.'
                        : index === 1
                        ? 'Discover the best routes, countries to visit, and cultural nuances for your European adventure.'
                        : 'Explore Southeast Asia on a budget with these insider tips and recommendations.'}
                    </p>
                    <Button variant="outline" size="sm">Read More</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}