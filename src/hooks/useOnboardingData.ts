
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
}

export const useOnboardingData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveOnboardingData = async (data: OnboardingData) => {
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
          skill_level: data.skillLevel,
          experience: data.experience,
          business_name: data.businessName,
          industry: data.industry,
          website: data.website,
          social_accounts: data.socialAccounts,
          competitors: data.competitors,
          goals: data.goals,
          budget: data.budget,
          updated_at: new Date().toISOString()
        });

      if (onboardingError) throw onboardingError;

      // Create AI context for personalization
      const aiContext = {
        businessType: data.industry,
        skillLevel: data.skillLevel,
        experience: data.experience,
        goals: data.goals,
        budget: data.budget,
        hasWebsite: !!data.website,
        socialPlatforms: Object.keys(data.socialAccounts),
        competitorCount: data.competitors.length
      };

      // Save user preferences with AI context
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ai_context: aiContext,
          personalization_data: {
            onboardingCompleted: true,
            completedAt: new Date().toISOString(),
            businessName: data.businessName
          },
          updated_at: new Date().toISOString()
        });

      if (preferencesError) throw preferencesError;

      toast({
        title: "Onboarding completed!",
        description: "Your preferences have been saved and your dashboard is being personalized.",
      });

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
    saveOnboardingData,
    getOnboardingData,
    loading,
    saving
  };
};
