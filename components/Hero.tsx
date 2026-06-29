import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 text-white my-6 mx-4 sm:mx-6 lg:mx-8">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]" />
      
      {/* Decorative floating blurred items */}
      <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />
      <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-white/5 blur-[60px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-12 sm:py-28 lg:px-16 text-center z-10">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium tracking-wide text-neutral-300 backdrop-blur-sm mb-6 animate-pulse">
          <Sparkles className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          Introducing our mid-year showcase
        </div>

        {/* Main Headings */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
          The Future of Tech. <br />
          <span className="bg-gradient-to-r from-neutral-200 via-neutral-400 to-white bg-clip-text text-transparent">
            Designed for Performance.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed mb-10">
          Discover a handpicked selection of top-tier laptops, smartphones, high-fidelity audio gear, and elite accessories. Engineered to elevate your digital experience.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold gap-1.5 shadow-md hover:shadow-lg transition-all">
              Shop Catalog
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-white hover:bg-white/10 hover:text-white font-semibold transition-all border border-white/10 rounded-full"
            >
              Learn More
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};
