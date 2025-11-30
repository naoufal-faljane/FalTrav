import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, Bookmark, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { travelBooks } from '@/data/travelBooks';
import { notFound } from 'next/navigation';
import { BookAnalytics } from '@/components/analytics/BookAnalytics';


// Helper function to convert title to slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

async function getBookBySlug(slug: string) {
  const book = travelBooks.find(book => 
    createSlug(book.title) === slug
  );
  return book || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    return {
      title: 'Book Not Found',
      description: 'The requested travel book was not found'
    };
  }

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [
        {
          url: book.image,
          width: 800,
          height: 600,
          alt: book.title,
        },
      ],
    },
  };
}

import BookDetailClient from '@/components/books/BookDetailClient';

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  // Pass the book data to the client component
  return <BookDetailClient book={book} />;
}
