
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ui/error-boundary';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  showErrorBoundary?: boolean;
}

const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({ 
  children, 
  showErrorBoundary = true 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = (
    <div 
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col ${isArabic ? 'rtl arabic-text' : 'ltr'}`} 
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={language}
    >
      {children}
    </div>
  );

  if (showErrorBoundary) {
    return (
      <ErrorBoundary isArabic={isArabic}>
        {content}
      </ErrorBoundary>
    );
  }

  return content;
};

export default DashboardLayoutWrapper;
