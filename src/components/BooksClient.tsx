'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackViewItem, trackEvent } from '@/lib/analytics';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ChevronRight } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  content: string;
}

interface BooksClientProps {
  books: Book[];
}

export default function BooksClient({ books }: BooksClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const categories = ['All', 'Destinations', 'Europe', 'Asia', 'Adventure', 'Inspiration', 'Culture', 'Photography', 'World'];

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  // Track when a book is viewed
  const handleBookClick = (book: Book) => {
    trackViewItem(book.title, book.category, book.price);
    trackEvent('select_item', 'books', book.title, book.price);
    window.location.href = `/books/${book.id}`;
  };

  return (
    <div className="w-full">
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
              trackEvent('filter_applied', 'books', category, 0);
            }}
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
              <Card 
                className="overflow-hidden group flex flex-col h-full cursor-pointer" 
                onClick={() => handleBookClick(book)}
                onMouseEnter={() => trackEvent('hover_item', 'books', book.title, book.price)}
              >
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
                  <ChevronRight className="h-5 w-5 text-muted-foreground self-center" />
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
                        Free
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
    </div>
  );
}