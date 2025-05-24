
interface AgentMessage {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  content: string;
  messageType: 'task' | 'data' | 'insight' | 'request';
  metadata?: Record<string, any>;
  timestamp: Date;
  status: 'pending' | 'read' | 'processed';
}

interface AgentTask {
  id: string;
  agentId: string;
  taskType: string;
  description: string;
  data: Record<string, any>;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  completedAt?: Date;
  result?: any;
}

class AgentCommunicationService {
  private messages: AgentMessage[] = [];
  private tasks: AgentTask[] = [];
  private messageHandlers: Map<string, (message: AgentMessage) => void> = new Map();

  // Send message between agents
  sendMessage(fromAgentId: string, toAgentId: string, content: string, messageType: AgentMessage['messageType'], metadata?: Record<string, any>): AgentMessage {
    const message: AgentMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fromAgentId,
      toAgentId,
      content,
      messageType,
      metadata,
      timestamp: new Date(),
      status: 'pending'
    };

    this.messages.push(message);
    
    // Notify receiving agent
    const handler = this.messageHandlers.get(toAgentId);
    if (handler) {
      handler(message);
    }

    return message;
  }

  // Register message handler for an agent
  registerMessageHandler(agentId: string, handler: (message: AgentMessage) => void) {
    this.messageHandlers.set(agentId, handler);
  }

  // Create task for an agent
  createTask(agentId: string, taskType: string, description: string, data: Record<string, any>, priority: AgentTask['priority'] = 'medium'): AgentTask {
    const task: AgentTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      agentId,
      taskType,
      description,
      data,
      status: 'pending',
      priority,
      createdAt: new Date()
    };

    this.tasks.push(task);
    return task;
  }

  // Update task status
  updateTaskStatus(taskId: string, status: AgentTask['status'], result?: any) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      if (result) task.result = result;
      if (status === 'completed' || status === 'failed') {
        task.completedAt = new Date();
      }
    }
  }

  // Get messages for an agent
  getMessagesForAgent(agentId: string): AgentMessage[] {
    return this.messages.filter(m => m.toAgentId === agentId);
  }

  // Get tasks for an agent
  getTasksForAgent(agentId: string): AgentTask[] {
    return this.tasks.filter(t => t.agentId === agentId);
  }

  // Get pending tasks for an agent
  getPendingTasksForAgent(agentId: string): AgentTask[] {
    return this.tasks.filter(t => t.agentId === agentId && t.status === 'pending');
  }

  // Agent collaboration - request help from another agent
  requestAgentCollaboration(requestingAgentId: string, targetAgentId: string, task: string, context: Record<string, any>) {
    return this.sendMessage(
      requestingAgentId,
      targetAgentId,
      `Collaboration request: ${task}`,
      'request',
      { task, context, collaborationType: 'assistance' }
    );
  }

  // Share insights between agents
  shareInsight(fromAgentId: string, insight: string, data: Record<string, any>, targetAgents?: string[]) {
    const agents = targetAgents || ['strategy-agent', 'content-agent', 'analytics-agent', 'competitor-agent', 'seo-agent'];
    
    agents.forEach(agentId => {
      if (agentId !== fromAgentId) {
        this.sendMessage(
          fromAgentId,
          agentId,
          insight,
          'insight',
          { insightData: data, shared: true }
        );
      }
    });
  }
}

export const agentCommunicationService = new AgentCommunicationService();
export type { AgentMessage, AgentTask };
