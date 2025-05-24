
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  isArabic: boolean;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  isArabic 
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isArabic ? 'التقدم' : 'Progress'}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      <Progress value={progress} className={`h-2 ${isArabic ? 'transform scale-x-[-1]' : ''}`} />
    </div>
  );
};

export default OnboardingProgress;
