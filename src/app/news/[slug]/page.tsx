import React from "react";
import { notFound } from "next/navigation";

/** Temporary static article */
function getArticleBySlug(slug: string) {
  return {
    title: "Sample Article Title",
    content: "This is sample article content until the backend is ready.",
    date: "2024-01-01",
    author: "Admin",
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      <p className="text-muted-foreground mb-4">
        {article.date} — {article.author}
      </p>

      <div className="my-6">
        <script
          async
          src="https://www.travelpayouts.com/widgets/..."
        ></script>
      </div>

      <div className="prose dark:prose-invert leading-relaxed">
        {article.content}
      </div>

      <div className="my-10">
        <script
          async
          src="https://www.travelpayouts.com/widgets/..."
        ></script>
      </div>
    </div>
  );
}

