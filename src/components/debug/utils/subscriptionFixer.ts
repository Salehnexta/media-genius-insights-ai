
import { supabase } from '@/integrations/supabase/client';

export const createDefaultSubscription = async (user: any) => {
  if (!user) return;
  
  try {
    // Get the basic plan (first plan by price)
    const { data: plans } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price_sar', { ascending: true })
      .limit(1);

    if (plans && plans.length > 0) {
      const basicPlan = plans[0];
      
      // Create a subscription for the user
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .insert([{
          user_id: user.id,
          plan_id: basicPlan.id,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          status: 'active'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating subscription:', error);
        return { success: false, error };
      } else {
        console.log('Default subscription created:', subscription);
        return { success: true, subscription };
      }
    }
    return { success: false, error: 'No plans found' };
  } catch (error) {
    console.error('Failed to create default subscription:', error);
    return { success: false, error };
  }
};
