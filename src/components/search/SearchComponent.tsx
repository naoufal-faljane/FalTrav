'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mock search data
const mockSearchResults = [
  { id: 1, title: 'Bali, Indonesia', category: 'destination', path: '/destinations/bali' },
  { id: 2, title: 'Paris, France', category: 'destination', path: '/destinations/paris' },
  { id: 3, title: 'Kyoto, Japan', category: 'destination', path: '/destinations/kyoto' },
  { id: 4, title: 'Adventure Backpack', category: 'product', path: '/shop/backpack' },
  { id: 5, title: 'Travel Wallet', category: 'product', path: '/shop/wallet' },
  { id: 6, title: 'Lonely Planet Japan Guide', category: 'book', path: '/books/japan-guide' },
  { id: 7, title: 'Top 10 Destinations for 2024', category: 'article', path: '/news/top-destinations-2024' },
  { id: 8, title: 'Essential Packing Tips', category: 'article', path: '/news/packing-tips' },
  { id: 9, title: 'Travel Photography Workshop', category: 'course', path: '/courses/photography' },
  { id: 10, title: 'Best Travel Apps for 2024', category: 'article', path: '/news/best-travel-apps' },
];

interface SearchResult {
  id: number;
  title: string;
  category: string;
  path: string;
}

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search results based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = mockSearchResults.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 h-6 w-6 text-muted-foreground"
          onClick={handleSearchToggle}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Input
          type="text"
          placeholder="Search destinations, products, articles..."
          className="pl-10 pr-10 rounded-full w-full min-w-[160px] sm:min-w-[200px] md:w-64 bg-background/80 backdrop-blur border border-border/30 shadow-sm focus:ring-2 focus:ring-primary/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur border border-border/30 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <motion.div
                    key={result.id}
                    whileHover={{ x: 5 }}
                    className="block"
                  >
                    <Link
                      href={result.path}
                      className="block p-3 hover:bg-accent transition-colors border-b last:border-b-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{result.title}</span>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          {result.category}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="p-6 text-center text-muted-foreground">
                No results found for "{searchTerm}"
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                Enter a destination, product, or article to search
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;