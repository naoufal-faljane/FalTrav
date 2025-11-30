'use client';

import { motion } from 'framer-motion';
import { usePageViewTracker } from '@/lib/analytics';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  MapPin, 
  Plane, 
  Utensils, 
  Camera, 
  Globe, 
  Shield, 
  DollarSign, 
  Calendar,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AdPlacement from '@/components/ads/AdPlacement';

// Mock data for travel guides
const travelGuides = [
  {
    id: 1,
    title: 'First-Time Traveler\'s Guide',
    description: 'Essential tips and tricks for your first international adventure',
    category: 'Beginner',
    difficulty: 'Easy',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1596436888106-a4e8e0e4c7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Packing essentials', 'Safety tips', 'Budget planning', 'Documentation'],
  },
  {
    id: 2,
    title: 'Europe Backpacking Guide',
    description: 'How to explore Europe on a budget and see multiple countries',
    category: 'Backpacking',
    difficulty: 'Medium',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Schengen visa', 'Transportation', 'Accommodation', 'Packing light'],
  },
  {
    id: 3,
    title: 'Southeast Asia Adventure',
    description: 'Breathtaking destinations and cultural experiences in Asia',
    category: 'Adventure',
    difficulty: 'Medium',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1565123409449-0f463d6bb0c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Visa runs', 'Street food', 'Local customs', 'Budget travel'],
  },
  {
    id: 4,
    title: 'Luxury Travel Experience',
    description: 'How to enjoy premium travel experiences without overspending',
    category: 'Luxury',
    difficulty: 'Easy',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Best resorts', 'VIP experiences', 'Exclusive activities', 'Luxury tips'],
  },
  {
    id: 5,
    title: 'Solo Travel Safety',
    description: 'Staying safe and confident while traveling alone',
    category: 'Safety',
    difficulty: 'Easy',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Safety apps', 'Communication', 'Accommodation', 'Trust instincts'],
  },
  {
    id: 6,
    title: 'Digital Nomad Travel',
    description: 'Remote work and travel - balancing productivity with exploration',
    category: 'Work & Travel',
    difficulty: 'Hard',
    readTime: '18 min read',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Best cities', 'Internet reliability', 'Workspaces', 'Visa requirements'],
  },
];

// Popular destinations with specific guides
const destinationGuides = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with stunning beaches and rich culture',
    guideUrl: '/guides/bali',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    description: 'Iconic white buildings and breathtaking sunsets',
    guideUrl: '/guides/santorini',
    image: 'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    description: 'Ancient temples and beautiful cherry blossoms',
    guideUrl: '/guides/kyoto',
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Paris, France',
    description: 'City of lights with iconic landmarks and cuisine',
    guideUrl: '/guides/paris',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

// Travel tips categories
const tipCategories = [
  {
    title: 'Packing Tips',
    icon: Suitcase,
    description: 'Smart packing strategies and essential items',
    count: 12,
  },
  {
    title: 'Safety Tips',
    icon: Shield,
    description: 'How to stay safe while traveling',
    count: 8,
  },
  {
    title: 'Budget Travel',
    icon: DollarSign,
    description: 'Save money and maximize your travel budget',
    count: 15,
  },
  {
    title: 'Cultural Etiquette',
    icon: Globe,
    description: 'Respectful travel and cultural awareness',
    count: 10,
  },
];

export default function TravelGuidesPage() {
  usePageViewTracker();
  const { AdPlacement: AdPlacementComponent } = useAdContext();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Your Ultimate Travel Guide Resource
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Discover expert tips, destination guides, and comprehensive resources to make your travel experiences unforgettable.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button size="lg">Start Exploring</Button>
              <Button size="lg" variant="outline">View All Topics</Button>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Ad placement after hero section */}
        <div className="mb-8">
          <AdPlacementComponent position="guides-top" type="smartlink" />
        </div>

        {/* Featured Guides */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Travel Guides</h2>
              <p className="text-muted-foreground">Curated guides to help you travel smarter</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">View All Guides</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary">{guide.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.highlights.slice(0, 3).map((highlight, i) => (
                        <Badge key={i} variant="outline">{highlight}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                      <Button size="sm" variant="outline">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ad placement between sections */}
        <div className="mb-8">
          <AdPlacementComponent position="guides-middle" type="rectangle" />
        </div>

        {/* Destination Guides */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Destination Guides</h2>
              <p className="text-muted-foreground">Detailed guides for your favorite destinations</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">View All Destinations</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationGuides.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{destination.description}</p>
                    <Button size="sm" variant="outline" className="w-full">View Guide</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Essential Travel Tips */}
        <section className="mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Essential Travel Tips</h2>
            <p className="text-muted-foreground mb-8">Categorized resources to help you travel smarter</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tipCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="bg-primary/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <div className="text-sm text-primary font-medium">{category.count} guides</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Planning Resources */}
        <section className="mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Travel Planning Resources</h2>
            <p className="text-muted-foreground mb-8">Everything you need to plan your next adventure</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-3 mb-6">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Documents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-primary" />
                      <span>Flights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-primary" />
                      <span>Food</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-primary" />
                      <span>Photography</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Insurance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>Budget</span>
                    </li>
                  </ul>
                  <Button className="w-full">Download Checklist</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Travel Planning Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">3-6 months before</h4>
                        <p className="text-sm text-muted-foreground">Research destinations, check visa requirements, book flights</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">1-3 months before</h4>
                        <p className="text-sm text-muted-foreground">Book accommodation, plan itinerary, purchase travel insurance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">2-4 weeks before</h4>
                        <p className="text-sm text-muted-foreground">Pack essentials, notify banks, download offline maps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ad placement before newsletter */}
        <div className="mb-8">
          <AdPlacementComponent position="guides-bottom" type="mobile" />
        </div>

        {/* Newsletter CTA */}
        <section className="bg-primary/5 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Stay Updated with Travel Insights</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest travel guides, destination tips, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

// Importing the Suitcase icon since it's used but not imported in the main component
function Suitcase({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5Z"/>
      <path d="M9 14V8"/>
      <path d="M15 14V8"/>
      <path d="M5 8h14"/>
      <path d="M5 14h14"/>
    </svg>
  );
}