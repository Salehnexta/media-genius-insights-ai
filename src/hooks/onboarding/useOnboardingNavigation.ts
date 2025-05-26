
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
        // Save current data before moving to next step
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
        
        // Mark onboarding as completed with timestamps
        const completedData = { 
          ...data, 
          completed: true,
          completed_at: new Date().toISOString()
        };
        console.log('Data with completion status:', completedData);
        
        // Update local state first
        updateData(completedData);
        
        // Save completed data
        console.log('=== SAVING COMPLETED DATA ===');
        const finalSaved = await saveFunction();
        console.log('Final save result:', finalSaved);
        
        if (finalSaved) {
          console.log('✅ Onboarding completed successfully, navigating to dashboard');
          
          // Show success message
          toast({
            title: isArabic ? 'تم الانتهاء!' : 'Completed!',
            description: isArabic ? 'تم إكمال الإعداد بنجاح. مرحباً بك في مورفو!' : 'Setup completed successfully. Welcome to Morpho!',
          });
          
          // Direct navigation to dashboard
          setTimeout(() => {
            console.log('🚀 Redirecting to dashboard...');
            navigate('/', { replace: true });
          }, 1500);
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
