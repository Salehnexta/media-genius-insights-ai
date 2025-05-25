
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
import { User, Settings, LogOut, Bug } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const isArabic = language === 'ar';
  
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleDebugClick = () => {
    navigate('/debug');
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt="User avatar" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${isArabic ? 'mr-2' : 'ml-2'}`} align={isArabic ? 'start' : 'end'}>
        <DropdownMenuLabel className="font-normal">
          <div className={`flex flex-col space-y-1 ${isArabic ? 'text-right' : ''}`}>
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || isArabic ? 'المستخدم' : 'User'}
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
          <span>{isArabic ? 'الإعدادات' : 'Settings'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDebugClick}
          className={isArabic ? 'flex-row-reverse' : ''}
        >
          <Bug className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'تشخيص النظام' : 'Debug'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className={`${isArabic ? 'flex-row-reverse' : ''} text-red-600 focus:text-red-600`}
        >
          <LogOut className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          <span>{isArabic ? 'تسجيل الخروج' : 'Log out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
