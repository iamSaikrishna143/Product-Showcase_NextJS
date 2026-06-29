import React from 'react';
import type { Metadata } from 'next';
import { ProductsClient } from './ProductsClient';

export const metadata: Metadata = {
  title: 'All Products | TechStore Catalog',
  description: 'Browse our complete catalog of premium electronic devices. Filter by brand, category, price, and rating to find the perfect electronics for you.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'All Products | TechStore Catalog',
    description: 'Browse our complete catalog of premium electronic devices.',
    url: 'https://techstore-showcase.vercel.app/products',
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
