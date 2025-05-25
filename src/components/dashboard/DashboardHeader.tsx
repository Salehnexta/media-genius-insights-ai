
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Brain, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/layout/LanguageToggle';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const handleProfileClick = () => {
    navigate('/enhanced-profile');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center h-16`}>
          {/* Logo - Far right in Arabic, far left in English */}
          <div className={`flex items-center gap-3 ${isArabic ? 'order-1' : 'order-1'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
            </span>
          </div>

          {/* Controls - Far left in Arabic, far right in English */}
          <div className={`flex items-center gap-4 ${isArabic ? 'order-3' : 'order-3'}`}>
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />
            
            {/* Profile Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
