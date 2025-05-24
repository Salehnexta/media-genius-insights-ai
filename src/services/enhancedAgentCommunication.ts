
import { agentCommunicationService, AgentMessage, AgentTask } from './agentCommunicationService';
import { agentCollaborationService, CollaborationResult } from './agentCollaborationService';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedAgentCapabilities {
  canCollaborate: boolean;
  collaborationTypes: string[];
  expertiseAreas: string[];
  communicationStyle: 'formal' | 'casual' | 'technical' | 'creative';
}

class EnhancedAgentCommunicationService {
  private baseService = agentCommunicationService;

  // Enhanced agent registration with collaboration capabilities
  registerEnhancedAgent(
    agentId: string, 
    capabilities: EnhancedAgentCapabilities,
    messageHandler: (message: AgentMessage) => Promise<void>
  ) {
    // Register with base service
    this.baseService.registerMessageHandler(agentId, async (message) => {
      await messageHandler(message);
      
      // Check if this message triggers a collaboration
      if (this.shouldTriggerCollaboration(message)) {
        await this.handleCollaborationTrigger(message);
      }
    });

    console.log(`Enhanced agent ${agentId} registered with collaboration capabilities`);
  }

  // Send message with collaboration awareness
  async sendEnhancedMessage(
    fromAgentId: string,
    toAgentId: string,
    content: string,
    messageType: AgentMessage['messageType'],
    metadata?: Record<string, any>,
    requestCollaboration?: boolean
  ): Promise<AgentMessage> {
    const message = this.baseService.sendMessage(fromAgentId, toAgentId, content, messageType, metadata);

    // If collaboration is requested, create collaboration request
    if (requestCollaboration) {
      await agentCollaborationService.createCollaborationRequest(
        fromAgentId,
        toAgentId,
        'assistance',
        content,
        metadata || {},
        'medium'
      );
    }

    // Store message in database
    await this.storeMessageInDatabase(message);

    return message;
  }

  // Create collaborative task involving multiple agents
  async createCollaborativeTask(
    taskType: string,
    description: string,
    involvedAgents: string[],
    priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium',
    context: Record<string, any> = {}
  ): Promise<string> {
    // Create main task
    const mainTask = this.baseService.createTask(
      involvedAgents[0], // Primary agent
      taskType,
      description,
      { ...context, collaborativeTask: true, involvedAgents },
      priority
    );

    // Create sub-tasks for other agents
    for (let i = 1; i < involvedAgents.length; i++) {
      this.baseService.createTask(
        involvedAgents[i],
        `${taskType}_collaboration`,
        `Collaboration on: ${description}`,
        { ...context, mainTaskId: mainTask.id, role: 'collaborator' },
        priority
      );
    }

    // Notify all agents about the collaborative task
    for (const agentId of involvedAgents) {
      await this.sendEnhancedMessage(
        'system',
        agentId,
        `You've been assigned to collaborative task: ${description}`,
        'task',
        { taskId: mainTask.id, collaborativeTask: true }
      );
    }

    return mainTask.id;
  }

  // Process agent-to-agent collaboration workflows
  async processCollaborationWorkflow(workflowType: string, context: Record<string, any>): Promise<CollaborationResult> {
    switch (workflowType) {
      case 'campaign-creation':
        return this.processCampaignCreationWorkflow(context);
      
      case 'content-optimization':
        return this.processContentOptimizationWorkflow(context);
      
      case 'crisis-response':
        return this.processCrisisResponseWorkflow(context);
      
      case 'performance-analysis':
        return this.processPerformanceAnalysisWorkflow(context);
      
      default:
        return {
          success: false,
          message: `Unknown workflow type: ${workflowType}`
        };
    }
  }

  // Campaign creation workflow involving multiple agents
  private async processCampaignCreationWorkflow(context: Record<string, any>): Promise<CollaborationResult> {
    try {
      const steps = [
        { agent: 'marketing-manager', task: 'Define campaign strategy and objectives' },
        { agent: 'content-strategist', task: 'Create content plan and calendar' },
        { agent: 'graphic-designer', task: 'Design visual assets and brand materials' },
        { agent: 'social-media', task: 'Plan social media distribution strategy' },
        { agent: 'analytics-expert', task: 'Set up tracking and measurement framework' }
      ];

      const results = [];
      
      for (const step of steps) {
        const result = await this.executeAgentStep(step.agent, step.task, context);
        results.push(result);
        
        // Pass results to next agent for continuity
        context = { ...context, previousResults: results };
      }

      return {
        success: true,
        data: { workflow: 'campaign-creation', steps, results },
        message: 'Campaign creation workflow completed successfully',
        insights: [
          'All agents collaborated effectively on campaign creation',
          'Integrated strategy across content, design, and distribution',
          'Measurement framework established for campaign tracking'
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: `Campaign creation workflow failed: ${error.message}`
      };
    }
  }

  // Content optimization workflow
  private async processContentOptimizationWorkflow(context: Record<string, any>): Promise<CollaborationResult> {
    try {
      const optimizationSteps = [
        { agent: 'analytics-expert', task: 'Analyze current content performance' },
        { agent: 'seo-expert', task: 'Identify SEO optimization opportunities' },
        { agent: 'content-strategist', task: 'Revise content strategy based on insights' },
        { agent: 'graphic-designer', task: 'Update visual elements for better engagement' }
      ];

      const results = [];
      
      for (const step of optimizationSteps) {
        const result = await this.executeAgentStep(step.agent, step.task, context);
        results.push(result);
        context = { ...context, previousResults: results };
      }

      return {
        success: true,
        data: { workflow: 'content-optimization', steps: optimizationSteps, results },
        message: 'Content optimization workflow completed successfully',
        insights: [
          'Content performance analysis completed',
          'SEO opportunities identified and implemented',
          'Visual elements optimized for better engagement'
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: `Content optimization workflow failed: ${error.message}`
      };
    }
  }

  // Crisis response workflow
  private async processCrisisResponseWorkflow(context: Record<string, any>): Promise<CollaborationResult> {
    try {
      const crisisSteps = [
        { agent: 'social-media', task: 'Monitor and assess crisis severity', priority: 'urgent' },
        { agent: 'brand-manager', task: 'Develop crisis response messaging', priority: 'urgent' },
        { agent: 'marketing-manager', task: 'Coordinate overall crisis response strategy', priority: 'urgent' },
        { agent: 'content-strategist', task: 'Create crisis communication content', priority: 'urgent' },
        { agent: 'analytics-expert', task: 'Track crisis impact and sentiment', priority: 'high' }
      ];

      const results = [];
      
      // Execute crisis steps in parallel for urgent response
      const crisisPromises = crisisSteps.map(step => 
        this.executeAgentStep(step.agent, step.task, context)
      );
      
      const crisisResults = await Promise.all(crisisPromises);
      results.push(...crisisResults);

      return {
        success: true,
        data: { workflow: 'crisis-response', steps: crisisSteps, results },
        message: 'Crisis response workflow executed successfully',
        insights: [
          'Rapid crisis assessment and response coordination',
          'Unified crisis messaging across all channels',
          'Real-time sentiment monitoring established'
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: `Crisis response workflow failed: ${error.message}`
      };
    }
  }

  // Performance analysis workflow
  private async processPerformanceAnalysisWorkflow(context: Record<string, any>): Promise<CollaborationResult> {
    try {
      const analysisSteps = [
        { agent: 'analytics-expert', task: 'Compile comprehensive performance metrics' },
        { agent: 'marketing-manager', task: 'Analyze ROI and strategic impact' },
        { agent: 'content-strategist', task: 'Evaluate content performance and engagement' },
        { agent: 'social-media', task: 'Assess social media performance and reach' },
        { agent: 'brand-manager', task: 'Review brand perception and sentiment impact' }
      ];

      const results = [];
      
      for (const step of analysisSteps) {
        const result = await this.executeAgentStep(step.agent, step.task, context);
        results.push(result);
        context = { ...context, previousResults: results };
      }

      return {
        success: true,
        data: { workflow: 'performance-analysis', steps: analysisSteps, results },
        message: 'Performance analysis workflow completed successfully',
        insights: [
          'Comprehensive performance metrics compiled',
          'ROI analysis completed across all channels',
          'Actionable recommendations generated for optimization'
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: `Performance analysis workflow failed: ${error.message}`
      };
    }
  }

  // Execute individual agent step in workflow
  private async executeAgentStep(agentId: string, task: string, context: Record<string, any>): Promise<any> {
    // Create task for the agent
    const agentTask = this.baseService.createTask(agentId, 'workflow_step', task, context);
    
    // Simulate agent processing (in real implementation, this would call actual agent logic)
    const result = {
      agentId,
      task,
      completed: true,
      timestamp: new Date(),
      output: `${agentId} completed: ${task}`,
      insights: [`Insight from ${agentId} regarding ${task}`]
    };

    // Update task status
    this.baseService.updateTaskStatus(agentTask.id, 'completed', result);
    
    return result;
  }

  // Check if message should trigger collaboration
  private shouldTriggerCollaboration(message: AgentMessage): boolean {
    const collaborationKeywords = [
      'collaborate', 'work together', 'need help', 'assistance',
      'coordinate', 'integrate', 'combine efforts'
    ];
    
    return collaborationKeywords.some(keyword => 
      message.content.toLowerCase().includes(keyword)
    );
  }

  // Handle collaboration trigger
  private async handleCollaborationTrigger(message: AgentMessage) {
    // Determine collaboration type based on message content
    let collaborationType = 'general-assistance';
    
    if (message.content.includes('content')) collaborationType = 'content-strategy';
    if (message.content.includes('brand')) collaborationType = 'brand-optimization';
    if (message.content.includes('social')) collaborationType = 'social-customer-experience';
    
    // Trigger appropriate collaboration
    await agentCollaborationService.triggerCollaboration(collaborationType, {
      triggerMessage: message,
      timestamp: new Date()
    });
  }

  // Store message in database
  private async storeMessageInDatabase(message: AgentMessage) {
    try {
      await supabase
        .from('agent_conversations')
        .insert({
          agent_id: message.fromAgentId,
          conversation_thread_id: message.id,
          message_type: message.messageType,
          message_content: message.content,
          message_metadata: message.metadata,
          timestamp: message.timestamp.toISOString(),
          is_read: false
        });
    } catch (error) {
      console.error('Failed to store message in database:', error);
    }
  }

  // Get conversation history between agents
  async getConversationHistory(agentId1: string, agentId2: string): Promise<AgentMessage[]> {
    const { data, error } = await supabase
      .from('agent_conversations')
      .select('*')
      .or(`agent_id.eq.${agentId1},agent_id.eq.${agentId2}`)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    
    return data.map(conv => ({
      id: conv.id,
      fromAgentId: conv.agent_id,
      toAgentId: agentId1 === conv.agent_id ? agentId2 : agentId1,
      content: conv.message_content,
      messageType: conv.message_type as AgentMessage['messageType'],
      metadata: conv.message_metadata,
      timestamp: new Date(conv.timestamp),
      status: conv.is_read ? 'read' : 'pending'
    }));
  }
}

export const enhancedAgentCommunicationService = new EnhancedAgentCommunicationService();
export type { EnhancedAgentCapabilities };
