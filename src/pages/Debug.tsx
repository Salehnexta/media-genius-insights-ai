
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DatabaseDebugger from '@/components/debug/DatabaseDebugger';
import Header from '@/components/layout/Header';

const Debug = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'صفحة التشخيص' : 'Debug Page'}
          </h1>
          <p className={`text-gray-600 mt-2 ${isArabic ? 'text-right' : ''}`}>
            {isArabic 
              ? 'فحص وتشخيص حالة قاعدة البيانات والمصادقة' 
              : 'Test and diagnose database and authentication status'
            }
          </p>
        </div>
        <DatabaseDebugger />
      </main>
    </div>
  );
};

export default Debug;
