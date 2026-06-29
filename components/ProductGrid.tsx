import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { cn } from '../lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3',
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
