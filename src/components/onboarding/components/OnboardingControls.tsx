
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingControlsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  saving: boolean;
  isArabic: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const OnboardingControls: React.FC<OnboardingControlsProps> = ({ 
  currentStep,
  totalSteps,
  isStepValid,
  saving,
  isArabic,
  onPrevious,
  onNext
}) => {
  return (
    <div className={`flex ${isArabic ? 'flex-row-reverse justify-between' : 'justify-between'} items-center`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`flex items-center ${isArabic ? 'flex-row-reverse gap-2' : 'gap-2'}`}
      >
        {isArabic ? (
          <>
            السابق
            <ChevronRight className="h-4 w-4" />
          </>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </>
        )}
      </Button>

      <div className={`flex items-center ${isArabic ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
        {saving && (
          <span className="text-sm text-gray-500">
            {isArabic ? 'جاري الحفظ...' : 'Saving...'}
          </span>
        )}
        <Button
          onClick={onNext}
          disabled={!isStepValid || saving}
          className={`flex items-center ${isArabic ? 'flex-row-reverse gap-2' : 'gap-2'}`}
        >
          {isArabic ? (
            <>
              {currentStep === totalSteps - 1 ? 'إنهاء الإعداد' : 'التالي'}
              <ChevronLeft className="h-4 w-4" />
            </>
          ) : (
            <>
              {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingControls;
