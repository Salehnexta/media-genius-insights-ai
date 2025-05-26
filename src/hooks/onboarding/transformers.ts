
import { OnboardingData } from './types';

export const transformSupabaseToLocal = (supabaseData: any): OnboardingData => {
  if (!supabaseData) return { 
    client_name: '',
    client_email: '',
    client_phone: '',
    business_name: '',
    website: '',
    monthly_budget: 0,
    extracted_social_accounts: {},
    ai_suggested_industry: '',
    ai_suggested_business_type: '',
    ai_suggested_target_age_range: '',
    ai_suggested_target_gender: 'both',
    ai_suggested_target_interests: [],
    ai_suggested_target_location: '',
    ai_discovered_competitors: [],
    ai_suggested_marketing_goals: [],
    ai_suggested_channels: {},
    ai_suggested_posting_times: {},
    ai_suggested_content_types: {},
    user_confirmations: {},
    ai_extraction_status: 'pending',
    social_extraction_status: 'pending',
    website_analysis_data: {},
    skillLevel: '', 
    experience: '', 
    industry: '', 
    socialAccounts: {}, 
    competitors: [], 
    goals: [], 
    budget: '', 
    completed: false 
  };

  // Check completion status
  const isCompleted = supabaseData.completed_at !== null && supabaseData.completed_at !== undefined;
  
  console.log('=== TRANSFORM SUPABASE TO LOCAL ===');
  console.log('Raw completed_at from DB:', supabaseData.completed_at);
  console.log('Transformed completed status:', isCompleted);

  return {
    // New fields
    client_name: supabaseData.client_name || '',
    client_email: supabaseData.client_email || '',
    client_phone: supabaseData.client_phone || '',
    business_name: supabaseData.business_name || '',
    website: supabaseData.website || '',
    monthly_budget: supabaseData.monthly_budget || 0,
    extracted_social_accounts: supabaseData.extracted_social_accounts || {},
    ai_suggested_industry: supabaseData.ai_suggested_industry || '',
    ai_suggested_business_type: supabaseData.ai_suggested_business_type || '',
    ai_suggested_target_age_range: supabaseData.ai_suggested_target_age_range || '',
    ai_suggested_target_gender: supabaseData.ai_suggested_target_gender || 'both',
    ai_suggested_target_interests: supabaseData.ai_suggested_target_interests || [],
    ai_suggested_target_location: supabaseData.ai_suggested_target_location || '',
    ai_discovered_competitors: supabaseData.ai_discovered_competitors || [],
    ai_suggested_marketing_goals: supabaseData.ai_suggested_marketing_goals || [],
    ai_suggested_channels: supabaseData.ai_suggested_channels || {},
    ai_suggested_posting_times: supabaseData.ai_suggested_posting_times || {},
    ai_suggested_content_types: supabaseData.ai_suggested_content_types || {},
    user_confirmations: supabaseData.user_confirmations || {},
    ai_extraction_status: supabaseData.ai_extraction_status || 'pending',
    social_extraction_status: supabaseData.social_extraction_status || 'pending',
    website_analysis_data: supabaseData.website_analysis_data || {},
    
    // Legacy fields for compatibility
    skillLevel: supabaseData.skill_level || '',
    experience: supabaseData.experience || '',
    industry: supabaseData.industry || '',
    socialAccounts: supabaseData.social_accounts || {},
    competitors: supabaseData.competitors || [],
    goals: supabaseData.goals || [],
    budget: supabaseData.budget || '',
    completed: isCompleted
  };
};

export const transformLocalToSupabase = (localData: OnboardingData) => {
  console.log('=== TRANSFORM LOCAL TO SUPABASE ===');
  console.log('Input completed status:', localData.completed);
  
  // When completed is true, set completed_at to current timestamp
  const completedAt = localData.completed ? new Date().toISOString() : null;
  
  console.log('Setting completed_at to:', completedAt);
  
  const transformed = {
    // New fields
    client_name: localData.client_name,
    client_email: localData.client_email,
    client_phone: localData.client_phone,
    business_name: localData.business_name,
    website: localData.website,
    monthly_budget: localData.monthly_budget,
    extracted_social_accounts: localData.extracted_social_accounts,
    ai_suggested_industry: localData.ai_suggested_industry,
    ai_suggested_business_type: localData.ai_suggested_business_type,
    ai_suggested_target_age_range: localData.ai_suggested_target_age_range,
    ai_suggested_target_gender: localData.ai_suggested_target_gender,
    ai_suggested_target_interests: localData.ai_suggested_target_interests,
    ai_suggested_target_location: localData.ai_suggested_target_location,
    ai_discovered_competitors: localData.ai_discovered_competitors,
    ai_suggested_marketing_goals: localData.ai_suggested_marketing_goals,
    ai_suggested_channels: localData.ai_suggested_channels,
    ai_suggested_posting_times: localData.ai_suggested_posting_times,
    ai_suggested_content_types: localData.ai_suggested_content_types,
    user_confirmations: localData.user_confirmations,
    ai_extraction_status: localData.ai_extraction_status,
    social_extraction_status: localData.social_extraction_status,
    website_analysis_data: localData.website_analysis_data,
    
    // Legacy fields
    skill_level: localData.skillLevel,
    experience: localData.experience,
    industry: localData.industry,
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
