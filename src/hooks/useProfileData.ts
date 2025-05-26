
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLoadingState } from './useLoadingState';

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

export const useProfileData = (isArabic: boolean) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { loading, setLoading, executeAsync } = useLoadingState();

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

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    await executeAsync(async () => {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw new Error(`Failed to load profile: ${profileError.message}`);
      }

      // Calculate profile completion
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
    });
  };

  const handleProfileSave = async (updatedProfile: Partial<ProfileData>) => {
    if (!user) return;

    await executeAsync(async () => {
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
    });
  };

  return {
    profile,
    stats,
    settings,
    setSettings,
    loading,
    handleProfileSave,
    loadProfileData
  };
};
