// Declare gtag and dataLayer on the window object
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Define gtag function to push to dataLayer
    window.gtag = window.gtag || function(...args: any[]) {
      window.dataLayer.push(args);
    };

    // Load the gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=G-WR9K1KTMF0`;
    document.head.appendChild(gtagScript);

    // Initialize GA
    window.gtag('js', new Date());
    window.gtag('config', 'G-WR9K1KTMF0', {
      page_title: document.title,
      page_location: window.location.href
    });
  }
};