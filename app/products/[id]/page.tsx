import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productService } from '../../../services/productService';
import { ProductDetails } from '../../../components/ProductDetails';
import { ProductGrid } from '../../../components/ProductGrid';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for dynamic SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productService.getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: 'Product Not Found | TechStore',
    };
  }

  return {
    title: `${product.title} | TechStore`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | TechStore`,
      description: product.description,
      url: `https://techstore-showcase.vercel.app/products/${product.id}`,
      images: [
        {
          url: product.images[0],
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = productService.getProductById(resolvedParams.id);

  if (!product) {
    notFound(); // Triggers Next.js 404 page
  }

  const relatedProducts = productService.getRelatedProducts(product.id, product.category, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
        <Link href="/" className="hover:text-neutral-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 stroke-[2.5]" />
        <Link href="/products" className="hover:text-neutral-900 transition-colors">
          Products
        </Link>
        <ChevronRight className="h-3 w-3 stroke-[2.5]" />
        <span className="text-neutral-800 line-clamp-1">{product.title}</span>
      </nav>

      {/* Main product display layout */}
      <ProductDetails product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-100 pt-12 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
              Related Products
            </h2>
            <p className="text-sm text-neutral-500 font-medium">
              Customers who viewed this product also liked these electronics.
            </p>
          </div>

          <ProductGrid products={relatedProducts} />
        </section>
      )}

      {/* Back button */}
      <div className="pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>

    </div>
  );
}
