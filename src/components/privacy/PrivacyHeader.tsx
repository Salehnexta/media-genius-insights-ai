
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyHeader: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {isArabic 
          ? `آخر تحديث: ${new Date().toLocaleDateString('ar-SA')}`
          : `Last updated: ${new Date().toLocaleDateString()}`
        }
      </p>
    </div>
  );
};

export default PrivacyHeader;
