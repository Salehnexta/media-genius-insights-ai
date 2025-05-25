
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Languages, 
  Palette, 
  HelpCircle, 
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const isArabic = language === 'ar';
  
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force navigation to auth page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback navigation
      navigate('/auth');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt="User avatar" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-64 ${isArabic ? 'mr-2' : 'ml-2'}`} align={isArabic ? 'start' : 'end'}>
        <DropdownMenuLabel className="font-normal">
          <div className={`flex flex-col space-y-1 ${isArabic ? 'text-right' : ''}`}>
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || (isArabic ? 'المستخدم' : 'User')}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className={isArabic ? 'flex-row-reverse' : ''}
        >
          <User className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className={isArabic ? 'flex-row-reverse' : ''}>
          <Settings className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'إعدادات الحساب' : 'Account Settings'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className={isArabic ? 'flex-row-reverse' : ''}>
          <Shield className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'الأمان والخصوصية' : 'Security & Privacy'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLanguageToggle}
          className={isArabic ? 'flex-row-reverse' : ''}
        >
          <Languages className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'تغيير اللغة (English)' : 'Change Language (العربية)'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className={isArabic ? 'flex-row-reverse' : ''}>
          <Palette className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'تخصيص الواجهة' : 'Customize Interface'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className={isArabic ? 'flex-row-reverse' : ''}>
          <HelpCircle className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'المساعدة والدعم' : 'Help & Support'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className={isArabic ? 'flex-row-reverse' : ''}>
          <FileText className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className={`${isArabic ? 'flex-row-reverse' : ''} text-red-600 focus:text-red-600 dark:text-red-400`}
        >
          <LogOut className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'تسجيل الخروج' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
