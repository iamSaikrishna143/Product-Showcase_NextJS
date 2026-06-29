import React from 'react';
import { cn } from '../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors';

  const variants = {
    primary: 'bg-neutral-900 text-white',
    secondary: 'bg-neutral-100 text-neutral-800',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    danger: 'bg-red-50 text-red-700 border border-red-200/50',
    info: 'bg-blue-50 text-blue-700 border border-blue-200/50',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};
