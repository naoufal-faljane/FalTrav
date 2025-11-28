import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import BooksClient from '@/components/BooksClient';
import { travelBooks } from '@/data/travelBooks';
import PageViewTracker from '@/components/PageViewTracker';

export const metadata: Metadata = {
  title: 'Travel Books',
  description: 'Browse our collection of travel books and guides',
};

export default function BooksPage() {
  return (
    <div className="py-8">
      <PageViewTracker />
      <Container>
        <h1 className="text-3xl font-bold mb-6">Travel Books</h1>
        <BooksClient books={travelBooks} />
      </Container>
    </div>
  );
}