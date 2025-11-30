'use client';

import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import SearchComponent from '@/components/search/SearchComponent';
import { useAdContext } from '@/contexts/AdContext';
import AdPlacement from '@/components/ads/AdPlacement';


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { AdPlacement: AdPlacementComponent } = useAdContext();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR placeholder
    return (
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">FalTrav</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/20">
      <>
        {/* Desktop Header */}
        <div className="hidden md:flex h-16 items-center justify-between px-4">
          {/* Left: Logo */}
          <div className="flex items-center justify-center flex-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">FalTrav</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="flex items-center justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {['Home', 'Destinations', 'News', 'Shop', 'Books'].map((item) => (
                  <NavigationMenuItem key={item}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className={cn(navigationMenuTriggerStyle(), 'rounded-full')}
                    >
                      {item}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Search + Theme + Mobile Menu Trigger */}
          <div className="flex items-center justify-center flex-1 gap-4">
            <div className="w-64">
              <SearchComponent />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="w-full mb-4">
                    <SearchComponent />
                  </div>
                  {['Home', 'Destinations', 'News', 'Shop', 'Books'].map((item) => (
                    <Link
                      key={item}
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="text-base sm:text-lg font-medium hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">FalTrav</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="w-full mb-4">
                    <SearchComponent />
                  </div>
                  {['Home', 'Destinations', 'News', 'Shop', 'Books'].map((item) => (
                    <Link
                      key={item}
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="text-base sm:text-lg font-medium hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search below header */}
        <div className="md:hidden container px-4 pb-3 flex justify-center">
          <div className="w-full max-w-md">
            <SearchComponent />
          </div>
        </div>
        
        {/* Header ad placement (only shown on certain pages for better performance) */}
        <div className="hidden md:block px-4 pb-2">
          <AdPlacementComponent position="header-bottom" type="mobile" />
        </div>
      </>
    </header>
  );
};

export default Header;
