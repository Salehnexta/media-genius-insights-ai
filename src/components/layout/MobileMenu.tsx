
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu, Home, Target, Bot, Brain, User, Settings, LogOut, Zap, Calendar, BarChart3 } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'main' | 'team' | 'account';
}

interface MobileMenuProps {
  isArabic: boolean;
  user: SupabaseUser | null;
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
    // Main Navigation
    {
      label: isArabic ? 'لوحة التحكم' : 'Dashboard',
      href: '/',
      icon: Home,
      category: 'main'
    },
    {
      label: isArabic ? 'مركز التسويق' : 'Marketing Hub',
      href: '/campaigns',
      icon: Zap,
      category: 'main'
    },
    {
      label: isArabic ? 'التحليلات' : 'Performance Analytics',
      href: '/insights',
      icon: BarChart3,
      category: 'main'
    },
    
    // Team Section
    {
      label: isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team',
      href: '/agents',
      icon: Bot,
      category: 'team'
    },
    {
      label: isArabic ? 'التقويم التسويقي' : 'Marketing Calendar',
      href: '/calendar',
      icon: Calendar,
      category: 'team'
    },
    
    // Account Section
    {
      label: isArabic ? 'الملف الشخصي' : 'Profile',
      href: '/enhanced-profile',
      icon: User,
      category: 'account'
    },
    {
      label: isArabic ? 'الاشتراك' : 'Subscription',
      href: '/subscription',
      icon: Settings,
      category: 'account'
    }
  ];

  const closeMenu = () => {
    onMenuToggle(false);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'main':
        return isArabic ? 'التنقل الرئيسي' : 'Main Navigation';
      case 'team':
        return isArabic ? 'فريق التسويق' : 'Marketing Team';
      case 'account':
        return isArabic ? 'الحساب' : 'Account';
      default:
        return '';
    }
  };

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  return (
    <Drawer open={isMenuOpen} onOpenChange={onMenuToggle} direction={isArabic ? 'right' : 'left'}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          className="lg:hidden h-11 w-11 p-0 touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={`${isArabic ? 'mr-auto ml-0' : 'ml-auto mr-0'} max-w-sm w-full h-[85vh] rounded-t-3xl`}>
        <DrawerHeader className="pb-4">
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="text-white h-6 w-6" />
            </div>
            <div className={isArabic ? 'text-right' : ''}>
              <DrawerTitle className={`text-lg font-bold ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'فريق التسويق الذكي' : 'AI Marketing Team'}
              </DrawerTitle>
              <DrawerDescription className={isArabic ? 'font-arabic' : ''}>
                {isArabic ? 'منصة التسويق الذكي الشاملة' : 'Complete AI Marketing Platform'}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 px-4 pb-6 overflow-y-auto">
          {/* User Profile Section */}
          {user && (
            <div className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 ${isArabic ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                  <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg font-semibold">
                    {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className={`font-semibold text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                    {user?.user_metadata?.full_name || (isArabic ? 'المستخدم' : 'User')}
                  </p>
                  <p className={`text-sm text-gray-600 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Sections */}
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className={`text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2 ${isArabic ? 'text-right font-arabic' : ''}`}>
                {getCategoryTitle(category)}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 touch-manipulation ${
                      location.pathname === item.href 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
                    onClick={closeMenu}
                    style={{ minHeight: '52px' }}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          {user && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="destructive" 
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className={`w-full h-12 rounded-2xl font-medium touch-manipulation ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">{isArabic ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
