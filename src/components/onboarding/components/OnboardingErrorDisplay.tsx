
import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface OnboardingErrorDisplayProps {
  error: string;
  isArabic: boolean;
  onRetry: () => void;
  showNavigationOptions?: boolean;
  errorCode?: string;
}

const OnboardingErrorDisplay: React.FC<OnboardingErrorDisplayProps> = ({
  error,
  isArabic,
  onRetry,
  showNavigationOptions = true,
  errorCode
}) => {
  const navigate = useNavigate();

  const errorTexts = {
    en: {
      title: 'Onboarding Error',
      subtitle: 'We encountered an issue during the setup process',
      retry: 'Try Again',
      goHome: 'Go to Dashboard',
      goBack: 'Go Back',
      helpText: 'If this problem persists, please contact our support team.'
    },
    ar: {
      title: 'خطأ في الإعداد الأولي',
      subtitle: 'واجهنا مشكلة أثناء عملية الإعداد',
      retry: 'إعادة المحاولة',
      goHome: 'الذهاب إلى لوحة التحكم',
      goBack: 'العودة',
      helpText: 'إذا استمرت هذه المشكلة، يرجى الاتصال بفريق الدعم.'
    }
  };

  const texts = isArabic ? errorTexts.ar : errorTexts.en;

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-lg">
        <CardHeader className={`text-center ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className={`text-2xl ${isArabic ? 'font-arabic' : ''}`}>
            {texts.title}
          </CardTitle>
          <p className={`text-muted-foreground ${isArabic ? 'font-arabic' : ''}`}>
            {texts.subtitle}
          </p>
        </CardHeader>
        <CardContent className={`space-y-6 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className={`text-red-800 text-sm ${isArabic ? 'font-arabic' : ''}`}>
              {error}
            </p>
            {errorCode && (
              <p className="text-red-600 text-xs mt-2">
                Error Code: {errorCode}
              </p>
            )}
          </div>

          <p className={`text-sm text-muted-foreground ${isArabic ? 'font-arabic' : ''}`}>
            {texts.helpText}
          </p>

          <div className={`flex flex-col sm:flex-row gap-3 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <Button onClick={onRetry} className="flex-1 gap-2">
              <RefreshCw className="w-4 h-4" />
              {texts.retry}
            </Button>
            
            {showNavigationOptions && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleGoHome}
                  className="flex-1 gap-2"
                >
                  <Home className="w-4 h-4" />
                  {texts.goHome}
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleGoBack}
                  className="flex-1 gap-2"
                >
                  <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                  {texts.goBack}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingErrorDisplay;
