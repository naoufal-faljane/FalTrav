'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, MapPin, ShoppingCart, BookOpen, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SearchResult {
  id: number;
  title: string;
  category: string;
  path: string;
  description?: string;
}

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Search function that calls the API
  const performSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.results || []);
      } else {
        console.error('Search API Error:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search Error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter search results based on search term with debounce
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsLoading(false);
    } else {
      debounceTimer.current = setTimeout(() => {
        performSearch(searchTerm);
      }, 300); // 300ms debounce
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
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

  // Get category icon based on result type
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'destination':
        return <MapPin className="h-4 w-4" />;
      case 'product':
        return <ShoppingCart className="h-4 w-4" />;
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  // Get category color based on result type
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'destination':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'product':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'book':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'article':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 h-6 w-6 text-muted-foreground hover:bg-transparent hover:text-primary"
          onClick={handleSearchToggle}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Input
          type="text"
          placeholder="Search destinations, products, articles..."
          className="pl-10 pr-10 rounded-full w-full min-w-[160px] sm:min-w-[200px] md:w-64 bg-background/80 backdrop-blur border border-border/30 shadow-sm focus:ring-2 focus:ring-primary/30 h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
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
            {isLoading ? (
              <div className="p-6 flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.slice(0, 10).map((result) => (
                  <motion.div
                    key={`${result.id}-${result.category}`}
                    whileHover={{ x: 5 }}
                    className="block"
                  >
                    <Link
                      href={result.path}
                      className="block p-3 hover:bg-accent transition-colors border-b last:border-b-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-full ${getCategoryColor(result.category)}`}>
                          {getCategoryIcon(result.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className="font-medium truncate">{result.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${getCategoryColor(result.category)}`}>
                              {result.category}
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                {searchResults.length > 10 && (
                  <div className="p-3 text-center text-sm text-muted-foreground border-t">
                    +{searchResults.length - 10} more results
                  </div>
                )}
              </div>
            ) : searchTerm ? (
              <div className="p-6 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 text-muted" />
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm mt-1">Try different keywords or check your spelling</p>
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 text-muted" />
                <p>Start typing to search destinations, products, articles...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;