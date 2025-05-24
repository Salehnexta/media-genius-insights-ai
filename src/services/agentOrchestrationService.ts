
import { enhancedAgentCommunicationService } from './enhancedAgentCommunication';
import { agentCollaborationService } from './agentCollaborationService';
import { initializeCollaborativeAgents, getAllCollaborativeAgents } from './collaborativeSpecializedAgents';
import { supabase } from '@/integrations/supabase/client';

interface WorkflowStep {
  id: string;
  agentId: string;
  taskType: string;
  description: string;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  output?: any;
}

interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'draft' | 'active' | 'completed' | 'failed';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

class AgentOrchestrationService {
  private workflows: Map<string, AgentWorkflow> = new Map();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    console.log('Initializing Agent Orchestration Service with 5 core agents...');
    
    initializeCollaborativeAgents();
    this.setupCore5WorkflowTemplates();
    this.startWorkflowMonitoring();
    
    this.isInitialized = true;
    console.log('Agent Orchestration Service initialized successfully with 5 core marketing agents');
  }

  async createWorkflow(
    name: string,
    description: string,
    steps: Omit<WorkflowStep, 'id' | 'status'>[]
  ): Promise<string> {
    const workflowId = `workflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const workflow: AgentWorkflow = {
      id: workflowId,
      name,
      description,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${index + 1}`,
        status: 'pending'
      })),
      status: 'draft',
      progress: 0,
      createdAt: new Date()
    };
    
    this.workflows.set(workflowId, workflow);
    await this.storeWorkflowInDatabase(workflow);
    
    return workflowId;
  }

  async executeWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) throw new Error(`Workflow ${workflowId} not found`);
    
    console.log(`Executing workflow: ${workflow.name}`);
    workflow.status = 'active';
    
    try {
      await this.executeWorkflowSteps(workflow);
      
      workflow.status = 'completed';
      workflow.completedAt = new Date();
      workflow.progress = 100;
      
      console.log(`Workflow ${workflow.name} completed successfully`);
    } catch (error) {
      console.error(`Workflow ${workflow.name} failed:`, error);
      workflow.status = 'failed';
    }
    
    await this.updateWorkflowInDatabase(workflow);
  }

  private async executeWorkflowSteps(workflow: AgentWorkflow): Promise<void> {
    const completedSteps = new Set<string>();
    
    while (completedSteps.size < workflow.steps.length) {
      const executableSteps = workflow.steps.filter(step => 
        step.status === 'pending' && 
        step.dependencies.every(dep => completedSteps.has(dep))
      );
      
      if (executableSteps.length === 0) {
        throw new Error('No executable steps found - possible circular dependency');
      }
      
      const stepPromises = executableSteps.map(async (step) => {
        step.status = 'in_progress';
        
        try {
          const result = await this.executeWorkflowStep(step, workflow);
          step.output = result;
          step.status = 'completed';
          completedSteps.add(step.id);
          
          workflow.progress = (completedSteps.size / workflow.steps.length) * 100;
          
          return result;
        } catch (error) {
          step.status = 'failed';
          throw new Error(`Step ${step.id} failed: ${error.message}`);
        }
      });
      
      await Promise.all(stepPromises);
    }
  }

  private async executeWorkflowStep(step: WorkflowStep, workflow: AgentWorkflow): Promise<any> {
    console.log(`Executing step: ${step.description} (Agent: ${step.agentId})`);
    
    const agent = getAllCollaborativeAgents().find(a => a.id === step.agentId);
    if (!agent) {
      throw new Error(`Agent ${step.agentId} not found`);
    }
    
    const task = {
      id: `task-${step.id}`,
      agentId: step.agentId,
      taskType: step.taskType,
      description: step.description,
      data: {
        workflowId: workflow.id,
        stepId: step.id,
        previousSteps: workflow.steps.filter(s => s.status === 'completed').map(s => ({
          id: s.id,
          output: s.output
        }))
      },
      status: 'pending' as const,
      priority: 'medium' as const,
      createdAt: new Date()
    };
    
    const result = await agent.processTask(task);
    
    console.log(`Step completed: ${step.description}`, result);
    
    return result;
  }

  private setupCore5WorkflowTemplates() {
    // Campaign Launch Workflow with 5 Core Agents
    this.createWorkflowTemplate('campaign-launch', [
      {
        agentId: 'marketing-manager',
        taskType: 'strategic_planning',
        description: 'Define campaign strategy and coordinate team',
        dependencies: []
      },
      {
        agentId: 'content-seo',
        taskType: 'content_creation',
        description: 'Create content strategy and long-form assets',
        dependencies: ['step-1']
      },
      {
        agentId: 'social-creator',
        taskType: 'social_content_creation',
        description: 'Develop social media content and publishing plan',
        dependencies: ['step-2']
      },
      {
        agentId: 'social-cx',
        taskType: 'sentiment_monitoring',
        description: 'Set up monitoring and community management',
        dependencies: ['step-1']
      },
      {
        agentId: 'campaign-performance',
        taskType: 'campaign_planning',
        description: 'Execute campaigns and track performance',
        dependencies: ['step-2', 'step-3', 'step-4']
      }
    ]);

    // Content Marketing Workflow
    this.createWorkflowTemplate('content-marketing', [
      {
        agentId: 'marketing-manager',
        taskType: 'team_coordination',
        description: 'Coordinate content marketing strategy',
        dependencies: []
      },
      {
        agentId: 'content-seo',
        taskType: 'editorial_workflow',
        description: 'Create editorial calendar and content',
        dependencies: ['step-1']
      },
      {
        agentId: 'social-creator',
        taskType: 'content_scheduling',
        description: 'Adapt content for social platforms',
        dependencies: ['step-2']
      },
      {
        agentId: 'campaign-performance',
        taskType: 'performance_optimization',
        description: 'Track and optimize content performance',
        dependencies: ['step-2', 'step-3']
      }
    ]);

    // Crisis Response Workflow
    this.createWorkflowTemplate('crisis-response', [
      {
        agentId: 'social-cx',
        taskType: 'crisis_detection',
        description: 'Assess crisis severity and immediate response',
        dependencies: []
      },
      {
        agentId: 'marketing-manager',
        taskType: 'team_coordination',
        description: 'Coordinate crisis response strategy',
        dependencies: ['step-1']
      },
      {
        agentId: 'social-creator',
        taskType: 'social_content_creation',
        description: 'Create crisis response content',
        dependencies: ['step-2']
      },
      {
        agentId: 'campaign-performance',
        taskType: 'performance_optimization',
        description: 'Monitor crisis impact and adjust campaigns',
        dependencies: ['step-3']
      }
    ]);
  }

  private createWorkflowTemplate(
    templateName: string, 
    steps: Omit<WorkflowStep, 'id' | 'status'>[]
  ) {
    const templates = this.getWorkflowTemplates();
    templates[templateName] = steps;
  }

  private getWorkflowTemplates(): Record<string, Omit<WorkflowStep, 'id' | 'status'>[]> {
    return {
      'campaign-launch': [],
      'content-marketing': [],
      'crisis-response': [],
      'performance-optimization': []
    };
  }

  async createWorkflowFromTemplate(
    templateName: string,
    workflowName: string,
    description: string
  ): Promise<string> {
    const templates = this.getWorkflowTemplates();
    const template = templates[templateName];
    
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }
    
    return this.createWorkflow(workflowName, description, template);
  }

  getWorkflowStatus(workflowId: string): AgentWorkflow | undefined {
    return this.workflows.get(workflowId);
  }

  getAllWorkflows(): AgentWorkflow[] {
    return Array.from(this.workflows.values());
  }

  private startWorkflowMonitoring() {
    setInterval(() => {
      this.monitorActiveWorkflows();
    }, 30000);
  }

  private async monitorActiveWorkflows() {
    const activeWorkflows = Array.from(this.workflows.values())
      .filter(w => w.status === 'active');
    
    for (const workflow of activeWorkflows) {
      const lastActivity = Math.max(
        ...workflow.steps.map(s => s.output?.timestamp || 0)
      );
      
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity > 10 * 60 * 1000) { // 10 minutes
        console.warn(`Workflow ${workflow.name} appears stuck`);
      }
    }
  }

  private async storeWorkflowInDatabase(workflow: AgentWorkflow) {
    try {
      await supabase
        .from('agent_tasks')
        .insert({
          agent_id: 'orchestration-system',
          task_type: 'workflow',
          task_description: workflow.description,
          task_parameters: {
            workflowData: workflow,
            workflowId: workflow.id
          },
          status: workflow.status,
          progress_percentage: workflow.progress
        });
    } catch (error) {
      console.error('Failed to store workflow in database:', error);
    }
  }

  private async updateWorkflowInDatabase(workflow: AgentWorkflow) {
    try {
      await supabase
        .from('agent_tasks')
        .update({
          status: workflow.status,
          progress_percentage: workflow.progress,
          actual_completion: workflow.completedAt?.toISOString(),
          output_data: { workflowResult: workflow }
        })
        .eq('task_parameters->workflowId', workflow.id);
    } catch (error) {
      console.error('Failed to update workflow in database:', error);
    }
  }

  async triggerWorkflowByEvent(eventType: string, context: Record<string, any>): Promise<string | null> {
    switch (eventType) {
      case 'new-campaign-request':
        return this.createWorkflowFromTemplate(
          'campaign-launch',
          `Campaign: ${context.campaignName}`,
          `Launch workflow for campaign: ${context.campaignName}`
        );
      
      case 'content-strategy-needed':
        return this.createWorkflowFromTemplate(
          'content-marketing',
          'Content Marketing Strategy',
          'Comprehensive content marketing workflow'
        );
      
      case 'crisis-detected':
        return this.createWorkflowFromTemplate(
          'crisis-response',
          'Crisis Response Protocol',
          'Immediate crisis response and management'
        );
      
      default:
        console.warn(`Unknown event type: ${eventType}`);
        return null;
    }
  }
}

export const agentOrchestrationService = new AgentOrchestrationService();
export type { AgentWorkflow, WorkflowStep };
