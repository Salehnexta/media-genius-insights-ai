
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingData {
  skillLevel: string;
  experience: string;
  businessName: string;
  industry: string;
  website: string;
  socialAccounts: Record<string, string>;
  competitors: string[];
  goals: string[];
  budget: string;
  completed?: boolean;
}

const defaultData: OnboardingData = {
  skillLevel: '',
  experience: '',
  businessName: '',
  industry: '',
  website: '',
  socialAccounts: {},
  competitors: [],
  goals: [],
  budget: '',
  completed: false
};

export const useOnboardingData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>(defaultData);

  // Load existing data on mount
  useEffect(() => {
    if (user) {
      loadOnboardingData();
    }
  }, [user]);

  const loadOnboardingData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: existingData, error } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (existingData) {
        // Safely cast social_accounts from Json type to Record<string, string>
        const socialAccounts = existingData.social_accounts && 
          typeof existingData.social_accounts === 'object' && 
          !Array.isArray(existingData.social_accounts) 
          ? existingData.social_accounts as Record<string, string>
          : {};

        setData({
          skillLevel: existingData.skill_level || '',
          experience: existingData.experience || '',
          businessName: existingData.business_name || '',
          industry: existingData.industry || '',
          website: existingData.website || '',
          socialAccounts: socialAccounts,
          competitors: existingData.competitors || [],
          goals: existingData.goals || [],
          budget: existingData.budget || '',
          completed: !!existingData.completed_at
        });
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const saveData = async () => {
    return await saveOnboardingData(data);
  };

  const saveOnboardingData = async (dataToSave: OnboardingData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your onboarding data",
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);
    try {
      // Save onboarding data
      const { error: onboardingError } = await supabase
        .from('onboarding_data')
        .upsert({
          user_id: user.id,
          skill_level: dataToSave.skillLevel,
          experience: dataToSave.experience,
          business_name: dataToSave.businessName,
          industry: dataToSave.industry,
          website: dataToSave.website,
          social_accounts: dataToSave.socialAccounts,
          competitors: dataToSave.competitors,
          goals: dataToSave.goals,
          budget: dataToSave.budget,
          completed_at: dataToSave.completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        });

      if (onboardingError) throw onboardingError;

      // Create AI context for personalization
      const aiContext = {
        businessType: dataToSave.industry,
        skillLevel: dataToSave.skillLevel,
        experience: dataToSave.experience,
        goals: dataToSave.goals,
        budget: dataToSave.budget,
        hasWebsite: !!dataToSave.website,
        socialPlatforms: Object.keys(dataToSave.socialAccounts),
        competitorCount: dataToSave.competitors.length
      };

      // Save user preferences with AI context
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ai_context: aiContext,
          personalization_data: {
            onboardingCompleted: dataToSave.completed,
            completedAt: dataToSave.completed ? new Date().toISOString() : null,
            businessName: dataToSave.businessName
          },
          updated_at: new Date().toISOString()
        });

      if (preferencesError) throw preferencesError;

      if (dataToSave.completed) {
        toast({
          title: "Onboarding completed!",
          description: "Your preferences have been saved and your dashboard is being personalized.",
        });
      }

      return true;
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Error saving data",
        description: "There was an issue saving your onboarding data. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getOnboardingData = async () => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    updateData,
    saveData,
    saveOnboardingData,
    getOnboardingData,
    loading,
    saving
  };
};
