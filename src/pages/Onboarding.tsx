
import React from 'react';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { OnboardingErrorBoundary } from '@/components/onboarding/components/OnboardingErrorBoundary';

const Onboarding: React.FC = () => {
  return (
    <LanguageProvider>
      <OnboardingErrorBoundary>
        <OnboardingWizard />
      </OnboardingErrorBoundary>
    </LanguageProvider>
  );
};

export default Onboarding;
