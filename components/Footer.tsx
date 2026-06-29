'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setIsSubmitted(true);
    setEmail('');
    
    // Auto reset submission message after 4s
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Shopping Cart', href: '/cart' },
  ];

  const categories = [
    { label: 'Smartphones', href: '/products?category=Smartphones' },
    { label: 'Laptops', href: '/products?category=Laptops' },
    { label: 'Audio', href: '/products?category=Audio' },
    { label: 'Wearables', href: '/products?category=Wearables' },
    { label: 'Gaming', href: '/products?category=Gaming' },
  ];

  const socialLinks = [
    {
      label: 'Facebook',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      label: 'Github',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        </svg>
      )
    }
  ];


  return (
    <footer className="bg-neutral-50 border-t border-neutral-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900">
                Tech<span className="text-neutral-500 font-medium">Store</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Premium consumer electronics designed for high performance and sleek simplicity. Discover our curated showcase of top-tier gear.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => {
                const IconComp = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComp className="h-5 w-5 stroke-[1.5]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={cat.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Subscribe to get notified about special offers, new product launches, and updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full rounded-2xl bg-white border border-neutral-200 px-4 py-2.5 pr-12 text-sm text-neutral-800 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
              <button
                type="submit"
                className="absolute right-1 top-1.5 bottom-1.5 flex h-7 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {isSubmitted && (
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                Successfully subscribed! Check your inbox.
              </p>
            )}
            {error && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Lower section */}
        <div className="border-t border-neutral-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} TechStore Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-400">
            <a href="#" className="hover:text-neutral-600">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-600">Terms of Service</a>
            <a href="#" className="hover:text-neutral-600">Sales Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
