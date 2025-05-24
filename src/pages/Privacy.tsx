
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PrivacyHeader />
          
          <div className="space-y-8">
            <InformationCollectionSection />
            <DataUsageSection />
            <AIDataSection />
            <DataSharingSection />
            <DataProtectionSection />
            <SecuritySection />
            <DataRetentionSection />
            <UserRightsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
