
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Auth from './Auth';

const AuthAr: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLanguage]);

  return (
    <div className="min-h-screen" dir="rtl">
      <Auth />
    </div>
  );
};

export default AuthAr;
