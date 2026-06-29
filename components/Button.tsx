import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm border border-neutral-900',
    secondary:
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-transparent',
    outline:
      'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-50',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
    ghost:
      'bg-transparent text-neutral-700 hover:bg-neutral-100 border border-transparent',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-5 py-2.5 h-10',
    lg: 'text-base px-8 py-3.5 h-12',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
