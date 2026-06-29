import React from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '../../components/ContactForm';
import {
  MapPin,
  Phone,
  Mail,
  Compass,
  Eye,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Contact | TechStore Support',
  description: 'Learn about TechStore’s mission to deliver premium consumer electronics. Get in touch with our customer service team or locate our headquarters.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us & Contact | TechStore Support',
    description: 'Learn about TechStore’s mission to deliver premium consumer electronics and contact us.',
    url: 'https://techstore-showcase.vercel.app/about',
  },
};

export default function AboutPage() {
  const socialIcons = [
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
      label: 'LinkedIn',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    }
  ];


  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      
      {/* 1. Header Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Our Story</span>
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl">
          Crafting the Future of Electronics
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-medium">
          TechStore was founded on a simple principle: high-performance gear shouldn&apos;t compromise on design. We build and curate hardware tools that inspire creators, developers, and tech enthusiasts.
        </p>
      </section>

      {/* 2. Mission & Vision Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2.5rem] border border-neutral-100 bg-neutral-50/40 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
            <Compass className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">Our Mission</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            To empower individuals by providing state-of-the-art consumer electronics that combine cutting-edge technology with premium minimalist design, helping you build your ultimate workstation.
          </p>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-neutral-100 bg-neutral-50/40 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
            <Eye className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">Our Vision</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            To become the world&apos;s most trusted catalog brand for design-conscious consumer electronics, establishing a standard of visual simplicity, high durability, and top-tier client support.
          </p>
        </div>
      </section>

      {/* 3. Interactive Contact Form & Location Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-8 border-t border-neutral-100">
        
        {/* Left Side: Contact Information & Map */}
        <div className="space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-neutral-900">Get In Touch</h2>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              Have questions regarding order tracking, product specifications, or warranties? Fill out our form, or visit our headquarters.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4 text-sm text-neutral-600">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 text-neutral-800 flex-shrink-0">
                <MapPin className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-950">Global Headquarters</h4>
                <p className="text-neutral-500 mt-0.5">Connaught Place, Central Delhi, New Delhi, India 110001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 text-neutral-800 flex-shrink-0">
                <Phone className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-950">Phone Assistance</h4>
                <p className="text-neutral-500 mt-0.5">+91 (11) 4567-8900 (Mon - Fri, 9am - 6pm IST)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 text-neutral-800 flex-shrink-0">
                <Mail className="h-5 w-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-950">Email Support</h4>
                <p className="text-neutral-500 mt-0.5">support@techstore.com / corporate@techstore.com</p>
              </div>
            </div>
          </div>

          {/* Custom Styled Map Placeholder */}
          <div className="relative overflow-hidden h-64 rounded-3xl border border-neutral-100 bg-neutral-950 flex flex-col justify-between p-6 shadow-inner">
            {/* Grid Pattern overlay for map look */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_24px]" />
            {/* Radar wave animation mock */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-white/5 border border-white/10 animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Compass className="h-5 w-5 text-white animate-spin-slow" />
            </div>

            {/* Upper Map Info */}
            <div className="relative z-10 flex justify-between items-start text-xs font-bold text-neutral-400">
              <span className="bg-neutral-900 px-3 py-1.5 rounded-full border border-white/10">GPS Coordinates: 28.6139° N, 77.2090° E</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Active HQ</span>
            </div>

            {/* Lower Map Info */}
            <div className="relative z-10 bg-neutral-900 border border-white/10 p-3 rounded-2xl flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-white">TechStore Office Tower</p>
                <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Connaught Place Block A, New Delhi</p>
              </div>
            </div>
          </div>

          {/* Social Icons Panel */}
          <div className="flex items-center gap-4 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Follow Us:</span>
            <div className="flex gap-3">
              {socialIcons.map((soc, index) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={index}
                    href={soc.href}
                    className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50 transition-colors"
                    aria-label={soc.label}
                  >
                    <IconComp className="h-4.5 w-4.5 stroke-[1.5]" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Contact Form Wrapper */}
        <div className="bg-neutral-50/50 p-6 sm:p-8 rounded-[2.5rem] border border-neutral-100 shadow-xs">
          <ContactForm />
        </div>

      </section>

    </div>
  );
}
