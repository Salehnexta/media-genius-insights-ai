
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Settings, LogOut, Menu, X, Shield, Globe, Home } from 'lucide-react';
import LanguageToggle from '@/components/layout/LanguageToggle';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isArabic: boolean;
  isMobile: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isArabic,
  isMobile
}) => {
  const { user, signOut } = useAuth();
  const { adminUser } = useAdmin();
  const { language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    await signOut();
  };

  const toggleLanguage = () => {
    setLanguage(isArabic ? 'en' : 'ar');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'moderator': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'support': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="px-4 lg:px-6 py-3">
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          
          {/* Left Side - Logo and Menu */}
          <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className={`font-bold text-lg text-gray-900 dark:text-white ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'لوحة الإدارة' : 'Admin Panel'}
                </h1>
                <p className={`text-sm text-gray-500 dark:text-gray-400 ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'منصة التسويق الذكي' : 'AI Marketing Platform'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Controls */}
          <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            
            {/* Back to App Button */}
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isArabic ? 'العودة للتطبيق' : 'Back to App'}
                </span>
              </Button>
            </Link>

            {/* Language Toggle */}
            <LanguageToggle isArabic={isArabic} onToggle={toggleLanguage} />

            {/* Admin Profile */}
            {adminUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-2 gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-purple-600 text-white text-sm">
                        {adminUser.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`hidden md:block ${isArabic ? 'text-right' : 'text-left'}`}>
                      <p className="text-sm font-medium">{adminUser.email}</p>
                      <Badge className={`text-xs ${getRoleBadgeColor(adminUser.role)}`}>
                        {adminUser.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{adminUser.email}</p>
                      <Badge className={`w-fit text-xs ${getRoleBadgeColor(adminUser.role)}`}>
                        {adminUser.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{isArabic ? 'إعدادات الحساب' : 'Account Settings'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isArabic ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
