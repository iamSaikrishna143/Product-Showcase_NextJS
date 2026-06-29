'use client';

import { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { getDiscountedPrice } from '../lib/utils';

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: string; // 'price-low-high' | 'price-high-low' | 'newest' | 'rating'
  page: number;
}

const ITEMS_PER_PAGE = 6;

export function useProducts() {
  const allProducts = useMemo(() => productService.getProducts(), []);
  const categories = useMemo(() => productService.getCategories(), []);
  const brands = useMemo(() => productService.getBrands(), []);

  // Compute maximum price of all products to set as initial limit
  const maxPossiblePrice = useMemo(() => {
    return Math.max(...allProducts.map((p) => p.price), 50000);
  }, [allProducts]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    brand: '',
    maxPrice: maxPossiblePrice,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'newest',
    page: 1,
  });

  const updateFilter = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset page to 1 when any search/filter parameter changes (unless page itself was updated)
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      maxPrice: maxPossiblePrice,
      minRating: 0,
      inStockOnly: false,
      sortBy: 'newest',
      page: 1,
    });
  };

  // Filter and sort computation
  const { filteredProducts, totalPages, paginatedProducts } = useMemo(() => {
    let result = [...allProducts];

    // 1. Search filter (case-insensitive title, brand, or description)
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // 3. Brand filter
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // 4. Max Price filter (using discounted price, which is actual price user pays)
    result = result.filter((p) => {
      const actualPrice = getDiscountedPrice(p.price, p.discount);
      return actualPrice <= filters.maxPrice;
    });

    // 5. Min Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // 6. In stock only filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // 7. Sort logic
    result.sort((a, b) => {
      const aActualPrice = getDiscountedPrice(a.price, a.discount);
      const bActualPrice = getDiscountedPrice(b.price, b.discount);

      switch (filters.sortBy) {
        case 'price-low-high':
          return aActualPrice - bActualPrice;
        case 'price-high-low':
          return bActualPrice - aActualPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          // In static data, we assume order is newest or sort by ID length / other factors.
          // Let's sort by title or id for stable sorting if no real dates exist.
          return a.title.localeCompare(b.title);
      }
    });

    const total = result.length;
    const totalPagesCount = Math.max(Math.ceil(total / ITEMS_PER_PAGE), 1);
    
    // Paginate
    const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
    const paginated = result.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return {
      filteredProducts: result,
      totalPages: totalPagesCount,
      paginatedProducts: paginated,
    };
  }, [allProducts, filters, maxPossiblePrice]);

  return {
    allProducts,
    categories,
    brands,
    filters,
    filteredProducts,
    paginatedProducts,
    totalPages,
    updateFilter,
    resetFilters,
    maxPossiblePrice,
    itemsPerPage: ITEMS_PER_PAGE,
  };
}
