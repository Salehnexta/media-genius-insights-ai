
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Target, Bot, Brain, BarChart3 } from 'lucide-react';

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
      label: isArabic ? 'إنشاء حملة' : 'Create Campaign',
      href: '/campaigns/create',
      icon: Target,
      description: isArabic ? 'إنشاء حملة جديدة' : 'Create new campaign'
    },
    {
      label: isArabic ? 'تحليلات مفصلة' : 'Detailed Analytics',
      href: '/insights/detailed',
      icon: BarChart3,
      description: isArabic ? 'تحليلات وإحصائيات مفصلة' : 'Detailed insights & analytics'
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
