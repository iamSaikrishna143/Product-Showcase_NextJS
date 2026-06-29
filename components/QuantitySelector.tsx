import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  max,
  onChange,
  className,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className={cn('inline-flex items-center rounded-full border border-neutral-200 bg-white p-1 shadow-xs', className)}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
        type="button"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-10 text-center text-sm font-bold text-neutral-800" aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
        type="button"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
