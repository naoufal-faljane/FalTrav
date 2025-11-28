'use client';

import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { usePageViewTracker } from '@/lib/analytics';

export default function AboutPage() {
  usePageViewTracker();

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Wanderlust</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-lg text-muted-foreground mb-4">
                Wanderlust was founded with a simple mission: to inspire and enable people to explore the world. 
                We believe that travel broadens the mind, enriches the soul, and creates memories that last a lifetime.
              </p>
              
              <p className="text-lg text-muted-foreground mb-4">
                Our team of travel enthusiasts, photographers, and adventurers work tirelessly to bring you the 
                best travel experiences and resources. From hidden gems in familiar places to once-in-a-lifetime 
                adventures in remote corners of the world, we're here to help you discover it all.
              </p>
              
              <p className="text-lg text-muted-foreground">
                Whether you're a seasoned traveler or embarking on your first international journey, Wanderlust 
                provides the tools, inspiration, and resources to make your trip unforgettable.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">500K+</h3>
                <p className="text-muted-foreground">Happy Travelers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">120+</h3>
                <p className="text-muted-foreground">Countries Covered</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">10+</h3>
                <p className="text-muted-foreground">Years of Experience</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground mb-6">
            Our passionate team of travel experts, content creators, and customer service professionals 
            are dedicated to making your travel dreams a reality.
          </p>
        </div>
      </Container>
    </div>
  );
}