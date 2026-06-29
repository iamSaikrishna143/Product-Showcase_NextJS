import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-neutral-200" />
        <span className="absolute inset-0 rounded-full border-4 border-neutral-900 border-t-transparent animate-spin" />
      </div>
    </div>
  );
};

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="group rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full rounded-2xl bg-neutral-100 mb-4" />
      
      {/* Brand & Rating Skeleton */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 w-1/4 rounded bg-neutral-100" />
        <div className="h-4 w-1/5 rounded bg-neutral-100" />
      </div>

      {/* Title Skeleton */}
      <div className="h-5 w-3/4 rounded bg-neutral-100 mb-3" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-neutral-100" />
        <div className="h-3 w-5/6 rounded bg-neutral-100" />
      </div>

      {/* Price & Button Skeleton */}
      <div className="flex items-center justify-between mt-auto">
        <div className="h-6 w-1/3 rounded bg-neutral-100" />
        <div className="h-8 w-1/4 rounded-full bg-neutral-100" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};
