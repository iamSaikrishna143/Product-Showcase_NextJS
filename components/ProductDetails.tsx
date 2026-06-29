'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from './Badge';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';
import { formatCurrency, getDiscountedPrice } from '../lib/utils';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate slight network delay for premium feel loading state
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (isAuthenticated) {
      router.push('/cart');
    } else {
      router.push(`/login?redirect=${encodeURIComponent('/cart')}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      
      {/* Left Column: Image Gallery */}
      <div className="space-y-4">
        {/* Main image view */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-neutral-50 border border-neutral-100 shadow-xs">
          <Image
            src={product.images[activeImageIndex]}
            alt={`${product.title} view ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          {product.discount > 0 && (
            <Badge variant="danger" className="absolute top-4 left-4 z-10 text-xs px-3 py-1 shadow-sm">
              SAVE {product.discount}%
            </Badge>
          )}
        </div>

        {/* Thumbnail list */}
        {product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-1">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-2xl border bg-neutral-50 transition-all ${
                  activeImageIndex === index
                    ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
                type="button"
                aria-label={`View thumbnail ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumb ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Information Panel */}
      <div className="flex flex-col space-y-6">
        
        {/* Breadcrumbs / Metadata */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          <span>{product.brand}</span>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-neutral-900 leading-tight">
          {product.title}
        </h1>

        {/* Rating and Stock */}
        <div className="flex items-center gap-4 text-sm pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-1">
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-200'
                  }`}
                />
              ))}
            </span>
            <span className="font-bold text-neutral-800 ml-1">{product.rating}</span>
          </div>

          <span className="text-neutral-300">|</span>

          {isOutOfStock ? (
            <Badge variant="danger">Out of stock</Badge>
          ) : (
            <Badge variant="success">In Stock ({product.stock} left)</Badge>
          )}
        </div>

        {/* Price Card */}
        <div className="bg-neutral-50 rounded-3xl p-5 border border-neutral-100/50 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
            Total Price
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-neutral-900">
              {formatCurrency(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-base text-neutral-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs font-bold text-red-600">
                  Save {formatCurrency(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Overview
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Quantities & Actions */}
        {!isOutOfStock && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-neutral-500">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                max={product.stock}
                onChange={setQuantity}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                isLoading={isAdding}
                variant="outline"
                className="w-full sm:flex-1 h-12 rounded-full font-semibold gap-2 border-neutral-300 hover:border-neutral-900"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="primary"
                className="w-full sm:flex-1 h-12 rounded-full font-semibold"
              >
                Buy Now
              </Button>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-neutral-100 py-4 mt-6 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <Truck className="h-5 w-5 text-neutral-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Free Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-neutral-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">1 Year Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <RefreshCw className="h-5 w-5 text-neutral-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">7-Day Returns</span>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Specifications
          </h3>
          <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
            <table className="min-w-full divide-y divide-neutral-100 text-sm">
              <tbody className="divide-y divide-neutral-100 bg-white">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="w-1/3 px-4 py-3 font-semibold text-neutral-500 bg-neutral-50/30">
                      {key}
                    </td>
                    <td className="px-4 py-3 font-medium text-neutral-800">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
