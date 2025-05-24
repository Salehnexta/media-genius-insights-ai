
import { agentCommunicationService, AgentTask } from './agentCommunicationService';

interface AgentCapability {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
}

interface CoreSpecializedAgent {
  id: string;
  name: string;
  type: string;
  capabilities: AgentCapability[];
  systemPrompt: string;
  processTask: (task: AgentTask) => Promise<any>;
  getInsights: (context: Record<string, any>) => Promise<string[]>;
  communicationStyle: 'professional' | 'casual' | 'formal' | 'creative';
  expertise: string[];
}

// Marketing Manager - Team Leader and Strategic Planning
export const marketingManagerAgent: CoreSpecializedAgent = {
  id: 'marketing-manager',
  name: 'Marketing Manager AI',
  type: 'marketing_manager',
  communicationStyle: 'professional',
  expertise: ['Strategic Planning', 'Budget Management', 'ROI Analysis', 'Team Coordination', 'Executive Reporting'],
  capabilities: [
    {
      name: 'Strategic Planning',
      description: 'Develop comprehensive marketing strategies and roadmaps',
      inputSchema: { goals: 'array', budget: 'number', timeframe: 'string' },
      outputSchema: { strategy: 'string', milestones: 'array', kpis: 'array' }
    },
    {
      name: 'Budget Management',
      description: 'Allocate and optimize marketing budget across channels',
      inputSchema: { totalBudget: 'number', channels: 'array', priorities: 'array' },
      outputSchema: { allocation: 'object', recommendations: 'array', forecast: 'object' }
    },
    {
      name: 'Performance Analytics',
      description: 'Analyze overall marketing performance and ROI',
      inputSchema: { metrics: 'object', period: 'string', goals: 'array' },
      outputSchema: { analysis: 'string', insights: 'array', recommendations: 'array' }
    }
  ],
  systemPrompt: `You are the Marketing Manager AI, the strategic leader of the marketing team. You coordinate all marketing activities, manage budgets, and ensure alignment with business objectives.

Your key responsibilities:
- Strategic planning and roadmap development
- Budget allocation and ROI optimization
- Team coordination and performance monitoring
- Executive reporting and insights
- Cross-channel campaign oversight

Always provide strategic, data-driven recommendations that align with business goals and maximize marketing effectiveness.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Marketing Manager processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'strategic_planning':
        return {
          strategy: 'Comprehensive Q1 marketing strategy focused on digital transformation',
          milestones: ['Month 1: Campaign setup', 'Month 2: Optimization', 'Month 3: Scale & analyze'],
          kpis: ['30% increase in leads', '25% improvement in conversion rate', '20% reduction in CAC']
        };
      
      case 'budget_allocation':
        return {
          allocation: { 'paid_ads': 40, 'content': 25, 'social': 20, 'email': 15 },
          recommendations: ['Increase social media budget', 'Test new ad platforms', 'Invest in video content'],
          forecast: { expectedROI: 4.2, projectedLeads: 1500 }
        };
      
      default:
        return { result: 'Strategic analysis completed', recommendations: ['Data-driven optimization required'] };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Q1 strategy showing 35% improvement in lead generation across all channels',
      'Budget reallocation to social media yielding 28% better ROI than traditional channels',
      'Cross-team collaboration efficiency increased by 42% with new coordination protocols'
    ];
  }
};

// Content & SEO Specialist
export const contentSeoAgent: CoreSpecializedAgent = {
  id: 'content-seo',
  name: 'Content & SEO Specialist',
  type: 'content_seo',
  communicationStyle: 'professional',
  expertise: ['Long-form Content', 'SEO Optimization', 'Keyword Research', 'Content Analytics', 'Editorial Management'],
  capabilities: [
    {
      name: 'Content Creation',
      description: 'Create long-form content including blogs, articles, and guides',
      inputSchema: { topic: 'string', audience: 'string', keywords: 'array', length: 'number' },
      outputSchema: { content: 'string', title: 'string', meta: 'object', seoScore: 'number' }
    },
    {
      name: 'SEO Optimization',
      description: 'Optimize content for search engines and user experience',
      inputSchema: { content: 'string', targetKeywords: 'array', competitors: 'array' },
      outputSchema: { optimizedContent: 'string', recommendations: 'array', rankingPotential: 'number' }
    },
    {
      name: 'Keyword Research',
      description: 'Research and analyze keywords for content strategy',
      inputSchema: { industry: 'string', competitors: 'array', intent: 'string' },
      outputSchema: { keywords: 'array', difficulty: 'object', opportunities: 'array' }
    }
  ],
  systemPrompt: `You are the Content & SEO Specialist, responsible for creating high-quality, search-optimized content that drives organic traffic and engages audiences.

Your expertise includes:
- Long-form content creation (blogs, articles, guides)
- SEO optimization and technical SEO
- Keyword research and content strategy
- Content performance analysis
- Editorial workflow management

Focus on creating valuable, authoritative content that ranks well and serves user intent while supporting business objectives.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Content & SEO Specialist processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'content_creation':
        return {
          content: `Comprehensive ${task.data.topic} guide optimized for ${task.data.audience}`,
          title: `The Complete Guide to ${task.data.topic}: Expert Insights and Best Practices`,
          meta: { description: 'Expert guide with actionable insights', readTime: '12 min' },
          seoScore: 92
        };
      
      case 'keyword_research':
        return {
          keywords: ['primary keyword', 'long-tail variation 1', 'long-tail variation 2'],
          difficulty: { easy: 15, medium: 45, hard: 40 },
          opportunities: ['Untapped long-tail keywords', 'Featured snippet potential', 'Local SEO opportunities']
        };
      
      default:
        return { result: 'Content analysis completed', seoRecommendations: ['Improve internal linking', 'Add schema markup'] };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Blog content driving 45% more organic traffic with improved keyword targeting',
      'Long-form guides showing 3x higher engagement and 60% longer session duration',
      'SEO optimization resulting in 8 new featured snippets and top 3 rankings for target keywords'
    ];
  }
};

// Social Media Content Creator & Publisher
export const socialCreatorAgent: CoreSpecializedAgent = {
  id: 'social-creator',
  name: 'Social Media Content Creator',
  type: 'social_creator',
  communicationStyle: 'creative',
  expertise: ['Social Media Posts', 'Visual Content', 'Publishing Automation', 'Content Calendar', 'Performance Tracking'],
  capabilities: [
    {
      name: 'Social Content Creation',
      description: 'Create engaging social media posts, captions, and stories',
      inputSchema: { platform: 'string', theme: 'string', audience: 'string', mediaType: 'string' },
      outputSchema: { posts: 'array', hashtags: 'array', scheduledTimes: 'array' }
    },
    {
      name: 'Content Calendar Management',
      description: 'Plan and schedule social media content across platforms',
      inputSchema: { platforms: 'array', frequency: 'object', themes: 'array' },
      outputSchema: { calendar: 'object', schedule: 'array', recommendations: 'array' }
    },
    {
      name: 'Publishing Automation',
      description: 'Automate cross-platform content publishing and scheduling',
      inputSchema: { content: 'array', platforms: 'array', timing: 'object' },
      outputSchema: { publishingPlan: 'object', automation: 'array', tracking: 'object' }
    }
  ],
  systemPrompt: `You are the Social Media Content Creator, specializing in creating engaging, platform-optimized content that drives engagement and builds community.

Your responsibilities include:
- Creating compelling social media posts, captions, and stories
- Managing content calendars across multiple platforms
- Optimizing posting schedules for maximum engagement
- Cross-platform content adaptation and publishing
- Performance tracking and content optimization

Focus on creating authentic, engaging content that resonates with audiences and drives meaningful interactions.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Social Media Content Creator processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'social_content_creation':
        return {
          posts: [
            '🚀 New week, new opportunities! What\'s your biggest goal this week?',
            '💡 Pro tip: Small consistent actions lead to big results. What small step will you take today?',
            '✨ Behind the scenes: Our team working hard to bring you amazing content!'
          ],
          hashtags: ['#MotivationMonday', '#Goals', '#Success', '#TeamWork', '#Innovation'],
          scheduledTimes: ['09:00', '14:00', '17:30']
        };
      
      case 'content_calendar':
        return {
          calendar: { weekly_themes: ['Monday Motivation', 'Tuesday Tips', 'Wednesday Wisdom'] },
          schedule: ['Daily posts at optimal times', 'Weekly video content', 'Monthly live sessions'],
          recommendations: ['Increase video content', 'Add user-generated content', 'Test new formats']
        };
      
      default:
        return { result: 'Social content created successfully', metrics: { postsCreated: 12, engagement: '+25%' } };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Video content generating 80% more engagement than static posts across all platforms',
      'Optimal posting times: 9-11 AM and 7-9 PM for highest audience engagement',
      'User-generated content campaigns showing 150% increase in authentic engagement'
    ];
  }
};

// Social Media & Customer Experience Manager
export const socialCxAgent: CoreSpecializedAgent = {
  id: 'social-cx',
  name: 'Social Media & CX Manager',
  type: 'social_cx',
  communicationStyle: 'formal',
  expertise: ['Social Monitoring', 'Sentiment Analysis', 'Community Management', 'Crisis Detection', 'Competitive Intelligence'],
  capabilities: [
    {
      name: 'Social Monitoring',
      description: 'Monitor social media mentions, comments, and conversations',
      inputSchema: { keywords: 'array', platforms: 'array', timeframe: 'string' },
      outputSchema: { mentions: 'array', sentiment: 'object', trends: 'array' }
    },
    {
      name: 'Sentiment Analysis',
      description: 'Analyze customer sentiment and emotional responses',
      inputSchema: { mentions: 'array', context: 'string', brand: 'string' },
      outputSchema: { sentimentScore: 'number', emotions: 'array', insights: 'array' }
    },
    {
      name: 'Crisis Detection',
      description: 'Detect potential PR crises and reputation threats',
      inputSchema: { mentions: 'array', sentiment: 'object', threshold: 'number' },
      outputSchema: { riskLevel: 'string', alerts: 'array', recommendations: 'array' }
    }
  ],
  systemPrompt: `You are the Social Media & Customer Experience Manager, focused on maintaining brand reputation, monitoring customer sentiment, and managing community interactions.

Your key functions include:
- Real-time social media monitoring and response
- Sentiment analysis and customer experience tracking
- Community management and engagement
- Crisis detection and reputation management
- Competitive intelligence and market insights

Maintain a professional, empathetic approach while protecting and enhancing brand reputation through proactive monitoring and responsive customer service.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Social Media & CX Manager processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'social_monitoring':
        return {
          mentions: ['25 positive mentions', '3 neutral mentions', '1 negative mention'],
          sentiment: { positive: 86, neutral: 10, negative: 4 },
          trends: ['Increasing positive sentiment', 'Growth in brand awareness', 'Strong customer satisfaction']
        };
      
      case 'crisis_detection':
        return {
          riskLevel: 'Low',
          alerts: ['Minor complaint about delivery time - resolved'],
          recommendations: ['Continue monitoring', 'Proactive customer service', 'Follow up on resolution']
        };
      
      default:
        return { result: 'Social monitoring completed', status: 'All systems normal', satisfaction: '94%' };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Customer satisfaction scores improved by 23% through proactive social media engagement',
      'Crisis response time reduced to under 15 minutes with automated monitoring alerts',
      'Competitive intelligence revealing 3 new market opportunities based on competitor gaps'
    ];
  }
};

// Campaign & Performance Marketing Specialist
export const campaignPerformanceAgent: CoreSpecializedAgent = {
  id: 'campaign-performance',
  name: 'Campaign & Performance Specialist',
  type: 'campaign_performance',
  communicationStyle: 'professional',
  expertise: ['Campaign Planning', 'Paid Advertising', 'Performance Analytics', 'ROAS Optimization', 'Email Marketing'],
  capabilities: [
    {
      name: 'Campaign Planning',
      description: 'Plan and execute comprehensive marketing campaigns',
      inputSchema: { objectives: 'array', budget: 'number', channels: 'array', timeline: 'string' },
      outputSchema: { campaignPlan: 'object', timeline: 'array', budget_allocation: 'object' }
    },
    {
      name: 'Paid Advertising',
      description: 'Manage and optimize paid advertising campaigns',
      inputSchema: { platform: 'string', budget: 'number', targeting: 'object', creatives: 'array' },
      outputSchema: { campaigns: 'array', targeting: 'object', optimization: 'array' }
    },
    {
      name: 'Performance Analytics',
      description: 'Analyze campaign performance and optimize for better ROAS',
      inputSchema: { campaigns: 'array', metrics: 'object', goals: 'array' },
      outputSchema: { analysis: 'object', optimization: 'array', forecast: 'object' }
    }
  ],
  systemPrompt: `You are the Campaign & Performance Marketing Specialist, responsible for planning, executing, and optimizing marketing campaigns across all channels with a focus on measurable results.

Your expertise covers:
- Comprehensive campaign planning and execution
- Paid advertising management across platforms
- Performance analytics and ROAS optimization
- Email marketing campaigns and automation
- Conversion tracking and attribution modeling

Focus on data-driven optimization, testing, and scaling successful campaigns while maintaining efficient cost per acquisition and maximizing return on ad spend.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Campaign & Performance Specialist processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'campaign_planning':
        return {
          campaignPlan: { objective: 'Lead generation', channels: ['Google Ads', 'Facebook', 'Email'], duration: '30 days' },
          timeline: ['Week 1: Setup', 'Week 2: Launch', 'Week 3: Optimize', 'Week 4: Scale'],
          budget_allocation: { 'google_ads': 50, 'facebook': 30, 'email': 20 }
        };
      
      case 'performance_optimization':
        return {
          analysis: { current_roas: 4.2, improvement_potential: '25%' },
          optimization: ['Adjust targeting', 'Test new creatives', 'Optimize bidding strategy'],
          forecast: { projected_roas: 5.25, expected_conversions: 320 }
        };
      
      default:
        return { result: 'Campaign optimization completed', performance: 'ROAS improved by 18%', conversions: '+35%' };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Multi-channel campaigns delivering 42% higher ROAS compared to single-channel approach',
      'Email marketing automation contributing 28% of total campaign conversions',
      'Advanced attribution modeling revealing 15% undervalued touchpoints in customer journey'
    ];
  }
};

// Initialize core agents with communication service
export const initializeCoreSpecializedAgents = () => {
  const coreAgents = [
    marketingManagerAgent,
    contentSeoAgent,
    socialCreatorAgent,
    socialCxAgent,
    campaignPerformanceAgent
  ];

  coreAgents.forEach(agent => {
    agentCommunicationService.registerMessageHandler(agent.id, (message) => {
      console.log(`${agent.name} received message: ${message.content}`);
    });
  });

  console.log('Core specialized agents initialized with communication handlers');
};

export const getCoreAgentById = (agentId: string): CoreSpecializedAgent | undefined => {
  const coreAgents = [
    marketingManagerAgent,
    contentSeoAgent,
    socialCreatorAgent,
    socialCxAgent,
    campaignPerformanceAgent
  ];
  return coreAgents.find(agent => agent.id === agentId);
};

export const getAllCoreSpecializedAgents = (): CoreSpecializedAgent[] => {
  return [
    marketingManagerAgent,
    contentSeoAgent,
    socialCreatorAgent,
    socialCxAgent,
    campaignPerformanceAgent
  ];
};
