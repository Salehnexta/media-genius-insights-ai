
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboardingData } from '@/hooks/useOnboardingData';

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
  const isArabic = language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, saveData, loading, saving } = useOnboardingData();
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

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

  // Auto-save data when it changes (with debouncing)
  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    const timer = setTimeout(() => {
      if (data && (data.skillLevel || data.businessName || data.website)) {
        console.log('Auto-saving onboarding data...');
        saveData();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    setAutoSaveTimer(timer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, saveData]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  const handleNext = async () => {
    console.log('Handling next step from:', currentStep);
    
    // Save current data before proceeding
    const saved = await saveData();
    if (!saved) {
      console.error('Failed to save data');
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete and save
      console.log('Completing onboarding...');
      updateData({ completed: true });
      
      // Give a small delay to ensure state is updated
      setTimeout(async () => {
        const finalSave = await saveData();
        if (finalSave) {
          console.log('Onboarding completed successfully, navigating to dashboard');
          navigate('/');
        }
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow navigation to completed or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const isStepValid = () => validateStep(currentStep, data);

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

          <OnboardingContent
            stepTitle={steps[currentStep].title}
            stepComponent={steps[currentStep].component}
            data={data}
            updateData={updateData}
            isArabic={isArabic}
          />

          <OnboardingControls
            currentStep={currentStep}
            totalSteps={steps.length}
            isStepValid={isStepValid()}
            saving={saving}
            isArabic={isArabic}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
