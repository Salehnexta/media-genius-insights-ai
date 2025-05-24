
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Pricing from './Pricing';

const PricingArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
  }, [setLanguage]);

  return <Pricing />;
};

const PricingAr: React.FC = () => {
  return (
    <LanguageProvider>
      <PricingArContent />
    </LanguageProvider>
  );
};

export default PricingAr;
