
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Moon, Search, Settings, Sun, Languages, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className={`border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 flex items-center justify-between ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold bg-marketing-gradient bg-clip-text text-transparent">
          {t('app.title')}
        </h1>
        <div className="hidden md:flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 max-w-xs">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <Input 
            placeholder={t('search.placeholder')} 
            className="border-0 focus-visible:ring-0 bg-transparent h-7 px-0" 
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </Button>
        
        <Button variant="ghost" size="icon" onClick={toggleLanguage}>
          <Languages className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <div className="w-8 h-8 rounded-full bg-marketing-gradient flex items-center justify-center text-white font-medium">
                AC
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
            <DropdownMenuItem>{t('signout')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
