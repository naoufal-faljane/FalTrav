'use client';

import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, User, Download } from 'lucide-react';
import { usePageViewTracker } from '@/lib/analytics';

export default function TravelGuidesPage() {
  usePageViewTracker();

  const travelGuides = [
    {
      id: 1,
      title: "Essential Packing Guide",
      description: "A comprehensive checklist of items you need for your trip, including clothes, electronics, and travel documents.",
      category: "Planning",
      rating: 4.8,
      author: "Travel Expert",
      date: "2025-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Budget Travel Tips",
      description: "How to travel the world without breaking the bank with our money-saving strategies and tips.",
      category: "Budget",
      rating: 4.7,
      author: "Savvy Traveler",
      date: "2025-01-10",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Safety in Foreign Countries",
      description: "Essential safety tips and precautions to take when traveling to unfamiliar destinations.",
      category: "Safety",
      rating: 4.9,
      author: "Safety Expert",
      date: "2025-01-08",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Cultural Etiquette Guide",
      description: "Learn about customs and etiquette in different countries to be a respectful traveler.",
      category: "Culture",
      rating: 4.6,
      author: "Cultural Expert",
      date: "2025-01-05",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Food & Dining Abroad",
      description: "Navigating food culture, dietary restrictions, and finding authentic local cuisine.",
      category: "Food",
      rating: 4.5,
      author: "Foodie Explorer",
      date: "2025-01-02",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Transportation Tips",
      description: "Navigate public transportation, flights, and local transport systems like a pro.",
      category: "Transport",
      rating: 4.7,
      author: "Transport Guru",
      date: "2024-12-28",
      readTime: "5 min read"
    }
  ];

  const categories = [
    { name: "Planning", count: 12 },
    { name: "Budget", count: 8 },
    { name: "Safety", count: 10 },
    { name: "Culture", count: 15 },
    { name: "Food", count: 7 },
    { name: "Transport", count: 9 }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Travel Guides</h1>
          <p className="text-lg text-muted-foreground mb-8">Essential resources and tips for every traveler</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Popular Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {travelGuides.slice(0, 3).map((guide) => (
                      <div key={guide.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h3 className="font-medium">{guide.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content with guides */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {travelGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">{guide.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{guide.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{guide.author}</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{guide.date}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="mt-12 bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h2 className="text-2xl font-bold mb-2">Subscribe to Travel Updates</h2>
            <p className="text-muted-foreground mb-4">Get the latest travel guides, tips, and exclusive offers delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md flex-1 bg-background border border-input"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}