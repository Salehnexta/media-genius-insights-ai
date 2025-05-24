
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useToast } from '@/hooks/use-toast';

export const useOnboardingWizard = (isArabic: boolean) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data, updateData, saveData, loading, saving } = useOnboardingData();
  
  // Use refs to prevent stale closures and memory leaks
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Memoized save function to prevent unnecessary re-renders
  const memoizedSaveData = useCallback(async () => {
    if (!isMountedRef.current) return false;
    
    try {
      return await saveData();
    } catch (error) {
      console.error('Save error:', error);
      setError(isArabic ? 'خطأ في حفظ البيانات' : 'Error saving data');
      return false;
    }
  }, [saveData, isArabic]);

  // Auto-save with proper cleanup and error handling
  useEffect(() => {
    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    // Only auto-save if we have meaningful data and component is mounted
    if (!data || !isMountedRef.current) return;
    
    const hasData = data.skillLevel || data.businessName || data.website || 
                   (data.socialAccounts && Object.keys(data.socialAccounts).length > 0) ||
                   (data.competitors && data.competitors.length > 0) ||
                   (data.goals && data.goals.length > 0);

    if (!hasData) return;

    const timer = setTimeout(async () => {
      if (!isMountedRef.current) return;
      
      console.log('Auto-saving onboarding data...');
      try {
        await memoizedSaveData();
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000);

    autoSaveTimerRef.current = timer;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, memoizedSaveData]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  }, []);

  const handleNext = useCallback(async (totalSteps: number) => {
    if (isNavigating || !isMountedRef.current) return;
    
    console.log('=== HANDLE NEXT DEBUG ===');
    console.log('Current step:', currentStep);
    console.log('Total steps:', totalSteps);
    console.log('Is final step:', currentStep === totalSteps - 1);
    
    setIsNavigating(true);
    setError(null);
    
    try {
      if (currentStep < totalSteps - 1) {
        // Save current data before proceeding to next step
        const saved = await memoizedSaveData();
        if (!saved) {
          throw new Error(isArabic ? 'فشل في حفظ البيانات' : 'Failed to save data');
        }
        
        setCurrentStep(prev => prev + 1);
      } else {
        // This is the final step - complete onboarding
        console.log('Completing onboarding...');
        console.log('Current data before completion:', data);
        
        // Mark onboarding as complete
        const completedData = { ...data, completed: true };
        console.log('Data with completion status:', completedData);
        
        // Update local state first
        updateData(completedData);
        
        // Save with completion status
        console.log('Saving completed onboarding data...');
        const finalSaved = await memoizedSaveData();
        console.log('Final save result:', finalSaved);
        
        if (finalSaved) {
          console.log('Onboarding completed successfully, navigating to dashboard');
          toast({
            title: isArabic ? 'تم الانتهاء!' : 'Completed!',
            description: isArabic ? 'تم إكمال الإعداد بنجاح' : 'Onboarding completed successfully',
          });
          
          // Navigate to dashboard with replace to prevent back navigation
          navigate('/', { replace: true });
        } else {
          throw new Error(isArabic ? 'فشل في إكمال الإعداد' : 'Failed to complete onboarding');
        }
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      const errorMessage = error instanceof Error ? error.message : 
        (isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
      
      setError(errorMessage);
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      if (isMountedRef.current) {
        setIsNavigating(false);
      }
    }
  }, [currentStep, memoizedSaveData, data, updateData, navigate, isNavigating, isArabic, toast]);

  const handlePrevious = useCallback(() => {
    if (isNavigating || currentStep === 0) return;
    
    setCurrentStep(prev => prev - 1);
    setError(null);
  }, [currentStep, isNavigating]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (isNavigating || stepIndex > currentStep || stepIndex < 0) return;
    
    setCurrentStep(stepIndex);
    setError(null);
  }, [currentStep, isNavigating]);

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
