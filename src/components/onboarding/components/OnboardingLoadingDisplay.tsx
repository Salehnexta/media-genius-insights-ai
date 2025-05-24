
import React from 'react';

interface OnboardingLoadingDisplayProps {
  isArabic: boolean;
}

const OnboardingLoadingDisplay: React.FC<OnboardingLoadingDisplayProps> = ({ isArabic }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default OnboardingLoadingDisplay;
