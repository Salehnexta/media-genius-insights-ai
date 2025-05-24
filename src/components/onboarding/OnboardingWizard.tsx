
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboardingData } from '@/hooks/useOnboardingData';

import SkillAssessment from './steps/SkillAssessment';
import BusinessInfo from './steps/BusinessInfo';
import WebsiteAnalysis from './steps/WebsiteAnalysis';
import SocialMediaSetup from './steps/SocialMediaSetup';
import CompetitorAnalysis from './steps/CompetitorAnalysis';
import StrategySetup from './steps/StrategySetup';

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
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, saveData, loading, saving } = useOnboardingData();

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

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Auto-save data when it changes
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (data && (data.skillLevel || data.businessName || data.website)) {
        saveData();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(saveTimer);
  }, [data, saveData]);

  const handleNext = async () => {
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
      await updateData({ completed: true });
      const finalSave = await saveData();
      if (finalSave) {
        navigate('/');
      }
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

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Skills
        return data.skillLevel && data.experience;
      case 1: // Business
        return data.businessName && data.industry;
      case 2: // Website
        return true; // Website is optional
      case 3: // Social
        return true; // Social media is optional
      case 4: // Competitors
        return true; // Competitors are optional
      case 5: // Strategy
        return data.goals && data.goals.length > 0;
      default:
        return true;
    }
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep].component;
    return (
      <StepComponent
        data={data}
        updateData={updateData}
        isArabic={isArabic}
      />
    );
  };

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
          {/* Header with Language Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className={`text-center flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isArabic ? 'إعداد منصة التسويق الذكي' : 'AI Marketing Platform Setup'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isArabic ? 'دعنا نخصص تجربتك للحصول على أفضل النتائج' : 'Let\'s customize your experience for the best results'}
              </p>
            </div>
            
            {/* Language Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className={`flex items-center gap-2 ${isArabic ? 'ml-4' : 'mr-4'}`}
            >
              <Globe className="h-4 w-4" />
              {isArabic ? 'English' : 'عربي'}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isArabic ? 'التقدم' : 'Progress'}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
            <Progress value={progress} className={`h-2 ${isArabic ? 'transform scale-x-[-1]' : ''}`} />
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className={`flex gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  disabled={index > currentStep}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors disabled:cursor-not-allowed ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : index < currentStep
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className={`text-xl ${isArabic ? 'text-right' : 'text-left'}`}>
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getCurrentStepComponent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <ChevronLeft className="h-4 w-4" />
              {isArabic ? 'السابق' : 'Previous'}
            </Button>

            <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              {saving && (
                <span className="text-sm text-gray-500">
                  {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                </span>
              )}
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || saving}
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                {currentStep === steps.length - 1 
                  ? (isArabic ? 'إنهاء الإعداد' : 'Complete Setup')
                  : (isArabic ? 'التالي' : 'Next')
                }
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Debug Info:</h3>
              <pre className="text-xs text-gray-600 dark:text-gray-300">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
