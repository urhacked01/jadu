import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FinancePartners from './components/FinancePartners';
import ChatSupport from './components/ChatSupport';
import { LanguageProvider } from './context/LanguageContext';
import GoogleTranslate from './components/GoogleTranslate';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

// Add structured JSON-LD data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'Dhanlaxmi Hero',
  description:
    'Your trusted partner for Hero, Harley-Davidson, and Vida electric vehicles. Explore our premium collection of bikes and scooters.',
  url: 'https://dhanlaxmihero.com',
  logo: '/public/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 3, Dhanlaxmi Motors',
    addressLocality: 'Aurangabad',
    addressRegion: 'Maharashtra',
    postalCode: '431005',
    addressCountry: 'IN',
  },
  telephone: '+91 8888876601',
};

export const metadata: Metadata = {
  title: 'Dhanlaxmi Hero - Premium Two-Wheeler Dealership',
  description:
    'Your trusted partner for Hero, Harley-Davidson, and Vida electric vehicles. Explore our premium collection of bikes and scooters.',
  keywords: 'bikes, motorcycles, Hero bikes, Harley Davidson, bike dealership, Dhanlaxmi Motor',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#FF6B00',
  manifest: '/manifest.json',
  // Adding additional metadata for SEO
  openGraph: {
    type: 'website',
    url: 'https://dhanlaxmihero.com',
    title: 'Dhanlaxmi Hero - Premium Two-Wheeler Dealership',
    description:
      'Explore our premium collection of Hero, Harley-Davidson and Vida electric vehicles.',
    siteName: 'Dhanlaxmi Hero',
    images: [
      {
        url: 'https://dhanlaxmihero.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhanlaxmi Hero Dealership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanlaxmi Hero - Premium Two-Wheeler Dealership',
    description:
      'Explore our premium collection of Hero, Harley-Davidson and Vida electric vehicles.',
    images: ['https://dhanlaxmihero.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="preconnect" href="https://i.imgur.com" />
        <link rel="preconnect" href="https://i.ibb.co" />
        <link rel="preconnect" href="https://translate.googleapis.com" />
        <link rel="preconnect" href="https://translate.google.com" />
        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <GoogleTranslate />
        <LanguageProvider>
          <Navbar />
          <main className="pt-[72px] min-h-screen">{children}</main>
          <FinancePartners />
          <Footer />
          <ChatSupport />
        </LanguageProvider>
      </body>
    </html>
  );
}
