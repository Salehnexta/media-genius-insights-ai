import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import BreadcrumbNavigation from '@/components/layout/BreadcrumbNavigation';
import BackButton from '@/components/layout/BackButton';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import PersonalInfoSection from '@/components/profile/PersonalInfoSection';
import { User, Settings, CreditCard, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const { userRoles, isAdmin } = useUserRoles();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [profile, setProfile] = useState<any>({
    full_name: '',
    username: '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    avatar_url: '',
    cover_photo_url: '',
    company_name: '',
    job_title: '',
    timezone: 'UTC',
    language_preference: language,
    status: 'active'
  });

  const [socialLinks, setSocialLinks] = useState<any>({
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  });

  const [subscription, setSubscription] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [loading, setLoading] = useState(false);

  // Calculate profile completion and stats
  const calculateStats = () => {
    const fields = ['full_name', 'bio', 'company_name', 'location', 'phone'];
    const completed = fields.filter(field => profile[field] && profile[field].trim() !== '').length;
    const profileCompletion = Math.round((completed / fields.length) * 100);
    
    return {
      profileCompletion,
      totalConnections: 0,
      profileViews: 0,
      lastLoginDate: user?.last_sign_in_at ? new Date(user.last_sign_in_at) : new Date()
    };
  };

  const stats = calculateStats();

  // Menu items for sidebar
  const menuItems = [
    { id: 'personal', label: isArabic ? 'المعلومات الشخصية' : 'Personal Info', icon: User },
    { id: 'settings', label: isArabic ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'billing', label: isArabic ? 'الفواتير' : 'Billing', icon: CreditCard },
    { id: 'notifications', label: isArabic ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'help', label: isArabic ? 'المساعدة' : 'Help & Support', icon: HelpCircle },
    ...(isAdmin() ? [{ id: 'admin', label: isArabic ? 'إدارة النظام' : 'Admin Panel', icon: Shield }] : [])
  ];

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        // Load profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(prev => ({ ...prev, ...profileData }));
        }

        // Load social links
        const { data: socialData } = await supabase
          .from('social_links')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (socialData) {
          setSocialLinks(socialData);
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
          .maybeSingle();

        if (subscriptionData) {
          setSubscription(subscriptionData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [user]);

  const handleProfileSave = async (updatedProfile: any) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updatedProfile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setProfile(updatedProfile);
      toast({
        title: isArabic ? "تم الحفظ بنجاح" : "Profile Updated",
        description: isArabic ? "تم حفظ معلومات الملف الشخصي بنجاح" : "Your profile has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء حفظ الملف الشخصي" : "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLinksChange = async (updatedLinks: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('social_links')
        .upsert({
          user_id: user.id,
          ...updatedLinks,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSocialLinks(updatedLinks);
      toast({
        title: isArabic ? "تم الحفظ بنجاح" : "Links Updated",
        description: isArabic ? "تم حفظ روابط التواصل الاجتماعي بنجاح" : "Your social links have been updated successfully"
      });
    } catch (error) {
      console.error('Error updating social links:', error);
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء حفظ الروابط" : "Failed to update social links",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: isArabic ? "تم تسجيل الخروج" : "Signed Out",
        description: isArabic ? "تم تسجيل الخروج بنجاح" : "You have been signed out successfully"
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getSubscriptionBadge = (planName: string) => {
    const colors = {
      'free': 'bg-gray-500',
      'basic': 'bg-blue-500',
      'premium': 'bg-purple-500',
      'enterprise': 'bg-gold-500'
    };
    
    const color = colors[planName.toLowerCase() as keyof typeof colors] || 'bg-gray-500';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs text-white ${color} ${isArabic ? 'font-arabic' : ''}`}>
        {planName}
      </span>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 p-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        <BreadcrumbNavigation />
        <BackButton showHome />
        
        <ProfileHeader 
          profile={profile}
          stats={stats}
          isArabic={isArabic}
          onSave={handleProfileSave}
          loading={loading}
        />
        
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${isArabic ? 'grid-cols-1 lg:grid-cols-4' : ''}`}>
          <div className="lg:col-span-1">
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
          </div>
          <div className="lg:col-span-3">
            {activeSection === 'personal' && (
              <PersonalInfoSection 
                profile={profile}
                socialLinks={socialLinks}
                isArabic={isArabic}
                onSave={handleProfileSave}
                onSocialLinksChange={handleSocialLinksChange}
                loading={loading}
              />
            )}
            {/* Other sections can be added here based on activeSection */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
