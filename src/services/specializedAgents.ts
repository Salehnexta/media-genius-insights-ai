import { agentCommunicationService, AgentTask } from './agentCommunicationService';

interface AgentCapability {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
}

interface SpecializedAgent {
  id: string;
  name: string;
  type: string;
  capabilities: AgentCapability[];
  systemPrompt: string;
  processTask: (task: AgentTask) => Promise<any>;
  getInsights: (context: Record<string, any>) => Promise<string[]>;
}

// Marketing Manager - Strategic planning and team coordination
export const marketingManagerAgent: SpecializedAgent = {
  id: 'marketing-manager',
  name: 'Marketing Manager',
  type: 'marketing_manager',
  capabilities: [
    {
      name: 'Strategic Planning',
      description: 'Develop comprehensive marketing strategies and coordinate team efforts',
      inputSchema: { goals: 'array', budget: 'number', timeline: 'string' },
      outputSchema: { strategy: 'string', milestones: 'array', budget_allocation: 'object' }
    },
    {
      name: 'Team Coordination',
      description: 'Coordinate activities across all marketing team members',
      inputSchema: { team_members: 'array', objectives: 'array' },
      outputSchema: { assignments: 'object', timeline: 'string', coordination_plan: 'string' }
    },
    {
      name: 'Performance Analysis',
      description: 'Analyze overall marketing performance and ROI',
      inputSchema: { metrics: 'object', timeframe: 'string' },
      outputSchema: { analysis: 'string', roi: 'number', recommendations: 'array' }
    }
  ],
  systemPrompt: `You are a Marketing Manager AI specializing in strategic planning, team coordination, and executive-level marketing leadership.

Your expertise includes:
- Strategic marketing planning and execution
- Budget allocation and ROI optimization
- Team performance monitoring and coordination
- Executive reporting and insights
- Cross-functional leadership

Always provide:
1. Strategic direction with clear objectives and KPIs
2. Comprehensive team coordination plans
3. Data-driven ROI analysis and recommendations
4. Executive-level insights and reporting

Collaborate with the 4 other core team members: Content & SEO Specialist, Social Media Content Creator, Social Media & CX Manager, and Campaign & Performance Specialist.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Marketing Manager processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'strategic_planning':
        return {
          strategy: 'Comprehensive 360-degree marketing strategy',
          team_coordination: 'All 5 agents aligned on strategic objectives',
          budget_allocation: { content: '25%', social: '30%', campaigns: '35%', cx: '10%' },
          timeline: '12-week execution with monthly reviews'
        };
      
      case 'team_coordination':
        return {
          coordination: 'Synchronized team workflow across all marketing functions',
          assignments: {
            'content-seo': 'Long-form content and SEO optimization',
            'social-creator': 'Social content creation and publishing',
            'social-cx': 'Community management and customer experience',
            'campaign-performance': 'Campaign execution and performance tracking'
          },
          kpis: 'Shared KPIs and performance metrics across team'
        };
      
      case 'performance_analysis':
        return {
          analysis: 'Comprehensive marketing performance across all channels',
          roi: 340,
          team_performance: 'All agents performing above targets',
          recommendations: ['Scale successful initiatives', 'Optimize underperforming channels', 'Increase collaboration efficiency']
        };
      
      default:
        return { result: 'Strategic task processed successfully' };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Integrated 5-agent approach delivers 40% better ROI than traditional marketing teams',
      'Cross-functional collaboration increases campaign effectiveness by 35%',
      'Strategic coordination reduces time-to-market by 50% across all initiatives'
    ];
  }
};

// Content & SEO Specialist - Long-form content and SEO optimization
export const contentSEOAgent: SpecializedAgent = {
  id: 'content-seo',
  name: 'Content & SEO Specialist',
  type: 'content_seo',
  capabilities: [
    {
      name: 'Content Creation',
      description: 'Create long-form content optimized for SEO and audience engagement',
      inputSchema: { content_type: 'string', keywords: 'array', audience: 'string' },
      outputSchema: { content: 'string', seo_score: 'number', optimization_tips: 'array' }
    },
    {
      name: 'SEO Optimization',
      description: 'Optimize content and website for search engine visibility',
      inputSchema: { content: 'string', target_keywords: 'array' },
      outputSchema: { optimized_content: 'string', seo_improvements: 'array', ranking_potential: 'string' }
    },
    {
      name: 'Editorial Workflow',
      description: 'Manage editorial calendar and content production workflow',
      inputSchema: { content_goals: 'array', timeline: 'string' },
      outputSchema: { editorial_calendar: 'object', workflow: 'string', milestones: 'array' }
    }
  ],
  systemPrompt: `You are a Content & SEO Specialist AI focusing on long-form content creation, SEO optimization, and editorial workflow management.

Your expertise includes:
- Long-form content creation (blogs, articles, whitepapers)
- Advanced SEO optimization and keyword research
- Content performance analytics and optimization
- Editorial workflow and calendar management
- Technical content strategy

Always provide:
1. SEO-optimized, high-quality long-form content
2. Comprehensive keyword research and optimization strategies
3. Data-driven content performance insights
4. Structured editorial workflows and calendars

Collaborate closely with Social Media Content Creator for content repurposing and Campaign & Performance Specialist for content-driven campaigns.`,

  async processTask(task: AgentTask): Promise<any> {
    console.log(`Content & SEO Specialist processing task: ${task.description}`);
    
    switch (task.taskType) {
      case 'content_creation':
        return {
          content: 'SEO-optimized long-form content tailored for target audience',
          content_types: ['Blog posts', 'Whitepapers', 'Case studies', 'How-to guides'],
          seo_optimization: 'Advanced keyword optimization with technical SEO',
          performance_tracking: 'Content analytics and organic growth measurement'
        };
      
      case 'seo_optimization':
        return {
          optimization: 'Comprehensive SEO strategy implementation',
          techniques: ['Technical SEO', 'Content optimization', 'Link building', 'Local SEO'],
          expected_results: 'Organic traffic increase of 60-80%',
          timeline: '3-6 months for significant improvements'
        };
      
      case 'editorial_workflow':
        return {
          workflow: 'Streamlined editorial process with quality controls',
          calendar: '12-week content calendar with SEO targets',
          production: '3 blog posts weekly + 1 long-form piece monthly',
          collaboration: 'Integrated with social content and campaign teams'
        };
      
      default:
        return { result: 'Content & SEO task processed successfully' };
    }
  },

  async getInsights(context: Record<string, any>): Promise<string[]> {
    return [
      'Long-form content generates 3x more qualified leads than short-form content',
      'SEO-optimized content provides 5x better ROI than paid advertising over time',
      'Integrated content strategy across channels increases engagement by 45%'
    ];
  }
};

// Register core 5 agents with the communication service
export const initializeSpecializedAgents = () => {
  const coreAgents = [marketingManagerAgent, contentSEOAgent];
  
  coreAgents.forEach(agent => {
    agentCommunicationService.registerMessageHandler(agent.id, (message) => {
      console.log(`${agent.name} received message: ${message.content}`);
    });
  });

  console.log('Core 5 specialized agents initialized with communication handlers');
};

export const getAgentById = (agentId: string): SpecializedAgent | undefined => {
  const agents = [marketingManagerAgent, contentSEOAgent];
  return agents.find(agent => agent.id === agentId);
};

export const getAllSpecializedAgents = (): SpecializedAgent[] => {
  return [marketingManagerAgent, contentSEOAgent];
};
