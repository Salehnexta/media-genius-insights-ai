
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, Building, Globe, Mail, Calendar, Crown, 
  Facebook, Twitter, Instagram, Linkedin, 
  Settings, Bell, Shield, CreditCard, ArrowUpCircle,
  Eye, EyeOff, Smartphone, Monitor
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileForm from '@/components/profile/ProfileForm';
import SocialLinksForm from '@/components/profile/SocialLinksForm';
import SettingsForm from '@/components/profile/SettingsForm';
import BillingSection from '@/components/profile/BillingSection';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    company_name: '',
    industry: '',
    website: '',
    avatar_url: '',
    bio: '',
    phone: '',
    location: ''
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public'
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSubscription();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          username: data.username || '',
          company_name: data.company_name || '',
          industry: data.industry || '',
          website: data.website || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
          phone: data.phone || '',
          location: data.location || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.log('No active subscription found');
        return;
      }
      if (data) setSubscription(data);
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: isArabic ? 'تم التحديث' : 'Profile Updated',
        description: isArabic ? 'تم تحديث ملفك الشخصي بنجاح' : 'Your profile has been updated successfully'
      });
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: isArabic ? 'تم تسجيل الخروج' : 'Signed Out',
        description: isArabic ? 'تم تسجيل خروجك بنجاح' : 'You have been signed out successfully'
      });
    } catch (error: any) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const getSubscriptionBadge = (planName: string) => {
    const badges = {
      'Basic': { label: isArabic ? 'أساسي' : 'Basic', variant: 'secondary' as const },
      'Professional': { label: isArabic ? 'احترافي' : 'Professional', variant: 'default' as const },
      'Enterprise': { label: isArabic ? 'مؤسسي' : 'Enterprise', variant: 'destructive' as const }
    };
    
    const badge = badges[planName as keyof typeof badges] || badges.Basic;
    return <Badge variant={badge.variant}>{badge.label}</Badge>;
  };

  const menuItems = [
    { id: 'profile', label: isArabic ? 'الملف الشخصي' : 'Profile', icon: User },
    { id: 'social', label: isArabic ? 'الشبكات الاجتماعية' : 'Social Media', icon: Globe },
    { id: 'settings', label: isArabic ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'billing', label: isArabic ? 'الفوترة والاشتراك' : 'Billing & Subscription', icon: CreditCard }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': 
        return (
          <ProfileForm
            profile={profile}
            onProfileChange={setProfile}
            onSubmit={updateProfile}
            loading={loading}
            onSignOut={handleSignOut}
          />
        );
      case 'social': 
        return (
          <SocialLinksForm
            socialLinks={socialLinks}
            onSocialLinksChange={setSocialLinks}
          />
        );
      case 'settings': 
        return (
          <SettingsForm
            settings={settings}
            onSettingsChange={setSettings}
          />
        );
      case 'billing': 
        return (
          <BillingSection
            subscription={subscription}
            getSubscriptionBadge={getSubscriptionBadge}
          />
        );
      default: 
        return (
          <ProfileForm
            profile={profile}
            onProfileChange={setProfile}
            onSubmit={updateProfile}
            loading={loading}
            onSignOut={handleSignOut}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ProfileSidebar
            profile={profile}
            user={user}
            subscription={subscription}
            menuItems={menuItems}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onSignOut={handleSignOut}
            getSubscriptionBadge={getSubscriptionBadge}
          />

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {menuItems.find(item => item.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
