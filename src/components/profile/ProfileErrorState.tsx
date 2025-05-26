
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProfileErrorStateProps {
  isArabic: boolean;
  error: string;
  onRetry: () => void;
}

const ProfileErrorState: React.FC<ProfileErrorStateProps> = ({ 
  isArabic, 
  error, 
  onRetry 
}) => {
  const navigate = useNavigate();

  const texts = {
    en: {
      title: 'Something went wrong',
      description: 'We encountered an error while loading your profile.',
      retry: 'Try Again',
      home: 'Go Home',
      errorDetails: 'Error details:'
    },
    ar: {
      title: 'حدث خطأ ما',
      description: 'واجهنا خطأ أثناء تحميل ملفك الشخصي.',
      retry: 'المحاولة مرة أخرى',
      home: 'الذهاب للرئيسية',
      errorDetails: 'تفاصيل الخطأ:'
    }
  };

  const content = isArabic ? texts.ar : texts.en;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md shadow-lg border-0 bg-white dark:bg-gray-900">
        <CardHeader className={`text-center ${isArabic ? 'text-right' : ''}`}>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className={`text-xl font-bold text-red-700 dark:text-red-400 ${isArabic ? 'font-arabic' : ''}`}>
            {content.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className={`space-y-4 ${isArabic ? 'text-right' : ''}`}>
          <p className={`text-gray-600 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
            {content.description}
          </p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className={`text-sm text-red-700 dark:text-red-300 ${isArabic ? 'font-arabic' : ''}`}>
                <strong>{content.errorDetails}</strong>
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-mono">
                {error}
              </p>
            </div>
          )}
          
          <div className={`flex gap-3 pt-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button 
              onClick={onRetry}
              className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {content.retry}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className={`flex-1 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
            >
              <Home className="w-4 h-4 mr-2" />
              {content.home}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileErrorState;
