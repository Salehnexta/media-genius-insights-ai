
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';
import UserMenu from '@/components/layout/UserMenu';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 dashboard-header">
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center h-16 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white h-5 w-5" />
            </div>
            <span className={`text-lg font-bold text-gray-900 dark:text-white ${isArabic ? 'arabic-text' : ''}`}>
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
