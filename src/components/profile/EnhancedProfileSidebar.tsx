
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Crown, LogOut } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ProfileNavigation from './ProfileNavigation';

interface EnhancedProfileSidebarProps {
  onSignOut: () => void;
}

const EnhancedProfileSidebar: React.FC<EnhancedProfileSidebarProps> = ({
  onSignOut
}) => {
  const { profile, subscription, activeSection, setActiveSection } = useProfile();
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const getSubscriptionBadge = (planName: string) => {
    const badges = {
      free: <Badge variant="secondary">{isArabic ? 'مجاني' : 'Free'}</Badge>,
      pro: <Badge className="bg-blue-600">{isArabic ? 'احترافي' : 'Pro'}</Badge>,
      enterprise: <Badge className="bg-purple-600">{isArabic ? 'مؤسسي' : 'Enterprise'}</Badge>
    };
    return badges[planName as keyof typeof badges] || badges.free;
  };

  const subscriptionPlanName = subscription?.plan || 'free';

  return (
    <Card className="lg:col-span-1 h-fit shadow-lg border-0 bg-white dark:bg-gray-900">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4 shadow-lg">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
            {profile.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <CardTitle className={`text-lg font-bold ${isArabic ? 'font-arabic' : ''}`}>
          {profile.full_name || (isArabic ? 'المستخدم' : 'User')}
        </CardTitle>
        <p className={`text-muted-foreground text-sm ${isArabic ? 'font-arabic' : ''}`}>
          @{profile.username || 'username'}
        </p>
        
        <div className="mt-3">
          <div className={`flex items-center justify-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Crown className="h-4 w-4 text-yellow-500" />
            {getSubscriptionBadge(subscriptionPlanName)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ProfileNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <Separator className="my-4" />
        
        <Button 
          variant="destructive" 
          onClick={onSignOut}
          className={`w-full flex items-center gap-2 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
        >
          <LogOut className="h-4 w-4" />
          {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileSidebar;
