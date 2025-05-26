
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
}

const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({ children }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div 
      className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col ${isArabic ? 'rtl arabic-text' : 'ltr'}`} 
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={language}
    >
      {children}
    </div>
  );
};

export default DashboardLayoutWrapper;
