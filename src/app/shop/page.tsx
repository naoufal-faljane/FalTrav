'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingCart, Camera, CameraIcon, Package } from 'lucide-react';

// Mock data for travel shop items
const shopItems = [
  // Bags
  {
    id: 1,
    name: 'Adventure Backpack',
    description: 'Durable 50L backpack with laptop compartment',
    price: 68.99,
    originalPrice: null,
    image: '/src/app/shop/img/product1.png',
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
    price: 199.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1491637639811-60e27cb27870?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 86,
    category: 'Bags',
    tags: ['Luggage', 'Business', 'Luxury']
  },
  {
    id: 3,
    name: 'Weekender Duffle',
    description: 'Perfect for weekend getaways',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 67,
    category: 'Bags',
    tags: ['Duffel', 'Weekend', 'Travel']
  },
  // Cameras
  {
    id: 4,
    name: 'Travel Action Camera',
    description: 'Waterproof camera for adventures',
    price: 149.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 98,
    category: 'Cameras',
    tags: ['Action', 'Waterproof', 'Adventure']
  },
  {
    id: 5,
    name: 'Mirrorless Camera',
    description: 'Compact high-quality travel camera',
    price: 899.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 154,
    category: 'Cameras',
    tags: ['Photography', 'Mirrorless', 'Travel']
  },
  {
    id: 6,
    name: '360° Travel Camera',
    description: 'Capture immersive spherical footage',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviews: 72,
    category: 'Cameras',
    tags: ['360°', 'VR', 'Video']
  },
  // Outfits
  {
    id: 7,
    name: 'Travel Clothing Set',
    description: 'Quick-dry, wrinkle-resistant travel clothes',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviews: 134,
    category: 'Outfits',
    tags: ['Clothing', 'Travel', 'Quick-dry']
  },
  {
    id: 8,
    name: 'Convertible Travel Pants',
    description: 'Pants that convert to shorts',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1593088777538-5db9f8a6a7a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 89,
    category: 'Outfits',
    tags: ['Pants', 'Convertible', 'Hiking']
  },
  {
    id: 9,
    name: 'Travel Rain Jacket',
    description: 'Lightweight, packable rain protection',
    price: 129.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 102,
    category: 'Outfits',
    tags: ['Jackets', 'Rain', 'Outdoor']
  },
  // Gadgets
  {
    id: 10,
    name: 'Portable Charger',
    description: '10000mAh power bank with fast charging',
    price: 34.99,
    originalPrice: 45.99,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 210,
    category: 'Gadgets',
    tags: ['Charger', 'Electronics', 'Travel']
  },
  {
    id: 11,
    name: 'Travel Adapter',
    description: 'Universal adapter for 150+ countries',
    price: 22.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1611233090834-177228b118e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 176,
    category: 'Gadgets',
    tags: ['Adapter', 'Electronics', 'Power']
  },
  {
    id: 12,
    name: 'Packing Cubes Set',
    description: 'Set of 6 compression cubes for organization',
    price: 32.99,
    originalPrice: 42.99,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b0e5f1ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 201,
    category: 'Gadgets',
    tags: ['Organization', 'Packing', 'Travel']
  },
];

export default function ShopPage() {
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
              onClick={() => setSelectedCategory(category)}
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
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-2 right-2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background text-xs"
                  >
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-muted-foreground" />
                  </Button>
                  {item.originalPrice && (
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
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
                      onClick={() => item.affiliateLink ? window.open(item.affiliateLink, '_blank') : null}
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
            <p className="text-muted-foreground mt-2">Try selecting a different category</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base">
            Load More Products
          </button>
        </div>
      </Container>
    </div>
  );
}