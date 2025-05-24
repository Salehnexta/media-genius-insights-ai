
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import PrivacyHeader from '@/components/privacy/PrivacyHeader';
import InformationCollectionSection from '@/components/privacy/InformationCollectionSection';
import DataUsageSection from '@/components/privacy/DataUsageSection';
import DataSharingSection from '@/components/privacy/DataSharingSection';
import DataProtectionSection from '@/components/privacy/DataProtectionSection';
import UserRightsSection from '@/components/privacy/UserRightsSection';
import AIDataSection from '@/components/privacy/AIDataSection';
import DataRetentionSection from '@/components/privacy/DataRetentionSection';
import SecuritySection from '@/components/privacy/SecuritySection';
import ContactSection from '@/components/privacy/ContactSection';

const Privacy = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={false} toggleDarkMode={() => {}} />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <PrivacyHeader />
        <InformationCollectionSection />
        <DataUsageSection />
        <DataSharingSection />
        <DataProtectionSection />
        <UserRightsSection />
        <AIDataSection />
        <DataRetentionSection />
        <SecuritySection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Privacy;
