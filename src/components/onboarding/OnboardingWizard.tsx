
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import SkillAssessment from './steps/SkillAssessment';
import BusinessInfo from './steps/BusinessInfo';
import WebsiteAnalysis from './steps/WebsiteAnalysis';
import SocialMediaSetup from './steps/SocialMediaSetup';
import CompetitorAnalysis from './steps/CompetitorAnalysis';
import StrategySetup from './steps/StrategySetup';

export interface OnboardingData {
  skillLevel: string;
  experience: string;
  businessName: string;
  industry: string;
  website: string;
  socialAccounts: Record<string, string>;
  competitors: string[];
  goals: string[];
  budget: string;
}

const OnboardingWizard: React.FC = () => {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    skillLevel: '',
    experience: '',
    businessName: '',
    industry: '',
    website: '',
    socialAccounts: {},
    competitors: [],
    goals: [],
    budget: ''
  });

  const steps = [
    { id: 'skill', title: t('onboarding.skill.title'), component: SkillAssessment },
    { id: 'business', title: t('onboarding.business.title'), component: BusinessInfo },
    { id: 'website', title: t('onboarding.website.title'), component: WebsiteAnalysis },
    { id: 'social', title: t('onboarding.social.title'), component: SocialMediaSetup },
    { id: 'competitors', title: t('onboarding.competitors.title'), component: CompetitorAnalysis },
    { id: 'strategy', title: t('onboarding.strategy.title'), component: StrategySetup }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Onboarding completed:', data);
    // Here we would save the data and redirect to dashboard
  };

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 ${isArabic ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('onboarding.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`flex items-center justify-between mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('onboarding.step').replace('{{current}}', (currentStep + 1).toString()).replace('{{total}}', steps.length.toString())}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progress)}% {t('onboarding.complete')}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className={`flex justify-between mt-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${isArabic ? 'text-center' : 'text-center'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-xs mt-2 text-gray-600 dark:text-gray-400 hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {steps[currentStep].title}
            </h2>
            
            <CurrentStepComponent
              data={data}
              updateData={updateData}
              isArabic={isArabic}
            />
          </div>

          {/* Navigation */}
          <div className={`flex justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={isArabic ? 'flex-row-reverse' : ''}
            >
              <ArrowLeft className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {t('onboarding.previous')}
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleComplete}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                {t('onboarding.complete')}
                <CheckCircle className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className={isArabic ? 'flex-row-reverse' : ''}
              >
                {t('onboarding.next')}
                <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
