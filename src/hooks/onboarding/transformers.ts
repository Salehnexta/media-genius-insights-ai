
import { OnboardingData } from './types';

export const transformSupabaseToLocal = (supabaseData: any): OnboardingData => {
  if (!supabaseData) return { skillLevel: '', experience: '', businessName: '', industry: '', website: '', socialAccounts: {}, competitors: [], goals: [], budget: '', completed: false };

  const socialAccounts = supabaseData.social_accounts && 
    typeof supabaseData.social_accounts === 'object' && 
    !Array.isArray(supabaseData.social_accounts) 
    ? supabaseData.social_accounts as Record<string, string>
    : {};

  const isCompleted = supabaseData.completed_at !== null;

  return {
    skillLevel: supabaseData.skill_level || '',
    experience: supabaseData.experience || '',
    businessName: supabaseData.business_name || '',
    industry: supabaseData.industry || '',
    website: supabaseData.website || '',
    socialAccounts: socialAccounts,
    competitors: supabaseData.competitors || [],
    goals: supabaseData.goals || [],
    budget: supabaseData.budget || '',
    completed: isCompleted
  };
};

export const transformLocalToSupabase = (localData: OnboardingData) => {
  return {
    skill_level: localData.skillLevel,
    experience: localData.experience,
    business_name: localData.businessName,
    industry: localData.industry,
    website: localData.website,
    social_accounts: localData.socialAccounts,
    competitors: localData.competitors,
    goals: localData.goals,
    budget: localData.budget,
    completed_at: localData.completed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  };
};
