
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { agentCommunicationService, AgentTask } from '@/services/agentCommunicationService';
import { getAgentById, getAllSpecializedAgents } from '@/services/specializedAgents';
import { Play, Pause, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

interface AgentTaskManagerProps {
  agentId?: string;
  showAllAgents?: boolean;
}

const AgentTaskManager: React.FC<AgentTaskManagerProps> = ({ 
  agentId, 
  showAllAgents = false 
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [agentId]);

  const loadTasks = () => {
    if (showAllAgents) {
      // Get tasks for all agents
      const allAgents = getAllSpecializedAgents();
      const allTasks = allAgents.flatMap(agent => 
        agentCommunicationService.getTasksForAgent(agent.id)
      );
      setTasks(allTasks);
    } else if (agentId) {
      const agentTasks = agentCommunicationService.getTasksForAgent(agentId);
      setTasks(agentTasks);
    }
  };

  const createSampleTask = () => {
    if (!agentId) return;

    const sampleTasks = {
      'strategy-agent': {
        taskType: 'market_analysis',
        description: 'Analyze current market trends for Q4 strategy',
        data: { industry: 'technology', targetMarket: 'enterprise' }
      },
      'content-agent': {
        taskType: 'create_content',
        description: 'Create blog post about AI marketing trends',
        data: { contentType: 'blog', audience: 'business owners', tone: 'professional' }
      },
      'analytics-agent': {
        taskType: 'performance_analysis',
        description: 'Analyze website conversion metrics',
        data: { metrics: { visitors: 1000, conversions: 45 }, timeframe: '30 days' }
      }
    };

    const taskData = sampleTasks[agentId as keyof typeof sampleTasks];
    if (taskData) {
      agentCommunicationService.createTask(
        agentId,
        taskData.taskType,
        taskData.description,
        taskData.data,
        'medium'
      );
      loadTasks();
    }
  };

  const executeTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setLoading(true);
    agentCommunicationService.updateTaskStatus(taskId, 'in_progress');
    
    try {
      const agent = getAgentById(task.agentId);
      if (agent) {
        const result = await agent.processTask(task);
        agentCommunicationService.updateTaskStatus(taskId, 'completed', result);
        
        // Share insights with other agents
        if (result.insights) {
          agentCommunicationService.shareInsight(
            task.agentId,
            `Task completed: ${task.description}`,
            result
          );
        }
      }
    } catch (error) {
      agentCommunicationService.updateTaskStatus(taskId, 'failed');
      console.error('Task execution error:', error);
    }
    
    setLoading(false);
    loadTasks();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress': return <Play className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: isArabic ? 'في انتظار' : 'Pending',
      in_progress: isArabic ? 'قيد التنفيذ' : 'In Progress',
      completed: isArabic ? 'مكتمل' : 'Completed',
      failed: isArabic ? 'فشل' : 'Failed'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTaskProgress = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'in_progress': return 50;
      case 'completed': return 100;
      case 'failed': return 0;
      default: return 0;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {isArabic ? 'إدارة المهام' : 'Task Manager'}
          </CardTitle>
          {agentId && (
            <Button onClick={createSampleTask} size="sm">
              {isArabic ? 'إنشاء مهمة تجريبية' : 'Create Sample Task'}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {isArabic ? 'لا توجد مهام حالياً' : 'No tasks available'}
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className={`flex items-start justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      {getStatusIcon(task.status)}
                      <h4 className="font-medium">{task.description}</h4>
                      <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    {showAllAgents && (
                      <div className="text-sm text-gray-600 mb-2">
                        <Badge variant="secondary">{task.agentId}</Badge>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className={`flex items-center justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-600">
                          {isArabic ? 'الحالة:' : 'Status:'} {getStatusText(task.status)}
                        </span>
                        <span className="text-gray-500">
                          {task.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <Progress value={getTaskProgress(task.status)} className="h-2" />
                      
                      {task.status === 'completed' && task.result && (
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                          {isArabic ? 'النتيجة:' : 'Result:'} {JSON.stringify(task.result).slice(0, 100)}...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {task.status === 'pending' && (
                    <Button 
                      onClick={() => executeTask(task.id)}
                      disabled={loading}
                      size="sm"
                      className="ml-4"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {isArabic ? 'تنفيذ' : 'Execute'}
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentTaskManager;
