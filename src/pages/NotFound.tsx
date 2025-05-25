
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center ${isArabic ? 'rtl' : ''}`}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isArabic 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة.'
              : 'Sorry, the page you are looking for does not exist.'
            }
          </p>
        </div>
        
        <div className={`flex gap-4 justify-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className="h-4 w-4" />
            {isArabic ? 'العودة' : 'Go Back'}
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <Home className="h-4 w-4" />
            {isArabic ? 'الصفحة الرئيسية' : 'Home'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
