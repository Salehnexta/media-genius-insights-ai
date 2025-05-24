
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

  // Initialize the orchestration service
  async initialize() {
    if (this.isInitialized) return;
    
    console.log('Initializing Agent Orchestration Service...');
    
    // Initialize collaborative agents
    initializeCollaborativeAgents();
    
    // Set up workflow templates
    this.setupWorkflowTemplates();
    
    // Start monitoring system
    this.startWorkflowMonitoring();
    
    this.isInitialized = true;
    console.log('Agent Orchestration Service initialized successfully');
  }

  // Create a new workflow
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
    
    // Store in database
    await this.storeWorkflowInDatabase(workflow);
    
    return workflowId;
  }

  // Execute a workflow
  async executeWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) throw new Error(`Workflow ${workflowId} not found`);
    
    console.log(`Executing workflow: ${workflow.name}`);
    workflow.status = 'active';
    
    try {
      // Execute steps in order, respecting dependencies
      await this.executeWorkflowSteps(workflow);
      
      workflow.status = 'completed';
      workflow.completedAt = new Date();
      workflow.progress = 100;
      
      console.log(`Workflow ${workflow.name} completed successfully`);
    } catch (error) {
      console.error(`Workflow ${workflow.name} failed:`, error);
      workflow.status = 'failed';
    }
    
    // Update database
    await this.updateWorkflowInDatabase(workflow);
  }

  // Execute workflow steps
  private async executeWorkflowSteps(workflow: AgentWorkflow): Promise<void> {
    const completedSteps = new Set<string>();
    
    while (completedSteps.size < workflow.steps.length) {
      // Find next executable steps (dependencies satisfied)
      const executableSteps = workflow.steps.filter(step => 
        step.status === 'pending' && 
        step.dependencies.every(dep => completedSteps.has(dep))
      );
      
      if (executableSteps.length === 0) {
        throw new Error('No executable steps found - possible circular dependency');
      }
      
      // Execute steps in parallel
      const stepPromises = executableSteps.map(async (step) => {
        step.status = 'in_progress';
        
        try {
          const result = await this.executeWorkflowStep(step, workflow);
          step.output = result;
          step.status = 'completed';
          completedSteps.add(step.id);
          
          // Update progress
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

  // Execute individual workflow step
  private async executeWorkflowStep(step: WorkflowStep, workflow: AgentWorkflow): Promise<any> {
    console.log(`Executing step: ${step.description} (Agent: ${step.agentId})`);
    
    const agent = getAllCollaborativeAgents().find(a => a.id === step.agentId);
    if (!agent) {
      throw new Error(`Agent ${step.agentId} not found`);
    }
    
    // Create task for the agent
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
    
    // Process task through agent
    const result = await agent.processTask(task);
    
    // Log step completion
    console.log(`Step completed: ${step.description}`, result);
    
    return result;
  }

  // Setup predefined workflow templates
  private setupWorkflowTemplates() {
    // Campaign Launch Workflow
    this.createWorkflowTemplate('campaign-launch', [
      {
        agentId: 'marketing-manager',
        taskType: 'campaign_planning',
        description: 'Define campaign strategy and objectives',
        dependencies: []
      },
      {
        agentId: 'content-strategist',
        taskType: 'content_creation',
        description: 'Create content strategy and calendar',
        dependencies: ['step-1']
      },
      {
        agentId: 'analytics-expert',
        taskType: 'performance_setup',
        description: 'Set up tracking and measurement framework',
        dependencies: ['step-1']
      },
      {
        agentId: 'social-media',
        taskType: 'social_strategy',
        description: 'Develop social media distribution plan',
        dependencies: ['step-2']
      },
      {
        agentId: 'marketing-manager',
        taskType: 'campaign_launch',
        description: 'Coordinate campaign launch',
        dependencies: ['step-2', 'step-3', 'step-4']
      }
    ]);

    // Content Optimization Workflow
    this.createWorkflowTemplate('content-optimization', [
      {
        agentId: 'analytics-expert',
        taskType: 'content_analysis',
        description: 'Analyze current content performance',
        dependencies: []
      },
      {
        agentId: 'seo-expert',
        taskType: 'seo_audit',
        description: 'Conduct SEO analysis and recommendations',
        dependencies: ['step-1']
      },
      {
        agentId: 'content-strategist',
        taskType: 'content_optimization',
        description: 'Optimize content based on insights',
        dependencies: ['step-1', 'step-2']
      }
    ]);

    // Crisis Response Workflow
    this.createWorkflowTemplate('crisis-response', [
      {
        agentId: 'social-media',
        taskType: 'crisis_assessment',
        description: 'Assess crisis severity and immediate response',
        dependencies: []
      },
      {
        agentId: 'brand-manager',
        taskType: 'crisis_messaging',
        description: 'Develop crisis response messaging',
        dependencies: ['step-1']
      },
      {
        agentId: 'marketing-manager',
        taskType: 'crisis_coordination',
        description: 'Coordinate overall crisis response',
        dependencies: ['step-1', 'step-2']
      },
      {
        agentId: 'analytics-expert',
        taskType: 'crisis_monitoring',
        description: 'Monitor crisis impact and sentiment',
        dependencies: ['step-3']
      }
    ]);
  }

  // Create workflow template
  private createWorkflowTemplate(
    templateName: string, 
    steps: Omit<WorkflowStep, 'id' | 'status'>[]
  ) {
    const templates = this.getWorkflowTemplates();
    templates[templateName] = steps;
  }

  // Get workflow templates
  private getWorkflowTemplates(): Record<string, Omit<WorkflowStep, 'id' | 'status'>[]> {
    return {
      'campaign-launch': [],
      'content-optimization': [],
      'crisis-response': [],
      'performance-analysis': []
    };
  }

  // Create workflow from template
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

  // Get workflow status
  getWorkflowStatus(workflowId: string): AgentWorkflow | undefined {
    return this.workflows.get(workflowId);
  }

  // Get all workflows
  getAllWorkflows(): AgentWorkflow[] {
    return Array.from(this.workflows.values());
  }

  // Start workflow monitoring
  private startWorkflowMonitoring() {
    // Monitor workflow progress every 30 seconds
    setInterval(() => {
      this.monitorActiveWorkflows();
    }, 30000);
  }

  // Monitor active workflows
  private async monitorActiveWorkflows() {
    const activeWorkflows = Array.from(this.workflows.values())
      .filter(w => w.status === 'active');
    
    for (const workflow of activeWorkflows) {
      // Check for stuck workflows (no progress in 10 minutes)
      const lastActivity = Math.max(
        ...workflow.steps.map(s => s.output?.timestamp || 0)
      );
      
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity > 10 * 60 * 1000) { // 10 minutes
        console.warn(`Workflow ${workflow.name} appears stuck`);
        // Could trigger alerts or recovery actions here
      }
    }
  }

  // Store workflow in database
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

  // Update workflow in database
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

  // Trigger predefined workflows based on events
  async triggerWorkflowByEvent(eventType: string, context: Record<string, any>): Promise<string | null> {
    switch (eventType) {
      case 'new-campaign-request':
        return this.createWorkflowFromTemplate(
          'campaign-launch',
          `Campaign: ${context.campaignName}`,
          `Launch workflow for campaign: ${context.campaignName}`
        );
      
      case 'content-performance-drop':
        return this.createWorkflowFromTemplate(
          'content-optimization',
          'Content Performance Optimization',
          'Optimize content based on performance decline'
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
