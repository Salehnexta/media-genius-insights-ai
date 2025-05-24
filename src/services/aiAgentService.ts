import { User } from '@supabase/supabase-js';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  category: string;
  actionable: boolean;
  timestamp: Date;
}

interface AgentContext {
  userProfile: User | null;
  businessInfo?: {
    industry?: string;
    company_name?: string;
  };
  recentActivity?: { type: string; timestamp: Date }[];
  goals?: string[];
  preferences?: {
    language: string;
  };
}

class AIAgentService {
  private openaiApiKey: string | null = null;

  constructor() {
    // Check for OpenAI API key in environment
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
  }

  private async makeOpenAIRequest(messages: any[], language: string = 'en') {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Add language instruction to system message
    const languageInstruction = language === 'ar' 
      ? 'You must respond in Arabic language only. Do not use English words or phrases.'
      : 'You must respond in English language only.';

    const systemMessage = {
      role: 'system',
      content: `${messages[0]?.content || 'You are a helpful AI assistant.'} ${languageInstruction}`
    };

    const requestMessages = [systemMessage, ...messages.slice(1)];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: requestMessages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API request failed:', error);
      throw error;
    }
  }

  async generateDailyInsights(context: AgentContext): Promise<AIInsight[]> {
    const language = context.preferences?.language || 'en';
    
    try {
      const prompt = language === 'ar' 
        ? `بناءً على بيانات المستخدم التالية، قم بإنشاء 3-4 رؤى تسويقية يومية مفيدة باللغة العربية فقط:
           - الصناعة: ${context.businessInfo?.industry || 'تسويق رقمي'}
           - الأهداف: ${context.goals?.join(', ') || 'زيادة المشاركة'}
           
           اجعل الرؤى قابلة للتنفيذ ومحددة. تجنب النصائح العامة.`
        : `Based on the following user data, generate 3-4 actionable daily marketing insights in English only:
           - Industry: ${context.businessInfo?.industry || 'Digital Marketing'}
           - Goals: ${context.goals?.join(', ') || 'Increase engagement'}
           
           Make insights actionable and specific. Avoid generic advice.`;

      const response = await this.makeOpenAIRequest([
        { role: 'system', content: 'You are a marketing expert AI assistant.' },
        { role: 'user', content: prompt }
      ], language);

      // Parse the response into insights
      const insights = this.parseInsightsFromResponse(response, language);
      return insights;
    } catch (error) {
      console.error('Error generating daily insights:', error);
      return this.getFallbackInsights(language);
    }
  }

  async getPersonalizedRecommendations(context: AgentContext, category?: string): Promise<AIInsight[]> {
    const language = context.preferences?.language || 'en';
    
    try {
      const categoryFilter = category ? 
        (language === 'ar' ? `في فئة ${category}` : `in the ${category} category`) : '';
      
      const prompt = language === 'ar'
        ? `بناءً على ملف المستخدم التالي، قم بإنشاء 3 توصيات تسويقية شخصية قابلة للتنفيذ باللغة العربية فقط ${categoryFilter}:
           - الصناعة: ${context.businessInfo?.industry || 'تسويق رقمي'}
           - الأهداف: ${context.goals?.join(', ') || 'زيادة المشاركة'}
           
           يجب أن تكون كل توصية محددة وقابلة للتنفيذ مع خطوات واضحة.`
        : `Based on the following user profile, generate 3 personalized actionable marketing recommendations in English only ${categoryFilter}:
           - Industry: ${context.businessInfo?.industry || 'Digital Marketing'}
           - Goals: ${context.goals?.join(', ') || 'Increase engagement'}
           
           Each recommendation should be specific and actionable with clear steps.`;

      const response = await this.makeOpenAIRequest([
        { role: 'system', content: 'You are a marketing strategy consultant.' },
        { role: 'user', content: prompt }
      ], language);

      const recommendations = this.parseRecommendationsFromResponse(response, language);
      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.getFallbackRecommendations(language);
    }
  }

  async generateSmartSuggestion(fieldType: string, currentValue: string, context: any): Promise<string[]> {
    const language = context.language || 'en';
    
    try {
      const prompt = language === 'ar'
        ? `بناءً على النوع "${fieldType}" والقيمة الحالية "${currentValue}"، اقترح 3 تحسينات أو بدائل باللغة العربية فقط.
           السياق: ${JSON.stringify(context)}
           
           قدم اقتراحات مفيدة ومحددة.`
        : `Based on field type "${fieldType}" and current value "${currentValue}", suggest 3 improvements or alternatives in English only.
           Context: ${JSON.stringify(context)}
           
           Provide helpful and specific suggestions.`;

      const response = await this.makeOpenAIRequest([
        { role: 'system', content: 'You are a content optimization assistant.' },
        { role: 'user', content: prompt }
      ], language);

      return this.parseSuggestionsFromResponse(response);
    } catch (error) {
      console.error('Error generating smart suggestions:', error);
      return language === 'ar' 
        ? ['تحسين النص', 'إضافة كلمات مفتاحية', 'تحسين الجاذبية']
        : ['Improve clarity', 'Add keywords', 'Enhance appeal'];
    }
  }

  private parseInsightsFromResponse(response: string, language: string): AIInsight[] {
    try {
      const parsedResponse = JSON.parse(response);
      if (!Array.isArray(parsedResponse)) {
        console.error('Unexpected response format: Not an array');
        return [];
      }

      return parsedResponse.map((item: any) => ({
        id: item.id || Math.random().toString(36).substring(7),
        title: item.title || 'Untitled Insight',
        description: item.description || 'No description provided.',
        type: item.type || 'general',
        priority: item.priority || 'medium',
        category: item.category || 'marketing',
        actionable: item.actionable !== false,
        timestamp: new Date(item.timestamp || Date.now())
      }));
    } catch (error) {
      console.error('Error parsing insights from response:', error);
      return this.getFallbackInsights(language);
    }
  }

  private parseRecommendationsFromResponse(response: string, language: string): AIInsight[] {
    try {
      const parsedResponse = JSON.parse(response);
      if (!Array.isArray(parsedResponse)) {
        console.error('Unexpected response format: Not an array');
        return [];
      }

      return parsedResponse.map((item: any) => ({
        id: item.id || Math.random().toString(36).substring(7),
        title: item.title || 'Untitled Recommendation',
        description: item.description || 'No description provided.',
        type: item.type || 'recommendation',
        priority: item.priority || 'medium',
        category: item.category || 'general',
        actionable: item.actionable !== false,
        timestamp: new Date(item.timestamp || Date.now())
      }));
    } catch (error) {
      console.error('Error parsing recommendations from response:', error);
      return this.getFallbackRecommendations(language);
    }
  }

  private parseSuggestionsFromResponse(response: string): string[] {
    try {
      const parsedResponse = JSON.parse(response);
      if (!Array.isArray(parsedResponse)) {
        console.error('Unexpected response format: Not an array');
        return [];
      }
      return parsedResponse.map(item => String(item));
    } catch (error) {
      console.error('Error parsing suggestions from response:', error);
      return [];
    }
  }

  private getFallbackInsights(language: string): AIInsight[] {
    if (language === 'ar') {
      return [
        {
          id: 'fallback-1',
          title: 'تحسين المحتوى على وسائل التواصل الاجتماعي',
          description: 'قم بزيادة معدل النشر إلى 3-5 منشورات أسبوعياً لتحسين المشاركة',
          type: 'recommendation',
          priority: 'medium',
          category: 'content_optimization',
          actionable: true,
          timestamp: new Date()
        },
        {
          id: 'fallback-2',
          title: 'تحليل أداء المنافسين',
          description: 'راقب استراتيجيات المحتوى للمنافسين الرئيسيين لتحديد الفرص',
          type: 'opportunity',
          priority: 'high',
          category: 'competitor_analysis',
          actionable: true,
          timestamp: new Date()
        }
      ];
    }

    return [
      {
        id: 'fallback-1',
        title: 'Optimize Social Media Content',
        description: 'Increase posting frequency to 3-5 posts per week to improve engagement',
        type: 'recommendation',
        priority: 'medium',
        category: 'content_optimization',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: 'fallback-2',
        title: 'Competitor Performance Analysis',
        description: 'Monitor key competitors content strategies to identify opportunities',
        type: 'opportunity',
        priority: 'high',
        category: 'competitor_analysis',
        actionable: true,
        timestamp: new Date()
      }
    ];
  }

  private getFallbackRecommendations(language: string): AIInsight[] {
    if (language === 'ar') {
      return [
        {
          id: 'rec-fallback-1',
          title: 'تحسين استراتيجية المحتوى',
          description: 'قم بإنشاء تقويم محتوى شهري مع مواضيع متنوعة لجذب جمهور أوسع',
          type: 'recommendation',
          priority: 'high',
          category: 'content_strategy',
          actionable: true,
          timestamp: new Date()
        }
      ];
    }

    return [
      {
        id: 'rec-fallback-1',
        title: 'Enhance Content Strategy',
        description: 'Create a monthly content calendar with diverse topics to attract wider audience',
        type: 'recommendation',
        priority: 'high',
        category: 'content_strategy',
        actionable: true,
        timestamp: new Date()
      }
    ];
  }
}

export const aiAgentService = new AIAgentService();
export type { AIInsight, AgentContext };
