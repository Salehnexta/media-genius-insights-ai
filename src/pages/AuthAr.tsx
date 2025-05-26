
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Auth from './Auth';

const AuthArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
    // Set document direction
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLanguage]);

  return (
    <div className="rtl arabic-text" dir="rtl">
      <Auth />
    </div>
  );
};

const AuthAr: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthArContent />
    </LanguageProvider>
  );
};

export default AuthAr;
