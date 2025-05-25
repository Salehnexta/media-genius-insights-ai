
import { OnboardingData } from './types';

export const transformSupabaseToLocal = (supabaseData: any): OnboardingData => {
  if (!supabaseData) return { 
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

  const socialAccounts = supabaseData.social_accounts && 
    typeof supabaseData.social_accounts === 'object' && 
    !Array.isArray(supabaseData.social_accounts) 
    ? supabaseData.social_accounts as Record<string, string>
    : {};

  // Fix the completion check - check if completed_at is not null
  const isCompleted = supabaseData.completed_at !== null && supabaseData.completed_at !== undefined;
  
  console.log('=== TRANSFORM SUPABASE TO LOCAL ===');
  console.log('Raw completed_at from DB:', supabaseData.completed_at);
  console.log('Transformed completed status:', isCompleted);

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
  console.log('=== TRANSFORM LOCAL TO SUPABASE ===');
  console.log('Input completed status:', localData.completed);
  
  // Critical fix: when completed is true, set completed_at to current timestamp
  const completedAt = localData.completed ? new Date().toISOString() : null;
  
  console.log('Setting completed_at to:', completedAt);
  
  const transformed = {
    skill_level: localData.skillLevel,
    experience: localData.experience,
    business_name: localData.businessName,
    industry: localData.industry,
    website: localData.website,
    social_accounts: localData.socialAccounts,
    competitors: localData.competitors,
    goals: localData.goals,
    budget: localData.budget,
    completed_at: completedAt,
    updated_at: new Date().toISOString()
  };
  
  console.log('Final transformed payload:', transformed);
  return transformed;
};
