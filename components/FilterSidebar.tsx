'use client';

import React from 'react';
import { FilterState } from '../hooks/useProducts';
import { Badge } from './Badge';
import { Star, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  filters: FilterState;
  updateFilter: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  maxPossiblePrice: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  updateFilter,
  resetFilters,
  maxPossiblePrice,
}) => {
  const ratings = [4, 3, 2, 0]; // Rating boundaries (4+ stars, 3+ stars, etc.)

  return (
    <div className="space-y-6 w-full lg:max-w-xs">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
          type="button"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Category
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => updateFilter({ category: '' })}
            className={`text-left text-sm py-1 px-2 rounded-xl transition-all ${
              filters.category === ''
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter({ category: cat })}
              className={`text-left text-sm py-1 px-2 rounded-xl transition-all ${
                filters.category === cat
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Brand
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => updateFilter({ brand: '' })}
            className={`text-left text-sm py-1 px-2 rounded-xl transition-all ${
              filters.brand === ''
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => updateFilter({ brand: b })}
              className={`text-left text-sm py-1 px-2 rounded-xl transition-all ${
                filters.brand === b
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Max Price
          </h3>
          <span className="text-xs font-bold text-neutral-800">
            {formatCurrency(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max={maxPossiblePrice}
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => updateFilter({ maxPrice: Number(e.target.value) })}
          className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-semibold">
          <span>₹1,000</span>
          <span>{formatCurrency(maxPossiblePrice)}</span>
        </div>
      </div>

      {/* Rating Filter Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Rating
        </h3>
        <div className="flex flex-col gap-1.5">
          {ratings.map((rate) => (
            <button
              key={rate}
              onClick={() => updateFilter({ minRating: rate })}
              className={`flex items-center gap-1.5 text-left text-sm py-1 px-2 rounded-xl transition-all ${
                filters.minRating === rate
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {rate === 0 ? (
                <span>All Ratings</span>
              ) : (
                <>
                  <span className="flex items-center text-amber-400">
                    {Array.from({ length: rate }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    {Array.from({ length: 5 - rate }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-neutral-300" />
                    ))}
                  </span>
                  <span className="text-xs font-medium">({rate}.0 & up)</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Availability
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => updateFilter({ inStockOnly: e.target.checked })}
            className="h-4.5 w-4.5 rounded-lg border-neutral-300 text-neutral-900 focus:ring-neutral-900 focus:ring-offset-0 cursor-pointer accent-neutral-900"
          />
          <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

    </div>
  );
};
