
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  specialization: string;
}

interface AgentTaskBoardProps {
  agent: Agent;
  isArabic: boolean;
}

const AgentTaskBoard: React.FC<AgentTaskBoardProps> = ({ agent, isArabic }) => {
  const [tasks] = useState([
    {
      id: '1',
      title: isArabic ? 'إنشاء استراتيجية المحتوى' : 'Create content strategy',
      description: isArabic ? 'تطوير خطة محتوى شاملة للربع القادم' : 'Develop comprehensive content plan for next quarter',
      status: 'in_progress',
      priority: 'high',
      progress: 75,
      dueDate: '2024-02-15',
      assignee: 'Content Team'
    },
    {
      id: '2',
      title: isArabic ? 'تحليل أداء الحملات' : 'Analyze campaign performance',
      description: isArabic ? 'مراجعة نتائج الحملات الحالية' : 'Review current campaign results',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      dueDate: '2024-02-10',
      assignee: 'Analytics Team'
    },
    {
      id: '3',
      title: isArabic ? 'تحديث خطوط العلامة التجارية' : 'Update brand guidelines',
      description: isArabic ? 'مراجعة وتحديث دليل العلامة التجارية' : 'Review and update brand style guide',
      status: 'pending',
      priority: 'low',
      progress: 0,
      dueDate: '2024-02-20',
      assignee: 'Design Team'
    },
    {
      id: '4',
      title: isArabic ? 'إعداد تقرير أسبوعي' : 'Prepare weekly report',
      description: isArabic ? 'جمع البيانات وإعداد التقرير الأسبوعي' : 'Compile data and create weekly performance report',
      status: 'in_progress',
      priority: 'high',
      progress: 30,
      dueDate: '2024-02-12',
      assignee: 'Marketing Team'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      completed: isArabic ? 'مكتمل' : 'Completed',
      in_progress: isArabic ? 'قيد التنفيذ' : 'In Progress',
      pending: isArabic ? 'في انتظار' : 'Pending'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityText = (priority: string) => {
    const priorityMap = {
      high: isArabic ? 'عالية' : 'High',
      medium: isArabic ? 'متوسطة' : 'Medium',
      low: isArabic ? 'منخفضة' : 'Low'
    };
    return priorityMap[priority as keyof typeof priorityMap] || priority;
  };

  return (
    <div className="space-y-6">
      {/* Task Board Header */}
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-xl font-semibold">
          {isArabic ? 'لوحة المهام' : 'Task Board'}
        </h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'مهمة جديدة' : 'New Task'}
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">{isArabic ? 'إجمالي المهام' : 'Total Tasks'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">{isArabic ? 'مكتملة' : 'Completed'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">{isArabic ? 'قيد التنفيذ' : 'In Progress'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">1</div>
            <div className="text-sm text-gray-600">{isArabic ? 'في انتظار' : 'Pending'}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Task Header */}
                <div className={`flex items-start justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      {getStatusIcon(task.status)}
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                        {getPriorityText(task.priority)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  </div>
                </div>

                {/* Task Progress */}
                <div>
                  <div className={`flex justify-between items-center mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">{isArabic ? 'التقدم' : 'Progress'}</span>
                    <span className="text-sm text-gray-600">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                {/* Task Details */}
                <div className={`flex items-center justify-between text-sm ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{task.dueDate}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{task.assignee}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{getStatusText(task.status)}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentTaskBoard;
