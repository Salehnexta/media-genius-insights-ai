
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Target, Bot, Brain } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationMenuProps {
  isArabic: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isArabic }) => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      label: isArabic ? 'الرئيسية' : 'Home',
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
  );
};

export default NavigationMenu;
