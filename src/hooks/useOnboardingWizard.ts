
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useOnboardingNavigation } from './onboarding/useOnboardingNavigation';
import { useOnboardingAutoSave } from './onboarding/useOnboardingAutoSave';
import { useLoadingState } from './useLoadingState';
import { useCallback } from 'react';

export const useOnboardingWizard = (isArabic: boolean) => {
  const { data, updateData, saveData, loading: dataLoading, saving } = useOnboardingData();
  const { executeAsync, ...loadingState } = useLoadingState();
  
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

  // Enhanced next handler with better error handling
  const handleNext = useCallback((totalSteps: number) => {
    return executeAsync(async () => {
      return await navigationHandleNext(totalSteps, memoizedSaveData, data, updateData);
    });
  }, [navigationHandleNext, memoizedSaveData, data, updateData, executeAsync]);

  // Enhanced step click handler
  const handleStepClickEnhanced = useCallback((step: number) => {
    return executeAsync(async () => {
      return handleStepClick(step);
    });
  }, [handleStepClick, executeAsync]);

  // Enhanced previous handler
  const handlePreviousEnhanced = useCallback(() => {
    return executeAsync(async () => {
      return handlePrevious();
    });
  }, [handlePrevious, executeAsync]);

  // Combined loading state
  const isLoading = dataLoading || loading || isNavigating;
  const isSaving = saving || loadingState.loading;

  return {
    currentStep,
    isNavigating,
    error: error || loadingState.error,
    data,
    updateData,
    loading: isLoading,
    saving: isSaving,
    success: loadingState.success,
    handleNext,
    handlePrevious: handlePreviousEnhanced,
    handleStepClick: handleStepClickEnhanced,
    setError: (error: string | null) => {
      setError(error);
      loadingState.setError(error);
    },
    reset: loadingState.reset
  };
};
