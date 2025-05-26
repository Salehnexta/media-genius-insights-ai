
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  showNumbers?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  label?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  showNumbers = true,
  showPercentage = false,
  size = 'md',
  variant = 'default',
  className,
  label
}) => {
  const percentage = Math.round((current / total) * 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{label}</span>
          {showNumbers && (
            <span className="text-muted-foreground">
              {current} / {total}
            </span>
          )}
          {showPercentage && (
            <span className="text-muted-foreground">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <Progress 
        value={percentage} 
        className={cn(sizeClasses[size])}
        // Note: Progress component styling will need to be enhanced to support variants
      />
    </div>
  );
};

export default ProgressIndicator;
