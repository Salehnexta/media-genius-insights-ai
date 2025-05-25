import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import AccountSettingsSection from '@/components/profile/AccountSettingsSection';
import SubscriptionSection from '@/components/profile/SubscriptionSection';
import ActivitySection from '@/components/profile/ActivitySection';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Settings, CreditCard, BarChart3 } from 'lucide-react';

const EnhancedProfile: React.FC = () => {
  const { language } = useLanguage();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    email: user?.email || '',
    phone: '',
    company_name: '',
    job_title: '',
    location: '',
    bio: '',
    avatar_url: '',
    cover_photo_url: '',
    role: 'User',
    status: 'active',
    timezone: 'UTC',
    language_preference: 'en'
  });

  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: ''
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public',
    dataSharing: true
  });

  const [subscription, setSubscription] = useState(null);
  const [stats, setStats] = useState({
    profileCompletion: 65,
    postsCreated: 24,
    campaignsRun: 8,
    apiCalls: 1250,
    storageUsed: 45
  });

  useEffect(() => {
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Load profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(prev => ({
          ...prev,
          ...profileData,
          email: user.email || ''
        }));
      }

      // Load subscription data
      const { data: subscriptionData } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (subscriptionData) {
        setSubscription(subscriptionData);
      }

    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (section: string, data: any) => {
    try {
      setLoading(true);

      if (section === 'profile') {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user?.id,
            ...data,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        setProfile(prev => ({ ...prev, ...data }));
      }

      toast({
        title: isArabic ? "تم الحفظ بنجاح" : "Profile Updated",
        description: isArabic ? "تم تحديث ملفك الشخصي بنجاح" : "Your profile has been updated successfully",
      });

    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: isArabic ? "خطأ في الحفظ" : "Save Error",
        description: isArabic ? "حدث خطأ أثناء حفظ ملفك الشخصي" : "There was an error saving your profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading && !profile.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className={`text-lg text-gray-600 dark:text-gray-300 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'جاري التحميل...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Profile Header */}
        <ProfileHeader 
          profile={profile}
          stats={stats}
          isArabic={isArabic}
          onSave={(data) => handleSaveProfile('profile', data)}
          loading={loading}
        />

        {/* Enhanced Main Content Tabs */}
        <div className="mt-10">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className={`grid w-full grid-cols-4 h-14 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-2 shadow-lg ${isArabic ? 'text-right' : ''}`}>
              <TabsTrigger 
                value="personal" 
                className={`flex items-center gap-3 h-10 rounded-lg text-base font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <User className="h-5 w-5" />
                {isArabic ? 'المعلومات الشخصية' : 'Personal Info'}
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className={`flex items-center gap-3 h-10 rounded-lg text-base font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <Settings className="h-5 w-5" />
                {isArabic ? 'إعدادات الحساب' : 'Account Settings'}
              </TabsTrigger>
              <TabsTrigger 
                value="subscription" 
                className={`flex items-center gap-3 h-10 rounded-lg text-base font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <CreditCard className="h-5 w-5" />
                {isArabic ? 'الاشتراك والفوترة' : 'Subscription'}
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className={`flex items-center gap-3 h-10 rounded-lg text-base font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isArabic ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <BarChart3 className="h-5 w-5" />
                {isArabic ? 'النشاط' : 'Activity'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-8">
              <PersonalInfoSection
                profile={profile}
                socialLinks={socialLinks}
                isArabic={isArabic}
                onSave={(data) => handleSaveProfile('profile', data)}
                onSocialLinksChange={setSocialLinks}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-8">
              <AccountSettingsSection
                settings={settings}
                isArabic={isArabic}
                onSettingsChange={setSettings}
                onSignOut={handleSignOut}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="subscription" className="mt-8">
              <SubscriptionSection
                subscription={subscription}
                stats={stats}
                isArabic={isArabic}
              />
            </TabsContent>

            <TabsContent value="activity" className="mt-8">
              <ActivitySection
                stats={stats}
                isArabic={isArabic}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;
