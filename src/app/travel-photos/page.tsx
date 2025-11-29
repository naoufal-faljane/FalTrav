'use client';

import { motion } from 'framer-motion';
import { usePageViewTracker } from '@/lib/analytics';
import Container from '@/components/layout/Container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  MapPin, 
  Heart, 
  Share2, 
  Search, 
  Filter,
  Download,
  User,
  Calendar,
  Star
} from 'lucide-react';
import Image from 'next/image';

// Mock data for travel photos
const travelPhotos = [
  {
    id: 1,
    title: 'Sunset in Santorini',
    location: 'Santorini, Greece',
    photographer: 'Alex Johnson',
    date: '2023-10-15',
    likes: 245,
    category: 'Sunset',
    description: 'Breathtaking sunset view from Oia with the iconic blue domes',
    image: 'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Bali Rice Terraces',
    location: 'Ubud, Bali',
    photographer: 'Maria Chen',
    date: '2023-09-22',
    likes: 312,
    category: 'Landscape',
    description: 'Emerald green rice terraces in the heart of Ubud',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Kyoto Temple',
    location: 'Kyoto, Japan',
    photographer: 'Hiroshi Tanaka',
    date: '2023-11-05',
    likes: 187,
    category: 'Architecture',
    description: 'Ancient temple during cherry blossom season',
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Paris Streets',
    location: 'Paris, France',
    photographer: 'Amelie Dubois',
    date: '2023-08-18',
    likes: 269,
    category: 'Urban',
    description: 'Charming streets of Montmartre in the morning light',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Aurora in Iceland',
    location: 'Reykjavik, Iceland',
    photographer: 'Einar Sigurdsson',
    date: '2023-10-30',
    likes: 453,
    category: 'Nature',
    description: 'Magnificent northern lights dancing across the Icelandic sky',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Sydney Harbor',
    location: 'Sydney, Australia',
    photographer: 'James Wilson',
    date: '2023-11-12',
    likes: 198,
    category: 'Cityscape',
    description: 'Iconic Sydney Opera House with the harbor bridge in the background',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Amazon Rainforest',
    location: 'Manaus, Brazil',
    photographer: 'Carlos Rodriguez',
    date: '2023-07-28',
    likes: 321,
    category: 'Wildlife',
    description: 'Dense canopy and diverse wildlife of the Amazon',
    image: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'New York Skyline',
    location: 'New York City, USA',
    photographer: 'Sarah Johnson',
    date: '2023-11-03',
    likes: 287,
    category: 'Cityscape',
    description: 'Stunning aerial view of Manhattan at golden hour',
    image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

// Photo categories
const photoCategories = [
  { name: 'All', count: 245 },
  { name: 'Landscape', count: 67 },
  { name: 'Cityscape', count: 52 },
  { name: 'Architecture', count: 43 },
  { name: 'Wildlife', count: 38 },
  { name: 'Portrait', count: 45 },
  { name: 'Sunset', count: 41 },
  { name: 'Nature', count: 59 },
  { name: 'Urban', count: 32 },
];

// Popular destinations with photos
const destinationPhotos = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    photoCount: 142,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874e1e2af9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    photoCount: 98,
    image: 'https://images.unsplash.com/photo-1566528580372-39c4e5a0a8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    photoCount: 112,
    image: 'https://images.unsplash.com/photo-1546604010-4f8a7b0dab7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Paris, France',
    photoCount: 134,
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'New York, USA',
    photoCount: 156,
    image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Sydney, Australia',
    photoCount: 87,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

// Photography tips
const photographyTips = [
  {
    title: 'Golden Hour Photography',
    description: 'Shoot during the first hour after sunrise or the last hour before sunset for the warmest, most beautiful light',
    icon: SunIcon
  },
  {
    title: 'Rule of Thirds',
    description: 'Position your subject along the intersecting lines of an imaginary grid to create more balanced and engaging photos',
    icon: GridIcon
  },
  {
    title: 'Leading Lines',
    description: 'Use roads, paths, or other linear elements to guide the viewer\'s eye through your photo',
    icon: ArrowRightLeftIcon
  },
  {
    title: 'Depth and Layers',
    description: 'Include foreground, middle ground, and background elements to create a sense of depth in your images',
    icon: LayersIcon
  }
];

// Photo resources
const photoResources = [
  { title: 'Camera Settings Guide', description: 'Master your camera\'s settings for different travel scenarios', icon: Camera },
  { title: 'Photo Editing Tips', description: 'Learn professional editing techniques for travel photos', icon: ImageEditIcon },
  { title: 'Travel Photography Gear', description: 'Essential equipment for capturing the perfect travel shots', icon: BackpackIcon },
  { title: 'Composition Techniques', description: 'Advanced composition methods for stunning travel photos', icon: FrameIcon },
];

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M3 9h18"></path>
      <path d="M3 15h18"></path>
      <path d="M9 3v18"></path>
      <path d="M15 3v18"></path>
    </svg>
  );
}

function ArrowRightLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17 3 13 7 9"></path>
      <path d="m17 7 4 4-4 4"></path>
      <path d="M13 17H3"></path>
      <path d="M13 7h4"></path>
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
      <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"></path>
      <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"></path>
    </svg>
  );
}

function ImageEditIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
      <path d="M12 12v9"></path>
      <path d="m16 16-4-4-4 4"></path>
    </svg>
  );
}

function BackpackIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 22h-2v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2h-2"></path>
      <path d="M19 10v2a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3v-2"></path>
      <path d="M2 12h1"></path>
      <path d="M5 12h1"></path>
      <path d="M8 12h1"></path>
      <path d="M11 12h1"></path>
      <path d="M14 12h1"></path>
      <path d="M17 12h1"></path>
      <path d="M20 12h1"></path>
      <path d="M19 10a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4h-2"></path>
      <path d="M20 12v-2a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2"></path>
    </svg>
  );
}

function FrameIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    </svg>
  );
}

export default function TravelPhotosPage() {
  usePageViewTracker();

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
                <Camera className="h-12 w-12 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Travel Photography Gallery
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Discover breathtaking travel photos from around the world, curated by professional photographers and travel enthusiasts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button size="lg">Explore Photos</Button>
              <Button size="lg" variant="outline">Submit Photos</Button>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Gallery Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Travel Photos</h2>
              <p className="text-muted-foreground">Curated collection of stunning travel photography</p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  className="pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {photoCategories.map((category, index) => (
              <Button 
                key={index} 
                variant={category.name === 'All' ? "default" : "outline"} 
                size="sm"
                className="rounded-full"
              >
                {category.name} <span className="ml-2 bg-primary/20 px-2 py-0.5 rounded-full text-xs">{category.count}</span>
              </Button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {travelPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="relative">
                  <Image 
                    src={photo.image} 
                    alt={photo.title} 
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-primary/80 backdrop-blur-sm">{photo.category}</Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base">{photo.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{photo.likes}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">{photo.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{photo.photographer}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground">Top locations featured in travel photography</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">View All Destinations</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinationPhotos.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image 
                    src={destination.image} 
                    alt={destination.name} 
                    width={400}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm sm:text-base">{destination.name}</h3>
                <div className="mt-2 text-primary font-medium">{destination.photoCount} photos</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Photography Tips */}
        <section className="mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Photography Tips & Techniques</h2>
            <p className="text-muted-foreground mb-8">Learn from professionals to improve your travel photography</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photographyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-center text-primary mb-3">
                    <tip.icon className="h-10 w-10" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Resources */}
        <section className="mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Photography Resources</h2>
            <p className="text-muted-foreground mb-8">Tools and guides to enhance your travel photography</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photoResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-center text-primary mb-3">
                    <resource.icon className="h-10 w-10" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Contest CTA */}
        <section className="bg-primary/5 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Join Our Travel Photography Contest</h2>
            <p className="text-muted-foreground mb-6">
              Share your best travel photos for a chance to win amazing prizes and get featured on our platform.
            </p>
            <Button size="lg">Submit Your Photos</Button>
          </div>
        </section>
      </Container>
    </div>
  );
}