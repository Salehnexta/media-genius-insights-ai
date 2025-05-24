
import React from 'react';

interface OnboardingNavigationProps {
  steps: Array<{ id: string; title: string }>;
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({ 
  steps, 
  currentStep, 
  onStepClick 
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(index)}
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
  );
};

export default OnboardingNavigation;
