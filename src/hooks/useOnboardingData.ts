
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
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>(defaultData);

  // Load existing data when user is available
  useEffect(() => {
    if (user && !authLoading) {
      loadOnboardingData();
    } else if (!user && !authLoading) {
      // Reset to default data when user is not available
      setData(defaultData);
    }
  }, [user, authLoading]);

  const loadOnboardingData = async () => {
    if (!user) {
      console.log('No user available for loading onboarding data');
      return;
    }

    setLoading(true);
    try {
      console.log('Loading onboarding data for user:', user.id);
      
      const { data: existingData, error } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading onboarding data:', error);
        setData(defaultData);
        return;
      }

      if (existingData) {
        console.log('Found existing onboarding data:', existingData);
        
        const socialAccounts = existingData.social_accounts && 
          typeof existingData.social_accounts === 'object' && 
          !Array.isArray(existingData.social_accounts) 
          ? existingData.social_accounts as Record<string, string>
          : {};

        // Check if onboarding is completed based on completed_at field
        const isCompleted = existingData.completed_at !== null;

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
          completed: isCompleted
        });
      } else {
        console.log('No existing onboarding data found - using defaults');
        setData(defaultData);
      }
    } catch (error) {
      console.error('Unexpected error loading onboarding data:', error);
      setData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    console.log('Updating onboarding data:', updates);
    setData(prev => ({ ...prev, ...updates }));
  };

  const saveData = async () => {
    return await saveOnboardingData(data);
  };

  const saveOnboardingData = async (dataToSave: OnboardingData) => {
    if (!user) {
      console.error('No user available for saving onboarding data');
      toast({
        title: "Authentication required",
        description: "Please log in to save your onboarding data",
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);
    try {
      console.log('Saving onboarding data for user:', user.id, dataToSave);

      const { data: existingOnboarding } = await supabase
        .from('onboarding_data')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const savePayload = {
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
      };

      console.log('Save payload:', savePayload);

      if (existingOnboarding) {
        const { error: onboardingError } = await supabase
          .from('onboarding_data')
          .update(savePayload)
          .eq('user_id', user.id);

        if (onboardingError) {
          console.error('Update error:', onboardingError);
          throw onboardingError;
        }
      } else {
        const { error: onboardingError } = await supabase
          .from('onboarding_data')
          .insert({
            user_id: user.id,
            ...savePayload
          });

        if (onboardingError) {
          console.error('Insert error:', onboardingError);
          throw onboardingError;
        }
      }

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

      const { data: existingPrefs } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const prefsPayload = {
        ai_context: aiContext,
        personalization_data: {
          onboardingCompleted: dataToSave.completed,
          completedAt: dataToSave.completed ? new Date().toISOString() : null,
          businessName: dataToSave.businessName
        },
        updated_at: new Date().toISOString()
      };

      if (existingPrefs) {
        const { error: preferencesError } = await supabase
          .from('user_preferences')
          .update(prefsPayload)
          .eq('user_id', user.id);

        if (preferencesError) throw preferencesError;
      } else {
        const { error: preferencesError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            ...prefsPayload
          });

        if (preferencesError) throw preferencesError;
      }

      if (dataToSave.completed) {
        toast({
          title: "Onboarding completed!",
          description: "Your preferences have been saved and your dashboard is being personalized.",
        });
      }

      console.log('Onboarding data saved successfully');
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
    if (!user) {
      console.log('No user found, returning null');
      return null;
    }

    console.log('Fetching onboarding data for user:', user.id);
    
    try {
      const { data, error } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error in getOnboardingData:', error);
        return null;
      }
      
      if (data) {
        console.log('Onboarding data fetched successfully:', data);
        return data;
      } else {
        console.log('No onboarding data found for user - this is normal for new users');
        return null;
      }
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
      return null;
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
