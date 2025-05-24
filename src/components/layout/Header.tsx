
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
import { User, Settings, LogOut } from 'lucide-react';
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
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-gray-900 dark:text-white">
          AI Marketing Platform
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          {!hideNavigation && <NavigationMenu isArabic={isArabic} />}

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />

            {/* Dark Mode Toggle */}
            <ModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/* Profile Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "User"} />
                      <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/subscription')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
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
