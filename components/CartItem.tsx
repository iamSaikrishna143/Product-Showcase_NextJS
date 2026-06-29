'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../types/cart';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import { formatCurrency, getDiscountedPrice } from '../lib/utils';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const itemTotal = discountedPrice * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl border border-neutral-100 bg-white shadow-xs hover:border-neutral-200/60 transition-colors">
      
      {/* Product Image and Meta */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative aspect-square w-20 h-20 rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100/50 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-900 line-clamp-1 hover:text-neutral-700 transition-colors">
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </h4>
          <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-extrabold text-neutral-900">
              {formatCurrency(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-[10px] text-neutral-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity controls and calculations */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
        
        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 md:hidden font-semibold">Qty:</span>
          <QuantitySelector
            quantity={quantity}
            max={product.stock}
            onChange={(newQty) => updateQuantity(product.id, newQty)}
          />
        </div>

        {/* Pricing Subtotal */}
        <div className="text-right hidden md:block w-24">
          <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-0.5">
            Total
          </p>
          <p className="text-sm font-black text-neutral-900">
            {formatCurrency(itemTotal)}
          </p>
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeFromCart(product.id)}
          className="p-2 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          type="button"
          aria-label={`Remove ${product.title} from cart`}
        >
          <Trash2 className="h-4 w-4 stroke-[1.5]" />
        </button>
      </div>

    </div>
  );
};
