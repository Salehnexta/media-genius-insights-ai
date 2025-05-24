
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Menu,
  Settings,
  User,
  LogOut,
  Target,
  Bot,
  Brain
} from "lucide-react"

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  hideNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, hideNavigation = false }) => {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const location = useLocation();
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    {
      label: isArabic ? 'لوحة التحكم' : 'Dashboard',
      href: '/',
      icon: Home
    },
    {
      label: isArabic ? 'الحملات' : 'Campaigns',
      href: '/campaigns',
      icon: Target
    },
    {
      label: isArabic ? 'الوكلاء الذكيين' : 'AI Agents',
      href: '/agents',
      icon: Bot
    },
    {
      label: isArabic ? 'الرؤى والتحليلات' : 'Insights & Analytics',
      href: '/insights',
      icon: Brain
    }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-gray-900 dark:text-white">
          AI Marketing Platform
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          {!hideNavigation && (
            <nav className="hidden md:flex items-center gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1 ${location.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              {isArabic ? 'English' : 'عربي'}
            </Button>

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
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden h-8 w-8 p-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-sm">
                  <SheetHeader>
                    <SheetTitle>{isArabic ? 'القائمة' : 'Menu'}</SheetTitle>
                    <SheetDescription>
                      {isArabic ? 'استكشف الخيارات المتاحة' : 'Explore available options'}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${location.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}`}
                        onClick={closeMenu}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    {user && (
                      <Button variant="destructive" size="sm" onClick={handleLogout} className="mt-4 w-full">
                        {isArabic ? 'تسجيل الخروج' : 'Log Out'}
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
