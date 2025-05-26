
import React from 'react';
import EnhancedSkeleton from '@/components/ui/enhanced-skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface OnboardingLoadingDisplayProps {
  isArabic: boolean;
  step?: string;
  variant?: 'spinner' | 'skeleton' | 'detailed';
}

const OnboardingLoadingDisplay: React.FC<OnboardingLoadingDisplayProps> = ({ 
  isArabic,
  step,
  variant = 'spinner'
}) => {
  const loadingTexts = {
    en: {
      loading: 'Loading...',
      preparing: 'Preparing your onboarding experience...',
      analyzing: 'Analyzing your information...',
      saving: 'Saving your preferences...',
      almostReady: 'Almost ready...'
    },
    ar: {
      loading: 'جاري التحميل...',
      preparing: 'جاري إعداد تجربة الإعداد الأولي...',
      analyzing: 'جاري تحليل معلوماتك...',
      saving: 'جاري حفظ تفضيلاتك...',
      almostReady: 'جاري الإنتهاء...'
    }
  };

  const texts = isArabic ? loadingTexts.ar : loadingTexts.en;
  const currentText = step ? texts[step as keyof typeof texts] || texts.loading : texts.loading;

  if (variant === 'skeleton') {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <EnhancedSkeleton variant="form" lines={1} />
            </CardHeader>
            <CardContent>
              <EnhancedSkeleton variant="form" lines={3} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className={`text-center space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold ${isArabic ? 'font-arabic' : ''}`}>
                  {currentText}
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={`text-center ${isArabic ? 'text-right' : 'text-left'}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
          {currentText}
        </p>
      </div>
    </div>
  );
};

export default OnboardingLoadingDisplay;
