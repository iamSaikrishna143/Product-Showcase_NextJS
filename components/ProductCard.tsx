'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { Badge } from './Badge';
import { Button } from './Button';
import { formatCurrency, getDiscountedPrice } from '../lib/utils';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-neutral-200/80 transition-all duration-300"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-50 mb-4">
        {product.discount > 0 && (
          <Badge variant="danger" className="absolute top-3 left-3 z-10 shadow-sm">
            {product.discount}% OFF
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center z-10">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              Out of Stock
            </Badge>
          </div>
        )}
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          priority={product.featured}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Brand and Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
          <span className="font-semibold text-neutral-400 uppercase tracking-wider">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 font-medium text-neutral-700">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            {product.rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-neutral-700 transition-colors mb-1.5">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-50">
          <div className="flex flex-col">
            {product.discount > 0 && (
              <span className="text-[10px] text-neutral-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="text-sm font-extrabold text-neutral-900">
              {formatCurrency(discountedPrice)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            variant={isOutOfStock ? 'secondary' : 'primary'}
            className="h-8 w-8 !p-0 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
