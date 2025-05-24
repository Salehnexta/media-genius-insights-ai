
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DatabaseDebugger from '@/components/debug/DatabaseDebugger';
import { Button } from '@/components/ui/button';
import { Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Debug = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
      <header className={`bg-white border-b border-gray-200 ${isArabic ? 'rtl' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {isArabic ? 'العودة' : 'Back'}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="h-9 w-9"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'صفحة التشخيص' : 'Debug Page'}
          </h1>
          <p className={`text-gray-600 mt-2 ${isArabic ? 'text-right' : ''}`}>
            {isArabic 
              ? 'فحص وتشخيص حالة قاعدة البيانات والمصادقة' 
              : 'Test and diagnose database and authentication status'
            }
          </p>
        </div>
        <DatabaseDebugger />
      </main>
    </div>
  );
};

export default Debug;
