
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Subscription from './Subscription';

const SubscriptionArContent: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  useEffect(() => {
    setLanguage('ar');
  }, [setLanguage]);

  return <Subscription />;
};

const SubscriptionAr: React.FC = () => {
  return (
    <LanguageProvider>
      <SubscriptionArContent />
    </LanguageProvider>
  );
};

export default SubscriptionAr;
