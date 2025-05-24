
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Brain } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import LanguageToggle from './LanguageToggle';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  hideNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, hideNavigation = false }) => {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [language, isArabic]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const toggleLanguage = () => {
    setLanguage(isArabic ? 'en' : 'ar');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50 h-16 lg:h-auto">
      <div className="container mx-auto px-4 py-3">
        <div className={`flex items-center justify-between h-10 ${isArabic ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo Section - Mobile Optimized */}
          <div className={`flex items-center gap-2 lg:gap-3 ${isArabic ? 'flex-row-reverse order-last lg:order-first' : 'order-first'}`}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Brain className="text-white h-5 w-5 lg:h-6 lg:w-6" />
            </div>
            <Link to="/" className={`font-bold text-lg lg:text-xl text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'فريق التسويق' : 'AI Marketing'}
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          {!hideNavigation && <NavigationMenu isArabic={isArabic} />}

          {/* Right Side Controls */}
          <div className={`flex items-center gap-2 lg:gap-4 ${isArabic ? 'flex-row-reverse order-first lg:order-last' : 'order-last'}`}>
            
            {/* Language Toggle - Mobile Optimized */}
            <LanguageToggle 
              isArabic={isArabic} 
              onToggle={toggleLanguage} 
            />

            {/* Dark Mode Toggle - Mobile Optimized */}
            <div className="hidden sm:block">
              <ModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* Profile Section - Mobile Optimized */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Desktop Profile Dropdown */}
                <div className="hidden lg:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 rounded-full touch-manipulation">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "User"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                            {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || user?.email}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/enhanced-profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/subscription')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{isArabic ? 'الاشتراك' : 'Subscription'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{isArabic ? 'تسجيل الخروج' : 'Log out'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Profile Avatar */}
                <div className="lg:hidden">
                  <Avatar 
                    className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700 cursor-pointer touch-manipulation" 
                    onClick={() => navigate('/enhanced-profile')}
                  >
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                      {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`h-10 px-4 touch-manipulation ${isArabic ? 'font-arabic' : ''}`}
                >
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            {!hideNavigation && (
              <MobileMenu
                isArabic={isArabic}
                user={user}
                isMenuOpen={isMenuOpen}
                onMenuToggle={setIsMenuOpen}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
