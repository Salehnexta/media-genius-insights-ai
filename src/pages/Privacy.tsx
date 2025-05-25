
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

          {/* Back to Landing Button */}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => navigate('/landing')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Back to Landing Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
