
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LandingPage from './LandingPage';

const LandingPageArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
  }, [setLanguage]);

  return <LandingPage />;
};

const LandingPageAr: React.FC = () => {
  return (
    <LanguageProvider>
      <LandingPageArContent />
    </LanguageProvider>
  );
};

export default LandingPageAr;
