'use client';

import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Star, MapPin } from 'lucide-react';

// Mock data for travel deals
const travelDeals = [
  {
    id: 1,
    title: 'Bali Paradise Escape',
    description: '7 days in luxury resorts with breakfast included',
    originalPrice: '$1299',
    newPrice: '$799',
    discount: '38% OFF',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    location: 'Bali, Indonesia',
  },
  {
    id: 2,
    title: 'European Adventure',
    description: '10 days tour covering 5 countries with guided experiences',
    originalPrice: '$2199',
    newPrice: '$1499',
    discount: '32% OFF',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    location: 'Europe',
  },
  {
    id: 3,
    title: 'Japanese Cultural Journey',
    description: '12 days immersing in tradition and modernity',
    originalPrice: '$2499',
    newPrice: '$1799',
    discount: '28% OFF',
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    location: 'Japan',
  },
  {
    id: 4,
    title: 'Caribbean Beach Getaway',
    description: 'All-inclusive resort stay with water sports',
    originalPrice: '$1899',
    newPrice: '$1199',
    discount: '37% OFF',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    location: 'Caribbean',
  },
  {
    id: 5,
    title: 'New York City Experience',
    description: '5 days exploring the city that never sleeps',
    originalPrice: '$1199',
    newPrice: '$799',
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    location: 'New York, USA',
  },
  {
    id: 6,
    title: 'Safari Adventure in Kenya',
    description: 'Wildlife exploration in Maasai Mara',
    originalPrice: '$2799',
    newPrice: '$1999',
    discount: '29% OFF',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    location: 'Kenya',
  },
];

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Exclusive Travel Deals</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Discover our best offers on flights, hotels, and vacation packages. Save more on your next adventure!
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['All', 'Beach', 'Mountain', 'City', 'Tropical', 'Adventure'].map((category, index) => (
            <Button key={index} variant="outline" className="rounded-full px-3 sm:px-4 text-sm">
              {category}
            </Button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {travelDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group relative">
                <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-destructive text-destructive-foreground text-xs sm:text-sm">
                  {deal.discount}
                </Badge>
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-1 text-white mb-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                      <span className="text-xs sm:text-sm">{deal.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1 text-white">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">{deal.location}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-bold text-base sm:text-lg mb-1">{deal.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3">{deal.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg sm:text-2xl font-bold text-primary">{deal.newPrice}</span>
                      <span className="text-muted-foreground line-through ml-2 text-xs sm:text-sm">{deal.originalPrice}</span>
                    </div>
                    <Button size="sm" className="text-xs sm:text-sm">View Deal</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" className="text-sm sm:text-base">Load More Deals</Button>
        </div>
      </Container>
    </div>
  );
}