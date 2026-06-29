import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TechStore | Premium Electronics Showcase',
    template: '%s | TechStore',
  },
  description: 'Discover TechStore - a curated collection of state-of-the-art smartphones, laptops, audio gear, and wearables designed for peak performance and elegant aesthetics.',
  keywords: ['electronics', 'next.js store', 'smartphones', 'laptops', 'macbook pro', 'iphone', 'premium tech', 'audio devices'],
  authors: [{ name: 'TechStore Team' }],
  metadataBase: new URL('https://techstore-showcase.vercel.app'), // fallback URL
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechStore | Premium Electronics Showcase',
    description: 'Explore the finest high-performance consumer tech devices in our premium showcase.',
    url: 'https://techstore-showcase.vercel.app',
    siteName: 'TechStore',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=60',
        width: 1200,
        height: 630,
        alt: 'TechStore Premium Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechStore | Premium Electronics Showcase',
    description: 'Explore high-performance consumer tech devices in our premium showcase.',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=60'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scribe-recorder-ready="true"
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
