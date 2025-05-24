import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useOnboardingNavigation = (isArabic: boolean) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = useCallback(async (
    totalSteps: number,
    saveFunction: () => Promise<boolean>,
    data: any,
    updateData: (updates: any) => void
  ) => {
    if (isNavigating) return;
    
    console.log('=== HANDLE NEXT DEBUG ===');
    console.log('Current step:', currentStep);
    console.log('Total steps:', totalSteps);
    console.log('Is final step:', currentStep === totalSteps - 1);
    
    setIsNavigating(true);
    setError(null);
    
    try {
      if (currentStep < totalSteps - 1) {
        // Save current data before proceeding to next step
        const saved = await saveFunction();
        if (!saved) {
          throw new Error(isArabic ? 'فشل في حفظ البيانات' : 'Failed to save data');
        }
        
        setCurrentStep(prev => prev + 1);
        setIsNavigating(false);
      } else {
        // This is the final step - complete onboarding
        console.log('=== COMPLETING ONBOARDING ===');
        console.log('Current data before completion:', data);
        
        // Mark onboarding as complete - this is the critical fix
        const completedData = { 
          ...data, 
          completed: true,
          // Also set a completion timestamp for immediate use
          completedAt: new Date().toISOString()
        };
        console.log('Data with completion status:', completedData);
        console.log('completedData.completed:', completedData.completed, typeof completedData.completed);
        
        // Update local state first
        updateData(completedData);
        
        // Save the completed data
        console.log('=== SAVING COMPLETED DATA ===');
        console.log('About to call saveFunction with completed data...');
        const finalSaved = await saveFunction();
        console.log('Final save result:', finalSaved);
        
        if (finalSaved) {
          console.log('Onboarding completed successfully, navigating to dashboard');
          toast({
            title: isArabic ? 'تم الانتهاء!' : 'Completed!',
            description: isArabic ? 'تم إكمال الإعداد بنجاح' : 'Onboarding completed successfully',
          });
          
          // Force navigation with a slight delay to ensure save is processed
          setTimeout(() => {
            console.log('Forcing navigation to dashboard...');
            navigate('/', { replace: true });
            // Also force a page reload to clear any cached state
            window.location.href = '/';
          }, 1000);
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
      setIsNavigating(false);
    }
  }, [currentStep, isNavigating, isArabic, toast, navigate]);

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
    setError,
    handleNext,
    handlePrevious,
    handleStepClick
  };
};
