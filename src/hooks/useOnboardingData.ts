import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { OnboardingData, defaultOnboardingData } from './onboarding/types';
import { loadOnboardingData, saveOnboardingData, saveUserPreferences, getOnboardingData } from './onboarding/onboardingService';

export const useOnboardingData = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);

  // Load existing data when user is available
  useEffect(() => {
    if (user && !authLoading) {
      loadExistingData();
    } else if (!user && !authLoading) {
      setData(defaultOnboardingData);
    }
  }, [user, authLoading]);

  const loadExistingData = async () => {
    if (!user) {
      console.log('No user available for loading onboarding data');
      return;
    }

    setLoading(true);
    try {
      const existingData = await loadOnboardingData(user.id);
      
      if (existingData) {
        setData(existingData);
      } else {
        setData(defaultOnboardingData);
      }
    } catch (error) {
      console.error('Unexpected error loading onboarding data:', error);
      setData(defaultOnboardingData);
    } finally {
      setLoading(false);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    console.log('Updating onboarding data:', updates);
    setData(prev => ({ ...prev, ...updates }));
  };

  const saveData = async () => {
    return await saveOnboardingDataWithPreferences(data);
  };

  const saveOnboardingDataWithPreferences = async (dataToSave: OnboardingData) => {
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
      await saveOnboardingData(user.id, dataToSave);
      await saveUserPreferences(user.id, dataToSave);

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

  const getOnboardingDataWrapper = async () => {
    if (!user) {
      console.log('No user found, returning null');
      return null;
    }

    return await getOnboardingData(user.id);
  };

  return {
    data,
    updateData,
    saveData,
    saveOnboardingData: saveOnboardingDataWithPreferences,
    getOnboardingData: getOnboardingDataWrapper,
    loading,
    saving
  };
};
