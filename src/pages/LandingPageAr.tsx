
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LandingPage from './LandingPage';

const LandingPageArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
    // Set document direction
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLanguage]);

  return (
    <div className="rtl arabic-text" dir="rtl">
      <LandingPage />
    </div>
  );
};

const LandingPageAr: React.FC = () => {
  return (
    <LanguageProvider>
      <LandingPageArContent />
    </LanguageProvider>
  );
};

export default LandingPageAr;
