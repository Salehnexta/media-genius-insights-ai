
import { supabase } from '@/integrations/supabase/client';

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  context: string;
  isActive: boolean;
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'insight' | 'alert' | 'opportunity';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  timestamp: Date;
}

export interface AgentContext {
  userProfile: any;
  businessInfo: any;
  recentActivity: any[];
  goals: string[];
  preferences: any;
}

class AIAgentService {
  private agents: AIAgent[] = [
    {
      id: 'strategy-agent',
      name: 'Strategic Advisor',
      role: 'marketing_strategist',
      expertise: ['strategy', 'planning', 'market_analysis', 'competitive_intelligence'],
      context: 'You are a senior marketing strategist with expertise in developing comprehensive marketing strategies.',
      isActive: true
    },
    {
      id: 'content-agent',
      name: 'Content Specialist',
      role: 'content_creator',
      expertise: ['content_creation', 'copywriting', 'social_media', 'storytelling'],
      context: 'You are a creative content specialist focused on engaging storytelling and brand voice.',
      isActive: true
    },
    {
      id: 'analytics-agent',
      name: 'Analytics Expert',
      role: 'data_analyst',
      expertise: ['data_analysis', 'performance_tracking', 'roi_optimization', 'reporting'],
      context: 'You are a data-driven analytics expert who identifies trends and optimization opportunities.',
      isActive: true
    },
    {
      id: 'growth-agent',
      name: 'Growth Hacker',
      role: 'growth_specialist',
      expertise: ['growth_hacking', 'conversion_optimization', 'user_acquisition', 'scaling'],
      context: 'You are a growth hacking specialist focused on rapid, scalable growth strategies.',
      isActive: true
    }
  ];

  async generateDailyInsights(userContext: AgentContext): Promise<AIInsight[]> {
    try {
      const insights: AIInsight[] = [];
      
      // Generate insights from each active agent
      for (const agent of this.agents.filter(a => a.isActive)) {
        const agentInsight = await this.getAgentInsight(agent, userContext);
        if (agentInsight) {
          insights.push(agentInsight);
        }
      }

      return insights;
    } catch (error) {
      console.error('Error generating daily insights:', error);
      return this.getFallbackInsights();
    }
  }

  private async getAgentInsight(agent: AIAgent, context: AgentContext): Promise<AIInsight | null> {
    try {
      const prompt = this.buildAgentPrompt(agent, context);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: prompt,
          context: agent.role,
          language: 'en'
        }
      });

      if (error) throw error;

      return this.parseAgentResponse(agent, data.response);
    } catch (error) {
      console.error(`Error getting insight from ${agent.name}:`, error);
      return null;
    }
  }

  private buildAgentPrompt(agent: AIAgent, context: AgentContext): string {
    return `${agent.context}

Based on the following business context, provide ONE specific, actionable insight or recommendation:

Business Profile:
- Industry: ${context.businessInfo?.industry || 'Not specified'}
- Company: ${context.businessInfo?.company_name || 'Not specified'}
- Goals: ${context.goals?.join(', ') || 'Growth and engagement'}

Recent Activity:
- User has been active in: ${context.recentActivity?.map(a => a.type).join(', ') || 'dashboard, campaigns'}

Your expertise areas: ${agent.expertise.join(', ')}

Provide a specific, actionable insight in this JSON format:
{
  "type": "recommendation|insight|alert|opportunity",
  "title": "Brief title (max 50 chars)",
  "description": "Detailed description (max 200 chars)",
  "priority": "high|medium|low",
  "category": "One of your expertise areas",
  "actionable": true
}

Focus on practical, implementable advice based on your role as ${agent.name}.`;
  }

  private parseAgentResponse(agent: AIAgent, response: string): AIInsight {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          id: `${agent.id}-${Date.now()}`,
          type: parsed.type || 'insight',
          title: parsed.title || `${agent.name} Recommendation`,
          description: parsed.description || response.substring(0, 200),
          priority: parsed.priority || 'medium',
          category: parsed.category || agent.expertise[0],
          actionable: parsed.actionable !== false,
          timestamp: new Date()
        };
      }
    } catch (error) {
      console.error('Error parsing agent response:', error);
    }

    // Fallback if JSON parsing fails
    return {
      id: `${agent.id}-${Date.now()}`,
      type: 'insight',
      title: `${agent.name} Insight`,
      description: response.substring(0, 200),
      priority: 'medium',
      category: agent.expertise[0],
      actionable: true,
      timestamp: new Date()
    };
  }

  private getFallbackInsights(): AIInsight[] {
    return [
      {
        id: 'fallback-1',
        type: 'recommendation',
        title: 'Optimize Content Timing',
        description: 'Consider posting content during peak engagement hours (9-11 AM and 3-5 PM) to maximize reach.',
        priority: 'medium',
        category: 'content_creation',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: 'fallback-2',
        type: 'insight',
        title: 'Audience Engagement Opportunity',
        description: 'Your audience shows higher engagement with video content. Consider increasing video production.',
        priority: 'high',
        category: 'strategy',
        actionable: true,
        timestamp: new Date()
      }
    ];
  }

  async getPersonalizedRecommendations(userContext: AgentContext, category?: string): Promise<AIInsight[]> {
    const allInsights = await this.generateDailyInsights(userContext);
    
    if (category) {
      return allInsights.filter(insight => insight.category === category);
    }
    
    return allInsights.filter(insight => insight.type === 'recommendation');
  }

  getAgents(): AIAgent[] {
    return this.agents;
  }

  async generateSmartSuggestion(fieldType: string, currentValue: string, context: any): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: `Generate 3 smart suggestions for a ${fieldType} field. Current value: "${currentValue}". Context: ${JSON.stringify(context)}. Return only a JSON array of strings.`,
          context: 'content',
          language: 'en'
        }
      });

      if (error) throw error;

      // Try to parse JSON array from response
      const arrayMatch = data.response.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        return JSON.parse(arrayMatch[0]);
      }
      
      // Fallback: split by lines and clean up
      return data.response
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .slice(0, 3)
        .map((line: string) => line.replace(/^[\d\-\*\.\s]+/, '').trim());
        
    } catch (error) {
      console.error('Error generating smart suggestions:', error);
      return this.getFallbackSuggestions(fieldType);
    }
  }

  private getFallbackSuggestions(fieldType: string): string[] {
    const suggestions: Record<string, string[]> = {
      title: ['Engaging Title Here', 'Compelling Headline', 'Attention-Grabbing Title'],
      description: ['Detailed description that engages your audience', 'Compelling story that resonates', 'Clear value proposition'],
      content: ['Share valuable insights', 'Tell your brand story', 'Engage with your community'],
      campaign_name: ['Summer Launch Campaign', 'Brand Awareness Drive', 'Product Spotlight Series']
    };

    return suggestions[fieldType] || ['Smart suggestion', 'AI-powered idea', 'Optimized content'];
  }
}

export const aiAgentService = new AIAgentService();
