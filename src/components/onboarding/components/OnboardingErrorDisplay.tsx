
import React from 'react';

interface OnboardingErrorDisplayProps {
  error: string;
  isArabic: boolean;
  onRetry: () => void;
}

const OnboardingErrorDisplay: React.FC<OnboardingErrorDisplayProps> = ({
  error,
  isArabic,
  onRetry
}) => {
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
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {isArabic ? 'إعادة المحاولة' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingErrorDisplay;
