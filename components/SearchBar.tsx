import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search products by title, brand, or category...',
  className,
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pl-11 pr-10 text-sm text-neutral-800 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
      />
      <Search className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400" />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-3.5 text-neutral-400 hover:text-neutral-600 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
