import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useToast } from '@/hooks/use-toast';

import SkillAssessment from './steps/SkillAssessment';
import BusinessInfo from './steps/BusinessInfo';
import WebsiteAnalysis from './steps/WebsiteAnalysis';
import SocialMediaSetup from './steps/SocialMediaSetup';
import CompetitorAnalysis from './steps/CompetitorAnalysis';
import StrategySetup from './steps/StrategySetup';

import OnboardingHeader from './components/OnboardingHeader';
import OnboardingProgress from './components/OnboardingProgress';
import OnboardingNavigation from './components/OnboardingNavigation';
import OnboardingContent from './components/OnboardingContent';
import OnboardingControls from './components/OnboardingControls';
import { validateStep } from './components/OnboardingStepValidation';

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data, updateData, saveData, loading, saving } = useOnboardingData();
  
  // Use refs to prevent stale closures and memory leaks
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  
  const steps = [
    {
      id: 'skills',
      title: isArabic ? 'تقييم المهارات' : 'Skill Assessment',
      component: SkillAssessment
    },
    {
      id: 'business',
      title: isArabic ? 'معلومات العمل' : 'Business Information',
      component: BusinessInfo
    },
    {
      id: 'website',
      title: isArabic ? 'تحليل الموقع' : 'Website Analysis',
      component: WebsiteAnalysis
    },
    {
      id: 'social',
      title: isArabic ? 'وسائل التواصل' : 'Social Media',
      component: SocialMediaSetup
    },
    {
      id: 'competitors',
      title: isArabic ? 'تحليل المنافسين' : 'Competitor Analysis',
      component: CompetitorAnalysis
    },
    {
      id: 'strategy',
      title: isArabic ? 'إعداد الاستراتيجية' : 'Strategy Setup',
      component: StrategySetup
    }
  ];

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

  const handleNext = useCallback(async () => {
    if (isNavigating || !isMountedRef.current) return;
    
    console.log('=== HANDLE NEXT DEBUG ===');
    console.log('Current step:', currentStep);
    console.log('Total steps:', steps.length);
    console.log('Is final step:', currentStep === steps.length - 1);
    
    setIsNavigating(true);
    setError(null);
    
    try {
      if (currentStep < steps.length - 1) {
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
  }, [currentStep, steps.length, memoizedSaveData, data, updateData, navigate, isNavigating, isArabic, toast]);

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

  const isStepValid = useCallback(() => {
    try {
      return validateStep(currentStep, data || {});
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }, [currentStep, data]);

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {isArabic ? 'حدث خطأ' : 'An Error Occurred'}
            </h2>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isArabic ? 'إعادة المحاولة' : 'Try Again'}
          </button>
        </div>
      </div>
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
            onNext={handleNext}
          />

          {/* Debug Panel */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p>Current Step: {currentStep + 1}/{steps.length}</p>
            <p>Is Final Step: {currentStep === steps.length - 1 ? 'Yes' : 'No'}</p>
            <p>Data Completed: {data?.completed ? 'Yes' : 'No'}</p>
            <p>Saving: {saving ? 'Yes' : 'No'}</p>
            <p>Navigating: {isNavigating ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
