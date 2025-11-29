import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { InteractionTracker } from '@/components/analytics/InteractionTracker';
import { AdProvider } from '@/contexts/AdContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FalTrav - Discover Amazing Destinations',
  description: 'Read tips, shop gear, and explore books about your favorite destinations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}', {
                page_path: window.location.pathname,
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `,
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex-1">
                <InteractionTracker>
                  {children}
                </InteractionTracker>
              </main>
              <AnalyticsProvider />
              <Footer />
            </div>
          </AdProvider>
        </ThemeProvider>
        <Script
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = 'https://tpembars.com/NDc2ODAz.js?t=476803';
              document.head.appendChild(script);
            })();`
          }}
        />
      </body>
    </html>
  );
}