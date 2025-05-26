
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface EnhancedSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  variant?: 'text' | 'card' | 'table' | 'form';
}

const EnhancedSkeleton: React.FC<EnhancedSkeletonProps> = ({
  className,
  lines = 3,
  showAvatar = false,
  variant = 'text'
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const renderTextSkeleton = () => (
    <div className={cn("space-y-3", isArabic && "rtl", className)}>
      {showAvatar && (
        <div className={cn("flex items-center gap-3", isArabic && "flex-row-reverse")}>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === 0 ? "w-full" : i === lines - 1 ? "w-3/4" : "w-5/6"
          )}
        />
      ))}
    </div>
  );

  const renderCardSkeleton = () => (
    <div className={cn("p-6 space-y-4", isArabic && "rtl", className)}>
      <div className={cn("flex items-center gap-3", isArabic && "flex-row-reverse")}>
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className={cn("space-y-3", isArabic && "rtl", className)}>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-6" />
          ))}
        </div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className={cn("space-y-6", isArabic && "rtl", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className={cn("flex gap-3", isArabic && "flex-row-reverse")}>
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );

  switch (variant) {
    case 'card':
      return renderCardSkeleton();
    case 'table':
      return renderTableSkeleton();
    case 'form':
      return renderFormSkeleton();
    default:
      return renderTextSkeleton();
  }
};

export default EnhancedSkeleton;
