'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CartItem } from '../../components/CartItem';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { EmptyState } from '../../components/EmptyState';
import { formatCurrency } from '../../lib/utils';
import { ShoppingBag, ChevronRight, ArrowLeft, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { cart, clearCart, summary } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated, returning here
      router.push(`/login?redirect=${encodeURIComponent('/cart')}`);
      return;
    }

    setIsCheckingOut(true);
    // Simulate payment / checkout process for premium interactive feel
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart(); // Clear cart after success
    }, 1500);
  };

  // 1. Success Order Screen
  if (checkoutSuccess) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center animate-fade-in space-y-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto shadow-xs border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-neutral-900">Order Placed Successfully!</h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Thank you for your purchase. We have received your order request and are preparing your electronics items for shipment.
          </p>
        </div>
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100/50 text-left space-y-2 text-xs font-medium text-neutral-500">
          <div className="flex justify-between">
            <span>Order Reference:</span>
            <span className="font-extrabold text-neutral-800">TS-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span className="font-extrabold text-neutral-800">2-3 Business Days</span>
          </div>
        </div>
        <div className="pt-4">
          <Link href="/products">
            <Button variant="primary" className="w-full font-semibold gap-1.5">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Empty Cart Screen
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any electronics to your cart yet. Visit our product catalog to discover the latest gadgets."
          actionLabel="Shop Devices"
          onActionClick={() => router.push('/products')}
        />
      </div>
    );
  }

  // 3. Main Cart View
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-sm text-neutral-500 font-medium mt-1">
          Review your items and proceed to secure checkout
        </p>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Selected Devices ({cart.length})
            </span>
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-red-600 transition-colors"
              type="button"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Cart
            </button>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Pricing Summary */}
        <div className="bg-neutral-50 rounded-[2rem] p-6 border border-neutral-100 space-y-6">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 border-b border-neutral-200/60 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3.5 text-sm font-medium text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal (MRP)</span>
              <span className="text-neutral-900 font-semibold">{formatCurrency(summary.subtotal)}</span>
            </div>
            
            {summary.discountTotal > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Product Discounts</span>
                <span>-{formatCurrency(summary.discountTotal)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>GST (18% GST)</span>
              <span className="text-neutral-900 font-semibold">{formatCurrency(summary.gst)}</span>
            </div>

            <div className="flex justify-between">
              <span>Standard Shipping</span>
              {summary.shipping === 0 ? (
                <span className="text-emerald-600 font-semibold uppercase tracking-wider text-xs bg-emerald-50 px-2 py-0.5 rounded-full">Free</span>
              ) : (
                <span className="text-neutral-900 font-semibold">{formatCurrency(summary.shipping)}</span>
              )}
            </div>

            <div className="border-t border-neutral-200/60 pt-4 flex justify-between text-base font-extrabold text-neutral-900">
              <span>Grand Total</span>
              <span className="text-lg font-black">{formatCurrency(summary.grandTotal)}</span>
            </div>
          </div>

          {/* Checkout Guard Notice */}
          {!isAuthenticated && (
            <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-4 text-xs text-amber-800 leading-relaxed">
              ⚠️ <strong>Sign In Required:</strong> You are currently browsing as a guest. You must log in or sign in to complete your checkout.
            </div>
          )}

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            isLoading={isCheckingOut}
            variant="primary"
            className="w-full h-12 rounded-full font-bold gap-1.5 shadow-sm"
          >
            {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Guarantee Badges */}
          <div className="text-[10px] text-center text-neutral-400 font-medium leading-relaxed pt-2">
            🔒 Secure 256-bit SSL encrypted transaction payments.
          </div>
        </div>

      </div>

    </div>
  );
}
