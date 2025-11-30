import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { InteractionTracker } from '@/components/analytics/InteractionTracker';
import { AdProvider } from '@/contexts/AdContext';
import Popunder from '@/components/ads/Popunder';

export const metadata = {
  title: 'FalTrav - Discover Amazing Destinations',
  description: 'Read tips, shop gear, and explore books about your favorite destinations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
        <ThemeProvider>
          <AdProvider>
            <AnalyticsProvider />

            <InteractionTracker>
              <Header />
              {children}
              <Footer />
              {/* Popunder that appears after 5 seconds */}
              <Popunder delayMs={5000} triggerOnLoad={true} />
            </InteractionTracker>

          </AdProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
