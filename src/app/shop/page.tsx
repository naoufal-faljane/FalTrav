'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePageViewTracker } from '@/lib/analytics';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Camera, CameraIcon, Package } from 'lucide-react';

// Mock data for travel shop items
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

export default function ShopPage() {
  usePageViewTracker();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Bags', 'Cameras', 'Outfits', 'Gadgets'];

  const filteredItems = selectedCategory === 'All'
    ? shopItems
    : shopItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Travel Accessories Store</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Essential gear and accessories for your next adventure. Quality products at great prices.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-colors text-sm ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-input hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => {
                setSelectedCategory(category);
                trackEvent('filter_applied', 'shop', category, 0);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Shop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-40 sm:h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />

                  {item.originalPrice && (
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>
                <CardContent 
                  className="p-3 sm:p-4 flex flex-col flex-grow" 
                  onMouseEnter={() => trackEvent('hover_item', 'shop', item.name, item.price)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold line-clamp-1 text-sm sm:text-base">{item.name}</h3>
                    <span className="text-base sm:text-lg font-bold text-primary">${item.price}</span>
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm mb-2">
                    <span className="line-clamp-1">{item.description}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">({item.reviews})</span>
                  </div>

                  <div className="mt-auto pt-2">
                    {item.originalPrice && (
                      <div className="mb-2">
                        <span className="text-muted-foreground text-xs sm:text-sm line-through">${item.originalPrice}</span>
                      </div>
                    )}
                    <Button 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => {
                        trackAddToCart(item.name, item.category, item.price);
                        trackEvent('click_add_to_cart', 'shop', item.name, item.price);
                        if (item.affiliateLink) window.open(item.affiliateLink, '_blank');
                      }}
                    >
                      <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      {item.affiliateLink ? 'Buy on Amazon' : 'Add to Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-medium">No products found</h3>
          </div>
        )}


      </Container>
    </div>
  );
}
