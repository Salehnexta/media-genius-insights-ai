
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  FileText, 
  CreditCard, 
  Settings, 
  BarChart3, 
  HeadphonesIcon,
  Shield,
  Database,
  MessageSquare
} from 'lucide-react';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isArabic: boolean;
  isMobile: boolean;
  adminRole: string;
}

interface NavigationItem {
  label: string;
  labelAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRole?: string;
  badge?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  open,
  setOpen,
  isArabic,
  isMobile,
  adminRole
}) => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      labelAr: 'لوحة التحكم',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      label: 'User Management',
      labelAr: 'إدارة المستخدمين',
      href: '/admin/users',
      icon: Users
    },
    {
      label: 'AI Team Management',
      labelAr: 'إدارة فريق الذكاء الاصطناعي',
      href: '/admin/ai-team',
      icon: Bot,
      requiredRole: 'admin'
    },
    {
      label: 'Content Management',
      labelAr: 'إدارة المحتوى',
      href: '/admin/content',
      icon: FileText,
      requiredRole: 'moderator'
    },
    {
      label: 'Billing & Subscriptions',
      labelAr: 'الفواتير والاشتراكات',
      href: '/admin/billing',
      icon: CreditCard,
      requiredRole: 'admin'
    },
    {
      label: 'Analytics & Reports',
      labelAr: 'التحليلات والتقارير',
      href: '/admin/analytics',
      icon: BarChart3,
      requiredRole: 'admin'
    },
    {
      label: 'Support Management',
      labelAr: 'إدارة الدعم',
      href: '/admin/support',
      icon: HeadphonesIcon
    },
    {
      label: 'System Configuration',
      labelAr: 'إعدادات النظام',
      href: '/admin/system',
      icon: Settings,
      requiredRole: 'super_admin'
    }
  ];

  const roleHierarchy = {
    'super_admin': 4,
    'admin': 3,
    'moderator': 2,
    'support': 1
  };

  const hasPermission = (requiredRole?: string): boolean => {
    if (!requiredRole) return true;
    const userLevel = roleHierarchy[adminRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    return userLevel >= requiredLevel;
  };

  const filteredItems = navigationItems.filter(item => hasPermission(item.requiredRole));

  const handleItemClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300",
        isMobile ? "translate-x-0" : "",
        isArabic ? "right-0" : "left-0"
      )}>
        <div className="flex flex-col h-full">
          
          {/* Admin Role Badge */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className={`text-sm font-medium text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'مستوى الصلاحية' : 'Admin Level'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {adminRole.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {filteredItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={handleItemClick}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 touch-manipulation",
                        isActive 
                          ? "bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        isArabic ? "flex-row-reverse text-right" : ""
                      )}
                      style={{ minHeight: '48px' }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className={`font-medium ${isArabic ? 'font-arabic' : ''}`}>
                        {isArabic ? item.labelAr : item.label}
                      </span>
                      {item.badge && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className={`text-center ${isArabic ? 'font-arabic' : ''}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {isArabic ? 'آخر تحديث' : 'Last Update'}
              </p>
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                {new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
