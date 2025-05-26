
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileSidebarProps {
  profile: {
    full_name: string;
    username: string;
    avatar_url: string;
  };
  user: any;
  subscription: any;
  menuItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSignOut: () => void;
  getSubscriptionBadge: (planName: string) => React.ReactNode;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  profile,
  user,
  subscription,
  menuItems,
  activeSection,
  onSectionChange,
  onSignOut,
  getSubscriptionBadge
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const subscriptionPlanName = subscription?.subscription_plans?.name || subscription?.plan || 'free';

  return (
    <Card className="lg:col-span-1 h-fit">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{profile.full_name || 'User'}</CardTitle>
        <p className="text-muted-foreground">@{profile.username || 'username'}</p>
        
        {subscription && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              {getSubscriptionBadge(subscriptionPlanName)}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${isArabic ? 'flex-row-reverse text-right' : ''}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <Separator className="my-4" />
        
        <Button 
          variant="destructive" 
          onClick={onSignOut}
          className={`w-full ${isArabic ? 'flex-row-reverse' : ''}`}
        >
          {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
