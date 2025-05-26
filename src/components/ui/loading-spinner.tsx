
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  text,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const variantClasses = {
    default: 'text-gray-600 dark:text-gray-300',
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-purple-600 dark:text-purple-400'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <Loader2 className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant]
      )} />
      {text && (
        <p className={cn(
          'text-sm',
          variantClasses[variant]
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
