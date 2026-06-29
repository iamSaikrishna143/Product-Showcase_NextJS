import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { Button } from '../components/Button';
import { productService } from '../services/productService';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
} from 'lucide-react';

export default function Home() {
  const featuredProducts = productService.getFeaturedProducts();

  const categories = [
    { name: 'Smartphones', icon: Smartphone, count: '3 Products', href: '/products?category=Smartphones' },
    { name: 'Laptops', icon: Laptop, count: '3 Products', href: '/products?category=Laptops' },
    { name: 'Audio', icon: Headphones, count: '4 Products', href: '/products?category=Audio' },
    { name: 'Wearables', icon: Watch, count: '2 Products', href: '/products?category=Wearables' },
    { name: 'Gaming', icon: Gamepad2, count: '2 Products', href: '/products?category=Gaming' },
  ];

  const testimonials = [
    {
      name: 'Aarav Mehta',
      role: 'Software Architect',
      comment: 'The MacBook Pro and Keychron keyboard I ordered arrived in pristine packaging. Incredible build quality and top-notch customer support!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
    },
    {
      name: 'Priya Sharma',
      role: 'UX Designer',
      comment: 'Bose QuietComfort headphones are a lifesaver for working in noisy cafes. TechStore is my go-to for all premium hardware purchases now.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
    },
    {
      name: 'Rohan Sen',
      role: 'Creative Director',
      comment: 'I am blown away by the DJI Mini drone. The checkout process was seamless, and the delivery took only two days. 10/10 recommendation.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* Hero Banner Section */}
      <Hero />

      {/* Trust USP Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-[2.5rem] border border-neutral-100 bg-neutral-50/50">
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white mb-4">
              <Zap className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 mb-2">
              Next-Day Delivery
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Enjoy super fast, secure courier services on all premium device orders with live GPS tracking.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white mb-4">
              <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 mb-2">
              Official Warranty
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Every electronic item is guaranteed 100% original and backed by direct manufacturer warranty policies.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white mb-4">
              <RotateCcw className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 mb-2">
              7-Day Return Policy
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Change your mind? No worries. Enjoy hassle-free returns and instant order refunds within seven days.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
              Browse Categories
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              Explore custom categories curated for every type of workflow.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="group flex flex-col items-center justify-center p-6 rounded-3xl border border-neutral-100 bg-white shadow-xs hover:shadow-md hover:border-neutral-200/80 transition-all duration-300 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-800 transition-colors group-hover:bg-neutral-900 group-hover:text-white mb-4">
                  <Icon className="h-5 w-5 stroke-[1.5]" />
                </div>
                <span className="text-sm font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-neutral-400 mt-0.5">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
              Featured Devices
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              A selection of our most innovative and popular electronics items.
            </p>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors">
            View All Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />

        <div className="text-center pt-4 sm:hidden">
          <Link href="/products">
            <Button variant="outline" className="w-full font-semibold gap-1.5">
              View All Catalog
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* High-fidelity CTA block */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_40%)]" />
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Exclusive Offer</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Upgrade Your Setup. <br />
              Save 10% on your first order.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Join the TechStore club and receive immediate promo discounts, members-only deals, and first-access notices on newly launched high-performance devices.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button variant="secondary" size="lg" className="font-semibold gap-1.5 shadow-sm">
                  Browse Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1 max-w-lg mx-auto">
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
            Customer Testimonials
          </h2>
          <p className="text-sm text-neutral-500 font-medium">
            Hear from professionals who rely on TechStore for their tech upgrades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-3xl border border-neutral-100 bg-white shadow-xs space-y-4 hover:border-neutral-200/50 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-50">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-neutral-900">{t.name}</h4>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
