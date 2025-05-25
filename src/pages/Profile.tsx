
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import AccountSettingsSection from '@/components/profile/AccountSettingsSection';
import SecurityPrivacySection from '@/components/profile/SecurityPrivacySection';
import LanguageSection from '@/components/profile/LanguageSection';
import InterfaceCustomizationSection from '@/components/profile/InterfaceCustomizationSection';
import HelpSupportSection from '@/components/profile/HelpSupportSection';
import TermsConditionsSection from '@/components/profile/TermsConditionsSection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  bio: string;
  phone: string;
  location: string;
  company_name: string;
  job_title: string;
  website: string;
  timezone: string;
  language_preference: string;
  status: string;
  email: string;
  created_at: string;
  last_login: string;
}

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  profileVisibility: string;
  dataSharing: boolean;
  theme: string;
  fontSize: string;
  dashboardLayout: string;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    id: '',
    full_name: '',
    username: '',
    avatar_url: '',
    bio: '',
    phone: '',
    location: '',
    company_name: '',
    job_title: '',
    website: '',
    timezone: 'UTC',
    language_preference: 'en',
    status: 'active',
    email: '',
    created_at: '',
    last_login: ''
  });

  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public',
    dataSharing: false,
    theme: 'light',
    fontSize: 'medium',
    dashboardLayout: 'default'
  });

  const [subscription, setSubscription] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    website: '',
    github: ''
  });

  const [stats, setStats] = useState({
    profileCompletion: 0,
    totalLogins: 0,
    lastActivity: '',
    accountAge: 0
  });

  // Menu items for sidebar navigation
  const menuItems = [
    {
      id: 'profile',
      label: isArabic ? 'الملف الشخصي' : 'Profile',
      icon: require('lucide-react').User
    },
    {
      id: 'account-settings',
      label: isArabic ? 'إعدادات الحساب' : 'Account Settings',
      icon: require('lucide-react').Settings
    },
    {
      id: 'security-privacy',
      label: isArabic ? 'الأمان والخصوصية' : 'Security & Privacy',
      icon: require('lucide-react').Shield
    },
    {
      id: 'language',
      label: isArabic ? 'تغيير اللغة' : 'Language Settings',
      icon: require('lucide-react').Languages
    },
    {
      id: 'interface',
      label: isArabic ? 'تخصيص الواجهة' : 'Interface Customization',
      icon: require('lucide-react').Palette
    },
    {
      id: 'help-support',
      label: isArabic ? 'المساعدة والدعم' : 'Help & Support',
      icon: require('lucide-react').HelpCircle
    },
    {
      id: 'terms',
      label: isArabic ? 'الشروط والأحكام' : 'Terms & Conditions',
      icon: require('lucide-react').FileText
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadProfileData();
  }, [user, navigate]);

  const loadProfileData = async () => {
    try {
      setLoading(true);

      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      }

      // Calculate profile completion
      const completionFields = ['full_name', 'bio', 'company_name', 'location', 'phone'];
      const completedFields = completionFields.filter(field => profileData?.[field]);
      const completionPercentage = Math.round((completedFields.length / completionFields.length) * 100);

      // Set profile data
      setProfile({
        id: user?.id || '',
        full_name: profileData?.full_name || '',
        username: profileData?.username || '',
        avatar_url: profileData?.avatar_url || '',
        bio: profileData?.bio || '',
        phone: profileData?.phone || '',
        location: profileData?.location || '',
        company_name: profileData?.company_name || '',
        job_title: profileData?.job_title || '',
        website: profileData?.website || '',
        timezone: profileData?.timezone || 'UTC',
        language_preference: profileData?.language_preference || 'en',
        status: profileData?.status || 'active',
        email: user?.email || '',
        created_at: user?.created_at || '',
        last_login: new Date().toISOString()
      });

      setStats({
        profileCompletion: completionPercentage,
        totalLogins: 0,
        lastActivity: new Date().toISOString(),
        accountAge: Math.floor((new Date().getTime() - new Date(user?.created_at || '').getTime()) / (1000 * 60 * 60 * 24))
      });

    } catch (error) {
      console.error('Error loading profile data:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في تحميل بيانات الملف الشخصي" : "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (updatedProfile: Partial<ProfileData>) => {
    try {
      setSaving(true);

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...updatedProfile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setProfile(prev => ({ ...prev, ...updatedProfile }));

      toast({
        title: isArabic ? "تم الحفظ" : "Saved",
        description: isArabic ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully"
      });

    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "فشل في حفظ التغييرات" : "Failed to save changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getSubscriptionBadge = (planName: string) => {
    const badges = {
      free: <Badge variant="secondary">{isArabic ? 'مجاني' : 'Free'}</Badge>,
      pro: <Badge className="bg-blue-600">{isArabic ? 'احترافي' : 'Pro'}</Badge>,
      enterprise: <Badge className="bg-purple-600">{isArabic ? 'مؤسسي' : 'Enterprise'}</Badge>
    };
    return badges[planName as keyof typeof badges] || badges.free;
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <PersonalInfoSection
            profile={profile}
            socialLinks={socialLinks}
            isArabic={isArabic}
            onSave={handleProfileSave}
            onSocialLinksChange={setSocialLinks}
            loading={saving}
          />
        );
      case 'account-settings':
        return (
          <AccountSettingsSection
            settings={settings}
            isArabic={isArabic}
            onSettingsChange={setSettings}
            onSignOut={handleSignOut}
            loading={saving}
          />
        );
      case 'security-privacy':
        return (
          <SecurityPrivacySection
            settings={settings}
            isArabic={isArabic}
            onSettingsChange={setSettings}
            loading={saving}
          />
        );
      case 'language':
        return (
          <LanguageSection
            currentLanguage={language}
            isArabic={isArabic}
            onLanguageChange={toggleLanguage}
          />
        );
      case 'interface':
        return (
          <InterfaceCustomizationSection
            settings={settings}
            isArabic={isArabic}
            onSettingsChange={setSettings}
            loading={saving}
          />
        );
      case 'help-support':
        return (
          <HelpSupportSection
            isArabic={isArabic}
          />
        );
      case 'terms':
        return (
          <TermsConditionsSection
            isArabic={isArabic}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">
            {isArabic ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <ProfileHeader
            profile={profile}
            stats={stats}
            isArabic={isArabic}
            onSave={handleProfileSave}
            loading={saving}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-white dark:bg-gray-900">
              <CardHeader className="border-b">
                <CardTitle className={`text-2xl font-bold ${isArabic ? 'text-right font-arabic' : ''}`}>
                  {menuItems.find(item => item.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {renderActiveSection()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
