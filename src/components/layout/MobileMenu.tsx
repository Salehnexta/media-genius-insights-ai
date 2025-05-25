
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Home, Target, Bot, Brain } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileMenuProps {
  isArabic: boolean;
  user: User | null;
  isMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isArabic, 
  user, 
  isMenuOpen, 
  onMenuToggle, 
  onLogout 
}) => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
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

  const closeMenu = () => {
    onMenuToggle(false);
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={onMenuToggle}>
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
            <Button variant="destructive" size="sm" onClick={onLogout} className="mt-4 w-full">
              {isArabic ? 'تسجيل الخروج' : 'Log Out'}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
