/* eslint-disable react-hooks/static-components */
'use client';

import React, { useState } from 'react';
import { FilterState } from '../hooks/useProducts';
import { Badge } from './Badge';
import { Star, RefreshCw, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  filters: FilterState;
  updateFilter: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  maxPossiblePrice: number;
}

interface AccordionSection {
  id: string;
  isOpen: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  updateFilter,
  resetFilters,
  maxPossiblePrice,
}) => {
  const ratings = [4, 3, 2, 0];
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: false,
    brand: false,
    price: false,
    rating: false,
    availability: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const AccordionHeader = ({ title, section }: { title: string; section: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-3 px-3 hover:bg-neutral-50 rounded-lg transition-colors"
    >
      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
        {title}
      </h3>
      <ChevronDown
        className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
          expandedSections[section] ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  const AccordionContent = ({ children }: { children: React.ReactNode }) => (
    <div className="px-3 pb-3 animate-in fade-in duration-200">
      {children}
    </div>
  );

  return (
    <div className="space-y-4 w-full">
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
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <AccordionHeader title="Category" section="category" />
        {expandedSections.category && (
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => updateFilter({ category: '' })}
                className={`text-left text-sm py-2 px-2 rounded-lg transition-all ${
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
                  className={`text-left text-sm py-2 px-2 rounded-lg transition-all ${
                    filters.category === cat
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AccordionContent>
        )}
      </div>

      {/* Brand Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <AccordionHeader title="Brand" section="brand" />
        {expandedSections.brand && (
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => updateFilter({ brand: '' })}
                className={`text-left text-sm py-2 px-2 rounded-lg transition-all ${
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
                  className={`text-left text-sm py-2 px-2 rounded-lg transition-all ${
                    filters.brand === b
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </AccordionContent>
        )}
      </div>

      {/* Price Slider Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <AccordionHeader title="Max Price" section="price" />
        {expandedSections.price && (
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-600">Price Range</span>
                <span className="text-sm font-bold text-neutral-900">
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
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-semibold">
                <span>₹1,000</span>
                <span>{formatCurrency(maxPossiblePrice)}</span>
              </div>
            </div>
          </AccordionContent>
        )}
      </div>

      {/* Rating Filter Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <AccordionHeader title="Rating" section="rating" />
        {expandedSections.rating && (
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {ratings.map((rate) => (
                <button
                  key={rate}
                  onClick={() => updateFilter({ minRating: rate })}
                  className={`flex items-center gap-2 text-left text-sm py-2 px-2 rounded-lg transition-all ${
                    filters.minRating === rate
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {rate === 0 ? (
                    <span>All Ratings</span>
                  ) : (
                    <>
                      <span className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: rate }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                        {Array.from({ length: 5 - rate }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-neutral-300" />
                        ))}
                      </span>
                      <span className="text-xs font-medium">({rate}.0+)</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </AccordionContent>
        )}
      </div>

      {/* Availability Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <AccordionHeader title="Availability" section="availability" />
        {expandedSections.availability && (
          <AccordionContent>
            <label className="flex items-center gap-3 cursor-pointer group py-2 px-2">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => updateFilter({ inStockOnly: e.target.checked })}
                className="h-4 w-4 rounded-lg border-neutral-300 text-neutral-900 focus:ring-neutral-900 focus:ring-offset-0 cursor-pointer accent-neutral-900"
              />
              <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                In Stock Only
              </span>
            </label>
          </AccordionContent>
        )}
      </div>
    </div>
  );
};
