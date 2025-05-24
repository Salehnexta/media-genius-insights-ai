
import React from 'react';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Onboarding: React.FC = () => {
  return (
    <LanguageProvider>
      <OnboardingWizard />
    </LanguageProvider>
  );
};

export default Onboarding;
