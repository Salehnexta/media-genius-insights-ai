
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface Stats {
  profileCompletion: number;
  totalLogins: number;
  lastActivity: string;
  accountAge: number;
}

interface Subscription {
  plan: string;
  status: string;
  renewalDate: string;
}

interface SocialLinks {
  twitter: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

interface ProfileContextType {
  profile: ProfileData;
  stats: Stats;
  settings: Settings;
  socialLinks: SocialLinks;
  subscription: Subscription;
  loading: boolean;
  saving: boolean;
  activeSection: string;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLinks>>;
  setActiveSection: (section: string) => void;
  handleProfileSave: (updatedProfile: Partial<ProfileData>) => Promise<void>;
  loadProfileData: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
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

  const [stats, setStats] = useState<Stats>({
    profileCompletion: 0,
    totalLogins: 0,
    lastActivity: '',
    accountAge: 0
  });

  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public',
    dataSharing: false,
    theme: 'system',
    fontSize: 'medium',
    dashboardLayout: 'default'
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    twitter: '',
    linkedin: '',
    instagram: '',
    facebook: ''
  });

  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'free',
    status: 'active',
    renewalDate: ''
  });

  const loadProfileData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      }

      const completionFields = ['full_name', 'bio', 'company_name', 'location', 'phone'];
      const completedFields = completionFields.filter(field => profileData?.[field]);
      const completionPercentage = Math.round((completedFields.length / completionFields.length) * 100);

      setProfile({
        id: user.id,
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
        email: user.email || '',
        created_at: user.created_at || '',
        last_login: new Date().toISOString()
      });

      setStats({
        profileCompletion: completionPercentage,
        totalLogins: 0,
        lastActivity: new Date().toISOString(),
        accountAge: Math.floor((new Date().getTime() - new Date(user.created_at || '').getTime()) / (1000 * 60 * 60 * 24))
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
    if (!user) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
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

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const value: ProfileContextType = {
    profile,
    stats,
    settings,
    socialLinks,
    subscription,
    loading,
    saving,
    activeSection,
    setProfile,
    setSettings,
    setSocialLinks,
    setActiveSection,
    handleProfileSave,
    loadProfileData
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
