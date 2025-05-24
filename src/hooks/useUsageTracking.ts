
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UsageData {
  messageCount: number;
  contentGenerationCount: number;
  apiCallsCount: number;
  monthlyLimit: number;
  overage: number;
}

export const useUsageTracking = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageData>({
    messageCount: 0,
    contentGenerationCount: 0,
    apiCallsCount: 0,
    monthlyLimit: 1000,
    overage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUsageData();
    }
  }, [user]);

  const fetchUsageData = async () => {
    try {
      // Fetch current month usage
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

      const { data: currentUsage, error } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('user_id', user?.id)
        .gte('period_start', startOfMonth.toISOString())
        .lte('period_end', endOfMonth.toISOString())
        .single();

      if (!error && currentUsage) {
        setUsage({
          messageCount: currentUsage.message_count,
          contentGenerationCount: currentUsage.content_generation_count,
          apiCallsCount: currentUsage.api_calls_count,
          monthlyLimit: 1000, // This should come from subscription plan
          overage: Math.max(0, currentUsage.message_count - 1000)
        });
      }
    } catch (error) {
      console.error('Error fetching usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackUsage = async (type: 'message' | 'content' | 'api') => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('increment_usage', {
        p_user_id: user.id,
        p_usage_type: type
      });

      if (!error) {
        // Update local state
        setUsage(prev => ({
          ...prev,
          messageCount: type === 'message' ? prev.messageCount + 1 : prev.messageCount,
          contentGenerationCount: type === 'content' ? prev.contentGenerationCount + 1 : prev.contentGenerationCount,
          apiCallsCount: type === 'api' ? prev.apiCallsCount + 1 : prev.apiCallsCount
        }));
      }
    } catch (error) {
      console.error('Error tracking usage:', error);
    }
  };

  const canUseFeature = (type: 'message' | 'content' | 'api'): boolean => {
    switch (type) {
      case 'message':
        return usage.messageCount < usage.monthlyLimit;
      case 'content':
        return usage.contentGenerationCount < 100; // Example limit
      case 'api':
        return usage.apiCallsCount < 1000; // Example limit
      default:
        return true;
    }
  };

  return {
    usage,
    loading,
    trackUsage,
    canUseFeature,
    refreshUsage: fetchUsageData
  };
};
