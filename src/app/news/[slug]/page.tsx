import { use } from 'react';
import NewsArticleClient from './NewsArticleClient';

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <NewsArticleClient slug={slug} />;
}

