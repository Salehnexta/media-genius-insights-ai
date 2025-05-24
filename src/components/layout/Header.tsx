
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import UserMenu from './UserMenu';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { t, language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`border-b bg-white/95 backdrop-blur-md dark:bg-gray-900/95 px-6 py-4 ${isArabic ? 'rtl' : ''}`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isArabic ? 'عبقري التسويق الذكي' : 'MarketingGenius AI'}
          </h1>
        </div>
        
        <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="text-xs"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="p-2"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
