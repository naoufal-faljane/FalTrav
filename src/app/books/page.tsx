'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Users, ShoppingCart, Globe, Mountain, Camera } from 'lucide-react';

// Mock data for travel books and guides
const travelBooks = [
  {
    id: 1,
    title: 'Lonely Planet Japan',
    author: 'Lonely Planet',
    description: 'The most comprehensive travel guide to Japan with detailed maps and insider tips.',
    price: 24.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 324,
    category: 'Destinations',
    tags: ['Japan', 'Culture', 'Guidebook']
  },
  {
    id: 2,
    title: 'Rick Steves Europe Through the Back Door',
    author: 'Rick Steves',
    description: 'The ultimate guide to exploring Europe like a local with practical advice.',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 512,
    category: 'Europe',
    tags: ['Europe', 'Budget', 'Culture']
  },
  {
    id: 3,
    title: 'The Art of Travel',
    author: 'Alain de Botton',
    description: 'A philosophical exploration of why we travel and how it changes us.',
    price: 16.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 187,
    category: 'Inspiration',
    tags: ['Philosophy', 'Travel', 'Personal Growth']
  },
  {
    id: 4,
    title: 'Epic Bike Rides of the World',
    author: 'Lonely Planet',
    description: '25 incredible cycling adventures across all continents.',
    price: 29.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 142,
    category: 'Adventure',
    tags: ['Cycling', 'Adventure', 'Outdoors']
  },
  {
    id: 5,
    title: 'Fodor\'s Essential Thailand',
    author: 'Fodor\'s Travel',
    description: 'Complete guide to Thailand\'s beaches, temples, and cultural experiences.',
    price: 21.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 276,
    category: 'Destinations',
    tags: ['Thailand', 'Culture', 'Guidebook']
  },
  {
    id: 6,
    title: 'The Travel Book: A Journey Through Every Country',
    author: 'Lonely Planet',
    description: 'A visual guide to every country in the world with essential information.',
    price: 39.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 432,
    category: 'World',
    tags: ['World', 'Atlas', 'Cultural']
  },
  {
    id: 7,
    title: 'Wilderness Navigation Handbook',
    author: 'Bob Burns',
    description: 'Essential navigation skills for outdoor adventures and remote travel.',
    price: 34.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 256,
    category: 'Adventure',
    tags: ['Navigation', 'Hiking', 'Safety']
  },
  {
    id: 8,
    title: 'Culture Shock: Thailand',
    author: 'Carol E. Bell',
    description: 'Understanding and adapting to Thai culture and customs.',
    price: 14.99,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviews: 98,
    category: 'Culture',
    tags: ['Thailand', 'Culture', 'Etiquette']
  },
  {
    id: 9,
    title: 'National Geographic Traveler: Spain',
    author: 'National Geographic',
    description: 'Beautiful photography and detailed insights into Spain\'s diverse regions.',
    price: 27.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 176,
    category: 'Destinations',
    tags: ['Spain', 'Photography', 'Culture']
  },
  {
    id: 10,
    title: 'The Art of Travel Photography',
    author: 'Darren White',
    description: 'Techniques and inspiration for capturing stunning travel photos.',
    price: 32.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 213,
    category: 'Photography',
    tags: ['Photography', 'Travel', 'Techniques']
  },
  {
    id: 11,
    title: 'Lonely Planet\'s Ultimate Travel List',
    author: 'Lonely Planet',
    description: 'The world\'s 500 most amazing experiences for travelers.',
    price: 22.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 387,
    category: 'World',
    tags: ['Destinations', 'Bucket List', 'Travel']
  },
  {
    id: 12,
    title: 'Cultures and Customs of Indonesia',
    author: 'Kathleen E. Morrison',
    description: 'Deep dive into the diverse cultures of the Indonesian archipelago.',
    price: 35.99,
    originalPrice: 42.99,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 84,
    category: 'Culture',
    tags: ['Indonesia', 'Culture', 'Anthropology']
  },
];

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Destinations', 'Europe', 'Asia', 'Adventure', 'Inspiration', 'Culture', 'Photography', 'World'];

  const filteredBooks = selectedCategory === 'All'
    ? travelBooks
    : travelBooks.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Travel Books & Cultural Guides</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Discover the best travel books and guides to inspire and prepare for your journeys.
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

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group flex flex-col h-full">
                  <div className="flex p-3 sm:p-4 border-b">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded mr-3 sm:mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2">by {book.author}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">({book.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">{book.description}</p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {book.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-[10px] sm:text-xs bg-muted px-1.5 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-base sm:text-lg font-bold text-primary">${book.price}</span>
                          {book.originalPrice && (
                            <span className="text-muted-foreground text-xs sm:text-sm line-through ml-2">${book.originalPrice}</span>
                          )}
                        </div>
                        <Button size="sm" className="text-xs sm:text-sm">
                          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-medium">No books found</h3>
              <p className="text-muted-foreground mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base">
            Load More Books
          </button>
        </div>
      </Container>
    </div>
  );
}