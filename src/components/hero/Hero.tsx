'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

// Helper to detect if we're running on the client side
const isClient = typeof window !== 'undefined';

const Hero = () => {
  // Only run animation after component mounts to prevent SSR issues
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  // Determine initial animation state based on whether we're on the client
  const initialOpacity = shouldAnimate ? 0 : 1;
  const initialY = shouldAnimate ? 20 : 0;

  return (
    <div className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="container relative z-10 py-12 sm:py-16 md:py-20 lg:py-28 px-4">
        <motion.div
          initial={{ opacity: initialOpacity, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: initialOpacity, y: initialY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto"
            initial={{ opacity: initialOpacity, y: initialY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Explore amazing destinations and get inspired for your next journey.
          </motion.p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="bg-white rounded-xl p-2 sm:p-3 md:p-4 shadow-xl max-w-4xl mx-auto w-full"
          initial={{ opacity: initialOpacity, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Destination"
                className="pl-10 h-12 rounded-lg border-0 bg-muted/50 text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="date"
                className="pl-10 h-12 rounded-lg border-0 bg-muted/50 text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Travelers"
                className="pl-10 h-12 rounded-lg border-0 bg-muted/50 text-sm sm:text-base"
              />
            </div>
            <Button className="h-12 rounded-lg bg-primary hover:bg-primary/90 text-sm sm:text-base">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;