
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  metadata: Record<string, any>;
  created_at: string;
}

export const useAIInsights = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generatePersonalizedInsights = async () => {
    if (!user) return;

    setGenerating(true);
    try {
      // Get user's onboarding data and preferences
      const { data: onboardingData } = await supabase
        .from('onboarding_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!onboardingData) {
        console.log('No onboarding data found for insights generation');
        return;
      }

      // Generate insights based on user data
      const contextualInsights = await generateInsightsFromData(onboardingData, preferences);
      
      // Save insights to database
      const { error } = await supabase
        .from('ai_insights')
        .insert(
          contextualInsights.map(insight => ({
            user_id: user.id,
            insight_type: insight.category,
            title: insight.title,
            description: insight.description,
            category: insight.category,
            priority: insight.priority,
            actionable: insight.actionable,
            metadata: insight.metadata
          }))
        );

      if (error) throw error;

      await fetchInsights();
      
      toast({
        title: "AI Insights Generated",
        description: `Generated ${contextualInsights.length} personalized insights for your business.`,
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: "Error generating insights",
        description: "There was an issue generating your AI insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const fetchInsights = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (insightId: string) => {
    try {
      const { error } = await supabase
        .from('ai_insights')
        .update({ is_read: true })
        .eq('id', insightId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setInsights(prev => 
        prev.map(insight => 
          insight.id === insightId 
            ? { ...insight, is_read: true }
            : insight
        )
      );
    } catch (error) {
      console.error('Error marking insight as read:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInsights();
    }
  }, [user]);

  return {
    insights,
    loading,
    generating,
    generatePersonalizedInsights,
    fetchInsights,
    markAsRead
  };
};

// Helper function to generate insights based on user data
const generateInsightsFromData = async (onboardingData: any, preferences: any) => {
  const insights = [];

  // Skill-based insights
  if (onboardingData.skill_level === 'beginner') {
    insights.push({
      title: "Start with Social Media Basics",
      description: "Focus on building a consistent presence on 2-3 social platforms before expanding.",
      category: "getting_started",
      priority: "high" as const,
      actionable: true,
      metadata: { skillLevel: onboardingData.skill_level }
    });
  }

  // Industry-specific insights
  if (onboardingData.industry) {
    insights.push({
      title: `${onboardingData.industry} Marketing Trends`,
      description: `Latest marketing strategies performing well in the ${onboardingData.industry} industry.`,
      category: "industry_trends",
      priority: "medium" as const,
      actionable: true,
      metadata: { industry: onboardingData.industry }
    });
  }

  // Budget-based recommendations
  if (onboardingData.budget === 'under-1k') {
    insights.push({
      title: "Cost-Effective Marketing Strategies",
      description: "Maximize your limited budget with organic content and community engagement.",
      category: "budget_optimization",
      priority: "high" as const,
      actionable: true,
      metadata: { budget: onboardingData.budget }
    });
  }

  // Goal-based insights
  if (onboardingData.goals?.includes('brand-awareness')) {
    insights.push({
      title: "Brand Awareness Campaign Ideas",
      description: "Content strategies to increase your brand visibility and recognition.",
      category: "strategy",
      priority: "medium" as const,
      actionable: true,
      metadata: { goals: onboardingData.goals }
    });
  }

  return insights;
};
