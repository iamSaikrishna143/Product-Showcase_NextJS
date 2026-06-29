'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import { SearchBar } from '../../components/SearchBar';
import { FilterSidebar } from '../../components/FilterSidebar';
import { ProductGrid } from '../../components/ProductGrid';
import { ProductGridSkeleton } from '../../components/Loader';
import { EmptyState } from '../../components/EmptyState';
import { Badge } from '../../components/Badge';
import { SlidersHorizontal, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

function ProductsClientInner() {
  const searchParams = useSearchParams();
  const {
    categories,
    brands,
    filters,
    filteredProducts,
    paginatedProducts,
    totalPages,
    updateFilter,
    resetFilters,
    maxPossiblePrice,
  } = useProducts();

  // Sync query parameters (from Navbar search/categories) to filter state on load
  useEffect(() => {
    const searchVal = searchParams.get('search');
    const categoryVal = searchParams.get('category');
    
    const updates: Record<string, string> = {};
    if (searchVal !== null) updates.search = searchVal;
    if (categoryVal !== null) updates.category = categoryVal;

    if (Object.keys(updates).length > 0) {
      updateFilter(updates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateFilter({ page: newPage });
      // Scroll smoothly to top of products list on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Electronics Catalog
          </h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">
            Showing {filteredProducts.length} devices in total
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => updateFilter({ sortBy: e.target.value })}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 outline-none focus:border-neutral-900 transition-colors"
          >
            <option value="newest">Featured & Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Main Grid Wrapper */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Filters Column (Collapsible Header in mobile) */}
        <aside className="lg:w-1/4 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-neutral-50/30 p-6 rounded-[2rem] border border-neutral-100">
            <FilterSidebar
              categories={categories}
              brands={brands}
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              maxPossiblePrice={maxPossiblePrice}
            />
          </div>
        </aside>

        {/* Right Side: Search and Catalog Cards */}
        <div className="flex-1 space-y-6">
          
          {/* Real-time Search Input */}
          <SearchBar
            value={filters.search}
            onChange={(val) => updateFilter({ search: val })}
          />

          {/* Active Filter Badges */}
          {(filters.category || filters.brand || filters.minRating > 0 || filters.inStockOnly) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mr-1">Active:</span>
              {filters.category && (
                <Badge variant="secondary" className="pr-1">
                  Category: {filters.category}
                  <button onClick={() => updateFilter({ category: '' })} className="ml-1.5 text-[9px] hover:text-neutral-900">✕</button>
                </Badge>
              )}
              {filters.brand && (
                <Badge variant="secondary" className="pr-1">
                  Brand: {filters.brand}
                  <button onClick={() => updateFilter({ brand: '' })} className="ml-1.5 text-[9px] hover:text-neutral-900">✕</button>
                </Badge>
              )}
              {filters.minRating > 0 && (
                <Badge variant="secondary" className="pr-1">
                  Rating: {filters.minRating}+ ★
                  <button onClick={() => updateFilter({ minRating: 0 })} className="ml-1.5 text-[9px] hover:text-neutral-900">✕</button>
                </Badge>
              )}
              {filters.inStockOnly && (
                <Badge variant="secondary" className="pr-1">
                  In Stock Only
                  <button onClick={() => updateFilter({ inStockOnly: false })} className="ml-1.5 text-[9px] hover:text-neutral-900">✕</button>
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid & Loading states */}
          {paginatedProducts.length > 0 ? (
            <div className="space-y-8">
              <ProductGrid products={paginatedProducts} />

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-neutral-100 pt-6">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    type="button"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`h-10 w-10 rounded-full text-sm font-bold transition-all ${
                          filters.page === pageNumber
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : 'border border-transparent hover:bg-neutral-50 text-neutral-600'
                        }`}
                        type="button"
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    type="button"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-neutral-50/50 rounded-[2rem] border border-dashed border-neutral-200 py-12">
              <EmptyState
                icon={Inbox}
                title="No Products Found"
                description="We couldn't find any products matching your search query or filter combination. Try clearing your filters and search keywords."
                actionLabel="Clear All Filters"
                onActionClick={resetFilters}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export function ProductsClient() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8"><ProductGridSkeleton /></div>}>
      <ProductsClientInner />
    </Suspense>
  );
}
