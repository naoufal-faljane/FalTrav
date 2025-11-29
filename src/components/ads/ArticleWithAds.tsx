'use client';

import { useAdContext } from '@/contexts/AdContext';

interface ArticleLayoutProps {
  children: React.ReactNode;
}

export const ArticleWithAds: React.FC<ArticleLayoutProps> = ({ children }) => {
  const { AdPlacement } = useAdContext();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Ad before article content */}
      <div className="mb-6">
        <AdPlacement position="article-top" type="mobile" />
      </div>

      <div className="bg-background">
        {children}
      </div>

      {/* Ad in middle of article (for longer articles) */}
      <div className="my-8">
        <AdPlacement position="article-middle" type="rectangle" />
      </div>

      {/* Ad after article content */}
      <div className="mt-8">
        <AdPlacement position="article-bottom" type="mobile" />
      </div>
    </div>
  );
};