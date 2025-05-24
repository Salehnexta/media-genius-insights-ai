
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboardingWizard } from '@/hooks/useOnboardingWizard';
import { getOnboardingSteps } from './config/onboardingSteps';
import { validateStep } from './components/OnboardingStepValidation';

import OnboardingHeader from './components/OnboardingHeader';
import OnboardingProgress from './components/OnboardingProgress';
import OnboardingNavigation from './components/OnboardingNavigation';
import OnboardingContent from './components/OnboardingContent';
import OnboardingControls from './components/OnboardingControls';
import OnboardingDebugPanel from './components/OnboardingDebugPanel';
import OnboardingErrorDisplay from './components/OnboardingErrorDisplay';
import OnboardingLoadingDisplay from './components/OnboardingLoadingDisplay';

export interface OnboardingData {
  skillLevel?: string;
  experience?: string;
  businessName?: string;
  industry?: string;
  website?: string;
  socialAccounts?: { [key: string]: string };
  competitors?: string[];
  goals?: string[];
  budget?: string;
  completed?: boolean;
}

const OnboardingWizard: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';
  
  const {
    currentStep,
    isNavigating,
    error,
    data,
    updateData,
    loading,
    saving,
    handleNext,
    handlePrevious,
    handleStepClick,
    setError
  } = useOnboardingWizard(isArabic);

  const steps = getOnboardingSteps(isArabic);

  const isStepValid = () => {
    try {
      return validateStep(currentStep, data || {});
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return <OnboardingLoadingDisplay isArabic={isArabic} />;
  }

  // Error state
  if (error) {
    return (
      <OnboardingErrorDisplay 
        error={error} 
        isArabic={isArabic} 
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <OnboardingHeader 
            isArabic={isArabic}
            toggleLanguage={toggleLanguage}
          />

          <OnboardingProgress 
            currentStep={currentStep}
            totalSteps={steps.length}
            isArabic={isArabic}
          />

          <OnboardingNavigation 
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          {data && (
            <OnboardingContent
              stepTitle={steps[currentStep].title}
              stepComponent={steps[currentStep].component}
              data={data}
              updateData={updateData}
              isArabic={isArabic}
            />
          )}

          <OnboardingControls
            currentStep={currentStep}
            totalSteps={steps.length}
            isStepValid={isStepValid()}
            saving={saving || isNavigating}
            isArabic={isArabic}
            onPrevious={handlePrevious}
            onNext={() => handleNext(steps.length)}
          />

          <OnboardingDebugPanel
            currentStep={currentStep}
            totalSteps={steps.length}
            dataCompleted={data?.completed}
            saving={saving}
            isNavigating={isNavigating}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
