import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-500"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'flex w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 transition-all duration-300 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 font-medium" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
