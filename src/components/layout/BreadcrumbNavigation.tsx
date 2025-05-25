
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const BreadcrumbNavigation: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const location = useLocation();

  const getPageTitle = (path: string): string => {
    const titles: Record<string, { en: string; ar: string }> = {
      '/dashboard': { en: 'Dashboard', ar: 'لوحة القيادة' },
      '/profile': { en: 'Profile', ar: 'الملف الشخصي' },
      '/team-management': { en: 'Team Management', ar: 'إدارة الفريق' },
      '/user-management': { en: 'User Management', ar: 'إدارة المستخدمين' },
      '/help-center': { en: 'Help Center', ar: 'مركز المساعدة' },
      '/billing': { en: 'Billing', ar: 'الفواتير' },
    };

    const title = titles[path];
    return title ? (isArabic ? title.ar : title.en) : path;
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: isArabic ? 'الرئيسية' : 'Home', path: '/dashboard' }
    ];

    let currentPath = '';
    pathnames.forEach((segment) => {
      currentPath += `/${segment}`;
      if (currentPath !== '/dashboard') {
        breadcrumbs.push({
          label: getPageTitle(currentPath),
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <ChevronRight 
              className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`}
            />
          )}
          {index === 0 && (
            <Home className="h-4 w-4" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className={`font-medium text-gray-900 dark:text-gray-100 ${isArabic ? 'font-arabic' : ''}`}>
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className={`hover:text-blue-600 ${isArabic ? 'font-arabic' : ''}`}
            >
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;
