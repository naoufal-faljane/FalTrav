'use client';
import AdPlacement from '@/components/ads/AdPlacement';
import { useState } from 'react';
import { useAdContext } from '@/contexts/AdContext';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { travelBooks } from '@/data/travelBooks';
import { usePageViewTracker } from '@/lib/analytics';

export default function BooksPage() {
  usePageViewTracker();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(travelBooks.map(book => book.category))];

  const filteredBooks = travelBooks.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Travel Books & Guides</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto">
            Discover the world through our curated collection of travel books and guides.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-8 sm:mb-10">
          <div className="relative max-w-md sm:max-w-xl mx-auto mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-input bg-background text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
        </div>

        {/* Smartlink Ad */}
        <div className="mb-8 sm:mb-10">
          <div className="max-w-3xl mx-auto">
            <AdPlacement position="books-top" type="smartlink" />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Link href={`/books/${encodeURIComponent(book.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`} key={index}>
                <Card className="overflow-hidden group h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-600 ml-1">({book.reviews})</span>
                    </div>
                    
                    <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">
                      {book.description}
                    </p>
                    
                    <div className="mt-auto pt-2 border-t border-border/30">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs sm:text-sm">
                          {book.category}
                        </Badge>
                        {book.originalPrice && (
                          <div className="text-right">
                            <span className="text-xs sm:text-sm font-medium line-through text-muted-foreground mr-1">
                              ${book.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-primary">${book.price.toFixed(2)}</span>
                          </div>
                        )}
                        {!book.originalPrice && (
                          <span className="text-sm sm:text-base font-bold text-primary">${book.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-medium">No books found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
