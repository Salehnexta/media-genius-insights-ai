
import { supabase } from '@/integrations/supabase/client';
import type { TestResult } from '../types';

export const runAuthenticationTest = (user: any): TestResult => {
  return {
    name: 'Authentication Status',
    status: user ? 'success' : 'error',
    message: user ? `User authenticated: ${user.email}` : 'No user authenticated',
    details: user ? { id: user.id, email: user.email } : null
  };
};

export const runProfileTest = async (user: any): Promise<TestResult> => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return {
        name: 'Profile Access',
        status: 'error',
        message: `Profile error: ${profileError.message}`,
        details: profileError
      };
    } else if (profile) {
      return {
        name: 'Profile Access',
        status: 'success',
        message: 'Profile found and accessible',
        details: profile
      };
    } else {
      return {
        name: 'Profile Access',
        status: 'warning',
        message: 'No profile found for user',
        details: null
      };
    }
  } catch (error) {
    return {
      name: 'Profile Access',
      status: 'error',
      message: `Profile test failed: ${error}`,
      details: error
    };
  }
};

export const runSubscriptionPlansTest = async (): Promise<TestResult> => {
  try {
    const { data: plans, error: plansError } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price_sar', { ascending: true });

    if (plansError) {
      return {
        name: 'Subscription Plans Access',
        status: 'error',
        message: `Plans error: ${plansError.message}`,
        details: plansError
      };
    } else {
      return {
        name: 'Subscription Plans Access',
        status: 'success',
        message: `Subscription plans accessible (${plans?.length || 0} plans found)`,
        details: plans
      };
    }
  } catch (error) {
    return {
      name: 'Subscription Plans Access',
      status: 'error',
      message: `Subscription plans test failed: ${error}`,
      details: error
    };
  }
};

export const runUserSubscriptionsTest = async (user: any): Promise<TestResult> => {
  try {
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (subscriptionsError) {
      return {
        name: 'User Subscriptions Access',
        status: 'error',
        message: `User subscriptions error: ${subscriptionsError.message}`,
        details: subscriptionsError
      };
    } else {
      return {
        name: 'User Subscriptions Access',
        status: subscriptions && subscriptions.length > 0 ? 'success' : 'warning',
        message: subscriptions && subscriptions.length > 0 
          ? `Active subscription found (${subscriptions.length} subscriptions)`
          : 'No active subscriptions found for user',
        details: subscriptions
      };
    }
  } catch (error) {
    return {
      name: 'User Subscriptions Access',
      status: 'error',
      message: `User subscriptions test failed: ${error}`,
      details: error
    };
  }
};

export const runCampaignsTest = async (): Promise<TestResult> => {
  try {
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .limit(5);

    if (campaignsError) {
      return {
        name: 'Campaigns Access',
        status: 'error',
        message: `Campaigns error: ${campaignsError.message}`,
        details: campaignsError
      };
    } else {
      return {
        name: 'Campaigns Access',
        status: 'success',
        message: `Campaigns accessible (${campaigns?.length || 0} found)`,
        details: campaigns
      };
    }
  } catch (error) {
    return {
      name: 'Campaigns Access',
      status: 'error',
      message: `Campaigns test failed: ${error}`,
      details: error
    };
  }
};

export const runContentTest = async (): Promise<TestResult> => {
  try {
    const { data: content, error: contentError } = await supabase
      .from('content')
      .select('*')
      .limit(5);

    if (contentError) {
      return {
        name: 'Content Access',
        status: 'error',
        message: `Content error: ${contentError.message}`,
        details: contentError
      };
    } else {
      return {
        name: 'Content Access',
        status: 'success',
        message: `Content accessible (${content?.length || 0} found)`,
        details: content
      };
    }
  } catch (error) {
    return {
      name: 'Content Access',
      status: 'error',
      message: `Content test failed: ${error}`,
      details: error
    };
  }
};

export const runAiChatTest = async (): Promise<TestResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { 
        message: 'Test message for debugging',
        context: 'general',
        language: 'en'
      }
    });

    if (error) {
      return {
        name: 'AI Chat Function',
        status: 'error',
        message: `AI Chat function error: ${error.message}`,
        details: error
      };
    } else {
      return {
        name: 'AI Chat Function',
        status: 'success',
        message: 'AI Chat function working correctly',
        details: data
      };
    }
  } catch (error) {
    return {
      name: 'AI Chat Function',
      status: 'error',
      message: `AI Chat function test failed: ${error}`,
      details: error
    };
  }
};

export const runImageGenerationTest = async (): Promise<TestResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: { 
        prompt: 'A simple test image',
        style: 'realistic',
        size: '1024x1024'
      }
    });

    if (error) {
      return {
        name: 'Image Generation Function',
        status: 'error',
        message: `Image generation error: ${error.message}`,
        details: error
      };
    } else {
      return {
        name: 'Image Generation Function',
        status: 'success',
        message: 'Image generation function working correctly',
        details: { hasImageUrl: !!data?.imageUrl }
      };
    }
  } catch (error) {
    return {
      name: 'Image Generation Function',
      status: 'error',
      message: `Image generation test failed: ${error}`,
      details: error
    };
  }
};
