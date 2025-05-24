
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RealWebsiteAnalysisService, RealWebsiteAnalysisResult } from '@/services/realWebsiteAnalysis';

export const useRealWebsiteAnalysis = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyzeWebsite = async (url: string): Promise<RealWebsiteAnalysisResult | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to analyze websites",
        variant: "destructive"
      });
      return null;
    }

    setAnalyzing(true);
    try {
      console.log('Starting real website analysis for:', url);
      
      // Perform real website analysis
      const analysis = await RealWebsiteAnalysisService.analyzeWebsite(url);
      
      // Save analysis to database
      const { error } = await supabase
        .from('website_analysis')
        .upsert({
          user_id: user.id,
          website_url: url,
          analysis_data: analysis,
          seo_score: analysis.seoScore,
          performance_score: analysis.performanceScore,
          mobile_score: analysis.mobileScore,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving website analysis:', error);
        throw error;
      }

      toast({
        title: "Website analysis complete!",
        description: `SEO Score: ${analysis.seoScore}%, Performance: ${analysis.performanceScore}%`,
      });

      return analysis;
    } catch (error) {
      console.error('Error analyzing website:', error);
      toast({
        title: "Analysis failed",
        description: "There was an issue analyzing the website. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  const getWebsiteAnalysis = async (url: string) => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_analysis')
        .select('*')
        .eq('user_id', user.id)
        .eq('website_url', url)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching website analysis:', error);
        throw error;
      }

      return data?.analysis_data || null;
    } catch (error) {
      console.error('Error fetching website analysis:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeWebsite,
    getWebsiteAnalysis,
    analyzing,
    loading
  };
};
