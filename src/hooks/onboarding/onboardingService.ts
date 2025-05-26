
import { supabase } from '@/integrations/supabase/client';
import { transformSupabaseToLocal, transformLocalToSupabase } from './transformers';
import { OnboardingData } from './types';

export const loadOnboardingData = async (userId: string) => {
  console.log('Loading onboarding data for user:', userId);
  
  const { data: existingData, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error loading onboarding data:', error);
    throw error;
  }

  if (existingData) {
    console.log('Found existing onboarding data:', existingData);
    return transformSupabaseToLocal(existingData);
  }

  console.log('No existing onboarding data found - using defaults');
  return null;
};

// Helper function to delete records in batches
const deleteDuplicatesInBatches = async (duplicateIds: string[], batchSize = 10) => {
  console.log(`Deleting ${duplicateIds.length} duplicate records in batches of ${batchSize}`);
  
  for (let i = 0; i < duplicateIds.length; i += batchSize) {
    const batch = duplicateIds.slice(i, i + batchSize);
    
    try {
      const { error } = await supabase
        .from('onboarding_data')
        .delete()
        .in('id', batch);

      if (error) {
        console.warn(`Error deleting batch ${i / batchSize + 1}:`, error);
        // Continue with next batch even if one fails
      } else {
        console.log(`Successfully deleted batch ${i / batchSize + 1} (${batch.length} records)`);
      }
    } catch (error) {
      console.warn(`Failed to delete batch ${i / batchSize + 1}:`, error);
      // Continue with next batch
    }
    
    // Small delay between batches to avoid overwhelming the server
    if (i + batchSize < duplicateIds.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
};

export const saveOnboardingData = async (userId: string, data: OnboardingData) => {
  console.log('=== SAVE ONBOARDING DATA DEBUG ===');
  console.log('User ID:', userId);
  console.log('Input data:', data);
  console.log('data.completed:', data.completed, typeof data.completed);
  console.log('Will set completed_at to:', data.completed ? new Date().toISOString() : null);

  // Check if there are any existing records
  const { data: existingRecords } = await supabase
    .from('onboarding_data')
    .select('id')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  const savePayload = transformLocalToSupabase(data);
  
  // Ensure completion status is properly set
  if (data.completed) {
    savePayload.completed_at = new Date().toISOString();
  } else {
    savePayload.completed_at = null;
  }
  
  console.log('=== TRANSFORMATION DEBUG ===');
  console.log('Save payload after transformation:', savePayload);
  console.log('completed_at value:', savePayload.completed_at);
  console.log('completed_at type:', typeof savePayload.completed_at);

  if (existingRecords && existingRecords.length > 0) {
    // Update the most recent record
    const mostRecentId = existingRecords[0].id;
    console.log('=== UPDATING EXISTING RECORD ===');
    console.log('Record ID:', mostRecentId);
    console.log('Final payload being sent to Supabase:', savePayload);
    
    const { error: onboardingError } = await supabase
      .from('onboarding_data')
      .update(savePayload)
      .eq('id', mostRecentId);

    if (onboardingError) {
      console.error('Update error:', onboardingError);
      throw onboardingError;
    }

    console.log('=== UPDATE SUCCESSFUL ===');

    // Clean up duplicates if there are more than 5 records (batch delete)
    if (existingRecords.length > 5) {
      const duplicateIds = existingRecords.slice(1).map(record => record.id);
      console.log('Found many duplicates, cleaning up in background:', duplicateIds.length);
      
      // Delete duplicates in background without blocking the save operation
      deleteDuplicatesInBatches(duplicateIds).catch(error => {
        console.warn('Background cleanup failed (non-critical):', error);
      });
    } else if (existingRecords.length > 1) {
      // For smaller numbers, delete immediately but with error handling
      const duplicateIds = existingRecords.slice(1).map(record => record.id);
      
      try {
        const { error: deleteError } = await supabase
          .from('onboarding_data')
          .delete()
          .in('id', duplicateIds);

        if (deleteError) {
          console.warn('Error deleting duplicates (non-critical):', deleteError);
        }
      } catch (error) {
        console.warn('Failed to delete duplicates (non-critical):', error);
      }
    }
  } else {
    // Create new record
    console.log('=== CREATING NEW RECORD ===');
    console.log('Final payload being sent to Supabase:', savePayload);
    
    const { error: onboardingError } = await supabase
      .from('onboarding_data')
      .insert({
        user_id: userId,
        ...savePayload
      });

    if (onboardingError) {
      console.error('Insert error:', onboardingError);
      throw onboardingError;
    }

    console.log('=== INSERT SUCCESSFUL ===');
  }
  
  console.log('=== SAVE OPERATION COMPLETED ===');
};

export const saveUserPreferences = async (userId: string, data: OnboardingData) => {
  // Create AI context for personalization
  const aiContext = {
    businessType: data.industry,
    skillLevel: data.skillLevel,
    experience: data.experience,
    goals: data.goals,
    budget: data.budget,
    hasWebsite: !!data.website,
    socialPlatforms: Object.keys(data.socialAccounts || {}),
    competitorCount: (data.competitors || []).length
  };

  const { data: existingPrefs } = await supabase
    .from('user_preferences')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  const prefsPayload = {
    ai_context: aiContext,
    personalization_data: {
      onboardingCompleted: data.completed,
      completedAt: data.completed ? new Date().toISOString() : null,
      businessName: data.businessName
    },
    updated_at: new Date().toISOString()
  };

  if (existingPrefs) {
    const { error: preferencesError } = await supabase
      .from('user_preferences')
      .update(prefsPayload)
      .eq('user_id', userId);

    if (preferencesError) throw preferencesError;
  } else {
    const { error: preferencesError } = await supabase
      .from('user_preferences')
      .insert({
        user_id: userId,
        ...prefsPayload
      });

    if (preferencesError) throw preferencesError;
  }
};

export const getOnboardingData = async (userId: string) => {
  console.log('=== GET ONBOARDING DATA DEBUG ===');
  console.log('Fetching onboarding data for user:', userId);
  
  try {
    const { data, error } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error in getOnboardingData:', error);
      return null;
    }
    
    if (data) {
      console.log('Raw onboarding data from database:', data);
      console.log('completed_at field:', data.completed_at);
      console.log('completed_at is null?', data.completed_at === null);
      console.log('completed_at type:', typeof data.completed_at);
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
