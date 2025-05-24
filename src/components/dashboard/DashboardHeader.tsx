
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/layout/LanguageToggle';

const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center h-16 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {/* Logo - Right side for Arabic, Left for English */}
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse order-last' : 'order-first'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MG</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {isArabic ? 'منصة التسويق الذكي' : 'AI Marketing'}
            </span>
          </div>

          {/* User Menu - Left side for Arabic, Right for English */}
          <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse order-first' : 'order-last'}`}>
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <User className="h-4 w-4" />
              <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/subscription')}
              className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <Settings className="h-4 w-4" />
              <span>{isArabic ? 'الاشتراك' : 'Subscription'}</span>
            </Button>

            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <LogOut className="h-4 w-4" />
                <span>{isArabic ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
