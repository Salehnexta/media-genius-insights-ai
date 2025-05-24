
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PrivacyHeader from '@/components/privacy/PrivacyHeader';
import DataProtectionSection from '@/components/privacy/DataProtectionSection';
import InformationCollectionSection from '@/components/privacy/InformationCollectionSection';
import DataUsageSection from '@/components/privacy/DataUsageSection';
import DataSharingSection from '@/components/privacy/DataSharingSection';
import UserRightsSection from '@/components/privacy/UserRightsSection';
import SecuritySection from '@/components/privacy/SecuritySection';
import ContactSection from '@/components/privacy/ContactSection';

const Privacy: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  // Check if user came from Arabic path and set language accordingly
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'ar') {
      setLanguage('ar');
    }
  }, [setLanguage]);

  return (
    <div className={`container mx-auto px-4 py-8 ${isArabic ? 'rtl' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <PrivacyHeader />
        
        <div className="space-y-6">
          <DataProtectionSection />
          <InformationCollectionSection />
          <DataUsageSection />
          <DataSharingSection />
          <UserRightsSection />
          <SecuritySection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Privacy;
