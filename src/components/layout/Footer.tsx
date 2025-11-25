import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-center">
            <h3 className="text-lg font-bold mb-4">FalTrav</h3>
            <p className="text-sm text-muted-foreground">
              Discover amazing destinations, find travel deals, and get inspired for your next adventure.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/destinations" className="text-sm text-muted-foreground hover:text-foreground">Destinations</Link></li>
              <li><Link href="/deals" className="text-sm text-muted-foreground hover:text-foreground">Travel Deals</Link></li>
              <li><Link href="/news" className="text-sm text-muted-foreground hover:text-foreground">Travel News</Link></li>
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground">Travel Shop</Link></li>
              <li><Link href="/books" className="text-sm text-muted-foreground hover:text-foreground">Travel Books</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="/press" className="text-sm text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 justify-center">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
              <div className="flex mt-2 max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l text-sm w-full bg-background border border-r-0 border-input"
                />
                <Button size="sm" className="rounded-l-none">Join</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FalTrav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;