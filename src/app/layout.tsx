import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { InteractionTracker } from '@/components/analytics/InteractionTracker';
import { AdProvider } from '@/contexts/AdContext';

export const metadata = {
  title: 'FalTrav - Discover Amazing Destinations',
  description: 'Read tips, shop gear, and explore books about your favorite destinations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AdProvider>
            <AnalyticsProvider />

            <InteractionTracker>
              <Header />
              {children}
              <Footer />
            </InteractionTracker>

          </AdProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

