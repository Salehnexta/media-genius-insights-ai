
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>{isArabic ? 'جاري التحميل...' : 'Loading profile...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <ProfileHeader 
          profile={profile}
          stats={stats}
          isArabic={isArabic}
          onSave={(data) => handleSaveProfile('profile', data)}
          loading={loading}
        />

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className={`grid w-full grid-cols-4 ${isArabic ? 'text-right' : ''}`}>
              <TabsTrigger value="personal" className={isArabic ? 'flex-row-reverse' : ''}>
                {isArabic ? 'المعلومات الشخصية' : 'Personal Info'}
              </TabsTrigger>
              <TabsTrigger value="settings" className={isArabic ? 'flex-row-reverse' : ''}>
                {isArabic ? 'إعدادات الحساب' : 'Account Settings'}
              </TabsTrigger>
              <TabsTrigger value="subscription" className={isArabic ? 'flex-row-reverse' : ''}>
                {isArabic ? 'الاشتراك والفوترة' : 'Subscription'}
              </TabsTrigger>
              <TabsTrigger value="activity" className={isArabic ? 'flex-row-reverse' : ''}>
                {isArabic ? 'النشاط' : 'Activity'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <PersonalInfoSection
                profile={profile}
                socialLinks={socialLinks}
                isArabic={isArabic}
                onSave={(data) => handleSaveProfile('profile', data)}
                onSocialLinksChange={setSocialLinks}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <AccountSettingsSection
                settings={settings}
                isArabic={isArabic}
                onSettingsChange={setSettings}
                onSignOut={handleSignOut}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="subscription" className="mt-6">
              <SubscriptionSection
                subscription={subscription}
                stats={stats}
                isArabic={isArabic}
              />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
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
