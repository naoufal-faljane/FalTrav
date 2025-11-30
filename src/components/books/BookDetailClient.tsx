'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, Bookmark, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Container from '@/components/layout/Container';
import { useAdContext } from '@/contexts/AdContext';
import { usePageViewTracker } from '@/lib/analytics';
import { trackViewBook } from '@/lib/enhanced-analytics';

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

interface BookDetailClientProps {
  book: Book;
}

export default function BookDetailClient({ book }: BookDetailClientProps) {
  const { AdPlacement } = useAdContext();
  usePageViewTracker(); // This is the equivalent of BookAnalytics

  useEffect(() => {
    // Track book view with location data if available
    const userLocation = (window as any).userLocation;
    trackViewBook(book.title, `book-${book.id}`, userLocation);
  }, [book.id, book.title]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
      {/* Header with back button */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-10">
        <Container>
          <div className="py-4 flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center border-stone-300 hover:bg-stone-50"
              asChild
            >
              <a href="/books">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Books
              </a>
            </Button>
          </div>
        </Container>
      </div>

      {/* Ad placement at top */}
      <div className="py-4">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AdPlacement position="book-top" type="mobile" />
          </div>
        </Container>
      </div>

      {/* Book Detail Content */}
      <Container className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg border-stone-200">
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h1 className="text-xl font-bold line-clamp-2">{book.title}</h1>
                    <p className="text-sm text-stone-200">by {book.author}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-stone-600">({book.reviews} reviews)</span>
                  </div>

                  <p className="text-stone-700 mb-6">{book.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-stone-800">Category</h3>
                    <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-stone-800">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag: string, index: number) => (
                        <span key={index} className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-stone-800 hover:bg-stone-900">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Read Now
                    </Button>
                    <Button variant="outline" className="flex-1 border-stone-300 hover:bg-stone-50">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Book Content */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-stone-200 overflow-hidden">
                <div className="p-6 md:p-8 bg-gradient-to-r from-amber-50/50 to-stone-50/50 border-b border-stone-200">
                  <h1 className="text-2xl md:text-3xl font-bold text-stone-800">{book.title}</h1>
                  <p className="text-stone-600 mt-2">by {book.author}</p>
                </div>
                <CardContent className="p-6 md:p-8">
                  {/* Ad placement in the content area */}
                  <div className="mb-8">
                    <AdPlacement position="book-content" type="rectangle" />
                  </div>
                  
                  <div className="prose prose-stone max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-stone-800 mb-6 mt-8" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-stone-800 mb-4 mt-8 border-b border-stone-200 pb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-medium text-stone-800 mb-3 mt-6" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-stone-700 leading-relaxed" {...props} />,
                        a: ({node, ...props}) => <a className="text-amber-600 hover:text-amber-800 underline" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="text-stone-700 pl-2" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 italic text-stone-600" {...props} />,
                        code: ({node, ...props}) => <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                        pre: ({node, ...props}) => <pre className="bg-stone-800 text-stone-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
                      }}
                    >
                      {book.content}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Ad placement at the bottom of content */}
                  <div className="mt-8">
                    <AdPlacement position="book-bottom" type="smartlink" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}