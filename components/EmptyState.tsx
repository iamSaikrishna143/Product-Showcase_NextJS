import React from 'react';
import { Button } from './Button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-50 mb-6 text-neutral-400">
          <Icon className="w-8 h-8 stroke-[1.5]" />
        </div>
      )}
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm mb-8 leading-relaxed">{description}</p>
      {actionLabel && onActionClick && (
        <Button onClick={onActionClick} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
