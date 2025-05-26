
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useOnboardingNavigation } from './onboarding/useOnboardingNavigation';
import { useOnboardingAutoSave } from './onboarding/useOnboardingAutoSave';
import { useAsyncOperation } from './useAsyncOperation';
import { useCallback } from 'react';

export const useOnboardingWizard = (isArabic: boolean) => {
  const { data, updateData, saveData, loading: dataLoading, saving } = useOnboardingData();
  const { execute: executeAsync, loading: operationLoading, error: operationError, reset } = useAsyncOperation();
  
  const {
    currentStep,
    isNavigating,
    error: navigationError,
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

  // Combined loading and error states
  const isLoading = dataLoading || operationLoading || isNavigating;
  const isSaving = saving || operationLoading;
  const combinedError = navigationError || operationError;

  return {
    currentStep,
    isNavigating,
    error: combinedError,
    data,
    updateData,
    loading: isLoading,
    saving: isSaving,
    handleNext,
    handlePrevious: handlePreviousEnhanced,
    handleStepClick: handleStepClickEnhanced,
    setError: (error: string | null) => {
      setError(error);
      if (!error) reset();
    },
    reset
  };
};
