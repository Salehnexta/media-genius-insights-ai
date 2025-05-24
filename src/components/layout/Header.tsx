
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isArabic = language === 'ar';

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  const navigationItems = [
    { 
      label: t('nav.dashboard'), 
      href: '/dashboard',
      protected: true
    },
    { 
      label: t('nav.campaigns'), 
      href: '/campaigns',
      protected: true
    },
    { 
      label: isArabic ? 'الأسعار' : 'Pricing', 
      href: language === 'ar' ? '/pricing-ar' : '/pricing',
      protected: false
    },
    { 
      label: isArabic ? 'الاشتراك' : 'Subscription', 
      href: language === 'ar' ? '/subscription-ar' : '/subscription',
      protected: true
    }
  ];

  const handleNavigation = (href: string, requiresAuth: boolean) => {
    if (requiresAuth && !user) {
      navigate(language === 'ar' ? '/auth-ar' : '/auth');
      return;
    }
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`flex items-center justify-between h-16 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link 
            to={user ? "/dashboard" : (language === 'ar' ? "/landing-ar" : "/landing")} 
            className={`flex items-center space-x-2 ${isArabic ? 'space-x-reverse' : ''}`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {isArabic ? 'التسويق الذكي' : 'AI Marketing'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-6 ${isArabic ? 'space-x-reverse' : ''}`}>
            {navigationItems.map((item) => (
              (!item.protected || user) && (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, item.protected)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
            
            {/* Footer Links */}
            <Link 
              to="/privacy" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              {isArabic ? 'الخصوصية' : 'Privacy'}
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
            >
              {isArabic ? 'الشروط' : 'Terms'}
            </Link>
          </nav>

          {/* Controls */}
          <div className={`flex items-center space-x-3 ${isArabic ? 'space-x-reverse' : ''}`}>
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-gray-600 dark:text-gray-300"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === 'en' ? 'عربي' : 'EN'}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu or Auth Button */}
            {user ? (
              <UserMenu />
            ) : (
              <Button 
                onClick={() => navigate(language === 'ar' ? '/auth-ar' : '/auth')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('auth.signIn')}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                (!item.protected || user) && (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, item.protected)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Link 
                to="/privacy" 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isArabic ? 'الخصوصية' : 'Privacy'}
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isArabic ? 'الشروط' : 'Terms'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
