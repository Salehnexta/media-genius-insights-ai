
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RealSocialMediaAnalysisService, SocialMediaMetrics } from '@/services/realSocialMediaAnalysis';

export const useRealSocialMediaAnalysis = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyzeSocialAccount = async (platform: string, url: string): Promise<SocialMediaMetrics | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to analyze social media accounts",
        variant: "destructive"
      });
      return null;
    }

    // Validate URL format
    if (!RealSocialMediaAnalysisService.validateSocialMediaUrl(platform, url)) {
      toast({
        title: "Invalid URL",
        description: `Please enter a valid ${platform} URL`,
        variant: "destructive"
      });
      return null;
    }

    setAnalyzing(true);
    try {
      console.log(`Starting real ${platform} analysis for:`, url);
      
      // Perform real social media analysis
      const metrics = await RealSocialMediaAnalysisService.analyzeSocialAccount(platform, url);
      const handle = RealSocialMediaAnalysisService.extractHandleFromUrl(platform, url);
      
      // Save analysis to database
      const { error } = await supabase
        .from('social_media_accounts')
        .upsert({
          user_id: user.id,
          platform: platform,
          account_url: url,
          account_handle: handle,
          metrics_data: metrics,
          last_sync: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving social media analysis:', error);
        throw error;
      }

      toast({
        title: "Social media analysis complete!",
        description: `${platform}: ${metrics.followers} followers, ${metrics.engagement_rate}% engagement`,
      });

      return metrics;
    } catch (error) {
      console.error(`Error analyzing ${platform} account:`, error);
      toast({
        title: "Analysis failed",
        description: `There was an issue analyzing the ${platform} account. Please try again.`,
        variant: "destructive"
      });
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  const getSocialMediaAnalysis = async (platform: string, url: string) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('platform', platform)
        .eq('account_url', url)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching social media analysis:', error);
        throw error;
      }

      return data?.metrics_data || null;
    } catch (error) {
      console.error('Error fetching social media analysis:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllUserSocialAccounts = async () => {
    if (!user) return [];

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user social accounts:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user social accounts:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeSocialAccount,
    getSocialMediaAnalysis,
    getAllUserSocialAccounts,
    analyzing,
    loading
  };
};
