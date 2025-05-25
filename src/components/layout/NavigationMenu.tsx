
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, User } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavigationMenuProps {
  isArabic: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isArabic }) => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      label: isArabic ? 'لوحة التحكم' : 'Dashboard',
      href: '/',
      icon: Home,
      description: isArabic ? 'لوحة التحكم الشاملة' : 'Unified Dashboard'
    },
    {
      label: isArabic ? 'الملف الشخصي' : 'Profile',
      href: '/profile',
      icon: User,
      description: isArabic ? 'إدارة الملف الشخصي' : 'Manage your profile'
    },
    {
      label: isArabic ? 'الإعدادات' : 'Settings',
      href: '/zapier-settings',
      icon: Settings,
      description: isArabic ? 'إعدادات التطبيق' : 'Application settings'
    }
  ];

  return (
    <nav className="hidden md:flex items-center gap-4">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1 ${location.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}`}
          title={item.description}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
