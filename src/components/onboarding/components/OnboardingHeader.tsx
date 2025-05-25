
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface OnboardingHeaderProps {
  isArabic: boolean;
  toggleLanguage: () => void;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ isArabic, toggleLanguage }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className={`text-center flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isArabic ? 'إعداد منصة التسويق الذكي' : 'AI Marketing Platform Setup'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {isArabic ? 'دعنا نخصص تجربتك للحصول على أفضل النتائج' : 'Let\'s customize your experience for the best results'}
        </p>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleLanguage}
        className={`flex items-center gap-2 ${isArabic ? 'ml-4' : 'mr-4'}`}
      >
        <Globe className="h-4 w-4" />
        {isArabic ? 'English' : 'عربي'}
      </Button>
    </div>
  );
};

export default OnboardingHeader;
