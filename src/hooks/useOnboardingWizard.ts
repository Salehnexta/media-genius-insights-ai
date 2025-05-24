
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useOnboardingNavigation } from './onboarding/useOnboardingNavigation';
import { useOnboardingAutoSave } from './onboarding/useOnboardingAutoSave';

export const useOnboardingWizard = (isArabic: boolean) => {
  const { data, updateData, saveData, loading, saving } = useOnboardingData();
  
  const {
    currentStep,
    isNavigating,
    error,
    setError,
    handleNext: navigationHandleNext,
    handlePrevious,
    handleStepClick
  } = useOnboardingNavigation(isArabic);

  const { memoizedSaveData } = useOnboardingAutoSave(data, saveData, saving);

  // Wrapper for handleNext that provides the necessary dependencies
  const handleNext = (totalSteps: number) => {
    return navigationHandleNext(totalSteps, memoizedSaveData, data, updateData);
  };

  return {
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
  };
};
